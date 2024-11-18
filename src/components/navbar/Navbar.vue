<template>
  <nav
    ref="navbar"
    data-testid="navbar"
    class="navbar"
    :class="[{ 'navbar--shadow' : (y > height)}, classNames]">
    <slot />
  </nav>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import {
  computed,
  provide,
  ref,
  toRef,
  watchEffect,
} from 'vue-demi'
import type { StyleVariant } from '../nav'
import {
  useElementBounding,
  useWindowScroll,
} from '@vueuse/core'
import type { ToggleableVariant } from '.'
import { NAVBAR_SETTINGS } from '.'

const props = defineProps({
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
})

const { y }      = useWindowScroll()
const navbar     = ref<HTMLElement>()
const { height } = useElementBounding(navbar)

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
    document.body.style.setProperty('--p-navbar-height', `${height.value}px`)

    onCleanup(() => {
      document.body.style.removeProperty('padding-top')
      document.body.style.removeProperty('--p-navbar-height')
    })
  }
})

provide(NAVBAR_SETTINGS, {
  variant   : toRef(props, 'variant'),
  toggleable: toRef(props, 'toggleable'),
  condensed : toRef(props, 'condensed'),
})
</script>

<style lang="postcss">
.navbar {
  --p-navbar-z-index: theme(zIndex.fixed);
  --p-navbar-sticky-top: theme(spacing.0);
  --p-navbar-fixed-top: theme(spacing.0);
  --p-navbar-collapse-max-height: 20rem; /** 320px */
  --p-navbar-padding-x: theme(spacing.3);
  --p-navbar-padding-left: var(--p-navbar-padding-x);
  --p-navbar-padding-right: var(--p-navbar-padding-x);
  --p-navbar-padding-y: theme(spacing.3);
  --p-navbar-padding-top: var(--p-navbar-padding-y);
  --p-navbar-padding-bottom: var(--p-navbar-padding-y);
  --p-navbar-bg: theme(backgroundColor.default.DEFAULT);
  --p-navbar-bg-dark: theme(backgroundColor.dark.default.DEFAULT);
  --p-navbar-shadow: none;
  --p-navbar-shadow-on-scroll: theme(boxShadow.lg);

  @apply bg-[color:var(--p-navbar-bg)] relative pl-[var(--p-navbar-padding-left)] pr-[var(--p-navbar-padding-right)] pt-[var(--p-navbar-padding-top)] pb-[var(--p-navbar-padding-bottom)] flex items-center flex-wrap transition-shadow duration-150 ease-in-out;
  @apply dark:bg-[color:var(--p-navbar-bg-dark)];
  box-shadow: var(--p-navbar-shadow);

  &&--fixed {
    @apply fixed left-0 top-[var(--p-navbar-fixed-top)] w-full z-[var(--p-navbar-z-index)] transition-all;
  }

  &&--sticky {
    @apply sticky top-[var(--p-navbar-sticky-top)] z-sticky;
  }

  &&--shadow {
    @apply transition-shadow duration-150 ease-in-out;
    box-shadow: var(--p-navbar-shadow-on-scroll);
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
            @apply static shadow-none border-0 bg-ground rounded-t-none;
            @apply dark:bg-dark-ground;

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
              @apply rounded-b-none bg-ground;
              @apply dark:bg-dark-ground;
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
