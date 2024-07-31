<template>
  <transition
    name="fade"
    mode="out-in"
    :css="!noAnimation"
    @after-enter="$emit('show')"
    @after-leave="$emit('hide')">
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
          class="modal__dialog"
          :class="dialogClass"
          data-testid="modal-dialog">
          <span
            v-if="dismissable && (size === 'full' && freeDistraction)"
            data-testid="modal-free-distraction-dismiss"
            class="modal__dismiss"
            @click="close">
            <IconCloseFull class="text-state-emphasis dark:text-dark-state-emphasis" />
          </span>
          <div
            class="modal__content"
            :class="contentClass"
            data-testid="modal-content"
            @click.stop>
            <span
              v-if="dismissable && size !== 'full'"
              data-testid="modal-dismiss"
              class="modal__dismiss"
              @click="close">
              <IconClose />
            </span>
            <div
              v-if="($slots.header || title) && (size !== 'full' || freeDistraction)"
              data-testid="modal-header"
              class="modal__header"
              :class="headerClass">
              <slot
                name="header"
                :close="close">
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
              class="modal__body"
              :class="[
                { 'modal__body--scroll': modalBodyScrollable },
                (size !== 'full' || freeDistraction) ? bodyClass : '',
              ]">
              <div
                v-if="size === 'full' && !freeDistraction"
                class="modal--full__content">
                <div
                  class="modal--full__header">
                  <span
                    v-if="dismissable"
                    class="modal--full__header__dismiss">
                    <Button
                      variant="link"
                      data-testid="modal-full-dismiss"
                      @click="close">
                      <IconCloseFull />
                    </Button>
                  </span>
                  <div
                    data-testid="modal-full-header"
                    class="modal--full__header__title"
                    :class="headerClass">
                    <slot
                      name="header"
                      :close="close">
                      <Heading
                        v-if="title"
                        class="modal__title"
                        element="h6">
                        {{ title }}
                      </Heading>
                    </slot>
                  </div>
                </div><!-- /header -->
                <div :class="bodyClass">
                  <slot
                    name="body"
                    :close="close">
                    {{ text }}
                  </slot>
                </div><!-- /body -->
              </div><!-- /content -->
              <slot
                v-else
                :close="close">
                {{ text }}
              </slot>
            </div>
            <div
              v-if="$slots.footer && (size !== 'full' || freeDistraction)"
              data-testid="modal-footer"
              class="modal__footer"
              :class="footerClass">
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

<script lang="ts" setup>
import type { PropType, VNode } from 'vue-demi'
import {
  computed,
  nextTick,
  watch,
} from 'vue-demi'
import { onKeyStroke } from '@vueuse/core'
import Heading from '../heading/Heading.vue'
import Button from '../button/Button.vue'
import IconClose from '@privyid/persona-icon/vue/close/16.vue'
import IconCloseFull from '@privyid/persona-icon/vue/close/24.vue'
import { useVModel } from '../input'
import type { SizeVariant } from '.'

const props = defineProps({
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
  freeDistraction: {
    type   : Boolean,
    default: false,
  },
  headerClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  dialogClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  contentClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  bodyClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  footerClass: {
    type: [
      String,
      Array,
      Object,
    ],
    default: undefined,
  },
  noAnimation: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'update:modelValue': [boolean],
  'show': [],
  'hide': [],
  'close': [Event],
}>()

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

  if (props.freeDistraction && props.size === 'full')
    result.push('modal--free-distraction')

  return result
})

function close (): void {
  const event = new CustomEvent('close')

  emit('close', event)

  if (!event.defaultPrevented)
    model.value = false
}

function closeOnBackdrop (): void {
  if (!props.noCloseOnBackdrop)
    close()
}

onKeyStroke('Escape', () => {
  if (!props.noCloseOnEsc && model.value)
    close()
}, { eventName: 'keydown' })

watch(model, (value) => {
  if (value === false) {
    nextTick(() => {
      emit('close', new CustomEvent('close'))
    })
  }
})

interface SlotScope {
  close (): void,
}

