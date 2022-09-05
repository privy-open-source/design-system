<template>
  <span
    data-testid="dot"
    :class="classNames" />
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed,
} from 'vue-demi'

type ColorVariant = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'gold'
export default defineComponent({
  props: {
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'primary',
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['dot']

      if (props.color)
        result.push(`dot--${props.color}`)

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
  * 7 colors variant available
  * primary, secondary, success
  * info, warning, danger, & gold
  */
  &--primary {
    @apply bg-primary-100;
  }

  &--secondary {
    @apply bg-secondary-100;
  }

  &--success {
    @apply bg-success-100;
  }

  &--info {
    @apply bg-info-100;
  }

  &--warning {
    @apply bg-warning-100;
  }

  &--danger {
    @apply bg-danger-100;
  }

  &--gold {
    @apply bg-gold-100;
  }
}
</style>
