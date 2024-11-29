<template>
  <svg
    data-testid="ringbar"
    class="ringbar"
    :class="classNames"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg">
    <circle
      class="ringbar__track"
      cx="9"
      cy="9"
      r="8"
      fill="transparent"
      stroke-width="2px" />
    <g class="ringbar__wrapper">
      <circle
        data-testid="ringbar-ring"
        class="ringbar__ring"
        cx="9"
        cy="9"
        r="8"
        :stroke-dashoffset="(1 - presentage) * 50.2654825"
        stroke-dasharray="50.2654825"
        stroke-linecap="round"
        stroke-width="2px"
        fill="transparent" />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { useProgressbar } from '../progressbar'
import type { PropType } from 'vue-demi'
import { computed } from 'vue-demi'
import { type SizeVariant } from '../button'
import type { DirectionVariant } from '.'

const props = defineProps({
  value: {
    type   : [Number, String],
    default: 0,
  },
  min: {
    type   : [Number, String],
    default: 0,
  },
  max: {
    type   : [Number, String],
    default: 100,
  },
  size: {
    type   : String as PropType<SizeVariant>,
    default: 'md',
  },
  indeterminate: {
    type   : Boolean,
    default: false,
  },
  direction: {
    type   : String as PropType<DirectionVariant>,
    default: 'cw',
  },
})

const presentage = useProgressbar(props)

const classNames = computed(() => {
  const result: string[] = []

  if (props.indeterminate)
    result.push('ringbar--indeterminate')

  // eslint-disable-next-line unicorn/explicit-length-check
  if (props.size)
    result.push(`ringbar--${props.size}`)

  if (props.direction)
    result.push(`ringbar--${props.direction}`)

  return result
})
</script>

<style lang="postcss">
.ringbar {
  &__track {
    @apply stroke-[color:theme(backgroundColor.ground)];
    @apply dark:stroke-[color:theme(backgroundColor.dark.ground)];
  }

  &__ring {
    @apply transition-[stroke-dashoffset] will-change-[stroke-dashoffset] duration-75 ease-out;
    @apply stroke-[color:theme(borderColor.info.emphasis)] origin-center;
    @apply dark:stroke-[color:theme(borderColor.dark.info.emphasis)];
  }

  &__wrapper {
    @apply origin-center -rotate-90;
  }

  &--indeterminate {
    .ringbar__ring {
      animation: 1.5s ease-in-out infinite spinner-ring;
    }

    .ringbar__wrapper {
      animation: 2s spinner-spin linear infinite;
    }
  }

  &--xs {
    @apply w-4 h-4;
  }

  &--sm {
    @apply w-5 h-5;
  }

  &--md {
    @apply w-6 h-6;
  }

  &--lg {
    @apply w-8 h-8;
  }

  &--ccw {
    @apply -scale-x-100;
  }
}

@keyframes spinner-spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes spinner-ring {
  0% {
    stroke-dashoffset: 45.2389342;
    transform: rotate(0);
  }

  50% {
    stroke-dashoffset: 5.02654825;
    transform: rotate(45deg);
  }

  100% {
    stroke-dashoffset: 45.2389342;
    transform: rotate(360deg);
  }
}
</style>
