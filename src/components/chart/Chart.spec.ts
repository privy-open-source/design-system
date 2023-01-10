import { createChart, updateChart } from './__mocks__/use-chart'
import { render } from '@testing-library/vue'
import { vi } from 'vitest'
import { ref } from 'vue-demi'
import { delay } from 'nanodelay'
import pChart from './Chart.vue'
import pChartSet from './ChartSet.vue'
import pChartVal from './ChartVal.vue'

vi.mock('./utils/use-chart.ts', () => {
  return { createChart }
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

  await delay(1)

  const canvas = screen.queryByTestId('chart-canvas')

  expect(createChart).toBeCalledTimes(1)
  expect(createChart).lastCalledWith(canvas, 'line', {
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
  }, {
    plugins: {
      legend: {
        display : true,
        position: 'bottom',
        labels  : {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
        border: { color: '#BFBFBF' },
      },
      y: {
        ticks: {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
        border: { color: '#BFBFBF', dash: [4] },
      },
    },
  })

  isShow.value = true
  await delay(1)

  expect(updateChart).toBeCalledTimes(1)
  expect(updateChart).lastCalledWith({
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

  const canvas = screen.queryByTestId('chart-canvas')

  expect(createChart).toBeCalledTimes(1)
  expect(createChart).lastCalledWith(canvas, 'line', {
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
  }, {
    plugins: {
      legend: {
        display : true,
        position: 'bottom',
        labels  : {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
        border: { color: '#BFBFBF' },
      },
      y: {
        ticks: {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
        border: { color: '#BFBFBF', dash: [4] },
      },
    },
  })

  variant.value = 'pie'
  await delay(1)

  expect(createChart).toBeCalledTimes(2)
  expect(createChart).lastCalledWith(canvas, 'pie', {
    labels  : ['Success', 'Failed'],
    datasets: [
      {
        label          : 'January',
        data           : ['30', '10'],
        backgroundColor: ['#23b242', '#e42e2c'],
      },
    ],
  }, {
    plugins: {
      legend: {
        display : true,
        position: 'bottom',
        labels  : {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
      },
    },
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

  const canvas = screen.queryByTestId('chart-canvas')

  expect(createChart).toBeCalledTimes(1)
  expect(createChart).lastCalledWith(canvas, 'line', {
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
  }, {
    plugins: {
      legend: {
        display : true,
        position: 'left',
        labels  : {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
        border: { color: '#BFBFBF' },
      },
      y: {
        ticks: {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
        border: { color: '#BFBFBF', dash: [4] },
      },
    },
  })

  legend.value = 'none'
  await delay(1)

  expect(createChart).toBeCalledTimes(2)
  expect(createChart).lastCalledWith(canvas, 'line', {
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
  }, {
    plugins: {
      legend: {
        display : false,
        position: undefined,
        labels  : {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
        border: { color: '#BFBFBF' },
      },
      y: {
        ticks: {
          color: '#9CA3AF',
          font : {
            family: 'DM Sans',
            size  : 12,
            weight: '600',
          },
        },
        border: { color: '#BFBFBF', dash: [4] },
      },
    },
  })
})
