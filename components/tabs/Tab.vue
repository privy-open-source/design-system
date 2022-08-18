<template>
  <section
    data-testid="tab-panel"
    :data-tabid="index"
    class="tab__panel">
    <div
      v-show="isShow"
      class="tab__content">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { computedInject } from '@vueuse/core'
import {
  defineComponent,
  toRef,
} from 'vue-demi'
import { addTab, TABS_POINTER } from './use-tab'

export default defineComponent({
  name : 'Tab',
  props: {
    title: {
      type   : String,
      default: '',
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props, { slots }) {
    const index = addTab({
      title   : toRef(props, 'title'),
      disabled: toRef(props, 'disabled'),
      slots   : slots,
    })

    const isShow = computedInject(TABS_POINTER, (active) => {
      return active.value === index
    })

    return { index, isShow }
  },
})
</script>
