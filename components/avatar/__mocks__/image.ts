export default function MockImage () {
  const et = new EventTarget()

  Object.defineProperty(et, 'src', {
    set (value: string) {
      if (value && value !== '/broken-link.jpg')
        et.dispatchEvent(new Event('load'))
      else
        et.dispatchEvent(new Event('error'))
    }
  })

  return et
}
