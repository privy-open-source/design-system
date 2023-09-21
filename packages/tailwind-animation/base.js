function uniq (...items) {
  return [...new Set(items.flat())]
}

module.exports = function useBase (theme, onEnter, onLeave = onEnter) {
  const willChange = uniq(Object.keys(onEnter), Object.keys(onLeave))

  return {
    '&-enter-active, &-leave-active': {
      transitionDuration      : theme('transitionDuration.150'),
      transitionTimingFunction: theme('transitionTimingFunction.out'),
      transitionProperty      : willChange.join(', '),
      willChange              : willChange.join(', '),
    },
    '&-enter, &-enter-from': onEnter,
    '&-leave-to'           : onLeave,
  }
}
