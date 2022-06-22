const plugin = require('tailwindcss/plugin')

module.exports = plugin(
  function ({ addUtilities }) {
    addUtilities({
      '.slide-up-enter-active, .slide-up-leave-active': {
        transitionDuration      : '150ms',
        transitionProperty      : 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
        willChange              : 'opacity, transform',
      },
      '.slide-up-enter, .slide-up-enter-from, .slide-up-leave-to': {
        opacity  : 0,
        transform: 'translateY(1.5rem)',
      },
      '.fade-enter-active, .fade-leave-active': {
        transitionDuration      : '150ms',
        transitionProperty      : 'opacity',
        transitionTimingFunction: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
        willChange              : 'opacity, transform',
      },
      '.fade-enter, .fade-enter-from, .fade-leave-to'                                               : { opacity: 0 },
      '.zoom-in-enter-active, .zoom-out-enter-active, .zoom-in-leave-active, .zoom-out-leave-active':
        {
          transitionDuration      : '150ms',
          transitionProperty      : 'opacity, transform',
          transitionTimingFunction: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
          willChange              : 'opacity, transform',
        },
      '.zoom-in-enter, .zoom-in-enter-from': {
        opacity  : 0,
        transform: 'scale(0.95)',
      },
      '.zoom-in-leave-to': {
        opacity  : 0,
        transform: 'scale(1.05)',
      },
      '.zoom-out-enter, .zoom-out-enter-from': {
        opacity  : 0,
        transform: 'scale(1.05)',
      },
      '.zoom-out-leave-to': {
        opacity  : 0,
        transform: 'scale(0.95)',
      },
      '.slide-right-enter-active, .slide-left-enter-active, .slide-right-leave-active, .slide-left-leave-active':
        {
          transitionDuration      : '150ms',
          transitionProperty      : 'opacity, transform',
          transitionTimingFunction: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
          willChange              : 'opacity, transform',
        },
      '.slide-right-enter, .slide-right-enter-from': {
        opacity  : 0,
        transform: 'translateX(-1.5rem)',
      },
      '.slide-right-leave-to': {
        opacity  : 0,
        transform: 'translateX(1.5rem)',
      },
      '.slide-left-enter, .slide-left-enter-from': {
        opacity  : 0,
        transform: 'translateX(1.5rem)',
      },
      '.slide-left-leave-to': {
        opacity  : 0,
        transform: 'translateX(-1.5rem)',
      },
    })
  },
  { safelist: [{ pattern: /^(slide|zoom|fade)/ }] },
)
