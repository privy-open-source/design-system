import { bench } from 'vitest'
import {
  times,
  random,
  round,
  has,
  set,
  memoize,
} from 'lodash-es'
import {
  CheckOverlapFn,
  ObjectPosition,
  getEmptyPosition,
} from './overlap'

function hashPosition (position: ObjectPosition) {
  return BigInt(position.x) << 64n | BigInt(position.y)
}

function useLoop (): CheckOverlapFn {
  return (object, objects) => {
    for (const other of objects) {
      if (round(object.x, -1) === round(other.x, -1) && round(object.y, -1) === round(other.y, -1))
        return true
    }

    return false
  }
}

function useLodashSet (objects: Iterable<ObjectPosition>): CheckOverlapFn {
  const cache = {}

  for (const object of objects) {
    const x = round(object.x, -1)
    const y = round(object.y, -1)

    set(cache, [x, y], object)
  }

  return (object) => {
    const x = round(object.x, -1)
    const y = round(object.y, -1)

    return has(object, [x, y])
  }
}

function useLoopMemoize (): CheckOverlapFn {
  return memoize(useLoop(), (object) => {
    return object.x << 32 | object.y
  })
}

function useMap (objects: Iterable<ObjectPosition>): CheckOverlapFn {
  const xMap: Map<number, Map<number, ObjectPosition>> = new Map()

  for (const object of objects) {
    const x    = round(object.x, -1)
    const y    = round(object.y, -1)
    const yMap = xMap.get(x) ?? new Map<number, ObjectPosition>()

    yMap.set(y, object)
    xMap.set(x, yMap)
  }

  return (object) => {
    const x = round(object.x, -1)
    const y = round(object.y, -1)

    return xMap.get(x)?.get(y) !== undefined
  }
}

function useMapMemoize (objects: Iterable<ObjectPosition>): CheckOverlapFn {
  const xMap: Map<number, Map<number, ObjectPosition>> = new Map()
  const mRound                                         = memoize(round)

  for (const object of objects) {
    const x    = mRound(object.x, -1)
    const y    = mRound(object.y, -1)
    const yMap = xMap.get(x) ?? new Map<number, ObjectPosition>()

    yMap.set(y, object)
    xMap.set(x, yMap)
  }

  return (object) => {
    const x = mRound(object.x, -1)
    const y = mRound(object.y, -1)

    return xMap.get(x)?.get(y) !== undefined
  }
}

function useHash (objects: Iterable<ObjectPosition>): CheckOverlapFn {
  const hashes = new Set<BigInt>()
  const mRound = memoize(round)

  for (const object of objects) {
    const hash = hashPosition({
      x: mRound(object.x, -1),
      y: mRound(object.y, -1),
    })

    hashes.add(hash)
  }

  return (object) => {
    const hash = hashPosition({
      x: mRound(object.x, -1),
      y: mRound(object.y, -1),
    })

    return hashes.has(hash)
  }
}

function useObject (objects: Iterable<ObjectPosition>): CheckOverlapFn {
  const xMap: Record<number, Record<number, ObjectPosition>> = {}
  const mRound                                               = memoize(round)

  for (const object of objects) {
    const x    = mRound(object.x, -1)
    const y    = mRound(object.y, -1)
    const yMap = xMap[x] ?? {}

    yMap[y] = object
    xMap[x] = yMap
  }

  return (object) => {
    const x = mRound(object.x, -1)
    const y = mRound(object.y, -1)

    return xMap[x]?.[y] !== undefined
  }
}

function useMapMemoizeNoLodash (objects: Iterable<ObjectPosition>): CheckOverlapFn {
  const xMap: Map<number, Map<number, ObjectPosition>> = new Map()
  const mRound                                         = memoize((value) => Math.round(value / 10) * 10)

  for (const object of objects) {
    const x    = mRound(object.x)
    const y    = mRound(object.y)
    const yMap = xMap.get(x) ?? new Map<number, ObjectPosition>()

    yMap.set(y, object)
    xMap.set(x, yMap)
  }

  return (object) => {
    const x = mRound(object.x)
    const y = mRound(object.y)

    return xMap.get(x)?.get(y) !== undefined
  }
}

describe('checkOverlap', () => {
  const object: ObjectPosition = {
    x: random(0, 1500, false),
    y: random(0, 1500, false),
  }

  const objects = times<ObjectPosition>(100, () => {
    return {
      x: random(0, 1500, false),
      y: random(0, 1500, false),
    }
  })

  bench('using loop', () => {
    const checkOverlap = useLoop()

    checkOverlap(object, objects)
  })

  bench('using map', () => {
    const checkOverlap = useMap(objects)

    checkOverlap(object, objects)
  })

  bench('using lodash/set', () => {
    const checkOverlap = useLodashSet(objects)

    checkOverlap(object, objects)
  })

  bench('using loop + memoize', () => {
    const checkOverlap = useLoopMemoize()

    checkOverlap(object, objects)
  })

  bench('using map + memoize round', () => {
    const checkOverlap = useMapMemoize(objects)

    checkOverlap(object, objects)
  })

  bench('using object + memoize round', () => {
    const checkOverlap = useObject(objects)

    checkOverlap(object, objects)
  })
})

describe('getEmptyPosition', () => {
  const offside = {
    width : 198,
    height: 106,
  }

  const size = {
    width : 793,
    height: 1122,
  }

  const objects: ObjectPosition[] = []

  times(300, () => {
    objects.push(getEmptyPosition({
      offside,
      size,
      objects,
    }))
  })

  bench('using loop', () => {
    getEmptyPosition({
      offside,
      size,
      objects,
      checkOverlap: useLoop(),
    })
  })

  bench('using map', () => {
    getEmptyPosition({
      offside,
      size,
      objects,
      checkOverlap: useMap(objects),
    })
  })

  bench('using lodash/set', () => {
    getEmptyPosition({
      offside,
      size,
      objects,
      checkOverlap: useLodashSet(objects),
    })
  })

  bench('using loop + memoize', () => {
    getEmptyPosition({
      offside,
      size,
      objects,
      checkOverlap: useLoopMemoize(),
    })
  })

  bench('using map + memoize round', () => {
    getEmptyPosition({
      offside,
      size,
      objects,
      checkOverlap: useMapMemoize(objects),
    })
  })

  bench('using hash + memoize round', () => {
    getEmptyPosition({
      offside,
      size,
      objects,
      checkOverlap: useHash(objects),
    })
  })

  bench('using object + memoize round', () => {
    getEmptyPosition({
      offside,
      size,
      objects,
      checkOverlap: useObject(objects),
    })
  })

  bench('using map + memoize round native', () => {
    getEmptyPosition({
      offside,
      size,
      objects,
      checkOverlap: useMapMemoizeNoLodash(objects),
    })
  })
})
