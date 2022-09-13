<template>
  <div
    v-show="model"
    ref="contextualbar"
    data-testid="contextual-bar"
    class="contextual-bar"
    :class="classNames">
    <div class="contextual-bar__wrapper">
      <span
        v-if="!message"
        class="contextual-bar__icon"
        data-testid="contextual-bar-icon"><IconInfo /></span>
      <div
        class="contextual-bar__content"
        data-testid="contextual-bar-content"
        :class="{ 'contextual-bar__content--icon' : message }">
        <template v-if="message">
          {{ message }}
        </template>
        <slot />
      </div>
    </div>
    <div
      v-if="dismissable"
      data-testid="contextual-bar-close"
      class="contextual-bar__close"
      @click="close">
      <IconClose />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  onMounted,
  watch,
} from 'vue-demi'
import { AlignVariant } from '../nav/Nav.vue'
import { useVModel } from '../input/use-input'
import IconInfo from '@carbon/icons-vue/lib/information--filled/20'
import IconClose from '@carbon/icons-vue/lib/close/20'
import {
  templateRef,
  until,
  useElementBounding,
} from '@vueuse/core'

type StyleVariant = 'neutral' | 'info' | 'error' | 'warning'

export default defineComponent({
  components: { IconInfo, IconClose },
  props     : {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'info',
    },
    dismissable: {
      type   : Boolean,
      default: true,
    },
    message: {
      type   : String,
      default: undefined,
    },
    align: {
      type   : String as PropType<AlignVariant>,
      default: 'left',
    },
    modelValue: {
      type   : Boolean,
      default: true,
    },
  },

  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue', 'close'],

  setup (props, { emit }) {
    const model         = useVModel(props)
    const contextualbar = templateRef<HTMLDivElement>('contextualbar')
    const { height }    = useElementBounding(contextualbar)

    async function show () {
      await until(height).changed()

      document.body?.style.setProperty('transform', `translateY(${height.value}px)`)
      document.body?.style.setProperty('transition', 'transform 0.15s ease-in-out')
      contextualbar.value?.style.setProperty('transform', `translateY(-${height.value}px)`)
      contextualbar.value?.style.setProperty('transition', 'transform 0.15s ease-in-out')
    }

    async function hide () {
      contextualbar.value?.style.setProperty('transform', 'translateY(-0px)')
      contextualbar.value?.style.setProperty('transition', 'transform 0.15s ease-in-out')
      document.body?.style.removeProperty('transform')
    }

    function close (event: Event) : void {
      emit('close', event)

      if (!event.defaultPrevented)
        model.value = false
    }

    const classNames = computed(() => {
      const result: string[] = ['']

      if (props.variant)
        result.push(`contextual-bar--${props.variant}`)

      if (props.align)
        result.push(`contextual-bar--align-${props.align}`)

      return result
    })

    onMounted(() => {
      if (model.value)
        show()
      else
        hide()
    })

    watch(model, (value) => {
      if (value)
        show()
      else
        hide()
    })

    return {
      model,
      classNames,
      close,
    }
  },
})
</script>

<style lang="postcss">
.contextual-bar {
  @apply fixed z-[1030] top-0 left-0 p-6 w-full;

  &__wrapper {
    @apply px-24 items-start flex mr-9;

    .btn {
      @apply ml-4;
    }
  }

  &&--align-left {
    .contextual-bar__wrapper {
      @apply justify-start text-left;
    }
  }

  &&--align-center {
    .contextual-bar__wrapper {
      @apply justify-center text-center;
    }
  }

  &&--align-right {
    .contextual-bar__wrapper {
      @apply justify-end text-right;
    }
  }

  &&--align-center,
  &&--align-right {
    .contextual-bar__content {
      @apply flex-grow-0;
    }
  }

  &__content {
    @apply flex-grow;

    &&--icon {
      background-image: url('data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"%3e%3cpath fill-rule="evenodd" clip-rule="evenodd" d="M11 0.5C5.20101 0.5 0.5 5.20101 0.5 11C0.5 16.799 5.20101 21.5 11 21.5C16.799 21.5 21.5 16.799 21.5 11C21.5 8.21523 20.3938 5.54451 18.4246 3.57538C16.4555 1.60625 13.7848 0.5 11 0.5ZM11 4.25C11.6213 4.25 12.125 4.75368 12.125 5.375C12.125 5.99632 11.6213 6.5 11 6.5C10.3787 6.5 9.875 5.99632 9.875 5.375C9.875 4.75368 10.3787 4.25 11 4.25V4.25ZM14 17.09H8V15.41H10.16V10.34H8.75V8.66H11.8475V15.41H14V17.09Z" fill="%23ffffff"/%3e%3c/svg%3e');
      @apply pl-9 bg-no-repeat bg-[left_center] bg-[length:19px_19px];
    }
  }

  &__icon {
    @apply relative mr-4 flex-shrink;
  }

  &__close {
    @apply absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer text-black text-opacity-30 hover:text-opacity-50;
  }

  &&--neutral,
  &&--error,
  &&--warning {
    @apply text-white;
  }

  &&--neutral {
    @apply bg-black;

    .contextual-bar__close {
      @apply text-white text-opacity-40 hover:text-opacity-60;
    }
  }

  &&--info {
    @apply bg-background-100 text-body-100;

    .contextual-bar {
      &__icon {
        @apply text-primary-100;
      }

      &__content {
        &--icon {
          background-image: url('data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"%3e%3cpath fill-rule="evenodd" clip-rule="evenodd" d="M11 0.5C5.20101 0.5 0.5 5.20101 0.5 11C0.5 16.799 5.20101 21.5 11 21.5C16.799 21.5 21.5 16.799 21.5 11C21.5 8.21523 20.3938 5.54451 18.4246 3.57538C16.4555 1.60625 13.7848 0.5 11 0.5ZM11 4.25C11.6213 4.25 12.125 4.75368 12.125 5.375C12.125 5.99632 11.6213 6.5 11 6.5C10.3787 6.5 9.875 5.99632 9.875 5.375C9.875 4.75368 10.3787 4.25 11 4.25V4.25ZM14 17.09H8V15.41H10.16V10.34H8.75V8.66H11.8475V15.41H14V17.09Z" fill="%230065D1"/%3e%3c/svg%3e');
        }
      }
    }
  }

  &&--error {
    @apply bg-danger-100;
  }

  &&--warning {
    @apply bg-warning-100;
  }
}
</style>
