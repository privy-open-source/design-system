<template>
  <transition
    name="fade"
    mode="out-in">
    <div
      v-show="model"
      class="modal"
      :class="classNames"
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
            <div
              data-testid="modal-body"
              :class="[ { 'modal__body--scroll' : modalBodyScrollable }, 'modal__body' ]">
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
  computed,
  defineComponent,
  nextTick,
  PropType,
  watch,
} from 'vue-demi'
import { onKeyStroke } from '@vueuse/core'
import Heading from '../heading/Heading.vue'
import IconClose from '@carbon/icons-vue/lib/close/16'
import { useVModel } from '../input'

export type SizeVariant = 'sm' | 'md' | 'lg' | 'xl'

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
    size: {
      type   : String as PropType<SizeVariant>,
      default: 'md',
    },
    noCloseOnEsc: {
      type   : Boolean,
      default: false,
    },
    banner: {
      type   : Boolean,
      default: false,
    },
    noCloseOnBackdrop: {
      type   : Boolean,
      default: false,
    },
    modalBodyScrollable: {
      type   : Boolean,
      default: false,
    },
    centered: {
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
    const model      = useVModel(props)
    const classNames = computed(() => {
      const result: string[] = ['']

      // eslint-disable-next-line unicorn/explicit-length-check
      if (props.size)
        result.push(`modal--${props.size}`)

      if (props.centered)
        result.push('modal--centered')

      if (props.banner)
        result.push('modal--banner')

      return result
    })

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
      classNames,
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
  * modal sizing variables
  */
  --p-modal-size-xl: 960px;
  --p-modal-size-lg: 800px;
  --p-modal-size-md: 600px;
  --p-modal-size-sm: 400px;
  --p-modal-z-index: theme(zIndex.modal);
  --p-modal-dismiss-z-index: calc(var(--p-modal-z-index) + 1);
  --p-modal-body-scrollable-max-height: theme(spacing.64);
  --p-modal-body-scrollable-min-height: 0;
  --p-modal-content-margin-y: theme(spacing.8);

  /**
  * Set modal backdrop
  */
  @apply z-[var(--p-modal-z-index)] w-full h-full overflow-y-auto fixed left-0 top-0 bg-inverse/30 text-default overscroll-contain;
  @apply dark:bg-dark-inverse/30 dark:text-dark-default;

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
  * Modal content are
  * in white
  */
  &__content {
    @apply my-8 bg-default rounded relative shadow-2xl max-w-[calc(100vw_-_theme('spacing.4'))];
    @apply dark:bg-dark-default;

    .modal__dismiss {
      @apply absolute top-6 right-6 mt-1.5 hover:cursor-pointer z-[var(--p-modal-dismiss-z-index)] text-default/30 hover:text-default/50;
      @apply dark:text-dark-default/30 hover:dark:text-dark-default/50;
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
    &&--scroll {
      @apply max-h-[var(--p-modal-body-scrollable-max-height)] min-h-[var(--p-modal-body-scrollable-min-height)] overflow-y-auto overscroll-contain;
    }

    + .modal__footer {
      @apply pt-6;
    }

    &:not(&--scroll) {
      + .modal__footer {
        @apply pt-0;
      }
    }
  }

  /**
  * Modal has 4 different size
  * eg: small, medium, large
  * and extra large. default
  * size are medium
  */
  &&--xl {
    .modal__content {
      @apply w-[var(--p-modal-size-xl)];
    }
  }

  &&--lg {
    .modal__content {
      @apply w-[var(--p-modal-size-lg)];
    }
  }

  &&--md {
    .modal__content {
      @apply w-[var(--p-modal-size-md)];
    }
  }

  &&--sm {
    .modal__content {
      @apply w-[var(--p-modal-size-sm)];
    }
  }

  /**
  * Modal vertically center
  * in the viewport
  */
  &&--centered {
    .modal__dialog {
      @apply flex items-center min-h-[calc(100%-4rem)] my-8;
    }
  }

}
</style>
