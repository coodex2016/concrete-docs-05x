# Role Based Access Control

和绝大多数系统理念一样，concrete 基于角色来进行访问控制。

首先，需要说明一下，角色是角色，权限是权限，这两个概念在 concrete 里完全不同。

- 角色：role，指拥有此角色的是什么样的人，RBAC 的概念上，用来说明什么样的人能够做什么事，比如说，图书管理员可以整理图书陈列柜
- 权限：privilege，指拥有此权限的有指定什么样数据访问范围的人，权限一般会和业务数据关联，如上例，A 区图书管理员不能管理理 B 区图书陈列柜，A 区 B 区就是业务属性

特别的，concrete 的 rbac 支持领域概念，如上例，图书馆里分了两个大类文史类和理工类，我们的图书管理员就变成`文史类.图书管理员`和`理工类.图书管理员`了。

我们就拿这个示例来做一个定义。

```java
package org.coodex.concrete.demo.api.excepted;

import org.coodex.concrete.api.AccessAllow;
import org.coodex.concrete.api.ConcreteService;
import org.coodex.concrete.api.Description;
import org.coodex.concrete.demo.pojo.Book;
import org.coodex.util.Parameter;

@ConcreteService(
        value = "Books",
        nonspecific = true // 抽象的服务，此服务不会直接发布，concrete只会发布具体的服务
)
@AccessAllow(roles = "图书管理员") // 此服务的接口需要图书管理员角色，AccessAllow也可以用来修饰具体服务接口
public interface AbstractLibrary<B extends Book> {

    @Description(name = "销毁一本书")
    @ConcreteService("{name}")
    void delete(@Parameter("name") String name);

    @Description(name = "整理书架")
    void sort();
}
```

```java
package org.coodex.concrete.demo.api.excepted;

import org.coodex.concrete.api.ConcreteService;
import org.coodex.concrete.api.Domain;
import org.coodex.concrete.demo.pojo.BookA;

@ConcreteService("A")
@Domain("文史类")
public interface LibraryA extends AbstractLibrary<BookA> {

}
```

```java
package org.coodex.concrete.demo.api.excepted;

import org.coodex.concrete.api.ConcreteService;
import org.coodex.concrete.api.Domain;
import org.coodex.concrete.demo.pojo.BookB;

@ConcreteService("B")
@Domain("理工类")
public interface LibraryB extends AbstractLibrary<BookB>{
}
```

pojo 的代码就不贴了，直接参考示例就行

实现

```java
package org.coodex.concrete.demo.impl;

import org.coodex.concrete.common.Account;
import org.coodex.concrete.common.NamedAccount;
import org.coodex.concrete.common.Token;
import org.coodex.concrete.demo.api.excepted.AbstractLibrary;
import org.coodex.concrete.demo.pojo.Book;
import org.coodex.util.Common;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.util.Map;

public abstract class AbstractLibraryImpl<B extends Book> implements AbstractLibrary<B> {
    private static final String[] attr = new String[]{
            "大胆的", "愤怒的", "没脑子的"
    };

    private static final String[] names = new String[]{
            "小明", "小红", "小强"
    };
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    @Inject
    private Token token; // 令牌里存放着用户信息

    protected abstract Map<String, Book> getBooks();

    protected abstract String getType();

    private String getAccountName() {
        Account account = token.currentAccount();
        if (account instanceof NamedAccount) {// NamedAccount是
            return ((NamedAccount) account).getName();
        }
        return Common.random(names) + "(化名)";
    }

    private String getAttr() {
        return Common.random(attr);
    }

    @Override
    public void delete(String name) {
        if (getBooks().containsKey(name)) {
            Book book = getBooks().remove(name);
            log.info("{} {} 把 {} 图书[{}]销毁了。", getAttr(), getAccountName(), getType(), book);
        } else {
            log.info("nothing happened.");
        }
    }

    @Override
    public void sort() {
        getBooks().clear();
        log.info("哦嚯，{} {} 把 {} 图书全部销毁了。", getAttr(), getAccountName(), getType());
    }
}
```

```java
package org.coodex.concrete.demo.impl;

import org.coodex.concrete.demo.api.excepted.LibraryA;
import org.coodex.concrete.demo.pojo.Book;
import org.coodex.concrete.demo.pojo.BookA;

import javax.inject.Named;
import java.util.HashMap;
import java.util.Map;

@Named
public class LibraryAImpl extends AbstractLibraryImpl<BookA> implements LibraryA {

    private final Map<String, Book> books = new HashMap<String, Book>() {{
        for (int i = 1; i < 10; i++)
            put("A" + i, new BookA("A" + i, "A" + i));
    }};

    @Override
    protected Map<String, Book> getBooks() {
        return books;
    }

    @Override
    protected String getType() {
        return "文史类";
    }
}
```

