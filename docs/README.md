# Concrete

## 简介

Concrete 是一种基于java的服务定义规范。尝试通过服务定义规范和工具链的支持，最大程度上降低开发者对技术的依赖，让开发者把更多的精力投入到需求分析、接口设计上.

我个人比较推崇技术0价值论，技术就是一堆0，应用场景才是最前面的1，没有应用场景的技术最终还是0，这也是我理解的为什么这么多技术组件选择开源的原因，所以，对于业务应用的开发者来讲，做好应用层才是最体现价值的点。

这也是Concrete的价值观，通过对应用中较通用技术模式在不失扩展性的前提下进行封装来剥离应用开发者的关注点，将精力放到更有价值的事上。

concrete当前版本为0.5.1-RC2，已发布到中央库。

[项目地址 https://github.com/coodex2016/concrete.coodex.org](https://github.com/coodex2016/concrete.coodex.org) 欢迎fork，欢迎提issue

[![jetbrains](./images/jetbrains.svg)](https://www.jetbrains.com)感谢[JetBrains](https://www.jetbrains.com/?from=concrete)提供IDE工具开源授权。

::: info 代码库
本文档所涉及的代码已共享到[github](https://github.com/coodex2016/concrete-demo-051)
:::

## 构成

![concrete-arch](./images/concrete-arch.png)

- concrete-api

  concrete-api主要用于定义concrete服务，包括了命名、RBAC、限流、异常信息、日志、签名验签、文档化、Token、Account、Warning、发布订阅、服务发布等
  
- concrete-core

  对concrete规范的一个默认实现，包括APM、服务结构化、拦截器、签名眼前、Token管理、发布订阅实现等。定义了BeanProvider，由所选择的DI容器自行扩展。
  
- concrete-core-spring

  基于[Spring framework](https://spring.io/projects/spring-framework)的一个BeanProvider实现，为concrete提供DI支持。
  并基于[Spring framework](https://spring.io/projects/spring-framework)封装了concrete-client、Topic等concrete组件的DI规范实现。
  定义了使用concrete-core-spring的一些约定
  
- concrete-api-tools

  根据项目所使用的concrete定义规范，生成服务文档、[jquery](https://github.com/jquery/jquery)、[Angular](https://angular.io/)、[axios](https://github.com/axios/axios)调用脚本

- concrete-**-support

  服务发布的支持系列模块

- concrete-**-client

  基于concrete规范的服务Java同步/异步调用端

- coodex-mock-spec/ coodex-mock-impl

  一套模拟POJO的定义规范/ 实现。[Doc](https://docs.coodex.org/lib/coodex-mock/)

- coodex-utilities

  一些coodex的工具包，以及一些coodex认为比较好用的可扩展机制封装：coodex SPI、Config、Closure、I18N、天上人间等。[Document](https://docs.coodex.org/lib/coodex-utilities/)
