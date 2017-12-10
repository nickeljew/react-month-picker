'use strict';

/**
 * Month-Picker
 *
 * Properties:
 * @years:
 *  - array: [2013, 2015, 2016]
 *  - number: 5 (last 4 years and this year)
 *  - object: {min: 2013, max: 2016} (from 2013 to 2016); {min: 2013} (from 2013 to this year); {max: 2015} (5 years to 2015)
 * @value: default value for picking a single month, e.g. {year: 2015: month: 11}
 * @range: default value for picking a span of months, e.g. {from: {year: 2014: month: 7}, to: {year: 2015: month: 11}}
 * @lang: language texts
 *  - array: array of months' texts, e.g. ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
 *  - object: including array of months' texts and other display texts
 *      e.g. {from: "From:", to: "To:", months: [...]}
 * @theme: theme setting of month-picker; 2 options (light/dark); default theme is light
 */




import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tappable from 'react-tapper'


const isBrowser = (typeof window !== "undefined" && typeof document !== "undefined")


const __MIN_VALID_YEAR = 1970


function mapToArray(num, callback) {
    let arr = []
    for (let i = 0; i <  num; i++) {
        arr.push( callback(i) )
    }
    return arr
}

function getYearMon(year, min, max) {
    let ym = typeof year === 'object' && year.year ? {year: year.year, month: year.month} : {year}
    ym.min = min || 1
    ym.max = max || 12
    return ym
}

function getYearsByNum(n, minYear) {
    let maxYear = (new Date()).getFullYear()
    // n is number of years
    if (n && n > 0 && n < 1000) {
        minYear = minYear || (maxYear - n + 1)
    }
    // n is invalid value
    else {
        // n is max year
        if (n && n >= 1000)
            maxYear = n

        if (minYear) {
            n = maxYear - minYear + 1
        } else {
            n = 5
            minYear = maxYear - n + 1
        }
    }
    return mapToArray(n, i => {
        return getYearMon(minYear + i)
    })
}

function getYearArray(years) {
    if (Array.isArray(years))
        return years.map((y, i) => {
            return getYearMon(y)
        })
    if ((typeof years === 'object')) {
        let n = 0, min = 0
            , ymin = getYearMon(years.min), ymax = getYearMon(years.max)
        if ((typeof ymin.year === 'number') && ymin.year > __MIN_VALID_YEAR)
            min = ymin.year
        if ((typeof ymax.year === 'number') && ymax.year >= min)
            n = ymax.year
        let arr = getYearsByNum(n, min)
            , last = arr.length - 1
        if (last >= 0) {
            arr[0].min = ymin.month || arr[0].month
            arr[last].max = ymax.month || arr[last].month
        }
        return arr
    }
    else if (typeof years === 'number' && years > 0)
        return getYearsByNum(years)
    else
        return getYearsByNum(5)
}





