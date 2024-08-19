// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'

// import DefaultTheme from 'vitepress/theme'
import escookTheme from '@escook/vitepress-theme'
import '@escook/vitepress-theme/style.css'
// 导入自定义的样式
import './style.css'

export default {
  extends: escookTheme,
  Layout: () => {
    return h(escookTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
