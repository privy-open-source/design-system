<template>
  <button
    data-testid="btn"
    :class="classNames">
    <slot />
  </button>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
} from 'vue-demi'

import {
  ColorVariant,
  SizeVariant,
  StyleVariant,
} from '.'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'solid',
    },
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'default',
    },
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    icon: {
      type   : Boolean,
      default: false,
    },
    pill: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props) {
    const classNames = computed(() => {
      const result: string[] = ['btn']

      if (props.color)
        result.push(`btn--${props.color}`)

      if (props.variant)
        result.push(`btn--variant-${props.variant}`)

      // eslint-disable-next-line unicorn/explicit-length-check
      if (props.size)
        result.push(`btn--${props.size}`)

      if (props.icon)
        result.push('btn--icon')

      if (props.pill)
        result.push('btn--pill')

      return result
    })

    return { classNames }
  },
})
</script>

<style lang="postcss">
/**
* Component Name: Button
* Component URI : https://www.figma.com/file/JIYmbyRYZHc9bnVp6Npm9K/B-A-S-E-%2F-Components?node-id=291%3A3945
* Date Created  : Feb 01, 2022
* Last Update   : Nov 21, 2022
*/
.btn {
  --p-color-primary-hover: darken(theme(backgroundColor.accent.emphasis), 5%);
  --p-color-primary-focus: darken(theme(backgroundColor.accent.emphasis), 10%);
  --p-color-success-hover: darken(theme(backgroundColor.success.emphasis), 5%);
  --p-color-success-focus: darken(theme(backgroundColor.success.emphasis), 10%);
  --p-color-warning-hover: darken(theme(backgroundColor.warning.emphasis), 5%);
  --p-color-warning-focus: darken(theme(backgroundColor.warning.emphasis), 10%);
  --p-color-danger-hover: darken(theme(backgroundColor.danger.emphasis), 5%);
  --p-color-danger-focus: darken(theme(backgroundColor.danger.emphasis), 10%);

  @apply inline-flex align-middle font-medium disabled:opacity-50 disabled:pointer-events-none transition-all ease-in-out duration-200;

  > svg {
    @apply self-center;
  }

  /*
  * Button has 4 different sizing
  * eg: xs, sm, md, and lg
  */
  &&--xs {
    @apply px-2 py-[2px] gap-1 text-sm rounded-[6px];
  }

  &&--sm {
    @apply px-4 py-1 gap-2 text-base rounded-[7px];
  }

  &&--md {
    @apply px-5 py-[10px] gap-3 text-base rounded;
  }

  &&--lg {
    @apply px-8 py-4 gap-4 text-base rounded;
  }

  /*
  * Button solid is the
  * default style variant
  */
  &&--variant-solid {
    @apply border border-solid hover:shadow-lg focus:shadow-none active:shadow-none text-on-emphasis;

    &.btn {
      &--default {
        @apply bg-default-alpha hover:bg-subtle-alpha focus:bg-subtle-alpha active:bg-subtle-alpha text-subtle hover:text-default focus:text-default;
      }

      &--primary {
        @apply bg-accent-emphasis hover:bg-[color:var(--p-color-primary-hover)] focus:bg-[color:var(--p-color-primary-focus)] active:bg-[color:var(--p-color-primary-focus)];
      }

      &--success {
        @apply bg-success-emphasis hover:bg-[color:var(--p-color-success-hover)] focus:bg-[color:var(--p-color-success-focus)] active:bg-[color:var(--p-color-success-focus)];
      }

      &--warning {
        @apply bg-warning-emphasis hover:bg-[color:var(--p-color-warning-hover)] focus:bg-[color:var(--p-color-warning-focus)] active:bg-[color:var(--p-color-warning-focus)];
      }

      &--danger {
        @apply bg-danger-emphasis hover:bg-[color:var(--p-color-danger-hover)] focus:bg-[color:var(--p-color-danger-focus)] active:bg-[color:var(--p-color-danger-focus)];
      }
    }
  }

  &&--variant-outline,
  &&--variant-ghost {
    @apply border border-solid text-subtle hover:text-default hover:shadow-lg focus:shadow-none active:shadow-none focus:text-default active:text-default;
  }

  /**
  * Provide colors in
  * button outline variant
  * and border colors for
  * solid variant
  */
  &&--variant-solid,
  &&--variant-outline {
    &.btn {
      &--default {
        @apply border-default-alpha hover:border-subtle-alpha active:border-subtle-alpha focus:border-subtle-alpha;
      }

      &--primary {
        @apply border-accent-emphasis hover:border-[color:var(--p-color-primary-hover)] focus:border-[color:var(--p-color-primary-focus)] active:border-[color:var(--p-color-primary-focus)];
      }

      &--success {
        @apply border-success-emphasis hover:border-[color:var(--p-color-success-hover)] focus:border-[color:var(--p-color-success-focus)] active:border-[color:var(--p-color-success-focus)];
      }

      &--warning {
        @apply border-warning-emphasis hover:border-[color:var(--p-color-warning-hover)] focus:border-[color:var(--p-color-warning-focus)] active:border-[color:var(--p-color-warning-focus)];
      }

      &--danger {
        @apply border-danger-emphasis hover:border-[color:var(--p-color-danger-hover)] focus:border-[color:var(--p-color-danger-focus)] active:border-[color:var(--p-color-danger-focus)];
      }
    }
  }

  /**
  * Button ghost variant
  */
  &&--variant-ghost {
    @apply border-transparent bg-transparent hover:border-default-alpha hover:bg-default-alpha active:bg-default-alpha focus:bg-default-alpha active:border-default-alpha focus:border-default-alpha;
  }

  /**
  * Provide text colors
  * in button link variant
  */
  &&--variant-link {
    @apply border border-transparent font-normal hover:underline;

    &.btn {
      &--default {
        @apply text-subtle hover:text-default focus:text-default active:text-default;
      }

      &--primary {
        @apply text-accent hover:text-[color:var(--p-color-primary-hover)] focus:text-[color:var(--p-color-primary-focus)] active:text-[color:var(--p-color-primary-focus)];
      }

      &--success {
        @apply text-success hover:text-[color:var(--p-color-success-hover)] focus:text-[color:var(--p-color-success-focus)] active:text-[color:var(--p-color-success-focus)];
      }

      &--warning {
        @apply text-warning hover:text-[color:var(--p-color-warning-hover)] focus:text-[color:var(--p-color-warning-focus)] active:text-[color:var(--p-color-warning-focus)];
      }

      &--danger {
        @apply text-danger hover:text-[color:var(--p-color-danger-hover)] focus:text-[color:var(--p-color-danger-focus)] active:text-[color:var(--p-color-danger-focus)];
      }
    }
  }

  &&--variant-input {
    @apply border border-solid border-muted text-subtle font-normal bg-default hover:border-subtle focus:border-subtle active:outline-default;
  }

  /**
  * Button icon variant
  */
  &&--icon {
    &.btn--xs {
      @apply px-1 h-[25.88px];
    }

    &.btn--sm {
      @apply px-2 h-[34px];
    }

    &.btn--md {
      @apply px-3 h-[46px];
    }

    &.btn--lg {
      @apply px-4 h-[58px];
    }
  }

  &&--pill {
    @apply rounded-full;
  }
}
</style>
