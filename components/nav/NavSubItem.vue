<template>
  <li
    data-testid="nav-subitem"
    class="nav__subitem"
    :class="classNames">
    <div
      class="nav__subitem__parent"
      data-testid="nav-subitem-parent"
      @click.prevent="collapse">
      <span
        v-if="$slots.icon"
        class="nav__link__icon">
        <slot name="icon" />
      </span>
      <span class="nav__link__label">
        {{ text }}
      </span>
    </div>
    <slot />
  </li>
</template>

<script lang="ts">
import {
  defineComponent, computed, inject,
} from 'vue-demi'
import { SIDEBAR_SETTINGS } from '../sidebar/Sidebar.vue'

export default defineComponent({
  props: {
    text: {
      type   : String,
      default: undefined,
    },
    collapsible: {
      type   : Boolean,
      default: false,
    },
  },

  setup (props, { slots }) {
    const settings = inject(SIDEBAR_SETTINGS, undefined, true)
    const type     = settings?.type

    const classNames = computed(() => {
      const result: string[] = []

      if (slots.icon)
        result.push('nav__subitem--icon')

      if (props.collapsible && type !== 'narrow')
        result.push('nav__subitem--collapsible nav__subitem--collapsed')

      return result
    })

    function collapse (event: Event): void {
      if (props.collapsible && type !== 'narrow') {
        const container = (event.target as HTMLElement).closest('li')

        container?.classList.toggle('nav__subitem--collapsed')
      }
    }

    return { classNames, collapse }
  },
})
</script>

<style lang="postcss">
.nav {
  &__subitem {
    @apply block text-base text-body-50;

    &&--collapsible {
      .nav__subitem__parent {
        @apply cursor-pointer text-body-100;
      }

      &.nav__subitem--collapsed {
        .nav__subitem__parent {
          @apply text-body-50;
        }

        > .sidebar__nav {
          @apply hidden;
        }
      }
    }

    &__parent {
      @apply flex flex-row items-center p-3 border border-transparent cursor-default rounded;
    }

    .nav {
      @apply pt-0 ml-5 select-none;
    }

    &&--icon {
      .nav {
        @apply ml-5;
      }

      .nav__link__icon {
        @apply grow-0;
      }

      .nav__link__label {
        @apply shrink ml-3 w-full select-none;

        .badge {
          @apply ml-auto;
        }
      }
    }
  }
}
</style>
