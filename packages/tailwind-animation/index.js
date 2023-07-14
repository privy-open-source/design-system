const plugin  = require('tailwindcss/plugin')
const useBase = require('./base')

module.exports = plugin(
  function ({ addComponents, theme }) {
    addComponents({
      '.fade'   : useBase(theme, { opacity: 0 }),
      '.zoom-in': useBase(theme,
        {
          opacity  : 0,
          transform: 'scale(0.95)',
        },
        {
          opacity  : 0,
          transform: 'scale(1.05)',
        },
      ),
      '.zoom-out': useBase(theme,
        {
          opacity  : 0,
          transform: 'scale(1.05)',
        },
        {
          opacity  : 0,
          transform: 'scale(0.95)',
        },
      ),
      '.slide-right': useBase(theme,
        {
          opacity  : 0,
          transform: 'translateX(-1.5rem)',
        },
        {
          opacity  : 0,
          transform: 'translateX(1.5rem)',
        },
      ),
      '.slide-left': useBase(theme,
        {
          opacity  : 0,
          transform: 'translateX(1.5rem)',
        },
        {
          opacity  : 0,
          transform: 'translateX(-1.5rem)',
        },
      ),
      '.slide-top': useBase(theme,
        {
          opacity  : 0,
          transform: 'translateY(1.5rem)',
        },
        {
          opacity  : 0,
          transform: 'translateY(-1.5rem)',
        },
      ),
      '.slide-bottom': useBase(theme,
        {
          opacity  : 0,
          transform: 'translateY(-1.5rem)',
        },
        {
          opacity  : 0,
          transform: 'translateY(1.5rem)',
        },
      ),
      '.slide-up': useBase(theme, {
        opacity  : 0,
        transform: 'translateY(1.5rem)',
      }),
      '.slide-full-right': useBase(theme,
        {
          opacity  : 0,
          transform: 'translateX(-100%)',
        },
        {
          opacity  : 0,
          transform: 'translateX(100%)',
        },
      ),
      '.slide-full-left': useBase(theme,
        {
          opacity  : 0,
          transform: 'translateX(100%)',
        },
        {
          opacity  : 0,
          transform: 'translateX(-100%)',
        },
      ),
      '.slide-full-top': useBase(theme,
        {
          opacity  : 0,
          transform: 'translateY(100%)',
        },
        {
          opacity  : 0,
          transform: 'translateY(-100%)',
        },
      ),
      '.slide-full-bottom': useBase(theme,
        {
          opacity  : 0,
          transform: 'translateY(-100%)',
        },
        {
          opacity  : 0,
          transform: 'translateY(100%)',
        },
      ),
    })
  },
  { safelist: [{ pattern: /^(slide|zoom|fade)/ }] },
)
