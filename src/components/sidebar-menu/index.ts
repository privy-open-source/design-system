import type { AdditionalAttr } from '../global/types'
import type { Component } from '../global/use-singleton'
import type { AlignVariant } from '../nav'
import type { LiteralUnion } from 'type-fest'
import type { RouteLocationRaw } from 'vue-router'

type Access = LiteralUnion<'*', string>

function hasAccess (access: Access | Access[] | undefined, role: string) {
  if (!access || access === '*')
    return true

  return Array.isArray(access)
    ? access.some((acc) => acc === '*' || acc === role)
    : access === role
}

export interface SubMenu {
  /**
   * Menu name
   */
  name: string,
  /**
   * Menu label
   */
  label: string,
  /**
   * Menu URL
   */
  url?: RouteLocationRaw,
  /**
   * Access Role
   */
  access?: Access | Access[],
  /**
   * Additional Attribute
   */
  attrs?: AdditionalAttr,
  /**
   * Active on exact match
   * @default false
   */
  exact?: boolean,
}

export interface MenuItem {
  /**
   * Uniq name
   */
  name: string,
  /**
   * Menu title
   */
  label?: string,
  /**
   * Menu URL
   */
  url?: RouteLocationRaw,
  /**
   * Menu Icon
   */
  icon?: string | Component,
  /**
   * Menu role access
   */
  access?: Access | Access[],
  /**
   * Enable collapse
   */
  collapsible?: boolean,
  /**
   * Submenu items
   */
  submenu?: SubMenu[],
  /**
   * Additional attribute
   */
  attrs?: AdditionalAttr,
  /**
   * Active on exact match
   * @default false
   */
  exact?: boolean,
}

export interface Menu {
  /**
   * Menu Title
   */
  title?: string,
  /**
   * Additional Action Label
   */
  titleActionLabel?: string,
  /**
   * Action URL
   */
  titleActionUrl?: RouteLocationRaw,
  /**
   * Enable collapse
   * @default false
   */
  collapsible?: boolean,
  /**
   * Set to bottom
   * @default false
   */
  bottom?: boolean,
  /**
   * Enable condensed mode
   * @default false
   */
  condensed?: boolean,
  /**
   * Role access
   */
  access?: Access | Access[],
  /**
   * Menu item
   */
  items?: MenuItem[],
  /**
   * Menu Aligment
   */
  align?: AlignVariant,
  /**
   * Maximal items to show
   */
  maxLength?: number,
  /**
   * Additional Attribute
   */
  attrs?: AdditionalAttr,
  /**
   * Active on exact match
   * @default false
   */
  exact?: boolean,
}

/**
 * Define menus
 * @param menus
 */
export function defineMenu (menus: Menu[]): Menu[] {
  return menus
}

/**
 * Filter menu by role
 * @param menus
 * @param role
 */
export function filterMenu (menus: Menu[], role: string): Menu[] {
  // Level 1: Menu
  const result: Menu[] = []

  for (const menu of menus) {
    if (!hasAccess(menu.access, role))
      continue

    if (!Array.isArray(menu.items) || menu.items.length === 0) {
      result.push(menu)

      continue
    }

    // Level 2: MenuItem
    const items: MenuItem[] = []

    for (const menuitem of menu.items) {
      if (!hasAccess(menuitem.access, role))
        continue

      if (!Array.isArray(menuitem.submenu) || menuitem.submenu.length === 0) {
        items.push(menuitem)

        continue
      }

      // Level 3: SubMenu
      const submenu = menuitem.submenu.filter((item) => {
        return hasAccess(item.access, role)
      })

      if (submenu.length > 0) {
        items.push({
          ...menuitem,
          submenu: submenu,
        })
      }
    }

    if (items.length > 0) {
      result.push({
        ...menu,
        items: items,
      })
    }
  }

  return result
}
