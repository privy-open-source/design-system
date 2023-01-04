<template>
  <div
    class="pdf__loading">
    <img
      :src="PDF_LOADING_IMG"
      width="793"
      height="1122">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import PDF_LOADING_IMG from './assets/pdf-loading.svg'

export default defineComponent({
  setup () {
    return { PDF_LOADING_IMG }
  },
})
</script>

<style lang="postcss">
.pdf__loading {
  @apply shadow-lg mb-4 p-4 bg-base-white;

  > img {
    @apply max-w-full object-contain h-auto;
  }
}
</style>
