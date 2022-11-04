<template>
  <div
    data-testid="colors"
    class="colors">
    <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4 mb-5">
      <div class="w-20 shrink-0">
        <div class="h-10 flex flex-col justify-center">
          <div class="text-sm font-semibold text-slate-900 dark:text-slate-200">
            <slot />
          </div>
        </div>
      </div>
      <div
        class="min-w-0 flex-1 grid gap-x-4 gap-y-3 2xl:gap-x-2"
        :class="item.grid === 2 ? 'grid-cols-2': 'grid-cols-5'">
        <span
          v-for="color of item.data"
          :key="color.id">
          <Color :color="color">
            <template #subtitle>{{ color.subtitle }}</template>
            <template #code>{{ color.semantics ? color.semantics : color.code }}</template>
          </Color>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import Color from './Color.vue'

export default defineComponent({
  components: { Color },
  props     : {
    item: {
      type   : Object,
      default: () => ({}),
    },
  },
})
</script>
