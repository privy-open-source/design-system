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
    @apply flex flex-row;

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
          @apply px-3 border-transparent bg-transparent hover:bg-transparent shadow-none rounded font-normal text-subtle dark:text-muted hover:text-default dark:hover:text-on-emphasis hover:shadow-none hover:border-transparent;
        }
      }

      &--open {
        .dropdown__activator {
          &.btn {
            @apply text-default dark:text-on-emphasis cursor-default border-transparent bg-transparent hover:bg-transparent;
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
              @apply bg-subtle dark:bg-emphasis-alpha hover:bg-subtle dark:bg-emphasis-alpha;
            }
          }
        }
      }

      &.nav--condensed {
        .nav__link--active {
          @apply bg-subtle dark:bg-emphasis-alpha;
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
              @apply border-b-on-emphasis dark:border-b-default;
            }
          }
        }
      }
    }
  }
}
</style>
