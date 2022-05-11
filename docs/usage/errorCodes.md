# 异常信息

`Concrete`的理念是，服务根据传入数据给出结果，我们称之为“正常”，其他情况都是异常，每个异常给定一个异常码和异常信息，由调用者决定如何处理。

我们通过一个示例来进行说明。

## 示例

我们设计一个新的AddService，它负责处理个位数加法，超出范围时，给调用者返回一个太难了的异常信息。

在`demo-api`模块中，定义一个`DemoErrorCodes`类，用来放异常码常量

```java
package org.coodex.concrete.demo.api;

import org.coodex.concrete.api.ErrorCode;

import static org.coodex.concrete.common.ErrorCodeConstants.CUSTOM_LOWER_BOUND;

@ErrorCode("demo")// 声明此类型是错误码定义，相关定义的命名空间为demo
public class DemoErrorCodes {
    protected static final int DEMO_BASED = CUSTOM_LOWER_BOUND + 5000;

    @ErrorCode.Key("too_hard")// 指明消息模板的key为 demo(命名空间).too_hard
    public static final int TOO_HARD = DEMO_BASED + 1;
}
```

新建十以内加法服务

```java
package org.coodex.concrete.demo.api;

import org.coodex.concrete.api.ConcreteService;
import org.coodex.concrete.api.Description;
import org.coodex.util.Parameter;

@ConcreteService
@Description(name = "十以内加法")
public interface AddWithIn10Service {
    Integer add(@Parameter("x1") Integer x1, @Parameter("x2") Integer x2);
}
```

在`demo-api`的资源目录中`i18n`目录下定义异常信息模板

- `demo.yml`

```yml
demo:
  too_hard: "{0} + {1} is too hard ~>_<~"
```

- `demo_zh_CN.yml`

```yml
demo:
  too_hard: "{0} + {1} 太难了 ~>_<~"
```

在`demo-impl`模块增加实现。先增加`concrete-core`的依赖，在`concrete-core`中，对ErrorCode规范有一套默认实现，开箱即用。

```xml
<dependency>
    <groupId>org.coodex</groupId>
    <artifactId>concrete-core</artifactId>
</dependency>
```

实现类

```java
package org.coodex.concrete.demo.impl;

import org.coodex.concrete.common.IF;
import org.coodex.concrete.demo.api.AddWithIn10Service;

import javax.inject.Named;

import static org.coodex.concrete.demo.api.DemoErrorCodes.TOO_HARD;

@Named
public class AddWithIn10ServiceImpl implements AddWithIn10Service {
    @Override
    public Integer add(Integer x1, Integer x2) {
        // IF是concrete工具链提供的工具之一
        // 下面的接口就是说，如果满足条件（参数1），则抛出TOO_HARD异常(参数2)，并传入信息渲染的参数（参数3，可变参数）
        IF.is(x1 < 0 || x1 > 9 || x2 < 0 || x2 > 9, TOO_HARD, x1, x2);
        return x1 + x2;
    }
}
```

::: tip
IF是concrete工具链提供的工具之一，[点我查看](../concrete-core/IF.md)
:::

还有个工作，上一步中，我们开启了mock，因此需要把这个服务例外出来

`demo-boot`的test作用域中的`mock.excepted`中增加

```txt
org.coodex.concrete.demo.api.AddWithIn10Service
```

跑起来，然后用swagger试试

x1=1,x2=2，结果是正确的，3

x1=10,x2=2，结果如下：

```json
{
  "code": 105001,
  "msg": "10 + 2 太难了 ~>_<~"
}
```

切换一下浏览器的语言顺序，把英语提前，你会看到信息变成了

```json
{
  "code": 105001,
  "msg": "10 + 2 is too hard ~>_<~"
}
```

