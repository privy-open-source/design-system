import SVGPath, { PathArray } from 'svg-path-commander'
import { orderBy } from 'lodash-es'

type Point = ReturnType<typeof SVGPath['getPointAtLength']>

export function fixPath (d: string): string {
  const path  = SVGPath.normalizePath(d)
  const paths = sortPaths(SVGPath.splitPath(path))

  for (const [i, cur] of paths.entries()) {
    if (i > 0) {
      const outer = paths[0]
      const prev  = paths[i - 1]

      const needRotate = (isInside(cur, prev) && isClockwise(cur) === isClockwise(prev))
        || (isInside(cur, outer) && isClockwise(cur) === isClockwise(outer))

      if (needRotate)
        paths[i] = SVGPath.reversePath(cur)
    }
  }

  return SVGPath.pathToString(paths.flat() as PathArray)
}

function isInside (inner: PathArray, outer: PathArray) {
  return isInBox(inner, outer)
    && isInPolygon(inner, outer)
}

function isInBox (inner: PathArray, outer: PathArray) {
  const outerBox = SVGPath.getPathBBox(outer)
  const innerBox = SVGPath.getPathBBox(inner)

  return innerBox.x >= outerBox.x
    && innerBox.y >= outerBox.y
    && (innerBox.x + innerBox.width) <= (outerBox.x + outerBox.width)
    && (innerBox.y + innerBox.height) <= (outerBox.y + outerBox.height)
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
    points.push(SVGPath.getPointAtLength(path, length * (i / precission)))

  return points
}

function isClockwise (path: PathArray) {
  return SVGPath.getDrawDirection(path)
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
