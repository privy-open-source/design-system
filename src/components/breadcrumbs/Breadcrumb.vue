<template>
  <ul
    class="breadcrumbs"
    data-testid="breadcrumbs">
    <template v-if="items">
      <template
        v-for="(item, id) in items"
        :key="id">
        <breadcrumb-item
          :active="item.active"
          :href="item.href">
          {{ item.text }}
        </breadcrumb-item>
      </template>
    </template>
    <slot v-else />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { BreadcrumbItems } from '.'
import BreadcrumbItem from './BreadcrumbItem.vue'

export default defineComponent({
  components: { BreadcrumbItem },
  props     : {
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
