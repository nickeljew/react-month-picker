import { css } from '@emotion/react'
import {
  DROPDOWN_HEIGHT_PIXEL_SIZE,
  MonthPickerThemeVar,
  nextButton,
  prevButton,
} from '../../constants'

const monthButton = css`
  box-sizing: border-box;
  display: block;
  text-align: center;
  font-size: 16px;
  border-radius: 0;
  line-height: 2.5rem;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 33.3%;
`

export const calendarIconButton = css`
  label: calendar-icon-button;
  font-family: var(${MonthPickerThemeVar.FONT_FAMILY});
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.3px;
  color: var(${MonthPickerThemeVar.CALENDAR_ICON});
  -moz-appearance: none;
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
  appearance: none;
  background-repeat: no-repeat;
  background-color: var(${MonthPickerThemeVar.CALENDAR_ICON_BACKGROUND});
  border: 1px solid var(${MonthPickerThemeVar.CALENDAR_ICON_BORDER});
  font-weight: 500;
  height: ${DROPDOWN_HEIGHT_PIXEL_SIZE}px;
  padding: 4px 8px;
  padding-right: 26px;
  position: relative;
  text-align: left;
  min-width: 100%;
  width: auto;
  :active {
    border: 1px solid var(${MonthPickerThemeVar.CALENDAR_ICON_BORDER_ACTIVE});
  }
  :focus {
    border: 1px solid var(${MonthPickerThemeVar.CALENDAR_ICON_BORDER_ACTIVE});
    border-radius: 0;
    outline: none;
  }
  :hover {
    border: 1px solid var(${MonthPickerThemeVar.CALENDAR_ICON_BORDER_ACTIVE});
    cursor: pointer;
  }
  :after {
    position: absolute;
    right: 6px;
    top: 4px;
    content: url(/imgs/calendar-icon.svg);
    transition: 0.35s ease-in-out;
  }
`

export const hiddenMonthPicker = css`
  label: hidden-month-picker;
  display: none;
`

export const monthButtonArea = css`
  label: month-button-area;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 8px;
`

export const monthButtonDeselected = css`
  label: month-button-deselected;
  ${monthButton}
  cursor: pointer;
  color: var(${MonthPickerThemeVar.MONTH_BUTTON_TEXT_DESELECTED});
  background-color: var(
    ${MonthPickerThemeVar.MONTH_BUTTON_BACKGROUND_DESELECTED}
  );
  border: 0.5px solid
    var(${MonthPickerThemeVar.MONTH_BUTTON_BACKGROUND_DESELECTED});
`
export const monthButtonSelected = css`
  label: month-button-selected;
  ${monthButton}
  cursor: pointer;
  color: var(${MonthPickerThemeVar.MONTH_BUTTON_TEXT_SELECTED});
  background-color: var(
    ${MonthPickerThemeVar.MONTH_BUTTON_BACKGROUND_SELECTED}
  );
  border: 0.5px solid
    var(${MonthPickerThemeVar.MONTH_BUTTON_BACKGROUND_SELECTED});
`
export const monthButtonUnavailable = css`
  label: month-button-unavailable;
  ${monthButton}
  color: var(${MonthPickerThemeVar.MONTH_BUTTON_TEXT_UNAVAILABLE});
  cursor: not-allowed;
  background-color: var(
    ${MonthPickerThemeVar.MONTH_BUTTON_BACKGROUND_UNAVAILABLE}
  );
  border: 0.5px solid
    var(${MonthPickerThemeVar.MONTH_BUTTON_BACKGROUND_UNAVAILABLE});
`

export const monthPickerContainer = css`
  label: month-picker-container;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 299px;
  margin-left: 8px;
  border: 1px solid var(${MonthPickerThemeVar.CONTAINER_BORDER});
`

export const monthPickerOverlayHidden = css`
  label: hidden;
  display: none;
`

export const monthPickerOverlay = css`
  label: overlay;
  height: 100vh;
  width: 100vw;
  background-color: var(${MonthPickerThemeVar.OVERLAY_BACKGROUND});
  opacity: 0.25;
  position: fixed;
  z-index: 40;
  top: 0;
  right: 0;
`

export const nextMonthButton = css`
  label: next-month-button;
  ${nextButton}
  border: none;
  background-color: transparent;
  :disabled {
    :hover {
      border: none;
    }
  }
`

export const prevMonthButton = css`
  label: prev-month-button;
  ${prevButton}
  border: none;
  background-color: transparent;
  :disabled {
    :hover {
      border: none;
    }
  }
`

export const visibleMonthPicker = css`
  label: visible-month-picker;
  box-sizing: border-box;
  width: 100%;
  z-index: 50;
  background-color: var(${MonthPickerThemeVar.VISIBLE_MONTH_PICKER_BACKGROUND});
  box-shadow: 0 6px 14px 0 rgb(0 0 0 / 20%);
  margin: 0 auto;
  padding: 1.25rem 0.75rem;
`

export const yearDisplayRow = css`
  label: year-display-row;
  display: flex;
  flex-direction: row;
  background-color: var(${MonthPickerThemeVar.YEAR_ROW_BACKGROUND});
`

export const yearTitle = css`
  label: year-title;
  font-family: var(${MonthPickerThemeVar.FONT_FAMILY});
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 1.25px;
  font-size: 16px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`