export default class MonthPicker extends Component {
    static propTypes = {
        years: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.number]),
        value: PropTypes.object,
        range: PropTypes.object,
        lang: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
        onChange: PropTypes.func,
        onYearChange: PropTypes.func,
        onShow: PropTypes.func,
        onDismiss: PropTypes.func,
        onClickAway: PropTypes.func,
        theme: PropTypes.string,
        show: PropTypes.bool,
    }
    static defaultProps = {
        years: getYearsByNum(5),
        onChange(year, month, idx) {},
        theme: 'light',
        show: false,
    }

    constructor(props, context) {
        super(props, context)

        const yearArr = getYearArray(this.props.years)
            , yearIndexes = [0]
            , values = this.validValues(this.props.range || this.props.value, yearArr, yearIndexes)
        this.state = {
            years: yearArr,
            values: values,
            labelYears: [false, false],
            showed: this.props.show,
            closeable: this.props.show, //special, must not be changed with setState
            yearIndexes: yearIndexes,
            lastRange: this.props.range,
            lastValue: this.props.value,
        }

        this._handleOverlayTouchTap = this._handleOverlayTouchTap.bind(this)
        this.handleClickMonth = this.handleClickMonth.bind(this)
        this.goPrevYear = this.goPrevYear.bind(this)
        this.goNextYear = this.goNextYear.bind(this)
        this._keyDown = this._keyDown.bind(this)
    }

    validate(d, years, idx, yearIndexes) {
        let now = new Date()
            , thisYear = now.getFullYear()
            , ym
        if (d && (typeof d.year === 'number') && d.year > __MIN_VALID_YEAR
            && (typeof d.month === 'number') && d.month >= 1 && d.month <= 12) {
            ym = d
        }

        let foundThisYear
        for (let i = 0; i < years.length; i++) {
            if (ym && years[i].year === ym.year) {
                yearIndexes[idx] = i
                return ym
            }
            else if (years[i].year === thisYear) {
                foundThisYear = i
            }
        }

        if (typeof foundThisYear === 'number') {
            yearIndexes[idx] = foundThisYear
            return { year: thisYear }
        }

        const last = yearIndexes[idx] = years.length - 1
        return { year: years[last].year }

    }
    validValues(v, years, yearIndexes) {
        if (!v)
            return []
        if (v.from || v.to) {
            let from = this.validate(v.from, years, 0, yearIndexes)
                , to = this.validate(v.to, years, 1, yearIndexes)
            if (from.year > to.year || (from.year === to.year && from.month > to.month)) {
                from.year = to.year
                from.month = to.month
                if (from.month < 1) {
                    from.year--
                    from.month += 12
                }
            }
            return [from, to]
        }
        return [this.validate(v, years, 0, yearIndexes)]
    }

    value() {
        const values = this.state.values
        if (values.length >= 2)
            return { from: values[0], to: values[1] }
        else if (values.length === 1)
            return values[0]
        return {}
    }


    componentWillReceiveProps(nextProps) {
        const yearArr = getYearArray(nextProps.years)
            , yearIndexes = this.state.yearIndexes
            , nextValues = nextProps.range || nextProps.value //|| this.props.range || this.props.value
            , values = this.validValues(nextValues, yearArr, yearIndexes)
        this.setState({
            years: yearArr,
            values: values,
            labelYears: [false, false],
            yearIndexes: yearIndexes,
            lastRange: nextProps.range,
            lastValue: nextProps.value,
            showed: nextProps.show,
            closeable: nextProps.show,
        })
    }

    componentDidMount () {
        if (isBrowser) {
            document.addEventListener('keydown', this._keyDown)
        }
    }
    componentWillUnmount () {
        if (isBrowser) {
            document.removeEventListener('keydown', this._keyDown)
        }
    }

    optionPad(padIndex) {
        let values = this.state.values
            , value = values[padIndex]
            , labelYears = this.state.labelYears
            , labelYear = labelYears[padIndex] = labelYears[padIndex] || value.year
            , ymArr = this.state.years
            , lang = this.props.lang || []
            , months =  Array.isArray(lang) ? lang : (Array.isArray(lang.months) ? lang.months : [])
            , prevCss = '', nextCss = ''
            , yearMaxIdx = ymArr.length - 1
            , yearIdx = this.state.yearIndexes[padIndex]//yearMaxIdx

        if (yearIdx === 0) prevCss = 'disable'
        if (yearIdx === yearMaxIdx) nextCss = 'disable'

        let yearActive = (labelYear === value.year)
            , atMinYear = (labelYear === ymArr[0].year)
            , atMaxYear = (labelYear === ymArr[yearMaxIdx].year)
            , otherValue = false
        if (values.length > 1) {
            otherValue = values[1 - padIndex]
        }

        let labelTextKey = padIndex === 0 ? 'from' : 'to'
            , labelPreText
        if (otherValue && this.props.lang[labelTextKey]) {
            labelPreText = <b>{this.props.lang[labelTextKey]}</b>
        }

        return (
            <div className="rmp-pad" key={padIndex}>
                <div>
                    <label>{labelPreText}{labelYear}</label>
                    <i className={["rmp-tab", "rmp-btn", "prev", prevCss].join(' ')} data-id={padIndex} onClick={this.goPrevYear}>{'<'}</i>
                    <i className={["rmp-tab", "rmp-btn", "next", nextCss].join(' ')} data-id={padIndex} onClick={this.goNextYear}>{'>'}</i>
                </div>
                <ul>
                    {
                        mapToArray(12, i => {
                            let css = ''
                                , m = i + 1
                            if (yearActive && m === value.month) {
                                css = 'active'
                            }
                            if (atMinYear && m < ymArr[0].min) {
                                css = 'disable'
                            }
                            if (atMaxYear && m > ymArr[yearMaxIdx].max) {
                                css = 'disable'
                            }
                            if (otherValue) {
                                let y = otherValue.year, m = otherValue.month || 0
                                    , vy = labelYear, vm = i + 1
                                if (y === vy && m && ( (padIndex === 0 && vm > m) || (padIndex === 1 && vm < m) )) {
                                    css = 'disable'
                                }
                                else if ((y > vy && padIndex === 1) || (y < vy && padIndex === 0)) {
                                    css = 'disable'
                                }
                            }
                            let clickHandler = css !== 'disable' ? this.handleClickMonth : undefined
                            return (
                                <li key={i} className={["rmp-btn", css].join(' ')}
                                    data-id={padIndex + ':' + (i+1)}
                                    onClick={clickHandler}>{months.length > i ? months[i] : i}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }

    render() {
        const pads = []
        let popupClass = ''
        if (this.state.values.length > 1) {
            pads.push( this.optionPad(0), this.optionPad(1) )
            popupClass = 'range'
        }
        else {
            pads.push( this.optionPad(0) )
        }

        return (
            <div className={["month-picker", this.props.className].join(' ')}>
                {this.props.children}
                <div className={["rmp-container", "rmp-table", this.props.className, (this.state.showed ? "show" : '')].join(' ')}>
                    <Tappable className="rmp-overlay" onTap={this._handleOverlayTouchTap} />
                    <div className="rmp-cell">
                        <div className={["rmp-popup", popupClass , this.props.theme, (this.state.showed ? "show" : '')].join(' ')}>
                            {pads}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    dismiss() {
        if (this.state.closeable) {
            this._onDismiss()
        }
    }

    show() {
        // prevent rapid show/hide
        this._onShow()
    }

    _handleOverlayTouchTap(e) {
        if (this.state.closeable) {
            this._onDismiss()
            this.props.onClickAway && this.props.onClickAway(e)
        }
    }

    _onShow() {
        setTimeout(function() {this.state.closeable = true;}.bind(this), 250)
        this.setState({ showed: true })
        this.props.onShow && this.props.onShow()
    }

    _onDismiss(s) {
        this.setState(Object.assign({showed: false, loading: false}, s))
        this.props.onDismiss && this.props.onDismiss(this.value())
    }

    handleClickMonth(e) {
        if (this.state.showed) {
            const refid = this.getDID(e).split(':')
                , idx = parseInt(refid[0], 10)
                , month = parseInt(refid[1], 10)
                , year = this.state.labelYears[idx]
                , values = this.state.values
            values[idx] = { year, month }
            this.setState({ values: values })
            this.props.onChange(year, month, idx)
        }
    }

    goPrevYear(e) {
        let idx = parseInt(this.getDID(e), 10)
        if (this.state.yearIndexes[idx] > 0) {
            this.setYear(idx, -1)
        }
    }
    goNextYear(e) {
        let idx = parseInt(this.getDID(e), 10)
        if (this.state.yearIndexes[idx] < (this.state.years.length - 1)) {
            this.setYear(idx, 1)
        }
    }
    setYear(idx, step) {
        let yearIndex = (this.state.yearIndexes[idx] += step)
            , labelYears = this.state.labelYears
            , theYear = this.state.years[yearIndex].year
        labelYears[idx] = theYear
        this.setState({
            labelYears: labelYears
        })
        this.props.onYearChange && this.props.onYearChange(theYear)
    }

    getDID(e) {
        let el = e.target
        return el.dataset ? el.dataset.id : el.getAttribute('data-id')
    }

    _reset() {
        const values = this.validValues(this.state.lastRange || this.state.lastValue, this.state.years, this.state.yearIndexes)
        return {values}
    }

    _keyDown(e) {
        if (!this.state.showed)
            return

        if (e.key === 'Escape') {
            this._onDismiss(this._reset())
            e.stopPropagation()
        }
        else if (e.key === 'Enter') {
            this._onDismiss()
            e.stopPropagation()
        }
        else if (this.state.values.length === 1) {
            //console.log(e.key, e.keyCode)
            // const value = this.state.values[0]
            //     , year = value.year
            // let month = value.month
            // if (e.key === 'ArrowLeft') {
            //     month--
            // }
            // else if (e.key === 'ArrowRight') {
            //     month++
            // }
            // else if (e.key === 'ArrowUp') {
            //     month -= 3
            // }
            // else if (e.key === 'ArrowDown') {
            //     month += 3
            // }
            // if (month > 0 && month < 13 && month !== value.month) {
            //     this.setState({ values: [{ year, month }] })
            //     this.props.onChange(year, month, 0)
            //     e.stopPropagation()
            // }
        }
    }
}
