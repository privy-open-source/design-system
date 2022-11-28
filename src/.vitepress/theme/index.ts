// import 'virtual:fonts.css'
import 'core-js'
import '@fontsource/dm-sans'
import '@fontsource/dm-sans/400-italic.css'
import '@fontsource/dm-sans/500.css'
import './css/tailwind.css'
import DefaultTheme from 'vitepress/theme'
import './css/custom.css'
import Preview from './components/Preview.vue'
import vueRouter from './router'
import { initAppContext } from '../../components/global/context'
import { installRouter } from '../../components/global/router'

export default {
  ...DefaultTheme,
  enhanceApp ({ app, router }) {
    app.use(vueRouter)
    app.component('Preview', Preview)

    initAppContext()
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
