import { Component } from '../global/use-singleton'
import { AlignVariant, StyleVariant } from '../nav/Nav.vue'
import {
  ToggleableVariant, ColorVariant,
} from '../navbar/use-navbar'

export interface SubMenu {
  name: string,
  label: string,
  url: string,
}

export interface MenuItem {
  name?: string,
  label?: string,
  url?: string,
  icon?: string | Component,
  submenu?: SubMenu[],
}

export interface Menu {
  align?: AlignVariant,
  items?: MenuItem[],
}

export interface CollapseIcon {
  collapsedIcon?: string | Component,
  expandedIcon?: string | Component,
}

export interface Setting {
  variant?: StyleVariant,
  toggleable?: ToggleableVariant,
  color?: ColorVariant,
  fixed?: boolean,
  condensed?: boolean,
  collapse?: CollapseIcon,
}

export function defineNavbarMenu (menus: Menu[]): Menu[] {
  return menus
}

export function defineSetting (setting: Setting): Setting {
  return setting
}
