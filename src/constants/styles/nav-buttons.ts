import { css } from '@emotion/react'
import { MonthPickerThemeVar } from '../theming'
import { DROPDOWN_HEIGHT_PIXEL_SIZE } from '../strings'
const navButton = css`
  background: var(${MonthPickerThemeVar.NAV_BUTTON_BACKGROUND});
  border: 1px solid var(${MonthPickerThemeVar.NAV_BUTTON_BORDER}); //needs to be repalced with new theme
  border-radius: 1px;
  cursor: pointer;
  height: ${DROPDOWN_HEIGHT_PIXEL_SIZE}px;
  margin-left: 4px;
  width: 36px;
  :after {
    background-size: 9px;
    content: url(/imgs/chevron-left.svg);
    margin-left: 2px;
  }
  :disabled {
    background-size: 9px;
    background: var(${MonthPickerThemeVar.NAV_BUTTON_BACKGROUND_DISABLED});
    margin-left: 4px;
    cursor: not-allowed;
    :after {
      content: url(/imgs/chevron-left-disabled.svg);
    }
    :hover {
      border: 1px solid var(${MonthPickerThemeVar.NAV_BUTTON_BORDER_HOVER}); //needs to be repalced with new theme
    }
  }
  :hover {
    border: 1px solid var(${MonthPickerThemeVar.NAV_BUTTON_BORDER_HOVER});
  }
`

export const nextButton = css`
  label: next-button;
  ${navButton}
  transform: rotate(180deg);
`

export const prevButton = css`
  label: prev-button;
  ${navButton}
`
