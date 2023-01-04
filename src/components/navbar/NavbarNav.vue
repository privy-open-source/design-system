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

<script lang="ts">
import {
  defineComponent,
  inject,
  PropType,
} from 'vue-demi'
import Nav from '../nav/Nav.vue'
import { AlignVariant } from '../nav'
import { NAVBAR_SETTINGS } from '.'

export default defineComponent({
  components: { Nav },
  props     : {
    align: {
      type   : String as PropType<AlignVariant>,
      default: 'left',
    },
  },
  setup () {
    const settings  = inject(NAVBAR_SETTINGS, undefined, false)
    const variant   = settings?.variant
    const condensed = settings?.condensed

    return { variant, condensed }
  },
})
</script>

<style lang="postcss">
.navbar {
  &__nav {
    @apply flex flex-row items-center;

    &.nav--align-center {
      @apply mx-auto;
    }

    &.nav--align-right {
      @apply ml-auto;
    }

    .dropdown {
      &__activator {
        &.btn {
          @apply px-3 border-transparent bg-transparent shadow-none rounded font-normal text-subtle hover:text-default hover:shadow-none hover:border-transparent;
        }
        /* @apply relative;
        &.btn {
          @apply pl-3 pr-10 border-transparent bg-transparent shadow-none rounded font-normal text-subtle hover:text-default hover:shadow-none hover:border-transparent;
        }

        .dropdown__caret {
          @apply absolute right-3;
        } */
      }

      &--open {
        .dropdown__activator {
          &.btn {
            @apply text-default cursor-default border-transparent bg-transparent hover:bg-transparent;
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
            }
          }
        }
      }

      &.nav--condensed {
        .nav__link--active {
          @apply bg-subtle;
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
              @apply border-b-on-emphasis;
            }
          }
        }
      }
    }
  }
}
</style>
