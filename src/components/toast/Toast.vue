<template>
  <div
    data-testid="toast"
    class="toast"
    :class="toastClass"
    v-bind="toastAttrs">
    <div
      v-if="toastIcon"
      class="toast__icon"
      data-testid="toast-icon"
      :class="classIcon">
      <component
        :is="toastIcon" />
    </div>
    <div class="toast__body">
      <div
        v-p-md.inline="text || title"
        data-testid="toast-text"
        class="toast__text" />
    </div>
    <div
      v-if="loading"
      data-testid="toast-loading"
      class="toast__loading">
      <span
        v-p-md.inline="loadingText"
        data-testid="toast-loading-text" />
      <SpinnerRinggo
        v-if="loadingSpinner"
        data-testid="toast-loading-spinner" />
    </div>
    <div
      v-if="actions.length > 0"
      class="toast__actions">
      <template
        v-for="(action, i) in actions"
        :key="i">
        <p-button
          class="toast__action"
          data-testid="toast-action"
          v-bind="action.attrs"
          :size="action.size ?? 'xs'"
          :color="action.color"
          :variant="action.variant ?? 'ghost'"
          @click.prevent="onActionClick(action)">
          <span v-p-md.inline="action.text" />
        </p-button>
      </template>
    </div>
    <div
      v-if="dismissable"
      data-testid="toast-close"
      class="toast__close"
      @click="close">
      <IconClose />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  PropType,
  Component,
} from 'vue-demi'
import {
  computed,
  h,
} from 'vue-demi'
import SpinnerRinggo from '../spinner/SpinnerRinggo.vue'
import { vPMd } from '../markdown'
import pButton from '../button/Button.vue'
import IconClose from '@privyid/persona-icon/vue/close/16.vue'
import type { ColorVariant } from '../button'
import type { AdditionalAttr } from '../global/types'
import type { ToastActionOption } from '.'
import { useNotifyItem } from '../notify'

const props = defineProps({
  text: {
    type   : String,
    default: '',
  },
  /**
   * @deprecated use `text` instead
   */
  title: {
    type   : String,
    default: '',
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
  toastAttrs: {
    type   : Object as PropType<AdditionalAttr>,
    default: undefined,
  },
  toastClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  actions: {
    type   : Array as PropType<ToastActionOption[]>,
    default: () => ([]),
  },
  dismissable: {
    type   : Boolean,
    default: true,
  },
  loading: {
    type   : Boolean,
    default: false,
  },
  loadingText: {
    type   : String,
    default: '',
  },
  loadingSpinner: {
    type   : Boolean,
    default: true,
  },
})

const notify = useNotifyItem()
const emit   = defineEmits<{
  'dismissed': [],
}>()

const classIcon = computed(() => {
  const result: string[] = ['toast__icon--default']

  if (props.iconColor)
    result.push(`toast__icon--${props.iconColor}`)

  return result
})

const toastIcon = computed(() => {
  if (props.icon) {
    if (typeof props.icon === 'string') {
      return () => h('img', {
        'src'        : props.icon,
        'width'      : 16,
        'height'     : 16,
        'data-testid': 'toast-icon-image',
      })
    }

    return props.icon
  }
})

function close () {
  notify.close()

  emit('dismissed')
}

async function onActionClick (action: ToastActionOption) {
  const event = new MouseEvent('click')

  if (typeof action.onClick === 'function')
    await action.onClick(Object.assign(event, { close }))

  if (!event.defaultPrevented)
    close()
}
</script>

<style lang="postcss">
.toast {
  --p-toast-icon-color-primary: theme(textColor.brand.accent);
  --p-toast-icon-color-primary-dark: theme(textColor.dark.brand.accent);

  /**
  * global style
  * of toast
  */
  @apply flex items-center shadow-xl rounded w-72 md:w-96 overflow-hidden bg-inverse px-4 py-3 space-x-2;
  @apply dark:bg-dark-inverse;

  &__icon,
  &__close,
  &__action {
    @apply shrink-0;
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

  &__action {
    @apply px-2;

    &.btn {
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

  &__loading {
    @apply flex items-center space-x-3 text-sm text-muted;
    @apply dark:text-dark-muted;
  }

  &__close {
    @apply shrink-0 cursor-pointer text-muted/70 hover:text-muted;
    @apply dark:text-dark-muted/70 dark:hover:text-dark-muted;
  }

  &__body {
    @apply grow space-y-2 flex flex-col overflow-hidden;
  }

  &__text {
    @apply text-sm font-medium leading-[1.75] text-on-emphasis line-clamp-2;
    @apply dark:text-dark-on-emphasis;
  }
}

</style>
