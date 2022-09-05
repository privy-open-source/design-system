<template>
  <li
    data-testid="nav-item"
    class="nav__item">
    <a
      data-testid="nav-link"
      :href="link"
      :target="target"
      :class="classNames">
      <span class="nav__link__icon">
        <slot name="icon" />
      </span>
      <span
        v-if="$slots.default"
        class="nav__link__label">
        <slot />
      </span>
    </a>
  </li>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'

type TargetVariant = '_blank' | '_self' | '_parent' | '_top'

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
      type   : String as PropType<TargetVariant>,
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

    const link = computed(() => {
      let permalink: string | undefined

      if (!props.disabled)
        permalink = props.href

      return permalink
    })

    return {
      classNames,
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
  }

  &__link {
    @apply block p-3 -mb-[1px] border border-transparent rounded-t text-base cursor-pointer hover:no-underline text-body-50 hover:text-body-100;

    &--active {
      @apply text-body-100 cursor-default;
    }

    &--disabled {
      @apply text-subtext-50 hover:text-subtext-50 focus:text-subtext-50 active:text-subtext-50 cursor-default;
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

        .badge {
          @apply ml-auto;
        }
      }
    }

    &__label {
      @apply flex;

      .badge {
        @apply ml-auto;
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
