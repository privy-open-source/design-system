<template>
  <Nav
    :title="title"
    vertical
    :variant="variant"
    :align="align"
    :class="classNames">
    <slot />
  </Nav>
</template>

<script lang="ts">
import {
  computed, defineComponent, inject,
} from 'vue-demi'
import Nav from '../nav/Nav.vue'
import { NAV_SETTINGS } from './Sidebar.vue'

export default defineComponent({
  components: { Nav },
  props     : {
    title: {
      type   : String,
      default: undefined,
    },
    bottom: {
      type   : Boolean,
      default: false,
    },
  },

  setup (props) {
    const settings = inject(NAV_SETTINGS, undefined, true)
    const variant  = settings?.variant
    const align    = settings?.align

    const classNames = computed(() => {
      const result: string[] = ['sidebar__nav']

      if (props.bottom)
        result.push('sidebar__nav--bottom')

      return result
    })

    return {
      variant,
      align,
      classNames,
    }
  },

})
</script>

<style lang="postcss">
.sidebar {
  &__nav {
    &.nav--pills.nav--vertical {
      @apply pl-0 pr-0;
    }

    &&--bottom {
      @apply absolute bottom-0;
    }
  }

  &&--narrow {
    .nav__link {
      @apply flex-col justify-center text-center text-xxs;

      &__label {
        @apply ml-0 mt-3 justify-center break-all;
      }
    }

    .nav--pills {
      .nav__link {
        @apply p-0;

        &__icon {
          @apply rounded p-3 inline-block;
        }

        &--active {
          @apply bg-transparent text-body-100;

          .nav__link__icon {
            @apply bg-secondary-5;
          }
        }

        &__label {
          @apply mt-0 px-1 pb-3;
        }
      }
    }

    .nav--tabs {
      .nav__link {
        @apply px-0;

        &--active {
          @apply bg-white;
        }

        &__label {
          @apply px-2;
        }
      }
    }

    .nav__title {
      @apply hidden;
    }
  }
}
</style>
