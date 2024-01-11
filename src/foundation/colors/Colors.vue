<template>
  <div
    data-testid="colors"
    class="colors">
    <div class="colors__title">
      <slot />
    </div>
    <div
      class="colors__items"
      :class="item.grid === 2 ? 'grid-cols-2': 'grid-cols-4'">
      <div
        v-for="color of item.data"
        :key="color.id">
        <Color :color="color">
          <template #token>
            {{ color.token }}
          </template>
          <template #figma>
            {{ color.figma }}
          </template>
          <template #hex>
            {{ color.parentToken ? color.parentToken : color.hex }}
          </template>
        </Color>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Color from './Color.vue'

defineProps({
  item: {
    type   : Object,
    default: () => ({}),
  },
})
</script>

<style lang="postcss" scoped>
.colors {
  @apply flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4 mb-8 pt-8;

  &__title {
    @apply w-20 shrink-0 h-10 flex flex-col justify-center text-sm font-semibold;
  }

  &__items {
    @apply min-w-0 flex-1 grid gap-x-4 gap-y-6 2xl:gap-x-2;
  }
}
</style>
