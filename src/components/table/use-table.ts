import defu from 'defu'
import { startCase, isNil } from 'lodash-es'
import { HTMLAttributes } from 'vue-demi'

export interface TableField {
  /**
   * Field's key
   */
  key: string,
  /**
   * Field's Label
   */
  label?: string,
  /**
   * field width, value in percent
   */
  width?: number,
  /**
   * Function for transforming value in
   */
  formatter?: (value: unknown, item: Record<string, unknown>) => string,

  tdClass?: HTMLAttributes['class'],

  thClass?: HTMLAttributes['class'],
}

export function baseFormatter (value: unknown): string {
  return isNil(value) ? '-' : String(value)
}

function normalizeField (field: TableField): TableField {
  return defu(field, {
    label    : startCase(field.key),
    formatter: baseFormatter,
  })
}

export function defineTable (fields: TableField[] | string[]): TableField[] {
  return fields.map((field: TableField | string) => {
    return typeof field === 'string'
      ? normalizeField({ key: field })
      : normalizeField(field)
  })
}
