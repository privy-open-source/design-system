import { Component } from 'vue-demi'

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
  bottom?: boolean,
  condensed?: boolean,
  items?: MenuItem[],
}

export function defineMenu (menus: Menu[]): Menu[] {
  return menus
}
