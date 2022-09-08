<template>
  <div
    data-testid="toast"
    :class="classNames">
    <div class="toast__icon">
      <component
        :is="icon"
        v-if="icon" />
    </div>
    <div class="toast__body">
      <div class="toast__title">
        {{ title }}
      </div>
      <div class="toast__text">
        {{ text }}
      </div>
    </div>
    <div
      data-testid="toast-close"
      class="toast__close"
      @click="close">
      <IconClose />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  ref,
  onMounted,
  onUnmounted,
} from 'vue-demi'
import { ToastStyleVariant, ToastTypeVariant } from './use-toast'
import IconInfo from '@carbon/icons-vue/lib/information--filled/24'
import IconSuccess from '@carbon/icons-vue/lib/checkmark/24'
import IconWarn from '@carbon/icons-vue/lib/warning--filled/24'
import IconError from '@carbon/icons-vue/lib/warning--alt--filled/24'
import IconClose from '@carbon/icons-vue/lib/close/16'

const ToastIcons = {
  info   : IconInfo,
  success: IconSuccess,
  warn   : IconWarn,
  error  : IconError,
}

export default defineComponent({
  components: { IconClose },
  props     : {
    title: {
      type    : String,
      required: true,
    },
    text: {
      type    : String,
      required: true,
    },
    type: {
      type   : String as PropType<ToastTypeVariant>,
      default: 'info',
    },
    variant: {
      type   : String as PropType<ToastStyleVariant>,
      default: 'simple',
    },
    duration: {
      type   : Number,
      default: 3000,
    },
  },
  emits: ['dismissed'],
  setup (props, { emit }) {
    const timeout    = ref()
    const classNames = computed(() => {
      const result: string[] = ['toast']

      if (props.type)
        result.push(`toast--${props.type}`)

      if (props.variant)
        result.push(`toast--${props.variant}`)

      return result
    })

    const icon = computed(() => {
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
      icon,
      close,
    }
  },
})
</script>

<style lang="postcss">
.toast {
  @apply flex shadow-xl w-72 md:w-96 overflow-hidden;

  .toast__icon,
  .toast__close {
    @apply flex-shrink-0;
  }

  .toast__body {
    @apply flex-grow gap-2 flex flex-col;
  }

  .toast__title {
    @apply text-sm font-medium;
  }

  .toast__text {
    @apply text-xs;
  }
}

.toast--simple {
  @apply bg-white;

  .toast__icon {
    @apply px-3 flex items-center justify-center;
  }

  .toast__body {
    @apply p-3;
  }

  .toast__text {
    @apply text-subtext-100;
  }

  .toast__close {
    @apply p-3 text-secondary-50 cursor-pointer hover:text-secondary-100;
  }

  &.toast--info {
    .toast__icon {
      @apply bg-background-100 text-primary-100;
    }

    .toast__title {
      @apply text-body-100;
    }
  }

  &.toast--error {
    .toast__icon {
      @apply bg-danger-100 text-white;
    }

    .toast__title {
      @apply text-danger-100;
    }
  }

  &.toast--success {
    .toast__icon {
      @apply bg-success-100 text-white;
    }

    .toast__title {
      @apply text-success-100;
    }
  }

  &.toast--warn {
    .toast__icon {
      @apply bg-warning-100 text-white;
    }

    .toast__title {
      @apply text-warning-100;
    }
  }
}

.toast--filled {
  @apply p-3 gap-3 items-start;

  .toast__close {
    @apply text-white cursor-pointer hover:text-subtext-100;
  }

  &.toast--info {
    @apply bg-background-100;

    .toast__icon {
      @apply text-primary-100;
    }

    .toast__title {
      @apply text-body-100;
    }

    .toast__text {
      @apply text-subtext-100;
    }

    .toast__close {
      @apply text-subtext-100 cursor-pointer hover:text-secondary-100;
    }
  }

  &.toast--error {
    @apply text-white bg-danger-100;
  }

  &.toast--success {
    @apply text-white bg-success-100;
  }

  &.toast--warn {
    @apply text-white bg-warning-100;
  }
}
</style>
