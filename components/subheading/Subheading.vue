<template>
  <p 
    data-testid="subheading"
    :class="classNames">
    <slot />
  </p>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
} from 'vue-demi'

type SizeVariant = 'sm' | 'md'
type OverlineVariant = 'normal' | 'medium'

export default defineComponent({
  props: {
    size: {
      type: String as PropType<SizeVariant>,
      default: 'md'
    },
    overline: {
      type: String as PropType<OverlineVariant>,
      default: null
    }
  },

  setup (props) {
    const classNames = computed(() => {
      const result: String[] = ['subheading']

      if (props.overline) 
        result.push(`subheading--overline-${props.overline}`)

      else if (props.size) 
        result.push(`subheading--${props.size}`)

      return result
    })

    return {
      classNames
    }
  }
})
</script>

<style lang="postcss">
.subheading {
  @apply m-0 uppercase tracking-[.009375rem];

  &.subheading--md {
    @apply text-base font-medium leading-tight;
  }

  &.subheading--sm {
    @apply text-sm font-medium leading-[1.28];
  }

  &.subheading--overline {
    &-normal,
    &-medium {
      @apply text-[0.6875rem] leading-[1.4] tracking-[0.09375rem];
    }

    &-normal {
      @apply font-normal;
    }

    &-medium {
      @apply font-medium;
    }
  }
}
</style>
