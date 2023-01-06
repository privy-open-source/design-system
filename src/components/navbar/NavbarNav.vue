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
  --p-navbar-dropdown-link-color: theme(textColor.subtle);
  --p-navbar-dropdown-link-color-hover: theme(textColor.default);
  --p-navbar-dropdown-link-bgcolor: theme(backgroundColor.transparent);
  --p-navbar-dropdown-link-bgcolor-active: theme(backgroundColor.subtle.DEFAULT);
  --p-navbar-dropdown-variant-line-border-color: theme(borderColor.on-emphasis.DEFAULT);

  &&--dark {
    --p-navbar-dropdown-link-color: theme(textColor.muted);
    --p-navbar-dropdown-link-color-hover: theme(textColor.on-emphasis);
    --p-navbar-dropdown-link-bgcolor-active: theme(backgroundColor.emphasis.alpha.DEFAULT);
    --p-navbar-dropdown-variant-line-border-color: theme(borderColor.default.DEFAULT);
  }

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
          @apply px-3 border-transparent bg-[color:var(--p-navbar-dropdown-bgcolor)] hover:bg-[color:var(--p-navbar-dropdown-bgcolor)] shadow-none rounded font-normal text-[color:var(--p-navbar-dropdown-link-color)] hover:text-[color:var(--p-navbar-dropdown-link-color-hover)] hover:shadow-none hover:border-transparent;
        }
      }

      &--open {
        .dropdown__activator {
          &.btn {
            @apply text-[color:var(--p-navbar-dropdown-link-color-hover)] cursor-default border-transparent bg-[color:var(--p-navbar-dropdown-bgcolor)] hover:bg-[color:var(--p-navbar-dropdown-bgcolor)];
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
              @apply bg-[color:var(--p-navbar-dropdown-link-bgcolor-active)] hover:bg-[color:var(--p-navbar-dropdown-link-bgcolor-active)];
            }
          }
        }
      }

      &.nav--condensed {
        .nav__link--active {
          @apply bg-[color:var(--p-navbar-dropdown-link-bgcolor-active)];
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
              @apply border-b-[color:var(--p-navbar-dropdown-variant-line-border-color)];
            }
          }
        }
      }
    }
  }
}
</style>
