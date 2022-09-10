// import 'virtual:fonts.css'
import '@fontsource/dm-sans'
import '@fontsource/dm-sans/400-italic.css'
import '@fontsource/dm-sans/500.css'
import './css/tailwind.css'
import DefaultTheme from 'vitepress/theme'
import './css/custom.css'
import Preview from './components/Preview.vue'
import router from './router'

export default {
  ...DefaultTheme,
  enhanceApp ({ app }) {
    app.use(router)
    app.component('Preview', Preview)
  },
}
