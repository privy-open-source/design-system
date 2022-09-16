import {
  Component,
  Fragment,
  VNode,
} from 'vue-demi'

/**
 * Coerce props value to boolean
 * @param value prop value
 */
export function toBoolean (value: '' | boolean): boolean {
  return value === '' ? true : Boolean(value)
}

/**
 *
 * @param vnodes vnodes tree to be scanned
 * @param names children name(s)
 * @example
 * // Looking for 'Tab' and 'RouteTab'
 * findAllChildren(slots.default(), 'Tab', 'RouteTab)
 */
export function findAllChildren (vnodes: VNode[], ...names: string[]): VNode[] {
  const scan   = [...vnodes]
  const result = [] as VNode[]

  while (scan.length > 0) {
    const vnode = scan.shift()

    /* if vnode is <template>, scan all the children  */
    if (vnode.type === Fragment && Array.isArray(vnode.children))
      scan.push(...vnode.children as VNode[])

    else if (vnode.type && names.includes((vnode.type as Component).name))
      result.push(vnode)
  }

  return result
}
