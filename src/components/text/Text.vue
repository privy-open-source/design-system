<template>
  <component
    :is="elementNames"
    data-testid="freetext"
    class="freetext"
    :class="classNames"
    :href="href">
    <slot />
  </component>
</template>

<script lang="ts">
import type { PropType } from 'vue-demi'
import {
  defineComponent,
  computed,
} from 'vue-demi'
import type { StyleVariant, ElementVariant } from '.'
import type { WeightVariant, TransformVariant } from '../heading'
import type { RouteLocationRaw } from 'vue-router'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'body',
    },
    href: {
      type   : [String, Object] as PropType<RouteLocationRaw>,
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
    element: {
      type   : String as PropType<ElementVariant>,
      default: 'span',
    },
  },

  setup (props) {
    const elementNames = computed(() => {
      return props.href ? 'nuxt-link' : props.element
    })

    const classNames = computed(() => {
      const result : string[] = ['']

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
      classNames,
      elementNames,
    }
  },
})
</script>

<style lang="postcss">
.freetext {
  /**
  * Weight variant
  * of text
  */
  &--thin {
    @apply font-thin;
  }

  &--extralight {
    @apply font-extralight;
  }

  &--light {
    @apply font-light;
  }

  &--normal {
    @apply font-normal;
  }

  &--semibold {
    @apply font-semibold;
  }

  &--medium {
    @apply font-medium;
  }

  &--bold {
    @apply font-bold;
  }

  &--extrabold {
    @apply font-extrabold;
  }

  &--black {
    @apply font-black;
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
  * Hyperlink style
   */
  &--hyperlink {
    @apply underline decoration-solid;

    &:not([class^='text-'], [class*='text-']) {
      @apply text-link;
      @apply dark:text-dark-link;
    }
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
    @apply text-tn font-medium;
  }

  /**
  * Form Label Style
  */
  &--formlabel {
    @apply font-medium text-sm tracking-wide;
  }
  &--formlabel2 {
    @apply font-bold text-xs leading-tightest;
  }

  &--formlabel,
  &--formlabel2 {
    &:not([class^='text-'], [class*='text-']) {
      @apply text-subtle;
      @apply dark:text-dark-subtle;
    }
  }

  /**
  * Overline Style
  */
  &--overline {
    @apply text-tn font-medium tracking-widest uppercase;
  }
}
</style>
