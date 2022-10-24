import { getByTestId, getByText } from '@testing-library/vue'
import showToast from '.'

it('should be able to show notify', async () => {
  await showToast({
    title: 'This is title',
    text : 'This is message body',
  })

  const toast = getByTestId(document.body, 'toast')
  const title = getByText(document.body, 'This is title')
  const text  = getByText(document.body, 'This is message body')

  expect(toast).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})
