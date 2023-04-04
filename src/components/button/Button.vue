<template>
  <component
    :is="tagName"
    :href="href"
    data-testid="btn"
    :class="classNames">
    <slot />
  </component>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  inject,
} from 'vue-demi'

import {
  ColorVariant,
  SizeVariant,
  StyleVariant,
  TagVariant,
} from '.'
import { BUTTONGROUP_SETTING } from '../button-group'

import { INPUTGROUP_SETTING } from '../input-group'

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
    href: {
      type   : String,
      default: undefined,
    },
  },
  setup (props) {
    const inputSetting  = inject(INPUTGROUP_SETTING, undefined, false)
    const buttonSetting = inject(BUTTONGROUP_SETTING, undefined, false)

    const classNames = computed(() => {
      const result: string[] = ['btn']

      if (props.color)
        result.push(`btn--${props.color}`)

      if (props.variant)
        result.push(`btn--variant-${props.variant}`)

      // eslint-disable-next-line unicorn/explicit-length-check
      if (inputSetting?.size.value)
        result.push(`btn--${inputSetting?.size.value}`)
      // eslint-disable-next-line unicorn/explicit-length-check
      else if (buttonSetting?.size.value)
        result.push(`btn--${buttonSetting?.size.value}`)
      // eslint-disable-next-line unicorn/explicit-length-check
      else if (props.size)
        result.push(`btn--${props.size}`)

      if (props.icon)
        result.push('btn--icon')

      if (props.pill)
        result.push('btn--pill')

      return result
    })

    const tagName = computed(() => {
      let tag: TagVariant = 'button'

      if (props.href)
        tag = 'a'

      return tag
    })

    return { classNames, tagName }
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
  --p-color-primary-hover: darken(theme(colors.brand.accent), 5%);
  --p-color-dark-primary-hover: darken(theme(colors.dark.brand.accent), 5%);
  --p-color-primary-focus: darken(theme(colors.brand.accent), 10%);
  --p-color-dark-primary-focus: darken(theme(colors.dark.brand.accent), 10%);
  --p-color-info-hover: darken(theme(backgroundColor.info.emphasis), 5%);
  --p-color-dark-info-hover: darken(theme(backgroundColor.dark.info.emphasis), 5%);
  --p-color-info-focus: darken(theme(backgroundColor.info.emphasis), 10%);
  --p-color-dark-info-focus: darken(theme(backgroundColor.dark.info.emphasis), 10%);
  --p-color-success-hover: darken(theme(backgroundColor.success.emphasis), 5%);
  --p-color-dark-success-hover: darken(theme(backgroundColor.dark.success.emphasis), 5%);
  --p-color-success-focus: darken(theme(backgroundColor.success.emphasis), 10%);
  --p-color-dark-success-focus: darken(theme(backgroundColor.dark.success.emphasis), 10%);
  --p-color-warning-hover: darken(theme(backgroundColor.warning.emphasis), 5%);
  --p-color-dark-warning-hover: darken(theme(backgroundColor.dark.warning.emphasis), 5%);
  --p-color-warning-focus: darken(theme(backgroundColor.warning.emphasis), 10%);
  --p-color-dark-warning-focus: darken(theme(backgroundColor.dark.warning.emphasis), 10%);
  --p-color-danger-hover: darken(theme(backgroundColor.danger.emphasis), 5%);
  --p-color-dark-danger-hover: darken(theme(backgroundColor.dark.danger.emphasis), 5%);
  --p-color-danger-focus: darken(theme(backgroundColor.danger.emphasis), 10%);
  --p-color-dark-danger-focus: darken(theme(backgroundColor.dark.danger.emphasis), 10%);

  @apply inline-flex align-middle font-medium disabled:opacity-50 disabled:pointer-events-none transition-all ease-in-out duration-200;

  > svg {
    @apply self-center;
  }

  > * {
    @apply relative z-[2];
  }

  /*
  * Button has 4 different sizing
  * eg: xs, sm, md, and lg
  */
  &&--xs {
    @apply px-2 py-[2px] gap-1 text-sm rounded-xs;
  }

  &&--sm {
    @apply px-4 py-1 gap-2 text-base tracking-wider rounded-sm;
  }

  &&--md {
    @apply px-5 py-[10px] gap-3 text-base tracking-wider rounded;
  }

  &&--lg {
    @apply px-8 py-4 gap-4 text-base tracking-wider rounded;
  }

  /*
  * Button solid is the
  * default style variant
  */
  &&--variant-solid {
    @apply border border-solid hover:shadow-lg focus:shadow-none active:shadow-none text-state-emphasis dark:text-dark-state-emphasis;

    &.btn {
      &--default {
        @apply bg-default-alpha dark:bg-dark-default-alpha focus:bg-subtle-alpha focus:dark:bg-dark-subtle-alpha active:bg-subtle-alpha active:dark:bg-dark-subtle-alpha text-subtle dark:text-dark-subtle hover:text-default hover:dark:text-dark-default focus:text-default focus:dark:text-dark-default;
      }

      &--primary {
        @apply bg-brand-accent dark:bg-dark-brand-accent hover:bg-[color:var(--p-color-primary-hover)] hover:dark:bg-[color:var(--p-color-dark-primary-hover)] focus:bg-[color:var(--p-color-primary-focus)] focus:dark:bg-[color:var(--p-color-dark-primary-focus)] active:bg-[color:var(--p-color-primary-focus)] active:dark:bg-[color:var(--p-color-dark-primary-focus)];
      }

      &--info {
        @apply bg-info-emphasis dark:bg-dark-info-emphasis hover:bg-[color:var(--p-color-info-hover)] hover:dark:bg-[color:var(--p-color-dark-info-hover)] focus:bg-[color:var(--p-color-info-focus)] focus:dark:bg-[color:var(--p-color-dark-info-focus)] active:bg-[color:var(--p-color-info-focus)] active:dark:bg-[color:var(--p-color-dark-info-focus)];
      }

      &--success {
        @apply bg-success-emphasis dark:bg-dark-success-emphasis hover:bg-[color:var(--p-color-success-hover)] hover:dark:bg-[color:var(--p-color-dark-success-hover)] focus:bg-[color:var(--p-color-success-focus)] focus:dark:bg-[color:var(--p-color-dark-success-focus)] active:bg-[color:var(--p-color-success-focus)] active:dark:bg-[color:var(--p-color-dark-success-focus)];
      }

      &--warning {
        @apply bg-warning-emphasis dark:bg-dark-warning-emphasis hover:bg-[color:var(--p-color-warning-hover)] hover:dark:bg-[color:var(--p-color-dark-warning-hover)] focus:bg-[color:var(--p-color-warning-focus)] focus:dark:bg-[color:var(--p-color-dark-warning-focus)] active:bg-[color:var(--p-color-warning-focus)] active:dark:bg-[color:var(--p-color-dark-warning-focus)];
      }

      &--danger {
        @apply bg-danger-emphasis dark:bg-dark-danger-emphasis hover:bg-[color:var(--p-color-danger-hover)] hover:dark:bg-[color:var(--p-color-dark-danger-hover)] focus:bg-[color:var(--p-color-danger-focus)] focus:dark:bg-[color:var(--p-color-dark-danger-focus)] active:bg-[color:var(--p-color-danger-focus)] active:dark:bg-[color:var(--p-color-dark-danger-focus)];
      }
    }
  }

  &&--variant-outline,
  &&--variant-ghost {
    @apply border border-solid text-subtle dark:text-dark-subtle hover:text-default hover:dark:text-dark-default hover:shadow-lg focus:shadow-none active:shadow-none focus:text-default focus:dark:text-dark-default active:text-default active:dark:text-dark-default;
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
        @apply border-default-alpha dark:border-dark-default-alpha hover:border-subtle-alpha hover:dark:border-dark-subtle-alpha active:border-subtle-alpha active:dark:border-dark-subtle-alpha focus:border-subtle-alpha focus:dark:border-dark-subtle-alpha;
      }

      &--primary {
        @apply border-brand-accent dark:border-dark-brand-accent hover:border-[color:var(--p-color-primary-hover)] hover:dark:border-[color:var(--p-color-dark-primary-hover)] focus:border-[color:var(--p-color-primary-focus)] focus:dark:border-[color:var(--p-color-dark-primary-focus)] active:border-[color:var(--p-color-primary-focus)] active:dark:border-[color:var(--p-color-dark-primary-focus)];
      }

      &--info {
        @apply border-info-emphasis dark:border-dark-info-emphasis hover:border-[color:var(--p-color-info-hover)] hover:dark:border-[color:var(--p-color-dark-info-hover)] focus:border-[color:var(--p-color-info-focus)] focus:dark:border-[color:var(--p-color-dark-info-focus)] active:border-[color:var(--p-color-info-focus)] active:dark:border-[color:var(--p-color-dark-info-focus)];
      }

      &--success {
        @apply border-success-emphasis dark:border-dark-success-emphasis hover:border-[color:var(--p-color-success-hover)] hover:dark:border-[color:var(--p-color-dark-success-hover)] focus:border-[color:var(--p-color-success-focus)] focus:dark:border-[color:var(--p-color-dark-success-focus)] active:border-[color:var(--p-color-success-focus)] active:dark:border-[color:var(--p-color-dark-success-fucus)];
      }

      &--warning {
        @apply border-warning-emphasis dark:border-dark-warning-emphasis hover:border-[color:var(--p-color-warning-hover)] hover:dark:border-[color:var(--p-color-dark-warning-hover)] focus:border-[color:var(--p-color-warning-focus)] focus:dark:border-[color:var(--p-color-dark-warning-focus)] active:border-[color:var(--p-color-warning-focus)] active:dark:border-[color:var(--p-color-dark-warning-focus)];
      }

      &--danger {
        @apply border-danger-emphasis dark:border-dark-danger-emphasis hover:border-[color:var(--p-color-danger-hover)] hover:dark:border-[color:var(--p-color-dark-danger-hover)] focus:border-[color:var(--p-color-danger-focus)] focus:dark:border-[color:var(--p-color-dark-danger-focus)] active:border-[color:var(--p-color-danger-focus)] active:dark:border-[color:var(--p-color-dark-danger-focus)];
      }
    }
  }

  /**
  * Button ghost variant
  */
  &&--variant-ghost {
    @apply border-transparent dark:border-transparent bg-transparent dark:bg-transparent hover:border-default-alpha hover:dark:border-dark-default-alpha hover:bg-default-alpha hover:dark:bg-dark-default-alpha active:bg-default-alpha active:dark:bg-dark-default-alpha focus:bg-default-alpha focus:dark:bg-dark-default-alpha active:border-default-alpha active:dark:border-dark-default-alpha focus:border-default-alpha focus:dark:border-dark-default-alpha;
  }

  /**
  * Provide text colors
  * in button link variant
  */
  &&--variant-link {
    @apply border border-transparent font-normal hover:underline;

    &.btn {
      &--default {
        @apply text-subtle dark:text-dark-subtle hover:text-default hover:dark:text-dark-default focus:text-default focus:dark:text-dark-default active:text-default active:dark:text-dark-default;
      }

      &--primary {
        @apply text-brand-accent dark:text-dark-brand-accent hover:text-[color:var(--p-color-primary-hover)] focus:text-[color:var(--p-color-primary-focus)] active:text-[color:var(--p-color-primary-focus)];
      }

      &--info {
        @apply text-info dark:text-dark-info hover:text-[color:var(--p-color-info-hover)] hover:dark:text-[color:var(--p-color-dark-info-hover)] focus:text-[color:var(--p-color-info-focus)] focus:dark:text-[color:var(--p-color-dark-info-focus)] active:text-[color:var(--p-color-info-focus)] active:dark:text-[color:var(--p-color-dark-info-focus)];
      }

      &--success {
        @apply text-success dark:text-dark-success hover:text-[color:var(--p-color-success-hover)] hover:dark:text-[color:var(--p-color-dark-success-hover)] focus:text-[color:var(--p-color-success-focus)] focus:dark:text-[color:var(--p-color-dark-success-focus)] active:text-[color:var(--p-color-success-focus)] active:dark:text-[color:var(--p-color-dark-success-focus)];
      }

      &--warning {
        @apply text-warning dark:text-dark-warning hover:text-[color:var(--p-color-warning-hover)] hover:dark:text-[color:var(--p-color-dark-warning-hover)] focus:text-[color:var(--p-color-warning-focus)] focus:dark:text-[color:var(--p-color-dark-warning-focus)] active:text-[color:var(--p-color-warning-focus)] active:dark:text-[color:var(--p-color-dark-warning-focus)];
      }

      &--danger {
        @apply text-danger dark:text-dark-danger hover:text-[color:var(--p-color-danger-hover)] hover:dark:text-[color:var(--p-color-dark-danger-hover)] focus:text-[color:var(--p-color-danger-focus)] focus:dark:text-[color:var(--p-color-dark-danger-focus)] active:text-[color:var(--p-color-danger-focus)] active:dark:text-[color:var(--p-color-dark-danger-focus)];
      }
    }
  }

  &&--variant-input {
    @apply border border-solid border-muted dark:border-dark-muted text-subtle dark:text-dark-subtle font-normal bg-default dark:bg-dark-default hover:border-subtle hover:dark:border-dark-subtle focus:border-subtle focus:dark:border-dark-subtle active:outline-default active:dark:outline-dark-default;

    .state--disabled & {
      @apply bg-subtle dark:bg-dark-subtle border-muted dark:border-dark-muted pointer-events-none text-muted dark:text-dark-muted;
    }

    .state--error & {
      @apply border-danger-emphasis dark:border-dark-danger-emphasis;

      &:focus {
        @apply ring-danger border-danger-emphasis dark:ring-dark-danger dark:border-dark-danger-emphasis;
      }
    }
  }

  /**
  * Button icon variant
  */
  &&--icon {
    &.btn--xs {
      @apply px-[2px];
    }

    &.btn--sm {
      @apply px-1;
    }

    &.btn--md {
      @apply px-[10px];
    }

    &.btn--lg {
      @apply px-4;
    }
  }

  &&--pill {
    @apply rounded-full;
  }
}
</style>
