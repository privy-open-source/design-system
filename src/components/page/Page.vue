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
  --p-page-type-wide: 60px;
  --p-page-type-narrow: 230px;

  @apply w-full;

  &&--expand {
    &:where(&&-all, &&-lg, &&-md, &&-sm) {
      &:is(.page--expanded) {
        @apply transition-[padding] ease-out delay-75;

        &.page--type-wide {
          @apply pl-[var(--p-page-type-wide)];
        }

        &.page--type-narrow {
          @apply pl-[var(--p-page-type-narrow)];
        }
      }
    }

    &:where(&&-all, &&-lg, &&-md, &&-sm) {
      @apply pl-0 transition-[padding] ease-in delay-75;
    }

    &&-lg {
      @apply lg:pl-[var(--p-page-type-narrow)];

      &:not(.page--type-narrow) {
        @apply lg:pl-[var(--p-page-type-wide)];
      }
    }

    &&-md {
      @apply md:pl-[var(--p-page-type-narrow)];

      &:not(.page--type-narrow) {
        @apply md:pl-[var(--p-page-type-wide)];
      }
    }

    &&-sm {
      @apply sm:pl-[var(--p-page-type-narrow)];

      &:not(.page--type-narrow) {
        @apply sm:pl-[var(--p-page-type-wide)];
      }
    }
  }
}
</style>
