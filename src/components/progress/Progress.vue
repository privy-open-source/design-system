<template>
  <div
    class="progress"
    data-testid="progress"
    :class="classNames">
    <div class="progress__items">
      <slot />
    </div>

    <div
      v-if="titleVariant === 'general'"
      data-testid="progress-title-general"
      class="progress__title">
      <template v-if="item.slots?.title">
        <component :is="item.slots.title" />
      </template>
      <template v-else>
        {{ item.title }}
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { findLast } from 'lodash-es'
import type {
  PropType,
  Slots,
  VNode,
} from 'vue-demi'
import { computed } from 'vue-demi'
import { findAllChildren, toBoolean } from '../utils/vnode'
import type { IconVariant, TitleVariant } from '.'

interface ProgressLabel {
  title: string,
  slots: Slots,
}

const props = defineProps({
  variant: {
    type   : String as PropType<IconVariant>,
    default: 'dot',
  },
  titleVariant: {
    type   : String as PropType<TitleVariant>,
    default: 'specific',
  },
  vertical: {
    type   : Boolean,
    default: false,
  },
})

const slots = defineSlots<{
  'title'(): VNode[],
  'default'(): VNode[],
}>()

const classNames = computed(() => {
  const result: string[] = []

  if (props.variant)
    result.push(`progress--${props.variant}`)

  if (props.titleVariant)
    result.push(`progress--${props.titleVariant}`)

  if (props.vertical)
    result.push('progress--vertical')
  else
    result.push('progress--horizontal')

  return result
})

const item = computed<ProgressLabel>(() => {
  const vnodes     = findAllChildren(slots.default(), 'ProgressItem')
  const activeNode = findLast(vnodes, (vnode) => {
    return toBoolean(vnode.props?.active)
  })

  return {
    title: activeNode?.props?.title ?? '',
    slots: activeNode?.children as Slots ?? {},
  }
})
</script>

<style lang="postcss">
.progress {
  --p-bg-bar-active-state: theme(backgroundColor.info.emphasis);
  --p-bg-bar-normal-state: theme(backgroundColor.subtle.DEFAULT);
  --p-bg-dark-bar-active-state: theme(backgroundColor.dark.info.emphasis);
  --p-bg-dark-bar-normal-state: theme(backgroundColor.dark.subtle.DEFAULT);

  &__items {
    @apply flex overflow-hidden;
  }

  &__item {
    @apply flex-1 flex justify-center relative;

    &:first-child .progress__bar {
      @apply hidden;
    }
  }

  &__content {
    @apply flex flex-col space-y-2;
  }

  &__point {
    @apply w-7 h-7 rounded-full bg-subtle flex items-center justify-center text-default;
    @apply dark:bg-dark-subtle dark:text-dark-default;
  }

  &__bar {
    @apply absolute rounded-full transition-[background-position] ease-linear duration-150;
    @apply from-[var(--p-bg-bar-active-state)_50%] to-[var(--p-bg-bar-normal-state)_50%];
    @apply dark:from-[var(--p-bg-dark-bar-active-state)_50%] dark:to-[var(--p-bg-dark-bar-normal-state)_50%];
  }

  &__title {
    @apply truncate text-sm text-center w-full text-default;
    @apply dark:text-dark-default;
  }

  & > .progress__title {
    @apply pt-2;
  }

  &--active {
    .progress__point {
      @apply bg-info-emphasis text-state-emphasis;
      @apply dark:bg-dark-info-emphasis dark:text-dark-state-emphasis;
    }
  }

  &--horizontal {
    @apply w-full;

    .progress__items {
      @apply flex-row;
    }

    .progress__content {
      @apply justify-start items-center;
    }

    .progress__bar {
      @apply w-[calc(100%_-_3rem)] h-1 top-5 right-[calc(50%_+_1.5rem)] bg-gradient-to-r bg-[length:210%_100%] bg-right;
    }

    .progress--active + .progress--active {
      .progress__bar {
        @apply bg-left;
      }
    }
  }

  &--vertical {
    @apply h-full;

    > .progress__title {
      @apply hidden;
    }

    .progress__items {
      @apply flex-col items-center justify-between h-full space-y-2;
    }

    .progress__content {
      @apply justify-center items-center;
    }

    .progress__bar {
      @apply h-[calc(100%_-_4.25rem)] w-1 bottom-[calc(50%_+_2.25rem)] left-1/2 -translate-x-1/2 bg-gradient-to-b bg-bottom bg-[length:100%_210%];
    }

    .progress--active + .progress--active {
      .progress__bar {
        @apply bg-top;
      }
    }
  }

  &--dot {
    .progress__point-item {
      @apply w-3 h-3 rounded-full bg-default;
      @apply dark:bg-dark-default;
    }
  }

  &--counter {
    counter-reset: progress;

    .progress__point {
      counter-increment: progress;

      &-item::before {
        content: counter(progress);

        @apply text-sm font-medium;
      }
    }
  }

  &--specific {
    > .progress__title {
      @apply hidden;
    }
  }

  &--general {
    .progress__content > .progress__title {
      @apply hidden;
    }
  }
}
</style>
