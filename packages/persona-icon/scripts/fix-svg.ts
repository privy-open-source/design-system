import SVGPath, { PathArray } from 'svg-path-commander'
import { sortBy } from 'lodash-es'

export function fixPath (d: string): string {
  const path  = SVGPath.normalizePath(d)
  const paths = sortPaths(SVGPath.splitPath(path))

  for (const [i, cur] of paths.entries()) {
    if (i > 0) {
      const outer = paths[0]
      const prev  = paths[i - 1]

      const needRotate = (isEnclosed(cur, prev) && isClockwise(cur) === isClockwise(prev))
        || (isEnclosed(cur, outer) && isClockwise(cur) === isClockwise(outer))

      if (needRotate)
        paths[i] = SVGPath.reversePath(cur)
    }
  }

  return SVGPath.pathToString(paths.flat() as PathArray)
}

function isEnclosed (inner: PathArray, outer: PathArray) {
  const outerBox = SVGPath.getPathBBox(outer)
  const innerBox = SVGPath.getPathBBox(inner)

  return innerBox.x >= outerBox.x
    && innerBox.y >= outerBox.y
    && (innerBox.x + innerBox.width) <= (outerBox.x + outerBox.width)
    && (innerBox.y + innerBox.height) <= (outerBox.y + outerBox.height)
}

function isClockwise (path: PathArray) {
  return SVGPath.getDrawDirection(path)
}

function sortPaths (paths: PathArray[]): PathArray[] {
  const bboxes = paths.map((path, index) => {
    return {
      ...SVGPath.getPathBBox(path),
      index,
    }
  })

  return sortBy(bboxes, ['x', 'y'])
    .map((box) => {
      return paths[box.index]
    })
}
