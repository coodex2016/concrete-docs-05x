# 限流

每一个对外提供的 API 接口都是需要做流量控制的，不然会导致系统直接崩溃。很简单的例子，和保险丝的原理一样，如果用电负荷超载就会烧断保险丝断掉电源以达到保护整个电路的作用。API 限流的意义也是如此，如果 API 上的流量请求超过核定的数值我们就得对请求进行引流或者直接拒绝等操作。

`concrete`预定义了两种限流模式，最大并发及令牌桶，默认令牌桶限流。开发者也可以根据需要自己的需要扩展限流策略。

## 使用

新定义一个服务用来做限流演示。

```java
package org.coodex.concrete.demo.api.excepted;

import org.coodex.concrete.api.ConcreteService;
import org.coodex.concrete.api.limiting.MaximumConcurrency;
import org.coodex.concrete.api.limiting.TokenBucket;

@ConcreteService
public interface LimitingService {

    @MaximumConcurrency(strategy = "demo")
    void demoMaximumConcurrency();

    @TokenBucket(
            bucket = "demo", // 使用哪个桶里的令牌
            tokenUsed = 10 // 本服务一次需要10个令牌
    )
    void demoTokenBucket();
}
```

实现

```java
package org.coodex.concrete.demo.impl;

import org.coodex.concrete.demo.api.excepted.LimitingService;
import org.coodex.util.Common;

import javax.inject.Named;

@Named
public class LimitingServiceImpl implements LimitingService {
    @Override
    public void demoMaximumConcurrency() {
        Common.sleep(10000);// 拖延十秒形成并发量
    }

    @Override
    public void demoTokenBucket() {
        // doNothing
    }
}
```

`application.yml` 开启拦截器

```yml
concrete:
  interceptors:
    limiting: true # 开启限流拦截器
```

分别设置比较小的参数

`application.yml`

```yml
concrete:
  limiting:
    maximum-concurrency:
      demo: # @MaximumConcurrency中的strategy，针对同一个应用服务，可以定义多个策略
        max: 3
    token-bucket:
      demo:
        capacity: 50 # 令牌桶容量
        flow: 20 # 每秒流入几个令牌
```

::: note
等同于

`limiting.maximum-concurrency.yml`

```yml
demo: # @MaximumConcurrency中的strategy，针对同一个应用服务，可以定义多个策略
  max: 3
```

`limiting.token-bucket.yml`

```yml
demo:
  capacity: 50 # 令牌桶容量
  flow: 20 # 每秒流入几个令牌
```

:::

客户端模拟演示

```java
package org.coodex.concrete.demo.client;

import lombok.extern.slf4j.Slf4j;
import org.coodex.concrete.Client;
import org.coodex.concrete.ClientException;
import org.coodex.concrete.demo.api.excepted.LimitingService;
import org.coodex.concurrent.ExecutorsHelper;
import org.coodex.util.Common;

import java.util.concurrent.ExecutorService;

@Slf4j
public class LimitingServiceDemo {

    private static final ExecutorService EXECUTOR_SERVICE =
            ExecutorsHelper.newFixedThreadPool(30, "demo");

    public static void main(String[] args) {
        LimitingService limitingService = Client.getInstance(LimitingService.class, "demoModule");
        // 连着请求 demoMaximumConcurrency
        for (int i = 1; i <= 20; i++) {
            int finalI = i;
            EXECUTOR_SERVICE.execute(() -> {

                try {
                    limitingService.demoMaximumConcurrency();
                } catch (ClientException e) {
                    log.info("{}, demoMaximumConcurrency {}", finalI, e.getLocalizedMessage());
                }
            });
            Common.sleep(1000);
        }


        EXECUTOR_SERVICE.execute(() -> {
            for (int i = 1; i < 30; i++) {
                try {
                    limitingService.demoTokenBucket();
                } catch (ClientException e) {
                    log.info("{}, demoTokenBucket {}", i, e.getLocalizedMessage());
                }
                if (i % 5 == 0) { // 每5个任务一组，每组之间休息800毫秒
                    Common.sleep(800);
                }
            }
        });
    }
}
```

