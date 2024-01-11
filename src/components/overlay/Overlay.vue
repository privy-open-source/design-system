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

<script lang="ts" setup>
import useLoading from './utils/use-loading'
import Icon from './assets/icon-white.svg'

defineProps({
  icon: {
    type   : String,
    default: Icon,
  },
})

const loading = useLoading({ elapsed: false })

function show () {
  loading.value = true
}

function hide () {
  loading.value = false
}

defineExpose({
  show,
  hide,
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
  --p-overlay-z-index: theme(zIndex.overlay);

  @apply z-[var(--p-overlay-z-index)] fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-inverse/30 flex items-center justify-center select-none will-change-[transform,opacity];
  @apply dark:bg-dark-inverse/30;

  &__icon {
    @apply w-10 md:w-16 animate-[overlayLoading_1s_ease-in-out_infinite];

    & > img {
      @apply max-w-full h-auto;
    }
  }
}
</style>
