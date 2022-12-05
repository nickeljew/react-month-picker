import type { MonthDate } from '../../constants'
import { sortMonthDate } from '../../utils/sort-month-date'

describe('sortMonthDate', () => {
  it('sorts monthDates', () => {
    const list: MonthDate[] = [
      {
        month: 7,
        year: 2002,
      },
      {
        month: 10,
        year: 1999,
      },
      {
        month: 6,
        year: 2002,
      },
    ]
    const result = list.sort(sortMonthDate)
    expect(result[0].year).toBe(1999)
    expect(result[1].month).toBe(6)
  })
  it('can be called with only one date', () => {
    const list: MonthDate[] = [
      {
        month: 7,
        year: 2002,
      },
    ]
    const result = list.sort(sortMonthDate)
    expect(result[0].year).toBe(2002)
    expect(result[0].month).toBe(7)
  })
  it('can sort multiple identical dates', () => {
    const list: MonthDate[] = [
      {
        month: 7,
        year: 2002,
      },
      {
        month: 10,
        year: 1999,
      },
      {
        month: 6,
        year: 2002,
      },
      {
        month: 7,
        year: 2002,
      },
    ]
    const result = list.sort(sortMonthDate)
    expect(result.length).toBe(4)
    expect(result[0].year).toBe(1999)
    expect(result[0].month).toBe(10)
    expect(result[2].year).toBe(2002)
    expect(result[2].month).toBe(7)
    expect(result[3].year).toBe(2002)
    expect(result[3].month).toBe(7)
  })
})
