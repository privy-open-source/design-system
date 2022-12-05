<template>
  <li
    data-testid="nav-item"
    class="nav__item"
    :class="navItemClass">
    <a
      data-testid="nav-link"
      :href="link"
      :target="target"
      :class="classNames">
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
    </a>
  </li>
</template>

<script lang="ts">
import {
  AnchorHTMLAttributes,
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'

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
      type   : String,
      default: undefined,
    },
    target: {
      type   : String as PropType<AnchorHTMLAttributes['target']>,
      default: '_self',
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

      return result
    })

    const navItemClass = computed(() => {
      const result: string[] = ['']

      if (props.active)
        result.push('nav__item--active')

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
    @apply block py-[10px] px-3 -mb-[1px] border border-transparent rounded-t text-base cursor-pointer hover:no-underline text-subtle hover:text-default;

    &--active {
      @apply text-default cursor-default;
    }

    &--disabled {
      @apply text-muted hover:text-muted focus:text-muted active:text-muted cursor-default pointer-events-none;
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
