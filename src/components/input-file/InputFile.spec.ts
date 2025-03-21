import { fireEvent, render } from '@testing-library/vue'
import { ref } from 'vue-demi'
import pInputFile from './InputFile.vue'
import IconEmail from '@privyid/persona-icon/vue/email/20.vue'

it('should render properly', () => {
  const screen = render({
    components: { pInputFile },
    template  : `
        <pInputFile />
      `,
    setup () {
      return {}
    },
  })

  const inputFile = screen.queryByTestId('input-file')

  expect(inputFile).toBeInTheDocument()
})

it('should has disabled state if prop `disabled` was provided', () => {
  const screen = render({
    components: { pInputFile },
    template  : `
        <pInputFile disabled />
      `,
    setup () {
      return {}
    },
  })

  const inputFile = screen.queryByTestId('input-file')

  expect(inputFile).toBeInTheDocument()
  expect(inputFile).toHaveClass('input-file--disabled')
})

it('should has readonly state if prop `readonly` was provided', () => {
  const screen = render({
    components: { pInputFile },
    template  : `
        <pInputFile readonly />
      `,
    setup () {
      return {}
    },
  })

  const inputFile = screen.queryByTestId('input-file')

  expect(inputFile).toBeInTheDocument()
  expect(inputFile).toHaveClass('input-file--readonly')
})

it('should has error state if prop `error` was provided', () => {
  const screen = render({
    components: { pInputFile },
    template  : `
        <pInputFile error />
      `,
    setup () {
      return {}
    },
  })

  const inputFile = screen.queryByTestId('input-file')

  expect(inputFile).toBeInTheDocument()
  expect(inputFile).toHaveClass('input-file--error')
})

it('should show file name if v-model has value', () => {
  const file   = new File(['abcdefghijkl'], 'notes.txt', { type: 'text/plain' })
  const model  = ref(file)
  const screen = render({
    components: { pInputFile },
    template  : `
        <pInputFile v-model="model" />
      `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('input')

  expect(input).toBeInTheDocument()
  expect(input).toHaveValue('notes.txt')
})

it('should show file name if v-model has value (multiple)', () => {
  const file1  = new File(['abcdefghijkl'], 'notes.txt', { type: 'text/plain' })
  const file2  = new File(['123456789000'], 'alpha.txt', { type: 'text/plain' })
  const model  = ref([file1, file2])
  const screen = render({
    components: { pInputFile },
    template  : `
        <pInputFile v-model="model" multiple />
      `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('input')

  expect(input).toBeInTheDocument()
  expect(input).toHaveValue('notes.txt, alpha.txt')
})

it('should able to clear using prop `clearable`', async () => {
  const file   = new File(['abcdefghijkl'], 'notes.txt', { type: 'text/plain' })
  const model  = ref(file)
  const screen = render({
    components: { pInputFile },
    template  : `
        <pInputFile v-model="model" clearable />
      `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('input')
  const clear = screen.queryByTestId('input-clear')

  expect(input).toBeInTheDocument()
  expect(clear).toBeInTheDocument()
  expect(input).toHaveValue('notes.txt')

  await fireEvent.click(clear)

  expect(input).toHaveValue('')
  expect(model.value).toBeUndefined()
})

it('should able to append content using slot `append`', () => {
  const screen = render({
    components: { pInputFile, IconEmail },
    template  : `
        <pInputFile>
          <template #append>
            <IconEmail data-testid="append-icon" />
          </template>
        </pInputFile>
      `,
    setup () {
      return {}
    },
  })

  const icon = screen.queryByTestId('append-icon')

  expect(icon).toBeInTheDocument()
})
