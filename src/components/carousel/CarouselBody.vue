<template>
  <div class="splide__track">
    <div class="splide__list">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, onUpdated } from 'vue-demi'
import { CAROUSEL_INSTANCE } from '.'

const slider = inject(CAROUSEL_INSTANCE)

onUpdated(() => {
  slider.value?.refresh()
})
</script>
