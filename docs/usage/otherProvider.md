# 多服务支持

截至到目前，我们用的都是 http 方式，那么问题来了，直接用 http 不就完了吗？`concrete`有什么用？

我们本节来回答这个问题。

同样的服务，我们新建一个`amqp broker`发布的应用，前提，你需要搭建一个 rabbitmq。我们假定 rabbitmq 的信息如下：

- broker 地址：localhost:5672
- virtual host: demo
- user/pwd: demo/demo; 在 demo 虚拟主机下有读写权限、主题读写权限

在 demo-boot 里增加依赖

```xml
<!-- 使用 amqp broker 发布concrete服务-->
<dependency>
    <groupId>org.coodex</groupId>
    <artifactId>concrete-spring-boot-amqp</artifactId>
</dependency>
```

```xml
<!-- 调用amqp发布的concrete服务 -->
<dependency>
    <groupId>org.coodex</groupId>
    <artifactId>concrete-amqp-client</artifactId>
    <scope>test</scope>
</dependency>
```

DemoBootStarter 里增加如下代码

```java
// 启用concrete amqp
@EnableConcreteAMQP(
        servicePackages = "org.coodex.concrete.demo.**.api"
)
```

::: tip EnableConcreteAMQP
同前面的`@EnableConcreteJAXRS`一样，`@EnableConcreteAMQP`是快捷发布 amqp service 的注解，属性说明如下：

- servicePackages: String[], 扫描 concreteServices 的包，默认使用[`Config`](https://docs.coodex.org/lib/coodex-utilities/org.coodex.util.Config.html)命名空间`concrete`/`当前appSet`下的`api.packages`，如果为空，则使用`Config`命名空间`concrete`/`amqp` /`当前appSet`下的`api.packages`
- classes: Class&lt;?>[], 额外需要注册的类，默认使用`Config`命名空间`concrete`/`当前appSet`下的`amqp.classes`
- location: String, amqp broker 的 uri，默认使用`Config`命名空间`concrete`/`当前appSet`下的`amqp.location`
- host: String, amqp broker 的 host，默认使用`Config`命名空间`concrete`/`当前appSet`下的`amqp.host`
- port: int, amqp broker 的 port，默认使用`Config`命名空间`concrete`/`当前appSet`下的`amqp.port`
- virtualHost: String, amqp broker 的 virtualHost，默认使用`Config`命名空间`concrete`/`当前appSet`下的`amqp.virtualHost`
- username: String, 登录 amqp broker 的 username，默认使用`Config`命名空间`concrete`/`当前appSet`下的`amqp.username`
- password: String, 登录 amqp broker 的 password，默认使用`Config`命名空间`concrete`/`当前appSet`下的`amqp.password`
- exchangeName: String, 发布到 amqp broker 的交换机名称，默认使用`Config`命名空间`concrete`/`当前appSet`下的`amqp.exchangeName`
- queueName: String, 发布到 amqp broker 使用的队列名，默认使用`Config`命名空间`concrete`/`当前appSet`下的`amqp.queueName`
- ttl: long, 消息的 ttl，单位为毫秒，默认使用`Config`命名空间`concrete`/`当前appSet`下的`amqp.ttl`
  :::

`application.yml`中增加

```yml
concrete:
  amqp:
    logger:
      level:
        server: info
    virtualHost: demo
    username: demo
    password: demo
    host: localhost
```

这样就能跑起来了。

我们新建一个 client 来调用一下

先在`demo-client`模块中增加`concrete-amqp-client`依赖

```xml
<!-- 调用amqp发布的concrete服务 -->
<dependency>
    <groupId>org.coodex.concrete.amqp</groupId>
    <artifactId>concrete-amqp-client</artifactId>
</dependency>
```

使用模块约定的调用代码

```java
package org.coodex.concrete.demo.client;

import lombok.extern.slf4j.Slf4j;
import org.coodex.concrete.Client;
import org.coodex.concrete.demo.api.SubjoinExampleService;

@Slf4j
public class AMQPClientDemo1 {
    public static void main(String[] args) {
        log.info("amqp service invoked: {}",
                Client.getInstance(SubjoinExampleService.class, "amqpModule").add(11, 12));
    }
}
```

`concrete.yml`中补充 amqpModule 的调用信息和日志设置

```yml
client:
  amqpModule:
    destination: amqp://localhost:5672/demo
    username: demo
    password: demo
amqp: # 定义amqp client的logger级别
  logger:
    level:
      client: INFO #默认DEBUG
```

客户端的输出，可以看到，我们通过 amqp broker 成功完成了调用

```txt
2022-05-03 21:37:27 [rx-client.scheduler-1] INFO  org.coodex.concrete.client.amqp.AMQPInvoker - message send: {"content":{"x1":11,"x2":12},"subjoin":{"AMQP_CLIENT_PROVIDER":"concrete-amqp-client-0.5.1-RC2"},"msgId":"ifLTX1qHGT","concreteTokenId":null,"serviceId":"bc67e54e2ad8eeac9192efd7034ad3ad8df42c40"}
2022-05-03 21:37:27 [rx-client.scheduler-1] INFO  org.coodex.util.Profile - Profile /amqp.executor not found.['.yml', '.yaml', '.properties']
2022-05-03 21:37:28 [amqp.executor.executor-2] INFO  org.coodex.concrete.client.amqp.AMQPInvoker - message received: {"content":23,"msgId":"ifLTX1qHGT","ok":true,"subjoin":{"CONCRETE-WARNINGS":"[{\"code\":105001,\"message\":\"11 + 12 太难了 ~>_<~\"}]"}}
2022-05-03 21:37:28 [rx-client.scheduler-1] WARN  org.coodex.concrete.client.WarningClientInterceptor - no warning handler found, but warning occurred.
2022-05-03 21:37:28 [main] INFO  org.coodex.concrete.demo.client.AMQPClientDemo1 - amqp service invoked: 23
```

这里可以看一下，amqp 的客户端实现本质上是异步的，发送数据是使用的`rx-client.scheduler-1`线程，接受数据是`amqp.executor.executor-2`线程。通过这，我们引出下一节，异步服务接口。
