interface Breadcrumb {
  text: string,
  href?: string,
  active?: boolean,
}

export interface BreadcrumbItems extends Breadcrumb {
  subitem?: Breadcrumb[],
}

export type TagVariant = 'a' | 'span'

export function defineNavigation (navigation: BreadcrumbItems[]): BreadcrumbItems[] {
  return navigation
}
