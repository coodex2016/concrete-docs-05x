import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{e as a}from"./app.7f86a315.js";var s="/assets/warningExample.9523d511.jpg";const e={},p=a(`<h1 id="warning" tabindex="-1"><a class="header-anchor" href="#warning" aria-hidden="true">#</a> Warning</h1><p>\u4E0A\u4E00\u5C0F\u8282\u6211\u4EEC\u770B\u5230\u4E86\u670D\u52A1\u7684\u4E24\u79CD\u5904\u7406\u60C5\u51B5\uFF0C\u6B63\u5E38\u548C\u5F02\u5E38\uFF0C\u5728\u5B9E\u9645\u573A\u666F\u4E2D\uFF0C\u53EF\u80FD\u4F1A\u5B58\u5728\u7B2C\u4E09\u79CD\u60C5\u51B5\uFF0C\u5904\u7406\u662F\u6B63\u5E38\uFF0C\u4F46\u662F\u4F1A\u6709\u4E00\u4E9B\u8B66\u544A\uFF0C\u6BD4\u5982\uFF0C\u670D\u52A1\u5373\u5C06\u5230\u671F\u7B49\u3002<code>concrete</code>\u901A\u8FC7\u5728<code>Subjoin</code>\u4E2D\u653E\u7F6E Warning \u4FE1\u606F\u6765\u8FBE\u5230\u3002</p><p>\u6211\u4EEC\u5148\u770B\u4E00\u4E2A\u7B80\u5355\u793A\u4F8B\uFF0CCarService(\u6CA1\u6709\u5199\u5B9E\u73B0\u7684\u90A3\u4E2A)\u4E2D\uFF0C\u589E\u52A0\u4E00\u4E2A\u65B9\u6CD5 warningExample.</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token annotation punctuation">@Mock.Number</span><span class="token punctuation">(</span><span class="token string">&quot;[3,9]&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">Integer</span> <span class="token function">warningExample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u8FD9\u4E2A\u670D\u52A1\u5728\u6211\u4EEC\u76EE\u524D\u7684\u9879\u76EE\u4E2D\uFF0C\u8FD8\u662F\u4F7F\u7528 mock \u6765\u6267\u884C\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u4E0D\u7528\u53BB\u5199\u5B9E\u73B0\uFF0C\u76F4\u63A5 run</p><p>\u5728 swagger \u4E2D try \u4E00\u4E0B\uFF0C\u7ED3\u679C\u5982\u4E0B\uFF1A</p><p><img src="`+s+`" alt="warningExample" loading="lazy"></p><p>\u6211\u4EEC\u53EF\u4EE5\u770B\u5230\uFF0Chttp \u54CD\u5E94\u7801\u662F\u6210\u529F(200)\uFF0CResponse body \u4E5F\u662F\u9884\u671F\u4E2D\u7684[3,9]\u4E4B\u4E00\uFF0C\u4F46\u662F Response headers \u91CC\u6709\u4E2A concrete-warnings \u7684 header\uFF0C\u4E00\u5927\u4E32\uFF0C\u8FD9\u4E2A\u5C31\u662F warning \u4FE1\u606F\u4E86\uFF0C\u662F\u4EC0\u4E48\u5462\uFF1F\u6211\u4EEC\u505A\u4E00\u4E0B URLdecoder(\u539F\u56E0\uFF1Ahttp header \u4E2D\u4E0D\u80FD\u4F7F\u7528\u975E ascii \u5B57\u7B26\uFF0C\u6240\u4EE5 warning \u6570\u636E\u5728 concrete-jaxrs \u4F20\u9012\u7684\u65F6\u5019\uFF0C\u8FDB\u884C\u4E86 urlEncoder)</p><p>\u4F20\u9012\u7684\u5185\u5BB9\uFF1A</p><div class="language-txt ext-txt line-numbers-mode"><pre class="language-txt"><code>%5B%7B%22code%22%3A1300%2C%22message%22%3A%22%E6%AD%A4%E6%9C%8D%E5%8A%A1%E4%B8%8D%E6%8E%A8%E8%8D%90%EF%BC%8C%E8%AF%B7%E8%81%94%E7%B3%BB%E5%BC%80%E5%8F%91%E4%BA%BA%E5%91%98%3A+public+abstract+java.lang.Integer+org.coodex.concrete.demo.api.CarService.warningExample%28%29%22%7D%5D
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u89E3\u7801\u540E</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token property">&quot;code&quot;</span><span class="token operator">:</span> <span class="token number">1300</span><span class="token punctuation">,</span>
    <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;\u6B64\u670D\u52A1\u4E0D\u63A8\u8350\uFF0C\u8BF7\u8054\u7CFB\u5F00\u53D1\u4EBA\u5458: public abstract java.lang.Integer org.coodex.concrete.demo.api.CarService.warningExample()&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>\u8FD9\u6837\u5C31\u660E\u767D\u4E86\uFF0C\u5B9E\u9645\u4E0A warning \u6570\u636E\u662F\u4E2A json\uFF0C\u6BCF\u4E2A warning \u5305\u542B code \u548C message\uFF0C\u8FD9\u4E24\u4E2A\u548C\u4E0A\u4E00\u8282\u63D0\u5230\u7684 ErrorCodes \u662F\u4E00\u6837\u7684</p>`,13);function r(t,o){return p}var l=n(e,[["render",r],["__file","warning.html.vue"]]);export{l as default};
