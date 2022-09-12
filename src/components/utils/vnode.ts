import {
  Component,
  Fragment,
  VNode,
} from 'vue-demi'

export function findAllChildren (vnodes: VNode[], name: string): VNode[] {
  const scan   = [...vnodes]
  const result = [] as VNode[]

  while (scan.length > 0) {
    const vnode = scan.shift()

    /* if vnode is <template>, scan all the children  */
    if (vnode.type === Fragment && Array.isArray(vnode.children))
      scan.push(...vnode.children as VNode[])

    else if (vnode.type && (vnode.type as Component).name === name)
      result.push(vnode)
  }

  return result
}
