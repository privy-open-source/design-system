import type { RouteLocationRaw } from 'vue-router'

interface Breadcrumb {
  text: string,
  href?: RouteLocationRaw,
  active?: boolean,
}

export interface BreadcrumbItems extends Breadcrumb {
  subitem?: Breadcrumb[],
}

export function defineNavigation (navigation: BreadcrumbItems[]): BreadcrumbItems[] {
  return navigation
}
