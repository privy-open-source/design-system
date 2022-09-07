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
      { text: 'Components', link: '/components/avatar/component' },
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
              link: '/components/avatar/component'
            },
            {
              text: 'Badge',
              link: '/components/badge/component'
            },
            {
              text: 'Banner',
              link: '/components/banner/component'
            },
            {
              text: 'Button',
              link: '/components/button/component'
            },
            {
              text: 'Button Group',
              link: '/components/button-group/component'
            },
            {
              text: 'Card',
              link: '/components/card/component'
            },
            {
              text: 'Dot',
              link: '/components/dot/component'
            },
            {
              text: 'Dropdown',
              link: '/components/dropdown/component'
            },
            {
              text: 'Dropdown Subitem',
              link: '/components/dropdown-subitem/component'
            },
            {
              text: 'Label',
              link: '/components/label/component'
            },
            {
              text: 'Modal',
              link: '/components/modal/component'
            },
            {
              text: 'Nav',
              link: '/components/nav/component'
            },
            {
              text: 'Sidebar',
              link: '/components/sidebar/component'
            },
            {
              text: 'Sidebar Menu',
              link: '/components/sidebar-menu/component'
            },
            {
              text: 'Spinner',
              link: '/components/spinner/component'
            },
            {
              text: 'Tabs',
              link: '/components/tabs/component'
            },
            {
              text: 'Table',
              link: '/components/table/component'
            }
          ]
        },
        {
          text       : 'Typography',
          collapsible: true,
          items      : [
            {
              text: 'Caption',
              link: '/components/caption/component'
            },
            {
              text: 'Heading',
              link: '/components/heading/component'
            },
            {
              text: 'Subheading',
              link: '/components/subheading/component'
            },
            {
              text: 'Truncate',
              link: '/components/truncate/component'
            },
          ],
        },
        {
          text       : 'Form',
          collapsible: true,
          items      : [
            {
              text: 'Calendar',
              link: '/components/calendar/component'
            },
            {
              text: 'Checkbox',
              link: '/components/checkbox/component'
            },
            {
              text: 'Datepicker',
              link: '/components/datepicker/component'
            },
            {
              text: 'Input',
              link: '/components/input/component'
            },
            {
              text: 'Radio',
              link: '/components/radio/component'
            },
            {
              text: 'Select',
              link: '/components/select/component'
            },
            {
              text: 'Textarea',
              link: '/components/textarea/component'
            },
            {
              text: 'Toggle',
              link: '/components/toggle/component'
            },
          ]
        },
        {
          text       : 'Non-Component',
          collapsible: true,
          items      : [
            {
              text: 'Dialog',
              link: '/components/dialog/component'
            },
            {
              text: 'Overlay',
              link: '/components/overlay/component'
            },
            {
              text: 'Toast',
              link: '/components/toast/component'
            },
          ],
        },
        {
          text       : 'Dashboard',
          collapsible: true,
          items      : [
            {
              text: 'Filterbar',
              link: '/components/filterbar/component'
            },
          ],
        },
        {
          text       : 'Signature',
          collapsible: true,
          items      : [
            {
              text: 'Signature Draw',
              link: '/components/signature-draw/component'
            },
            {
              text: 'Signature Text',
              link: '/components/signature-text/component'
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
