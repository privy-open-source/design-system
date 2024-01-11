<template>
  <component
    :is="elementNames"
    data-testid="heading"
    class="heading"
    :class="classNames">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import { computed } from 'vue-demi'
import type {
  ElementVariant,
  TransformVariant,
  WeightVariant,
} from '.'

const props = defineProps({
  element: {
    type   : String as PropType<ElementVariant>,
    default: 'h3',
  },
  weight: {
    type   : String as PropType<WeightVariant>,
    default: 'normal',
  },
  transform: {
    type   : String as PropType<TransformVariant>,
    default: 'normalcase',
  },
})

const elementNames = computed(() => {
  return props.element
})

const classNames = computed(() => {
  const result: string[] = [`${props.element}`]

  if (props.transform)
    result.push(`heading--${props.transform}`)

  if (props.weight)
    result.push(`heading--${props.weight}`)

  return result
})
</script>

<style lang="postcss">
.h {
  &1 {
    @apply text-7xl;
  }
  &2 {
    @apply text-6xl;
  }
  &3 {
    @apply text-5xl;
  }
  &4 {
    @apply text-4xl;
  }
  &5 {
    @apply text-2xl;
  }
  &6 {
    @apply text-xl;
  }

  &eading {
    /**
    * Weight variant
    * of heading
    */
    &:not([class^='text-'], [class*='text-']) {
      @apply text-default;
      @apply dark:text-dark-default;
    }

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
    * of heading
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
  }
}
</style>
