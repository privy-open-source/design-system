import { render } from '@testing-library/vue'
import pFormGroup from './FormGroup.vue'
import { ref, nextTick } from 'vue-demi'

it('should mounted properly', () => {
  const screen = render({
    components: { pFormGroup },
    template  : '<p-form-group />',
  })

  const formGroup = screen.queryByTestId('form-group')

  expect(formGroup).toBeInTheDocument()
})

it('should able to show label', () => {
  const screen = render({
    components: { pFormGroup },
    template  : '<p-form-group label="Lorem Ipsum" />',
  })

  const label = screen.queryByTestId('form-group-label')

  expect(label).toBeInTheDocument()
  expect(label).toHaveTextContent('Lorem Ipsum')
})

it('should able to show caption if prop `caption` was provided', () => {
  const screen = render({
    components: { pFormGroup },
    template  : `
      <p-form-group
        label="Lorem Ipsum"
        caption="This is caption"
      />
    `,
  })

  const caption = screen.queryByTestId('form-group-caption')

  expect(caption).toBeInTheDocument()
  expect(caption).toHaveTextContent('This is caption')
})

it('should able to show description if prop `description` was provided', () => {
  const screen = render({
    components: { pFormGroup },
    template  : `
      <p-form-group
        label="Lorem Ipsum"
        description="This is description"
      />
    `,
  })

  const description = screen.queryByTestId('form-group-description')

  expect(description).toBeInTheDocument()
  expect(description).toHaveTextContent('This is description')
})

it('should able to show hint icon if prop `hint` was provided', () => {
  const screen = render({
    components: { pFormGroup },
    template  : `
      <p-form-group
        label="Lorem Ipsum"
        hint="This is tooltip hint"
      />
    `,
  })

  const hint = screen.queryByTestId('form-group-hint')

  expect(hint).toBeInTheDocument()
})

it('should able to show required badge if prop `required` was provided', () => {
  const screen = render({
    components: { pFormGroup },
    template  : `
      <p-form-group
        label="Lorem Ipsum"
        required
      />
    `,
  })

  const required = screen.queryByTestId('form-group-required')

  expect(required).toBeInTheDocument()
})

it('should able to show error if prop `error` was provided, and replacing the description', () => {
  const screen = render({
    components: { pFormGroup },
    template  : `
      <p-form-group
        label="Lorem Ipsum"
        error="Error, fix this please"
        description="This is description"
      />
    `,
  })

  const error       = screen.queryByTestId('form-group-error')
  const description = screen.queryByTestId('form-group-description')

  expect(error).toBeInTheDocument()
  expect(error).toHaveTextContent('Error, fix this please')
  expect(description).not.toBeInTheDocument()
})

it('should render with horizontal layout if prop `horizontal` was provided', () => {
  const screen = render({
    components: { pFormGroup },
    template  : `
      <p-form-group
        label="Lorem Ipsum"
        horizontal
      />
    `,
  })

  const formGroup = screen.queryByTestId('form-group')

  expect(formGroup).toBeInTheDocument()
  expect(formGroup).toHaveClass('form-group--horizontal')
})

it('should able to show error icon if prop `error-icon` was provided and prop `error` provided too', async () => {
  const errMsg = ref('Please fill this field')
  const screen = render({
    components: { pFormGroup },
    template  : `
      <p-form-group
        label="Lorem Ipsum"
        description="This is description"
        :error="errMsg"
        error-icon
      />
    `,
    setup () {
      return { errMsg }
    },
  })

  const errorIcon = screen.queryByTestId('form-group-error-icon')

  expect(errorIcon).toBeInTheDocument()

  errMsg.value = ''
  await nextTick()

  expect(errorIcon).not.toBeInTheDocument()
})
