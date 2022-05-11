import { defineUserConfig } from "vuepress";
import { hopeTheme, sidebar } from "vuepress-theme-hope";
import { searchPlugin } from '@vuepress/plugin-search';
import usage from "./usage"

export default defineUserConfig({
  title: "Concrete 手册",
  dest: "./dist",
  port: 8000,
  lang: 'zh-CN',

  theme: hopeTheme({
    hostname: "https://concrete.coodex.org",

    author: {
      name: 'Davidoff',
      url: 'https://coodex.org',
    },

    sidebar: sidebar([{
      text: 'Concrete',
      link: "/",
    }, {
      text: 'Usage',
      collapsable: true,
      link: '/usage/',
      prefix: '/usage/',
      children: usage
    }]),

    copyright: "© coodex.org 2014-2022 all right reserved",
    displayFooter: true,

    cleanUrl: false,

    git: {
      timezone: "Asia/Shanghai",
    },

    plugins: {
      sitemap: false,
      pwa: false,
      comment: {
        // type: "giscus",
        // repo: "coodex2016/concrete-docs-05x",
        // repoId:'R_kgDOHQvDfQ',
        // category:'Announcements',
        // categoryId:'DIC_kwDOHQvDfc4CO3dy'
        type: 'waline',
        serverURL: 'https://waline-concrete-rj3wiiihk-coodex2016.vercel.app/',
        dark: 'auto',
      },
      mdEnhance: {
        enableAll: true,
        // presentation: {
        //   plugins: [
        //     "highlight",
        //     "math",
        //     "search",
        //     "notes",
        //     "zoom",
        //     "anything",
        //     "audio",
        //     "chalkboard",
        //   ],
        // },
      },
    },
  }),
  plugins: [
    searchPlugin({})
  ],
});
