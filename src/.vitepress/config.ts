import { defineConfig } from 'vitepress'

export default defineConfig({
  base       : process.env.BASE_URL ?? '/design-system/',
  title      : 'Persona',
  description: 'Persona - PrivyID\'s Design System',
  themeConfig: {
    logo    : './assets/images/logo.svg',
    editLink: { pattern: 'https://github.com/privy-open-source/design-system/edit/main/src/:path' },
    footer  : {
      message  : 'Released under the MIT License.',
      copyright: 'Copyright © 2022 Privy Identitas Digital',
    },
    nav: [
      { text: 'Docs', link: '/docs/getting-started' },
      { text: 'Components', link: '/components/avatar/' },
      { text: 'Foundation', link: '/foundation/color/' },
      { text: 'Styleguide', link: '/styleguide/badge/' },
      { text: 'Ecosystem', link: '/ecosystem/' },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/privy-open-source/design-system' }],
    sidebar    : {
      '/docs/': [
        {
          text       : 'Documentation',
          collapsible: true,
          items      : [{ text: 'Instalation', link: '/docs/getting-started' }, { text: 'Editor Setup', link: '/docs/editor-setup' }],
        },
      ],
      '/foundation/': [
        {
          text       : 'Foundation',
          collapsible: true,
          items      : [
            {
              text: 'Color',
              link: '/foundation/color/',
            },
          ],
        },
      ],
      '/components/': [
        {
          text       : 'Base',
          collapsible: true,
          items      : [
            {
              text: 'Avatar',
              link: '/components/avatar/',
            },
            {
              text: 'Badge',
              link: '/components/badge/',
            },
            {
              text: 'Banner',
              link: '/components/banner/',
            },
            {
              text: 'Button',
              link: '/components/button/',
            },
            {
              text: 'Button Group',
              link: '/components/button-group/',
            },
            {
              text: 'Card',
              link: '/components/card/',
            },
            {
              text: 'Chart',
              link: '/components/chart/',
            },
            {
              text: 'Collapse',
              link: '/components/collapse/',
            },
            {
              text: 'Contextual Bar',
              link: '/components/contextual-bar/',
            },
            {
              text: 'Dot',
              link: '/components/dot/',
            },
            {
              text: 'Dropdown',
              link: '/components/dropdown/',
            },
            {
              text: 'Dropdown Subitem',
              link: '/components/dropdown-subitem/',
            },
            {
              text: 'Label',
              link: '/components/label/',
            },
            {
              text: 'Modal',
              link: '/components/modal/',
            },
            {
              text: 'Nav',
              link: '/components/nav/',
            },
            {
              text: 'Progress',
              link: '/components/progress/',
            },
            {
              text: 'Sidebar',
              link: '/components/sidebar/',
            },
            {
              text: 'Sidebar Menu',
              link: '/components/sidebar-menu/',
            },
            {
              text: 'Spinner',
              link: '/components/spinner/',
            },
            {
              text: 'Tabs',
              link: '/components/tabs/',
            },
            {
              text: 'Table',
              link: '/components/table/',
            },
          ],
        },
        {
          text       : 'Typography',
          collapsible: true,
          items      : [
            {
              text: 'Caption',
              link: '/components/caption/',
            },
            {
              text: 'Heading',
              link: '/components/heading/',
            },
            {
              text: 'Subheading',
              link: '/components/subheading/',
            },
            {
              text: 'Truncate',
              link: '/components/truncate/',
            },
          ],
        },
        {
          text       : 'Form',
          collapsible: true,
          items      : [
            {
              text: 'Calendar',
              link: '/components/calendar/',
            },
            {
              text: 'Checkbox',
              link: '/components/checkbox/',
            },
            {
              text: 'Datepicker',
              link: '/components/datepicker/',
            },
            {
              text: 'Input',
              link: '/components/input/',
            },
            {
              text: 'Radio',
              link: '/components/radio/',
            },
            {
              text: 'Select',
              link: '/components/select/',
            },
            {
              text: 'Textarea',
              link: '/components/textarea/',
            },
            {
              text: 'Toggle',
              link: '/components/toggle/',
            },
          ],
        },
        {
          text       : 'Dashboard',
          collapsible: true,
          items      : [
            {
              text: 'Filterbar',
              link: '/components/filterbar/',
            },
          ],
        },
        {
          text       : 'Signature',
          collapsible: true,
          items      : [
            {
              text: 'Signature Draw',
              link: '/components/signature-draw/',
            },
            {
              text: 'Signature Text',
              link: '/components/signature-text/',
            },
          ],
        },
        {
          text       : 'Non-Component',
          collapsible: true,
          items      : [
            {
              text: 'Dialog',
              link: '/components/dialog/',
            },
            {
              text: 'Overlay',
              link: '/components/overlay/',
            },
            {
              text: 'Toast',
              link: '/components/toast/',
            },
          ],
        },
        {
          text       : 'Headless',
          collapsible: true,
          items      : [
            {
              text: 'Dropzone',
              link: '/components/dropzone/',
            },
            {
              text: 'Spread',
              link: '/components/spread/',
            },
            {
              text: 'Steps',
              link: '/components/steps/',
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
              link: '/styleguide/badge/',
            },
            {
              text: 'Banner',
              link: '/styleguide/banner/',
            },
            {
              text: 'Button',
              link: '/styleguide/button/',
            },
            {
              text: 'Button Group',
              link: '/styleguide/button-group/',
            },
            {
              text: 'Heading',
              link: '/styleguide/heading/',
            },
          ],
        },
      ],
    },
  },
  vite: { plugins: [] },
})
