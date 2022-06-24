<template>
  <transition
    name="fade"
    mode="out-in">
    <div
      v-show="model"
      class="modal"
      data-testid="modal"
      @click="closeOnBackdrop">
      <transition
        name="slide-up"
        mode="out-in">
        <div
          v-show="model"
          class="modal__dialog">
          <div
            class="modal__content"
            @click.stop>
            <span
              v-if="dismissable"
              data-testid="modal-dismiss"
              class="modal__dismiss"
              @click="close">
              <IconClose />
            </span>
            <div
              v-if="$slots.header || title"
              data-testid="modal-header"
              class="modal__header">
              <slot name="header">
                <Heading
                  v-if="title"
                  class="modal__title"
                  element="h6">
                  {{ title }}
                </Heading>
              </slot>
            </div>
            <div class="modal__body">
              <slot>
                {{ text }}
              </slot>
            </div>
            <div
              v-if="$slots.footer"
              data-testid="modal-footer"
              class="modal__footer">
              <slot
                name="footer"
                :close="close" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  watch,
} from 'vue-demi'
import { onKeyStroke } from '@vueuse/core'
import Heading from '../heading/Heading.vue'
import IconClose from '@carbon/icons-vue/lib/close/16'
import { useVModel } from '../input/use-input'

export default defineComponent({
  components: { Heading, IconClose },
  props     : {
    title: {
      type   : String,
      default: undefined,
    },
    text: {
      type   : String,
      default: undefined,
    },
    modelValue: {
      type   : Boolean,
      default: false,
    },
    dismissable: {
      type   : Boolean,
      default: true,
    },
    noCloseOnEsc: {
      type   : Boolean,
      default: false,
    },
    noCloseOnBackdrop: {
      type   : Boolean,
      default: false,
    },
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: ['update:modelValue', 'close'],
  setup (props, { emit }) {
    const model = useVModel(props)

    function close (event: Event): void {
      emit('close', event)

      if (!event.defaultPrevented)
        model.value = false
    }

    function closeOnBackdrop (event: Event): void {
      if (!props.noCloseOnBackdrop)
        close(event)
    }

    onKeyStroke('Escape', (event) => {
      if (!props.noCloseOnEsc)
        close(event)
    }, { eventName: 'keydown' })

    watch(model, (value) => {
      if (value === false) {
        nextTick(() => {
          emit('close')
        })
      }
    })

    return {
      model,
      closeOnBackdrop,
      close,
    }
  },
})
</script>

<style lang="postcss">
/**
* Component Name: Modal
* Component URI : https://www.figma.com/file/JIYmbyRYZHc9bnVp6Npm9K/B-A-S-E-%2F-Components?node-id=336%3A10366
* Date Created  : June 07, 2022
* Last Update   : June 24, 2022
*/
.modal {
  /**
  * Set modal backdrop
  */
  @apply w-full h-full overflow-y-auto fixed left-0 top-0 bg-black bg-opacity-30 z-[1060];

  &--banner {
    .modal {
      &__content {
        @apply overflow-hidden;
      }

      &__body {
        @apply p-0;
      }
    }
  }

  &__dialog {
    @apply flex justify-center;
  }

  /**
  * Modal content are 500px width
  * in white
  */
  &__content {
    @apply w-[31.25rem] my-8 bg-white rounded-md relative;

    .modal__dismiss {
      @apply absolute top-6 right-6 mt-1.5 hover:cursor-pointer z-[1061] text-black text-opacity-30;
    }
  }

  /**
  * Modal header is a container
  * of title and dismiss button
  */
  &__header {
    @apply flex items-start p-6;

    .modal__title {
      @apply grow pr-6;
    }

    + .modal__body {
      @apply pt-0;
    }
  }

  &__body,
  &__footer {
    @apply p-6;
  }

  &__body {
    + .modal__footer {
      @apply pt-0;
    }
  }
}
</style>
