interface ComputePosition {
  /**
   * Root container element
   */
  container: HTMLElement,
  /**
   * Reference element where the object should be placed
   */
  reference: HTMLElement,
  /**
   * Zoom scale
   */
  scale: number,
  /**
   * X Position
   */
  x: number,
  /**
   * Y Position
   */
  y: number,
}

interface GetPosition {
  /**
   * Root container element
   */
  container: HTMLElement,
  /**
   * Reference element where the object should be placed
   */
  reference: HTMLElement,
  /**
   * Object element
   */
  object: HTMLElement,
  /**
   * Zoom scale
   */
  scale: number,
}

/**
 * Find nearest relative parent element
 * @param element Element to search
 * @param container Maximum search element
 */
function findRelativeParent (element: HTMLElement, container: HTMLElement = document.body) {
  let parent = element.parentElement

  do {
    const { position } = window.getComputedStyle(parent)

    if (position === 'relative' || position === 'absolute')
      return parent

    parent = parent.parentElement
  } while (parent && parent !== container)

  return container
}

/**
 * Computed X, Y position to Top, Left position
 * @param context
 */
export function computePosition (context: ComputePosition) {
  const {
    container,
    reference,
    x,
    y,
    scale,
  } = context

  const refBounding    = reference.getBoundingClientRect()
  const parent         = findRelativeParent(reference, container)
  const parentBounding = parent.getBoundingClientRect()

  const zeroTop  = refBounding.top - parentBounding.top + parent.scrollTop
  const zeroLeft = refBounding.left - parentBounding.left + parent.scrollLeft

  return {
    top : zeroTop + (y * scale),
    left: zeroLeft + (x * scale),
  }
}

/**
 * Get X, Y position from object
 * @param context
 */
export function getPosition (context: GetPosition) {
  const {
    reference,
    object,
    scale,
  } = context

  const objectBounding = object.getBoundingClientRect()
  const refBounding    = reference.getBoundingClientRect()

  return {
    x   : (objectBounding.left - refBounding.left) / scale,
    y   : (objectBounding.top - refBounding.top) / scale,
    page: Number.parseInt(reference.dataset.pageNumber),
  }
}
