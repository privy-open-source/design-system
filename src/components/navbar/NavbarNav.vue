<template>
  <Nav
    :align="align"
    :variant="variant"
    :condensed="condensed"
    class="navbar__nav"
    data-testid="navbar-nav">
    <slot />
  </Nav>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import { inject } from 'vue-demi'
import Nav from '../nav/Nav.vue'
import type { AlignVariant } from '../nav'
import { NAVBAR_SETTINGS } from '.'

defineProps({
  align: {
    type   : String as PropType<AlignVariant>,
    default: 'left',
  },
})

const settings  = inject(NAVBAR_SETTINGS, undefined, false)
const variant   = settings?.variant
const condensed = settings?.condensed
</script>

<style lang="postcss">
.navbar {
  &__nav {
    @apply flex flex-row items-center;

    &:not(.nav--align-center):not(.nav--align-right) {
      @apply mr-auto;
    }

    &.nav--align-center {
      @apply mx-auto;
    }

    &.nav--align-right {
      @apply ml-auto;
    }

    .dropdown {
      &__activator {
        &.btn {
          @apply px-3 bg-transparent hover:bg-transparent shadow-none rounded font-normal text-subtle hover:text-default hover:shadow-none;
          @apply dark:bg-transparent hover:dark:bg-transparent dark:text-dark-subtle hover:dark:text-dark-default;
        }

        &:not(.btn--variant-outline) {
          &.btn {
            @apply border-transparent hover:border-transparent;
          }
        }
      }

      &--open {
        .dropdown__activator {
          &.btn {
            @apply text-default cursor-default border-transparent bg-transparent hover:bg-transparent;
            @apply dark:text-dark-default dark:bg-transparent hover:dark:bg-transparent;
          }
        }
      }
    }

    &.nav--pills {
      @apply pb-0;

      .dropdown {
        &--open {
          .dropdown__activator {
            &.btn {
              @apply bg-subtle hover:bg-subtle;
              @apply dark:bg-dark-subtle hover:dark:bg-dark-subtle;
            }
          }
        }
      }

      &.nav--condensed {
        .nav__link--active {
          @apply bg-subtle;
          @apply dark:bg-dark-subtle;
        }
      }
    }

    &.nav--lines {
      .dropdown {
        &__activator {
          &.btn {
            @apply border-x-0 rounded-none;
          }
        }

        &--open {
          .dropdown__activator {
            &.btn {
              @apply border-b-inverse;
              @apply dark:border-b-dark-inverse;
            }
          }
        }
      }
    }
  }
}
</style>
