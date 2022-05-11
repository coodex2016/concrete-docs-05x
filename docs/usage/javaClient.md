# Java Client

截止到目前，我们看到的都是通过`concrete-jaxrs-spring-boot`发布服务，使用`swagger`调试服务。在本节，我们看看如果使用 Java Client 来调用服务。

## 开启调试信息

`demo-boot`的 test 作用域中，新建一个`application.yml`文件如下：

```yml
concrete:
  jaxrs:
    logger:
      level:
        # 可选值为TRACE,DEBUG,INFO,WARN,ERROR,不建议使用WARN以及ERROR级别
        # 可选值以外则表示不输出
        server: info #默认不开启，生产环境不建议开启
```

::: note
`concrete-jaxrs-spring-boot`将`concrete`相关配置项整合到了`application.yml`中，单独定义在`concrete.yml`也可以。
:::

## 新建`demo-client`模块

- 新建模块来调用 Jaxrs 发布的服务，增加依赖，说明已经备注上了

```xml
<!-- 依赖api模块 -->
<dependency>
    <groupId>${project.parent.groupId}</groupId>
    <artifactId>demo-api</artifactId>
    <version>${project.parent.version}</version>
</dependency>

<!-- 调用jaxrs发布的concrete服务 -->
<dependency>
    <groupId>org.coodex.concrete.jaxrs</groupId>
    <artifactId>concrete-jaxrs-client</artifactId>
</dependency>

<!-- 以下：jersey相关依赖 -->
<!-- 使用jersey作为jaxrs2.0的provider -->
<dependency>
    <groupId>org.glassfish.jersey.core</groupId>
    <artifactId>jersey-client</artifactId>
</dependency>
<!-- jersey的jackson插件-->
<dependency>
    <groupId>org.glassfish.jersey.media</groupId>
    <artifactId>jersey-media-json-jackson</artifactId>
</dependency>

<!-- jersey使用hk2的InjectionManagerFactory模块 -->
<dependency>
    <groupId>org.glassfish.jersey.inject</groupId>
    <artifactId>jersey-hk2</artifactId>
</dependency>
<!-- 以上：jersey相关依赖 -->

<!-- 因为不在spring-boot环境里，所以显示依赖log4j-slf4j-impl显示调试信息 -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-slf4j-impl</artifactId>
</dependency>

<!-- 使用jackson2作为json序列化provider。concrete默认使用fastjson作为json序列化框架，不引入此模块则需依赖fastjson -->
<dependency>
    <groupId>org.coodex.concrete</groupId>
    <artifactId>concrete-serializer-jackson2</artifactId>
</dependency>

<!-- 引入snakeyaml后，coodex Profile可自动支持yml -->
<dependency>
    <groupId>org.yaml</groupId>
    <artifactId>snakeyaml</artifactId>
</dependency>
```

增加 log4j2 的配置 `log4j2.xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<Configuration xmlns="http://logging.apache.org/log4j/2.0/config">
    <Properties>
        <Property name="LOG_PATTERN">%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</Property>
    </Properties>
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="${LOG_PATTERN}"/>
        </Console>
    </Appenders>
    <Loggers>
        <Root level="INFO">
            <AppenderRef ref="Console"/>
        </Root>
    </Loggers>
</Configuration>
```

## 基于模块约定调用

```java
package org.coodex.concrete.demo.client;

import org.coodex.concrete.Client;
import org.coodex.concrete.demo.api.SubjoinExampleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JaxRSClientDemo1 {
    private final static Logger log = LoggerFactory.getLogger(JaxRSClientDemo1.class);

    public static void main(String[] args) {
        log.info("restful service invoked: {}",
                Client.getInstance(SubjoinExampleService.class, "demoModule").add(11, 12));
    }
}
```

