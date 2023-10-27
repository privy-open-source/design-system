<template>
  <div
    ref="target"
    class="sheet"
    data-testid="sheet"
    :class="classNames">
    <transition
      name="fade">
      <div
        v-show="model"
        data-testid="sheet-backdrop"
        class="sheet__backdrop"
        @click="closeOnBackdrop" />
    </transition>
    <transition
      :name="transition">
      <div
        v-if="model"
        ref="target"
        data-testid="sheet-content"
        class="sheet__content"
        v-bind="$attrs">
        <slot :close="close" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import {
  computed,
  nextTick,
  ref,
  watch,
} from 'vue-demi'
import { useVModel } from '../input'
import type { AddonPositionVariant } from '../pdf-object'
import type { SizeVariant } from '../modal'
import { onKeyStroke } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type   : Boolean,
    default: false,
  },
  position: {
    type   : String as PropType<AddonPositionVariant>,
    default: 'left',
  },
  size: {
    type   : String as PropType<SizeVariant>,
    default: 'sm',
  },
  noCloseOnBackdrop: {
    type   : Boolean,
    default: false,
  },
  noCloseOnEsc: {
    type   : Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'update:modelValue': [boolean],
  'close': [Event],
}>()

const target = ref<HTMLDivElement>()
const model  = useVModel(props)

const classNames = computed(() => {
  const result: string[] = []

  if (props.position)
    result.push(`sheet--${props.position}`)

  // eslint-disable-next-line unicorn/explicit-length-check
  if (props.size)
    result.push(`sheet--${props.size}`)

  return result
})

const transition = computed(() => {
  return `sheet--${props.position}`
})

function close (event: Event = new CustomEvent('close')): void {
  emit('close', event)

  if (!event.defaultPrevented)
    model.value = false
}

function closeOnBackdrop (event: Event): void {
  if (!props.noCloseOnBackdrop)
    close(event)
}

onKeyStroke('Escape', (event) => {
  if (model.value && !props.noCloseOnEsc)
    close(event)
}, { eventName: 'keydown' })

watch(model, (value) => {
  if (value === false) {
    nextTick(() => {
      emit('close', new CustomEvent('close'))
    })
  }
})
</script>

<style lang="postcss">
.sheet {
  --p-sheet-size-xl: 960px;
  --p-sheet-size-lg: 800px;
  --p-sheet-size-md: 600px;
  --p-sheet-size-sm: 300px;
  --p-sheet-min-size: 250px;
  --p-sheet-max-size: 90%;
  --p-sheet-z-index: theme(zIndex.modal);
  --p-sheet-dismiss-z-index: calc(var(--p-sheet-z-index) + 1);

  @apply fixed z-[var(--p-sheet-z-index)];

  &--sm {
    --p-sheet-size: var(--p-sheet-size-sm);
  }

  &--md {
    --p-sheet-size: var(--p-sheet-size-md);
  }

  &--lg {
    --p-sheet-size: var(--p-sheet-size-lg);
  }

  &--xl {
    --p-sheet-size: var(--p-sheet-size-xl);
  }

  &__content {
    @apply fixed bg-default overflow-auto text-default shadow-2xl;
    @apply dark:bg-dark-default dark:text-dark-default;
  }

  &__backdrop {
    @apply fixed inset-0 bg-inverse/30;
    @apply dark:bg-dark-inverse/30;
  }

  /* Base transition */
  &--left,
  &--right,
  &--top,
  &--bottom {
    &-enter-active,
    &-leave-active {
      @apply transition-[opacity,transform] duration-150 ease-out;
    }
  }

  /* Left */
  &--left {
    .sheet__content {
      @apply left-0 top-0 h-full;
    }

    &-enter-from,
    &-leave-to {
      @apply opacity-0 -translate-x-full;
    }
  }

  /* Right */
  &--right {
    .sheet__content {
      @apply right-0 top-0;
    }

    &-enter-from,
    &-leave-to {
      @apply opacity-0 translate-x-full;
    }
  }

  /* Top */
  &--top {
    .sheet__content {
      @apply right-0 top-0;
    }

    &-enter-from,
    &-leave-to {
      @apply opacity-0 -translate-y-full;
    }
  }

  /* Bottom */
  &--bottom {
    .sheet__content {
      @apply right-0 bottom-0 w-full;
    }

    &-enter-from,
    &-leave-to {
      @apply opacity-0 translate-y-full;
    }
  }

  /* Horizontal Size */
  &--left,
  &--right {
    .sheet__content {
      @apply h-full w-[var(--p-sheet-size)] min-w-[var(--p-sheet-min-size)] max-w-[var(--p-sheet-max-size)];
    }
  }

  /* Vertical Size */
  &--top,
  &--bottom {
    .sheet__content {
      @apply w-full h-[var(--p-sheet-size)] min-h-[var(--p-sheet-min-size)] max-h-[var(--p-sheet-max-size)];
    }
  }
}
</style>
