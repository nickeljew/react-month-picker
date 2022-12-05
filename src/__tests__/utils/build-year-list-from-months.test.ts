import type { MonthRange } from '../../constants'
import { buildYearListFromMonths } from '../../utils/build-year-list-from-months'

describe('buildYearListFromMonths', () => {
  it('handles single year', () => {
    const monthList = [
      {
        month: 5,
        year: 2022,
      },
    ]
    const result = buildYearListFromMonths({ availableMonthList: monthList })
    expect(result.length).toBe(1)
    const resYear = result[0]
    expect(resYear.year).toBe(2022)
    expect(resYear.monthList.length).toBe(12)
    expect(resYear.monthList[0].available).toBe(false)
    expect(resYear.monthList[1].available).toBe(false)
    expect(resYear.monthList[2].available).toBe(false)
    expect(resYear.monthList[3].available).toBe(false)
    expect(resYear.monthList[4].available).toBe(false)
    expect(resYear.monthList[5].available).toBe(true)
    expect(resYear.monthList[6].available).toBe(false)
    expect(resYear.monthList[7].available).toBe(false)
    expect(resYear.monthList[8].available).toBe(false)
    expect(resYear.monthList[9].available).toBe(false)
    expect(resYear.monthList[10].available).toBe(false)
    expect(resYear.monthList[11].available).toBe(false)
  })
  it('handles single year - multiple months', () => {
    const monthList = [
      {
        month: 5,
        year: 2022,
      },
      { month: 8, year: 2022 },
    ]
    const result = buildYearListFromMonths({ availableMonthList: monthList })
    expect(result.length).toBe(1)
    const resYear = result[0]
    expect(resYear.year).toBe(2022)
    expect(resYear.monthList.length).toBe(12)
    expect(resYear.monthList[0].available).toBe(false)
    expect(resYear.monthList[1].available).toBe(false)
    expect(resYear.monthList[2].available).toBe(false)
    expect(resYear.monthList[3].available).toBe(false)
    expect(resYear.monthList[4].available).toBe(false)
    expect(resYear.monthList[5].available).toBe(true)
    expect(resYear.monthList[6].available).toBe(false)
    expect(resYear.monthList[7].available).toBe(false)
    expect(resYear.monthList[8].available).toBe(true)
    expect(resYear.monthList[9].available).toBe(false)
    expect(resYear.monthList[10].available).toBe(false)
    expect(resYear.monthList[11].available).toBe(false)
  })
  it('handles multiple years - multiple months', () => {
    const monthList = [
      {
        month: 11,
        year: 2021,
      },
      { month: 0, year: 2022 },
      { month: 1, year: 2022 },
    ]
    const result = buildYearListFromMonths({ availableMonthList: monthList })
    expect(result.length).toBe(2)
    const resYear = result[0]
    expect(resYear.year).toBe(2021)
    expect(resYear.monthList.length).toBe(12)
    expect(resYear.monthList[0].available).toBe(false)
    expect(resYear.monthList[1].available).toBe(false)
    expect(resYear.monthList[2].available).toBe(false)
    expect(resYear.monthList[3].available).toBe(false)
    expect(resYear.monthList[4].available).toBe(false)
    expect(resYear.monthList[5].available).toBe(false)
    expect(resYear.monthList[6].available).toBe(false)
    expect(resYear.monthList[7].available).toBe(false)
    expect(resYear.monthList[8].available).toBe(false)
    expect(resYear.monthList[9].available).toBe(false)
    expect(resYear.monthList[10].available).toBe(false)
    expect(resYear.monthList[11].available).toBe(true)
    const resYear2 = result[1]
    expect(resYear2.year).toBe(2022)
    expect(resYear2.monthList.length).toBe(12)
    expect(resYear2.monthList[0].available).toBe(true)
    expect(resYear2.monthList[1].available).toBe(true)
    expect(resYear2.monthList[2].available).toBe(false)
    expect(resYear2.monthList[3].available).toBe(false)
    expect(resYear2.monthList[4].available).toBe(false)
    expect(resYear2.monthList[5].available).toBe(false)
    expect(resYear2.monthList[6].available).toBe(false)
    expect(resYear2.monthList[7].available).toBe(false)
    expect(resYear2.monthList[8].available).toBe(false)
    expect(resYear2.monthList[9].available).toBe(false)
    expect(resYear2.monthList[10].available).toBe(false)
    expect(resYear2.monthList[11].available).toBe(false)
  })
  it('handles range - single year', () => {
    const monthRange: MonthRange = {
      start: { month: 0, year: 2022 },
      end: { month: 1, year: 2022 },
    }
    const result = buildYearListFromMonths({ availableMonthRange: monthRange })
    expect(result.length).toBe(1)
    const resYear = result[0]
    expect(resYear.year).toBe(2022)
    expect(resYear.monthList.length).toBe(12)
    expect(resYear.monthList[0].available).toBe(true)
    expect(resYear.monthList[1].available).toBe(true)
    expect(resYear.monthList[2].available).toBe(false)
    expect(resYear.monthList[3].available).toBe(false)
    expect(resYear.monthList[4].available).toBe(false)
    expect(resYear.monthList[5].available).toBe(false)
    expect(resYear.monthList[6].available).toBe(false)
    expect(resYear.monthList[7].available).toBe(false)
    expect(resYear.monthList[8].available).toBe(false)
    expect(resYear.monthList[9].available).toBe(false)
    expect(resYear.monthList[10].available).toBe(false)
    expect(resYear.monthList[11].available).toBe(false)
  })
  it('handles range - multiple year', () => {
    const monthRange: MonthRange = {
      start: { month: 0, year: 2021 },
      end: { month: 7, year: 2022 },
    }
    const result = buildYearListFromMonths({ availableMonthRange: monthRange })
    expect(result.length).toBe(2)
    const resYear = result[0]
    expect(resYear.year).toBe(2021)
    expect(resYear.monthList.length).toBe(12)
    expect(resYear.monthList[0].available).toBe(true)
    expect(resYear.monthList[1].available).toBe(true)
    expect(resYear.monthList[2].available).toBe(true)
    expect(resYear.monthList[3].available).toBe(true)
    expect(resYear.monthList[4].available).toBe(true)
    expect(resYear.monthList[5].available).toBe(true)
    expect(resYear.monthList[6].available).toBe(true)
    expect(resYear.monthList[7].available).toBe(true)
    expect(resYear.monthList[8].available).toBe(true)
    expect(resYear.monthList[9].available).toBe(true)
    expect(resYear.monthList[10].available).toBe(true)
    expect(resYear.monthList[11].available).toBe(true)
    const resYear2 = result[1]
    expect(resYear2.year).toBe(2022)
    expect(resYear2.monthList.length).toBe(12)
    expect(resYear2.monthList[0].available).toBe(true)
    expect(resYear2.monthList[1].available).toBe(true)
    expect(resYear2.monthList[2].available).toBe(true)
    expect(resYear2.monthList[3].available).toBe(true)
    expect(resYear2.monthList[4].available).toBe(true)
    expect(resYear2.monthList[5].available).toBe(true)
    expect(resYear2.monthList[6].available).toBe(true)
    expect(resYear2.monthList[7].available).toBe(true)
    expect(resYear2.monthList[8].available).toBe(false)
    expect(resYear2.monthList[9].available).toBe(false)
    expect(resYear2.monthList[10].available).toBe(false)
    expect(resYear2.monthList[11].available).toBe(false)
  })
  it('handles range in wrong order', () => {
    const monthRange: MonthRange = {
      start: { month: 7, year: 2022 },
      end: { month: 0, year: 2021 },
    }
    const result = buildYearListFromMonths({ availableMonthRange: monthRange })
    expect(result.length).toBe(2)
    const resYear = result[0]
    expect(resYear.year).toBe(2021)
    expect(resYear.monthList.length).toBe(12)
    const resYear2 = result[1]
    expect(resYear2.year).toBe(2022)
    expect(resYear2.monthList.length).toBe(12)
  })
})