代码中的`demoModule`是我们约定的一个模块名，对于当前的这个 client 来说，我们还需要给它声明一下`demoModule`在哪，在`concrete`中，采用这种命名方式，我们只需要在[`Config`](https://docs.coodex.org/lib/coodex-utilities/org.coodex.util.Config.html)可以检索到的命名空间【命名空间为: client, _moduleName_】定义即可:

concrete.yml

```yml
client:
  demoModule: # demoModule声明
    destination: http://localhost:8080/jaxrs

jaxrs: # 定义jaxrs client的logger级别
  logger:
    level:
      client: INFO #默认DEBUG
```

ok，server 端跑起来，然后跑 client，大概能看到的信息如下：

server 端：

```txt
2022-05-03 21:29:13.867  INFO 91279 --- [nio-8080-exec-4] o.c.concrete.jaxrs.logging.ServerLogger  : 2 * Server has received a request on thread http-nio-8080-exec-4
2 > POST http://localhost:8080/jaxrs/SubjoinExample/add
2 > accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
2 > accept-encoding: gzip
2 > accept-language: zh-CN
2 > connection: keep-alive
2 > content-length: 17
2 > content-type: application/json;charset=UTF-8
2 > host: localhost:8080
2 > user-agent: Jersey/2.32 (HttpUrlConnection 1.8.0_271)
2 > x-client-provider: concrete-client-jaxrs 0.5.1-RC2
{"x1":11,"x2":12}

2022-05-03 21:29:13.873  INFO 91279 --- [ice.executor-23] o.c.concrete.jaxrs.logging.ServerLogger  : 2 * Server responded with a response on thread service.executor-23
2 < 200
2 < CONCRETE-WARNINGS: %5B%7B%22code%22%3A105001%2C%22message%22%3A%2211+%2B+12+%E5%A4%AA%E9%9A%BE%E4%BA%86+%7E%3E_%3C%7E%22%7D%5D[decoded value:[{"code":105001,"message":"11 + 12 太难了 ~>_<~"}]]
2 < Content-Type: application/json;charset=UTF-8
23
```

client 端

```txt
2022-05-03 21:29:13 [main] INFO  org.coodex.concrete.jaxrs.logging.ClientLogger - 1 * Sending client request on thread main
1 > POST http://localhost:8080/jaxrs/SubjoinExample/add
1 > Accept-Encoding: gzip
1 > Accept-Language: zh-CN
1 > Content-Type: application/json;charset=UTF-8
1 > X-CLIENT-PROVIDER: concrete-client-jaxrs 0.5.1-RC2
{"x1":11,"x2":12}

2022-05-03 21:29:13 [main] INFO  org.coodex.concrete.jaxrs.logging.ClientLogger - 1 * Client response received on thread main
1 < 200
1 < CONCRETE-WARNINGS: %5B%7B%22code%22%3A105001%2C%22message%22%3A%2211+%2B+12+%E5%A4%AA%E9%9A%BE%E4%BA%86+%7E%3E_%3C%7E%22%7D%5D[decoded value:[{"code":105001,"message":"11 + 12 太难了 ~>_<~"}]]
1 < Connection: keep-alive
1 < Content-Length: 2
1 < Content-Type: application/json;charset=UTF-8
1 < Date: Tue, 03 May 2022 13:29:13 GMT
1 < Keep-Alive: timeout=60
23

2022-05-03 21:29:13 [main] WARN  org.coodex.concrete.client.WarningClientInterceptor - no warning handler found, but warning occurred.
2022-05-03 21:29:13 [main] INFO  org.coodex.concrete.demo.client.JaxRSClientDemo1 - restful service invoked: 23
```

::: note
因为这个接口给出了一个警告，而当前客户端环境中没有WarningHandle，所以上述日志中提示了一个`no warning handler found, but warning occurred`的警告，提示我们没有 WarningHandle 来处理 Java client 收到的警告信息，当你需要处理服务端返回的警告信息时，只需要实现一个`org.coodex.concrete.client.WarningHandle`放到 SPI 中即可。
:::

我们切换一下 client 端运行的语言环境: java 参数增加 -Duser.language=en -Duser.region=US

```txt
2022-05-03 21:32:48 [main] INFO  org.coodex.concrete.jaxrs.logging.ClientLogger - 1 * Sending client request on thread main
1 > POST http://localhost:8080/jaxrs/SubjoinExample/add
1 > Accept-Encoding: gzip
1 > Accept-Language: en-US
1 > Content-Type: application/json;charset=UTF-8
1 > X-CLIENT-PROVIDER: concrete-client-jaxrs 0.5.1-RC2
{"x1":11,"x2":12}

2022-05-03 21:32:48 [main] INFO  org.coodex.concrete.jaxrs.logging.ClientLogger - 1 * Client response received on thread main
1 < 200
1 < CONCRETE-WARNINGS: %5B%7B%22code%22%3A105001%2C%22message%22%3A%2211+%2B+12+is+too+hard+%7E%3E_%3C%7E%22%7D%5D[decoded value:[{"code":105001,"message":"11 + 12 is too hard ~>_<~"}]]
1 < Connection: keep-alive
1 < Content-Length: 2
1 < Content-Type: application/json;charset=UTF-8
1 < Date: Tue, 03 May 2022 13:32:48 GMT
1 < Keep-Alive: timeout=60
23

2022-05-03 21:32:49 [main] WARN  org.coodex.concrete.client.WarningClientInterceptor - no warning handler found, but warning occurred.
2022-05-03 21:32:49 [main] INFO  org.coodex.concrete.demo.client.JaxRSClientDemo1 - restful service invoked: 23
```

## 使用 Desination 来调用

```java
package org.coodex.concrete.demo.client;

import lombok.extern.slf4j.Slf4j;
import org.coodex.concrete.Client;
import org.coodex.concrete.client.Destination;
import org.coodex.concrete.client.jaxrs.JaxRSDestination;
import org.coodex.concrete.demo.api.SubjoinExampleService;

@Slf4j
public class JaxRSClientDemo2 {
    public static void main(String[] args) {
        Destination destination = new JaxRSDestination();
        destination.setLocation("http://localhost:8080/jaxrs");
        log.info("restful service invoked: {}",
                Client.getInstance(SubjoinExampleService.class, destination).add(11, 12));
    }
}
```

这种方式下，我们可以动态构建调用目标信息，减少外部配置。比方说，我们的系统可能需要向多个 concrete 服务节点推送信息，而且数量可能增加，那么，我们可以通过数据库管理目标节点信息，使用这种方式调用目标节点的数据服务。0.5.1 开始增加了对 spring-cloud 微服务的支持，相关使用参见后续案例。

## 使用 DI

concrete-client 也可以按照 javax.inject 规范来使用，依赖 concrete-core-spring。我们在后续章节演示。先说明一下，使用DI的调用模式，本质上也是基于模块约定的，注入模式如下：

```java
    @Inject
    @ConcreteClient("demoModule") // 约定的模块名
    private SubjoinExampleService subjoinExampleService;
```
