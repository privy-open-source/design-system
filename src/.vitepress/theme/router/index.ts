import { createRouter, createMemoryHistory } from 'vue-router'
import Theme from 'vitepress/theme'

const router = createRouter({
  history: createMemoryHistory(),
  routes : [
    {
      path     : '/:pathMatch(.*)',
      name     : 'not-found',
      component: Theme.Layout,
    },
  ],
})

export default router
