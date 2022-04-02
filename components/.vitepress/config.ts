import { defineConfig } from 'vitepress'
import fonts from 'vite-plugin-fonts'

export default defineConfig({
  title      : 'Design Sistem',
  themeConfig: {
    sidebar: [
      {
        text       : 'Guide',
        collapsable: true,
        children   : [
          {
            text: 'Banner',
            link: '/banner/guide'
          }
        ]
      },
      {
        text       : 'Components',
        collapsable: true,
        children   : [
          {
            text: 'Banner',
            link: '/banner/playground'
          },
          {
            text: 'Button',
            link: '/button/playground'
          }
        ]
      },
    ]
  },
  vite: {
    plugins: []
  }
})
