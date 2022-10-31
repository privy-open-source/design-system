const plugin = require('tailwindcss/plugin')

module.exports = plugin(
  function ({ addUtilities, matchUtilities, theme }) {
    // Writing Mode
    addUtilities({
      '.horizontal-tb': { 'writing-mode': 'horizontal-tb' },
      '.vertical-rl'  : { 'writing-mode': 'vertical-rl' },
      '.vertical-lr'  : { 'writing-mode': 'vertical-lr' },
    })

    // Margin Inline and Padding Inline
    matchUtilities({
      pi: (value) => ({ paddingInline: value }),
      ps: (value) => ({ paddingInlineStart: value }),
      pe: (value) => ({ paddingInlineEnd: value }),
      mi: (value) => ({ marginInline: value }),
      ms: (value) => ({ marginInlineStart: value }),
      me: (value) => ({ marginInlineEnd: value }),
    }, { values: theme('spacing'), supportsNegativeValues: true })

    // Space Gap
    matchUtilities({
      'space-gap': (value) => ({
        'marginTop' : `calc(-1 * ${value})`,
        'marginLeft': `calc(-1 * ${value})`,

        '& > :not(hidden)': {
          marginTop : value,
          marginLeft: value,
        },
      }),
    }, { values: theme('spacing') })

    // Aspect Ratio
    matchUtilities({
      'aspect-compat': (value) => ({
        'aspect-ratio': value,

        '@supports not (aspect-ratio: 1/1)': {
          '&::before': {
            float     : 'left',
            paddingTop: `calc(100% * ${value})`,
            content   : '""',
          },
          '&::after': {
            display: 'block',
            content: '""',
            clear  : 'both',
          },
        },
      }),
    }, { values: theme('aspectRatio') })
  },
)
