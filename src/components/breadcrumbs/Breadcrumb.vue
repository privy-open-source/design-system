<template>
  <ul
    class="breadcrumbs"
    data-testid="breadcrumbs">
    <slot>
      <template
        v-for="(item, i) in items"
        :key="i">
        <BreadcrumbItemDropdown
          v-if="item.subitem"
          :text="item.text"
          :active="item.active"
          :href="item.href">
          <template
            v-for="(subitem, j) in item.subitem"
            :key="j">
            <DropdownItem
              :active="subitem.active"
              :href="subitem.href">
              {{ subitem.text }}
            </DropdownItem>
          </template>
        </BreadcrumbItemDropdown>
        <BreadcrumbItem
          v-else
          :active="item.active"
          :href="item.href">
          {{ item.text }}
        </BreadcrumbItem>
      </template>
    </slot>
  </ul>
</template>

<script lang="ts" setup>
import type { VNode } from 'vue-demi'
import { provide } from 'vue-demi'
import type { BreadcrumbItems } from '.'
import BreadcrumbItem from './BreadcrumbItem.vue'
import BreadcrumbItemDropdown from './BreadcrumbItemDropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'

defineProps({
  items: {
    type   : Array<BreadcrumbItems>,
    default: () => ([]),
  },
})

const slots = defineSlots<{
  'divider'(): VNode[],
}>()

if (slots.divider)
  provide('divider', slots.divider)
</script>

<style lang="postcss">
.breadcrumbs {
  @apply flex space-x-3 items-center;
}
</style>