```java
package org.coodex.concrete.demo.impl;

import org.coodex.concrete.demo.api.excepted.LibraryB;
import org.coodex.concrete.demo.pojo.Book;
import org.coodex.concrete.demo.pojo.BookB;

import javax.inject.Named;
import java.util.HashMap;
import java.util.Map;

@Named
public class LibraryBImpl extends AbstractLibraryImpl<BookB> implements LibraryB {
    private final Map<String, Book> books = new HashMap<String, Book>() {{
        for (int i = 1; i < 10; i++)
            put("B" + i, new BookB("B" + i, "B" + i));
    }};

    @Override
    protected Map<String, Book> getBooks() {
        return books;
    }

    @Override
    protected String getType() {
        return "理工类";
    }
}
```

例外：这次我们使用正则表达式

```txt
(.+)\.excepted\.(.+)
```

在`application.yml`里开启 RBAC 功能

```yml
concrete:
  interceptors:
    rbac: true # 开启RBAC拦截器
```

::: tip
这是一种开启拦截器的方式，你也可以直接声明一个 RBACInterceptor 的 bean

concrete-core 默认提供了六种拦截器

- rbac: RBACInterceptor，RBAC 拦截器
- limiting: LimitingInterceptor，限流拦截器
- signature: SignatureInterceptor，签名验签拦截器
- log: OperationLogInterceptor，操作日志拦截器
- timing: ServiceTimingInterceptor，服务时间限定拦截器
- beanValidation: BeanValidationInterceptor，入参检查拦截器

:::

调用端

```java
package org.coodex.concrete.demo.client;


import lombok.extern.slf4j.Slf4j;
import org.coodex.concrete.Client;
import org.coodex.concrete.ClientException;
import org.coodex.concrete.demo.api.excepted.LibraryA;
import org.coodex.concrete.demo.api.excepted.LibraryB;

@Slf4j
public class RBACDemoClient {
    private static void demoA() {
        LibraryA library = Client.getInstance(LibraryA.class, "demoModule");
        library.delete("A1");
        library.sort();
        library.delete("A2");
    }

    private static void demoB() {
        LibraryB library = Client.getInstance(LibraryB.class, "demoModule");
        library.delete("B1");
        library.sort();
        library.delete("B2");
    }

    public static void main(String[] args) {
        try {
            demoA();
        } catch (ClientException e) {
            log.info("demoA error: {}, {}", e.getCode(), e.getMessage());
        }

        try {
            demoB();
        } catch (ClientException e) {
            log.info("demoB error: {}, {}", e.getCode(), e.getMessage());
        }
    }
}
```

结果

```txt
INFO  org.coodex.concrete.demo.client.RBACDemoClient - demoA error: 1005, 无登录账户信息: tokenId: null.
```

这是未登录的情况，下面我们来做一个登录，这里涉及到 concrete 的账户接口规范，主要由 Account, NamedAccount, AccountFactory 构成。

::: tip
concrete 的 Account 规范只在账户、角色、有效性方面进行了规范约定，不会涉及属性数据，而且，concrete 的 AccountFactory 也支持聚合多个用户账号系统，在扩展性、灵活性上有较大的空间
:::

DemoLogingService

```java
package org.coodex.concrete.demo.api.excepted;

import org.coodex.concrete.api.ConcreteService;
import org.coodex.util.Parameter;

@ConcreteService
public interface DemoLoginService {

    void login(@Parameter("id") String id);
}
```

DemoAccountFactory

```java
package org.coodex.concrete.demo.impl.account;

import org.coodex.concrete.common.Account;
import org.coodex.concrete.common.AccountFactory;
import org.coodex.concrete.common.NamedAccount;

import javax.inject.Named;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Named
public class DemoAccountFactory implements AccountFactory<String> {

    private static final Map<String, DemoAccount> accounts = new HashMap<String, DemoAccount>() {{
        put("A", new DemoAccount("A", "大侠A", "文史类"));
        put("B", new DemoAccount("B", "大侠B", "理工类"));
        put("C", new DemoAccount("C", "特权大佬", "*"));
    }};

    public static DemoAccount getAccount(String id){
        return accounts.get(id);
    }

    @Override
    public Account<String> getAccountByID(String s) {
        return getAccount(s);
    }

    public static class DemoAccount implements NamedAccount<String> {
        private final String id;
        private final String name;
        private Set<String> roles = new HashSet<>();

        public DemoAccount(String id, String name, String domain) {
            this.id = id;
            this.name = name;
            roles.add(domain + ".图书管理员");
        }


        @Override
        public String getName() {
            return name;
        }

        @Override
        public String getId() {
            return id;
        }

        @Override
        public Set<String> getRoles() {
            return roles;
        }

        @Override
        public boolean isValid() {
            return true;
        }
    }
}
```

登录服务实现

