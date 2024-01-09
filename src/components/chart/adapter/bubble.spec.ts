import { renderVnode } from '../__mocks__/render-vnode'
import Adapter from './bubble'

it('should able to convert vnode to chart.js datasets', () => {
  const vnodes = renderVnode(`
    <renderless>
      <p-chart-set name="Area" color="#408bdd">
        <p-chart-val :value="[11, 11, 3]" />
        <p-chart-val :value="[15, 2, 8]" />
        <p-chart-val :value="[25, 5, 30]" />
        <p-chart-val :value="[19, 10, 4]" />
      </p-chart-set>
    </renderless>
  `)

  const output = Adapter.getDatasets(vnodes)

  expect(output).toStrictEqual({
    datasets: [
      {
        label: 'Area',
        data : [
          [
            11,
            11,
            3,
          ],
          [
            15,
            2,
            8,
          ],
          [
            25,
            5,
            30,
          ],
          [
            19,
            10,
            4,
          ],
        ],
        borderColor    : '#408bdd',
        backgroundColor: '#408bdd',
      },
    ],
  })
})

it('should randomly color by name (hashing color) if color not provided', () => {
  const vnodes = renderVnode(`
    <renderless>
      <p-chart-set name="Area">
        <p-chart-val :value="[11, 11, 3]" />
        <p-chart-val :value="[15, 2, 8]" />
        <p-chart-val :value="[25, 5, 30]" />
        <p-chart-val :value="[19, 10, 4]" />
      </p-chart-set>
    </renderless>
  `)

  const output = Adapter.getDatasets(vnodes)

  expect(output).toStrictEqual({
    datasets: [
      {
        label: 'Area',
        data : [
          [
            11,
            11,
            3,
          ],
          [
            15,
            2,
            8,
          ],
          [
            25,
            5,
            30,
          ],
          [
            19,
            10,
            4,
          ],
        ],
        borderColor    : '#EFD52C',
        backgroundColor: '#EFD52C',
      },
    ],
  })
})

it('should return style', () => {
  const style = Adapter.getStyle()

  expect(style).toStrictEqual({})
})
