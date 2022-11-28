<template>
  <div
    v-show="isShow"
    ref="tooltip"
    class="tooltip"
    data-testid="tooltip"
    :class="classNames">
    <div
      ref="arrow"
      class="tooltip__arrow"
      data-popper-arrow />
    <slot />
  </div>
</template>

<script lang="ts">
import { templateRef } from '@vueuse/core'
import {
  defineComponent,
  toRef,
  PropType,
  watch,
  computed,
  watchEffect,
} from 'vue-demi'
import { ColorVariant } from '.'
import { useVModel } from '../input'
import {
  Placement,
  autoUpdate,
  computePosition,
  arrow,
  offset,
  flip,
  shift,
} from '@floating-ui/dom'

export default defineComponent({
  props: {
    modelValue: {
      type   : Boolean,
      default: false,
    },
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'black',
    },
    target: {
      type   : Object as PropType<HTMLElement>,
      default: undefined,
    },
    placement: {
      type   : String as PropType<Placement>,
      default: 'top',
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'update:modelValue',
    'show',
    'hide',
  ],
  setup (props, { emit }) {
    const isShow       = useVModel(props)
    const placement    = toRef(props, 'placement')
    const target       = toRef(props, 'target')
    const tooltip      = templateRef<HTMLDivElement>('tooltip')
    const tooltipArrow = templateRef<HTMLDivElement>('arrow')

    const classNames = computed(() => {
      const result: string[] = []

      if (props.color)
        result.push(`tooltip--${props.color}`)

      return result
    })

    watch(isShow, (value) => {
      if (value)
        emit('show', target.value)
      else
        emit('hide', target.value)
    })

    watchEffect((onCleanup) => {
      if (tooltip.value && target.value && tooltipArrow.value) {
        const cleanup = autoUpdate(target.value, tooltip.value, () => {
          computePosition(target.value, tooltip.value, {
            strategy  : 'absolute',
            placement : placement.value,
            middleware: [
              flip(),
              shift(),
              offset(8),
              arrow({ element: tooltipArrow.value }),
            ],
          }).then(({ x, y, middlewareData, placement }) => {
            if (tooltip.value) {
              tooltip.value.dataset.popperPlacement = placement

              tooltip.value.style.left = `${x || 0}px`
              tooltip.value.style.top  = `${y || 0}px`
            }

            if (tooltipArrow.value) {
              tooltipArrow.value.style.left = `${middlewareData.arrow.x}px`
              tooltipArrow.value.style.top  = `${middlewareData.arrow.y}px`
            }
          })
        })

        onCleanup(cleanup)
      }
    }, { flush: 'post' })

    return {
      isShow,
      classNames,
    }
  },
})
</script>

<style lang="postcss">
.tooltip {
  @apply px-4 py-2 rounded-sm text-xs inline-block z-30 absolute;

  &__arrow {
    @apply absolute;

    [data-popper-placement^="left"] > & {
      @apply -right-1;
    }

    [data-popper-placement^="right"] > & {
      @apply -left-1;
    }

    [data-popper-placement^="bottom"] > & {
      @apply -top-1;
    }

    [data-popper-placement^="top"] > & {
      @apply -bottom-1;
    }

    &::after {
      @apply w-2 h-2 block rotate-45 left-0 content-[''] z-0;
    }
  }

  &--black {
    @apply bg-black text-white shadow-sm;

    .tooltip__arrow::after {
      @apply bg-black;
    }
  }

  &--white {
    @apply bg-white text-body-100 shadow;

    .tooltip__arrow::after {
      @apply bg-white;
    }
  }
}

[data-tooltip-enable="true"] {
  &[data-tooltip-action="click"] {
    @apply cursor-pointer;
  }
}
</style>
