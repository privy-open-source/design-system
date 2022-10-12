<template>
  <Navbar
    data-testid="navbar-menu"
    :variant="settings.variant"
    :toggleable="settings.toggleable"
    :fixed="settings.fixed"
    :color="settings.color"
    :condensed="settings.condensed">
    <slot />
    <NavbarToggle
      v-if="settings.toggleable && (settings.collapse && Object.keys(settings.collapse).length > 0)"
      @click="toggle =! toggle">
      <template #default="{ expanded }">
        <template v-if="expanded">
          <template v-if="settings.collapse.collapsedIcon">
            <template v-if="settings.collapse.collapsedIcon && typeof settings.collapse.collapsedIcon === 'string'">
              <img
                :src="settings.collapse.collapsedIcon"
                alt="icon-menu">
            </template>
            <template v-else-if="settings.collapse.collapsedIcon">
              <component :is="settings.collapse.collapsedIcon" />
            </template>
          </template>
        </template>
        <template v-else>
          <template v-if="settings.collapse.expandedIcon">
            <template v-if="settings.collapse.expandedIcon && typeof settings.collapse.expandedIcon === 'string'">
              <img
                :src="settings.collapse.expandedIcon"
                alt="icon-menu">
            </template>
            <template v-else-if="settings.collapse.expandedIcon">
              <component :is="settings.collapse.expandedIcon" />
            </template>
          </template>
        </template>
      </template>
    </NavbarToggle>
    <NavbarToggle
      v-else-if="settings.toggleable"
      @click="toggle =! toggle" />

    <Collapse
      v-if="settings.toggleable"
      v-model="toggle"
      is-nav>
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
    </Collapse>
    <NavbarNav
      v-for="(menu, i) in menus"
      v-else
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
  </Navbar>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref,
} from 'vue'
import Navbar from '../navbar/Navbar.vue'
import NavbarBrand from '../navbar/NavbarBrand.vue'
import NavbarNav from '../navbar/NavbarNav.vue'
import NavbarToggle from '../navbar/NavbarToggle.vue'
import NavItem from '../nav/NavItem.vue'
import NavItemDropdown from '../nav/NavItemDropdown.vue'
import NavForm from '../nav/NavForm.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'
import Collapse from '../collapse/Collapse.vue'
import { Menu, Setting } from './use-navbar-menu'

export default defineComponent({
  components: {
    Navbar, NavbarBrand, NavbarNav, NavbarToggle, NavItem, NavItemDropdown, NavForm, DropdownItem, Collapse,
  },
  props: {
    menus: {
      type   : Array as PropType<Menu[]>,
      default: () => ([]),
    },
    settings: {
      type   : Object as PropType<Setting>,
      default: () => ({}),
    },
  },
  setup () {
    const toggle = ref(false)

    return { toggle }
  },
})
</script>
