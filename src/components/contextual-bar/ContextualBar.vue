<template>
  <transition
    name="fade"
    appear
    @enter="onEnter"
    @after-leave="onLeave">
    <div
      v-show="model"
      ref="contextualbar"
      data-testid="contextual-bar"
      class="contextual-bar"
      v-bind="$attrs"
      :class="classNames"
      :style="styleBg">
      <div
        data-testid="contextual-bar-wrapper"
        class="contextual-bar__wrapper"
        :class="{
          'contextual-bar__wrapper--with-message': (message || $slots.message),
          'contextual-bar__wrapper--with-action': $slots.action
        }">
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
  </transition>
</template>

<script lang="ts" setup>
import type {
  PropType,
  StyleValue,
  VNode,
} from 'vue-demi'
import {
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue-demi'
import type { AlignVariant } from '../nav'
import { useVModel } from '../input'
import pCaption from '../caption/Caption.vue'
import pSubheading from '../subheading/Subheading.vue'
import IconClose from '@privyid/persona-icon/vue/close/16.vue'
import type { StyleVariant } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  state: {
    type   : String as PropType<StyleVariant>,
    default: 'info',
  },
  backgroundUrl: {
    type   : String,
    default: undefined,
  },
  backgroundDarkUrl: {
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
  fixed: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'update:modelValue': [boolean],
  'close': [Event],
  'show': [],
  'hide': [],
}>()

const model = useVModel(props)

function close (event: Event) : void {
  emit('close', event)

  if (!event.defaultPrevented)
    model.value = false
}

const isFixed = computed(() => {
  return props.fixed
})

const classNames = computed(() => {
  const result: string[] = ['']

  if (props.state)
    result.push(`contextual-bar--${props.state}`)

  if (props.align)
    result.push(`contextual-bar--align-${props.align}`)

  if (props.backgroundUrl)
    result.push('contextual-bar--background-image')

  if (props.fixed)
    result.push('contextual-bar--fixed')

  return result
})

const styleBg = computed<StyleValue>(() => {
  const result: StyleValue = {}

  if (props.backgroundUrl) {
    result['--p-contextual-bar-bg-image']      = `url("${props.backgroundUrl}")`
    result['--p-contextual-bar-bg-dark-image'] = props.backgroundDarkUrl
      ? `url("${props.backgroundDarkUrl}")`
      : `url("${props.backgroundUrl}")`
  }

  return result
})

function onEnter (target: HTMLDivElement) {
  document.body.classList.add('contextual-bar__body--active')

  if (isFixed.value) {
    document.body.style.setProperty('margin-top', `${target.clientHeight}px`)
    document.body.style.setProperty('--p-contextual-bar-height', `${target.clientHeight}px`)
    document.body.classList.add('contextual-bar__body--fixed-active')
  }

  emit('show')
}

function onLeave () {
  document.body.classList.remove('contextual-bar__body--active')

  if (isFixed.value) {
    document.body.style.removeProperty('margin-top')
    document.body.style.removeProperty('--p-contextual-bar-height')
    document.body.classList.remove('contextual-bar__body--fixed-active')
  }

  emit('hide')
}

onMounted(() => {
  document.body.classList.add('contextual-bar__body')
})

onBeforeUnmount(() => {
  document.body.classList.remove('contextual-bar__body')

  if (model.value)
    onLeave()
})

defineSlots<{
  'icon'(): VNode[],
  'title'(): VNode[],
  'message'(): VNode[],
  'action'(): VNode[],
}>()
</script>

<style lang="postcss">
.contextual-bar {
  --p-contextual-bar-bg-image: none;
  --p-contextual-bar-bg-dark-image: none;
  --p-contextual-bar-fixed-top: theme(spacing.0);

  @apply p-6 w-full max-w-[100vw] transition-all;

  &:not(&--fixed) {
    @apply relative;
  }

  &__body {
    @apply transition-all;

    &--active {
      @apply transition-all;

      &:not(&-hide) {
        .navbar--fixed {
          @apply mt-[var(--p-contextual-bar-height)] transition-all;
        }

        .sidebar--fixed {
          @apply mt-[var(--p-contextual-bar-height)] transition-all;
        }
      }
    }

    &--fixed-active {
      .navbar--fixed {
        @apply mt-[var(--p-contextual-bar-height)] transition-all;
      }

      .sidebar--fixed {
        @apply mt-[var(--p-contextual-bar-height)] transition-all;
      }
    }
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

  /**
  * Custom background image
  * are available
  */
  &--background-image {
    @apply bg-no-repeat bg-cover bg-[top_center] bg-[image:var(--p-contextual-bar-bg-image)];
    @apply dark:bg-[image:var(--p-contextual-bar-bg-dark-image)]
  }

  /**
  * Contextualbar alignment:
  * left, center and right
  */
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
        @apply space-gap-3;

        .contextual-bar__icon {
          @apply mr-0;
        }
      }
    }

    .contextual-bar__content {
      @apply grow-0;
    }
  }

  /**
  * Contextualbar body
  * content
  */
  &__content {
    @apply grow;

    &__message {
      .caption {
        @apply text-subtle;
        @apply dark:text-dark-subtle;
      }
    }

    &__title {
      @apply text-base;
    }
  }

  &__action {
    @apply flex shrink-0 ml-auto space-gap-3;
  }

  &__icon {
    @apply relative mr-4 shrink;

    img {
      @apply max-w-[20px] w-auto;
    }
  }

  /**
  * Dismiss button of
  * contextualbar
  */
  &__close {
    @apply absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer text-default/30 hover:text-default/50;
  }

  /**
  * Dismiss button stay
  * in light mode when
  * has background-image
  */
  &:not(&--background-image) {
    .contextual-bar__close {
      @apply dark:text-dark-default/30 hover:dark:text-dark-default/50;
    }
  }

  /**
  * Contextualbar has 4 state
  * variant: error, warning, info
  * and neutral
  */
  &&--info {
    @apply bg-base text-default;
    @apply dark:bg-dark-base dark:text-dark-default;

    .contextual-bar {
      &__icon {
        @apply text-info;
        @apply dark:text-dark-info;
      }
    }
  }

  &&--error,
  &&--warning,
  &&--neutral {
    @apply text-state-emphasis;
    @apply dark:text-dark-state-emphasis;
  }

  &&--error {
    @apply bg-danger-emphasis;
    @apply dark:bg-dark-danger-emphasis;

    .contextual-bar__close {
      @apply text-danger hover:text-danger/50;
      @apply dark:text-dark-danger dark:hover:text-dark-danger/50;
    }
  }

  &&--warning {
    @apply bg-warning-emphasis;
    @apply dark:bg-dark-warning-emphasis;

    .contextual-bar__close {
      @apply text-warning hover:text-warning/50;
      @apply dark:text-dark-warning;
    }
  }

  &&--neutral {
    @apply bg-inverse text-on-emphasis;
    @apply dark:bg-dark-inverse dark:text-dark-on-emphasis;

    .contextual-bar__close {
      @apply text-on-emphasis/30 hover:text-on-emphasis/50;
      @apply dark:text-dark-on-emphasis/30 hover:dark:text-dark-on-emphasis/50;
    }
  }

  /**
  * Contextualbar with
  * fixed-top position
   */
   &&--fixed {
    @apply fixed z-50 top-[var(--p-contextual-bar-fixed-top)] left-0;
   }
}
</style>
