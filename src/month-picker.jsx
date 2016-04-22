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




import React from 'react'
import Tappable from 'react-tapper'


const __MIN_VALID_YEAR = 1970


function mapToArray(num, callback) {
    let arr = []
    for (let i = 0; i <  num; i++) {
        arr.push( callback(i) )
    }
    return arr
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
        return (minYear + i)
    })
}

function getYearArray(years) {
    if (Array.isArray(years))
        return years
    if ((typeof years === 'object')) {
        let n = 0, min = 0
        if ((typeof years.min === 'number') && years.min > __MIN_VALID_YEAR)
            min = years.min
        if ((typeof years.max === 'number') && years.max >= min)
            n = years.max
        return getYearsByNum(n, min)
    }
    else if (typeof years === 'number' && years > 0)
        return getYearsByNum(years)
    else
        return getYearsByNum(5)
}


let MonthPicker = React.createClass({

    propTypes: {
        years: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object, React.PropTypes.number])
        , value: React.PropTypes.object
        , range: React.PropTypes.object
        , lang: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object])
        , onChange: React.PropTypes.func
        , onShow: React.PropTypes.func
        , onDismiss: React.PropTypes.func
        , onClickAway: React.PropTypes.func
        , theme: React.PropTypes.string
    }

    , validate(d, years, idx, yearIndexes) {
        let now = new Date()
            , thisYear = now.getFullYear()
            , ym
        if (d && (typeof d.year === 'number') && d.year > __MIN_VALID_YEAR
            && (typeof d.month === 'number') && d.month >= 1 && d.month <= 12) {
            ym = d
        }

        let foundThisYear
        for (let i = 0; i < years.length; i++) {
            if (ym && years[i] == ym.year) {
                yearIndexes[idx] = i
                return ym
            }
            else if (years[i] == thisYear) {
                foundThisYear = i
            }
        }

        if (typeof foundThisYear === 'number') {
            yearIndexes[idx] = foundThisYear
            return { year: thisYear }
        }

        let last = yearIndexes[idx] = years.length - 1
        return { year: years[last] }

    }
    , validValues(v, years, yearIndexes) {
        if (!v)
            return []
        if (v.from || v.to) {
            let from = this.validate(v.from, years, 0, yearIndexes)
                , to = this.validate(v.to, years, 1, yearIndexes)
            if (from.year > to.year || (from.year === to.year && from.month >= to.month)) {
                from.year = to.year
                from.month = to.month - 5
                if (from.month < 1) {
                    from.year--
                    from.month += 12
                }
            }
            return [from, to]
        }
        return [this.validate(v, years, 0, yearIndexes)]
    }

    , value() {
        let values = this.state.values
        if (values.length >= 2)
            return { from: values[0], to: values[1] }
        else if (values.length === 1)
            return values[0]
        return {}
    }


    , getDefaultProps() {
        return {
            years: getYearsByNum(5)
            , onChange(year, month, idx) {}
            , theme: 'light'
        }
    }

    , getInitialState() {
        let yearArr = getYearArray(this.props.years)
            , yearIndexes = [0]
            , values = this.validValues(this.props.range || this.props.value, yearArr, yearIndexes)
        return {
            years: yearArr
            , values: values
            , labelYears: [false, false]
            , showed: false
            , yearIndexes: yearIndexes
        }
    }
    , componentWillReceiveProps(nextProps){
        let yearArr = getYearArray(nextProps.years)
            , yearIndexes = this.state.yearIndexes
            , values = this.validValues(nextProps.range || nextProps.value, yearArr, yearIndexes)
        this.setState({
            years: yearArr
            , values: values
            , labelYears: [false, false]
            , yearIndexes: yearIndexes
        })
    }

    //, componentDidMount () {}
    //, componentWillUnmount () {}

    , optionPad(padIndex) {
        let values = this.state.values
            , value = values[padIndex]
            , labelYears = this.state.labelYears
            , labelYear = labelYears[padIndex] = labelYears[padIndex] || value.year
            , years = this.state.years
            , lang = this.props.lang || []
            , months =  Array.isArray(lang) ? lang : (Array.isArray(lang.months) ? lang.months : [])
            , prevCss = '', nextCss = ''
            , yearMaxIdx = years.length - 1
            , yearIdx = yearMaxIdx
        for (let i = 0; i < years.length; i++) {
            if (value.year === years[i]) {
                yearIdx = i
                break
            }
        }
        if (yearIdx === 0) prevCss = 'disable'
        if (yearIdx === yearMaxIdx) nextCss = 'disable'

        let yearActive = (labelYear === value.year)
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
            <div className="pad" key={padIndex}>
                <div>
                    <label>{labelPreText}{labelYear}</label>
                    <i className={["tab", "btn", "prev", prevCss].join(' ')} data-id={padIndex} onClick={this.goPrevYear}>{'<'}</i>
                    <i className={["tab", "btn", "next", nextCss].join(' ')} data-id={padIndex} onClick={this.goNextYear}>{'>'}</i>
                </div>
                <ul>
                    {
                        mapToArray(12, i => {
                            let css = ''
                            if (yearActive && (i+1) == value.month) {
                                css = 'active'
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
                                <li key={i} className={["btn", css].join(' ')}
                                    data-id={padIndex + ':' + (i+1)}
                                    onClick={clickHandler}>{months.length > i ? months[i] : i}</li>
                                )
                            })
                    }
                </ul>
            </div>
        )
    }

    , render() {
        let pads = []
            , popupClass = ''
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
                <div className={["container", "table", this.props.className, (this.state.showed ? "show" : '')].join(' ')}>
                    <Tappable className="overlay" onTap={this._handleOverlayTouchTap} />
                    <div className="cell">
                        <div className={["popup", popupClass , this.props.theme, (this.state.showed ? "show" : '')].join(' ')}>
                            {pads}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    , closeable: false

    , dismiss() {
        if (this.closeable) {
            this._onDismiss()
        }
    }

    , show() {
        // prevent rapid show/hide
        this._onShow()
    }

    ,  _handleOverlayTouchTap() {
        if (this.closeable) {
            this._onDismiss()
            this.props.onClickAway && this.props.onClickAway()
        }
    }

    , _onShow() {
        setTimeout(function() {this.closeable = true;}.bind(this), 250)
        this.setState({ showed: true })
        this.props.onShow && this.props.onShow()
    }

    , _onDismiss() {
        this.setState({ showed: false, loading: false })
        this.props.onDismiss && this.props.onDismiss(this.value())
    }

    , handleClickMonth(e) {
        if(this.state.showed) {
          let refid = this.getDID(e).split(':')
              , idx = parseInt(refid[0], 10)
              , month = parseInt(refid[1], 10)
              , year = this.state.labelYears[idx]
              , values = this.state.values
          values[idx] = { year: year, month: month }
          this.setState({
              values: values
          })
          this.props.onChange(year, month, idx)
        }
    }

    , goPrevYear(e) {
        let idx = parseInt(this.getDID(e), 10)
        if (this.state.yearIndexes[idx] > 0) {
            this.setYear(idx, -1)
        }
    }
    , goNextYear(e) {
        let idx = parseInt(this.getDID(e), 10)
        if (this.state.yearIndexes[idx] < (this.state.years.length - 1)) {
            this.setYear(idx, 1)
        }
    }
    , setYear(idx, step) {
        let yearIndex = (this.state.yearIndexes[idx] += step)
            , labelYears = this.state.labelYears
        labelYears[idx] = this.state.years[yearIndex]
        this.setState({
            labelYears: labelYears
        })
    }

    , getDID(e) {
        let el = e.target
        return el.dataset ? el.dataset.id : el.getAttribute('data-id')
    }

})

export default MonthPicker
