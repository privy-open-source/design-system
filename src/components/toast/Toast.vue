<template>
  <div
    data-testid="toast"
    class="toast">
    <div
      v-if="$slots.icon"
      class="toast__icon"
      data-testid="toast-icon"
      :class="classIcon">
      <slot name="icon" />
    </div>
    <div class="toast__body">
      <div
        v-p-md.inline="text"
        data-testid="toast-text"
        class="toast__text" />
    </div>
    <div
      data-testid="toast-close"
      class="toast__close">
      <SpinnerRinggo
        v-if="loading"
        class="text-subtle dark:text-dark-subtle"
        data-testid="toast-loading" />
      <Button
        v-else
        size="xs"
        :variant="dismissVariant"
        color="info"
        data-testid="toast-dismiss"
        @click="close">
        {{ dismissText }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue-demi'
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onUnmounted,
} from 'vue-demi'
import SpinnerRinggo from '../spinner/SpinnerRinggo.vue'
import { pMd } from '../markdown'
import type { ColorVariant, StyleVariant } from '../button'
import Button from '../button/Button.vue'

export default defineComponent({
  components: { SpinnerRinggo, Button },
  directives: { pMd },
  props     : {
    text: {
      type   : String,
      default: '',
    },
    duration: {
      type   : Number,
      default: 3000,
    },
    iconColor: {
      type   : String as PropType<ColorVariant>,
      default: undefined,
    },
    dismissVariant: {
      type   : String as PropType<StyleVariant>,
      default: 'ghost',
    },
    dismissText: {
      type   : String,
      default: 'Dismiss',
    },
    loading: {
      type   : Boolean,
      default: false,
    },
  },
  emits: ['dismissed'],
  setup (props, { emit }) {
    const timeout = ref<ReturnType<typeof setTimeout>>()

    const classIcon = computed(() => {
      const result: string[] = ['toast__icon--default']

      if (props.iconColor)
        result.push(`toast__icon--${props.iconColor}`)

      return result
    })

    function close () {
      emit('dismissed')
    }

    onMounted(() => {
      if (Number.isFinite(props.duration) && props.duration > 0) {
        timeout.value = setTimeout(() => {
          emit('dismissed')
        }, props.duration)
      }
    })

    onUnmounted(() => {
      if (timeout.value)
        clearTimeout(timeout.value)
    })

    return {
      classIcon,
      close,
    }
  },
})
</script>

