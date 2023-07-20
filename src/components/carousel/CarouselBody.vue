<template>
  <div class="splide__track">
    <div class="splide__list">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  onUpdated,
} from 'vue-demi'
import { CAROUSEL_INSTANCE } from '.'

export default defineComponent({
  setup () {
    const slider = inject(CAROUSEL_INSTANCE)

    onUpdated(() => {
      slider.value?.refresh()
    })

    return {}
  },
})
</script>
