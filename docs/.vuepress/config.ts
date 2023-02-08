import { defineUserConfig } from "vuepress";
import { hopeTheme, sidebar } from "vuepress-theme-hope";
import { searchPlugin } from '@vuepress/plugin-search';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import usage from "./usage"

export default defineUserConfig({
  title: "Concrete 手册",
  dest: "./dist",
  port: 8000,
  lang: 'zh-CN',

  theme: hopeTheme({
    hostname: process.env.HOSTNAME || "https://concrete.coodex.org",
    darkmode: 'auto',

    author: {
      name: 'Davidoff Shen',
      url: 'https://coodex.org',
    },

    sidebar: sidebar([{
      text: 'Concrete',
      link: "/",
    }, {
      text: 'Usage',
      collapsible: true,
      link: '/usage/',
      prefix: '/usage/',
      children: usage
    }]),

    copyright: "© coodex.org 2014-2023 all right reserved",
    // footer:`<div><strong><font size="7">壕</font>，请用<font size="5">金钱</font>尽情<font size="6">羞辱</font>我<font size="7">！</font></strong></div><button id="rewardButton" disable="enable" onclick="var qr = document.getElementById('QR'); if (qr.style.display === 'none') {qr.style.display='block';} else {qr.style.display='none'}"><span>好哒</span></button><div id="QR" style="display: none;"><div id="wechat" style="display: inline-block"><a href="/images/donate_wechat.png" class="fancybox" rel="group"><img id="wechat_qr" src="/images/donate_wechat.png" alt="WeChat Pay"></a><p>微信打赏</p></div><div id="alipay" style="display: inline-block"><a href="/images/donate_alipay.png" class="fancybox" rel="group"><img id="alipay_qr" src="/images/donate_alipay.png" alt="Alipay"></a><p>支付宝打赏</p></div></div>`,
    displayFooter: true,

    // cleanUrl: false,

    // git: {
    //   timezone: "Asia/Shanghai",
    // },

    plugins: {
      sitemap: false,
      pwa: false,
      copyright: {
        // hostname: "https://concrete.coodex.org",
        author: "'Davidoff Shen'<jujus.shen@126.com>",
        global: true,
      },
      comment: {
        provider: "Giscus",
        repo: "coodex2016/concrete-docs-05x",
        repoId: 'R_kgDOHQvDfQ',
        category: 'Announcements',
        categoryId: 'DIC_kwDOHQvDfc4CO3dy'
        // provider: 'Waline',
        // serverURL: 'https://waline-concrete-rj3wiiihk-coodex2016.vercel.app/',
        // dark: 'auto',
      },
      mdEnhance: {
        gfm: true,
        container: true,
        linkCheck: 'always',
        tabs: true,
        codetabs: true,
        align: true,
        sup: true,
        sub: true,
        footnote: true,
        // lazyLoad: true,
        tasklist: true,
        flowchart: true,
        mermaid: true,
        mathjax: true,
      },
    },
  }),
  plugins: [
    searchPlugin({}),
    googleAnalyticsPlugin({
      id: 'UA-124592164-1'
    }),
  ],
});
