# 签名验签

很多场景下，我们的服务会需要对外部提供数据接口，如果是使用账户鉴权，我们上一节已经看到了，只需要登录，然后带着令牌进行请求就可以了。更多的情况，我们为了防伪造防抵赖，会使用签名验签的方式，`concrete`在这方面也做了设计，本小节我们看看怎么做。

## 体验

定义一个需要签名的服务

```java
package org.coodex.concrete.demo.api.excepted;

import org.coodex.concrete.api.ConcreteService;
import org.coodex.concrete.api.Signable;
import org.coodex.concrete.demo.pojo.ExamplePojo;
import org.coodex.util.Parameter;

@Signable // 声明这个服务需要签名，也可以作用在服务接口上
@ConcreteService
public interface DemoSignatureService {

    void doSomeThing(@Parameter("a") Integer a,
                     @Parameter("kkk") String kkk,
                     @Parameter("pojo") ExamplePojo pojo);
}
```

pojo

```java
package org.coodex.concrete.demo.pojo;

import lombok.Data;
import org.coodex.concrete.api.pojo.StrID;

import java.util.ArrayList;
import java.util.List;

@Data
public class ExamplePojo {
    private String x1 = "随便什么吧";

    private List<StrID<String>> example = new ArrayList<StrID<String>>() {{
        for (int i = 0; i < 3; i++) {
            StrID<String> stringStrID = new StrID<>();
            stringStrID.setId("id" + i);
            stringStrID.setPojo("我是POJO_" + i);
            add(stringStrID);
        }
    }};
}
```

实现。演示如何获取签名方信息

```java
package org.coodex.concrete.demo.impl;

import lombok.extern.slf4j.Slf4j;
import org.coodex.concrete.core.signature.SignUtil;
import org.coodex.concrete.demo.api.excepted.DemoSignatureService;
import org.coodex.concrete.demo.pojo.ExamplePojo;

import javax.inject.Named;

@Named
@Slf4j
public class DemoSignatureServiceImpl implements DemoSignatureService {
    @Override
    public void doSomeThing(Integer a, String kkk, ExamplePojo pojo) {
        log.info("client keyId: {}, alg: {}, noise: {}, sign: {}",
                SignUtil.getKeyId(),
                SignUtil.getAlgorithm(),
                SignUtil.getNoise(),
                SignUtil.getSign());
    }
}
```

调用端

```java
package org.coodex.concrete.demo.client;

import org.coodex.concrete.Client;
import org.coodex.concrete.demo.api.excepted.DemoSignatureService;
import org.coodex.concrete.demo.pojo.ExamplePojo;

public class SignatureDemoClient {

    public static void main(String[] args) {
        DemoSignatureService demoSignatureService = Client.getInstance(DemoSignatureService.class, "demoModule");
        demoSignatureService.doSomeThing(1, "kkk", new ExamplePojo());
    }
}

```

开启签名拦截器，因为我们的调用端和服务端在一个工程里，并且 java client 没有在 DI 容器里，所以我们用两种方式分别定义拦截器

服务端：

```yml
concrete:
  interceptors:
    rbac: true
    signature: true #启用签名切片
```

客户端：在 test 作用域中

`META-INF/services/org.coodex.concrete.core.intercept.ConcreteInterceptor`

```txt
org.coodex.concrete.core.intercept.SignatureInterceptor
```

调用一下

```txt
Exception in thread "main" org.coodex.concrete.common.ConcreteException: 未知错误: no privateKey..
```

因为这个接口需要签名，没有配置签名相关信息，所以无法成功调用。

我们配置一下签名验签的信息，默认使用 Profile

`client.demoModule.yml` , 这里简单一说，客户端调用需要签名接口时，为了隔离不同目标，会优先到当前模块找签名所需信息，如果使用 Destination 的方式，会按照 Destination 的 Identify 属性查找

```yml
signature:
  keyId: app00001
  algorithm: HmacSHA256
  hmacKey: Davidoff is handsome # 默认的HmacKeyStore方案
```

::: note
上述的内容等同于`concrete.yml`中增加

```yml
client:
  demoModule:
    signature:
      keyId: app00001
      algorithm: HmacSHA256
      hmacKey: Davidoff is handsome # 默认的HmacKeyStore方案
```

:::

服务端`signature.yml`

