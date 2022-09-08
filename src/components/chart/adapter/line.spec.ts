import { renderVnode } from '../__mocks__/render-vnode'
import Adapter from './line'

it('should able to convert vnode to chart.js datasets', () => {
  const vnodes = renderVnode(`
    <renderless>
      <p-chart-set name="January">
        <p-chart-val name="success" color="#23b242" value="30"  />
        <p-chart-val name="failed" color="#e42e2c" value="10" />
      </p-chart-set>
      <p-chart-set name="February">
        <p-chart-val name="success" color="#23b242" value="20"  />
        <p-chart-val name="failed" color="#e42e2c" value="10" />
      </p-chart-set>
      <p-chart-set name="March">
        <p-chart-val name="success" color="#23b242" value="100"  />
        <p-chart-val name="failed" color="#e42e2c" value="25" />
      </p-chart-set>
      <p-chart-set name="April">
        <p-chart-val name="success" color="#23b242" value="80"  />
        <p-chart-val name="failed" color="#e42e2c" value="20" />
      </p-chart-set>
      <p-chart-set name="May">
        <p-chart-val name="success" color="#23b242" value="150"  />
        <p-chart-val name="failed" color="#e42e2c" value="30" />
      </p-chart-set>
    </renderless>
  `)

  const output = Adapter.getDatasets(vnodes)

  expect(output).toStrictEqual({
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
    ],
    datasets: [
      {
        label: 'Success',
        data : [
          '30',
          '20',
          '100',
          '80',
          '150',
        ],
        borderColor: [
          '#23b242',
          '#23b242',
          '#23b242',
          '#23b242',
          '#23b242',
        ],
        backgroundColor: [
          '#23b242',
          '#23b242',
          '#23b242',
          '#23b242',
          '#23b242',
        ],
      },
      {
        label: 'Failed',
        data : [
          '10',
          '10',
          '25',
          '20',
          '30',
        ],
        borderColor: [
          '#e42e2c',
          '#e42e2c',
          '#e42e2c',
          '#e42e2c',
          '#e42e2c',
        ],
        backgroundColor: [
          '#e42e2c',
          '#e42e2c',
          '#e42e2c',
          '#e42e2c',
          '#e42e2c',
        ],
      },
    ],
  })
})

it('should randomly color by name (hashing color) if color not provided', () => {
  const vnodes = renderVnode(`
    <renderless>
      <p-chart-set name="January">
        <p-chart-val name="success" value="30"  />
        <p-chart-val name="failed" value="10" />
      </p-chart-set>
      <p-chart-set name="February">
        <p-chart-val name="success" value="20"  />
        <p-chart-val name="failed" value="10" />
      </p-chart-set>
      <p-chart-set name="March">
        <p-chart-val name="success" value="100"  />
        <p-chart-val name="failed" value="25" />
      </p-chart-set>
      <p-chart-set name="April">
        <p-chart-val name="success" value="80"  />
        <p-chart-val name="failed" value="20" />
      </p-chart-set>
      <p-chart-set name="May">
        <p-chart-val name="success" value="150"  />
        <p-chart-val name="failed" value="30" />
      </p-chart-set>
    </renderless>
  `)

  const output = Adapter.getDatasets(vnodes)

  expect(output).toStrictEqual({
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
    ],
    datasets: [
      {
        label: 'Success',
        data : [
          '30',
          '20',
          '100',
          '80',
          '150',
        ],
        borderColor: [
          '#737373',
          '#737373',
          '#737373',
          '#737373',
          '#737373',
        ],
        backgroundColor: [
          '#737373',
          '#737373',
          '#737373',
          '#737373',
          '#737373',
        ],
      },
      {
        label: 'Failed',
        data : [
          '10',
          '10',
          '25',
          '20',
          '30',
        ],
        borderColor: [
          '#F5A623',
          '#F5A623',
          '#F5A623',
          '#F5A623',
          '#F5A623',
        ],
        backgroundColor: [
          '#F5A623',
          '#F5A623',
          '#F5A623',
          '#F5A623',
          '#F5A623',
        ],
      },
    ],
  })
})
