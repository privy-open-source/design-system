import { Extension } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageAlign: {
      /**
       * Set image align
       * @param align
       * @example
       *  editor
       *   .commands
       *   .setImageAlign('right')
       */
      setImageAlign: (align: string) => ReturnType,
      /**
       * Unset image align
       * @returns
       */
      unsetImageAlign: () => ReturnType,
    },
  }
}

export interface ImageAlignOptions {
  /**
   * The types where the text align attribute can be applied.
   * @default ['image']
   * @example ['image', 'figure']
   */
  types: string[],

  /**
   * The alignments which are allowed.
   * @default ['left', 'center', 'right']
   * @example ['left', 'right']
   */
  alignments: string[],

  /**
   * The default alignment.
   * @default 'left'
   * @example 'center'
   */
  defaultAlignment: string,
}

export const Image = Extension.create<ImageAlignOptions>({
  name: 'image-align',

  addOptions () {
    return {
      types     : ['image'],
      alignments: [
        'left',
        'center',
        'right',
      ],
      defaultAlignment: 'center',
    }
  },

  addGlobalAttributes () {
    return [
      {
        types     : this.options.types,
        attributes: {
          imageWidth: {
            default: '100%',
            parseHTML (element) {
              return element.style.width
            },
            renderHTML (attributes) {
              return { style: `width: ${attributes.imageWidth as string}` }
            },
          },
          imageAlign: {
            default: this.options.defaultAlignment,
            parseHTML (element) {
              return element.dataset.align
            },
            renderHTML (attributes) {
              const marginLeft  = attributes.imageAlign === 'left' ? '0' : 'auto'
              const marginRight = attributes.imageAlign === 'right' ? '0' : 'auto'

              return {
                'data-align': attributes.align,
                'style'     : `margin-left: ${marginLeft}; margin-right: ${marginRight}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands () {
    return {
      setImageAlign: (align) => ({ commands }) => {
        if (!this.options.alignments.includes(align))
          return false

        return this.options.types
          .map((type) => commands.updateAttributes(type, { imageAlign: align }))
          .every(Boolean)
      },
      unsetImageAlign: () => ({ commands }) => {
        return this.options.types
          .map((type) => commands.resetAttributes(type, 'imageAlign'))
          .every(Boolean)
      },
    }
  },
})

export default Image
