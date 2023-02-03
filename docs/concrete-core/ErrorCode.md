# 异常码

## `org.coodex.concrete.api.ErrorCode`

用来声明一个模块的异常码定义，该类中，所有的 public static final int 类型的域均会作为异常信息进行注册。

- value(): 此异常类的命名空间，默认为`message`
- `@ErrorCode.Key`: 作用域具体的异常编号常量上，用来声明此异常码对应的 i18n 模板 key
- `@ErrorCode.Template`: 作用域具体的异常编号常量上，用来声明次异常码对应的渲染模板，不推荐
- `@ErrorCode.RequestError`: 作用域具体的异常编号常量上，用来声明此异常码是否是请求端的异常，如果此异常被引发，concrete 默认不在服务端跟踪此类异常

## `org.coodex.concrete.common.ErrorMessageFacade`

异常信息统一接口

- boolean register(Class&lt;?>): 注册一个异常码常量定义类
- Set&lt;Integer> allRegisteredErrorCodes(): 所有已注册的异常码
- String getTemplate(int): 获取异常码的渲染模板
