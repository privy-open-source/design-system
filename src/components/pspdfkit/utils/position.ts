export function isInside (target: HTMLDivElement, reference: HTMLDivElement) {
  const inner = target.getBoundingClientRect()
  const outer = reference.getBoundingClientRect()

  return inner.top >= outer.top
    && inner.bottom <= outer.bottom
    && inner.right <= outer.right
    && inner.left >= outer.left
}
