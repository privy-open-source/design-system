import accept from './accept'

it('should filter nothing if accept is empty', () => {
  const file1 = new File(['12345679'], 'notes.txt', { type: 'text/plain' })
  const file2 = new File(['12345679'], 'notes.txt', { type: 'text/plain' })
  const file3 = new File(['12345679'], 'notes.txt', { type: 'text/plain' })

  const files = [
    file1,
    file2,
    file3,
  ]

  const output = accept('', files)

  expect(output).toHaveLength(3)
  expect(output).toStrictEqual(files)
})

it('should filtering out not matched file', () => {
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

  const output = accept('text/plain', files)

  expect(output).toHaveLength(1)
  expect(output).toStrictEqual([file4])
})

it('should accept asterick format', () => {
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

  const output = accept('image/*', files)

  expect(output).toHaveLength(3)
  expect(output).toStrictEqual([
    file1,
    file2,
    file3,
  ])
})

it('should accept extension', () => {
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

  const output = accept('.png,.jpg', files)

  expect(output).toHaveLength(2)
  expect(output).toStrictEqual([file1, file2])
})
