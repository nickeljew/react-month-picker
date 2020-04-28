'use strict';

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import DocReady from 'es6-docready'
import Dom from 'es6-dom'
import Picker from 'month-picker'

    
    

DocReady(function() {

    class MonthBox extends Component {
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


    MonthBox.propTypes = {
        value: PropTypes.string,
        onClick: PropTypes.func,
    }










    class List extends Component {
        constructor(props, context) {
            super(props, context)

            this.state = {
                mvalue: {year: 2014, month: 11},
                mvalue2: {year: 2016, month: 7},
                mrange: {from: {year: 2014, month: 8}, to: {year: 2015, month: 5}},
                mrange2: {from: {year: 2013, month: 11}, to: {year: 2016, month: 3}},
            }

            this.pickAMonth = React.createRef()
            this.pickAMonth2 = React.createRef()
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
            const mvalue = this.state.mvalue
            const mvalue2 = this.state.mvalue2
            const mrange = this.state.mrange
            const mrange2 = this.state.mrange2

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
                                years={[2008, 2011, 2012, 2014, 2016]}
                                value={mvalue}
                                lang={pickerLang.months}
                                onChange={this.handleAMonthChange}
                                onDismiss={this.handleAMonthDissmis}
                            >
                                <MonthBox value={makeText(mvalue)} onClick={this.handleClickMonthBox} />
                            </Picker>
                        </div>
                    </li>
                    <li>
                        <label><b>Pick A Month</b><span>(Available months from Feb.2016 to Sep.2016)</span></label>
                        <div className="edit">
                            <Picker
                                ref={this.pickAMonth2}
                                years={{min: {year: 2016, month: 2}, max: {year: 2016, month: 9}}}
                                value={mvalue2}
                                lang={pickerLang.months}
                                theme="dark"
                                onChange={this.handleAMonthChange2}
                                onDismiss={this.handleAMonthDissmis2}
                            >
                                <MonthBox value={makeText(mvalue2)} onClick={this.handleClickMonthBox2} />
                            </Picker>
                        </div>
                    </li>
                    <li>
                        <label><b>Pick A Span of Months</b><span>(Available years from 2013 to this year)</span></label>
                        <div className="edit">
                            <Picker
                                ref={this.pickRange}
                                years={{min: 2013}}
                                range={mrange}
                                lang={pickerLang}
                                theme="light"
                                onChange={this.handleRangeChange}
                                onDismiss={this.handleRangeDissmis}
                            >
                                <MonthBox value={makeText(mrange.from) + ' ~ ' + makeText(mrange.to)} onClick={this._handleClickRangeBox} />
                            </Picker>
                        </div>
                    </li>
                    <li>
                        <label><b>Pick A Span of Months</b><span>(Available months from Apr.2013 to Sep.2016)</span></label>
                        <div className="edit">
                            <Picker
                                ref={this.pickRange2}
                                years={{min: {year: 2013, month: 4}, max: {year: 2016, month: 9}}}
                                range={mrange2}
                                lang={pickerLang}
                                theme="dark"
                                onChange={this.handleRangeChange2}
                                onDismiss={this.handleRangeDissmis2}
                            >
                                <MonthBox value={makeText(mrange2.from) + ' ~ ' + makeText(mrange2.to)} onClick={this._handleClickRangeBox2} />
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
            this.setState( {mvalue: value} )
        }

        handleClickMonthBox2 = (e) => {
            this.pickAMonth2.current.show()
        }
        handleAMonthChange2 = (value, text) => {
            //
        }
        handleAMonthDissmis2 = (value) => {
            this.setState( {mvalue2: value} )
        }

        _handleClickRangeBox = (e) => {
            this.pickRange.current.show()
        }
        handleRangeChange = (value, text, listIndex) => {
            //
        }
        handleRangeDissmis = (value) => {
            this.setState( {mrange: value} )
        }

        _handleClickRangeBox2 = (e) => {
            this.pickRange2.current.show()
        }
        handleRangeChange2 = (value, text, listIndex) => {
            //
        }
        handleRangeDissmis2 = (value) => {
            this.setState( {mrange2: value} )
        }
    }







    class Main extends Component {
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


    Main.propTypes = {
        value: PropTypes.string,
        onClick: PropTypes.func,
    }





    ReactDOM.render(
        <Main/>,
        Dom.nodeById("page-container"))


})
