<template>
  <component
    :is="tagName"
    :href="href"
    :type="type"
    data-testid="btn"
    :class="classNames"
    :disabled="loading || disabled">
    <slot
      v-if="loading"
      name="loading">
      <spinner />
    </slot>
    <slot v-else />
  </component>
</template>

<script lang="ts" setup>
import type {
  PropType,
  VNode,
} from 'vue-demi'
import {
  computed,
  inject,
  resolveComponent,
} from 'vue-demi'
import type { RouteLocationRaw } from 'vue-router'
import type {
  ColorVariant,
  SizeVariant,
  StyleVariant,
  TypeVariant,
} from '.'
import { BUTTONGROUP_SETTING } from '../button-group'
import { INPUTGROUP_SETTING } from '../input-group'
import Spinner from '../spinner/SpinnerRinggo.vue'

const props = defineProps({
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
    type   : [String, Object] as PropType<RouteLocationRaw>,
    default: undefined,
  },
  type: {
    type   : String as PropType<TypeVariant>,
    default: 'button',
  },
  disabled: {
    type   : Boolean,
    default: false,
  },
  loading: {
    type   : Boolean,
    default: false,
  },
})

const inputSetting  = inject(INPUTGROUP_SETTING, undefined, false)
const buttonSetting = inject(BUTTONGROUP_SETTING, undefined, false)

const classNames = computed(() => {
  const result: string[] = ['btn']

  if (props.color)
    result.push(`btn--${props.color}`)

  if (props.variant)
    result.push(`btn--variant-${props.variant}`)

  if (props.loading)
    result.push('btn--loading')

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
  return props.href
    ? resolveComponent('nuxt-link')
    : 'button'
})

defineSlots<{
  loading(): VNode[],
  default(): VNode[],
}>()
</script>

