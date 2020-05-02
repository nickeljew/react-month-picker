'use strict';

import React, { Component, useState, useEffect, } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import DocReady from 'es6-docready'
import Dom from 'es6-dom'
import Picker from 'month-picker'
import Tappable from 'react-tapper'

    
    

DocReady(function() {

    class MonthBox extends Component {
        static propTypes = {
            value: PropTypes.string,
            onClick: PropTypes.func,
        }

        constructor(props, context) {
            super(props, context)

            this.state = {
                value: this.props.value || 'N/A',
            }
        }

        static getDerivedStateFromProps(props, state) {
            return {
                value: props.value || 'N/A',
            }
        }

        render() {

            return (
                <div className="box" onClick={this._handleClick}>
                    <label>{this.state.value}</label>
                </div>
            )
        }

        _handleClick = (e) => {
            this.props.onClick && this.props.onClick(e)
        }
    }


    const numSort = (a, b) => a - b
    const copySort = (arr) => arr.sort(numSort)
    const yearsConv = (arr) => copySort(arr).filter(y => y >= 1000 && y <= 2500).map(y => String(y))

    class YearsPanel extends Component {
        static propTypes = {
            years: PropTypes.arrayOf(PropTypes.number),
            onChange: PropTypes.func,
        }

        constructor(props, context) {
            super(props, context)

            const years = yearsConv(this.props.years)
            this.state = {
                yearsTag: this.props.years.join(' '),
                years,
                showed: false,
                closeable: false,
                char: '',
            }
        }

        static getDerivedStateFromProps(props, state) {
            const yearsTag = props.years.join(' ')
            if (yearsTag !== state.yearsTag) {
                return {
                    yearsTag,
                    years: yearsConv(props.years),
                }
            }
            return null
        }

        render() {
            const { showed, years, input, } = this.state
            return (
                <div className={["years-panel", "table", (showed ? "show" : '')].join(' ').trim()}>
                    <Tappable className="overlay" onTap={this._handleOverlayTouchTap} />
                    <div className="cell">
                        <div className="popup">
                            <textarea rows="8" value={years.join('\n')} onKeyDown={this._handleKeyDown} onChange={this._handleChange} />
                        </div>
                    </div>
                </div>
            )
        }

        _handleOverlayTouchTap = (e) => {
            if (this.state.closeable) {
                const years = this.state.years
                    .map(y => parseInt(y,10))
                    .filter(y => !isNaN(y) && y >= 1000 && y <= 2500)
                    .sort(numSort)
                this.setState({
                    showed: false,
                    closeable: false,
                    yearsTag: years.join(' '),
                    years: years.map(y => String(y)),
                })
                this.props.onChange && this.props.onChange(years)
            }
        }

        show() {
            if (!this.state.showed) {
                setTimeout(() => {this.state.closeable = true}, 250)
                this.setState({ showed: true })
            }
        }

        _handleKeyDown = (e) => {
            if (e.metaKey || e.ctrlKey || e.altKey) {
                return
            }
            const code = e.keyCode
            if ([ 8, 13, 37, 38, 39, 40].includes(code)) {
                return
            }
            if (code >= 48 && code <= 57) {
                return
            }
            e.preventDefault()
        }

        _handleChange = (e) => {
            this.setState({ years: e.target.value.split('\n') })
        }
    }





    class List extends Component {
        constructor(props, context) {
            super(props, context)

            this.state = {
                yearsOfSingle: [ 2008, 2011, 2012, 2014, 2016, ],
                ageOfSingle: 0,
                singleValue: {year: 2014, month: 11},
                singleValue2: {year: 2016, month: 7},
                multiValue: [ {year: 2016, month: 7}, {year: 2016, month: 11}, {year: 2017, month: 3}, {year: 2019, month: 5}, ],
                rangeValue: {from: {year: 2014, month: 8}, to: {year: 2015, month: 5}},
                //rangeValue: {from: {year: 2013, month: 7}, to: {year: 2013, month: 9}},
                rangeValue2: {from: {year: 2013, month: 11}, to: {year: 2016, month: 3}},
            }

            this.yearsPanel = React.createRef()
            this.pickAMonth = React.createRef()
            this.pickAMonth2 = React.createRef()
            this.pickMulti = React.createRef()
            this.pickRange = React.createRef()
            this.pickRange2 = React.createRef()
        }

        render() {
            const pickerLang = {
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                from: 'From', to: 'To',
            }
            const { yearsOfSingle, ageOfSingle, singleValue, singleValue2, multiValue, rangeValue, rangeValue2, } = this.state

            const makeText = m => {
                if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
                return '?'
            }

            return (
                <ul>
                    <li>
                        <label>
                            <b>Pick A Month (with age)</b>
                            <span>
                                <i>(Available years: {yearsOfSingle.join(', ')})</i>
                                <i className="sub-btn" onClick={this.handleClickEditYears}>Edit</i>
                                <YearsPanel ref={this.yearsPanel} years={yearsOfSingle} onChange={this.handleYearsChanged} />
                            </span>
                        </label>
                        <div className="edit">
                            <Picker
                                ref={this.pickAMonth}
                                age={ageOfSingle}
                                years={yearsOfSingle}
                                value={singleValue}
                                lang={pickerLang.months}
                                onChange={this.handleAMonthChange}
                                onDismiss={this.handleAMonthDissmis}
                            >
                                <MonthBox value={makeText(singleValue)} onClick={this.handleClickMonthBox} />
                            </Picker>
                        </div>
                    </li>
                    <li>
                        <label>
                            <b>Pick A Month</b>
                            <span>(Available months from Feb.2016 to Sep.2016)</span>
                        </label>
                        <div className="edit">
                            <Picker
                                ref={this.pickAMonth2}
                                years={{min: {year: 2016, month: 2}, max: {year: 2016, month: 9}}}
                                value={singleValue2}
                                lang={pickerLang.months}
                                theme="dark"
                                onChange={this.handleAMonthChange2}
                                onDismiss={this.handleAMonthDissmis2}
                            >
                                <MonthBox value={makeText(singleValue2)} onClick={this.handleClickMonthBox2} />
                            </Picker>
                        </div>
                    </li>
                    <li>
                        <label>
                            <b>Pick Several Months</b>
                            <span>(Available months from Feb.2016 to Apr.2020)</span>
                        </label>
                        <div className="edit">
                            <Picker
                                ref={this.pickMulti}
                                years={{min: {year: 2016, month: 2}, max: {year: 2020, month: 4}}}
                                value={multiValue}
                                lang={pickerLang.months}
                                theme="dark"
                                onChange={this.handleMultiChange}
                                onDismiss={this.handleMultiDissmis}
                            >
                                <MonthBox value={multiValue.map(v => makeText(v)).join(' | ')} onClick={this.handleClickMultiBox} />
                            </Picker>
                        </div>
                    </li>
                    <li>
                        <label>
                            <b>Pick A Span of Months</b>
                            <span>(Available years from 2013 to this year)</span>
                        </label>
                        <div className="edit">
                            <Picker
                                ref={this.pickRange}
                                years={{min: 2013}}
                                value={rangeValue}
                                lang={pickerLang}
                                theme="light"
                                onChange={this.handleRangeChange}
                                onDismiss={this.handleRangeDissmis}
                            >
                                <MonthBox value={makeText(rangeValue.from) + ' ~ ' + makeText(rangeValue.to)} onClick={this._handleClickRangeBox} />
                            </Picker>
                        </div>
                    </li>
                    <li>
                        <label>
                            <b>Pick A Span of Months (with autoRange)</b>
                            <span>(Available months from Apr.2013 to Sep.2016)</span>
                        </label>
                        <div className="edit">
                            <Picker
                                ref={this.pickRange2}
                                autoRange={6}
                                years={{min: {year: 2012, month: 4}, max: {year: 2017, month: 9}}}
                                value={rangeValue2}
                                lang={pickerLang}
                                theme="dark"
                                onChange={this.handleRangeChange2}
                                onDismiss={this.handleRangeDissmis2}
                            >
                                <MonthBox value={makeText(rangeValue2.from) + ' ~ ' + makeText(rangeValue2.to)} onClick={this._handleClickRangeBox2} />
                            </Picker>
                        </div>
                    </li>
                </ul>
            )
        }

        handleClickEditYears = (e) => {
            this.yearsPanel.current.show()
        }
        handleYearsChanged = (years) => {
            this.setState({
                yearsOfSingle: years.concat(),
                ageOfSingle: this.state.ageOfSingle + 1,
            })
        }

        handleClickMonthBox = (e) => {
            this.pickAMonth.current.show()
        }
        handleAMonthChange = (value, text) => {
            //
        }
        handleAMonthDissmis = (value) => {
            this.setState( {singleValue: value} )
        }

        handleClickMonthBox2 = (e) => {
            this.pickAMonth2.current.show()
        }
        handleAMonthChange2 = (value, text) => {
            //
        }
        handleAMonthDissmis2 = (value) => {
            this.setState( {singleValue2: value} )
        }

        handleClickMultiBox = (e) => {
            this.pickMulti.current.show()
        }
        handleMultiChange = (value, text) => {
            //
        }
        handleMultiDissmis = (value) => {
            this.setState( {multiValue: value} )
        }

        _handleClickRangeBox = (e) => {
            this.pickRange.current.show()
        }
        handleRangeChange = (value, text, listIndex) => {
            //
        }
        handleRangeDissmis = (value) => {
            this.setState( {rangeValue: value} )
        }

        _handleClickRangeBox2 = (e) => {
            this.pickRange2.current.show()
        }
        handleRangeChange2 = (value, text, listIndex) => {
            //
        }
        handleRangeDissmis2 = (value) => {
            this.setState( {rangeValue2: value} )
        }
    }







    class Main extends Component {
        static propTypes = {
            value: PropTypes.string,
            onClick: PropTypes.func,
        }

        constructor(props, context) {
            super(props, context)

            this.state = {
                value: this.props.value
            }
        }

        render() {

            return (
                <div className="list-area">
                    <List />
                </div>
            )
        }
    }



    ReactDOM.render(
        <Main/>,
        Dom.nodeById("page-container"))


})
