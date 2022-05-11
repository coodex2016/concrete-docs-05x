# 发布订阅

Topic 是对发布订阅模式的一种抽象。当我们的业务是消息驱动时，首选 message broker 来传递消息，开发者直接使用 MQ 或者 JMS 的开发接口来发布、订阅消息，使得系统的架构被限定在某种具体的技术环境下，`concrete`的目标就是为了通过对模式的抽象隔离系统架构、研发对具体技术的依赖。

传统模式下，如果设计、开发者有足够的经验，也会把技术依赖通过封装隔离出来，不过...emm, how interesting...

<!-- 既然更多的团队无暇进行封装隔离，那就concrete来帮着做了吧。 -->

## 静态订阅示例

```java
package org.coodex.concrete.demo.api.excepted;

import org.coodex.concrete.api.ConcreteService;
import org.coodex.util.Parameter;

@ConcreteService
public interface MessageTriggerService {

    // 触发一条消息
    void trigger(@Parameter("msg") String msg);
}
```

```java
ppackage org.coodex.concrete.demo.impl;

import org.coodex.concrete.demo.api.excepted.MessageTriggerService;
import org.coodex.concrete.message.Queue;
import org.coodex.concrete.message.Topic;

import javax.inject.Inject;
import javax.inject.Named;

@Named
public class MessageTriggerServiceImpl implements MessageTriggerService {

    // 定义一个主题，主题由主题类型，消息类型，队列三部分共同确定
    @Inject
    @Queue("demo")
    private Topic<String> topic;

    @Override
    public void trigger(String msg) {
        topic.publish(msg);// 使用这个主题发布一个消息
    }
}
```

定义一个消费者

```java
package org.coodex.concrete.demo.impl;

import lombok.extern.slf4j.Slf4j;
import org.coodex.concrete.message.MessageConsumer;
import org.coodex.concrete.message.Observer;

import javax.inject.Named;

@Named
@MessageConsumer(queue = "demo")
@Slf4j
public class DemoMessageListener implements Observer<String> {
    @Override
    public void update(String message) throws Throwable {
        log.info("message received: {}", message);
    }
}
```

跑起来看看，swagger 里点一下触发一个消息

```txt
2022-05-09 15:45:36.370  INFO 63078 --- [opic.executor-1] o.c.c.demo.impl.DemoMessageListener      : message received: D7sluiBaKi2
```

有什么用？这个案例实在太简单了，好像起不到任何作用。我们假设消息消费者和生产者在两个不同的虚拟机里，下面看看怎么做到

`queue.demo.yml`

```yml
destination: rabbitmq:amqp://demo:demo@localhost:5672/demo
# serializer: json #指定使用json序列化消息内容
```

注意一下，使用 rabbitmq 作为订阅发布的实现技术时，destination 的格式为`rabbitmq:amqp(s)://usernmame:password@host:port/virtualHost`，username,password,host,port,virtualhost 也可以通过 Config 指定，如上例中的 username 和 password

我们这次使用 rabbitmq 来发布订阅消息

```xml
<!-- 使用 rabbitmq 的消息传递者插件 -->
<dependency>
    <groupId>org.coodex.concrete</groupId>
    <artifactId>concrete-courier-rabbitmq</artifactId>
</dependency>
```

再来一下

![topic_amqp](../images/topic_rabbitmq.jpg)

我们看到，没有做任何代码的修改，我们很方便的把 local 方式切换到了 rabbitmq。

除了 rabbitmq 以外，concrete 还提供了 activemq 基于 jms 的插件。

特别的，concrete 还提供的发布者的聚合能力，同一个消息可以发布到多个队列上，`destination=aggregated(queue1, queue2)`即可。

::: tip

concrete 面向系统架构方面考虑比较多，截止到目前为止，我们还没有体验到太多。023 开始，concrete 注重系统的模块化，通过紧耦合(java client)、松耦合(发布订阅)的方式来让系统的架构可以更加灵活，配套一个基于配置中心的 Configuration 实现，统一维护模块的 destination，可以灵活的设计、调整整个系统的架构，这样也能有效地降低系统架构设计的成本和经验门槛
:::

## 动态订阅示例

```java
package org.coodex.concrete.demo.boot;

import org.coodex.concrete.message.Queue;
import org.coodex.concrete.message.Subscription;
import org.coodex.concrete.message.Topic;
import org.coodex.concrete.message.Topics;
import org.coodex.util.GenericTypeHelper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

import javax.inject.Inject;

@SpringBootApplication
public class TopicExample {

    public static class TopicDemo {
        @Inject
        @Queue("队列1")
        private Topic<String> topic1;
        @Inject
        @Queue("队列2")
        private Topic<String> topic2;

        public Topic<String> getTopic1() {
            return topic1;
        }

        // 等同于topic1
        public Topic<String> getTopic1UseApi() {
            return Topics.get(new GenericTypeHelper.GenericType<Topic<String>>() {
            }.getType(), "队列1");
        }

        public Topic<String> getTopic2() {
            return topic2;
        }
    }

    @Bean
    public TopicDemo getTopicDemo() {
        return new TopicDemo();
    }

    private static void topicDemo(Topic<String> topic, String message) {
        // 0 订阅的情况
        topic.publish(message + ".1");
        // 订阅1
        Subscription subscription1 = topic.subscribe(t -> {
            System.out.println("subscribe1: " + t);
        });
        topic.publish(message + ".2");
        // 这时候应该会显示subscribe1收到消息
        // 订阅2
        Subscription subscription2 = topic.subscribe(t -> {
            System.out.println("subscribe2: " + t);
        });
        topic.publish(message + ".3");
        // 这时候应该显示订阅1和2都收到了消息
        subscription1.cancel();
        topic.publish(message + ".4");
        // 订阅1已经取消了订阅，所以这时候应该显示订阅2收到了消息
        subscription2.cancel();
        topic.publish(message + ".5");
        // 这时候所有订阅都取消了，所以不显示消息
    }

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(TopicExample.class);
        TopicDemo demo = context.getBean(TopicDemo.class);
        topicDemo(demo.getTopic1(), "注入: 队列1");
        topicDemo(demo.getTopic1UseApi(), "原始API: 队列1");
        topicDemo(demo.getTopic2(), "注入: 队列2");
    }
}
```

```txt
subscribe1: 注入: 队列1.2
subscribe2: 注入: 队列1.3
subscribe1: 注入: 队列1.3
subscribe2: 注入: 队列1.4
subscribe1: 原始API: 队列1.2
subscribe2: 原始API: 队列1.3
subscribe1: 原始API: 队列1.3
subscribe2: 原始API: 队列1.4
subscribe1: 注入: 队列2.2
subscribe2: 注入: 队列2.3
subscribe1: 注入: 队列2.3
subscribe2: 注入: 队列2.4
```


## 扩展

- Couries: 我们看到 amqp 的 Courier 和 activemq 的 Courier 都是通过扩展达到的，开发者也可以开发自己的 Couries
- TopicPrototype，开发者可以自行扩展自己的主题原型，在后面我们将看到一个 TokenBasedTopic，它就是使用原型扩展出来的
