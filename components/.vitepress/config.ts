import { defineConfig } from 'vitepress'

export default defineConfig({
  base       : process.env.BASE_URL ?? '/design-system/',
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
    nav         : [],
    sidebar     : [
      {
        text       : 'Guide',
        collapsable: true,
        children   : [
          {
            text: 'Badge',
            link: '/badge/guide'
          },
          {
            text: 'Banner',
            link: '/banner/guide'
          },
          {
            text: 'Button',
            link: '/button/guide'
          },
          {
            text: 'Button Group',
            link: '/button-group/guide'
          },
          {
            text: 'Color',
            link: '/color/guide'
          },
          {
            text: 'Heading',
            link: '/heading/guide'
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
            text: 'Badge',
            link: '/badge/component'
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
            text: 'Button Group',
            link: '/button-group/component'
          },
          {
            text: 'Card',
            link: '/card/component'
          },
          {
            text: 'Dot',
            link: '/dot/component'
          },
          {
            text: 'Dropdown',
            link: '/dropdown/component'
          },
          {
            text: 'Dropdown Subitem',
            link: '/dropdown-subitem/component'
          },
          {
            text: 'Label',
            link: '/label/component'
          },
          {
            text: 'Modal',
            link: '/modal/component'
          },
          {
            text: 'Nav',
            link: '/nav/component'
          },
          {
            text: 'Sidebar',
            link: '/sidebar/component'
          },
          {
            text: 'Sidebar Menu',
            link: '/sidebar-menu/component'
          },
          {
            text: 'Spinner',
            link: '/spinner/component'
          },
          {
            text: 'Table',
            link: '/table/component'
          }
        ]
      },
      {
        text       : 'Typography',
        collapsable: true,
        children   : [
          {
            text: 'Caption',
            link: '/caption/component'
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
            text: 'Truncate',
            link: '/truncate/component'
          },
        ],
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
            text: 'Datepicker',
            link: '/datepicker/component'
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
            text: 'Textarea',
            link: '/textarea/component'
          },
          {
            text: 'Toggle',
            link: '/toggle/component'
          },
        ]
      },
      {
        text       : 'Non-Component',
        collapsable: true,
        children   : [
          {
            text: 'Dialog',
            link: '/dialog/component'
          },
          {
            text: 'Overlay',
            link: '/overlay/component'
          },
          {
            text: 'Toast',
            link: '/toast/component'
          },
        ],
      },
      {
        text       : 'Dashboard',
        collapsable: true,
        children   : [
          {
            text: 'Filterbar',
            link: '/filterbar/component'
          },
        ],
      },
      {
        text       : 'Signature',
        collapsable: true,
        children   : [
          {
            text: 'Signature Draw',
            link: '/signature-draw/component'
          },
          {
            text: 'Signature Text',
            link: '/signature-text/component'
          },
        ],
      },
    ]
  },
  vite: {
    plugins: []
  }
})
