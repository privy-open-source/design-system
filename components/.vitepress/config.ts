import { defineConfig } from 'vitepress'

export default defineConfig({
  title      : 'Design Sistem',
  themeConfig: {
    sidebar: [
      {
        text       : 'Components',
        collapsable: true,
        children   : [
          {
            text: 'Button',
            link: '/button/index'
          }
        ]
      },
    ]
  }
})
