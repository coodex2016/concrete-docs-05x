# 前端脚本生成

concrete支持三种前端脚本和rxjava的代码生成。

使用比较简单，我们在前一节的基础上进行演示

```java
package org.coodex.concrete.demo.api;

import org.coodex.concrete.apitools.API;

import java.io.IOException;

public class CodeGenerator {

    public static void main(String[] args) throws IOException {
        API.generateFor("jquery", "org.coodex.concrete.demo.**.api");
        API.generateFor("axios", "org.coodex.concrete.demo.**.api");
        API.generateFor("angular", "org.coodex.concrete.demo.**.api");
    }

}
```

`api_gen.jquery.yml`

```yml
desc: JaxRS.code.jquery.js.v1
path: demo-api/code/jquery
```

`api_gen.axios.yml`

```yml
desc: JaxRS.code.axios.js.v1
path: demo-api/code/axios
```

`api_gen.angular.yml`

```yml
desc: JaxRS.code.angular.ts.v2
path: demo-api/code/angular
```

所有生成的代码已经随着demo库上传了。