defineSlots<{
  'header'(props: SlotScope): VNode[],
  'body'(props: SlotScope): VNode[],
  'footer'(props: SlotScope): VNode[],
  'default'(props: SlotScope): VNode[],
}>()
</script>

<style lang="postcss">
/**
* Component Name: Modal
* Component URI : https://www.figma.com/file/JIYmbyRYZHc9bnVp6Npm9K/B-A-S-E-%2F-Components?node-id=336%3A10366
* Date Created  : June 07, 2022
* Last Update   : July 11, 2024
*/
.modal {
  /**
  * modal sizing variables
  */
  --p-modal-size-full: 1022px;
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
    @apply my-8 bg-default rounded relative shadow-2xl max-w-[calc(100vw_-_theme('spacing.4'))] w-[var(--p-modal-size)];
    @apply dark:bg-dark-default;

    .modal__dismiss {
      @apply absolute top-6 right-6 mt-1.5 hover:cursor-pointer z-[var(--p-modal-dismiss-z-index)] text-default/30 hover:text-default/50;
    }
  }

  /**
  * Modal dismiss stay in
  * light mode when
  * modal variant is banner
  */
  &:not(&--banner) {
    .modal__content {
      .modal__dismiss {
        @apply dark:text-dark-default/30 hover:dark:text-dark-default/50;
      }
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

  /**
  * Set padding
  * in body and footer
  * of modal
  */
  &__body,
  &__footer {
    @apply p-6;
  }

  /**
  * Modal variant
  * Scroll
  */
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
  * Modal has 5 different size
  * eg: small, medium, large,
  * extra large and full. default
  * size are medium
  */
  &&--xl {
    .modal__content {
      --p-modal-size: var(--p-modal-size-xl);
    }
  }

  &&--lg {
    .modal__content {
      --p-modal-size: var(--p-modal-size-lg);
    }
  }

  &&--md {
    .modal__content {
      --p-modal-size: var(--p-modal-size-md);
    }
  }

  &&--sm {
    .modal__content {
      --p-modal-size: var(--p-modal-size-sm);
    }
  }

  /**
  * Modal has 2 types of
  * full size, eg: full and
  * free-distraction
  */
  &&--full {
    /**
    * Style of Modal full
    * except free distraction type
    */
    &:not(.modal--free-distraction) {
      /**
      * Make modal dialog and
      * modal content full height
      */
      .modal__dialog {
        @apply h-full min-h-full;
      }
      .modal__content {
        @apply w-full max-w-full my-0 rounded-none;
      }

      /**
      * Reset modal body
      */
      .modal__body {
        @apply p-0 h-full;
      }

      /**
      * Custom modal content
      * in full size
      */
      .modal--full__content {
        @apply flex flex-col justify-items-stretch h-full;
      }

      /**
      * Custom modal header
      * in full size
      */
      .modal--full__header {
        @apply flex h-[60px] border-b border-b-default shrink-0;
        @apply dark:border-b-dark-default;

        &__dismiss {
          @apply flex items-center border-r shrink-0 border-r-default bg-default;
          @apply dark:border-r-dark-default dark:bg-dark-default;
        }

        &__title {
          @apply flex grow items-stretch;

          .modal__title {
            @apply items-center flex;
          }
        }

        &__content {
          @apply grow flex items-stretch;
        }

        &__navigation {
          @apply shrink-0 flex items-center border-l border-l-default px-3 space-x-1 bg-default;
          @apply dark:border-l-dark-default dark:bg-dark-default;
        }
      }
    }

    /**
    * Styling modal full
    * with free distraction type
    */
    &:is(.modal--free-distraction) {
      @apply bg-inverse/80;
      @apply dark:bg-dark-inverse/80;

      .modal__content {
        --p-modal-size: var(--p-modal-size-full);
      }

      .modal__dismiss {
        @apply absolute right-5 top-5 p-[10px] rounded bg-default-alpha cursor-pointer;
        @apply dark:bg-dark-default-alpha;
      }

      .modal__title {
        @apply pr-0;
      }
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