`concrete`的errorCode机制使用了`coodex-utilities`的[`I18N`](https://docs.coodex.org/lib/coodex-utilities/org.coodex.util.I18N.html)服务，很好的支持了国际化。

::: note
本案例中ErrorCode和Service在同一个包下，如果你的工程分开维护，记得把ErrorCodes的包或者类也注册到Application中
:::

<!-- ## 数据渲染

concrete提供两种数据渲染方式，默认为基于`java.text.MessageFormat`，我们案例种使用的就是这种，另一种是基于Freemarker模板的。现在虽然支持扩展，但是理解和使用上不一定合适，多模板选择也意味着需要掌握的渲染模板知识越多，`coodex`也在犹豫下一步怎么弄，暂时先不推荐选择其他渲染方式。 -->

## 进阶

`Concrete`的异常模板使用的是[`coodex`数据渲染器](https://docs.coodex.org/lib/coodex-utilities/org.coodex.util.Renderer.html)，如果你需要对freemarker模板的支持，需要依赖`org.coodex:coodex-renderer-freemarker`

我们再拿一个service专门演示各种ErrorCode的使用。

- 新建service

```java
package org.coodex.concrete.demo.api;

import org.coodex.concrete.api.ConcreteService;
import org.coodex.concrete.api.Description;
import org.coodex.concrete.demo.pojo.CarInfo;

@ConcreteService
public interface ErrorCodeService {

    @Description(name = "无配置")
    void noneAnnotation();

    @Description(name = "使用Template注解")
    void templateAnnotation();

    @Description(name = "freeMarker模板")
    void freeMarker(CarInfo carInfo);
}

```

- 增加errorCode定义

```java

    @ErrorCode.Key("too_hard")// 指明消息模板的key为 demo(命名空间).too_hard
    public static final int TOO_HARD = DEMO_BASED + 1;

    // 不指定注解，则表示使用 命名空间.错误码 作为模板key
    public static final int NONE_ANNOTATION = DEMO_BASED + 2;

    @ErrorCode.Key("not_exists")
    public static final int NOT_EXISTS = DEMO_BASED + 3;

    @ErrorCode.Template("使用模板注解的例子，参数为: {0}")
    public static final int TEMPLATE_ANNOTATION = DEMO_BASED + 4;

    @ErrorCode.Template("使用freeMarker的例子: ${o1.ownerName} 驾驶着 ${o1.plateCode} 跑过去了")
    public static final int FREE_MARKER_EXAMPLE = DEMO_BASED + 5;
```

- demo_zh_CN.yml中增加NONE_ANNOTATION(demo.105002)的模板

```yml
demo:
  too_hard: "{0} + {1} 太难了 ~>_<~"
  105002: 我是105002错误信息
```

- demo-impl中增加实现

```java
package org.coodex.concrete.demo.impl;

import org.coodex.concrete.common.ConcreteException;
import org.coodex.concrete.common.IF;
import org.coodex.concrete.demo.api.ErrorCodeService;
import org.coodex.concrete.demo.pojo.CarInfo;

import javax.inject.Named;

import static org.coodex.concrete.demo.api.DemoErrorCodes.*;

@Named
public class ErrorCodeServiceImpl implements ErrorCodeService {

    @Override
    public void noneAnnotation() {
        throw new ConcreteException(NONE_ANNOTATION);
    }

    @Override
    public void templateAnnotation() {
        throw new ConcreteException(TEMPLATE_ANNOTATION, "11111");
    }

    @Override
    public void freeMarker(CarInfo carInfo) {
        throw new ConcreteException(
                FREE_MARKER_EXAMPLE,// 使用下面返回的carInfo作为模板渲染的参数
                IF.isNull(carInfo, NOT_EXISTS)// 当carInfo为空时，走NOT_EXISTS异常，否则返回carInfo
        );
    }
}
```

- `demo-boot`中例外`org.coodex.concrete.demo.api.ErrorCodeService`，并增加`org.coodex:coodex-renderer-freemarker`依赖

```xml
<dependency>
    <groupId>org.coodex</groupId>
    <artifactId>coodex-renderer-freemarker</artifactId>
</dependency>
```

跑起来。我们针对这四种情况分别在swagger中分别尝试一下:

### 无配置

```json
{
  "code": 105002,
  "msg": "我是105002错误信息"
}
```

没有对错误码声明注解的，将使用错误号的`命名空间.错误码值`作为模板key来渲染。命名空间(@ErrorCode的value)默认为`message`。

注意，声明了ErrorCode但是没有被注册到Concrete中，将无法读取错误的配置信息，按照默认行为指定模板key，也就是`message.错误码值`。

### 使用Template注解

```json
{
  "code": 105004,
  "msg": "使用模板注解的例子，参数为: 11111"
}
```

可以看到，此错误信息直接使用了@ErrorCode.Template注解的内容作为模板渲染了错误细腻

### freeMaker模板

```json
{
  "code": 105005,
  "msg": "使用freeMarker的例子: 阎庞 驾驶着 皖B3193F 跑过去了"
}
```

上述错误信息按照`使用freeMarker的例子: ${o1.ownerName} 驾驶着 ${o1.plateCode} 跑过去了`进行了渲染

把请求内容置空后

```json
{
  "code": 105003,
  "msg": "demo.not_exists"
}
```

这个错误码定义了@ErrorCode.Key，但是资源文件中并没有这个定义，所以直接使用key进行渲染

### 最佳实践

虽然说上面的例子各种情况都可以很好的运行，但是不同模式在实践方面还是有一定的不足：

- 不配置，或配置了不注册到concrete运行中：资源文件只能按照`命名空间`.`错误码值`方式来组织，可读性差
- 使用@ErrorCode.Template注解：与代码紧耦合，扩展性差，无法I18N

因此，我们推荐使用@ErrorCode.Key对每个错误码进行可读性注解，并且把ErrorCode类都注入到concrete环境中

## 团队协作如何减少冲突？

### 按模块划分

```java
public class ProjectErrorCodes{
    //非具体错误号不要用public
    protected static final int MODULE1 = CUSTOM_LOWER_BOUND;

    protected static final int MODULE2 = MODULE1 + 5000;

    // ....
}

@ErrorCode("module1")
public class Module1ErrorCodes extends ProjectErrorCodes{

    public static final int ERROR1 = MODULE1 + 1;

    //....
}

// ....

```

### 团队协作时按人划分

```java
public class ProjectErrorCodes{

    //非具体错误号不要用public
    protected static final int 西门吹雪 = CUSTOM_LOWER_BOUND;

    protected static final int 陆小凤 = 西门吹雪 + 5000;

    // ....
}

@ErrorCode("ximenchuixue")
public class 西门吹雪ErrorCodes extends ProjectErrorCodes{

    public static final int 挂点 = 西门吹雪 + 1;

    //....
}

// ....

```

好吧，实际上怎么划分无所谓，只要**不重复**，用起来方便，其他看心情就好。我们还是推荐团队做好约定。
