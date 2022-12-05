import type { MonthDate } from './month-date'
export interface AvailableMonthDate extends MonthDate {
  available: boolean
  selected: boolean
}
