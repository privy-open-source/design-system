<template>
  <div
    class="spread"
    data-testid="spread"
    :class="{ 'spread--active': active }">
    <template
      v-for="i in 3"
      :key="i">
      <div
        class="spread__item">
        <slot />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  props: {
    active: {
      type   : Boolean,
      default: false,
    },
  },
})
</script>

<style lang="postcss">
.spread {
  @apply relative flex;

  &__item {
    @apply will-change-transform;

    &:nth-child(2) {
      @apply z-[2];
    }

    &:nth-child(1),
    &:nth-child(3) {
      @apply opacity-25 absolute top-0 left-0 origin-bottom transition-transform z-1 will-change-transform;
    }
  }

  &--active {
    .spread__item:nth-child(1) {
      @apply -translate-x-[60%] translate-y-1 -rotate-[20deg];
    }
    .spread__item:nth-child(3) {
      @apply translate-x-[60%] translate-y-1 rotate-[20deg];
    }
  }
}
</style>
