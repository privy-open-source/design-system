import { defineConfig } from 'vitepress'
import { Plugin } from 'vite'
import { babel } from '@rollup/plugin-babel'
import head from './head'

export default defineConfig({
  base       : process.env.BASE_URL ?? '/design-system/',
  title      : 'Persona',
  description: 'Persona - PrivyID\'s Design System, built on top Nuxt3, Typescript and Tailwind',
  head       : head,
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
    outline    : [2, 3],
    socialLinks: [{ icon: 'github', link: 'https://github.com/privy-open-source/design-system' }],
    algolia    : {
      appId    : 'IN7GY0AJ4A',
      apiKey   : '1673185db732493ea95c98feea2259f0',
      indexName: 'design-system',
    },
    sidebar: {
      '/docs/': [
        {
          text       : 'Documentation',
          collapsible: true,
          items      : [
            { text: 'Instalation', link: '/docs/getting-started' },
            { text: 'Editor Setup', link: '/docs/editor-setup' },
            { text: 'Browser Support', link: '/docs/browser-support' },
          ],
        },
      ],
      '/foundation/': [
        {
          text       : 'Foundation',
          collapsible: true,
          items      : [
            {
              text: 'Colors',
              link: '/foundation/colors/',
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
              text: 'Camera',
              link: '/components/camera/',
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
              text: 'Cropper',
              link: '/components/cropper/',
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
              text: 'Spinner',
              link: '/components/spinner/',
            },
            {
              text: 'Strengthbar',
              link: '/components/strengthbar/',
            },
            {
              text: 'Tabs',
              link: '/components/tabs/',
            },
            {
              text: 'Table',
              link: '/components/table/',
            },
            {
              text: 'Wizard',
              link: '/components/wizard/',
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
              text: 'Form Group',
              link: '/components/form-group/',
            },
            {
              text: 'Input',
              link: '/components/input/',
            },
            {
              text: 'Input File',
              link: '/components/input-file/',
            },
            {
              text: 'Input Group',
              link: '/components/input-group/',
            },
            {
              text: 'Input Password',
              link: '/components/input-password/',
            },
            {
              text: 'Input Pin',
              link: '/components/input-pin/',
            },
            {
              text: 'Input Range',
              link: '/components/input-range/',
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
            {
              text: 'Navbar',
              link: '/components/navbar/',
            },
            {
              text: 'Sidebar',
              link: '/components/sidebar/',
            },
            {
              text: 'Sidebar Menu',
              link: '/components/sidebar-menu/',
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
          text       : 'PDF',
          collapsible: true,
          items      : [
            {
              text: 'PDF Viewer',
              link: '/components/pdf-viewer/',
            },
            {
              text: 'PDF Object',
              link: '/components/pdf-object/',
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
            {
              text: 'Tour',
              link: '/components/tour/',
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
        {
          text       : 'Directive',
          collapsible: true,
          items      : [
            {
              text: 'Aspect Ratio',
              link: '/components/aspect-ratio/',
            },
            {
              text: 'Markdown',
              link: '/components/markdown/',
            },
            {
              text: 'Tooltip',
              link: '/components/tooltip/',
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
              text: 'Checkbox & Radio',
              link: '/styleguide/checkbox-radio/',
            },
            {
              text: 'Navbar',
              link: '/styleguide/navbar/',
            },
          ],
        },
      ],
    },
  },
  vite: {
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude     : /node_modules/,
        presets     : [
          [
            '@babel/preset-env',
            {
              targets    : ['extends @privyid/browserslist-config'],
              useBuiltIns: 'entry',
              corejs     : '3.36',
            },
          ],
        ],
      }) as unknown as Plugin,
    ],
  },
})
