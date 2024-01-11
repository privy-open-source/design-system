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
      class="sidebar__menus">
      <SidebarContent>
        <slot />
      </SidebarContent>
    </div>
    <div
      ref="bottom"
      data-testid="sidebar-bottom"
      class="sidebar__bottom">
      <SidebarContent bottom>
        <slot />
      </SidebarContent>
      <slot name="bottom" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { PropType, VNode } from 'vue-demi'
import {
  computed,
  provide,
  ref,
} from 'vue-demi'
import type { TypeVariant } from '.'
import { SIDEBAR_SETTINGS } from '.'
import { useVModel } from '../input'
import type { StyleVariant, AlignVariant } from '../nav'
import type { ToggleableVariant } from '../navbar'
import SidebarContent from './SidebarContent.vue'

const props = defineProps({
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
})

defineOptions({
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
})

defineEmits<{
  'update:modelValue': [boolean],
}>()

defineSlots<{
  'brand'(): VNode[],
  'bottom'(): VNode[],
}>()

const model  = useVModel(props)
const bottom = ref<HTMLDivElement>()

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

provide(SIDEBAR_SETTINGS, {
  variant: props.variant,
  align  : props.align,
  type   : props.type,
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

  @apply bg-[color:var(--p-sidebar-bg)] px-[var(--p-sidebar-padding-x)] py-[var(--p-sidebar-padding-y)] flex flex-col items-stretch;
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
    @apply fixed z-[var(--p-sidebar-z-index)] top-0 h-full shadow-lg;

    .sidebar__menus {
      @apply grow h-full overflow-y-auto py-2;
    }

    &:not(.sidebar--right) {
      @apply left-0;
    }

    .sidebar__bottom {
      @apply w-full bg-[color:var(--p-sidebar-bg)] shrink-0 pt-2;
      @apply dark:bg-[color:var(--p-sidebar-bg-dark)];
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
