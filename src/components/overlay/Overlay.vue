<template>
  <div
    v-if="loading"
    data-testid="overlay"
    class="overlay">
    <div class="overlay__icon">
      <img
        :src="icon"
        alt="overlay-icon">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import useLoading from './utils/use-loading'
import Icon from './assets/icon-white.svg'

export default defineComponent({
  setup () {
    const loading = useLoading({ elapsed: false })

    function show () {
      loading.value = true
    }

    function hide () {
      loading.value = false
    }

    return {
      show,
      hide,
      loading,
      icon: Icon,
    }
  },
})
</script>

<style lang="postcss">
@keyframes overlayLoading {
  from {
    opacity: 1;
    transform: scale(0);
  }

  to {
    opacity: 0;
    transform: scale(1.5);
  }
}

.overlay {
  @apply fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-50 bg-overlay-primary flex items-center justify-center select-none will-change-[transform,opacity];

  &__icon {
    @apply w-10 md:w-16 animate-[overlayLoading_1s_ease-in-out_infinite];

    & > img {
      @apply max-w-full h-auto;
    }
  }
}
</style>
