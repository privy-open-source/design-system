<template>
  <svg
    v-bind-once:data-uid="uid"
    role="img"
    class="shimmer"
    :class="{ 'shimmer--responsive': responsive }"
    data-testid="shimmer"
    :width="width"
    :height="height"
    aria-labelledby="Loading..."
    :viewBox="`0 0 ${width} ${height}`"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg">
    <title id="loading-aria">Loading...</title>
    <rect
      v-bind-once:clip-path="`url(#clip-path-${uid})`"
      v-bind-once:fill="`url(#fill-${uid})`"
      x="0"
      y="0"
      width="100%"
      height="100%" />
    <defs>
      <clipPath v-bind-once:id="`clip-path-${uid}`">
        <slot>
          <rect
            x="0"
            y="0"
            rx="4"
            ry="4"
            width="100%"
            height="100%" />
        </slot>
      </clipPath>
      <linearGradient v-bind-once:id="`fill-${uid}`">
        <stop
          offset=".6"
          class="shimmer__fg"
          stop-opacity="1">
          <animate
            attributeName="offset"
            dur="1s"
            keyTimes="0; 0.25; 1"
            repeatCount="indefinite"
            values="-2; -2; 1" />
        </stop>
        <stop
          offset="1.6"
          class="shimmer__bg"
          stop-opacity="1">
          <animate
            attributeName="offset"
            dur="1s"
            keyTimes="0; 0.25; 1"
            repeatCount="indefinite"
            values="-1; -1; 2" />
        </stop>
        <stop
          offset="2.6"
          class="shimmer__fg"
          stop-opacity="1">
          <animate
            attributeName="offset"
            dur="1s"
            keyTimes="0; 0.25; 1"
            repeatCount="indefinite"
            values="0; 0; 3" />
        </stop>
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue-demi'
import { vBindOnce } from '.'
import { uniqueId } from 'lodash-es'

defineProps({
  width: {
    type   : [Number, String],
    default: 100,
  },
  height: {
    type   : [Number, String],
    default: 16,
  },
  responsive: {
    type   : Boolean,
    default: false,
  },
})

const uid = uniqueId('shimmer')
</script>

<style lang="postcss">
.shimmer {
  --p-shimmer-fg: theme('backgroundColor.subtle.DEFAULT');
  --p-shimmer-bg: theme('backgroundColor.base.DEFAULT');
  --p-shimmer-dark-bg: theme('backgroundColor.dark.subtle.DEFAULT');
  --p-shimmer-dark-fg: theme('backgroundColor.dark.base');

  &--responsive {
    @apply w-full h-auto;
  }
}

.shimmer__fg {
  stop-color: var(--p-shimmer-fg);
}

.shimmer__bg {
  stop-color: var(--p-shimmer-bg);
}

:is(.dark .shimmer__fg) {
  stop-color: var(--p-shimmer-dark-fg);
}

:is(.dark .shimmer__bg) {
  stop-color: var(--p-shimmer-dark-bg);
}
</style>
