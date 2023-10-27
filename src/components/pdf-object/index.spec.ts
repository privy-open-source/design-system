import { round } from 'lodash-es'
import { nextTick, reactive } from 'vue-demi'
import type { PdfObjectSize } from '.'
import { useSizeModel } from '.'

describe('useSizeModel', () => {
  it('should return ref from prop width and height', () => {
    const refs = useSizeModel({
      width : 198,
      height: 106,
    })

    expect(refs.width.value).toBe(198)
    expect(refs.height.value).toBe(106)
  })

  it('should return ref minWidth and minHeight, value is half of width and height', () => {
    const refs = useSizeModel({
      width : 198,
      height: 106,
    })

    expect(refs.minWidth.value).toBe(198 / 2)
    expect(refs.minHeight.value).toBe(106 / 2)
  })

  it('should return ref maxWidth and maxHeight, value is twice of width and height', () => {
    const refs = useSizeModel({
      width : 198,
      height: 106,
    })

    expect(refs.maxWidth.value).toBe(198 * 2)
    expect(refs.maxHeight.value).toBe(106 * 2)
  })

  it('should return ref ratio from prop width and height', () => {
    const refs = useSizeModel({
      width : 198,
      height: 106,
    })

    expect(refs.ratio.value).toBe(round(430 / 230, 2))
  })

  it('should sync when prop minWidth and minHeight changed', async () => {
    const props = reactive<PdfObjectSize>({
      width    : 100,
      height   : 100,
      minWidth : 50,
      minHeight: 50,
    })

    const refs = useSizeModel(props)

    expect(refs.minWidth.value).toBe(50)
    expect(refs.minHeight.value).toBe(50)

    props.minWidth = 75
    await nextTick()

    props.minHeight = 25
    await nextTick()

    expect(refs.minWidth.value).toBe(75)
    expect(refs.minHeight.value).toBe(25)
  })

  it('should sync when prop maxWidth and maxHeight changed', async () => {
    const props = reactive<PdfObjectSize>({
      width    : 100,
      height   : 100,
      minWidth : 200,
      minHeight: 200,
    })

    const refs = useSizeModel(props)

    expect(refs.maxWidth.value).toBe(200)
    expect(refs.maxHeight.value).toBe(200)

    props.maxWidth = 300
    await nextTick()

    props.maxHeight = 250
    await nextTick()

    expect(refs.maxWidth.value).toBe(300)
    expect(refs.maxHeight.value).toBe(250)
  })
})
