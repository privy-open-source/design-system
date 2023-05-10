import SVGPath, { PathArray } from 'svg-path-commander'
import { Window } from 'happy-dom'
import { sortBy } from 'lodash-es'

export function fixSvg (svgString: string) {
  const window   = new Window()
  const document = window.document

  document.body.innerHTML = svgString

  const svg   = document.querySelector('svg')
  const paths = document.querySelectorAll('path')

  for (const el of paths) {
    const d = el.getAttribute('d')

    if (d) {
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

      el.setAttribute('d', SVGPath.pathToString(paths.flat() as PathArray))
    }

    el.removeAttribute('fill-rule')
    el.removeAttribute('clip-rule')

    el.setAttribute('fill', 'currentColor')
  }

  svg.classList.add('persona-icon')
  svg.setAttribute('focusable', 'false')

  return svg.innerHTML
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
