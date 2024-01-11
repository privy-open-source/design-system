<template>
  <span
    data-testid="dot"
    :class="classNames" />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import { computed } from 'vue-demi'
import type { StyleVariant } from '.'
import type { ColorVariant } from '../button'

const props = defineProps({
  color: {
    type   : String as PropType<ColorVariant>,
    default: 'default',
  },
  variant: {
    type   : String as PropType<StyleVariant>,
    default: 'default',
  },
})

const classNames = computed(() => {
  const result: string[] = ['dot']

  if (props.color)
    result.push(`dot--${props.color}`)

  if (props.variant)
    result.push(`dot--variant-${props.variant}`)

  return result
})
</script>

<style lang="postcss">
/**
* Component Name: Dot
* Component URI : -
* Date Created  : May 30, 2022
* Last Update   : May 31, 2022
*/

/**
* Dot is sub-component used for
* Badge and Label components
*/
.dot {
  /**
  * Set size & shape of dot
  */
  @apply inline-block w-2 h-2 rounded-full box-border;

  /**
  * Provide colors variant
  * default and 4 colors
  * variant available
  * primary, success
  * warning & danger
  */
  &&--default {
    --p-dot-bg-default: theme(backgroundColor.inverse);
    --p-dot-bg-dark-default: theme(backgroundColor.dark.inverse);

    @apply bg-[color:var(--p-dot-bg-default)];
    @apply dark:bg-[color:var(--p-dot-bg-dark-default)];
  }

  &&--primary {
    @apply bg-brand-accent;
    @apply dark:bg-dark-brand-accent;
  }

  &&--info {
    @apply bg-info-emphasis;
    @apply dark:bg-dark-info-emphasis;
  }

  &&--success {
    @apply bg-success-emphasis;
    @apply dark:bg-dark-success-emphasis;
  }

  &&--warning {
    @apply bg-warning-emphasis;
    @apply dark:bg-dark-warning-emphasis;
  }

  &&--danger {
    @apply bg-danger-emphasis;
    @apply dark:bg-dark-danger-emphasis;
  }

  /**
  * Set width of badge
  * in pills variant
  */
  &&--variant-pills {
    @apply w-12;
  }
}
</style>
