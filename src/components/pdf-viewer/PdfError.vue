<template>
  <div
    class="pdf__error">
    <h3 class="text-danger">
      Failed to load PDF
    </h3>
    <dl class="mt-7">
      <dt>URL:</dt>
      <dd class="truncate">
        <a
          :href="url"
          target="_blank">
          <code>{{ url }}</code>
        </a>
      </dd>
      <dt>
        Reason:
      </dt>
      <dd><code>{{ error.message }}</code></dd>
      <dt>
        PDFJS Version:
      </dt>
      <dd><code>{{ pdfJs.version }}</code></dd>
    </dl>
  </div>
</template>

<script lang="ts">
import type * as PDFJS from 'pdfjs-dist'
import { defineComponent, PropType } from 'vue-demi'

export default defineComponent({
  props: {
    url: {
      type   : String,
      default: '',
    },
    pdfJs: {
      type   : Object as PropType<typeof PDFJS>,
      default: () => ({}),
    },
    error: {
      type   : Object as PropType<Error>,
      default: () => ({} as Error),
    },
  },
  setup () {
    return {}
  },
})
</script>

<style lang="postcss">
.pdf__error {
  @apply shadow-lg mb-4 p-4 bg-danger w-full h-full;
}
</style>
