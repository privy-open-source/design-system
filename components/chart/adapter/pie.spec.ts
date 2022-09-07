import { renderVnode } from '../__mocks__/render-vnode'
import Adapter from './pie'

it('should able to convert vnode to chart.js datasets', () => {
  const vnodes = renderVnode(`
    <renderless>
      <p-chart-set name="Gender">
        <p-chart-val name="male" value="49" color="#408bdd" />
        <p-chart-val name="female" value="61" color="#eb6261" />
      </p-chart-set>
    </renderless>
  `)

  const output = Adapter.getDatasets(vnodes)

  expect(output).toStrictEqual({
    labels  : ['Male', 'Female'],
    datasets: [
      {
        label          : 'Gender',
        data           : ['49', '61'],
        backgroundColor: ['#408bdd', '#eb6261'],
      },
    ],
  })
})

it('should randomly color by name (hashing color) if color not provided', () => {
  const vnodes = renderVnode(`
    <renderless>
      <p-chart-set name="Gender">
        <p-chart-val name="male" value="49" />
        <p-chart-val name="female" value="61" />
      </p-chart-set>
    </renderless>
  `)

  const output = Adapter.getDatasets(vnodes)

  expect(output).toStrictEqual({
    labels  : ['Male', 'Female'],
    datasets: [
      {
        label          : 'Gender',
        data           : ['49', '61'],
        backgroundColor: ['#B79A00', '#EFD52C'],
      },
    ],
  })
})
