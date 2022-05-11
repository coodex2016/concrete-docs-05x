# Subjoin

用于传递与业务数据无关的信息，比如签名相关信息。除了需要签名验签的服务获取调用者 appId 会用到以外，很少会用到，大家可以跳过此节。

::: note
实际上，对于 concrete 服务的调用者，附加信息只有签名相关以及 warning，concrete client 和部分脚本已经支持
:::

我们再新建一个 Concrete Service，写一个实现，对 Subjoin 使用做一个示例

```java
package org.coodex.concrete.demo.api;

import org.coodex.concrete.api.ConcreteService;
import org.coodex.concrete.api.Description;
import org.coodex.mock.Mock;
import org.coodex.mock.ext.FullName;
import org.coodex.util.Parameter;

@ConcreteService("SubjoinExample")
public interface SubjoinExampleService {

    @Description(name = "向某人say hello",
            description = "当此人为第一次访问时，我们通过subjoin返回新用户的信息")
    String sayHello(
            @FullName // 在swagger中生成一个姓名的样例数据
            @Parameter("name")
            String name);

    @Description(name = "由开发者手动设置warning data的示例",
            description = "同之前的案例一样，不过把异常改为警告，当加数和被加数不是个位数时，向调用者发送一个太难了的警告")
    Integer add(
            @Mock.Number("[0,20]")
            @Parameter("x1")
            Integer x1,
            @Mock.Number("[0,20]")
            @Parameter("x2")
            Integer x2);
}
```

实现

```java
package org.coodex.concrete.demo.impl;

import org.coodex.concrete.common.Subjoin;
import org.coodex.concrete.common.WarningData;
import org.coodex.concrete.demo.api.SubjoinExampleService;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.HashSet;
import java.util.Set;

import static org.coodex.concrete.demo.api.DemoErrorCodes.TOO_HARD;

@Named
public class SubjoinExampleServiceImpl implements SubjoinExampleService {

    // 用来存放访客信息
    private static final Set<String> VISITORS = new HashSet<>();

    @Inject // concrete-core-spring在spring framework中可以自动注入
    private Subjoin subjoin;

    @Override
    public String sayHello(String name) {
        // 使用双重校验锁确保每个访客最多产生一次新访客消息
        if (!VISITORS.contains(name)) {
            synchronized (VISITORS) {
                if (!VISITORS.contains(name)) {
                    VISITORS.add(name);
                    // 告知客户端，这是个新用户
                    subjoin.add("new-user", name);
                }
            }
        }
        return String.format("Hello, %s", name);
    }

    @Override
    public Integer add(Integer x1, Integer x2) {
        if (x1 < 0 || x1 > 9 || x2 < 0 || x2 > 9) {
            subjoin.putWarning(new WarningData(TOO_HARD, x1, x2));
        }
        return x1 + x2;
    }
}
```

mock.excepted 里面例外掉这个服务

然后 run 起来，在 swagger 里面操作一下，sayHello 接口，同一个名字第一次执行，会有一个 new-user 的 header，再执行一次，不再有这个 header，达到预期

add 接口，加数被加数是个位数时，没有 warning，有一个超出个位数范围时，依然能够计算正确结果，但是有个 warning，解码一下

```json
[{ "code": 105001, "message": "1 + 11 太难了 ~>_<~" }]
```

达到预期。
