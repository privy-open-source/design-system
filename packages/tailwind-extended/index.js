const plugin = require('tailwindcss/plugin')

module.exports = plugin(
  function ({ addUtilities }) {
    addUtilities({
      '.horizontal-tb': { 'writing-mode': 'horizontal-tb' },
      '.vertical-rl'  : { 'writing-mode': 'vertical-rl' },
      '.vertical-lr'  : { 'writing-mode': 'vertical-lr' },
    })
  },
)
