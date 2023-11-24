<template>
  <div
    ref="root"
    data-testid="popover"
    class="popover">
    <slot
      name="activator"
      :is-show="isShow"
      :toggle="toggle"
      :show="show"
      :hide="hide" />

    <p-tooltip
      ref="tooltip"
      v-model="isShow"
      class="popover__tooltip"
      data-testid="popover-tooltip"
      :color="color"
      :placement="placement"
      :target="root"
      @show="$emit('show')"
      @hide="$emit('hide')">
      <slot
        :is-show="isShow"
        :toggle="toggle"
        :show="show"
        :hide="hide" />
    </p-tooltip>
  </div>
</template>

<script lang="ts" setup>
import type { PropType, VNode } from 'vue-demi'
import type { Placement } from '@floating-ui/dom'
import type { ColorVariant } from '../tooltip'
import {
  ref,
  provide,
  computed,
} from 'vue-demi'
import pTooltip from '../tooltip/Tooltip.vue'
import { useVModel } from '../input'
import { onClickOutside } from '@vueuse/core'
import { POPOVER_CONTEXT } from '.'

const props = defineProps({
  modelValue: {
    type   : Boolean,
    default: false,
  },
  color: {
    type   : String as PropType<ColorVariant>,
    default: 'white',
  },
  placement: {
    type   : String as PropType<Placement>,
    default: 'top',
  },
  disabled: {
    type   : Boolean,
    default: false,
  },
})

const root    = ref<HTMLDivElement>()
const tooltip = ref<InstanceType<typeof pTooltip>>()
const isShow  = useVModel(props)

const tooltipEl = computed<HTMLElement>(() => tooltip.value.$el)

onClickOutside(tooltipEl, () => {
  if (isShow.value) {
    // Add little delay too prevent race condition with v-model changing
    setTimeout(() => {
      hide()
    })
  }
}, { ignore: [root] })

function toggle () {
  if (!props.disabled) {
    if (isShow.value)
      hide()
    else
      show()
  }
}

function show () {
  if (!props.disabled)
    isShow.value = true
}

function hide () {
  if (!props.disabled)
    isShow.value = false
}

defineEmits<{
  'show': [],
  'hide': [],
  'update:modelValue': [boolean],
}>()

defineSlots<{
  'activator'(props: { isShow: boolean, show: () => void, hide: () => void, toggle: () => void }): VNode[],
  'default'(props: { isShow: boolean, show: () => void, hide: () => void, toggle: () => void }): VNode[],
}>()

defineExpose({
  isShow,
  show,
  hide,
  toggle,
})

provide(POPOVER_CONTEXT, {
  isShow,
  show,
  hide,
  toggle,
})
</script>

<style lang="postcss">
.popover {
  & > &__tooltip.tooltip {
    @apply text-base;
  }
}
</style>
