<template>
  <div
    class="tooltip-container"
    data-testid="tooltip-container">
    <Tooltip
      v-for="[id, item] in items"
      :key="id"
      v-model="item.isShow"
      v-bind="item">
      <span
        v-p-md.inline="item.text"
        class="tooltip__text" />
    </Tooltip>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
} from 'vue-demi'
import Tooltip from './Tooltip.vue'
import type { TooltipItem, TooltipOptions } from '.'
import { uniqueId } from 'lodash-es'
import { pMd } from '../markdown'

export default defineComponent({
  components: { Tooltip },
  directives: { pMd },
  setup () {
    const items = ref<Map<string, TooltipItem>>(new Map())

    function add (options: TooltipOptions): string {
      const id = uniqueId('tooltip_')

      items.value.set(id, reactive({ ...options, isShow: false }) as TooltipItem)

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
        item.isShow = true
    }

    function hide (id: string) {
      const item   = items.value.get(id)
      const result = item.target.dispatchEvent(new CustomEvent('tooltip:hide', {
        detail    : item,
        cancelable: true,
      }))

      if (result)
        item.isShow = false
    }

    function toggle (id: string) {
      const item = items.value.get(id)

      if (item.isShow)
        hide(id)
      else
        show(id)
    }

    function remove (id: string) {
      items.value.delete(id)
    }

    return {
      items,
      add,
      update,
      show,
      hide,
      toggle,
      remove,
    }
  },
})
</script>
