import { render, fireEvent } from '@testing-library/vue'
import { delay } from 'nanodelay'
import { vi } from 'vitest'
import { ref, nextTick } from 'vue-demi'
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

it('should be able to add Modal Title via props "title"', () => {
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
  const title = screen.queryByText('Modal Title')

  expect(modal).toBeInTheDocument()
  expect(title).toBeInTheDocument()
})

it('should be able to add Modal Text via props "text"', () => {
  const screen = render({
    components: { Modal },
    template  : `
      <Modal
        title="Modal Title"
        text="Modal Text" />
    `,
  })

  const modal = screen.queryByTestId('modal')
  const text  = screen.queryByText('Modal Text')

  expect(modal).toBeInTheDocument()
  expect(text).toBeInTheDocument()
})

it('should have no close button if props "dismissable" set to false', () => {
  const screen = render({
    components: { Modal },
    template  : `
      <Modal :dismissable="false">
        <p>Modal</p>
      </Modal>
    `,
  })

  const dismiss = screen.queryByTestId('modal-dismiss')

  expect(dismiss).not.toBeInTheDocument()
})

it('should emit event "close" if close button clicked', async () => {
  const model  = ref(false)
  const spy    = vi.fn()
  const screen = render({
    components: { Modal },
    template  : `
      <Modal
        v-model="model"
        title="Modal Title"
        @close="onDismissed">
        Modal Text
      </Modal>
    `,
    methods: { onDismissed: spy },
    setup () {
      return { model }
    },
  })

  let modal   = screen.queryByTestId('modal')
  const close = screen.queryByTestId('modal-dismiss')

  expect(modal).toBeInTheDocument()
  expect(close).toBeInTheDocument()
  expect(spy).not.toBeCalled()

  model.value = true
  await nextTick()

  modal = screen.queryByTestId('modal')
  expect(modal).toBeVisible()

  await fireEvent.click(close)
  await delay(0)

  modal = screen.queryByTestId('modal')
  expect(spy).toBeCalled()
  expect(modal).not.toBeVisible()
})

it('Modal will close if `Escape` button was pressed', async () => {
  const model  = ref(false)
  const screen = render({
    components: { Modal },
    template  : `
      <Modal
        v-model="model"
        title="Modal Title">
        Modal Text
      </Modal>
    `,
    setup () {
      return { model }
    },
  })

  let modal  = screen.queryByTestId('modal')
  const text = screen.queryByText('Modal Text')

  expect(modal).toBeInTheDocument()
  expect(modal).not.toBeVisible()
  expect(text).toBeInTheDocument()

  model.value = true
  await nextTick()

  modal = screen.queryByTestId('modal')
  expect(modal).toBeVisible()

  await fireEvent.keyDown(window, { key: 'Escape' })
  await delay(0)

  modal = screen.queryByTestId('modal')
  expect(modal).not.toBeVisible()
})

it('Modal will close when click outisde or when modal backdrop was clicked', async () => {
  const model  = ref(false)
  const screen = render({
    components: { Modal },
    template  : `
      <Modal
        v-model="model"
        title="Modal Title">
        Modal Text
      </Modal>
    `,
    setup () {
      return { model }
    },
  })

  let modal  = screen.queryByTestId('modal')
  const text = screen.queryByText('Modal Text')

  expect(modal).toBeInTheDocument()
  expect(modal).not.toBeVisible()
  expect(text).toBeInTheDocument()

  model.value = true
  await nextTick()

  modal = screen.queryByTestId('modal')
  expect(modal).toBeVisible()

  await fireEvent.click(modal)
  await delay(0)

  modal = screen.queryByTestId('modal')
  expect(modal).not.toBeVisible()
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

it('If "no-close-on-backdrop" props is true, Modal will not close while modal backdrop was clicked', async () => {
  const model  = ref(false)
  const screen = render({
    components: { Modal },
    template  : `
      <Modal v-model="model"
        no-close-on-backdrop
        title="Modal Title">
        <p>Modal Text</p>
      </Modal>
    `,
    setup () {
      return { model }
    },
  })

  let modal = screen.queryByTestId('modal')
  expect(modal).toBeInTheDocument()
  expect(modal).not.toBeVisible()

  model.value = true
  await nextTick()

  await fireEvent.click(modal)
  await delay(0)

  modal = screen.queryByTestId('modal')
  expect(modal).toBeVisible()
})

it('If "no-close-on-esc" props is true, Modal will not close while modal esc was pressed', async () => {
  const model  = ref(false)
  const screen = render({
    components: { Modal },
    template  : `
      <Modal
        v-model="model"
        no-close-on-esc
        title="Modal Title">
        Modal Text
      </Modal>
    `,
    setup () {
      return { model }
    },
  })

  let modal  = screen.queryByTestId('modal')
  const text = screen.queryByText('Modal Text')

  expect(modal).toBeInTheDocument()
  expect(text).toBeInTheDocument()
  expect(modal).not.toBeVisible()

  model.value = true
  await nextTick()

  await fireEvent.keyDown(window, { key: 'Escape' })
  await delay(0)

  modal = screen.queryByTestId('modal')
  expect(modal).toBeVisible()
})

it('should have style `modal-body-scrollable` when props "modal-body-scrollable" set to true', () => {
  const screen = render({
    components: { Modal },
    template  : `
      <Modal
        title="Modal Title"
        modal-body-scrollable>
        Modal Text
      </Modal>
    `,
  })

  const modal     = screen.queryByTestId('modal')
  const modalBody = screen.queryByTestId('modal-body')

  expect(modal).toBeInTheDocument()
  expect(modalBody).toHaveClass('modal__body', 'modal__body--scroll')
})

it('should have style `lg` if size props set to `lg`', () => {
  const screen = render({
    components: { Modal },
    template  : `
      <Modal
        title="Modal Title"
        size="lg">
        Modal Text
      </Modal>
    `,
  })

  const modal = screen.queryByTestId('modal')

  expect(modal).toBeInTheDocument()
  expect(modal).toHaveClass('modal--lg')
})

it('should have style `center` if setting the centered prop', () => {
  const screen = render({
    components: { Modal },
    template  : `
      <Modal
        title="Modal Title"
        centered>
        Modal Text
      </Modal>
    `,
  })

  const modal = screen.queryByTestId('modal')

  expect(modal).toBeInTheDocument()
  expect(modal).toHaveClass('modal--centered')
})

it('should have style `banner` if setting the banner prop', () => {
  const screen = render({
    components: { Modal },
    template  : `
      <Modal
        title="Modal Title"
        banner>
        Modal Text
      </Modal>
    `,
  })

  const modal = screen.queryByTestId('modal')

  expect(modal).toBeInTheDocument()
  expect(modal).toHaveClass('modal--banner')
})
