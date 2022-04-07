export default class MockImage extends EventTarget {
  constructor() {
    super()

    Object.defineProperty(this, 'src', {
      set (value: string) {
        if (value && value !== '/broken-link.jpg')
          this.dispatchEvent(new Event('load'))
        else
          this.dispatchEvent(new Event('error'))
      }
    })
  }
}
