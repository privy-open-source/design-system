<template>
  <component
    :is="hyperlink"
    data-testid="freetext"
    class="freetext"
    :class="classNames"
    :href="href">
    <slot />
  </component>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
} from 'vue-demi'
import { StyleVariant } from '.'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'body',
    },
    href: {
      type   : String,
      default: undefined,
    },
  },

  setup (props) {
    const hyperlink = computed(() => {
      const tag : String = props.href ? 'a' : 'span'

      return tag
    })

    const classNames = computed(() => {
      const result : String[] = ['']

      if (props.variant)
        result.push(`freetext--${props.variant}`)

      if (props.href)
        result.push('freetext--hyperlink')

      if (props.href && (props.variant === 'caption' || props.variant === 'caption2'))
        result.push('freetext--medium')

      return result
    })

    return {
      hyperlink,
      classNames,
    }
  },
})
</script>

<style lang="postcss">
.freetext {
  &--hyperlink {
    @apply underline decoration-solid;
  }

  &--medium {
    @apply font-medium;
  }

  /**
  * Heading Style
  */
  &--h1 {
    @apply text-7xl;
  }
  &--h2 {
    @apply text-6xl;
  }
  &--h3 {
    @apply text-5xl;
  }
  &--h4 {
    @apply text-4xl;
  }
  &--h5 {
    @apply text-2xl font-medium;
  }
  &--h6 {
    @apply text-xl font-medium;
  }

  /**
  * Subheading Style
  */
  &--subheading {
    @apply text-base font-medium;
  }
  &--subheading2 {
    @apply text-sm tracking-wide font-medium;
  }

  /**
  * Body Style
  */
  &--body {
    @apply text-base;
  }
  &--body2 {
    @apply text-sm tracking-wide;
  }

  /**
  * Button Style
  */
  &--btn {
    @apply font-medium text-base tracking-wider;
  }
  &--btn2 {
    @apply font-medium text-sm;
  }

  /**
  * Caption Style
  */
  &--caption {
    @apply text-xs;
  }
  &--caption2 {
    @apply text-tn;
  }

  /**
  * Form Label Style
  */
  &--formlabel {
    @apply font-medium text-sm tracking-wide;
  }
  &--formlabel2 {
    @apply font-medium text-xs leading-tightest;
  }

  /**
  * Overline Style
  */
  &--overline {
    @apply text-tn tracking-widest uppercase;
  }
}
</style>
