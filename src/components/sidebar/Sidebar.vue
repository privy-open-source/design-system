<template>
  <aside
    data-testid="sidebar"
    :class="classNames">
    <slot />
  </aside>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  provide,
} from 'vue-demi'
import { SIDEBAR_SETTINGS, TypeVariant } from '.'
import { useVModel } from '../input'
import { StyleVariant, AlignVariant } from '../nav'
import { ToggleableVariant } from '../navbar'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'pills',
    },
    align: {
      type   : String as PropType<AlignVariant>,
      default: 'left',
    },
    type: {
      type   : String as PropType<TypeVariant>,
      default: 'wide',
    },
    fixed: {
      type   : Boolean,
      default: false,
    },
    toggleable: {
      type   : String as PropType<ToggleableVariant>,
      default: undefined,
    },
    modelValue: {
      type   : Boolean,
      default: true,
    },
  },

  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },

  emits: ['update:modelValue'],

  setup (props) {
    provide(SIDEBAR_SETTINGS, {
      variant: props.variant,
      align  : props.align,
      type   : props.type,
    })

    const model = useVModel(props)

    const classNames = computed(() => {
      const result: string[] = ['sidebar']

      if (props.type)
        result.push(`sidebar--${props.type}`)

      if (props.align)
        result.push(`sidebar--${props.align}`)

      if (props.variant)
        result.push(`sidebar--${props.variant}`)

      if (props.fixed)
        result.push('sidebar--fixed')

      if (props.toggleable)
        result.push(`sidebar--toggleable sidebar--toggleable-${props.toggleable}`)

      if (props.toggleable && props.fixed && model.value)
        result.push('sidebar--show')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.sidebar {
  --p-sidebar-size-narrow: 60px;
  --p-sidebar-size-wide: 230px;

  @apply bg-default px-2 py-4;

  /**
  * Default sidebar has
  * 230px width
  */
  &:not(.sidebar--narrow) {
    @apply w-[var(--p-sidebar-size-wide)];
  }

  /**
  * Right-align sidebar
  */
  &:not(.sidebar--fixed) {
    &.sidebar--right {
      @apply ml-auto;
    }
  }

  /**
  * Fixed sidebar
  */
  &&--fixed {
    @apply fixed top-0 h-full shadow-lg;

    &:not(.sidebar--right) {
      @apply left-0;
    }

    /**
    * Right-align in fixed
    */
    &.sidebar--right {
      @apply left-auto right-0;
    }

    /**
    * Toggleable sidebar
    */
    &.sidebar--toggleable {
      &:where(&&-all, &&-lg, &&-md, &&-sm) {
        &:is(.sidebar--show) {
          @apply left-0 transition-[left] ease-out delay-75;
        }
      }

      &:where(&&-all, &&-lg, &&-md, &&-sm) {
        @apply -left-[100%] transition-[left] ease-in delay-75;
      }

      &&-lg {
        @apply lg:left-0;
      }

      &&-md {
        @apply md:left-0;
      }

      &&-sm {
        @apply sm:left-0;
      }
    }
  }

  /**
  * Narrow sidebar
  * is 60px width
  */
  &&--narrow {
    @apply w-[var(--p-sidebar-size-narrow)];
  }

  /**
  * Sidebar with tabs
  * and lines variant
  */
  &&--tabs,
  &&--lines {
    @apply pr-0 py-2 border-r border-r-default;
  }

  &&--lines {
    @apply px-0;
  }
}
</style>
