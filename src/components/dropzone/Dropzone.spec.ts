import { fireEvent, render } from '@testing-library/vue'
import { vi } from 'vitest'
import { ref } from 'vue-demi'
import Dropzone from './Dropzone.vue'
import { until } from '@vueuse/core'

beforeAll(() => {
  process.env.VTL_SKIP_WARN_EVENT_UPDATE = '1'
})

afterEach(() => {
  vi.resetAllMocks()
})

afterAll(() => {
  delete process.env.VTL_SKIP_WARN_EVENT_UPDATE
})

it('should render properly without any props', () => {
  const screen = render({
    components: { Dropzone },
    template  : '<Dropzone />',
  })

  const dropzone = screen.getByTestId('dropzone')

  expect(dropzone).toBeInTheDocument()
  expect(dropzone).toHaveClass('dropzone')
})

it('should trigger browse file if `browse` from slot is called', async () => {
  const fileBrowse = vi.spyOn(HTMLInputElement.prototype, 'click')

  const screen = render({
    components: { Dropzone },
    template  : `
      <Dropzone>
        <template #default="{ browse }">
          <button @click="browse">Browse</button>
        </template>
      </Dropzone>
    `,
  })

  const button = screen.queryByText('Browse')

  await fireEvent.click(button)

  expect(fileBrowse).toBeCalled()
})

it('isHover should true if dropzone hovered and false when mouse leave', async () => {
  const screen = render({
    components: { Dropzone },
    template  : `
      <Dropzone>
        <template #default="{ isHover }">
          <span data-testid="is-hover">
            {{ isHover ? 'hovered' : 'unhovered' }}
          </span>
        </template>
      </Dropzone>
    `,
  })

  const dropzone = screen.queryByTestId('dropzone')
  const span     = screen.queryByTestId('is-hover')

  expect(span).toHaveTextContent('unhovered')
  expect(dropzone).not.toHaveClass('dropzone--hover')

  await fireEvent.mouseOver(dropzone)

  expect(span).toHaveTextContent('hovered')
  expect(dropzone).toHaveClass('dropzone--hover')

  await fireEvent.mouseOut(dropzone)

  expect(span).toHaveTextContent('unhovered')
  expect(dropzone).not.toHaveClass('dropzone--hover')
})

it('isDragover should true if file dragged over', async () => {
  const screen = render({
    components: { Dropzone },
    template  : `
      <Dropzone>
        <template #default="{ isDragover }">
          <span data-testid="is-dragover">
            {{ isDragover ? 'dragged' : 'undragged' }}
          </span>
        </template>
      </Dropzone>
    `,
  })

  const dropzone = screen.queryByTestId('dropzone')
  const span     = screen.queryByTestId('is-dragover')

  expect(span).toHaveTextContent('undragged')
  expect(dropzone).not.toHaveClass('dropzone--dragover')

  await fireEvent.dragEnter(dropzone)

  expect(span).toHaveTextContent('dragged')
  expect(dropzone).toHaveClass('dropzone--dragover')

  await fireEvent.dragLeave(dropzone)

  expect(span).toHaveTextContent('undragged')
  expect(dropzone).not.toHaveClass('dropzone--dragover')
})

it('should emit `change` if user selecting file', async () => {
  const onChange = vi.fn()
  const screen   = render({
    components: { Dropzone },
    template  : `
      <Dropzone @change="onChange" />
    `,
    setup () {
      return { onChange }
    },
  })

  const input = screen.queryByTestId('dropzone-input')
  const file  = new File(['abcdefghijkl'], 'notes.txt', { type: 'text/plain' })
  const files = [file]

  await fireEvent.change(input, { target: { files } })

  expect(onChange).toBeCalled()
  expect(onChange).lastCalledWith(file)
})

it('should emit `change` if user drop file', async () => {
  const onChange = vi.fn()
  const screen   = render({
    components: { Dropzone },
    template  : `
      <Dropzone @change="onChange" />
    `,
    setup () {
      return { onChange }
    },
  })

  const zone  = screen.queryByTestId('dropzone')
  const file  = new File(['abcdefghijkl'], 'notes.txt', { type: 'text/plain' })
  const files = [file]

  await fireEvent.drop(zone, { dataTransfer: { files } })

  expect(onChange).toBeCalled()
  expect(onChange).lastCalledWith(file)
})

it('should emit `cancel` if user selecting nothing', async () => {
  const onCancel = vi.fn()
  const screen   = render({
    components: { Dropzone },
    template  : `
      <Dropzone @cancel="onCancel" />
    `,
    setup () {
      return { onCancel }
    },
  })

  const input = screen.queryByTestId('dropzone-input')
  const files = []

  await fireEvent.change(input, { target: { files } })

  expect(onCancel).toBeCalled()
})

