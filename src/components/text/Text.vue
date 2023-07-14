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
import { WeightVariant, TransformVariant } from '../heading'

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
    weight: {
      type   : String as PropType<WeightVariant>,
      default: 'normal',
    },
    transform: {
      type   : String as PropType<TransformVariant>,
      default: 'normalcase',
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

      if (props.weight)
        result.push(`freetext--${props.weight}`)

      if (props.transform)
        result.push(`freetext--${props.transform}`)

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
    @apply underline decoration-solid text-info;
    @apply dark:text-dark-info;
  }

  /**
  * Weight variant
  * of text
  */
  &--normal {
    @apply font-normal;
  }

  &--medium {
    @apply font-medium;
  }

  &--bold {
    @apply font-bold;
  }

  /**
  * Text transform
  * of text
  */
  &--normalcase {
    @apply normal-case;
  }

  &--lowercase {
    @apply lowercase;
  }

  &--capitalize {
    @apply capitalize;
  }

  &--uppercase {
    @apply uppercase;
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
    @apply font-medium text-sm tracking-wide text-subtle;
    @apply dark:text-dark-subtle;
  }
  &--formlabel2 {
    @apply font-medium text-xs leading-tightest text-subtle;
    @apply dark:text-dark-subtle;
  }

  /**
  * Overline Style
  */
  &--overline {
    @apply text-tn tracking-widest uppercase;
  }
}
</style>
