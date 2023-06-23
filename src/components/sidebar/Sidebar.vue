<template>
  <aside
    ref="sidebar"
    data-testid="sidebar"
    class="sidebar"
    :class="classNames">
    <slot
      v-if="$slots.brand"
      name="brand" />
    <div
      ref="sidebarMenus"
      data-testid="sidebar-menus"
      :data-sidebar-menu="brandHeight"
      :data-bottom-menu="isBottomMenu"
      class="sidebar__menus"
      :style="{ 'padding-bottom': bottomHeight }">
      <slot />

      <div
        v-if="$slots.bottom"
        data-testid="sidebar-bottom"
        class="sidebar__bottom">
        <slot name="bottom" />
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { templateRef, useElementSize } from '@vueuse/core'
import {
  defineComponent,
  PropType,
  computed,
  ref,
  provide,
  onMounted,
} from 'vue-demi'
import { SIDEBAR_SETTINGS, TypeVariant } from '.'
import { useSelector } from '../pdf-object/utils/use-selector'
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
    sticky: {
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

  setup (props, { slots }) {
    provide(SIDEBAR_SETTINGS, {
      variant: props.variant,
      align  : props.align,
      type   : props.type,
    })

    const sidebar      = templateRef<HTMLDivElement>('sidebar')
    const sidebarBrand = useSelector('.sidebar__brand', sidebar)
    const brand        = useElementSize(sidebarBrand)

    const sidebarMenus  = templateRef<HTMLDivElement>('sidebarMenus')
    const sidebarBottom = useSelector('.sidebar__bottom', sidebarMenus)
    const { height }    = useElementSize(sidebarBottom)

    const brandHeight = computed(() => {
      return slots.brand ? `${brand.height.value + titleHeight.value + 16}px` : 0
    })

    const bottomHeight = computed(() => {
      return (isBottomMenu.value && !isDefault.value) || (!isBottomMenu.value && isDefault.value) ? 0 : `${height.value + 16}px`
    })

    const model = useVModel(props)

    const classNames = computed(() => {
      const result: string[] = ['']

      if (props.type)
        result.push(`sidebar--${props.type}`)

      if (props.align)
        result.push(`sidebar--${props.align}`)

      if (props.variant)
        result.push(`sidebar--${props.variant}`)

      if (props.fixed)
        result.push('sidebar--fixed')

      if (props.sticky)
        result.push('sidebar--sticky')

      if (props.toggleable)
        result.push(`sidebar--toggleable sidebar--toggleable-${props.toggleable}`)

      if (props.toggleable && props.fixed && model.value)
        result.push('sidebar--show')

      return result
    })

    const titleHeight  = ref(0)
    const isBottomMenu = ref(false)
    const isDefault    = ref(false)

    onMounted(() => {
      titleHeight.value = (document.querySelectorAll('.sidebar .nav--has-title').length * 0.25) * 20

      isBottomMenu.value = document.querySelectorAll('.sidebar .sidebar__nav--bottom').length > 0

      isDefault.value = document.querySelectorAll('.sidebar .sidebar__nav:not(.sidebar__nav--bottom)').length > 0
    })

    return {
      classNames, bottomHeight, brandHeight, isBottomMenu, isDefault,
    }
  },
})
</script>

<style lang="postcss">
.sidebar {
  --p-sidebar-size-narrow: 60px;
  --p-sidebar-size-wide: 230px;
  --p-sidebar-bg: theme(backgroundColor.DEFAULT);
  --p-sidebar-bg-dark: theme(backgroundColor.dark.DEFAULT);
  --p-sidebar-z-index: theme(zIndex.fixed);
  --p-sidebar-sticky-top: theme(spacing.0);
  --p-sidebar-padding-x: theme(spacing.2);
  --p-sidebar-padding-y: theme(spacing.4);

  @apply bg-[color:var(--p-sidebar-bg)] px-[var(--p-sidebar-padding-x)] py-[var(--p-sidebar-padding-y)];
  @apply dark:bg-[color:var(--p-sidebar-bg-dark)];

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
    @apply fixed z-[var(--p-sidebar-z-index)] top-0 h-full shadow-lg overflow-y-auto;

    .sidebar__menus {
      @apply relative min-h-[calc(100%-v-bind(brandHeight))];
    }

    &:not(.sidebar--right) {
      @apply left-0;
    }

    .sidebar__bottom {
      @apply absolute -bottom-2 w-[calc(100%+1rem)] -left-2 bg-[color:var(--p-sidebar-bg)];
      @apply dark:bg-[color:var(--p-sidebar-bg-dark)];

      .sidebar__nav {
        @apply px-2;
      }
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
  * Sticky sidebar
  */
  &&--sticky {
    @apply sticky top-[var(--p-sidebar-sticky-top)] z-sticky;
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
    @apply dark:border-r-dark-default;
  }

  &&--lines {
    @apply px-0;
  }
}
</style>
