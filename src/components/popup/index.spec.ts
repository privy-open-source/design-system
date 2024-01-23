import { queryByTestId, queryByText } from '@testing-library/vue'
import showPopup from '.'
import { resetInstance } from '../global/use-singleton'

afterEach(async () => {
  await resetInstance()
})

it('should be able to show popup', async () => {
  await showPopup({
    title: 'This is title',
    text : 'This is message body',
  })

  const popup = queryByTestId(document.body, 'popup')
  const title = queryByText(document.body, 'This is title')
  const text  = queryByText(document.body, 'This is message body')

  expect(popup).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})

it('should be able to show popup using shorthand', async () => {
  await showPopup('This is message body', 'This is title', 'warning')

  const popup = queryByTestId(document.body, 'popup')
  const title = queryByText(document.body, 'This is title')
  const text  = queryByText(document.body, 'This is message body')

  expect(popup).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(text).toBeInTheDocument()
  expect(popup).toHaveClass('popup--warning')
})
