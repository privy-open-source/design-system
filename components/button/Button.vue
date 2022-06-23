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

export type StyleVariant = 'solid' | 'outline' | 'ghost' | 'link' | 'input'
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'gold'
export type SizeVariant = 'sm' | 'md' | 'lg'

export default defineComponent({
  props: {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'solid',
    },
    color: {
      type   : String as PropType<ColorVariant>,
      default: 'primary',
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
        result.push(`btn--${props.variant}`)

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
.btn {
  @apply inline-flex font-medium disabled:opacity-50 disabled:pointer-events-none;
}

.btn > svg {
  @apply self-baseline;
}

.btn--sm {
  @apply px-2 py-1 gap-1 text-sm rounded-sm;
}

.btn--md {
  @apply px-4 py-2 gap-2 rounded;
}

.btn--lg {
  @apply px-5 py-3 gap-3 text-base rounded;
}

.btn--solid {
  @apply border;

  &.btn--primary {
    @apply bg-primary-100 border-primary-100 text-white hover:bg-primary-hovered active:bg-primary-focused;
  }

  &.btn--secondary {
    @apply bg-secondary-100 border-secondary-100 text-white hover:bg-secondary-hovered active:bg-secondary-focused;
  }

  &.btn--success {
    @apply bg-success-100 border-success-100 text-white hover:bg-success-hovered active:bg-success-focused;
  }

  &.btn--info {
    @apply bg-info-100 border-info-100 text-white hover:bg-info-hovered active:bg-info-focused;
  }

  &.btn--warning {
    @apply bg-warning-100 border-warning-100 text-white hover:bg-warning-hovered active:bg-warning-focused;
  }

  &.btn--danger {
    @apply bg-danger-100 border-danger-100 text-white hover:bg-danger-hovered active:bg-danger-focused;
  }

  &.btn--gold {
    @apply bg-gold-100 border-gold-100 text-white hover:bg-gold-hovered active:bg-gold-focused;
  }
}

.btn--outline {
  @apply border;

  &.btn--primary {
    @apply border-primary-100 hover:text-white hover:bg-primary-hovered active:bg-primary-focused;
  }

  &.btn--secondary {
    @apply border-secondary-100 hover:text-white hover:bg-secondary-hovered active:bg-secondary-focused;
  }

  &.btn--success {
    @apply border-success-100 hover:text-white hover:bg-success-hovered active:bg-success-focused;
  }

  &.btn--info {
    @apply border-info-100 hover:text-white hover:bg-info-hovered active:bg-info-focused;
  }

  &.btn--warning {
    @apply border-warning-100 hover:text-white hover:bg-warning-hovered active:bg-warning-focused;
  }

  &.btn--danger {
    @apply border-danger-100 hover:text-white hover:bg-danger-hovered active:bg-danger-focused;
  }

  &.btn--gold {
    @apply border-gold-100 hover:text-white hover:bg-gold-hovered active:bg-gold-focused;
  }
}

.btn--ghost {
  @apply border border-transparent bg-white text-body-100 hover:bg-secondary-5 hover:shadow-lg active:shadow-none;
}

.btn--link {
  @apply border border-transparent underline;

  &.btn--primary {
    @apply text-primary-100 hover:text-primary-hovered active:text-primary-focused;
  }

  &.btn--secondary {
    @apply text-secondary-100 hover:text-secondary-hovered active:text-secondary-focused;
  }

  &.btn--success {
    @apply text-success-100 hover:text-success-hovered active:text-success-focused;
  }

  &.btn--info {
    @apply text-info-100 hover:text-info-hovered active:text-info-focused;
  }

  &.btn--warning {
    @apply text-warning-100 hover:text-warning-hovered active:text-warning-focused;
  }

  &.btn--danger {
    @apply text-danger-100 hover:text-danger-hovered active:text-danger-focused;
  }

  &.btn--gold {
    @apply text-gold-100 hover:text-gold-hovered active:text-gold-focused;
  }
}

.btn--input {
  @apply border border-secondary-25 text-subtext-75 bg-white hover:bg-secondary-25 hover:text-body-75 active:border-secondary-75 active:ring active:ring-secondary-25 active:ring-opacity-30;
}

.btn--icon {
  &.btn--sm {
    @apply p-1;
  }

  &.btn--md {
    @apply p-2;
  }

  &.btn--lg {
    @apply p-3;
  }
}

.btn--pill {
  @apply rounded-full;
}
</style>
