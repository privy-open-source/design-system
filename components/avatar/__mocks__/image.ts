export default function MockImage () {
  const et = new EventTarget()

  let src = ''

  Object.defineProperty(et, 'src', {
    get () {
      return src
    },
    set (value: string) {
      src = value

      if (value !== '' && value !== '/broken-link.jpg')
        et.dispatchEvent(new Event('load'))
      else
        et.dispatchEvent(new Event('error'))
    },
  })

  return et
}
