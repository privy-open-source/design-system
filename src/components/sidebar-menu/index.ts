import { Component } from '../global/use-singleton'
import { AlignVariant } from '../nav'

export interface SubMenu {
  name: string,
  label: string,
  url: string,
}

export interface MenuItem {
  name: string,
  label?: string,
  url: string,
  icon?: string | Component,
  collapsible?: boolean,
  submenu?: SubMenu[],
}

export interface Menu {
  title?: string,
  titleActionLabel?: string,
  titleActionUrl?: string,
  collapsible?: boolean,
  bottom?: boolean,
  condensed?: boolean,
  items?: MenuItem[],
  align?: AlignVariant,
  maxLength?: number,
}

export function defineMenu (menus: Menu[]): Menu[] {
  return menus
}