```yml
hmacKey:
  app00001: Davidoff is handsome # 默认的HmacKeyStore方案
```

::: tip
等同于在`application.yml`中增加

```yml
concrete:
  signature:
    hmacKey:
      app00001: Davidoff is handsome # 默认的HmacKeyStore方案
```

:::

```txt
2022-05-07 19:17:51.729  INFO 44501 --- [vice.executor-4] o.c.c.d.impl.DemoSignatureServiceImpl    : client keyId: app00001, alg: HmacSHA256, noise: 942880434, sign: /bhA70FC6QM289wLAJIicQGgGA4JemvKpWUrhgcoLic=
```

```txt
2022-05-07 19:17:50 [main] DEBUG org.coodex.concrete.core.intercept.AbstractSignatureInterceptor - signature for[ doSomeThing ]: 
	noise: 942880434
	algorithm: HmacSHA256
	keyId: app00001
	sign: /bhA70FC6QM289wLAJIicQGgGA4JemvKpWUrhgcoLic=
	body: a=1&algorithm=HmacSHA256&keyId=app00001&kkk=kkk&noise=942880434&pojo=example%3Did%253Did0%2526pojo%253D%2525E6%252588%252591%2525E6%252598%2525AFPOJO_0%26example%3Did%253Did1%2526pojo%253D%2525E6%252588%252591%2525E6%252598%2525AFPOJO_1%26example%3Did%253Did2%2526pojo%253D%2525E6%252588%252591%2525E6%252598%2525AFPOJO_2%26x1%3D%25E9%259A%258F%25E4%25BE%25BF%25E4%25BB%2580%25E4%25B9%2588%25E5%2590%25A7
```

你可以试着自己调整传输的数据以及签名设置试试。

## 扩展

签名验签部分的扩展点不少，IronPen， KeyStore, SignatureSerializer， 返回值签验，签名属性重载，NoiseGenerator，NoiseValidator 等等，在这里先做一个说明，后续在 concrete 工具链中详细说明

- IronPen:
  - 用来签名的铁笔，命名源自《国家宝藏 1》，线索指向独立宣言那一段，concrete-core 提供了 Hmac 和 RSA 的签验方式
- KeyStore:
  - 签名密钥读取，根据算法来
  - HMAC_KeyStore，默认提供的是 Configuration 获取，可自行扩展从持久化仓库或配置中心读取，实现它就行
    - 服务端，`signature`命名空间下，优先级 `hmacKey.paperName.keyId` 高于 `hmacKey.paperName` 高于 `hmacKey.keyId` 高于 `hmacKey`
    - 客户端，`client`/`模块`命名空间下，优先级 `signature.hmacKey.paperName.keyId` 高于 `signature.hmacKey.paperName` 高于 `signature.hmacKey.keyId` 高于 `signature.hmacKey`
  - RSA_KeyStore，自定义方式同上。优先级
    - 私钥：Config 高于 pem 文件
      - Config 中 `rsa.privateKey.paperName.keyId` > `rsa.privateKey.paperName` > `rsa.privateKey.keyId` > `rsa.privateKey`
      - pem 文件 `paperName.keyId.pem` > `keyId.pem` > `paperName.pem`
    - 公钥：Config 高于 crt 文件
      - Config 中 `rsa.publicKey.paperName.keyId` > `rsa.publicKey.paperName` > `rsa.publicKey.keyId` > `rsa.publicKey`
      - crt 文件 `paperName.keyId.crt` > `keyId.crt` > `paperName.crt`
- SignatureSerializer：需要签名的内容组织与序列化，默认提供的键值对 encode、键字典排序使用&链接的方式，空值不参与签名
- 返回值签名：返回值类型继承`org.coodex.concrete.api.pojo.Signature`即可
- 签名属性重载：concrete-core 默认的签名相关域包括 algorithm、sign、keyId、noise；
  - 服务端可以通过配置`signature`命名空间下的相关 Configuration 项(`signature.property.*`)进行重载，
  - 客户端可以通过配置`client`/`模块`命名空间下的相关 Configuration 项(`signature.property.*`)进行重载，
- NoiseGenerator，NoiseValidator，用于生成噪音和噪音验证，自行实现可以有效防止重放攻击，默认实现并没有包含安全相关的设计，但是允许你可以扩展啊
