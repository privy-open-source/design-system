import { SmoothLine, createLines } from './smooth-line'

describe('SmoothLine', () => {
  it('should be able to smoothing the line', () => {
    const coordinates = [
      2,
      3,
      5,
      7,
      11,
      13,
      17,
      19,
      23,
      29,
      31,
      37,
      41,
      43,
      47,
      53,
    ]

    const expected = [
      0.145,
      0.457_112_499_999_999_9,
      1.012_753_406_249_999_9,
      1.849_668_441_328_125,
      3.119_830_879_763_476_6,
      4.757_010_908_846_254,
      6.831_583_139_039_916,
      9.217_858_228_349_925,
      11.947_112_946_544_314,
      15.162_156_928_610_782,
      18.641_307_438_284_69,
      22.494_696_768_522_633,
      26.630_038_517_227_252,
      30.814_983_492_539_124,
      35.022_482_296_431_14,
      39.376_288_962_761_6,
    ]

    const line   = new SmoothLine(0.5)
    const output = coordinates.map((num) => {
      return line.move(num, num).at(2)
    })

    expect(output).toStrictEqual(expected)
  })
})

describe('createLines', () => {
  it('should be able create array of lines n-times', () => {
    const lines        = createLines(10)
    const isSmoothLine = (item: unknown) => item instanceof SmoothLine

    expect(lines).toSatisfyAll(isSmoothLine)
  })
})
