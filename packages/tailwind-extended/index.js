const plugin = require('tailwindcss/plugin')

module.exports = plugin(
  function ({ addUtilities, matchUtilities, theme }) {
    addUtilities({
      '.horizontal-tb': { 'writing-mode': 'horizontal-tb' },
      '.vertical-rl'  : { 'writing-mode': 'vertical-rl' },
      '.vertical-lr'  : { 'writing-mode': 'vertical-lr' },
    })

    matchUtilities({
      'aspect-compat': (value) => ({
        'aspect-ratio': value,

        '@supports not (aspect-ratio: 1)': {
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
