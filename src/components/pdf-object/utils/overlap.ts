
import { round } from 'lodash-es'

export interface ObjectSize {
  width: number,
  height: number,
}

export interface ObjectPosition {
  x: number,
  y: number,
}

export type ObjectSnapshot = Map<number, Map<number, ObjectPosition>>

/**
 * Check center position of reference
 * @param object Object which want to place
 * @param reference Reference place
 */
function getCenter (object: ObjectSize, reference: ObjectSize) {
  return {
    x: (reference.width - object.width) / 2,
    y: (reference.height - object.height) / 2,
  }
}

/**
 * Check if object colide (overlap) with other objects
 * @param object
 * @param objects
 */
function checkOverlap (object: ObjectPosition, objects: ObjectSnapshot) {
  const x = round(object.x, -1)
  const y = round(object.y, -1)

  return objects.get(x)?.get(y) !== undefined
}

/**
 * Check object is outside from reference
 * @param object
 * @param reference
 */
function isOffside (object: ObjectSize & ObjectPosition, reference: ObjectSize) {
  return object.x + object.width >= reference.width
    || object.y + object.height >= reference.height
}

/**
 * Create snapshot index for faster search
 * @param objects Array of object
 */
function createSnapshot (objects: Iterable<ObjectPosition>) {
  const xMap: ObjectSnapshot = new Map()

  for (const object of objects) {
    const x    = round(object.x, -1)
    const y    = round(object.y, -1)
    const yMap = xMap.get(x) ?? new Map<number, ObjectPosition>()

    yMap.set(y, object)
    xMap.set(x, yMap)
  }

  return xMap
}

/**
 * Get empty position which not colide with other objects and not outside the reference place
 * @param object Object which want to place
 * @param objects Other objects in same reference
 * @param reference The reference place
 */
export function getEmptyPosition (object: ObjectSize, reference: ObjectSize, objects: Iterable<ObjectPosition>): ObjectPosition {
  const snapshot = createSnapshot(objects)
  const position = {
    ...object,
    ...getCenter(object, reference),
  }

  let found  = true
  let loop   = 0 // Avoid infinity loop
  let deltaY = 0

  do {
    found = true

    if (isOffside(position, reference)) {
      const { x, y } = getCenter(object, reference)

      position.y = y + deltaY
      position.x = x
      deltaY    += 15

      found = false
    }

    if (checkOverlap(position, snapshot)) {
      position.x += 15
      position.y += 15

      found = false
    }
  } while (!found && ++loop <= 500)

  if (!found)
    console.warn('Cannot find empty position, max iteration reach')

  return position
}
