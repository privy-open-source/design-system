<template>
  <render />
</template>

<script lang="ts" setup>
import { VNode, h } from 'vue-demi'
import { findAllChildren, toBoolean } from '../utils/vnode'

const props = defineProps({
  bottom: {
    type   : Boolean,
    default: false,
  },
})

const slots = defineSlots<{
  default:() => VNode[],
}>()

const render = () => {
  const navs = props.bottom
    ? findAllChildren(slots.default(), 'SidebarNav').filter((vnode) => toBoolean(vnode.props?.bottom))
    : findAllChildren(slots.default(), '*').filter((vnode) => toBoolean(vnode.props?.bottom) !== true)

  return navs.map((nav) => h(nav))
}
</script>
