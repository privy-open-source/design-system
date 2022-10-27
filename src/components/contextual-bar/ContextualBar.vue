<template>
  <div
    v-show="model"
    ref="contextualbar"
    data-testid="contextual-bar"
    class="contextual-bar"
    :class="classNames">
    <div
      data-testid="contextual-bar-wrapper"
      :class="[{ 'contextual-bar__wrapper--with-message' : (message || $slots.message), 'contextual-bar__wrapper--with-action' : $slots.action } ,'contextual-bar__wrapper']">
      <span
        v-if="$slots.icon"
        data-testid="contextual-bar-icon"
        class="contextual-bar__icon">
        <slot name="icon" />
      </span>
      <div class="contextual-bar__content">
        <div
          v-if="title || $slots.title"
          data-testid="contextual-bar-title"
          class="contextual-bar__content__title">
          <slot name="title">
            <p-subheading v-if="message">
              {{ title }}
            </p-subheading>
            <template v-else>
              {{ title }}
            </template>
          </slot>
        </div>
        <div
          v-if="message || $slots.message"
          data-testid="contextual-bar-message"
          class="contextual-bar__content__message">
          <p-caption>
            <slot name="message">
              {{ message }}
            </slot>
          </p-caption>
        </div>
      </div>
      <div
        v-if="$slots.action"
        data-testid="contextual-bar-action"
        class="contextual-bar__action">
        <slot name="action" />
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
import { useVModel } from '../input'
import pCaption from '../caption/Caption.vue'
import pSubheading from '../subheading/Subheading.vue'
import IconClose from '@carbon/icons-vue/lib/close/20'
import {
  templateRef,
  until,
  useElementBounding,
} from '@vueuse/core'
import { StyleVariant } from '.'

export default defineComponent({
  components: {
    IconClose,
    pCaption,
    pSubheading,
  },
  props: {
    variant: {
      type   : String as PropType<StyleVariant>,
      default: 'light',
    },
    backgroundUrl: {
      type   : String,
      default: undefined,
    },
    dismissable: {
      type   : Boolean,
      default: true,
    },
    title: {
      type   : String,
      default: undefined,
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

      if (props.backgroundUrl)
        result.push('contextual-bar--background-image')

      return result
    })

    onMounted(() => {
      if (props.backgroundUrl)
        contextualbar.value?.style.setProperty('background-image', `url('${props.backgroundUrl}')`)

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

  &--background-image {
    @apply bg-no-repeat bg-cover bg-[top_center];
  }

  &__wrapper {
    @apply px-24 items-center flex mr-9;

    &--with-message {
      @apply items-start;
    }

    &--with-action {
      @apply items-center;

      &.contextual-bar__wrapper--with-message {
        .contextual-bar__icon {
          @apply self-start;
        }
      }
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

      &--with-action {
        .contextual-bar__content {
          @apply text-left;
        }
      }
    }

    .contextual-bar__action {
      @apply ml-0;
    }
  }

  &&--align-right {
    .contextual-bar__wrapper {
      @apply justify-end text-right;

      &--with-action {
        .contextual-bar__content {
          @apply text-left;
        }
        .contextual-bar__action {
          @apply ml-0;
        }
      }
    }
  }

  &&--align-center,
  &&--align-right {
    .contextual-bar__wrapper {
      &--with-action {
        @apply gap-3;

        .contextual-bar__icon {
          @apply mr-0;
        }
      }
    }

    .contextual-bar__content {
      @apply flex-grow-0;
    }
  }

  &__content {
    @apply flex-grow;

    &__title {
      @apply text-base;
    }
  }

  &__action {
    @apply flex flex-shrink-0 ml-auto gap-3;
  }

  &__icon {
    @apply relative mr-4 flex-shrink;

    img {
      @apply max-w-[20px] w-auto;
    }
  }

  &__close {
    @apply absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer text-black text-opacity-30 hover:text-opacity-50;
  }

  &&--dark {
    @apply bg-black text-white;

    .contextual-bar__close {
      @apply text-white text-opacity-40 hover:text-opacity-60;
    }
  }

  &&--light {
    @apply bg-background-100 text-body-100;

    .contextual-bar {
      &__icon {
        @apply text-primary-100;
      }
    }
  }
}
</style>
