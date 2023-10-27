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
import type { PropType } from 'vue-demi'
import {
  defineComponent,
  toRef,
  watch,
  computed,
  watchEffect,
} from 'vue-demi'
import type { ColorVariant } from '.'
import { useVModel } from '../input'
import type { Placement } from '@floating-ui/dom'
import {
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
              offset(12),
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
  --p-tooltip-z-index: theme(zIndex.tooltip);

  @apply z-[var(--p-tooltip-z-index)] px-4 py-3 rounded text-xs inline-block absolute drop-shadow-sm;

  &__arrow {
    @apply absolute after:w-4 after:h-4 after:block after:rounded-[3px] after:rotate-45 after:left-0 after:content-[''] after:z-0;

    [data-popper-placement^="left"] > & {
      @apply -right-[6px];
    }

    [data-popper-placement^="right"] > & {
      @apply -left-[6px];
    }

    [data-popper-placement^="bottom"] > & {
      @apply -top-[6px];
    }

    [data-popper-placement^="top"] > & {
      @apply -bottom-[6px];
    }
  }

  &--black {
    @apply bg-inverse text-on-emphasis;
    @apply dark:bg-dark-inverse dark:text-dark-on-emphasis;

    .tooltip__arrow {
      @apply after:bg-inverse;
      @apply dark:after:bg-dark-inverse;
    }
  }

  &--white {
    @apply bg-default text-subtle;
    @apply dark:bg-dark-default dark:text-dark-subtle;

    .tooltip__arrow {
      @apply after:bg-default;
      @apply dark:after:bg-dark-default;
    }
  }
}

[data-tooltip-enable="true"] {
  &[data-tooltip-action="click"] {
    @apply cursor-pointer;
  }
}
</style>