<style lang="postcss">
/**
* Component Name: Button
* Component URI : https://www.figma.com/file/JIYmbyRYZHc9bnVp6Npm9K/B-A-S-E-%2F-Components?node-id=291%3A3945
* Date Created  : Feb 01, 2022
* Last Update   : Aug 19, 2024
*/
.btn {
  --p-color-primary-hover: darken(theme(colors.brand.action), 5%);
  --p-color-dark-primary-hover: darken(theme(colors.dark.brand.action), 5%);
  --p-color-primary-focus: darken(theme(colors.brand.action), 10%);
  --p-color-dark-primary-focus: darken(theme(colors.dark.brand.action), 10%);
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

  --p-text-link-hover: darken(theme(textColor.link.DEFAULT), 5%);
  --p-text-dark-link-hover: darken(theme(textColor.dark.link.DEFAULT), 5%);
  --p-text-link-focus: darken(theme(textColor.link.DEFAULT), 10%);
  --p-text-dark-link-focus: darken(theme(textColor.dark.link.DEFAULT), 10%);

  --p-text-link-emphasis-hover: darken(theme(textColor.link.on-emphasis), 5%);
  --p-text-dark-link-emphasis-hover: darken(theme(textColor.dark.link.on-emphasis), 5%);
  --p-text-link-emphasis-focus: darken(theme(textColor.link.on-emphasis), 10%);
  --p-text-dark-link-emphasis-focus: darken(theme(textColor.dark.link.on-emphasis), 10%);

  --p-button-xs-padding-x: theme(spacing.2);
  --p-button-sm-padding-x: theme(spacing.4);
  --p-button-md-padding-x: theme(spacing.5);
  --p-button-lg-padding-x: theme(spacing.8);

  @apply inline-flex align-middle justify-center font-medium no-underline hover:no-underline disabled:opacity-50 disabled:pointer-events-none transition-all ease-in-out duration-200;

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
    @apply px-[var(--p-button-xs-padding-x)] py-[2px] gap-1 text-sm rounded-xs;
  }

  &&--sm {
    @apply px-[var(--p-button-sm-padding-x)] py-1 gap-2 text-base tracking-wider rounded-sm;
  }

  &&--md {
    @apply px-[var(--p-button-md-padding-x)] py-[10px] gap-3 text-base tracking-wider rounded;
  }

  &&--lg {
    @apply px-[var(--p-button-lg-padding-x)] py-4 gap-4 text-base tracking-wider rounded;
  }

  /*
  * Button solid is the
  * default style variant
  */
  &&--variant-solid {
    @apply border border-solid hover:shadow-lg focus:shadow-none active:shadow-none text-state-emphasis hover:text-state-emphasis;
    @apply dark:text-dark-state-emphasis dark:hover:text-dark-state-emphasis;

    &.btn {
      &--default {
        @apply bg-default-alpha focus:bg-subtle-alpha active:bg-subtle-alpha hover:text-default focus:text-default;
        @apply dark:bg-dark-default-alpha focus:dark:bg-dark-subtle-alpha active:dark:bg-dark-subtle-alpha hover:dark:text-dark-default focus:dark:text-dark-default;
      }

      &--primary {
        @apply bg-brand-action hover:bg-[color:var(--p-color-primary-hover)] focus:bg-[color:var(--p-color-primary-focus)] active:bg-[color:var(--p-color-primary-focus)];
        @apply dark:bg-dark-brand-action hover:dark:bg-[color:var(--p-color-dark-primary-hover)] focus:dark:bg-[color:var(--p-color-dark-primary-focus)] active:dark:bg-[color:var(--p-color-dark-primary-focus)];
      }

      &--info {
        @apply bg-info-emphasis hover:bg-[color:var(--p-color-info-hover)] focus:bg-[color:var(--p-color-info-focus)] active:bg-[color:var(--p-color-info-focus)];
        @apply dark:bg-dark-info-emphasis hover:dark:bg-[color:var(--p-color-dark-info-hover)] focus:dark:bg-[color:var(--p-color-dark-info-focus)] active:dark:bg-[color:var(--p-color-dark-info-focus)];
      }

      &--success {
        @apply bg-success-emphasis hover:bg-[color:var(--p-color-success-hover)] focus:bg-[color:var(--p-color-success-focus)] active:bg-[color:var(--p-color-success-focus)];
        @apply dark:bg-dark-success-emphasis hover:dark:bg-[color:var(--p-color-dark-success-hover)] focus:dark:bg-[color:var(--p-color-dark-success-focus)] active:dark:bg-[color:var(--p-color-dark-success-focus)]
      }

      &--warning {
        @apply bg-warning-emphasis hover:bg-[color:var(--p-color-warning-hover)] focus:bg-[color:var(--p-color-warning-focus)] active:bg-[color:var(--p-color-warning-focus)];
        @apply dark:bg-dark-warning-emphasis hover:dark:bg-[color:var(--p-color-dark-warning-hover)] focus:dark:bg-[color:var(--p-color-dark-warning-focus)] active:dark:bg-[color:var(--p-color-dark-warning-focus)];
      }

      &--danger {
        @apply bg-danger-emphasis hover:bg-[color:var(--p-color-danger-hover)] focus:bg-[color:var(--p-color-danger-focus)] active:bg-[color:var(--p-color-danger-focus)];
        @apply dark:bg-dark-danger-emphasis hover:dark:bg-[color:var(--p-color-dark-danger-hover)] focus:dark:bg-[color:var(--p-color-dark-danger-focus)] active:dark:bg-[color:var(--p-color-dark-danger-focus)]
      }
    }
  }

  &&--variant-outline,
  &&--variant-ghost {
    @apply border border-solid text-default hover:text-default hover:shadow-lg focus:shadow-none active:shadow-none focus:text-default active:text-default;
    @apply dark:text-dark-default hover:dark:text-dark-default focus:dark:text-dark-default active:dark:text-dark-default;
  }

  /**
  * Provide border
  * colors for
  * solid variant
  */
  &&--variant-solid {
    &.btn {
      &--default {
        @apply text-default border-default-alpha hover:border-subtle-alpha active:border-subtle-alpha focus:border-subtle-alpha;
        @apply dark:text-dark-default dark:border-dark-default-alpha dark:hover:border-dark-subtle-alpha dark:active:border-dark-subtle-alpha dark:focus:border-dark-subtle-alpha;
      }

      &--primary {
        @apply border-brand-action hover:border-[color:var(--p-color-primary-hover)] focus:border-[color:var(--p-color-primary-focus)] active:border-[color:var(--p-color-primary-focus)];
        @apply dark:border-dark-brand-action hover:dark:border-[color:var(--p-color-dark-primary-hover)] focus:dark:border-[color:var(--p-color-dark-primary-focus)] active:dark:border-[color:var(--p-color-dark-primary-focus)];
      }

      &--info {
        @apply border-info-emphasis hover:border-[color:var(--p-color-info-hover)] focus:border-[color:var(--p-color-info-focus)] active:border-[color:var(--p-color-info-focus)];
        @apply dark:border-dark-info-emphasis hover:dark:border-[color:var(--p-color-dark-info-hover)] focus:dark:border-[color:var(--p-color-dark-info-focus)] active:dark:border-[color:var(--p-color-dark-info-focus)];
      }

      &--success {
        @apply border-success-emphasis hover:border-[color:var(--p-color-success-hover)] focus:border-[color:var(--p-color-success-focus)] active:border-[color:var(--p-color-success-focus)];
        @apply dark:border-dark-success-emphasis hover:dark:border-[color:var(--p-color-dark-success-hover)] focus:dark:border-[color:var(--p-color-dark-success-focus)] active:dark:border-[color:var(--p-color-dark-success-fucus)];
      }

      &--warning {
        @apply border-warning-emphasis hover:border-[color:var(--p-color-warning-hover)] focus:border-[color:var(--p-color-warning-focus)] active:border-[color:var(--p-color-warning-focus)];
        @apply dark:border-dark-warning-emphasis hover:dark:border-[color:var(--p-color-dark-warning-hover)] focus:dark:border-[color:var(--p-color-dark-warning-focus)] active:dark:border-[color:var(--p-color-dark-warning-focus)]
      }

      &--danger {
        @apply border-danger-emphasis hover:border-[color:var(--p-color-danger-hover)] focus:border-[color:var(--p-color-danger-focus)] active:border-[color:var(--p-color-danger-focus)];
        @apply dark:border-dark-danger-emphasis hover:dark:border-[color:var(--p-color-dark-danger-hover)] focus:dark:border-[color:var(--p-color-dark-danger-focus)] active:dark:border-[color:var(--p-color-dark-danger-focus)];
      }
    }
  }

  /**
  * Button outline variant
  */
  &&--variant-outline {
    @apply border-default hover:border-subtle active:border-subtle focus:border-subtle;
    @apply dark:border-dark-default dark:hover:border-dark-subtle dark:focus:border-dark-subtle dark:active:border-dark-subtle;

    &.btn--emphasis {
      @apply border-default text-on-emphasis hover:text-on-emphasis;
      @apply dark:border-dark-default dark:text-dark-on-emphasis;
    }
  }

  /**
  * Button ghost variant
  */
  &&--variant-ghost {
    @apply border border-transparent bg-transparent hover:border-default-alpha hover:bg-default-alpha active:bg-default-alpha focus:bg-default-alpha active:border-default-alpha focus:border-default-alpha ;
    @apply dark:border-transparent dark:bg-transparent hover:dark:border-dark-default-alpha hover:dark:bg-dark-default-alpha active:dark:bg-dark-default-alpha focus:dark:bg-dark-default-alpha active:dark:border-dark-default-alpha focus:dark:border-dark-default-alpha;
  }

  /**
  * Provide colors
  * of button ghost variant
  */
  &&--variant-ghost {
    &.btn {
      &--primary {
        @apply text-brand-action hover:text-brand-action focus:text-brand-action active:text-brand-action;
        @apply dark:text-dark-brand-action hover:dark:text-dark-brand-action focus:dark:text-dark-brand-action active:dark:text-dark-brand-action;
      }

      &--info {
        @apply text-info hover:text-info focus:text-info active:text-info;
        @apply dark:text-dark-info hover:dark:text-dark-info focus:dark:text-dark-info active:dark:text-dark-info;
      }

      &--success {
        @apply text-success hover:text-success focus:text-success active:text-success;
        @apply dark:text-dark-success hover:dark:text-success focus:dark:text-success active:dark:text-success;
      }

      &--warning {
        @apply text-warning hover:text-warning focus:text-warning active:text-warning;
        @apply dark:text-dark-warning hover:dark:text-warning focus:dark:text-warning active:dark:text-warning;
      }

      &--danger {
        @apply text-danger hover:text-danger focus:text-danger active:text-danger;
        @apply dark:text-dark-danger hover:dark:text-dark-danger focus:dark:text-dark-danger active:dark:text-dark-danger;
      }
    }
  }

  /**
  * Button link variant
  */
  &&--variant-link {
    &.btn {
      @apply text-link hover:text-[color:var(--p-text-link-hover)] focus:text-[color:var(--p-text-link-focus)] active:text-[color:var(--p-text-link-focus)];
      @apply dark:text-dark-link dark:hover:text-[color:var(--p-text-dark-link-hover)] dark:focus:text-[color:var(--p-text-dark-link-focus)] dark:active:text-[color:var(--p-text-dark-link-focus)];

      &--primary {
        @apply text-brand-action hover:text-[color:var(--p-color-primary-hover)];
        @apply dark:text-dark-brand-action dark:hover:text-[color:var(--p-color-dark-primary-hover)];
      }

      &--emphasis {
        @apply text-link-on-emphasis hover:text-[color:var(--p-text-link-emphasis-hover)] focus:text-[color:var(--p-text-link-emphasis-focus)] active:text-[color:var(--p-text-link-emphasis-focus)];
        @apply dark:text-dark-link dark:hover:text-[color:var(--p-text-dark-link-emphasis-hover)] dark:focus:text-[color:var(--p-text-dark-link-emphasis-focus)] dark:active:text-[color:var(--p-text-dark-link-emphasis-focus)];
      }
    }
  }

  /**
  * Button input variant
  */
  &&--variant-input {
    @apply border border-solid border-muted text-subtle font-normal bg-default hover:border-subtle focus:border-subtle active:outline-default;
    @apply dark:border-dark-muted dark:text-dark-subtle dark:bg-dark-default hover:dark:border-dark-subtle focus:dark:border-dark-subtle active:dark:outline-dark-default;

    .state--disabled & {
      @apply bg-subtle border-muted pointer-events-none text-muted;
      @apply dark:bg-dark-subtle dark:border-dark-muted dark:text-dark-muted;
    }

    .state--error & {
      @apply border-danger-emphasis;
      @apply dark:border-dark-danger-emphasis;

      &:focus {
        @apply ring-danger border-danger-emphasis;
        @apply dark:ring-dark-danger dark:border-dark-danger-emphasis;
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

  &--loading {
    .spinner {
      @apply h-6;
    }
  }
}
</style>
