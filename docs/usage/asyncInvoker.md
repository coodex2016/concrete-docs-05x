# 异步调用服务

我们在[`Java Client`](./javaClient.md)和[`多服务支持`](./otherProvider.md)的例子中看到，不管本质上同步还是异步，我们的业务代码都是按照同步 API 的方式调用的，如何使用异步 API(java8 Completable API/ rxjava)来调用服务呢？我们继续体验。

首先，在`demo-api`模块中，增加`rx-builder`的支持

```xml
<!-- 生成异步服务接口 -->
<dependency>
    <groupId>org.coodex.concrete</groupId>
    <artifactId>concrete-rx-builder</artifactId>
    <scope>provided</scope>
</dependency>
```

加上以后 rebuild 一下，会自动生成 CompletableAPI 的服务接口

::: tip concrete-rx-builder
`concrete-rx-builder`类似于`lombok`，基于AnnotationProcessor在编译期生成我们指定的异步服务 API 接口，默认为 java8 的 Completable API。其他异步 API 的支持有：

- `org.coodex.concrete:concrete-rx-observable`用来生成基于 rxjava2 的异步 API
- `org.coodex.concrete:concrete-rx-rxjava3`用来生成基于 rxjava3 的异步 API

如果你需要其他的异步 API，可以自行扩展实现

:::

然后我们到调用端写个异步调用的案例：

```java
package org.coodex.concrete.demo.client;

import lombok.extern.slf4j.Slf4j;
import org.coodex.concrete.Client;
import org.coodex.concrete.demo.api.CompletableSubjoinExampleService;

@Slf4j
public class AsyncAMQPClientDemo {
    public static void main(String[] args) {
        CompletableSubjoinExampleService subjoinExampleService = Client.getInstance(CompletableSubjoinExampleService.class, "amqpModule");
        subjoinExampleService.add(22, 33).thenAccept(integer -> log.info("async invoker amqp result: {}", integer));
    }
}
```

上述代码中，`org.coodex.concrete.demo.api.CompletableSubjoinExampleService`就是`concrete-rx-builder`生成的Completable API接口

```txt
2022-05-03 22:23:19 [rx-client.scheduler-1] INFO  org.coodex.concrete.client.amqp.AMQPInvoker - message send: {"content":{"x1":22,"x2":33},"subjoin":{"AMQP_CLIENT_PROVIDER":"concrete-amqp-client-0.5.1-RC2"},"msgId":"ifRgduQXpB","concreteTokenId":null,"serviceId":"bc67e54e2ad8eeac9192efd7034ad3ad8df42c40"}
2022-05-03 22:23:19 [amqp.executor.executor-2] INFO  org.coodex.concrete.client.amqp.AMQPInvoker - message received: {"content":55,"msgId":"ifRgduQXpB","ok":true,"subjoin":{"CONCRETE-WARNINGS":"[{\"code\":105001,\"message\":\"22 + 33 太难了 ~>_<~\"}]"}}
2022-05-03 22:23:19 [rx-client.scheduler-1] WARN  org.coodex.concrete.client.WarningClientInterceptor - no warning handler found, but warning occurred.
2022-05-03 22:23:19 [rx-client.scheduler-1] INFO  org.coodex.concrete.demo.client.AsyncAMQPClientDemo - async invoker amqp result: 55
```

::: note
如果你直接在ide内打开这部分代码，你会发现ide报错，但是可以正常运行。这是因为concrete没有为ide开发相关插件让其获取到编译期信息，在`Idea`中，可以通过将`demo-api`模块的target/generated-sources/annotations目录标为source root来处理
:::