it('should mutate value in v-model when user selecting file', async () => {
  const model  = ref()
  const screen = render({
    components: { Dropzone },
    template  : `
      <Dropzone v-model="model" />
    `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('dropzone-input')
  const file  = new File(['abcdefghijkl'], 'notes.txt', { type: 'text/plain' })
  const files = [file]

  await fireEvent.change(input, { target: { files } })

  expect(model.value).toStrictEqual(file)
})

it('should mutate value in v-model when user selecting file', async () => {
  const model  = ref()
  const screen = render({
    components: { Dropzone },
    template  : `
      <Dropzone v-model="model" />
    `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('dropzone-input')
  const file  = new File(['abcdefghijkl'], 'notes.txt', { type: 'text/plain' })
  const files = [file]

  await fireEvent.change(input, { target: { files } })

  expect(model.value).toStrictEqual(file)
})

it('should format to base64 if using v-model.base64', async () => {
  const model  = ref()
  const screen = render({
    components: { Dropzone },
    template  : `
      <Dropzone v-model.base64="model" />
    `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('dropzone-input')
  const file  = new File(['abcdefghijkl'], 'notes.txt', { type: 'text/plain' })
  const files = [file]

  await fireEvent.change(input, { target: { files } })
  await until(model).changed()

  expect(model.value).toBe('data:text/plain;base64,YWJjZGVmZ2hpamts')
})

it('should return an array if props multiple set to true', async () => {
  const model  = ref()
  const screen = render({
    components: { Dropzone },
    template  : `
      <Dropzone v-model="model" multiple />
    `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('dropzone-input')
  const file1 = new File(['abcdefghijkl'], 'notes.txt', { type: 'text/plain' })
  const file2 = new File(['123456789000'], 'notes.txt', { type: 'text/plain' })
  const files = [file1, file2]

  await fireEvent.change(input, { target: { files } })

  expect(model.value).toStrictEqual(files)
})

it('should formal all files if props multiple set to true and using v-model.base64', async () => {
  const model  = ref()
  const screen = render({
    components: { Dropzone },
    template  : `
      <Dropzone v-model.base64="model" multiple />
    `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('dropzone-input')
  const file1 = new File(['abcdefghijkl'], 'notes.txt', { type: 'text/plain' })
  const file2 = new File(['123456789000'], 'notes.txt', { type: 'text/plain' })
  const files = [file1, file2]

  await fireEvent.change(input, { target: { files } })
  await until(model).changed()

  expect(model.value).toStrictEqual(['data:text/plain;base64,YWJjZGVmZ2hpamts', 'data:text/plain;base64,MTIzNDU2Nzg5MDAw'])
})

it('should not process files if type is not accepted', async () => {
  const model  = ref()
  const screen = render({
    components: { Dropzone },
    template  : `
      <Dropzone v-model="model" multiple accept=".txt" />
    `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('dropzone-input')
  const file1 = new File(['12345679'], 'notes.png', { type: 'image/png' })
  const file2 = new File(['12345679'], 'notes.jpg', { type: 'image/jpg' })
  const file3 = new File(['12345679'], 'notes.gif', { type: 'image/gif' })
  const file4 = new File(['12345679'], 'notes.txt', { type: 'text/plain' })

  const files = [
    file1,
    file2,
    file3,
    file4,
  ]

  await fireEvent.change(input, { target: { files } })

  expect(model.value).toStrictEqual([file4])
})

it('should append files every input change', async () => {
  const model  = ref()
  const screen = render({
    components: { Dropzone },
    template  : `
      <Dropzone v-model="model" multiple="append" />
    `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('dropzone-input')
  const file1 = new File(['12345679'], 'notes.png', { type: 'image/png' })
  const file2 = new File(['12345679'], 'notes.jpg', { type: 'image/jpg' })

  const files = [file1, file2]

  await fireEvent.change(input, { target: { files } })

  expect(model.value).toStrictEqual([file1, file2])

  await fireEvent.change(input, { target: { files } })

  expect(model.value).toStrictEqual([
    file1,
    file2,
    file1,
    file2,
  ])
})

it('should limiting files if maxlength provided', async () => {
  const model  = ref()
  const screen = render({
    components: { Dropzone },
    template  : `
      <Dropzone v-model="model" multiple="append" maxlength="3" />
    `,
    setup () {
      return { model }
    },
  })

  const input = screen.queryByTestId('dropzone-input')
  const file1 = new File(['12345679'], 'notes.png', { type: 'image/png' })
  const file2 = new File(['12345679'], 'notes.jpg', { type: 'image/jpg' })

  const files = [file1, file2]

  await fireEvent.change(input, { target: { files } })

  expect(model.value).toStrictEqual([file1, file2])

  await fireEvent.change(input, { target: { files } })

  expect(model.value).toStrictEqual([
    file1,
    file2,
    file1,
  ])
})
