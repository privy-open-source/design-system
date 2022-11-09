<template>
  <span
    data-testid="dot"
    :class="classNames" />
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed,
} from 'vue-demi'

type ColorVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'
type StyleVariant = 'default' | 'pills'
export default defineComponent({
  props: {
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'default',
    },
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'default',
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['dot']

      if (props.color)
        result.push(`dot--${props.color}`)

      if (props.variant)
        result.push(`dot--variant-${props.variant}`)

      return result
    })

    return { classNames }
  },
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
    @apply bg-emphasis-subtle;
  }

  &&--primary {
    @apply bg-accent-emphasis;
  }

  &&--success {
    @apply bg-success-emphasis;
  }

  &&--warning {
    @apply bg-warning-emphasis;
  }

  &&--danger {
    @apply bg-danger-emphasis;
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
