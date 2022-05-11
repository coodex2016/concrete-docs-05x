import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";import{r as c,o,c as l,a as n,b as p,F as i,e as a,d as s}from"./app.7f86a315.js";var u="/assets/swagger-001.81b3a791.jpg";const r={},k=a(`<h1 id="\u5B9A\u4E49\u4E00\u4E2A-concrete-\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u5B9A\u4E49\u4E00\u4E2A-concrete-\u670D\u52A1" aria-hidden="true">#</a> \u5B9A\u4E49\u4E00\u4E2A Concrete \u670D\u52A1</h1><h2 id="\u5EFA-demo-api-\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#\u5EFA-demo-api-\u6A21\u5757" aria-hidden="true">#</a> \u5EFA demo-api \u6A21\u5757</h2><p>\u5148\u6309\u7167\u7EA6\u5B9A\u521B\u5EFA<code>demo-api</code>\u6A21\u5757\uFF0C\u5F15\u5165<code>concrete-api</code>\u89C4\u8303\u3002</p><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.coodex<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>concrete-api<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u5728\u8FD9\u4E2A\u6A21\u5757\u4E0B\u65B0\u5EFA<code>interface</code></p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>demo<span class="token punctuation">.</span>api</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>api<span class="token punctuation">.</span></span><span class="token class-name">ConcreteService</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@ConcreteService</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AddService</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> x1<span class="token punctuation">,</span> <span class="token keyword">int</span> x2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>ok, \u8FD9\u5C31\u662F\u4E00\u4E2A\u6700\u57FA\u672C\u7684 concrete service \u4E86\u3002\u6709\u4EC0\u4E48\u7528\u5462\uFF1F\u4E0D\u6025\uFF0C\u4E00\u70B9\u70B9\u770B\uFF0C\u5148\u628A\u5B9E\u73B0\u548C\u670D\u52A1\u8DD1\u8D77\u6765\u3002\u4E0B\u9762\u5148\u7B80\u5355\u4E00\u8FC7\uFF0C\u8BA9\u7ED3\u6784\u5B8C\u6574\u8D77\u6765\uFF0C\u6211\u4EEC\u518D\u4E00\u70B9\u70B9\u4E86\u89E3 concrete\u3002</p><h2 id="\u5EFA-demo-impl-\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#\u5EFA-demo-impl-\u6A21\u5757" aria-hidden="true">#</a> \u5EFA demo-impl \u6A21\u5757</h2><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>

    <span class="token comment">&lt;!-- \u4F7F\u7528javax inject\u89C4\u8303,jsr-330 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>javax.inject<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>javax.inject<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>provided<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

    <span class="token comment">&lt;!-- \u4F9D\u8D56api\uFF0C\u5BF9\u5176\u8FDB\u884C\u5B9E\u73B0 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token comment">&lt;!-- \u5BF9\u7528\u540C\u4E00\u4E2A\u9879\u76EE\uFF0C\u9879\u76EE\u5185\u4F9D\u8D56\u5C3D\u91CF\u91C7\u7528\u4EE5\u4E0B\u53D8\u91CF\u65B9\u5F0F\u6307\u5B9AgroupId\u548Cversion --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\${project.parent.groupId}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>demo-api<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\${project.parent.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>\u5B9E\u73B0\uFF0C\u6BD4\u8F83\u7B80\u5355</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>demo<span class="token punctuation">.</span>impl</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>demo<span class="token punctuation">.</span>api<span class="token punctuation">.</span></span><span class="token class-name">AddService</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>inject<span class="token punctuation">.</span></span><span class="token class-name">Named</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Named</span><span class="token comment">//inject\u89C4\u8303</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AddServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">AddService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> x1<span class="token punctuation">,</span> <span class="token keyword">int</span> x2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x1 <span class="token operator">+</span> x2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">\u5B9E\u8DF5\u5EFA\u8BAE</p><p>\u8FD9\u91CC\u6CE8\u610F\u4E00\u4E0B\uFF0C\u6211\u4EEC\u5E76\u4E0D\u662F\u4F7F\u7528 spring \u76F8\u5173\u7684\u6CE8\u89E3\uFF0Cconcrete \u4E3B\u5F20\u4F9D\u8D56\u89C4\u8303\u800C\u4E0D\u4F9D\u8D56\u5177\u4F53\u3002</p></div><h2 id="\u5EFA-demo-boot-\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#\u5EFA-demo-boot-\u6A21\u5757" aria-hidden="true">#</a> \u5EFA demo-boot \u6A21\u5757</h2><div class="language-xml ext-xml line-numbers-mode"><pre class="language-xml"><code>    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>\${project.parent.groupId}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>demo-impl<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\${project.parent.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

        <span class="token comment">&lt;!-- \u4F7F\u7528javax.inject\u89C4\u8303, spring-boot\u4E5F\u652F\u6301 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>javax.inject<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>javax.inject<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

        <span class="token comment">&lt;!-- \u4F7F\u7528concrete\u7684spring boot jaxrs\u7EC4\u4EF6\u53D1\u5E03\u670D\u52A1 --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.coodex.concrete.jaxrs<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>concrete-jaxrs-spring-boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

        <span class="token comment">&lt;!-- swagger\u652F\u6301\uFF0C\u65B9\u4FBF\u67E5\u770B\u548C\u5B9E\u9A8C\u800C\u5DF2\uFF0C\u975E\u5FC5\u987B --&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.coodex.concrete.jaxrs<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>concrete-jaxrs-swagger<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">\u5B9E\u8DF5\u5EFA\u8BAE</p><p>\u5173\u4E8E swagger\uFF0C\u6211\u4EEC\u5EFA\u8BAE\u5728\u9879\u76EE\u4E2D\u628A concrete-jaxrs-swagger \u7684\u4F5C\u7528\u57DF\u5B9A\u4E49\u4E3A test\uFF0C\u7136\u540E\u5728 test \u4F5C\u7528\u57DF\u91CC\u542F\u52A8\u670D\u52A1</p></div><p>demoBoot</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>demo<span class="token punctuation">.</span>boot</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>boot<span class="token punctuation">.</span></span><span class="token class-name">EnableConcreteJAXRS</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span></span><span class="token class-name">SpringApplication</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">SpringBootApplication</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@SpringBootApplication</span><span class="token punctuation">(</span>
        scanBasePackages <span class="token operator">=</span> <span class="token string">&quot;org.coodex.concrete.demo.**.impl&quot;</span>
<span class="token punctuation">)</span>
<span class="token comment">// \u542F\u7528concrete jaxrs</span>
<span class="token annotation punctuation">@EnableConcreteJAXRS</span><span class="token punctuation">(</span>
        servicePackages <span class="token operator">=</span> <span class="token string">&quot;org.coodex.concrete.demo.**.api&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoBootStarter</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">DemoBootStarter</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div>`,17),d={class:"custom-container tip"},g=n("p",{class:"custom-container-title"},"EnableConcreteJAXRS",-1),b=n("p",null,"EnableConcreteJAXRS \u662F\u4E00\u4E2A\u57FA\u4E8E Spring-boot \u7684\u6CE8\u89E3\uFF0C\u53EF\u4EE5\u7528\u6765\u5FEB\u6377\u5F00\u542F concrete \u7684 jaxrs \u529F\u80FD\uFF0C\u901A\u5E38\u7528\u6765\u6307\u5B9A\u9700\u8981\u53D1\u5E03\u7684\u670D\u52A1\u5305\uFF0CservletMapping\uFF0C\u4E00\u5171\u6709\u56DB\u4E2A\u5C5E\u6027",-1),m=s("servicePackages: String[], \u626B\u63CF concreteServices \u7684\u5305\uFF0C\u9ED8\u8BA4\u4F7F\u7528"),v={href:"https://docs.coodex.org/lib/coodex-utilities/org.coodex.util.Config.html",target:"_blank",rel:"noopener noreferrer"},h=n("code",null,"Config",-1),x=a("\u547D\u540D\u7A7A\u95F4<code>concrete</code>/<code>jaxrs</code>/<code>\u5F53\u524DappSet</code>\u4E0B\u7684<code>api.packages</code>\uFF0C\u5982\u679C\u4E3A\u7A7A\uFF0C\u5219\u4F7F\u7528<code>Config</code>\u547D\u540D\u7A7A\u95F4<code>concrete</code>/<code>\u5F53\u524DappSet</code>\u4E0B\u7684<code>api.packages</code>",16),_=a("<li>classes: Class&lt;?&gt;[], \u989D\u5916\u9700\u8981\u6CE8\u518C\u7684\u7C7B\uFF0C\u9ED8\u8BA4\u4F7F\u7528<code>Config</code>\u547D\u540D\u7A7A\u95F4<code>concrete</code>/<code>\u5F53\u524DappSet</code>\u4E0B\u7684<code>jaxrs.classes</code></li><li>application: Class&lt;? extends ConcreteJSR339Application&gt;\uFF0C\u7528\u4E8E\u53D1\u5E03 jaxrs \u670D\u52A1\u7684 Application \u7C7B\uFF0C\u9ED8\u8BA4<code>org.coodex.concrete.spring.boot.Jsr339Application</code></li><li>servletMappingUrls: String[], servlet \u7684 Mapping\uFF0C\u9ED8\u8BA4<code>Config</code>\u547D\u540D\u7A7A\u95F4<code>concrete</code>/<code>\u5F53\u524DappSet</code>\u4E0B\u7684<code>jaxrs.servletMapping</code>\uFF0C\u5982\u679C\u4E3A\u7A7A\u5219\u4E3A<code>/jaxrs/*</code></li>",3),f=n("p",null,[s("run it.\u8FD9\u6837\u670D\u52A1\u5C31\u88AB\u53D1\u5E03\u8D77\u6765\u4E86\uFF0C\u6211\u4EEC\u770B\u5230 demo-boot \u6A21\u5757\u91CC\u4F9D\u8D56\u4E86"),n("code",null,"concrete-support-jaxrs-swagger"),s("\uFF0C\u5B83\u8D1F\u8D23\u6309\u7167 OpenAPI \u89C4\u8303\u7ED3\u5408 swagger-ui \u8FDB\u884C\u63A5\u53E3\u8BF4\u660E\u4EE5\u53CA\u63A5\u53E3\u8C03\u8BD5\uFF0C\u5EFA\u8BAE\u5F00\u53D1\u73AF\u5883\u4F7F\u7528\uFF0C\u751F\u4EA7\u73AF\u5883\u4E2D\u79FB\u9664\u6B64\u4F9D\u8D56\u3002")],-1),w={class:"custom-container tip"},j=n("p",{class:"custom-container-title"},"Swagger",-1),y=n("p",null,[s("\u5728\u5B9E\u9645\u7684\u9879\u76EE\u4E2D\uFF0C\u5EFA\u8BAE\u6700\u7EC8\u53D1\u5E03\u7684\u73AF\u5883\u5355\u72EC\u4E00\u4E2A\u6A21\u5757\uFF0C\u5F00\u53D1\u7684\u65F6\u5019\u989D\u5916\u5EFA\u4E00\u4E2A\u6A21\u5757\uFF0C\u4F9D\u8D56\u53D1\u5E03\u7684\u5305\u548C"),n("code",null,"concrete-support-jaxrs-swagger"),s(", \u968F\u4FBF\u5199\u4E2A"),n("code",null,"class"),s("\u6765 run SpringBootApplication")],-1),I=s("swagger \u754C\u9762\u663E\u793A\u7684\u90E8\u5206\u4FE1\u606F\u53EF\u4EE5\u81EA\u884C\u5B9A\u4E49\uFF0C\u5728"),S={href:"https://docs.coodex.org/lib/coodex-utilities/org.coodex.util.Config.html",target:"_blank",rel:"noopener noreferrer"},A=n("code",null,"Config",-1),C=s("\u547D\u540D\u7A7A\u95F4"),B=n("code",null,"concrete",-1),E=s("/"),J=n("code",null,"swagger",-1),N=s("\u4E0B\uFF0C\u4E3B\u8981\u6709\uFF1A"),P=a("<ul><li>swagger.title: \u6807\u9898\uFF0C\u9ED8\u8BA4<code>concrete</code></li><li>swagger.description: \u63CF\u8FF0\u4FE1\u606F\uFF0C\u9ED8\u8BA4<code>Thanks for choosing concrete</code></li><li>swagger.verion: API \u7248\u672C\uFF0C\u9ED8\u8BA4<code>1.0.0</code></li><li>swagger.contact.name: API \u8BBE\u8BA1\u8005\uFF0C\u9ED8\u8BA4<code>concrete</code></li><li>swagger.contact.url: \u8BBE\u8BA1\u8005\u6216\u8005\u56E2\u961F\u5730\u5740\uFF0C\u9ED8\u8BA4<code>https://concrete.coodex.org</code></li></ul>",1),R=s("\u597D\u4E86\uFF0C\u8BBF\u95EE "),q={href:"http://localhost:8080/jaxrs/swagger",target:"_blank",rel:"noopener noreferrer"},M=s("http://localhost:8080/jaxrs/swagger"),V=n("p",null,[n("img",{src:u,alt:"swagger",loading:"lazy"})],-1),X=n("p",null,"\u4E0A\u9762\u7EA2\u8272\u6846\u5185\u5C31\u662F\u6211\u4EEC\u53D1\u5E03\u7684\u670D\u52A1\uFF0C\u53EF\u4EE5\u64CD\u4F5C\u4E00\u4E0B\u770B\u770B\u3002",-1),$=n("p",null,[n("code",null,"concrete"),s("\u9075\u5FAA\u7EA6\u5B9A\u4F18\u4E8E\u914D\u7F6E\u7684\u7406\u5FF5\uFF0C\u4E0D\u9700\u8981\u505A\u4EFB\u4F55\u914D\u7F6E\u4E5F\u53EF\u4EE5\u4F7F\u7528\u3002\u4E0A\u56FE\u84DD\u8272\u6846\u5185\uFF0C\u8FD9\u4E2A\u670D\u52A1\u540D\u4E0D\u662F\u5F88\u53CB\u597D\uFF0C\u53C2\u6570\u540D\u4E5F\u4E0D\u53EF\u8BFB\uFF0C\u4E0B\u9762\u770B\u770B\u5982\u4F55\u66F4\u53CB\u597D\u3002")],-1);function D(F,L){const t=c("ExternalLinkIcon");return o(),l(i,null,[k,n("div",d,[g,b,n("ul",null,[n("li",null,[m,n("a",v,[h,p(t)]),x]),_])]),f,n("div",w,[j,y,n("p",null,[I,n("a",S,[A,p(t)]),C,B,E,J,N]),P]),n("p",null,[R,n("a",q,[M,p(t)])]),V,X,$],64)}var z=e(r,[["render",D],["__file","firstService.html.vue"]]);export{z as default};
