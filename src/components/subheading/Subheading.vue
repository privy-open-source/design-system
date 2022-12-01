<template>
  <h6
    data-testid="subheading"
    :class="classNames">
    <slot />
  </h6>
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
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    overline: {
      type   : String as PropType<OverlineVariant>,
      default: undefined,
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: String[] = ['subheading']

      if (props.overline)
        result.push(`subheading--overline-${props.overline}`)

      // eslint-disable-next-line unicorn/explicit-length-check
      else if (props.size)
        result.push(`subheading--${props.size}`)

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.subheading {
  @apply m-0 capitalize tracking-normal text-default;

  &&--md {
    @apply text-base font-medium;
  }

  &&--sm {
    @apply text-sm font-medium leading-[1.42];
  }

  &&--overline {
    &-normal,
    &-medium {
      @apply uppercase text-tn tracking-widest text-subtle;
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
