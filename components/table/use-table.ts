import defu from 'defu'
import { startCase, isNil } from 'lodash'
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

function normalizeField (field: TableField): TableField {
  return defu(field, {
    label    : startCase(field.key),
    formatter: (value: unknown, _item: Record<string, unknown>): string => {
      return isNil(value) ? '-' : String(value)
    },
  })
}

export function defineTable (fields: TableField[] | string[]): TableField[] {
  return fields.map((field: TableField | string) => {
    return typeof field === 'string'
      ? normalizeField({ key: field })
      : normalizeField(field)
  })
}
