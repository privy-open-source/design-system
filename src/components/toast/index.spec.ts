import { queryByTestId, queryByText } from '@testing-library/vue'
import showToast from '.'
import { resetInstance } from '../global/use-singleton'
import { nextTick } from 'vue-demi'

afterEach(async () => {
  await resetInstance()
})

it('should be able to show notify', async () => {
  await showToast({ text: 'This is message body' })

  const toast = queryByTestId(document.body, 'toast')
  const text  = queryByText(document.body, 'This is message body')

  expect(toast).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})

it('should be able to show notify using shorthand', async () => {
  await showToast('This is message body')

  const toast = queryByTestId(document.body, 'toast')
  const text  = queryByText(document.body, 'This is message body')

  expect(toast).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})

it('should be to show popup instead if type or variant was provide (backward compability)', async () => {
  await showToast({
    text   : 'This is message body',
    type   : 'info',
    variant: 'filled',
  })

  const toast = queryByTestId(document.body, 'toast')
  const popup = queryByTestId(document.body, 'popup')
  const text  = queryByTestId(document.body, 'popup-text')

  expect(toast).not.toBeInTheDocument()
  expect(popup).toBeInTheDocument()
  expect(text).toBeInTheDocument()
  expect(text).toHaveTextContent('This is message body')
})

it('should use `title` as `text` if `text` was not provided but `title` was (backward compability)', async () => {
  await showToast({ title: 'This is message body' })

  const toast = queryByTestId(document.body, 'toast')
  const text  = queryByTestId(document.body, 'toast-text')

  expect(toast).toBeInTheDocument()
  expect(text).toBeInTheDocument()
  expect(text).toHaveTextContent('This is message body')
})

it('should able to show toast with progress using `.withProgress`', async () => {
  const toast = await showToast.withProgress({ text: 'Uploading', loadingText: '0%' })

  const loading = queryByTestId(document.body, 'toast-loading')
  const spinner = queryByTestId(document.body, 'toast-loading-spinner')
  const text    = queryByTestId(document.body, 'toast-loading-text')

  expect(loading).toBeInTheDocument()
  expect(spinner).toBeInTheDocument()
  expect(text).toHaveTextContent('0%')

  toast.setProgress('78%')
  await nextTick()

  expect(text).toHaveTextContent('78%')
})

it('should able to show toast with progress using `.withProgress` shorthand', async () => {
  const toast = await showToast.withProgress('Uploading...', '0%')

  const loading = queryByTestId(document.body, 'toast-loading')
  const spinner = queryByTestId(document.body, 'toast-loading-spinner')
  const text    = queryByTestId(document.body, 'toast-loading-text')

  expect(loading).toBeInTheDocument()
  expect(spinner).toBeInTheDocument()
  expect(text).toHaveTextContent('0%')

  toast.setProgress('78%')
  await nextTick()

  expect(text).toHaveTextContent('78%')
})
