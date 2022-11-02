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

<script lang="ts">
import { findLast } from 'lodash-es'
import {
  defineComponent,
  computed,
  PropType,
  Slots,
} from 'vue-demi'
import { findAllChildren, toBoolean } from '../utils/vnode'

export type IconVariant = 'dot' | 'counter'

export type TitleVariant = 'specific' | 'general'

interface ProgressLabel {
  title: string,
  slots: Slots,
}

export default defineComponent({
  props: {
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
  },
  setup (props, { slots }) {
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

    return {
      classNames,
      item,
    }
  },
})
</script>

<style lang="postcss">
.progress {
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
    @apply w-7 h-7 rounded-full bg-secondary-25 flex items-center justify-center;
  }

  &__bar {
    @apply absolute rounded-tn transition-[background-position] ease-linear duration-150;
    @apply from-[theme(colors.primary.100)_50%] to-[theme(colors.secondary.25)_50%];
  }

  &__title {
    @apply truncate text-sm text-center w-full;
  }

  & > .progress__title {
    @apply pt-2;
  }

  &--active {
    .progress__point {
      @apply bg-primary-100 text-white;
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
      @apply w-[calc(100%_-_3rem)] h-1 top-5 right-[calc(50%_+_1.5rem)];
      @apply bg-gradient-to-r bg-[length:210%_100%] bg-right;
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
      @apply h-[calc(100%_-_4.25rem)] w-1 bottom-[calc(50%_+_2.25rem)] left-1/2 -translate-x-1/2;
      @apply bg-gradient-to-b bg-bottom bg-[length:100%_210%];
    }

    .progress--active + .progress--active {
      .progress__bar {
        @apply bg-top;
      }
    }
  }

  &--dot {
    .progress__point-item {
      @apply w-3 h-3 rounded-full bg-white;
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
