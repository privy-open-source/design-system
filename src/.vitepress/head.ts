import { HeadConfig } from 'vitepress'
import { joinURL } from 'ufo'

const baseURL            = process.env.BASE_URL ?? '/design-system/'
const head: HeadConfig[] = [
  [
    'link',
    {
      rel  : 'apple-touch-icon',
      sizes: '180x180',
      href : joinURL(baseURL, '/apple-touch-icon.png'),
    },
  ],
  [
    'link',
    {
      rel  : 'icon',
      type : 'image/png',
      sizes: '32x32',
      href : joinURL(baseURL, '/favicon-32x32.png'),
    },
  ],
  [
    'link',
    {
      rel  : 'icon',
      type : 'image/png',
      sizes: '16x16',
      href : joinURL(baseURL, '/favicon-16x16.png'),
    },
  ],
  [
    'link',
    {
      rel : 'manifest',
      href: joinURL(baseURL, '/site.webmanifest'),
    },
  ],
  [
    'link',
    {
      rel  : 'mask-icon',
      href : joinURL(baseURL, '/safari-pinned-tab.svg'),
      color: '#0065d1',
    },
  ],
  [
    'meta',
    {
      name   : 'msapplication-TileColor',
      content: '#ffffff',
    },
  ],
  [
    'meta',
    {
      name   : 'theme-color',
      content: '#ffffff',
    },
  ],
  [
    'link',
    {
      rel        : 'preconnect',
      href       : 'https://polyfill.io',
      crossorigin: '',
    },
  ],
  [
    'script',
    {
      defer: '',
      src  : `https://polyfill.io/v3/polyfill.min.js?features=${[
        'AbortController',
        'ArrayBuffer.isView',
        'Blob',
        'CharacterData.prototype.after',
        'CharacterData.prototype.before',
        'CharacterData.prototype.replaceWith',
        'DOMRect',
        'DOMRect.fromRect',
        'DOMTokenList.prototype.forEach',
        'DOMTokenList.prototype.replace',
        'DataView',
        'Element.prototype.getAttributeNames',
        'Element.prototype.inert',
        'Element.prototype.toggleAttribute',
        'EventSource',
        'HTMLCanvasElement.protoype.toBlob',
        'HTMLInputElement.prototype.valueAsDate',
        'HTMLPictureElement',
        'HTMLSelectElement.prototype.selectedOptions',
        'HTMLTemplateElement',
        'IntersectionObserver',
        'Intl',
        'Intl.DisplayNames',
        'Intl.ListFormat',
        'Intl.RelativeTimeFormat',
        'MediaQueryList.prototype.addEventListener',
        'Node.prototype.getRootNode',
        'Node.prototype.isConnected',
        'NodeList.prototype.@@iterator',
        'NodeList.prototype.forEach',
        'ResizeObserver',
        'String.raw',
        'TextEncoder',
        'URL',
        'URL.prototype.toJSON',
        'UserTiming',
        'WebAnimations',
        'console.exception',
        'console.markTimeline',
        'console.timeline',
        'console.timelineEnd',
        'default',
        'document.elementsFromPoint',
        'es2017',
        'es2018',
        'es2019',
        'es2020',
        'es2021',
        'es2022',
        'es2023',
        'es5',
        'es6',
        'es7',
        'fetch',
        'globalThis',
        'queueMicrotask',
        'requestIdleCallback',
        'screen.orientation',
        'scroll',
        'setImmediate',
      ].join(',')}`,
    },
  ],
]

export default head
