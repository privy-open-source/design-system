// import 'virtual:fonts.css'
import '@fontsource/dm-sans'
import '@fontsource/dm-sans/400-italic.css'
import '@fontsource/dm-sans/500.css'
import './css/tailwind.css'
import DefaultTheme from 'vitepress/theme'
import './css/custom.css'
import Preview from './components/Preview.vue'
import NuxtLink from './components/NuxtLink.vue'
import vueRouter from './router'
import { withBase } from 'vitepress'
import { initStore, setCDN } from '../../components/global/store'
import { installRouter } from '../../components/global/router'

export default {
  ...DefaultTheme,
  enhanceApp ({ app, router }) {
    app.use(vueRouter)
    app.component('Preview', Preview)
    app.component('NuxtLink', NuxtLink)

    initStore()
    setCDN(withBase('/js/'))
    installRouter({
      toURL (url) {
        return router.go(url)
      },
      getURL () {
        return router.route.path
      },
    })
  },
}
