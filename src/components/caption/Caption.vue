<template>
  <span
    data-testid="caption"
    :class="classNames">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import { computed } from 'vue-demi'
import type { WeightVariant, TransformVariant } from '../heading'
import type { SizeVariant } from '.'

const props = defineProps({
  weight: {
    type   : String as PropType<WeightVariant>,
    default: 'normal',
  },
  transform: {
    type   : String as PropType<TransformVariant>,
    default: 'normalcase',
  },
  size: {
    type   : String as PropType<SizeVariant>,
    default: 'xs',
  },
})

const classNames = computed(() => {
  const result: string[] = ['caption']

  if (props.transform)
    result.push(`caption--${props.transform}`)

  if (props.weight)
    result.push(`caption--${props.weight}`)

  // eslint-disable-next-line unicorn/explicit-length-check
  if (props.size)
    result.push(`caption--${props.size}`)

  return result
})
</script>

<style lang="postcss">
.caption {
  @apply block text-xs tracking-wide;

  &:not([class^='text-'], [class*='text-']) {
    @apply text-muted;
    @apply dark:text-dark-muted;
  }

  /**
  * Caption in tiny size
  */
  &--tn {
    @apply text-tn tracking-wider;
  }

  /**
  * Weight of caption
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
  * of caption
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
</style>
