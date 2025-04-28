import type { PathArray } from 'svg-path-commander'
import SVGPath from 'svg-path-commander'
import { orderBy } from 'lodash-es'

type Point = ReturnType<typeof SVGPath['getPointAtLength']>

export function fixPath (d: string): string {
  const path  = SVGPath.normalizePath(d)
  const paths = sortPaths(SVGPath.splitPath(path))
  const root  = new PathTree()

  for (const p of paths)
    root.addChild(new PathTree(p))

  const nodes               = [...root.children]
  const result: PathArray[] = []

  while (nodes.length > 0) {
    const node = nodes.shift()

    if (!node)
      break

    if (node.value) {
      if (node.parent && node.parent.dir === node.dir)
        node.reverse()

      result.push(node.value)
    }

    if (node.children.size > 0)
      nodes.push(...node.children)
  }

  return SVGPath.pathToString(result.flat(1) as PathArray)
}

function isInPolygon (inner: PathArray, outer: PathArray) {
  const outerPolygon = getPolygon(outer)
  const innerPolygon = getPolygon(inner)

  return innerPolygon.every((point) => isPointInPoly(point, outerPolygon))
}

function isPointInPoly (point: Point, polygon: Point[]) {
  let c = false

  for (let i = -1, l = polygon.length, j = l - 1; ++i < l; j = i) {
    ((polygon[i].y <= point.y && point.y < polygon[j].y) || (polygon[j].y <= point.y && point.y < polygon[i].y))
      && (point.x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x)
      && (c = !c)
  }

  return c
}

function getPolygon (path: PathArray, precission = 30) {
  const points: Point[] = []
  const length          = SVGPath.getTotalLength(path)

  for (let i = 1; i <= precission; i++)
    points.push(SVGPath.getPointAtLength(path, Math.round(length * (i / precission))))

  return points
}

function isClockwise (path: PathArray) {
  const points = getPolygon(path)
  const n      = points.length

  let area = 0

  for (let i = 0; i < n; i++) {
    const p1 = points[i]
    const p2 = points[(i + 1) % n]

    area += (p1.x * p2.y - p2.x * p1.y)
  }

  return (area / 2) < 0
}

function sortPaths (paths: PathArray[]): PathArray[] {
  const bboxes = paths.map((path, index) => {
    const bbox = SVGPath.getPathBBox(path)
    const area = bbox.width * bbox.height

    return {
      area,
      path,
      bbox,
      index,
    }
  })

  return orderBy(bboxes, ['bbox.x', 'bbox.y'])
    .map((box) => {
      return paths[box.index]
    })
}

interface PathTreeJSON {
  value?: string,
  dir?: 'cw' | 'ccw',
  area?: number,
  children: PathTreeJSON[],
}

export class PathTree {
  parent?: PathTree
  value?: PathArray
  children: Set<PathTree>

  constructor (path?: PathArray) {
    this.value    = path
    this.children = new Set()
  }

  addChild (cur: PathTree) {
    if (this.value && this.compare(cur) === -1) {
      this.setParent(cur)

      return this
    }

    for (const child of this.children) {
      const c = child.compare(cur)

      if (c === -1) {
        child.setParent(child)

        return this
      }

      if (c === 1) {
        child.addChild(cur)

        return this
      }
    }

    this.children.add(cur)

    cur.parent = this

    return this
  }

  setParent (parent: PathTree) {
    if (this.parent)
      this.parent.children.delete(this)

    parent.addChild(this)

    this.parent = parent

    return this
  }

  get area () {
    if (this.value)
      return SVGPath.getPathArea(this.value)
  }

  get dir () {
    if (this.value)
      return isClockwise(this.value) ? 'cw' : 'ccw'
  }

  compare (other: PathTree) {
    if (this.value && other.value) {
      if (isInPolygon(other.value, this.value))
        return 1

      if (isInPolygon(this.value, other.value))
        return -1
    }

    return 0
  }

  reverse () {
    if (this.value)
      this.value = SVGPath.reversePath(this.value)

    return this
  }

  toJSON (): PathTreeJSON {
    return {
      value   : this.value ? SVGPath.pathToString(this.value) : undefined,
      dir     : this.dir,
      area    : this.area,
      children: Array.from(this.children, (c) => c.toJSON()),
    }
  }
}
