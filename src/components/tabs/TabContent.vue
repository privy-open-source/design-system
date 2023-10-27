<template>
  <render />
</template>

<script lang="ts" setup>
import type { VNode } from 'vue-demi'
import {
  Transition,
  h,
  ref,
  watch,
  resolveComponent,
} from 'vue-demi'
import { findAllChildren, toBoolean } from '../utils/vnode'

const props = defineProps({
  active: {
    type    : Number,
    required: true,
  },
  keepAlive: {
    type   : Boolean,
    default: false,
  },
  vertical: {
    type   : Boolean,
    default: false,
  },
})

const transition = ref(props.vertical ? 'slide-top' : 'slide-left')

watch(() => props.active, (value, last) => {
  transition.value = value < last
    ? (props.vertical ? 'slide-bottom' : 'slide-right')
    : (props.vertical ? 'slide-top' : 'slide-left')
})

const slots = defineSlots<{
  default:() => VNode[],
}>()

const render = () => {
  const tab = findAllChildren(slots.default(), 'Tab')
    .map((vnode, index) => {
      const isDisabled = toBoolean(vnode.props?.disabled)
      const isActive   = index === props.active && !isDisabled

      return h(vnode, {
        key      : index,
        dataTabid: index,
        style    : { display: isActive ? 'block' : 'none' },
      })
    })
    .at(props.active)

  const body = () => {
    return props.keepAlive
      ? h(resolveComponent('keep-alive'), () => tab)
      : tab
  }

  return h(Transition, {
    name: transition.value,
    mode: 'out-in',
  }, body)
}
</script>
