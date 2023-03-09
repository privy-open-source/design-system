<template>
  <ul
    class="breadcrumbs"
    data-testid="breadcrumbs">
    <slot>
      <template
        v-for="(item, id) in items"
        :key="id">
        <BreadcrumbItemDropdown
          v-if="item.subitem"
          :text="item.text"
          :active="item.active"
          :href="item.href">
          <template
            v-for="(subitem, idx) in item.subitem"
            :key="idx">
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

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { BreadcrumbItems } from '.'
import BreadcrumbItem from './BreadcrumbItem.vue'
import BreadcrumbItemDropdown from './BreadcrumbItemDropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'

export default defineComponent({
  components: {
    BreadcrumbItem, BreadcrumbItemDropdown, DropdownItem,
  },
  props: {
    items: {
      type   : Array<BreadcrumbItems>,
      default: () => {},
    },
  },
})
</script>

<style lang="postcss">
.breadcrumbs {
  @apply flex space-x-3 items-center;
}
</style>
