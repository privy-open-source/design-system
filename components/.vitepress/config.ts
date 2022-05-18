import { defineConfig } from 'vitepress'
import fonts from 'vite-plugin-fonts'

export default defineConfig({
  base       : '/design-system/',
  title      : 'Design System',
  description: 'Privy Design System',
  themeConfig: {
    repo        : 'privy-open-source/design-system',
    docsDir     : 'components',
    docsBranch  : 'main',
    editLinks   : true,
    editLinkText: 'Edit this page on GitHub',
    nextLinks   : false,
    prevLinks   : false,
    lastUpdated : 'Last Updated',
    smoothScroll: true,
    nav         : [],
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
          },
          {
            text: 'Heading',
            link: '/heading/component'
          },
          {
            text: 'Subheading',
            link: '/subheading/component'
          },
          {
            text: 'Overlay',
            link: '/overlay/component'
          },
          {
            text: 'Toast',
            link: '/toast/component'
          },
          {
            text: 'Toggle',
            link: '/toggle/component'
          },
        ]
      },
    ]
  },
  vite: {
    plugins: []
  }
})
