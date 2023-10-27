<template>
  <div class="select__tags">
    <template
      v-for="(item, i) in shownItems"
      :key="i">
      <p-label
        data-testid="select-tag"
        variant="light"
        size="xs">
        {{ item.text }}
      </p-label>
    </template>
    <template v-if="items.length > displayLimit">
      <p-label
        data-testid="select-tag-others"
        variant="light"
        size="xs">
        {{ otherText }}
      </p-label>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import { computed } from 'vue-demi'
import type { SelectItem } from '.'
import pLabel from '../label/Label.vue'

const props = defineProps({
  items: {
    type   : Array as PropType<SelectItem[]>,
    default: () => ([]),
  },
  displayLimit: {
    type   : Number,
    default: 2,
  },
  limitText: {
    type   : String,
    default: '+{n} Other(s)',
  },
})

const shownItems = computed(() => {
  return props.items.slice(0, props.displayLimit)
})

const otherText = computed(() => {
  return props.limitText.replaceAll('{n}', String(props.items.length - props.displayLimit))
})
</script>

<style lang="postcss">
.select__tags {
  @apply flex space-x-1 items-center min-h-6;
}
</style>
