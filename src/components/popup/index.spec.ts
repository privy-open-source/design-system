import { getByTestId, getByText } from '@testing-library/vue'
import showPopup from '.'

it('should be able to show notify', async () => {
  await showPopup({
    title: 'This is title',
    text : 'This is message body',
  })

  const popup = getByTestId(document.body, 'popup')
  const title = getByText(document.body, 'This is title')
  const text  = getByText(document.body, 'This is message body')

  expect(popup).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})
