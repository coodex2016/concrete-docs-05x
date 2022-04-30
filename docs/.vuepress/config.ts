import { defineHopeConfig } from "vuepress-theme-hope";
const { searchPlugin } = require('@vuepress/plugin-search')

export default defineHopeConfig({
  title: "Concrete 手册",
  dest: "./dist",
  port: 8000,

  themeConfig: {
    // hostname: "https://concrete.coodex.org",

    author: {
      name: 'Davidoff',
      url: 'https://coodex.org',
    },

    sidebar: [{
      text: 'Concrete',
      link: "/",
    }, {
      text: 'Usage',
      collapsable: true,
      link: '/usage/',
      prefix: '/usage/',
      children: require("./usage")
    }],

    copyright: "© coodex.org 2014-2022 all right reserved",
    displayFooter: true,

    cleanUrl: false,

    git: {
      timezone: "Asia/Shanghai",
    },

    plugins: {
      comment: {
        type: "waline",
        serverURL: 'https://waline-concrete-rj3wiiihk-coodex2016.vercel.app/',
        dark: 'auto'
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


  },
  plugins: [
    ['@vuepress/plugin-search']
  ],
});
