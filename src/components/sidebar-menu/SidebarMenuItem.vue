<template>
  <NavSubItem
    v-if="item.submenu"
    data-testid="sidebar-submenu"
    :text="item.label"
    :collapsible="item.collapsible"
    v-bind="item.attrs">
    <template #icon>
      <template v-if="item.icon && typeof item.icon === 'string'">
        <img
          :src="item.icon"
          alt="icon-menu">
      </template>
      <template v-else-if="item.icon">
        <component :is="item.icon" />
      </template>
    </template>
    <SidebarNav :condensed="menu.condensed">
      <NavItem
        v-for="(submenu, x) in item.submenu"
        :key="x"
        :href="submenu.url"
        :exact="submenu.exact"
        v-bind="submenu.attrs">
        {{ submenu.label }}
      </NavItem>
    </SidebarNav>
  </NavSubItem>
  <NavItem
    v-else
    v-bind="item.attrs"
    :href="item.url"
    :exact="item.exact"
    :class="{
      'nav__item--no-label': !item.label,
      'nav__item--no-icon': !item.icon
    }">
    <template
      #icon>
      <template v-if="item.icon && typeof item.icon === 'string'">
        <img
          :src="item.icon"
          alt="icon-menu">
      </template>
      <template v-else-if="item.icon">
        <component :is="item.icon" />
      </template>
    </template>
    {{ item.label }}
  </NavItem>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import type { Menu, MenuItem } from '.'
import NavItem from '../nav/NavItem.vue'
import NavSubItem from '../nav/NavSubItem.vue'
import SidebarNav from '../sidebar/SidebarNav.vue'

defineProps({
  item: {
    type   : Object as PropType<MenuItem>,
    default: () => ({} as MenuItem),
  },
  menu: {
    type   : Object as PropType<Menu>,
    default: () => ({} as Menu),
  },
})
</script>
