<template>
  <nav
    ref="navbar"
    data-testid="navbar"
    class="navbar"
    :class="[{ 'navbar--shadow' : (y > height)}, classNames]">
    <slot />
  </nav>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  provide,
  toRef,
  watchEffect,
} from 'vue-demi'
import { StyleVariant } from '../nav'
import {
  templateRef,
  useElementBounding,
  useWindowScroll,
} from '@vueuse/core'
import {
  ToggleableVariant,
  NAVBAR_SETTINGS,
} from '.'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'pills',
    },
    toggleable: {
      type   : String as PropType<ToggleableVariant | undefined>,
      default: undefined,
    },
    fixed: {
      type   : Boolean,
      default: false,
    },
    sticky: {
      type   : Boolean,
      default: false,
    },
    condensed: {
      type   : Boolean,
      default: false,
    },
  },

  setup (props) {
    const { y }      = useWindowScroll()
    const navbar     = templateRef<HTMLElement>('navbar')
    const { height } = useElementBounding(navbar)

    provide(NAVBAR_SETTINGS, {
      variant   : toRef(props, 'variant'),
      toggleable: toRef(props, 'toggleable'),
      condensed : toRef(props, 'condensed'),
    })

    const classNames = computed(() => {
      const result: string[] = ['']

      if (props.fixed)
        result.push('navbar--fixed')

      if (props.sticky)
        result.push('navbar--sticky')

      if (props.variant)
        result.push(`navbar--${props.variant}`)

      if (props.toggleable)
        result.push(`navbar--expand-${props.toggleable}`)

      return result
    })

    watchEffect((onCleanup) => {
      if (typeof document !== 'undefined' && document.body && props.fixed) {
        document.body.style.setProperty('padding-top', `${height.value}px`)

        onCleanup(() => {
          document.body.style.removeProperty('padding-top')
        })
      }
    })

    return {
      classNames,
      y,
      height,
    }
  },
})
</script>

<style lang="postcss">
.navbar {
  --p-navbar-z-index: theme(zIndex.fixed);
  --p-navbar-sticky-top: theme(spacing.0);
  --p-navbar-collapse-max-height: 20rem; /** 320px */
  --p-navbar-padding-x: theme(spacing.3);
  --p-navbar-padding-y: theme(spacing.3);
  --p-navbar-bg: theme(backgroundColor.default.DEFAULT);
  --p-navbar-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
  --p-navbar-shadow: theme(boxShadow.lg);

  @apply bg-[color:var(--p-navbar-bg)] relative px-[var(--p-navbar-padding-x)] py-[var(--p-navbar-padding-y)] flex items-center flex-wrap transition-shadow duration-150 ease-in-out;
  @apply dark:bg-[color:var(--p-navbar-bg-dark)];

  &&--fixed {
    @apply fixed left-0 top-0 w-full z-[var(--p-navbar-z-index)];
  }

  &&--sticky {
    @apply sticky top-[var(--p-navbar-sticky-top)] z-sticky;
  }

  &&--shadow {
    @apply shadow-[var(--p-navbar-shadow)] transition-shadow duration-150 ease-in-out;
  }

  &&--expand {
    :is(&-all, &-lg, &-md, &-sm) {
      @apply justify-between;

      .navbar__nav {
        @apply flex-col;
      }
    }

    &-all {
      & > .collapse {
        @apply visible;
      }
    }

    &-lg {
      .navbar__nav {
        @apply lg:flex-row;
      }

      & > .collapse {
        @apply lg:visible;
      }

      .navbar--collapse {
        @apply lg:flex lg:basis-auto;
      }
    }

    &-md {
      .navbar__nav {
        @apply md:flex-row;
      }

      & > .collapse {
        @apply md:visible;
      }

      .navbar--collapse {
        @apply md:flex md:basis-auto;
      }
    }

    &-sm {
      .navbar__nav {
        @apply sm:flex-row;
      }

      & > .collapse {
        @apply sm:visible;
      }

      .navbar--collapse {
        @apply sm:flex sm:basis-auto;
      }
    }
  }

  &--collapse {
    @apply basis-full grow items-center max-h-[var(--p-navbar-collapse-max-height)] overflow-y-auto;

    &.collapse--show {
      @apply mt-3;

      .nav__item--dropdown {
        @apply ml-0;

        .dropdown,
        .btn {
          @apply flex w-full;
        }

        .dropdown {
          @apply flex-col;

          &__menu {
            @apply static shadow-none border-0 bg-base rounded-t-none;
            @apply dark:bg-dark-base;

            &:where(.dropdown__menu--sm, .dropdown__menu--md, .dropdown__menu--lg) {
              @apply w-full;
            }

            &__container {
              .dropdown__item {
                @apply first:rounded-t-none;
              }
            }
          }

          &.dropdown--open {
            .dropdown__activator.btn.btn--md {
              @apply rounded-b-none bg-base;
              @apply dark:bg-dark-base;
            }
          }
        }

        &-icon {
          .dropdown__menu__container {
            .dropdown__item {
              @apply px-11;
            }
          }
        }

        .btn {
          @apply justify-start;

          .dropdown__caret {
            @apply ml-auto;
          }
        }
      }

      :where(.nav__item, .nav__text, .nav__form) {
        @apply w-full;
      }
    }
  }

  &&--lines {
    .navbar--collapse {

      &.collapse--show {

        .nav__item--dropdown {

          .dropdown {
            &__menu {
              @apply rounded mt-2;

              &__container {
                .dropdown__item {
                  @apply first:rounded-t;
                }
              }
            }

            &.dropdown--open {
              .dropdown__activator.btn.btn--md {
                @apply rounded-b-none bg-transparent;
              }
            }
          }

          &-icon {
            .dropdown__menu__container {
              .dropdown__item {
                @apply px-3;
              }
            }
          }
        }
      }
    }
  }
}
</style>
