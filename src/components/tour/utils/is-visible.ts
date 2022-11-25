import scrollIntoView from 'scroll-into-view'

export function isVisible (target: HTMLElement) {
  if (!(target instanceof Element))
    return false

  const style = getComputedStyle(target)

  if (style.display === 'none')
    return false

  if (style.visibility !== 'visible')
    return false

  if (Number.parseFloat(style.opacity) < 0.1)
    return false

  const boundaries = target.getBoundingClientRect()

  if (target.offsetWidth + target.offsetHeight + boundaries.height + boundaries.width === 0)
    return false

  const posX         = boundaries.left + boundaries.width / 2
  const posY         = boundaries.top + boundaries.height / 2
  const screenWidth  = (document.documentElement.clientWidth || window.innerWidth)
  const screenHeight = (document.documentElement.clientHeight || window.innerHeight)

  if (posX < 0 || posY < 0)
    return false

  if (posX > screenWidth || posY > screenHeight)
    return false

  let pointContainer = document.elementFromPoint(posX, posY)

  do {
    if (pointContainer === target)
      return true

    pointContainer = pointContainer.parentNode as Element
  } while (pointContainer)

  return false
}

export async function focus (target: HTMLElement, duration = 330): Promise<unknown> {
  return await new Promise((resolve) => {
    scrollIntoView(target, { time: duration }, resolve)
  })
}
