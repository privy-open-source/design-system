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

    &.nav--align-center {
      @apply mx-auto;
    }

    &.nav--align-right {
      @apply ml-auto;
    }

    .dropdown {
      &__activator {
        @apply relative;
        &.btn {
          @apply pl-3 pr-32 border-transparent shadow-none rounded font-normal text-body-50 hover:text-body-100 hover:bg-transparent;
        }

        .dropdown__caret {
          @apply absolute right-3;
        }
      }

      &--open {
        .dropdown__activator {
          &.btn {
            @apply text-body-100 cursor-default bg-transparent hover:bg-transparent;
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
              @apply bg-secondary-5 hover:bg-secondary-5;
            }
          }
        }
      }

      &.nav--condensed {
        .nav__link--active {
          @apply bg-secondary-5;
        }
      }
    }

    &.nav--lines {
      .nav__link {
        @apply pr-32;
      }

      .dropdown {
        &__activator {
          &.btn {
            @apply border-x-0 rounded-none;
          }
        }

        &--open {
          .dropdown__activator {
            &.btn {
              @apply border-b-body-100;
            }
          }
        }
      }
    }
  }
}
</style>
