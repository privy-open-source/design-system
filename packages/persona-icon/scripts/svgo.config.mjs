import { fixPath } from './fix-svg.js'
import { hash } from 'ohash'

export default {
  plugins: [
    {
      name: 'remove-clip-path',
      fn  : () => {
        return {
          element: {
            exit (node, parentNode) {
              if (node.name === 'g' && node.attributes['clip-path']) {
                parentNode.children = node.children.map((child) => {
                  if (child.type === 'element')
                    node.attributes.fill = 'currentColor'

                  return child
                })
              }
            },
          },
        }
      },
    },
    {
      name: 'fix-path',
      fn  : () => {
        return {
          element: {
            enter (node) {
              if (node.name === 'path') {
                if (node.attributes.d)
                  node.attributes.d = fixPath(node.attributes.d)

                if (node.attributes.fill && node.attributes.fill !== 'none' && !node.attributes.fill.startsWith('url'))
                  node.attributes.fill = 'currentColor'
              }
            },
          },
        }
      },
    },
    {
      name  : 'addClassesToSVGElement',
      params: { className: 'persona-icon' },
    },
    {
      name  : 'addAttributesToSVGElement',
      params: { attributes: [{ focusable: 'false' }] },
    },
    {
      name  : 'preset-default',
      params: { overrides: { removeViewBox: false } },
    },
    {
      name  : 'prefixIds',
      params: {
        delim           : '_',
        prefix          : (_, info) => info.path ? hash(info.path) : '',
        prefixClassNames: false,
        prefixIds       : true,
      },
    },
  ],
}
