import { queryByTestId, queryByText } from '@testing-library/vue'
import Sample from './__mocks__/Sample.vue'
import { resetInstance } from '../global/use-singleton'
import showNotify from '.'

afterEach(async () => {
  await resetInstance()
})

it('should be able to show notify', async () => {
  await showNotify({
    component: Sample,
    props    : { text: 'Hello World!' },
  })

  const notify = queryByTestId(document.body, 'sample')
  const text   = queryByText(document.body, 'Hello World!')

  expect(notify).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})
