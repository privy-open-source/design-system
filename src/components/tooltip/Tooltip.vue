<template>
  <div
    v-show="isShow"
    ref="tooltip"
    class="tooltip"
    data-testid="tooltip"
    :class="classNames">
    <div
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
} from 'vue-demi'
import { ColorVariant } from '.'
import { Placement, usePopper } from '../dropdown/utils/use-popper'
import { useVModel } from '../input'

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
    const isShow    = useVModel(props)
    const placement = toRef(props, 'placement')
    const target    = toRef(props, 'target')
    const tooltip   = templateRef<HTMLDivElement>('tooltip')
    const popper    = usePopper(target, tooltip, placement)

    const classNames = computed(() => {
      const result: string[] = []

      if (props.color)
        result.push(`tooltip--${props.color}`)

      return result
    })

    watch(isShow, (value) => {
      if (value) {
        popper.value?.update()

        emit('show', target.value)
      } else
        emit('hide', target.value)
    })

    return {
      isShow,
      classNames,
    }
  },
})
</script>

<style lang="postcss">
.tooltip {
  @apply px-4 py-2 rounded-sm text-xs inline-block z-30;

  &__arrow {
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
