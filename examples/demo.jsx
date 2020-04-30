'use strict';

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import DocReady from 'es6-docready'
import Dom from 'es6-dom'
import Picker from 'month-picker'

    
    

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

            this._handleClick = this._handleClick.bind(this)
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

        _handleClick(e) {
            this.props.onClick && this.props.onClick(e)
        }
    }










    class List extends Component {
        constructor(props, context) {
            super(props, context)

            this.state = {
                singleValue: {year: 2014, month: 11},
                singleValue2: {year: 2016, month: 7},
                multiValue: [ {year: 2016, month: 7}, {year: 2016, month: 11}, {year: 2017, month: 3}, {year: 2019, month: 5}, ],
                rangeValue: {from: {year: 2014, month: 8}, to: {year: 2015, month: 5}},
                rangeValue2: {from: {year: 2013, month: 11}, to: {year: 2016, month: 3}},
            }

            this.pickAMonth = React.createRef()
            this.pickAMonth2 = React.createRef()
            this.pickMulti = React.createRef()
            this.pickRange = React.createRef()
            this.pickRange2 = React.createRef()
        }

        static getDerivedStateFromProps(props, state) {
            return {
                value: props.value || 'N/A',
            }
        }

        render() {

            const pickerLang = {
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                from: 'From', to: 'To',
            }
            const { singleValue, singleValue2, multiValue, rangeValue, rangeValue2, } = this.state

            const makeText = m => {
                if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
                return '?'
            }

            return (
                <ul>
                    <li>
                        <label><b>Pick A Month</b><span>(Available years: 2008, 2011, 2012, 2014, 2016)</span></label>
                        <div className="edit">
                            <Picker
                                ref={this.pickAMonth}
                                years={[2008, 2011, 2012, 2014, 2016, 2018, 2020]}
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
                        <label><b>Pick A Month</b><span>(Available months from Feb.2016 to Sep.2016)</span></label>
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
                        <label><b>Pick Several Month</b><span>(Available months from Feb.2016 to Apr.2020)</span></label>
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
                        <label><b>Pick A Span of Months</b><span>(Available years from 2013 to this year)</span></label>
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
                        <label><b>Pick A Span of Months</b><span>(Available months from Apr.2013 to Sep.2016)</span></label>
                        <div className="edit">
                            <Picker
                                ref={this.pickRange2}
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

        static getDerivedStateFromProps(props, state) {
            return {
                value: props.value,
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
