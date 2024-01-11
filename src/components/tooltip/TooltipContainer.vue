<template>
  <div
    class="tooltip-container"
    data-testid="tooltip-container">
    <Tooltip
      v-for="[id, item] in items"
      :key="id"
      v-bind="item">
      <span
        v-p-md.inline="item.text"
        class="tooltip__text" />
    </Tooltip>
  </div>
</template>

<script lang="ts" setup>
import {
  reactive,
  ref,
} from 'vue-demi'
import Tooltip from './Tooltip.vue'
import type { TooltipItem, TooltipOptions } from '.'
import { uniqueId } from 'lodash-es'
import { vPMd } from '../markdown'

const items = ref<Map<string, TooltipItem>>(new Map())

function add (options: TooltipOptions): string {
  const id = uniqueId('tooltip_')

  items.value.set(id, reactive({ ...options, show: false }) as TooltipItem)

  return id
}

function update (id: string, options: TooltipOptions) {
  const item = items.value.get(id)

  if (item) {
    item.target    = options.target
    item.text      = options.text
    item.placement = options.placement
  }
}

function show (id: string) {
  const item   = items.value.get(id)
  const result = item.target.dispatchEvent(new CustomEvent('tooltip:show', {
    detail    : item,
    cancelable: true,
  }))

  if (result)
    item.show = true
}

function hide (id: string) {
  const item   = items.value.get(id)
  const result = item.target.dispatchEvent(new CustomEvent('tooltip:hide', {
    detail    : item,
    cancelable: true,
  }))

  if (result)
    item.show = false
}

function toggle (id: string) {
  const item = items.value.get(id)

  if (item.show)
    hide(id)
  else
    show(id)
}

function remove (id: string) {
  items.value.delete(id)
}

defineExpose({
  add,
  update,
  show,
  hide,
  toggle,
  remove,
})
</script>
