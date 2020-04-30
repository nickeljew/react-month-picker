'use strict';

/**
 * Month-Picker
 *
 * Properties:
 * @years:
 *  - array: [2013, 2015, 2016]
 *  - number: 5 (last 4 years and this year)
 *  - object: {min: 2013, max: 2016} (from 2013 to 2016); {min: 2013} (from 2013 to this year); {max: 2015} (5 years to 2015)
 * @value: default value for picking
 *  1: a single month: e.g. { year: 2015: month: 11 }
 *  2: several months: e.g. [ { year: 2015: month: 9 }, { year: 2015: month: 11 } { year: 2016: month: 3 } ]
 *  3: a span of months, e.g. { from: {year: 2014: month: 7}, to: {year: 2015: month: 11} }
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


const __MIN_VALID_YEAR = 1000
const _SINGLE_KEYS = [ 'year', 'month', ]
const _RANGE_KEYS = [ 'from', 'to', ]
const __YEAR = (new Date()).getFullYear()


function mapToArray (num, callback) {
    let arr = []
    for (let i = 0; i <  num; i++) {
        arr.push( callback(i) )
    }
    return arr
}

function getYearMon (year, min, max) {
    let ym = typeof year === 'object' && year.year ? {year: year.year, month: year.month} : (typeof year === 'number' ? {year} : {__YEAR})
    ym.min = min || 1
    ym.max = max || 12
    return ym
}

function getYearsByNum (n, minYear) {
    let maxYear = __YEAR
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

function getYearArray (years) {
    if (Array.isArray(years))
        return years.map((y, i) => {
            return getYearMon(y)
        })
    if ((typeof years === 'object')) {
        let n = 0, min = 0
        const ymin = getYearMon(years.min), ymax = getYearMon(years.max)
        if (ymin.year > __MIN_VALID_YEAR)
            min = ymin.year
        if (ymax.year >= min)
            n = ymax.year
        const arr = getYearsByNum(n, min)
        const last = arr.length - 1
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



function validate (d, years, idx, yearIndexes) {
    let ym
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
        else if (years[i].year === __YEAR) {
            foundThisYear = i
        }
    }

    if (typeof foundThisYear === 'number') {
        yearIndexes[idx] = foundThisYear
        return { year: __YEAR }
    }

    const last = yearIndexes[idx] = years.length - 1
    return { year: years[last].year }

}


function validValue (value, years, yearIndexes) {
    value = value || {}
    if (value.year && value.month) {
        const { year, month, } = validate(value, years, 0, yearIndexes)
        return  { type: 'single', pads: 1, year, month, }
    }
    else if (Array.isArray(value) && value.length > 0) {
        return {
            type: 'multiple', pads: 1,
            choices: value.map( v => validate(v, years, 0, yearIndexes) )
        }
    }
    else if (value.from && value.to) {
        let from = validate(value.from, years, 0, yearIndexes),
            to = validate(value.to, years, 1, yearIndexes)
        if (from.year > to.year || (from.year === to.year && from.month > to.month)) {
            from.year = to.year
            from.month = to.month
            if (from.month < 1) {
                from.year--
                from.month += 12
            }
        }
        return { type: 'range', pads: 2, from, to, }
    }
    return { pads: 0 }
}


// function valueChanged (v1, v2) {
//     if (v1.type !== v2.type) return true
//     const keys = _SINGLE_KEYS
//     const items = keys.concat([ 'choice', ..._RANGE_KEYS, ])
//     for (const i of items) {
//         const x1 = v1[i], x2 = v2[i]
//         if (!x1) continue
//         if (typeof x1 === 'number' && x1 !== x2) return true
//         if (Array.isArray(x1)) {
//             if (!Array.isArray(x2)) return true
//             if (x1.length !== x2.length) return true
//             for (let j = 0; j < x1.length; j++) {
//                 for (const k of keys) {
//                     if (x1[j][k] !== x2[j][k]) return true
//                 }
//             }
//         }
//         if (typeof x1 === 'object' && typeof x2 === 'object') {
//             for (const k of keys) {
//                 if (x1[k] !== x2[k]) return true
//             }
//         }
//     }
//     return false
// }
//
// function cloneValue (v) {
//     if (!v) return v
//     const { year, month, } = v
//     return { year, month, }
// }
//
// function cloneRange (r) {
//     if (!r) return r
//     const { from, to, } = r
//     return {
//         from: cloneValue(from),
//         to: cloneValue(to),
//     }
// }


const TypeYM = PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
})


export default class MonthPicker extends Component {
    static propTypes = {
        years: PropTypes.oneOfType([
            PropTypes.number, // exact number of a year
            PropTypes.arrayOf(PropTypes.number), // array of specific years: [2008, 2011, 2012, 2014, 2016]
            PropTypes.shape({ // { min: 2013 } | { min: {year: 2013, month: 4} } | { min: {year: 2013, month: 4}, max: {year: 2016, month: 9} }
                min: PropTypes.oneOfType([
                    PropTypes.number,
                    TypeYM,
                ]),
                max: PropTypes.oneOfType([
                    PropTypes.number,
                    TypeYM,
                ]),
            }),
        ]),
        value: PropTypes.oneOfType([
            TypeYM,
            PropTypes.arrayOf( TypeYM ),
            PropTypes.shape({
                from: TypeYM,
                to: TypeYM,
            })
        ]),
        lang: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string), // lang texts for months: ['Jan', 'Feb', 'Mar', 'Apr', ... ]
            PropTypes.shape({
                months: PropTypes.arrayOf(PropTypes.string),
                from: PropTypes.string, // lang text for 'from'
                to: PropTypes.string, // lang text for 'to'
            }),
        ]),
        onChange: PropTypes.func,
        onYearChange: PropTypes.func,
        onShow: PropTypes.func,
        onDismiss: PropTypes.func,
        onClickAway: PropTypes.func,
        theme: PropTypes.string,
    }
    static defaultProps = {
        years: getYearsByNum(5),
        onChange(year, month, idx) {},
        theme: 'light',
    }

    constructor(props, context) {
        if (props.range) {
            console.warn('Property "range" is deprecated, and use property "value" instead')
        }
        super(props, context)

        const yearArr = getYearArray(this.props.years)
        const yearIndexes = [0]
        const rawValue = validValue(this.props.value, yearArr, yearIndexes)
        if (!rawValue.type) {
            throw new Error('invalid value of property "value" in month-picker')
        }
        this.state = {
            years: yearArr,
            rawValue,
            labelYears: [false, false],
            showed: false,
            closeable: false,
            yearIndexes,
            // lastValue: cloneValue(this.props.value),
        }
    }


    value() {
        const { year, month, choices, from, to,} = this.state.rawValue
        if (from && to)
            return { from, to,}
        else if (choices && choices.length > 0)
            return choices
        else if (year && month)
            return { year, month,}
        return null
    }



    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     // ...
    // }
    // componentDidUpdate(prevProps, prevState) {
    //     const yearIndexes = this.state.yearIndexes
    //     const rawValue = validValue(props.value, this.state.years, yearIndexes)
    //     if (this.state.showed !== prevState.showed || valueChanged(rawValue, state.rawValue)) {
    //         this.setState({
    //             rawValue,
    //             labelYears: [false, false],
    //             yearIndexes,
    //             showed: this.props.show,
    //             closeable: this.props.show,
    //         })
    //     }
    // }
    // static getDerivedStateFromProps(props, state) {
    //     const yearIndexes = state.yearIndexes
    //     const rawValue = validValue(props.value, state.years, yearIndexes)
    //     if (valueChanged(rawValue, state.rawValue)) {
    //         return {
    //             rawValue,
    //             labelYears: [false, false],
    //             yearIndexes,
    //         }
    //     }
    //     // No state update necessary
    //     return null
    // }

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
        const ymArr = this.state.years
        const ymRange = [ ymArr[0], ymArr[ymArr.length - 1], ]
        const labelYears = this.state.labelYears
        let labelYear = labelYears[padIndex]

        const rawValue = this.state.rawValue
        const values = []
        let isRange = false
        if (rawValue.type === 'single') {
            if (!labelYear) {
                labelYear = labelYears[padIndex] = rawValue.year
            }
            if (rawValue.year === labelYear) {
                rawValue.month && values.push(rawValue.month)
            }
        }
        else if (rawValue.type === 'multiple') {
            const choices = rawValue.choices
            if (!labelYear) {
                labelYear = labelYears[padIndex] = choices.length > 0 ? choices[0].year : ymRange[padIndex].year
            }
            choices.forEach(c => {
                if (labelYear === c.year) {
                    c.month && values.push(c.month)
                }
            })
        }
        else if (rawValue.type === 'range') {
            isRange = true
            if (!labelYear) {
                labelYear = labelYears[padIndex] = rawValue[ _RANGE_KEYS[padIndex] ].year
            }
            const { from, to, } = rawValue
            const startM = labelYear === from.year ? from.month : 1
            const endM = labelYear === to.year ? to.month : 12
            for (let i = startM; i <= endM; i++) {
                values.push(i)
            }
        }

        const lang = this.props.lang || []
        const months =  Array.isArray(lang) ? lang : (Array.isArray(lang.months) ? lang.months : [])
        let prevCss = '', nextCss = ''
        const yearMaxIdx = ymArr.length - 1
        const yearIdx = this.state.yearIndexes[padIndex]//yearMaxIdx

        const atMinYear = (labelYear === ymArr[0].year)
        const atMaxYear = (labelYear === ymArr[yearMaxIdx].year)
        let otherValue = { year: 0, month: 0, }, labelPreText
        if (isRange) {
            otherValue = rawValue[ _RANGE_KEYS[1 - padIndex] ]
            labelPreText = <b>{this.props.lang[ _RANGE_KEYS[padIndex] ]}</b>
        }

        if (yearIdx === 0 || (padIndex === 1 && otherValue.year === labelYear)) prevCss = 'disable'
        if (yearIdx === yearMaxIdx || (padIndex === 0 && otherValue.year === labelYear)) nextCss = 'disable'

        const prevHandler = prevCss === 'disable' ? undefined : this._goPrevYear
        const nextHandler = nextCss === 'disable' ? undefined : this._goNextYear

        let valOffset = 0

        return (
            <div className="rmp-pad" key={padIndex}>
                <div>
                    <label>{labelPreText}{labelYear}</label>
                    <i className={["rmp-tab", "rmp-btn", "prev", prevCss].join(' ')} data-id={padIndex} onClick={prevHandler}>{'<'}</i>
                    <i className={["rmp-tab", "rmp-btn", "next", nextCss].join(' ')} data-id={padIndex} onClick={nextHandler}>{'>'}</i>
                </div>
                <ul>
                    {
                        mapToArray(12, i => {
                            const m = i + 1
                            let css = ''

                            if (atMinYear && m < ymArr[0].min) {
                                css = 'disable'
                            }
                            else if (atMaxYear && m > ymArr[yearMaxIdx].max) {
                                css = 'disable'
                            }
                            else {
                                const { from, to, } = rawValue
                                for (let i = valOffset, last = values.length - 1; i <= last; i++) {
                                    const v = values[i]
                                    if (v === m) {
                                        valOffset++
                                        if (!isRange || (from.year === labelYear && i === 0) || (to.year === labelYear && i === last)) {
                                            css = 'active'
                                        }
                                        else if (labelYear >= from.year  && labelYear <= to.year) {
                                            css = 'select'
                                        }
                                    }
                                }
                                const otherM = otherValue.month
                                if (otherM) {
                                    if ((nextCss === 'disable' && m > otherM) || (prevCss === 'disable' && m < otherM)) {
                                        css = 'disable'
                                    }
                                }
                            }
                            const clickHandler = css !== 'disable' ? (this._handleClickMonth) : undefined
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
        if (this.state.rawValue.type === 'range') {
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

    _handleOverlayTouchTap = (e) => {
        if (this.state.closeable) {
            this._onDismiss()
            this.props.onClickAway && this.props.onClickAway(e)
        }
    }

    _onShow() {
        setTimeout(() => {this.state.closeable = true}, 250)
        this.setState({ showed: true })
        this.props.onShow && this.props.onShow()
    }

    _onDismiss(s) {
        this.setState(Object.assign({showed: false, loading: false}, s))
        this.props.onDismiss && this.props.onDismiss(this.value())
    }

    _handleClickMonth = (e) => {
        if (this.state.showed) {
            const refid = this.getDID(e).split(':')
            const idx = parseInt(refid[0], 10)
            const month = parseInt(refid[1], 10)
            const year = this.state.labelYears[idx]
            const rawValue = this.state.rawValue
            if (rawValue.type === 'single') {
                Object.assign(rawValue, { year, month })
            }
            else if (rawValue.type === 'multiple') {
                //TODO
            }
            else if (rawValue.type === 'range') {
                const keys = _RANGE_KEYS
                rawValue[ keys[idx] ] = { year, month }
            }
            this.setState({ rawValue })
            this.props.onChange(year, month, idx)
        }
    }

    _goPrevYear = (e) => {
        let idx = parseInt(this.getDID(e), 10)
        if (this.state.yearIndexes[idx] > 0) {
            this.setYear(idx, -1)
        }
    }
    _goNextYear = (e) => {
        let idx = parseInt(this.getDID(e), 10)
        if (this.state.yearIndexes[idx] < (this.state.years.length - 1)) {
            this.setYear(idx, 1)
        }
    }
    setYear(idx, step) {
        let yearIndex = (this.state.yearIndexes[idx] += step)
        let labelYears = this.state.labelYears
        let theYear = this.state.years[yearIndex].year
        labelYears[idx] = theYear
        this.setState({
            labelYears: labelYears
        })
        this.props.onYearChange && this.props.onYearChange(theYear)
    }

    getDID(e) {
        const el = e.target
        return el.dataset ? el.dataset.id : el.getAttribute('data-id')
    }

    hasStyleClass(e, name) {
        const el = e.target
        const styleClass = el.getAttribute('class').split(' ')
        return styleClass.includes(name)
    }

    _reset() {
        const rawValue = validValue(this.props.value, this.state.years, this.state.yearIndexes)
        return { rawValue }
    }

    _keyDown = (e) => {
        if (!this.state.showed)
            return

        const { type, pads, year, month, choices, } = this.state.rawValue

        if (e.key === 'Escape') {
            this._onDismiss(this._reset())
            e.stopPropagation()
        }
        else if (e.key === 'Enter') {
            this._onDismiss()
            e.stopPropagation()
        }
        else if (pads === 1) {
            //console.log(e.key, e.keyCode)
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
            //     this.setState({ rawValue: { type, year, month } }) //TODO
            //     this.props.onChange(year, month, 0)
            //     e.stopPropagation()
            // }
        }
    }
}
