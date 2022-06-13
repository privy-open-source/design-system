import { render, fireEvent } from '@testing-library/vue'
import { vi } from 'vitest'
import Modal from './Modal.vue'
import Button from '../button/Button.vue'

it('should render properly without any props', () => {
  const screen = render({
    components: { Modal },
    template  : `
      <Modal>Modal</Modal>
    `,
  })

  const modal = screen.queryByTestId('modal')
  const text  = screen.queryByText('Modal')

  expect(modal).toBeInTheDocument()
  expect(modal).toHaveClass('modal')
  expect(text).toBeInTheDocument()
})

it('should have no close button if props "dismissable" set to false', () => {
  const screen = render({
    components: { Modal },
    template  : `
      <Modal :dismissable="false">
        Modal
      </Modal>
    `,
  })

  const dismiss = screen.queryByTestId('modal-dismiss')

  expect(dismiss).not.toBeInTheDocument()
})

it('should emit event "close" if close button clicked', async () => {
  const spy    = vi.fn()
  const screen = render({
    components: { Modal },
    template  : `
      <Modal
        title="Modal Title"
        @close="onDismissed">
        Modal Text
      </Modal>
    `,
    methods: { onDismissed: spy },
  })

  const modal = screen.queryByTestId('modal')
  const close = screen.queryByTestId('modal-dismiss')

  expect(modal).toBeInTheDocument()
  expect(close).toBeInTheDocument()
  expect(spy).not.toBeCalled()

  await fireEvent.click(close)

  expect(spy).toBeCalled()
})

it('Modal will close if `Escape` button was pressed', async () => {
  const screen = render({
    components: { Modal },
    template  : `
      <Modal
        title="Modal Title">
        Modal Text
      </Modal>
    `,
  })

  const modal = screen.queryByTestId('modal')
  const text  = screen.queryByText('Modal Text')

  expect(modal).toBeInTheDocument()
  expect(text).toBeInTheDocument()

  await fireEvent.keyDown(window, { key: 'Escape' })

  expect(modal).toHaveAttribute('style', 'display: none;')
})

it('should be able to add Modal Header via slot "header"', () => {
  const screen = render({
    components: { Modal, Button },
    template  : `
      <Modal>
        <template #header>
          Modal Title
        </template>
        Modal Text
      </Modal>
    `,
  })

  const modalHeader = screen.queryByTestId('modal-header')
  const text        = screen.queryByText('Modal Title')
  const body        = screen.queryByText('Modal Text')

  expect(modalHeader).toBeInTheDocument()
  expect(modalHeader).toHaveClass('modal__header')
  expect(text).toBeInTheDocument()
  expect(body).toBeInTheDocument()
})

it('should be able to add Modal Footer via slot "footer"', () => {
  const screen = render({
    components: { Modal, Button },
    template  : `
      <Modal 
        title="Modal Title">
        Modal Text
        <template #footer>
          <Button>Button Text</Button>
        </template>
      </Modal>
    `,
  })

  const modalFooter = screen.queryByTestId('modal-footer')
  const text        = screen.queryByText('Modal Text')
  const action      = screen.queryByText('Button Text')

  expect(modalFooter).toBeInTheDocument()
  expect(modalFooter).toHaveClass('modal__footer')
  expect(text).toBeInTheDocument()
  expect(action).toBeInTheDocument()
})

it('If "no-close-on-backdrop" props is true, Modal will not close while modal backdrop is clicked', async () => {
  const screen = render({
    components: { Modal },
    template  : `
      <Modal 
        no-close-on-backdrop
        title="Modal Title">
        Modal Text
      </Modal>
    `,
  })

  const modal = screen.queryByTestId('modal')
  const text  = screen.queryByText('Modal Text')

  expect(modal).toBeInTheDocument()
  expect(text).toBeInTheDocument()

  await fireEvent.click(modal)

  expect(modal).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})

it('If "no-close-on-esc" props is true, Modal will not close while modal esc is pressed', async () => {
  const screen = render({
    components: { Modal },
    template  : `
      <Modal 
        no-close-on-backdrop
        title="Modal Title">
        Modal Text
      </Modal>
    `,
  })

  const modal = screen.queryByTestId('modal')
  const text  = screen.queryByText('Modal Text')

  expect(modal).toBeInTheDocument()
  expect(text).toBeInTheDocument()

  await fireEvent.keyDown(window, { key: 'Escape' })

  expect(modal).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})
