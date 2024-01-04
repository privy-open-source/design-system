<template>
  <div
    data-testid="popup"
    :class="classNames">
    <div
      class="popup__icon"
      data-testid="popup-icon"
      :class="classIcon">
      <slot name="icon">
        <component
          :is="toastIcon"
          v-if="toastIcon" />
      </slot>
    </div>
    <div class="popup__body">
      <div
        v-p-md.inline="title"
        class="popup__title" />
      <div
        v-if="text"
        v-p-md.inline="text"
        class="popup__text"
        data-testid="popup-text" />
    </div>
    <div
      data-testid="popup-close"
      class="popup__close"
      @click="close">
      <IconClose />
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
import type { PopupStyleVariant, PopupTypeVariant } from '.'
import IconInfo from '@privyid/persona-icon/vue/information-circle-solid/24.vue'
import IconSuccess from '@privyid/persona-icon/vue/checkmark/24.vue'
import IconWarning from '@privyid/persona-icon/vue/exclamation-circle-solid/24.vue'
import IconError from '@privyid/persona-icon/vue/exclamation-triangle-solid/24.vue'
import IconClose from '@privyid/persona-icon/vue/close/16.vue'
import { pMd } from '../markdown'
import type { ColorVariant } from '../button'

const ToastIcons = {
  info   : IconInfo,
  success: IconSuccess,
  warning: IconWarning,
  error  : IconError,
}

export default defineComponent({
  components: { IconClose },
  directives: { pMd },
  props     : {
    title: {
      type    : String,
      required: true,
    },
    text: {
      type   : String,
      default: '',
    },
    type: {
      type   : String as PropType<PopupTypeVariant>,
      default: 'info',
    },
    variant: {
      type   : String as PropType<PopupStyleVariant>,
      default: 'simple',
    },
    duration: {
      type   : Number,
      default: 3000,
    },
    iconColor: {
      type   : String as PropType<ColorVariant>,
      default: undefined,
    },
  },
  emits: ['dismissed'],
  setup (props, { emit }) {
    const timeout    = ref<ReturnType<typeof setTimeout>>()
    const classNames = computed(() => {
      const result: string[] = ['popup']

      if (props.type)
        result.push(`popup--${props.type}`)

      if (props.variant)
        result.push(`popup--${props.variant}`)

      return result
    })

    const classIcon = computed(() => {
      const result: string[] = ['default']

      if (props.iconColor)
        result.push(`popup__icon--${props.iconColor}`)

      return result
    })

    const toastIcon = computed(() => {
      return ToastIcons[props.type]
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
      classNames,
      toastIcon,
      classIcon,
      close,
    }
  },
})
</script>

<style lang="postcss">
.popup {
  --p-popup-icon-color-primary: theme(textColor.brand.accent);
  --p-popup-icon-color-primary-dark: theme(textColor.dark.brand.accent);

  /**
  * global style
  * of popup
  */
  @apply flex shadow-xl rounded w-72 md:w-96 overflow-hidden;

  .popup__icon,
  .popup__close {
    @apply shrink-0 p-4;
  }

  .popup__icon {
    @apply flex items-center justify-center;
  }

  .popup__close {
    @apply cursor-pointer text-dark-default/50 hover:text-default/50;
    @apply dark:text-default/30;
  }

  .popup__body {
    @apply py-4 pr-4 grow space-y-2 flex flex-col overflow-hidden;
  }

  .popup__title {
    @apply text-sm font-medium leading-[1.75] truncate;
  }

  .toast__text {
    @apply text-xs truncate;
  }

  /**
  * Give padding-left when
  * popup variant is not filled
  */
  &:not(.popup--filled) {
    .popup__body {
      @apply pl-4;
    }
  }

  /**
  * set popup info title
  * and text color
  */
  &:is(.popup--info) {
    .popup__title {
      @apply text-default;
      @apply dark:text-dark-default;
    }

    .popup__text {
      @apply text-subtle;
      @apply dark:text-dark-subtle;
    }
  }

  /**
  * set popup info icon color.
  * provide background when
  * variant is filled
  */
  &&--info {
    &:is(.popup--simple) {
      .popup__icon {
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
      .popup__title {
        @apply text-default;
        @apply dark:text-dark-default;
      }
    }
    &.popup--filled {
      @apply bg-base text-info;
      @apply dark:bg-dark-base dark:text-dark-info;
    }
  }

  /**
  * provide title color
  * in simple variant.
  * set popup icon color and background.
  * provide background color when
  * variant is filled
  */
  &&--error {
    &.popup--simple {
      .popup__title {
        @apply text-danger;
        @apply dark:text-dark-danger;
      }
    }

    .popup__icon,
    &.popup--filled {
      @apply bg-danger-emphasis;
      @apply dark:bg-dark-danger-emphasis;
    }
  }

  &&--success {
    &.popup--simple {
      .popup__title {
        @apply text-success;
        @apply dark:text-dark-success;
      }
    }

    .popup__icon,
    &.popup--filled {
      @apply bg-success-emphasis;
      @apply dark:bg-dark-success-emphasis;
    }
  }

  &&--warning {
    &.popup--simple {
      .popup__title {
        @apply text-warning;
        @apply dark:text-dark-warning;
      }
    }

    .popup__icon,
    &.popup--filled {
      @apply bg-warning-emphasis;
      @apply dark:bg-dark-warning-emphasis;
    }
  }

  /**
  * set global style
  * of popup in simple
  * variant
  */
  &&--simple {
    @apply bg-default;
    @apply dark:bg-dark-default;

    .popup__text {
      @apply text-subtle;
      @apply dark:text-dark-subtle;
    }

    &:not(.popup--info) {
      .popup__icon {
        @apply text-state-emphasis;
        @apply dark:text-dark-state-emphasis;
      }
    }
  }

  /**
  * aligning popup icon
  * when variant is filled.
  * provide text color
  * when popup color isn't info
  */
  &&--filled {
    .popup__icon {
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
        @apply text-[color:var(--p-popup-icon-color-primary)];
        @apply dark:text-[color:var(--p-popup-icon-color-primary-dark)];
      }

      &--danger {
        @apply text-danger;
        @apply dark:text-danger;
      }
    }

    &:not(.popup--info) {
      @apply text-state-emphasis;
      @apply dark:text-dark-state-emphasis;
    }
  }
}

</style>
