<template>
  <li
    data-testid="nav-item"
    class="nav__item"
    :class="navItemClass">
    <nuxt-link
      data-testid="nav-link"
      :href="link"
      :target="target"
      :class="[classNames, linkClass]">
      <span
        v-if="$slots.icon"
        data-testid="nav-icon"
        class="nav__link__icon">
        <slot name="icon" />
      </span>
      <span
        v-if="$slots.default"
        data-testid="nav-label"
        class="nav__link__label">
        <slot />
      </span>
    </nuxt-link>
  </li>
</template>

<script lang="ts">
import {
  AnchorHTMLAttributes,
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'
import { type RouteLocationRaw } from 'vue-router'

export default defineComponent({
  props: {
    active: {
      type   : Boolean,
      default: false,
    },
    disabled: {
      type   : Boolean,
      default: false,
    },
    href: {
      type   : [String, Object] as PropType<string | RouteLocationRaw>,
      default: undefined,
    },
    target: {
      type   : String as PropType<AnchorHTMLAttributes['target']>,
      default: '_self',
    },
    linkClass: {
      type: [
        String,
        Array,
        Object,
      ],
      default: undefined,
    },
    exact: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props, { slots }) {
    const classNames = computed(() => {
      const result: string[] = ['nav__link']

      if (props.active)
        result.push('nav__link--active')

      if (props.disabled)
        result.push('nav__link--disabled')

      if (slots.icon)
        result.push('nav__link--icon')

      if (props.exact)
        result.push('nav__link--exact')

      return result
    })

    const navItemClass = computed(() => {
      const result: string[] = ['']

      if (props.active)
        result.push('nav__item--active')

      if (props.disabled)
        result.push('nav__item--disabled')

      return result
    })

    const link = computed(() => {
      let permalink: string | undefined

      if (!props.disabled)
        permalink = props.href

      return permalink
    })

    return {
      classNames,
      navItemClass,
      link,
    }
  },
})
</script>

<style lang="postcss">
.nav {

  &__item {
    &&--no-label {
      .nav__link__label {
        @apply hidden;
      }
    }

    &&--no-icon {
      .nav__link__icon {
        @apply hidden;
      }

      .nav__link__label {
        @apply ml-0;
      }
    }
  }

  &__link {
    @apply block relative py-[10px] px-3 -mb-[1px] border border-transparent rounded-t text-base font-normal cursor-pointer no-underline hover:no-underline text-subtle hover:text-default;
    @apply dark:text-dark-subtle hover:dark:text-dark-default;

    &&--active {
      @apply text-default cursor-default;
      @apply dark:text-dark-default;
    }

    &&--disabled {
      @apply cursor-default pointer-events-none;
    }

    &--icon {
      @apply flex items-center;

      .nav__link__icon {
        @apply grow-0;

        img {
          @apply w-5 h-5;
        }
      }

      .nav__link__label {
        @apply shrink ml-3 w-full;
      }
    }

    &__label {
      @apply flex items-center;
    }
  }

  &:is(.nav--justified, .nav--fill) {
    .nav__link {
      &--icon {
        .nav__link__label {
          .badge {
            @apply ml-auto;
          }
        }
      }

      &__label {
        .badge {
          @apply ml-auto;
        }
      }
    }
  }

  &&--condensed {
    .nav__link {
      @apply py-1;
    }
  }
}
</style>