```txt
2022-05-09 09:14:30 [demo-4] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 4, demoMaximumConcurrency 过载.
2022-05-09 09:14:30 [demo-5] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 5, demoMaximumConcurrency 过载.
2022-05-09 09:14:31 [demo-6] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 6, demoMaximumConcurrency 过载.
2022-05-09 09:14:32 [demo-7] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 7, demoMaximumConcurrency 过载.
2022-05-09 09:14:33 [demo-8] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 8, demoMaximumConcurrency 过载.
2022-05-09 09:14:34 [demo-9] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 9, demoMaximumConcurrency 过载.
2022-05-09 09:14:35 [demo-10] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 10, demoMaximumConcurrency 过载.
2022-05-09 09:14:36 [demo-11] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 11, demoMaximumConcurrency 过载.
2022-05-09 09:14:37 [demo-12] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 12, demoMaximumConcurrency 过载.
2022-05-09 09:14:41 [demo-16] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 16, demoMaximumConcurrency 过载.
2022-05-09 09:14:42 [demo-17] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 17, demoMaximumConcurrency 过载.
2022-05-09 09:14:43 [demo-18] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 18, demoMaximumConcurrency 过载.
2022-05-09 09:14:44 [demo-19] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 19, demoMaximumConcurrency 过载.
2022-05-09 09:14:45 [demo-20] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 20, demoMaximumConcurrency 过载.
2022-05-09 09:14:47 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 7, demoTokenBucket 过载.
2022-05-09 09:14:47 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 8, demoTokenBucket 过载.
2022-05-09 09:14:47 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 9, demoTokenBucket 过载.
2022-05-09 09:14:47 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 10, demoTokenBucket 过载.
2022-05-09 09:14:48 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 13, demoTokenBucket 过载.
2022-05-09 09:14:48 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 14, demoTokenBucket 过载.
2022-05-09 09:14:48 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 15, demoTokenBucket 过载.
2022-05-09 09:14:49 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 18, demoTokenBucket 过载.
2022-05-09 09:14:49 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 19, demoTokenBucket 过载.
2022-05-09 09:14:49 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 20, demoTokenBucket 过载.
2022-05-09 09:14:50 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 22, demoTokenBucket 过载.
2022-05-09 09:14:50 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 23, demoTokenBucket 过载.
2022-05-09 09:14:50 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 24, demoTokenBucket 过载.
2022-05-09 09:14:50 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 25, demoTokenBucket 过载.
2022-05-09 09:14:51 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 28, demoTokenBucket 过载.
2022-05-09 09:14:51 [demo-21] INFO  org.coodex.concrete.demo.client.LimitingServiceDemo - 29, demoTokenBucket 过载.
```

```txt
2022-05-09 09:14:46.917  INFO 54899 --- [ice.executor-21] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 40
2022-05-09 09:14:46.923  INFO 54899 --- [ice.executor-22] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 30
2022-05-09 09:14:46.928  INFO 54899 --- [ice.executor-23] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 20
2022-05-09 09:14:46.935  INFO 54899 --- [ice.executor-24] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 10
2022-05-09 09:14:46.940  INFO 54899 --- [ice.executor-25] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 0
2022-05-09 09:14:47.751  INFO 54899 --- [ice.executor-26] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens flow in: 16, current: 16, from 1652058886917 to 1652058887751
2022-05-09 09:14:47.751  INFO 54899 --- [ice.executor-26] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 6
2022-05-09 09:14:47.804  INFO 54899 --- [ice.executor-29] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens flow in: 1, current: 7, from 1652058887751 to 1652058887804
2022-05-09 09:14:48.660  INFO 54899 --- [ice.executor-31] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens flow in: 17, current: 24, from 1652058887804 to 1652058888660
2022-05-09 09:14:48.660  INFO 54899 --- [ice.executor-31] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 14
2022-05-09 09:14:48.667  INFO 54899 --- [ice.executor-32] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 4
2022-05-09 09:14:48.711  INFO 54899 --- [vice.executor-6] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens flow in: 1, current: 5, from 1652058888660 to 1652058888711
2022-05-09 09:14:49.527  INFO 54899 --- [vice.executor-7] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens flow in: 16, current: 21, from 1652058888711 to 1652058889527
2022-05-09 09:14:49.527  INFO 54899 --- [vice.executor-7] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 11
2022-05-09 09:14:49.535  INFO 54899 --- [vice.executor-8] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 1
2022-05-09 09:14:49.581  INFO 54899 --- [ice.executor-11] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens flow in: 1, current: 2, from 1652058889527 to 1652058889581
2022-05-09 09:14:50.394  INFO 54899 --- [ice.executor-12] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens flow in: 16, current: 18, from 1652058889581 to 1652058890393
2022-05-09 09:14:50.394  INFO 54899 --- [ice.executor-12] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 8
2022-05-09 09:14:50.456  INFO 54899 --- [ice.executor-16] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens flow in: 1, current: 9, from 1652058890393 to 1652058890456
2022-05-09 09:14:51.268  INFO 54899 --- [ice.executor-17] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens flow in: 16, current: 25, from 1652058890456 to 1652058891268
2022-05-09 09:14:51.269  INFO 54899 --- [ice.executor-17] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 15
2022-05-09 09:14:51.276  INFO 54899 --- [ice.executor-18] o.c.c.c.intercept.TokenBucketLimiting    : [demo]tokens picked: 10, remain: 5
```

结合这两段分析，我们看一下限流拦截器怎么做的。

最大并发策略：1、2、3 任务把 3 个并发占满了，4-12 被拒绝，13 执行的时候，1 任务释放了一个并发，14、15 同，16-20 又被拒绝了

令牌桶策略：一开始桶里是满的，1-5 号任务都可以从桶里拿到 10 个令牌，6 号任务执行时，回流了 16 个(800ms 左右)，它也拿到了，7-10 号任务执行时，只剩 6 个令牌，所以被拒绝，11 号任务执行时，回流了 1 + 17 个，桶里变成了 24 个，所以 11/12 正常，13 开始，只剩下 4 个，直到 16 号开始执行时，回流 1+16 个。。。。不再一一解读。

## 扩展

开发者需要自己的限流算法时，实现`org.coodex.concrete.api.LimitingStrategy`放到 SPI 里即可。
