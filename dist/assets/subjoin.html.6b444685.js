import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{e as s}from"./app.7f86a315.js";const a={},p=s(`<h1 id="subjoin" tabindex="-1"><a class="header-anchor" href="#subjoin" aria-hidden="true">#</a> Subjoin</h1><p>\u7528\u4E8E\u4F20\u9012\u4E0E\u4E1A\u52A1\u6570\u636E\u65E0\u5173\u7684\u4FE1\u606F\uFF0C\u6BD4\u5982\u7B7E\u540D\u76F8\u5173\u4FE1\u606F\u3002\u9664\u4E86\u9700\u8981\u7B7E\u540D\u9A8C\u7B7E\u7684\u670D\u52A1\u83B7\u53D6\u8C03\u7528\u8005 appId \u4F1A\u7528\u5230\u4EE5\u5916\uFF0C\u5F88\u5C11\u4F1A\u7528\u5230\uFF0C\u5927\u5BB6\u53EF\u4EE5\u8DF3\u8FC7\u6B64\u8282\u3002</p><div class="custom-container note"><p class="custom-container-title">\u6CE8</p><p>\u5B9E\u9645\u4E0A\uFF0C\u5BF9\u4E8E concrete \u670D\u52A1\u7684\u8C03\u7528\u8005\uFF0C\u9644\u52A0\u4FE1\u606F\u53EA\u6709\u7B7E\u540D\u76F8\u5173\u4EE5\u53CA warning\uFF0Cconcrete client \u548C\u90E8\u5206\u811A\u672C\u5DF2\u7ECF\u652F\u6301</p></div><p>\u6211\u4EEC\u518D\u65B0\u5EFA\u4E00\u4E2A Concrete Service\uFF0C\u5199\u4E00\u4E2A\u5B9E\u73B0\uFF0C\u5BF9 Subjoin \u4F7F\u7528\u505A\u4E00\u4E2A\u793A\u4F8B</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>demo<span class="token punctuation">.</span>api</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>api<span class="token punctuation">.</span></span><span class="token class-name">ConcreteService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>api<span class="token punctuation">.</span></span><span class="token class-name">Description</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>mock<span class="token punctuation">.</span></span><span class="token class-name">Mock</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>mock<span class="token punctuation">.</span>ext<span class="token punctuation">.</span></span><span class="token class-name">FullName</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Parameter</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@ConcreteService</span><span class="token punctuation">(</span><span class="token string">&quot;SubjoinExample&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">SubjoinExampleService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Description</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;\u5411\u67D0\u4EBAsay hello&quot;</span><span class="token punctuation">,</span>
            description <span class="token operator">=</span> <span class="token string">&quot;\u5F53\u6B64\u4EBA\u4E3A\u7B2C\u4E00\u6B21\u8BBF\u95EE\u65F6\uFF0C\u6211\u4EEC\u901A\u8FC7subjoin\u8FD4\u56DE\u65B0\u7528\u6237\u7684\u4FE1\u606F&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">String</span> <span class="token function">sayHello</span><span class="token punctuation">(</span>
            <span class="token annotation punctuation">@FullName</span> <span class="token comment">// \u5728swagger\u4E2D\u751F\u6210\u4E00\u4E2A\u59D3\u540D\u7684\u6837\u4F8B\u6570\u636E</span>
            <span class="token annotation punctuation">@Parameter</span><span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
            <span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Description</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">&quot;\u7531\u5F00\u53D1\u8005\u624B\u52A8\u8BBE\u7F6Ewarning data\u7684\u793A\u4F8B&quot;</span><span class="token punctuation">,</span>
            description <span class="token operator">=</span> <span class="token string">&quot;\u540C\u4E4B\u524D\u7684\u6848\u4F8B\u4E00\u6837\uFF0C\u4E0D\u8FC7\u628A\u5F02\u5E38\u6539\u4E3A\u8B66\u544A\uFF0C\u5F53\u52A0\u6570\u548C\u88AB\u52A0\u6570\u4E0D\u662F\u4E2A\u4F4D\u6570\u65F6\uFF0C\u5411\u8C03\u7528\u8005\u53D1\u9001\u4E00\u4E2A\u592A\u96BE\u4E86\u7684\u8B66\u544A&quot;</span><span class="token punctuation">)</span>
    <span class="token class-name">Integer</span> <span class="token function">add</span><span class="token punctuation">(</span>
            <span class="token annotation punctuation">@Mock.Number</span><span class="token punctuation">(</span><span class="token string">&quot;[0,20]&quot;</span><span class="token punctuation">)</span>
            <span class="token annotation punctuation">@Parameter</span><span class="token punctuation">(</span><span class="token string">&quot;x1&quot;</span><span class="token punctuation">)</span>
            <span class="token class-name">Integer</span> x1<span class="token punctuation">,</span>
            <span class="token annotation punctuation">@Mock.Number</span><span class="token punctuation">(</span><span class="token string">&quot;[0,20]&quot;</span><span class="token punctuation">)</span>
            <span class="token annotation punctuation">@Parameter</span><span class="token punctuation">(</span><span class="token string">&quot;x2&quot;</span><span class="token punctuation">)</span>
            <span class="token class-name">Integer</span> x2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>\u5B9E\u73B0</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>demo<span class="token punctuation">.</span>impl</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>common<span class="token punctuation">.</span></span><span class="token class-name">Subjoin</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>common<span class="token punctuation">.</span></span><span class="token class-name">WarningData</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>demo<span class="token punctuation">.</span>api<span class="token punctuation">.</span></span><span class="token class-name">SubjoinExampleService</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>inject<span class="token punctuation">.</span></span><span class="token class-name">Inject</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>inject<span class="token punctuation">.</span></span><span class="token class-name">Named</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashSet</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Set</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token keyword">static</span> <span class="token import static"><span class="token namespace">org<span class="token punctuation">.</span>coodex<span class="token punctuation">.</span>concrete<span class="token punctuation">.</span>demo<span class="token punctuation">.</span>api<span class="token punctuation">.</span></span><span class="token class-name">DemoErrorCodes</span><span class="token punctuation">.</span><span class="token static">TOO_HARD</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Named</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SubjoinExampleServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">SubjoinExampleService</span> <span class="token punctuation">{</span>

    <span class="token comment">// \u7528\u6765\u5B58\u653E\u8BBF\u5BA2\u4FE1\u606F</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> VISITORS <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Inject</span> <span class="token comment">// concrete-core-spring\u5728spring framework\u4E2D\u53EF\u4EE5\u81EA\u52A8\u6CE8\u5165</span>
    <span class="token keyword">private</span> <span class="token class-name">Subjoin</span> subjoin<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// \u4F7F\u7528\u53CC\u91CD\u6821\u9A8C\u9501\u786E\u4FDD\u6BCF\u4E2A\u8BBF\u5BA2\u6700\u591A\u4EA7\u751F\u4E00\u6B21\u65B0\u8BBF\u5BA2\u6D88\u606F</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>VISITORS<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>VISITORS<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>VISITORS<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    VISITORS<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// \u544A\u77E5\u5BA2\u6237\u7AEF\uFF0C\u8FD9\u662F\u4E2A\u65B0\u7528\u6237</span>
                    subjoin<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;new-user&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, %s&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> x1<span class="token punctuation">,</span> <span class="token class-name">Integer</span> x2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>x1 <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> x1 <span class="token operator">&gt;</span> <span class="token number">9</span> <span class="token operator">||</span> x2 <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> x2 <span class="token operator">&gt;</span> <span class="token number">9</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            subjoin<span class="token punctuation">.</span><span class="token function">putWarning</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WarningData</span><span class="token punctuation">(</span>TOO_HARD<span class="token punctuation">,</span> x1<span class="token punctuation">,</span> x2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> x1 <span class="token operator">+</span> x2<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><p>mock.excepted \u91CC\u9762\u4F8B\u5916\u6389\u8FD9\u4E2A\u670D\u52A1</p><p>\u7136\u540E run \u8D77\u6765\uFF0C\u5728 swagger \u91CC\u9762\u64CD\u4F5C\u4E00\u4E0B\uFF0CsayHello \u63A5\u53E3\uFF0C\u540C\u4E00\u4E2A\u540D\u5B57\u7B2C\u4E00\u6B21\u6267\u884C\uFF0C\u4F1A\u6709\u4E00\u4E2A new-user \u7684 header\uFF0C\u518D\u6267\u884C\u4E00\u6B21\uFF0C\u4E0D\u518D\u6709\u8FD9\u4E2A header\uFF0C\u8FBE\u5230\u9884\u671F</p><p>add \u63A5\u53E3\uFF0C\u52A0\u6570\u88AB\u52A0\u6570\u662F\u4E2A\u4F4D\u6570\u65F6\uFF0C\u6CA1\u6709 warning\uFF0C\u6709\u4E00\u4E2A\u8D85\u51FA\u4E2A\u4F4D\u6570\u8303\u56F4\u65F6\uFF0C\u4F9D\u7136\u80FD\u591F\u8BA1\u7B97\u6B63\u786E\u7ED3\u679C\uFF0C\u4F46\u662F\u6709\u4E2A warning\uFF0C\u89E3\u7801\u4E00\u4E0B</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token property">&quot;code&quot;</span><span class="token operator">:</span> <span class="token number">105001</span><span class="token punctuation">,</span> <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1 + 11 \u592A\u96BE\u4E86 ~&gt;_&lt;~&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u8FBE\u5230\u9884\u671F\u3002</p>`,12);function t(e,o){return p}var u=n(a,[["render",t],["__file","subjoin.html.vue"]]);export{u as default};