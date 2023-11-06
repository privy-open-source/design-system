<template>
  <Sidebar
    data-testid="sidebar-menu"
    :type="type"
    :fixed="fixed"
    :sticky="sticky"
    :toggleable="toggleable"
    :align="align">
    <template #brand>
      <slot />
    </template>
    <slot name="prepend" />
    <SidebarNav
      v-for="(menu, id) in menus"
      :key="id"
      :title="menu.title"
      :title-action-label="menu.titleActionLabel"
      :title-action-url="menu.titleActionUrl"
      :bottom="menu.bottom"
      :condensed="menu.condensed"
      :collapsible="menu.collapsible"
      v-bind="menu.attrs">
      <!-- IF: Menu has maxlength -->
      <template
        v-if="menu.maxLength">
        <template
          v-for="(item, i) in menu.items?.slice(0, menu.maxLength)"
          :key="i">
          <SidebarMenuItem
            :item="item"
            :menu="menu" />
        </template>
        <NavCollapse
          v-if="menu.maxLength"
          :show-less-text="showLessText"
          :show-more-text="showMoreText"
          data-testid="sidebar-toggle">
          <template
            v-for="(item, i) in menu.items?.slice(menu.maxLength, menu.items.length)"
            :key="i">
            <SidebarMenuItem
              :item="item"
              :menu="menu" />
          </template>
        </NavCollapse>
      </template>
      <!-- ENDIF -->

      <template v-else>
        <template
          v-for="(item, i) in menu.items"
          :key="i">
          <SidebarMenuItem
            :item="item"
            :menu="menu" />
        </template>
      </template>
    </SidebarNav>
    <slot name="append" />
    <template
      v-if="$slots.bottom"
      #bottom>
      <slot name="bottom" />
    </template>
  </Sidebar>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue-demi'
import Sidebar from '../sidebar/Sidebar.vue'
import type { TypeVariant } from '../sidebar'
import SidebarNav from '../sidebar/SidebarNav.vue'
import type { Menu } from '.'
import type { AlignVariant } from '../nav'
import type { ToggleableVariant } from '../navbar'
import NavCollapse from '../nav/NavCollapse.vue'
import SidebarMenuItem from './SidebarMenuItem.vue'

defineProps({
  menus: {
    type   : Array as PropType<Menu[]>,
    default: () => ([]),
  },
  fixed: {
    type   : Boolean,
    default: false,
  },
  sticky: {
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
  length: {
    type   : [Number, String],
    default: undefined,
  },
  showMoreText: {
    type   : String,
    default: 'More',
  },
  showLessText: {
    type   : String,
    default: 'Less',
  },
})
</script>
