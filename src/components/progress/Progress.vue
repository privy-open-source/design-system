<template>
  <div
    class="progress"
    :class="classNames">
    <div class="progress__items">
      <ProgressItems :active="current">
        <slot />
      </ProgressItems>
    </div>

    <div
      class="progress__label">
      <template v-if="label.slots && label.slots.label">
        <component :is="label.slots.label" />
      </template>
      <template v-else>
        {{ label.label }}
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType,
  Slots,
} from 'vue-demi'
import { findAllChildren } from '../utils/vnode'
import ProgressItems from './ProgressItems.vue'

export type IconVariant = 'dot' | 'counter'

export type LabelVariant = 'specific' | 'general'

interface ProgressLabel {
  label: string,
  slots : Slots,
}

export default defineComponent({
  components: { ProgressItems },
  props     : {
    active: {
      type   : [Number, String],
      default: 1,
    },
    variant: {
      type   : String as PropType<IconVariant>,
      default: 'dot',
    },
    labelVariant: {
      type   : String as PropType<LabelVariant>,
      default: 'specific',
    },
    vertical: {
      type   : Boolean,
      default: false,
    },
  },
  setup (props, { slots }) {
    const current = computed(() => {
      return (Number.parseInt(`${props.active}`) || 0) - 1
    })

    const classNames = computed(() => {
      const result: string[] = []

      if (props.variant)
        result.push(`progress--${props.variant}`)

      if (props.labelVariant)
        result.push(`progress--${props.labelVariant}`)

      if (props.vertical)
        result.push('progress--vertical')
      else
        result.push('progress--horizontal')

      return result
    })

    const labels = computed<ProgressLabel[]>(() => {
      const vnodes = findAllChildren(slots.default(), 'ProgressItem')

      return vnodes.map((item) => {
        return {
          label: item.props?.label ?? '',
          slots: (item.children as Slots),
        }
      })
    })

    const label = computed<ProgressLabel>(() => {
      return labels.value.at(current.value)
    })

    return {
      current,
      classNames,
      label,
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
    @apply flex flex-col gap-2;
  }

  &__point {
    @apply w-7 h-7 rounded-full bg-secondary-25 flex items-center justify-center;
  }

  &__bar {
    @apply bg-secondary-25 absolute rounded-full;
  }

  &__label {
    @apply truncate text-sm text-center w-full;
  }

  & > .progress__label {
    @apply pt-2;
  }

  &--active {
    .progress__point,
    .progress__bar {
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
      @apply w-[calc(100%_-_3rem)] h-1 top-3 right-[calc(50%_+_1.5rem)];
    }

    /**
    * (experimental) arrow divider
    */
    &.progress--arrow {
      .progress__bar {
        @apply w-0 h-0 border-l-[6px] border-y-[6px] border-y-transparent border-l-secondary-25 top-3 -left-0 bg-transparent rounded-none -translate-y-1/2;
      }

      .progress--active {
        .progress__bar {
          @apply border-l-primary-100;
        }
      }
    }
  }

  &--vertical {
    @apply h-full;

    > .progress__label {
      @apply hidden;
    }

    .progress__items {
      @apply flex-col items-center justify-between h-full;
    }

    .progress__content {
      @apply justify-center items-center;
    }

    .progress__bar {
      @apply h-[calc(100%_-_4.25rem)] w-1 bottom-[calc(50%_+_2.25rem)] left-1/2 -translate-x-1/2;
    }
  }

  &--dot {
    .progress__point-item {
      @apply w-3 h-3 rounded-full bg-white;
    }
  }

  &--counter {
    counter-reset: progress;

    .progress__point-item {
      &::before {
        counter-increment: progress;
        content: counter(progress);

        @apply text-sm font-medium;
      }
    }
  }

  &--specific {
    > .progress__label {
      @apply hidden;
    }
  }

  &--general {
    .progress__content > .progress__label {
      @apply hidden;
    }
  }
}
</style>