```java
package org.coodex.concrete.demo.impl;

import org.coodex.concrete.common.IF;
import org.coodex.concrete.common.Token;
import org.coodex.concrete.demo.api.excepted.DemoLoginService;
import org.coodex.concrete.demo.impl.account.DemoAccountFactory;

import javax.inject.Inject;
import javax.inject.Named;

@Named
public class DemoLoginServiceImpl implements DemoLoginService {

    @Inject
    private Token token;

    @Override
    public void login(String id) {
        token.setAccount(
                IF.isNull(
                        DemoAccountFactory.getAccount(id),
                        // 这个用法不规范，应该先定义ErrorCode，然后编写异常资源信息在此使用ErrorCode
                        "none this account: " + id
                        )
        );
        // 该用户是可信的，与@safely注解有关，详见concrete-api说明
        token.setAccountCredible(true);
    }
}
```

增加登录演示

```java
    public static void main(String[] args) {
        String[] users = new String[]{
                "A", "B", "C", "D"
        };
        for (String s : users) {
            try {
                DemoLoginService demoLoginService = Client.getInstance(DemoLoginService.class, "demoModule");
                demoLoginService.login(s);
                try {
                    demoA();
                } catch (ClientException e) {
                    log.info("demoA [user: {}] error: {}, {}", s, e.getCode(), e.getMessage());
                }

                try {
                    demoB();
                } catch (ClientException e) {
                    log.info("demoB [user: {}] error: {}, {}", s, e.getCode(), e.getMessage());
                }
            } catch (ClientException e) {
                log.info("login failed: {}", e.getLocalizedMessage());
            }
        }
    }
```

为了清晰的看到结果，我们把 jaxrs 的调式信息关掉`jaxrs.logger.level.server|client: none`

服务端：

```txt
2022-05-07 18:52:31.039  INFO 43991 --- [vice.executor-2] o.c.concrete.demo.impl.LibraryAImpl      : 愤怒的 大侠A 把 文史类 图书[{name='A1', code='A1', type='文史类'}]销毁了。
2022-05-07 18:52:31.050  INFO 43991 --- [vice.executor-3] o.c.concrete.demo.impl.LibraryAImpl      : 哦嚯，没脑子的 大侠A 把 文史类 图书全部销毁了。
2022-05-07 18:52:31.060  INFO 43991 --- [vice.executor-4] o.c.concrete.demo.impl.LibraryAImpl      : nothing happened.
2022-05-07 18:52:31.378  INFO 43991 --- [vice.executor-8] o.c.concrete.demo.impl.LibraryBImpl      : 愤怒的 大侠B 把 理工类 图书[{name='B1', code='B1', type='理工类'}]销毁了。
2022-05-07 18:52:31.387  INFO 43991 --- [vice.executor-9] o.c.concrete.demo.impl.LibraryBImpl      : 哦嚯，愤怒的 大侠B 把 理工类 图书全部销毁了。
2022-05-07 18:52:31.396  INFO 43991 --- [ice.executor-10] o.c.concrete.demo.impl.LibraryBImpl      : nothing happened.
2022-05-07 18:52:31.414  INFO 43991 --- [ice.executor-12] o.c.concrete.demo.impl.LibraryAImpl      : nothing happened.
2022-05-07 18:52:31.422  INFO 43991 --- [ice.executor-13] o.c.concrete.demo.impl.LibraryAImpl      : 哦嚯，没脑子的 特权大佬 把 文史类 图书全部销毁了。
2022-05-07 18:52:31.431  INFO 43991 --- [ice.executor-14] o.c.concrete.demo.impl.LibraryAImpl      : nothing happened.
2022-05-07 18:52:31.442  INFO 43991 --- [ice.executor-15] o.c.concrete.demo.impl.LibraryBImpl      : nothing happened.
2022-05-07 18:52:31.454  INFO 43991 --- [ice.executor-16] o.c.concrete.demo.impl.LibraryBImpl      : 哦嚯，愤怒的 特权大佬 把 理工类 图书全部销毁了。
2022-05-07 18:52:31.461  INFO 43991 --- [ice.executor-17] o.c.concrete.demo.impl.LibraryBImpl      : nothing happened.
2022-05-07 18:52:31.478  WARN 43991 --- [ice.executor-18] o.c.c.jaxrs.ConcreteExceptionMapper      : exception occurred: none this account: D
```

客户端：

```txt
2022-05-07 18:52:31 [main] INFO  org.coodex.concrete.demo.client.RBACDemoClient - demoB [user: A] error: 1006, 未授权.
2022-05-07 18:52:31 [main] INFO  org.coodex.concrete.demo.client.RBACDemoClient - demoA [user: B] error: 1006, 未授权.
2022-05-07 18:52:31 [main] INFO  org.coodex.concrete.demo.client.RBACDemoClient - login failed: 未知错误: none this account: D.
```

根据上述信息，我们看到，A 用户管理了文史类的书籍，无权管理理工类的数据，B 用户管理了理工类的书籍，无权管理文史类的书籍，C 两类都可以管理

::: tip concrete-accounts

concrete-accounts 模块中提供了两种参考实现，一种是 simple-account，使用资源文件作为用户信息提供，另一种是组织结构类型的账户系统，开箱即用，同时也支持自行扩展，或者基于已有包扩展
:::
