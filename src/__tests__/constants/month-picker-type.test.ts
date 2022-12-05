import { MonthPickerType } from './../../constants/enums/month-picker-type'
describe('month-picker-type', () => {
  it('enum values as strings', () => {
    expect(MonthPickerType.MULTIPLE).toBe('multi')
    expect(MonthPickerType.RANGE).toBe('range')
    expect(MonthPickerType.SINGLE).toBe('single')
  })
})
