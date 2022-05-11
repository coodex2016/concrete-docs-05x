# 创建工程

建立演示工程，将concrete物料清单放入到依赖管理中

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">

    <modelVersion>4.0.0</modelVersion>

    <groupId>org.coodex.concrete.demo</groupId>
    <artifactId>concrete-demo-051</artifactId>
    <packaging>pom</packaging>
    <version>0.5.1-RC2</version>

    <name>A Concrete Demo</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <concrete.version>0.5.1-RC2</concrete.version>
    </properties>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.coodex.concrete</groupId>
                <artifactId>concrete-bom</artifactId>
                <version>${concrete.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>

    </dependencyManagement>    

</project>

```

`concrete-bom`中定义了`concrete**`、`coodex**`、`spring**`等常用的库和框架，减少构建者管理项目依赖的复杂度。
