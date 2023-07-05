module.exports = function useBase (onEnter, onLeave = onEnter) {
  return {
    '&-enter-active, &-leave-active': {
      transitionDuration      : '150ms',
      transitionProperty      : 'opacity, transform',
      transitionTimingFunction: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
      willChange              : 'opacity, transform',
    },
    '&-enter, &-enter-from': onEnter,
    '&-leave-to'           : onLeave,
  }
}
