<template>
  <div
    v-if="show"
    data-testid="label"
    :class="classNames">
    <Dot
      v-if="variant === 'dot'"
      data-testid="dot"
      :color="color" /> <slot />

    <span
      v-if="dismissable"
      data-testid="label-dismiss"
      class="label__dismiss"
      @click="close">
      <IconClose />
    </span>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
} from 'vue-demi'
import Dot from '../dot/Dot.vue'
import IconClose from '@carbon/icons-vue/lib/close/16'

type ColorVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'
type StyleVariant = 'default' | 'light' | 'dot'
type SizeVariant = 'lg' | 'md' | 'sm' | 'xs'

export default defineComponent({
  components: { Dot, IconClose },
  props     : {
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'default',
    },
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'default',
    },
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    dismissable: {
      type   : Boolean,
      default: false,
    },
  },

  emits: ['dismissed'],

  setup (props, { emit }) {
    const show = ref(true)

    const classNames = computed(() => {
      const result: string[] = ['label']

      if (props.color)
        result.push(`label--${props.color}`)

      if (props.variant)
        result.push(`label--variant-${props.variant}`)

      // eslint-disable-next-line unicorn/explicit-length-check
      if (props.size)
        result.push(`label--${props.size}`)

      return result
    })

    function close (): void {
      show.value = false
      emit('dismissed')
    }

    return {
      classNames, show, close,
    }
  },

})
</script>

<style lang="postcss">
/**
* Component Name: Label
* Component URI : https://www.figma.com/file/JIYmbyRYZHc9bnVp6Npm9K/B-A-S-E-%2F-Components?node-id=308%3A15173
* Date Created  : June 2, 2022
* Last Update   : June 24, 2022
*/

.label {
  @apply inline-flex items-center border border-transparent;

  /**
  * Add dismiss button
  */
  &__dismiss {
    @apply border-l ml-3 pl-1.5 hover:cursor-pointer border-base-black/10 text-default/30 hover:text-default/50;
  }

  /**
  * Provide size of label
  * There are lg, md,
  * sm and xs
  */
  &--lg {
    @apply text-base px-4 py-2 rounded;
  }

  &--md {
    @apply text-sm px-3 py-1 rounded-sm;
  }

  &--sm {
    @apply text-xs px-2 py-[0.125rem] rounded-xs;
  }

  &--xs {
    @apply px-2 py-0 text-tn rounded-tn;
  }

  /**
  * Set default label with
  * color variant
  */
  &--variant-default {
    @apply text-on-emphasis;

    &.label {
      &--default {
        @apply bg-emphasis-subtle;

        .label__dismiss {
          @apply border-base-white/10 text-on-emphasis/30 hover:text-on-emphasis/50;
        }
      }

      &--primary {
        @apply bg-accent-emphasis;
      }

      &--success {
        @apply bg-success-emphasis;
      }

      &--warning {
        @apply bg-warning-emphasis;
      }

      &--danger {
        @apply bg-danger-emphasis;
      }
    }
  }

  /**
  * Provide light variant
  * in all color
  */
  &--variant-light {
    &.label {
      &--default {
        @apply bg-base-black/5 text-subtle;
      }

      &--primary {
        @apply bg-info text-info;
      }

      &--success {
        @apply bg-success text-success;
      }

      &--warning {
        @apply bg-warning text-warning;
      }

      &--danger {
        @apply bg-danger text-danger;
      }
    }
  }

  /**
  * Provide dot variant
  * in all color
  */
  &--variant-dot {
    /**
    * Dot variant have
    * white background and bordered
    */
    @apply bg-default text-default border-default;

    &.label {
      &--lg,
      &--md {
        .dot {
          @apply mr-2;
        }
      }

      &--sm {
        .dot {
          @apply mr-1.5;
        }
      }

      &--xs {
        .dot {
          @apply mr-1;
        }
      }
    }
  }
}
</style>
