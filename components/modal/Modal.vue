<template>
  <transition
    name="fade"
    mode="out-in">
    <div
      v-show="model"
      class="modal"
      data-testid="modal">
      <transition
        name="slide-up"
        mode="out-in">
        <div
          v-show="model"
          class="modal__dialog">
          <div class="modal__content">
            <div class="modal__header">
              <slot name="header">
                <Heading element="h6">
                  {{ title }}
                </Heading>
              </slot>
              <span
                v-if="dismissable"
                data-testid="modal-dismiss"
                class="modal__dismiss"
                @click="close">
                <IconClose />
              </span>
            </div>
            <div class="modal__body">
              <slot>
                {{ text }}
              </slot>
            </div>
            <div
              v-if="$slots.footer"
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
import Heading from '../heading/Heading.vue'
import IconClose from '@carbon/icons-vue/lib/close/16'
import { useVModel } from '../input/use-input'

export default defineComponent({
  components: { Heading, IconClose },
  props     : {
    title: {
      type    : String,
      required: true,
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
  },
  models: {
    prop : 'modelValue',
    event: 'update:modelValue',
  },
  emits: [
    'update:modelValue',
    'dismissed',
    'close',
  ],
  setup (props, { emit }) {
    const model = useVModel(props)

    function close (event: Event): void {
      emit('close', event)

      if (!event.defaultPrevented)
        model.value = false
    }

    watch(model, (value) => {
      if (value === false) {
        nextTick(() => {
          emit('dismissed')
        })
      }
    })

    return {
      close,
      model,
    }
  },
})
</script>

<style lang="postcss">
/**
* Component Name: Modal Dialog
* Component URI : https://www.figma.com/file/JIYmbyRYZHc9bnVp6Npm9K/B-A-S-E-%2F-Components?node-id=336%3A10366
* Date Created  : June 07, 2022
* Last Update   : June 09, 2022
*/
.modal {
  /**
  * Set modal backdrop
  */
  @apply w-full h-full fixed left-0 top-0 bg-black bg-opacity-30 z-[1060];

  &__dialog {
    @apply flex justify-center;
  }

  /**
  * Modal content are 500px width
  * in white
  */
  &__content {
    @apply w-[31.25rem] mt-8 bg-white rounded-md p-6;
  }

  /**
  * Modal header is a container
  * of title and dismiss button
  */
  &__header {
    @apply flex items-center justify-between;

    .modal__dismiss {
      @apply hover:cursor-pointer;
    }
  }

  &__body,
  &__footer {
    @apply mt-6;
  }
}
</style>
