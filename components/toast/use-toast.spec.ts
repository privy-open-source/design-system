import { getByTestId, getByText } from '@testing-library/vue'
import { nextTick } from 'vue-demi'
import showToast from './use-toast'

it('should be able to show notify', async () => {
  showToast({
    title: 'This is title',
    text : 'This is message body'
  })

  await nextTick()

  const toast = getByTestId(document.body, 'toast')
  const title = getByText(document.body, 'This is title')
  const text  = getByText(document.body, 'This is message body')

  expect(toast).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})
