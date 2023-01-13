
import { memoize } from 'lodash-es'

export interface ObjectSize {
  width: number,
  height: number,
}

export interface ObjectPosition {
  x: number,
  y: number,
}

export type CheckOverlapFn = (object: ObjectPosition, objects: Iterable<ObjectPosition>) => boolean

export interface GetEmptyPositionOptions {
  /**
   * Other objects position
   */
  objects: Iterable<ObjectPosition>,
  /**
   * Object size
   */
  size: ObjectSize,
  /**
   * Offside size
   */
  offside: ObjectSize,
  /**
   * Function to check overlap
   */
  checkOverlap?: CheckOverlapFn,
}

/**
 * Check center position of reference
 * @param object Object which want to place
 * @param reference Reference place
 */
export function getCenter (object: ObjectSize, reference: ObjectSize) {
  return {
    x: (reference.width - object.width) / 2,
    y: (reference.height - object.height) / 2,
  }
}

/**
 * Check object is outside from reference
 * @param object
 * @param reference
 */
export function isOffside (object: ObjectSize & ObjectPosition, reference: ObjectSize) {
  return object.x + object.width >= reference.width
    || object.y + object.height >= reference.height
}

type MapSnapshot = Map<number, Map<number, ObjectPosition>>

/**
 * Check Overlap Fn using Map as Cache Keys
 * @param objects
 */
export function useMapSnapshot (objects: Iterable<ObjectPosition>): CheckOverlapFn {
  const xMap: MapSnapshot = new Map()
  const round             = memoize((value) => Math.round(value / 10) * 10)

  for (const object of objects) {
    const x    = round(object.x)
    const y    = round(object.y)
    const yMap = xMap.get(x) ?? new Map<number, ObjectPosition>()

    yMap.set(y, object)
    xMap.set(x, yMap)
  }

  return (object) => {
    const x = round(object.x)
    const y = round(object.y)

    return xMap.get(x)?.has(y)
  }
}

/**
 * Get empty position which not colide with other objects and not outside the reference place
 */
export function getEmptyPosition (options: GetEmptyPositionOptions): ObjectPosition {
  const checkOverlap = options.checkOverlap ?? useMapSnapshot(options.objects)
  const center       = getCenter(options.size, options.offside)
  const position     = {
    ...options.size,
    ...center,
  }

  let found  = true
  let loop   = 0 // Avoid infinity loop
  let deltaY = 0

  do {
    found = true

    if (isOffside(position, options.offside)) {
      position.y = center.y + deltaY
      position.x = center.x
      deltaY    += 15

      found = false
    }

    if (checkOverlap(position, options.objects)) {
      position.x += 15
      position.y += 15

      found = false
    }
  } while (!found && ++loop <= 500)

  if (!found)
    console.warn('Cannot find empty position, max iteration reach')

  return position
}
