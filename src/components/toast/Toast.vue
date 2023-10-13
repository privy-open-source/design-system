<template>
  <div
    data-testid="toast"
    :class="classNames">
    <div class="toast__icon">
      <slot name="icon">
        <component
          :is="toastIcon"
          v-if="toastIcon" />
      </slot>
    </div>
    <div class="toast__body">
      <div
        v-p-md.inline="title"
        class="toast__title" />
      <div
        v-if="text"
        v-p-md.inline="text"
        class="toast__text"
        data-testid="toast-text" />
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
import { ToastStyleVariant, ToastTypeVariant } from '.'
import IconInfo from '@privyid/persona-icon/vue/information-circle-solid/24.vue'
import IconSuccess from '@privyid/persona-icon/vue/checkmark/24.vue'
import IconWarning from '@privyid/persona-icon/vue/exclamation-circle-solid/24.vue'
import IconError from '@privyid/persona-icon/vue/exclamation-triangle-solid/24.vue'
import IconClose from '@privyid/persona-icon/vue/close/16.vue'
import { pMd } from '../markdown'

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
    text: { type: String },
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
    const timeout    = ref<ReturnType<typeof setTimeout>>()
    const classNames = computed(() => {
      const result: string[] = ['toast']

      if (props.type)
        result.push(`toast--${props.type}`)

      if (props.variant)
        result.push(`toast--${props.variant}`)

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
      close,
    }
  },
})
</script>

<style lang="postcss">
.toast {
  /**
  * global style
  * of toast
  */
  @apply flex shadow-xl rounded w-72 md:w-96 overflow-hidden;

  .toast__icon,
  .toast__close {
    @apply flex-shrink-0 p-4;
  }

  .toast__icon {
    @apply flex items-center justify-center;
  }

  .toast__close {
    @apply cursor-pointer text-dark-default/50 hover:text-default/50;
    @apply dark:text-default/30;
  }

  .toast__body {
    @apply py-4 pr-4 flex-grow space-y-2 flex flex-col;
  }

  .toast__title {
    @apply text-sm font-medium leading-[1.75];
  }

  .toast__text {
    @apply text-xs;
  }

  /**
  * Give padding-left when
  * toast variant is not filled
  */
  &:not(.toast--filled) {
    .toast__body {
      @apply pl-4;
    }
  }

  /**
  * set toast info title
  * and text color
  */
  &:is(.toast--info) {
    .toast__title {
      @apply text-on-emphasis;
      @apply dark:text-dark-on-emphasis;
    }

    .toast__text {
      @apply text-on-emphasis;
      @apply dark:text-dark-on-emphasis;
    }
  }

  /**
  * set toast info icon color.
  * provide background when
  * variant is filled
  */
  &&--info {
    &:is(.toast--simple) {
      .toast__icon {
        @apply bg-base text-info;
        @apply dark:bg-dark-base dark:text-dark-info;
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
  }

  /**
  * provide title color
  * in simple variant.
  * set toast icon color and background.
  * provide background color when
  * variant is filled
  */
  &&--error {
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
  }

  /**
  * set global style
  * of toast in simple
  * variant
  */
  &&--simple {
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
  }

  /**
  * aligning toast icon
  * when variant is filled.
  * provide text color
  * when toast color isn't info
  */
  &&--filled {
    .toast__icon {
      @apply items-start;
    }

    &:not(.toast--info) {
      @apply text-state-emphasis;
      @apply dark:text-dark-state-emphasis;
    }
  }
}

</style>