<style lang="postcss">
.toast {
  --p-toast-icon-color-primary: theme(textColor.brand.accent);
  --p-toast-icon-color-primary-dark: theme(textColor.dark.brand.accent);

  /**
  * global style
  * of toast
  */
  @apply flex shadow-xl rounded w-72 md:w-96 overflow-hidden bg-inverse;
  @apply dark:bg-dark-inverse;

  &__icon,
  &__close {
    @apply shrink-0 p-4;
  }

  &__close {
    @apply items-center flex;
  }

  &__icon {
    @apply flex items-center justify-center;

    &--default {
      @apply text-on-emphasis;
      @apply dark:text-dark-on-emphasis;
    }

    &--warning {
      @apply text-warning;
      @apply dark:text-dark-warning;
    }

    &--success {
      @apply text-success;
      @apply dark:text-dark-success;
    }

    &--primary {
      @apply text-[color:var(--p-toast-icon-color-primary)];
      @apply dark:text-[color:var(--p-toast-icon-color-primary-dark)];
    }

    &--danger {
      @apply text-danger;
      @apply dark:text-danger;
    }

    + .toast__body {
      @apply pl-0;
    }
  }

  &__close {
    @apply cursor-pointer text-info hover:text-info/70;
    @apply dark:text-dark-info dark:hover:text-dark-info/70;

    .btn {
      &.btn--variant-ghost {
        @apply text-dark-link;
        @apply dark:text-link;
      }

      &.btn--variant-outline {
        @apply text-dark-default;
        @apply dark:text-default;
      }
    }
  }

  &__body {
    @apply py-4 px-4 grow space-y-2 flex flex-col overflow-hidden;
  }

  &__text {
    @apply text-sm font-medium leading-[1.75] truncate text-on-emphasis;
    @apply dark:text-dark-on-emphasis;
  }

  /* .toast__text {
    @apply text-xs truncate;
  } */

  /**
  * Give padding-left when
  * toast variant is not filled
  */
  /* &:not(.toast--filled) {
    .toast__body {
      @apply pl-4;
    }
  } */

  /**
  * set toast info title
  * and text color
  */
  /* &:is(.toast--info) {
    .toast__title {
      @apply text-on-emphasis;
      @apply dark:text-dark-on-emphasis;
    }

    .toast__text {
      @apply text-on-emphasis;
      @apply dark:text-dark-on-emphasis;
    }
  } */

  /**
  * set toast info icon color.
  * provide background when
  * variant is filled
  */
  /* &&--info {
    &:is(.toast--simple) {
      .toast__icon {
        @apply bg-base text-info;
        @apply dark:bg-dark-base dark:text-dark-info;

        &--default {
          @apply text-default;
          @apply dark:text-dark-default;
        }

        &--warning {
          @apply text-warning;
          @apply dark:text-dark-warning;
        }

        &--success {
          @apply text-success;
          @apply dark:text-dark-success;
        }

        &--primary {
          @apply text-[color:var(--p-toast-icon-color-primary)];
          @apply dark:text-[color:var(--p-toast-icon-color-primary-dark)];
        }

        &--danger {
          @apply text-danger;
          @apply dark:text-danger;
        }
      }
      .toast__title {
        @apply text-default;
        @apply dark:text-dark-default;
      }
    }
    &.toast--filled {
      @apply bg-inverse text-info;
      @apply dark:bg-dark-inverse dark:text-dark-info;
    }
  } */

  /**
  * provide title color
  * in simple variant.
  * set toast icon color and background.
  * provide background color when
  * variant is filled
  */
  /* &&--error {
    &.toast--simple {
      .toast__title {
        @apply text-danger;
        @apply dark:text-dark-danger;
      }
    }

    .toast__icon,
    &.toast--filled {
      @apply bg-danger-emphasis;
      @apply dark:bg-dark-danger-emphasis;
    }
  }

  &&--success {
    &.toast--simple {
      .toast__title {
        @apply text-success;
        @apply dark:text-dark-success;
      }
    }

    .toast__icon,
    &.toast--filled {
      @apply bg-success-emphasis;
      @apply dark:bg-dark-success-emphasis;
    }
  }

  &&--warning {
    &.toast--simple {
      .toast__title {
        @apply text-warning;
        @apply dark:text-dark-warning;
      }
    }

    .toast__icon,
    &.toast--filled {
      @apply bg-warning-emphasis;
      @apply dark:bg-dark-warning-emphasis;
    }
  } */

  /**
  * set global style
  * of toast in simple
  * variant
  */
  /* &&--simple {
    @apply bg-default;
    @apply dark:bg-dark-default;

    .toast__text {
      @apply text-subtle;
      @apply dark:text-dark-subtle;
    }

    &:not(.toast--info) {
      .toast__icon {
        @apply text-state-emphasis;
        @apply dark:text-dark-state-emphasis;
      }
    }
  } */

  /**
  * aligning toast icon
  * when variant is filled.
  * provide text color
  * when toast color isn't info
  */
  /* &&--filled {
    .toast__icon {
      @apply items-start;

      &--default {
        @apply text-on-emphasis;
        @apply dark:text-dark-on-emphasis;
      }

      &--warning {
        @apply text-warning;
        @apply dark:text-dark-warning;
      }

      &--success {
        @apply text-success;
        @apply dark:text-dark-success;
      }

      &--primary {
        @apply text-[color:var(--p-toast-icon-color-primary)];
        @apply dark:text-[color:var(--p-toast-icon-color-primary-dark)];
      }

      &--danger {
        @apply text-danger;
        @apply dark:text-danger;
      }
    }

    &:not(.toast--info) {
      @apply text-state-emphasis;
      @apply dark:text-dark-state-emphasis;
    }
  } */
}

</style>
