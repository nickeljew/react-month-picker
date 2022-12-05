import type { MonthDate } from '../constants'
export const sortMonthDate = (a: MonthDate, b: MonthDate) => {
  if (a.year < b.year) {
    return -1
  } else if (a.year > b.year) {
    return 1
  } else {
    if (a.month < b.month) {
      return -1
    } else if (a.month > b.month) {
      return 1
    } else {
      return 0
    }
  }
}
