interface TargetContext {
  isHovered: boolean,

  onHoverInTimeout?: ReturnType<typeof setTimeout>,
  onHoverOutTimeout?: ReturnType<typeof setTimeout>,

  onMouseEnter: (event: MouseEvent) => void,
  onMouseLeave: (event: MouseEvent) => void,
}

type MouseEventHandler = (event: MouseEvent) => void

const targetsMap = new Map<HTMLElement, TargetContext>()

export interface HoverOptions {
  /**
   * Long hover duration (in ms)
   */
  delay?: number,
  /**
   * Hover out debounce (in ms)
   */
  debounced?: number,

  onHoverIn: MouseEventHandler,
  onHoverOut: MouseEventHandler,
}

/**
 * Custom on hover handler
 * It's fix issue when mouseenter and mouseleave triggered repeately on Span Element.
 * This also handle add long delay
 * @param target
 * @param opts
 */
export function addHoverListener (target: HTMLElement, opts: HoverOptions) {
  const delay    = Number.isFinite(opts.delay) ? opts.delay : 0
  const debounce = Number.isFinite(opts.debounced) ? opts.debounced : 500

  const context: TargetContext = {
    isHovered: false,

    onMouseEnter (event) {
      if (context.onHoverOutTimeout)
        clearTimeout(context.onHoverOutTimeout)

      if (!context.isHovered) {
        if (context.onHoverInTimeout)
          clearTimeout(context.onHoverInTimeout)

        context.onHoverInTimeout = setTimeout(() => {
          opts.onHoverIn(event)

          context.isHovered = true
        }, delay)
      }
    },

    onMouseLeave (event) {
      if (context.onHoverOutTimeout)
        clearTimeout(context.onHoverOutTimeout)

      if (!context.isHovered && context.onHoverInTimeout)
        clearTimeout(context.onHoverInTimeout)

      if (context.isHovered) {
        context.onHoverOutTimeout = setTimeout(() => {
          opts.onHoverOut(event)

          context.isHovered = false
        }, debounce)
      }
    },
  }

  target.addEventListener('mouseenter', context.onMouseEnter, { passive: true })
  target.addEventListener('mouseleave', context.onMouseLeave, { passive: true })

  targetsMap.set(target, context)
}

export function removeHoverListener (target: HTMLElement) {
  const context = targetsMap.get(target)

  if (context) {
    target.removeEventListener('mouseenter', context.onMouseEnter)
    target.removeEventListener('mouseleave', context.onMouseLeave)
  }
}
