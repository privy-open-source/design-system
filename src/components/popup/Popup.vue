<template>
  <div
    data-testid="popup"
    :class="[classNames, popupClass]"
    v-bind="popupAttrs">
    <div
      class="popup__icon"
      data-testid="popup-icon"
      :class="classIcon">
      <component
        :is="toastIcon"
        v-if="toastIcon" />
    </div>
    <div class="popup__body">
      <div
        v-if="title"
        v-p-md.inline="title"
        class="popup__title" />
      <div
        v-if="text"
        v-p-md.inline="text"
        class="popup__text"
        data-testid="popup-text" />
      <div
        v-if="actions.length > 0"
        class="popup__actions">
        <template
          v-for="(action, i) in actions"
          :key="i">
          <a
            v-p-md.inline="action.text"
            data-testid="popup-action"
            href="javascript:void"
            class="popup__action"
            v-bind="action.attrs"
            @click.prevent="onActionClick(action)" />
        </template>
      </div>
    </div>
    <div
      v-if="dismissable"
      data-testid="popup-close"
      class="popup__close"
      @click="close">
      <IconClose />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Component, PropType } from 'vue-demi'
import {
  computed,
  h,
  markRaw,
} from 'vue-demi'
import type {
  PopupActionOption,
  PopupStyleVariant,
  PopupTypeVariant,
} from '.'
import IconInfo from '@privyid/persona-icon/vue/information-circle-solid/20.vue'
import IconSuccess from '@privyid/persona-icon/vue/checkmark/20.vue'
import IconWarning from '@privyid/persona-icon/vue/exclamation-circle-solid/20.vue'
import IconError from '@privyid/persona-icon/vue/exclamation-triangle-solid/20.vue'
import IconClose from '@privyid/persona-icon/vue/close/16.vue'
import { vPMd } from '../markdown'
import type { ColorVariant } from '../button'
import type { AdditionalAttr } from '../global/types'
import { useNotifyItem } from '../notify'

const ToastIcons = {
  info   : markRaw(IconInfo),
  success: markRaw(IconSuccess),
  warning: markRaw(IconWarning),
  error  : markRaw(IconError),
}

const props = defineProps({
  title: {
    type   : String,
    default: '',
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
  icon: {
    type: [
      String,
      Object,
      Function,
    ] as PropType<string | Component>,
    default: undefined,
  },
  iconColor: {
    type   : String as PropType<ColorVariant>,
    default: undefined,
  },
  popupAttrs: {
    type   : Object as PropType<AdditionalAttr>,
    default: undefined,
  },
  popupClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  actions: {
    type   : Array as PropType<PopupActionOption[]>,
    default: () => ([]),
  },
  dismissable: {
    type   : Boolean,
    default: true,
  },
})

const notify = useNotifyItem()
const emit   = defineEmits<{
  'dismissed': [],
}>()

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
  if (!props.icon)
    return ToastIcons[props.type]

  if (typeof props.icon === 'string') {
    return () => h('img', {
      'src'        : props.icon,
      'width'      : 20,
      'height'     : 20,
      'data-testid': 'popup-icon-image',
    })
  }

  return props.icon
})

function close () {
  notify.close()

  emit('dismissed')
}

async function onActionClick (action: PopupActionOption) {
  const event = new MouseEvent('click')

  if (typeof action.onClick === 'function')
    await action.onClick(Object.assign(event, { close }))

  if (!event.defaultPrevented)
    close()
}
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
    @apply cursor-pointer text-muted hover:text-default;
    @apply dark:text-dark-muted dark:hover:text-dark-default;
  }

  .popup__body {
    @apply py-4 grow space-y-2 flex flex-col overflow-hidden justify-center;
  }

  .popup__title {
    @apply text-sm font-medium leading-[1.75] truncate;
  }

  .popup__text {
    @apply text-xs line-clamp-2;
  }

  .popup__actions {
    @apply space-x-2;
  }

  .popup__action {
    @apply text-xs truncate hover:underline;
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

    .popup__action {
      @apply text-info;
      @apply dark:text-dark-info;
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

      > svg {
        @apply h-[24.56px];
      }

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

    &:not(.popup--info),
    &:not(.popup--info) .popup__action {
      @apply text-state-emphasis;
      @apply dark:text-dark-state-emphasis;
    }

    &:not(.popup--info) .popup__close {
      @apply text-on-emphasis/70 hover:text-on-emphasis;
      @apply dark:text-dark-on-emphasis/70 dark:hover:text-dark-on-emphasis;
    }
  }
}

</style>
