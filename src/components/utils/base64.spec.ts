import { vi } from 'vitest'
import { fromBase64, toBase64 } from './base64'

const fr = vi.spyOn(FileReader.prototype, 'readAsDataURL')

describe('toBase64', () => {
  it('should able to encode "File" object to base64-datauri', async () => {
    const file   = new File(['abcdefghijkl'], 'notes.txt', { type: 'text/plain' })
    const result = await toBase64(file)

    expect(result).toBe('data:text/plain;base64,YWJjZGVmZ2hpamts')
  })

  it('should throw error if File Reader got an error', async () => {
    fr.mockImplementation(function () {
      this.dispatchEvent(new Event('error'))
    })

    const file    = new File(['abcdefghijkl'], 'notes.txt', { type: 'text/plain' })
    const promise = toBase64(file)

    expect(promise).toReject()
  })
})

describe('fromBase64', () => {
  it('should able to decode base64 to "File" object', async () => {
    const file   = fromBase64('data:text/plain;base64,YWJjZGVmZ2hpamts')
    const result = await file.text()

    expect(result).toBe('abcdefghijkl')
  })

  it('should able to change name and mimeType of output file', async () => {
    const file = fromBase64('data:text/plain;base64,YWJjZGVmZ2hpamts', 'index.html', 'text/html')

    expect(file.name).toBe('index.html')
    expect(file.type).toBe('text/html')
  })
})
