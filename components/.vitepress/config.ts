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
        text       : 'Base',
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
            text: 'Dropdown',
            link: '/dropdown/component'
          },
        ]
      },
      {
        text       : 'Form',
        collapsable: true,
        children   : [
          {
            text: 'Calendar',
            link: '/calendar/component'
          },
          {
            text: 'Checkbox',
            link: '/checkbox/component'
          },
          {
            text: 'Input',
            link: '/input/component'
          },
          {
            text: 'Radio',
            link: '/radio/component'
          },
          {
            text: 'Select',
            link: '/select/component'
          },
          {
            text: 'Toggle',
            link: '/toggle/component'
          },
        ]
      },
      {
        text       : 'Global',
        collapsable: true,
        children   : [
          {
            text: 'Overlay',
            link: '/overlay/component'
          },
          {
            text: 'Toast',
            link: '/toast/component'
          },
        ],
      }
    ]
  },
  vite: {
    plugins: []
  }
})
