<template>
  <div
    class="page"
    data-testid="page"
    :class="classNames">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'
import { useVModel } from '../input'
import { ToggleableVariant } from '../navbar'
import { TypeVariant } from '../sidebar'

export default defineComponent({
  props: {
    expand: {
      type   : String as PropType<ToggleableVariant>,
      default: undefined,
    },
    type: {
      type   : String as PropType<TypeVariant>,
      default: 'narrow',
    },
    modelValue: {
      type   : Boolean,
      default: true,
    },
  },

  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },

  emits: ['update:modelValue'],

  setup (props) {
    const model = useVModel(props)

    const classNames = computed(() => {
      const result: string[] = ['']

      if (props.expand)
        result.push(`page--expand page--expand-${props.expand}`)

      if (props.expand && model.value)
        result.push('page--expanded')

      if (props.type)
        result.push(`page--type-${props.type}`)

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.page {
  @apply w-full;

  &&--expand {
    &:where(&&-all, &&-lg, &&-md, &&-sm) {
      &:is(.page--expanded) {
        @apply transition-[padding] ease-out delay-75;

        &.page--type-wide {
          @apply pl-[60px];
        }

        &.page--type-narrow {
          @apply pl-[230px];
        }
      }
    }

    &:where(&&-all, &&-lg, &&-md, &&-sm) {
      @apply pl-0 transition-[padding] ease-in delay-75;
    }

    &&-lg {
      @apply lg:pl-[230px];

      &:not(.page--type-narrow) {
        @apply lg:pl-[60px];
      }
    }

    &&-md {
      @apply md:pl-[230px];

      &:not(.page--type-narrow) {
        @apply md:pl-[60px];
      }
    }

    &&-sm {
      @apply sm:pl-[230px];

      &:not(.page--type-narrow) {
        @apply sm:pl-[60px];
      }
    }
  }
}
</style>
