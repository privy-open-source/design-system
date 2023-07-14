module.exports = function useBase (theme, onEnter, onLeave = onEnter) {
  return {
    '&-enter-active, &-leave-active': {
      transitionDuration      : theme('transitionDuration.150'),
      transitionTimingFunction: theme('transitionTimingFunction.in-out'),
      transitionProperty      : 'opacity, transform',
      willChange              : 'opacity, transform',
    },
    '&-enter, &-enter-from': onEnter,
    '&-leave-to'           : onLeave,
  }
}
