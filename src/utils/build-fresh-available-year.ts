import { MONTHS_IN_YEAR } from '../constants'
import type { AvailableYear } from '../constants'

export const buildFreshAvaialbleYear = (year: number) => {
  const availableYear: AvailableYear = {
    year,
    monthList: [],
  }
  for (let i = 0; i < MONTHS_IN_YEAR; i++) {
    availableYear.monthList.push({
      year,
      month: i,
      available: false,
      selected: false,
    })
  }
  return availableYear
}
