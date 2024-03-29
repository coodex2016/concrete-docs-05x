# 服务时间限定

这个点来自于我个人碰到过的一个需求，不一定很通用，这个点应该只是 concrete 拦截器的一个应用而已，作为规范提出并不合适，或者我们就把它看作是规范的应用案例吧。不想看的直接跳过本节即可。

我们新建一个服务

```java
package org.coodex.concrete.demo.api;

import org.coodex.concrete.api.ConcreteService;
import org.coodex.concrete.api.ServiceTiming;

@ConcreteService
public interface TimeLimitedService {

    @ServiceTiming("breakfast")
    void breakfast();

    @ServiceTiming("lunch")
    void lunch();

    @ServiceTiming("dinner")
    void dinner();

    @ServiceTiming({"workday", "worktime"})
    void work();
}
```

`application.yml`开启拦截器

```yml
concrete:
  interceptors:
    timing: true # 开启时间限定拦截器
```

时间段配置

```yml
concrete:
  service-timing:
    breakfast:
      type: TIMERANGE
      range: 07:00-09:00
    lunch:
      type: TIMERANGE
      range: 11:40-13:00
    dinner:
      type: TIMERANGE
      range: 18:00-20:00
    workday:
      type: WORKDAY
    worktime:
      type: TIMERANGE
      range: 08:30-12:00; 13:30-17:30
```

::: note
等同于 `service-timing.yml`中定义

```yml
breakfast:
  type: TIMERANGE
  range: 07:00-09:00
lunch:
  type: TIMERANGE
  range: 11:40-13:00
dinner:
  type: TIMERANGE
  range: 18:00-20:00
workday:
  type: WORKDAY
worktime:
  type: TIMERANGE
  range: 08:30-12:00; 13:30-17:30
```

:::
