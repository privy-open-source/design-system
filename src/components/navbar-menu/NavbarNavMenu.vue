<template>
  <NavbarNav
    v-for="(menu, i) in menus"
    :key="i"
    :align="menu.align">
    <template
      v-for="(item, id) in menu.items"
      :key="id">
      <NavItemDropdown v-if="item.submenu">
        <template #button-content>
          <template v-if="item.icon && typeof item.icon === 'string'">
            <img
              :src="item.icon"
              alt="icon-menu">
          </template>
          <template v-else-if="item.icon">
            <component :is="item.icon" />
          </template>
          {{ item.label }}
        </template>
        <DropdownItem
          v-for="(submenu, idx) in item.submenu"
          :key="idx">
          {{ submenu.label }}
        </DropdownItem>
      </NavItemDropdown>
      <NavItem
        v-else
        :href="item.url"
        :class="{ 'nav__item--no-label' : !item.label }">
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
  </NavbarNav>
</template>

<script lang="ts">
import type { PropType } from 'vue-demi'
import { defineComponent } from 'vue-demi'
import NavbarNav from '../navbar/NavbarNav.vue'
import type { Menu } from '../sidebar-menu'

export default defineComponent({
  components: { NavbarNav },
  props     : {
    menus: {
      type   : Array as PropType<Menu[]>,
      default: () => ([] as Menu[]),
    },
  },
  setup () {},
})
</script>
