import { buildFreshAvaialbleYear } from './build-fresh-available-year'
import type { AvailableYear, MonthDate, MonthRange } from '../constants'
import { sortMonthDate } from './sort-month-date'
export const buildYearListFromMonths: (args: {
  availableMonthList?: MonthDate[]
  availableMonthRange?: MonthRange
}) => AvailableYear[] = (args) => {
  const { availableMonthList, availableMonthRange } = args
  const yearList: number[] = []
  let sortedMonthList: MonthDate[] = []

  if (availableMonthList && availableMonthList.length > 0) {
    // if availableMonthList is provided - use it
    sortedMonthList = availableMonthList.sort(sortMonthDate)
    sortedMonthList.forEach((m) => {
      if (!yearList.includes(m.year)) {
        yearList.push(m.year)
      }
    })
  } else if (availableMonthRange) {
    // availableMonthRange is only used if no availableMonthList is supplied
    sortedMonthList = [
      availableMonthRange?.start,
      availableMonthRange.end,
    ].sort(sortMonthDate)
    for (
      let year = sortedMonthList[0].year;
      year <= sortedMonthList[1].year;
      year++
    ) {
      yearList.push(year)
    }
  }
  const availableYearList: AvailableYear[] = []
  yearList.forEach((year) => {
    availableYearList.push(buildFreshAvaialbleYear(year))
  })

  if (availableMonthList && availableMonthList.length > 0) {
    sortedMonthList?.forEach((m) => {
      availableYearList.forEach((year) => {
        if (m.year === year.year) {
          year.monthList.forEach((month) => {
            if (m.month === month.month) {
              month.available = true
              month.selected = true
            }
          })
        }
      })
    })
  } else if (availableMonthRange) {
    if (sortedMonthList?.length !== 2) {
      throw new Error(
        `avaialbleMonthRange supplied with ${sortedMonthList.length} items - 2 are required.`,
      )
    }
    let active = false
    const start = sortedMonthList[0]
    const end = sortedMonthList[1]
    availableYearList.forEach((year) => {
      year.monthList.forEach((month) => {
        if (start.month === month.month && start.year === year.year) {
          active = true
        }
        if (active) {
          month.available = true
          month.selected = true
        }
        if (end.month === month.month && end.year === year.year) {
          active = false
        }
      })
    })
  }
  return availableYearList
}
