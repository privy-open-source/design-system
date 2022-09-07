import { chartRender, MockChart } from './__mocks__/chart.js'
import { render } from '@testing-library/vue'
import { vi } from 'vitest'
import { ref } from 'vue-demi'
import pChart from './Chart.vue'
import pChartSet from './ChartSet.vue'
import pChartVal from './ChartVal.vue'
import { delay } from 'nanodelay'

vi.mock('chart.js/auto', () => {
  return { default: MockChart }
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should render properly', () => {
  const screen = render({
    components: {
      pChart,
      pChartSet,
      pChartVal,
    },
    template: `
      <p-chart>
        <p-chart-set name="January">
          <p-chart-val name="success" color="#23b242" value="30"  />
          <p-chart-val name="failed" color="#e42e2c" value="10" />
        </p-chart-set>
      </p-chart>
    `,
  })

  const chart = screen.queryByTestId('chart')

  expect(chart).toBeInTheDocument()
})

it('should have style `pie` if `variant`\'s prop set to `pie`', () => {
  const screen = render({
    components: {
      pChart,
      pChartSet,
      pChartVal,
    },
    template: `
      <p-chart variant="pie">
        <p-chart-set name="January">
          <p-chart-val name="success" color="#23b242" value="30"  />
          <p-chart-val name="failed" color="#e42e2c" value="10" />
        </p-chart-set>
      </p-chart>
    `,
  })

  const chart = screen.queryByTestId('chart')

  expect(chart).toBeInTheDocument()
  expect(chart).toHaveClass('chart--pie')
  expect(chart).not.toHaveClass('chart--line')
})

it('should have style `left` if `legend`\'s prop set to `left`', () => {
  const screen = render({
    components: {
      pChart,
      pChartSet,
      pChartVal,
    },
    template: `
      <p-chart legend="left">
        <p-chart-set name="January">
          <p-chart-val name="success" color="#23b242" value="30"  />
          <p-chart-val name="failed" color="#e42e2c" value="10" />
        </p-chart-set>
      </p-chart>
    `,
  })

  const chart = screen.queryByTestId('chart')

  expect(chart).toBeInTheDocument()
  expect(chart).toHaveClass('chart--left')
  expect(chart).not.toHaveClass('chart--bottom')
})

it('should re-render if data changed', async () => {
  const isShow = ref(false)
  const screen = render({
    components: {
      pChart,
      pChartSet,
      pChartVal,
    },
    template: `
      <p-chart variant="line">
        <p-chart-set name="January">
          <p-chart-val name="success" color="#23b242" value="30"  />
          <p-chart-val name="failed" color="#e42e2c" value="10" />
        </p-chart-set>
        <p-chart-set v-if="isShow" name="February">
          <p-chart-val name="success" color="#23b242" value="20"  />
          <p-chart-val name="failed" color="#e42e2c" value="10" />
        </p-chart-set>
      </p-chart>
    `,
    setup () {
      return { isShow }
    },
  })

  const chart = screen.queryByTestId('chart')

  expect(chart).toBeInTheDocument()
  expect(chart).toHaveClass('chart--line')
  expect(chart).not.toHaveClass('chart--pie')

  expect(chartRender).toBeCalledTimes(1)
  expect(chartRender).lastCalledWith({
    labels  : ['January'],
    datasets: [
      {
        label          : 'Success',
        data           : ['30'],
        borderColor    : ['#23b242'],
        backgroundColor: ['#23b242'],
      },
      {
        label          : 'Failed',
        data           : ['10'],
        borderColor    : ['#e42e2c'],
        backgroundColor: ['#e42e2c'],
      },
    ],
  })

  isShow.value = true
  await delay(1)

  expect(chartRender).toBeCalledTimes(2)
  expect(chartRender).lastCalledWith({
    labels  : ['January', 'February'],
    datasets: [
      {
        label          : 'Success',
        data           : ['30', '20'],
        borderColor    : ['#23b242', '#23b242'],
        backgroundColor: ['#23b242', '#23b242'],
      },
      {
        label          : 'Failed',
        data           : ['10', '10'],
        borderColor    : ['#e42e2c', '#e42e2c'],
        backgroundColor: ['#e42e2c', '#e42e2c'],
      },
    ],
  })
})

it('should re-render if variant changed', async () => {
  const variant = ref('line')
  const screen  = render({
    components: {
      pChart,
      pChartSet,
      pChartVal,
    },
    template: `
      <p-chart :variant="variant">
        <p-chart-set name="January">
          <p-chart-val name="success" color="#23b242" value="30"  />
          <p-chart-val name="failed" color="#e42e2c" value="10" />
        </p-chart-set>
      </p-chart>
    `,
    setup () {
      return { variant }
    },
  })

  await delay(1)

  const chart = screen.queryByTestId('chart')

  expect(chart).toBeInTheDocument()
  expect(chart).toHaveClass('chart--line')
  expect(chart).not.toHaveClass('chart--pie')

  expect(chartRender).toBeCalledTimes(1)
  expect(chartRender).lastCalledWith({
    labels  : ['January'],
    datasets: [
      {
        label          : 'Success',
        data           : ['30'],
        borderColor    : ['#23b242'],
        backgroundColor: ['#23b242'],
      },
      {
        label          : 'Failed',
        data           : ['10'],
        borderColor    : ['#e42e2c'],
        backgroundColor: ['#e42e2c'],
      },
    ],
  })

  variant.value = 'pie'
  await delay(1)

  expect(chartRender).toBeCalledTimes(2)
  expect(chartRender).lastCalledWith({
    labels  : ['Success', 'Failed'],
    datasets: [
      {
        label          : 'January',
        data           : ['30', '10'],
        backgroundColor: ['#23b242', '#e42e2c'],
      },
    ],
  })
})

it('should re-render if variant changed', async () => {
  const legend = ref('left')
  const screen = render({
    components: {
      pChart,
      pChartSet,
      pChartVal,
    },
    template: `
      <p-chart :legend="legend">
        <p-chart-set name="January">
          <p-chart-val name="success" color="#23b242" value="30"  />
          <p-chart-val name="failed" color="#e42e2c" value="10" />
        </p-chart-set>
      </p-chart>
    `,
    setup () {
      return { legend }
    },
  })

  await delay(1)

  const chart = screen.queryByTestId('chart')

  expect(chart).toBeInTheDocument()
  expect(chart).toHaveClass('chart--line')
  expect(chart).not.toHaveClass('chart--pie')

  expect(chartRender).toBeCalledTimes(1)

  legend.value = 'none'
  await delay(1)

  expect(chartRender).toBeCalledTimes(2)
})
