import { defineConfigWithTheme } from 'vitepress'
import { set_sidebar } from "../utils/auto-router"  // 自动生成路由

import escookConfig from '@escook/vitepress-theme/config'

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
  extends: escookConfig,
  head: [
    ["link", { rel: "icon", href: "/logo_title.svg" }]
  ],
  title: "个人博客",
  titleTemplate: 'Blog by xiaofei',
  // description: "23435",
  markdown: {
    theme: {
      light: 'material-theme-lighter',
      dark: 'material-theme-darker'
    },
    lineNumbers: true
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // 音乐播放器
    musicBall: {
      src: '/曾经的你.mp3',
      loop: true,
    },

    // logo
    logo: '/logo.svg',

    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    // 顶部导航
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      {
        text: '组件库',
        items: [
          { text: 'Element UI', link: 'https://element-plus.org/zh-CN' },
          { text: 'Ant Design', link: 'https://ant-design.antgroup.com/index-cn' },
          { text: 'Vant UI', link: 'https://vant-ui.github.io/vant/#/zh-CN' },
          { text: 'Naive UI', link: 'https://www.naiveui.com/zh-CN/light' },
          { text: 'uView', link: 'https://uviewui.com' },
          { text: 'Nut UI', link: 'https://nutui.jd.com/' },
        ],
      },
    ],

    // 侧边导航
    sidebar: [
      {
        text: '基础',
        items: [
          { text: 'HTML', link: '/basic/html' },
          { text: 'CSS', link: '/basic/css' },
          { text: 'JavaScript', link: '/basic/javascript' },
          { text: 'TypeScript', link: '/basic/typescript' },
        ]
      },
      {
        text: '框架',
        items: [
          { text: 'Vue2', link: '/frame/vue2' },
          { text: 'Vue3', link: '/frame/vue3' },
          { text: 'React', link: '/frame/react' },
        ]
      },
      {
        text: '服务端',
        items: [
          { text: 'Node', link: '/server/node' },
          { text: 'Nginx', link: '/server/nginx' },
        ]
      },
      { text: '浏览器', link: '/browser' },
      { text: '网络', link: '/network' },
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/3178242357' },
      { 
        icon: {
          svg: '<svg t="1723896863863" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4241" width="200" height="200"><path d="M512 992C246.895625 992 32 777.104375 32 512S246.895625 32 512 32s480 214.895625 480 480-214.895625 480-480 480z m242.9521875-533.3278125h-272.56875a23.7121875 23.7121875 0 0 0-23.71125 23.7121875l-0.024375 59.255625c0 13.08 10.6078125 23.7121875 23.6878125 23.7121875h165.96c13.104375 0 23.7121875 10.6078125 23.7121875 23.6878125v11.855625a71.1121875 71.1121875 0 0 1-71.1121875 71.1121875h-225.215625a23.7121875 23.7121875 0 0 1-23.6878125-23.7121875V423.1278125a71.1121875 71.1121875 0 0 1 71.0878125-71.1121875h331.824375a23.7121875 23.7121875 0 0 0 23.6878125-23.71125l0.0721875-59.2565625a23.7121875 23.7121875 0 0 0-23.68875-23.7121875H423.08a177.76875 177.76875 0 0 0-177.76875 177.7921875V754.953125c0 13.1034375 10.60875 23.7121875 23.713125 23.7121875h349.63125a159.984375 159.984375 0 0 0 159.984375-159.984375V482.36a23.7121875 23.7121875 0 0 0-23.7121875-23.6878125z" p-id="4242"></path></svg>'
        }, 
        link: 'https://gitee.com/dxfxiongdi', 
      },
      { 
        icon: {
          svg: '<svg t="1723896374184" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4620" width="200" height="200"><path d="M693.12 347.264c11.776 0 23.36 0.896 35.008 2.176-31.36-146.048-187.456-254.528-365.696-254.528C163.2 94.912 0 230.656 0 403.136c0 99.52 54.272 181.248 145.024 244.736L108.8 756.864l126.72-63.488c45.312 8.896 81.664 18.112 126.912 18.112 11.392 0 22.656-0.512 33.792-1.344-7.04-24.256-11.2-49.6-11.2-76.032C385.088 475.776 521.024 347.264 693.12 347.264zM498.304 249.024c27.392 0 45.376 17.984 45.376 45.248 0 27.136-17.984 45.312-45.376 45.312-27.072 0-54.336-18.176-54.336-45.312C443.968 266.944 471.168 249.024 498.304 249.024zM244.672 339.584c-27.2 0-54.592-18.176-54.592-45.312 0-27.264 27.392-45.248 54.592-45.248S289.92 266.944 289.92 294.272C289.92 321.408 271.872 339.584 244.672 339.584zM1024 629.76c0-144.896-145.024-262.976-307.904-262.976-172.48 0-308.224 118.144-308.224 262.976 0 145.28 135.808 262.976 308.224 262.976 36.096 0 72.512-9.024 108.736-18.112l99.392 54.528-27.264-90.624C969.728 783.872 1024 711.488 1024 629.76zM616.128 584.384c-17.984 0-36.224-17.92-36.224-36.224 0-18.048 18.24-36.224 36.224-36.224 27.52 0 45.376 18.176 45.376 36.224C661.504 566.464 643.648 584.384 616.128 584.384zM815.488 584.384c-17.856 0-36.032-17.92-36.032-36.224 0-18.048 18.112-36.224 36.032-36.224 27.264 0 45.376 18.176 45.376 36.224C860.864 566.464 842.752 584.384 815.488 584.384z" p-id="4621"></path></svg>'
        }, 
        link: 'https://gitee.com/xiaofei_deng/vitepress', 
      },
      { icon: 'facebook', link: 'https://facebook.com' },
      { icon: 'npm', link: 'https://npmjs.com' },
    ],

    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present xiaofei Deng'
    },

    // 文档页脚
    docFooter: {
      prev: 'prev',
      next: 'next'
    },

    // 侧边栏目录
    outline: {
      label: '目录',
      level: [2, 4]
    },
    
    // 外部链接显示图标
    // externalLinkIcon: true,

    // 深色模式切换
    darkModeSwitchTitle: '深色',

    // 浅色模式切换
    lightModeSwitchTitle: '浅色',
    
    // 深色模式切换(移动端)
    darkModeSwitchLabel: '暗黑模式',
    
    // 侧边菜单标签(移动端)
    sidebarMenuLabel: '菜单',

    // 返回顶部(移动端)
    returnToTopLabel: '置顶',
  },
})
