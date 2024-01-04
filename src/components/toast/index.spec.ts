import { getByTestId, getByText } from '@testing-library/vue'
import showToast from '.'

it('should be able to show notify', async () => {
  await showToast({ text: 'This is message body' })

  const toast = getByTestId(document.body, 'toast')
  const text  = getByText(document.body, 'This is message body')

  expect(toast).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})
