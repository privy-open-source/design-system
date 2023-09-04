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
        <NavCollapse
          v-if="menu.maxLength"
          :show-less-text="showLessText"
          :show-more-text="showMoreText"
          data-testid="sidebar-toggle">
          <template
            v-for="(item, i) in menu.items?.slice(menu.maxLength, menu.items.length)"
            :key="i">
            <NavSubItem
              v-if="item.submenu"
              v-bind="item.attrs"
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
                'nav__item--no-icon' : !item.icon,
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
        </NavCollapse>
      </template>
      <!-- ENDIF -->

      <template v-else>
        <template
          v-for="(item, i) in menu.items"
          :key="i">
          <NavSubItem
            v-if="item.submenu"
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
              'nav__item--no-icon': !item.icon,
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
      </template>
    </SidebarNav>
    <template
      v-if="$slots.bottom"
      #bottom>
      <slot name="bottom" />
    </template>
  </Sidebar>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
} from 'vue-demi'
import Sidebar from '../sidebar/Sidebar.vue'
import { TypeVariant } from '../sidebar'
import SidebarNav from '../sidebar/SidebarNav.vue'
import NavItem from '../nav/NavItem.vue'
import NavSubItem from '../nav/NavSubItem.vue'
import { Menu } from '.'
import { AlignVariant } from '../nav'
import { ToggleableVariant } from '../navbar'
import NavCollapse from '../nav/NavCollapse.vue'
import IconMore from '@privyid/persona-icon/vue/chevron-down/16.vue'
import IconLess from '@privyid/persona-icon/vue/chevron-up/16.vue'

export default defineComponent({
  components: {
    Sidebar,
    SidebarNav,
    NavItem,
    NavSubItem,
    NavCollapse,
    IconMore,
    IconLess,
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
  },
})
</script>
