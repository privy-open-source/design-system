const plugin  = require('tailwindcss/plugin')
const useBase = require('./base')

module.exports = plugin(
  function ({ addComponents }) {
    addComponents({
      '.fade'   : useBase({ opacity: 0 }),
      '.zoom-in': useBase(
        {
          opacity  : 0,
          transform: 'scale(0.95)',
        },
        {
          opacity  : 0,
          transform: 'scale(1.05)',
        },
      ),
      '.zoom-out': useBase(
        {
          opacity  : 0,
          transform: 'scale(1.05)',
        },
        {
          opacity  : 0,
          transform: 'scale(0.95)',
        },
      ),
      '.slide-right': useBase(
        {
          opacity  : 0,
          transform: 'translateX(-1.5rem)',
        },
        {
          opacity  : 0,
          transform: 'translateX(1.5rem)',
        },
      ),
      '.slide-left': useBase(
        {
          opacity  : 0,
          transform: 'translateX(1.5rem)',
        },
        {
          opacity  : 0,
          transform: 'translateX(-1.5rem)',
        },
      ),
      '.slide-top': useBase(
        {
          opacity  : 0,
          transform: 'translateY(1.5rem)',
        },
        {
          opacity  : 0,
          transform: 'translateY(-1.5rem)',
        },
      ),
      '.slide-bottom': useBase(
        {
          opacity  : 0,
          transform: 'translateY(-1.5rem)',
        },
        {
          opacity  : 0,
          transform: 'translateY(1.5rem)',
        },
      ),
      '.slide-up': useBase({
        opacity  : 0,
        transform: 'translateY(1.5rem)',
      }),
    })
  },
  { safelist: [{ pattern: /^(slide|zoom|fade)/ }] },
)
