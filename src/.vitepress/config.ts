import { defineConfig } from 'vitepress'

export default defineConfig({
  base       : process.env.BASE_URL ?? '/design-system/',
  title      : 'Persona',
  description: 'Persona - PrivyID\'s Design System',
  themeConfig: {
    logo        : './assets/images/logo.svg',
    repo        : 'privy-open-source/design-system',
    docsDir     : 'components',
    docsBranch  : 'main',
    editLinks   : true,
    editLinkText: 'Edit this page on GitHub',
    nextLinks   : false,
    prevLinks   : false,
    lastUpdated : 'Last Updated',
    nav         : [
      { text: 'Components', link: '/components/avatar/index' },
      { text: 'Foundation', link: '/foundation/color/index' },
      { text: 'Styleguide', link: '/styleguide/badge/index' },
      { text: 'Ecosystem', link: '/ecosystem' },
    ],
    socialLinks : [
      { icon: 'github', link: 'https://github.com/privy-open-source/design-system' }
    ],
    sidebar: {
      '/foundation/': [
        {
          text       : 'Foundation',
          collapsible: true,
          items      : [
            {
              text: 'Color',
              link: '/foundation/color/index'
            },
          ]
        }
      ],
      '/components/': [
        {
          text       : 'Base',
          collapsible: true,
          items      : [
            {
              text: 'Avatar',
              link: '/components/avatar/index'
            },
            {
              text: 'Badge',
              link: '/components/badge/index'
            },
            {
              text: 'Banner',
              link: '/components/banner/index'
            },
            {
              text: 'Button',
              link: '/components/button/index'
            },
            {
              text: 'Button Group',
              link: '/components/button-group/index'
            },
            {
              text: 'Card',
              link: '/components/card/index'
            },
            {
              text: 'Chart',
              link: '/components/chart/index'
            },
            {
              text: 'Dot',
              link: '/components/dot/index'
            },
            {
              text: 'Dropdown',
              link: '/components/dropdown/index'
            },
            {
              text: 'Dropdown Subitem',
              link: '/components/dropdown-subitem/index'
            },
            {
              text: 'Label',
              link: '/components/label/index'
            },
            {
              text: 'Modal',
              link: '/components/modal/index'
            },
            {
              text: 'Nav',
              link: '/components/nav/index'
            },
            {
              text: 'Sidebar',
              link: '/components/sidebar/index'
            },
            {
              text: 'Sidebar Menu',
              link: '/components/sidebar-menu/index'
            },
            {
              text: 'Spinner',
              link: '/components/spinner/index'
            },
            {
              text: 'Tabs',
              link: '/components/tabs/index'
            },
            {
              text: 'Table',
              link: '/components/table/index'
            }
          ]
        },
        {
          text       : 'Typography',
          collapsible: true,
          items      : [
            {
              text: 'Caption',
              link: '/components/caption/index'
            },
            {
              text: 'Heading',
              link: '/components/heading/index'
            },
            {
              text: 'Subheading',
              link: '/components/subheading/index'
            },
            {
              text: 'Truncate',
              link: '/components/truncate/index'
            },
          ],
        },
        {
          text       : 'Form',
          collapsible: true,
          items      : [
            {
              text: 'Calendar',
              link: '/components/calendar/index'
            },
            {
              text: 'Checkbox',
              link: '/components/checkbox/index'
            },
            {
              text: 'Datepicker',
              link: '/components/datepicker/index'
            },
            {
              text: 'Input',
              link: '/components/input/index'
            },
            {
              text: 'Radio',
              link: '/components/radio/index'
            },
            {
              text: 'Select',
              link: '/components/select/index'
            },
            {
              text: 'Textarea',
              link: '/components/textarea/index'
            },
            {
              text: 'Toggle',
              link: '/components/toggle/index'
            },
          ]
        },
        {
          text       : 'Non-Component',
          collapsible: true,
          items      : [
            {
              text: 'Dialog',
              link: '/components/dialog/index'
            },
            {
              text: 'Overlay',
              link: '/components/overlay/index'
            },
            {
              text: 'Toast',
              link: '/components/toast/index'
            },
          ],
        },
        {
          text       : 'Dashboard',
          collapsible: true,
          items      : [
            {
              text: 'Filterbar',
              link: '/components/filterbar/index'
            },
          ],
        },
        {
          text       : 'Signature',
          collapsible: true,
          items      : [
            {
              text: 'Signature Draw',
              link: '/components/signature-draw/index'
            },
            {
              text: 'Signature Text',
              link: '/components/signature-text/index'
            },
          ],
        },
      ],
      '/styleguide/': [
        {
          text       : 'Guide',
          collapsible: true,
          items      : [
            {
              text: 'Badge',
              link: '/styleguide/badge/index'
            },
            {
              text: 'Banner',
              link: '/styleguide/banner/index'
            },
            {
              text: 'Button',
              link: '/styleguide/button/index'
            },
            {
              text: 'Button Group',
              link: '/styleguide/button-group/index'
            },
            {
              text: 'Heading',
              link: '/styleguide/heading/index'
            }
          ]
        },
      ],
    }
  },
  vite: {
    plugins: []
  }
})
