import { defineConfig } from 'vitepress'
import fonts from 'vite-plugin-fonts'

export default defineConfig({
  base       : '/design-system/',
  title      : 'Design System',
  themeConfig: {
    repo        : 'privy-open-source/design-system',
    docsDir     : 'components',
    docsBranch  : 'main',
    editLinks   : true,
    editLinkText: 'Edit this page on GitHub',
    nextLinks   : false,
    prevLinks   : false,
    lastUpdated : 'Last Updated',
    sidebar     : [
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
            text: 'Avatar',
            link: '/avatar/component'
          },
          {
            text: 'Banner',
            link: '/banner/component'
          },
          {
            text: 'Button',
            link: '/button/component'
          }
        ]
      },
    ]
  },
  vite: {
    plugins: []
  }
})
