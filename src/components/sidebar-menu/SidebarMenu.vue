<template>
  <Sidebar
    data-testid="sidebar-menu"
    :type="type"
    :fixed="fixed"
    :toggleable="toggleable"
    :align="align">
    <template #brand>
      <slot />
    </template>
    <SidebarNav
      v-for="(menu, id) in menus"
      :key="id"
      :title="menu.title"
      :bottom="menu.bottom"
      :condensed="menu.condensed">
      <template
        v-for="(item, i) in menu.items"
        :key="i">
        <NavSubItem
          v-if="item.submenu"
          :text="item.label"
          :collapsible="item.collapsible">
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
              :href="submenu.url">
              {{ submenu.label }}
            </NavItem>
          </SidebarNav>
        </NavSubItem>
        <NavItem
          v-else
          :href="item.url"
          :class="{ 'nav__item--no-label' : !item.label, 'nav__item--no-icon' : !item.icon }">
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
    </SidebarNav>
    <template #bottom>
      <slot name="bottom" />
    </template>
  </Sidebar>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue-demi'
import Sidebar from '../sidebar/Sidebar.vue'
import { TypeVariant } from '../sidebar'
import SidebarNav from '../sidebar/SidebarNav.vue'
import NavItem from '../nav/NavItem.vue'
import NavSubItem from '../nav/NavSubItem.vue'
import { Menu } from '.'
import { AlignVariant } from '../nav'
import { ToggleableVariant } from '../navbar'

export default defineComponent({
  components: {
    Sidebar, SidebarNav, NavItem, NavSubItem,
  },
  props: {
    menus: {
      type   : Array as PropType<Menu[]>,
      default: () => ([]),
    },
    fixed: {
      type   : Boolean,
      default: false,
    },
    type: {
      type   : String as PropType<TypeVariant>,
      default: 'wide',
    },
    align: {
      type   : String as PropType<AlignVariant>,
      default: 'left',
    },
    toggleable: {
      type   : String as PropType<ToggleableVariant>,
      default: undefined,
    },
  },
})
</script>
