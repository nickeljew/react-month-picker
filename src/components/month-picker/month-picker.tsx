import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  AvailableMonthDate,
  AvailableYear,
  MonthDate,
  MonthRange,
} from '../../constants'
import { MonthPickerType } from '../../constants'
import { buildYearListFromMonths } from '../../utils'
import * as styles from './month-picker.styles'

const MUST_SELECT_AT_LEAST_ONE_MONTH_WARNING =
  'You must select at least one month.'

const getMonthButtonStyles = (month: AvailableMonthDate) => {
  if (!month.available) {
    return styles.monthButtonUnavailable
  } else if (month.selected) {
    return styles.monthButtonSelected
  } else {
    return styles.monthButtonDeselected
  }
}

const monthStringList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const mapMonths = (monthList: MonthDate[], zeroBase?: boolean) => {
  return zeroBase
    ? monthList
    : monthList.map((m) => {
        return {
          month: m.month + 1,
          year: m.year,
        }
      })
}

const getLabelTextFromSelectedValues: (
  selectedMonthList: MonthDate[],
  type: MonthPickerType,
) => string = (selectedMonthList, type) => {
  if (selectedMonthList.length === 0) {
    return '\xa0' // Non-breaking space to keep the input from collapsing
  }
  if (type === MonthPickerType.SINGLE) {
    return `${monthStringList[selectedMonthList[0].month]} ${
      selectedMonthList[0].year
    }`
  }
  if (type === MonthPickerType.RANGE) {
    return `${monthStringList[selectedMonthList[0].month]} ${
      selectedMonthList[0].year
    } - ${monthStringList[selectedMonthList[1].month]} ${
      selectedMonthList[1].year
    }`
  }
  if (type === MonthPickerType.MULTIPLE) {
    const start = selectedMonthList[0]
    const end = selectedMonthList[selectedMonthList.length - 1]
    return selectedMonthList.length === 1
      ? `${monthStringList[start.month]} ${start.year}`
      : `${monthStringList[start.month]} ${start.year} ~ ${
          monthStringList[end.month]
        } ${end.year}`
  }
  return ''
}
export interface MonthPickerProps {
  availableDateStringList: string[]
  availableMonthList?: MonthDate[]
  availableMonthRange?: MonthRange
  onHide: (value: MonthDate[]) => void
  onWarn?: (value: string) => void
  type: MonthPickerType
  zeroBase?: boolean
}
export const MonthPicker: FC<MonthPickerProps> = (props: MonthPickerProps) => {
  const {
    availableDateStringList,
    availableMonthList,
    availableMonthRange,
    onHide,
    onWarn,
    type,
    zeroBase,
  } = props
  const [availableYearList, setAvailableYearList] = useState<AvailableYear[]>(
    [],
  )
  const [yearIndex, setYearIndex] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [selectedMonths, setSelectedMonths] = useState<MonthDate[]>([])
  const [value, setValue] = useState<MonthDate[]>([])

  const isVisibleRef = useRef<boolean>(isVisible)
  const selectedMonthsRef = useRef<MonthDate[]>(selectedMonths)
  const typeRef = useRef<MonthPickerType>(type)

  useEffect(() => {
    isVisibleRef.current = isVisible
  }, [isVisible])
  useEffect(() => {
    typeRef.current = type
  }, [type])

  useEffect(() => {
    let yearList: AvailableYear[] = []
    if (availableDateStringList && availableDateStringList.length > 0) {
      const monthList: MonthDate[] = []
      availableDateStringList.forEach((dateString) => {
        const d = new Date(dateString)
        monthList.push({
          year: d.getUTCFullYear(),
          month: d.getUTCMonth(),
        })
      })
      yearList = buildYearListFromMonths({ availableMonthList: monthList })
    }
    if (availableMonthList && availableMonthList.length > 0) {
      yearList = buildYearListFromMonths({
        availableMonthList,
        availableMonthRange,
      })
    }
    setAvailableYearList(yearList)
  }, [availableDateStringList, availableMonthList, availableMonthRange])

  useEffect(() => {
    selectedMonthsRef.current = selectedMonths
    switch (typeRef.current) {
      case MonthPickerType.SINGLE:
        setValue([selectedMonths[0]])
        break
      case MonthPickerType.MULTIPLE:
        setValue(selectedMonths)
        break
      case MonthPickerType.RANGE:
        setValue([selectedMonths[0], selectedMonths[selectedMonths.length - 1]])
        break
      default:
        console.warn(`Unknown type: ${typeRef.current}`)
        setValue([])
        break
    }
  }, [selectedMonths])

  const handleCloseAttempt = useCallback(() => {
    if (isVisible) {
      if (onHide) {
        if (value.length > 0) {
          setIsVisible(false)
          onHide(mapMonths(value, zeroBase))
        } else if (onWarn) {
          onWarn(MUST_SELECT_AT_LEAST_ONE_MONTH_WARNING)
        }
      }
    }
  }, [isVisible, onHide, onWarn, value, zeroBase])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isVisible) {
        return
      }
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleCloseAttempt()
        e.stopPropagation()
      }
    },
    [handleCloseAttempt, isVisible],
  )

  useEffect(() => {
    document.addEventListener('keydown', (e) => handleKeyDown(e))
    return () => {
      document.removeEventListener('keydown', (e) => handleKeyDown(e))
    }
  }, [handleKeyDown])

  useEffect(() => {
    const selectedMonthList = availableYearList
      .map((y) => y.monthList)
      .flat()
      .filter((m) => m.selected)
    setSelectedMonths(selectedMonthList)
  }, [availableYearList])

  const [canPrevYear, canNextYear, yearTitle, currentMonthList] =
    useMemo(() => {
      let yearTitle = ''
      let currentMonthList: AvailableMonthDate[] = []
      if (
        availableYearList &&
        availableYearList.length > 0 &&
        availableYearList[yearIndex]
      ) {
        yearTitle = `${availableYearList[yearIndex].year}`
        currentMonthList = availableYearList[yearIndex].monthList
      }
      return [
        yearIndex > 0,
        yearIndex + 1 < availableYearList.length,
        yearTitle,
        currentMonthList,
      ]
    }, [availableYearList, yearIndex])
  return (
    <div css={styles.monthPickerContainer}>
      <div
        onClick={(e) => {
          if (selectedMonths.length > 0) e.stopPropagation()
          handleCloseAttempt()
        }}
        css={
          !isVisible
            ? styles.monthPickerOverlayHidden
            : styles.monthPickerOverlay
        }
      />
      <button
        css={styles.calendarIconButton}
        type="button"
        aria-expanded={isVisible}
        onClickCapture={(e) => {
          e.stopPropagation()
          if (isVisible) {
            handleCloseAttempt()
          } else {
            setIsVisible(true)
          }
        }}
      >
        {getLabelTextFromSelectedValues(value, typeRef.current)}
      </button>
      <div
        css={isVisible ? styles.visibleMonthPicker : styles.hiddenMonthPicker}
      >
        <div css={styles.yearDisplayRow}>
          <button
            css={styles.prevMonthButton}
            onClick={() => {
              setYearIndex(yearIndex - 1)
            }}
            disabled={!canPrevYear}
          />
          <div css={styles.yearTitle}>{yearTitle}</div>
          <button
            css={styles.nextMonthButton}
            onClick={() => {
              setYearIndex(yearIndex + 1)
            }}
            disabled={!canNextYear}
          />
        </div>
        <div css={styles.monthButtonArea}>
          {currentMonthList.map((month) => {
            return (
              <div
                key={`${yearIndex}-${month.month}`}
                css={getMonthButtonStyles(month)}
                onClick={() => {
                  if (month.available) {
                    const replacementMonth = {
                      ...month,
                      selected: !month.selected,
                    }
                    const replacementYear = {
                      ...availableYearList[yearIndex],
                      monthList: availableYearList[yearIndex].monthList.slice(),
                    }
                    replacementYear.monthList[month.month] = replacementMonth

                    const replacementYearList = availableYearList.slice()
                    replacementYearList[yearIndex] = replacementYear
                    setAvailableYearList(replacementYearList)
                  }
                }}
              >
                {monthStringList[month.month]}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
