<template>
  <div
    ref="sidebarBrand"
    :class="classNames"
    data-testid="sidebar-brand"
    class="sidebar__brand">
    <a
      v-if="href"
      :href="href"
      data-testid="sidebar-brand-link">
      <slot />
    </a>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue-demi'

export default defineComponent({
  props: {
    href: {
      type   : String,
      default: undefined,
    },
    sticky: {
      type   : Boolean,
      default: false,
    },
    fixed: {
      type   : Boolean,
      default: false,
    },
  },

  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['']

      if (props.sticky)
        result.push('sidebar__brand--sticky')

      if (props.fixed)
        result.push('sidebar__brand--fixed')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
.sidebar {
  &__brand {
    --p-sidebar-brand-sticky-top: 0;

    @apply block text-center mx-auto pb-4 font-semibold text-default;
    @apply dark:text-dark-default;

    a {
      @apply no-underline cursor-pointer hover:no-underline;

      & > img {
        @apply max-w-full h-auto;
      }

      .sidebar--wide & {
        & > img {
          @apply h-7 w-auto;
        }
      }
    }

    & > img {
      @apply max-w-full h-auto;
    }

    &--fixed {
      @apply fixed top-0 left-0;

      .sidebar--right & {
        @apply right-0 left-auto;
      }
    }

    &--sticky {
      @apply sticky top-[var(--p-sidebar-brand-sticky-top)];
    }

    .sidebar--wide & {
      @apply px-3;

      & > img {
        @apply h-7 w-auto;
      }
    }

    .sidebar--tabs &,
    .sidebar--lines & {
      @apply pr-2;
    }

    .sidebar--lines & {
      @apply pl-2;
    }
  }
}
</style>
