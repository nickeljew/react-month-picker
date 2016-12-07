import React from 'react'
import ReactDOM from 'react-dom'
import DocReady from 'es6-docready'
import Dom from 'es6-dom'
import Picker from 'month-picker'

    
    

DocReady(function() {

    let MonthBox = React.createClass({
        propTypes: {
            value: React.PropTypes.string
            , onClick: React.PropTypes.func
        }
        , getInitialState() {
            return {
                value: this.props.value || 'N/A'
            }
        }
        , componentWillReceiveProps(nextProps){
            this.setState({
                value: nextProps.value || 'N/A'
            })
        }

        , render() {

            return (
                <div className="box" onClick={this._handleClick}>
                    <label>{this.state.value}</label>
                </div>
            )
        }

        , _handleClick(e) {
            this.props.onClick && this.props.onClick(e)
        }
    })










    let List = React.createClass({
        propTypes: {
        }
        , getDefaultProps () {
            return {
            }
        }
        , getInitialState() {
            return {
                mvalue: {year: 2015, month: 11}
                , mrange: {from: {year: 2014, month: 8}, to: {year: 2015, month: 5}}
                , mrange2: {from: {year: 2013, month: 11}, to: {year: 2016, month: 3}}
            }
        }
        , componentWillReceiveProps(nextProps){
            this.setState({
            })
        }

        , componentDidMount () {}

        , render() {

            let pickerLang = {
                    months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    , from: 'From', to: 'To'
                }
                , mvalue = this.state.mvalue
                , mrange = this.state.mrange
                , mrange2 = this.state.mrange2

            let makeText = m => {
                if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
                return '?'
            }

            return (
                <ul>
                    <li>
                        <label><b>Pick A Month</b></label>
                        <div className="edit">
                            <Picker
                                ref="pickAMonth"
                                years={[2008, 2010, 2011, 2012, 2014, 2015, 2016, 2017]}
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
                        <label><b>Pick A Span of Months</b><span>(Available years from 2013 to this year)</span></label>
                        <div className="edit">
                            <Picker
                                ref="pickRange"
                                years={{min: 2013}}
                                range={mrange}
                                lang={pickerLang}
                                theme="dark"
                                onChange={this.handleRangeChange}
                                onDismiss={this.handleRangeDissmis}
                                >
                                <MonthBox value={makeText(mrange.from) + ' ~ ' + makeText(mrange.to)} onClick={this._handleClickRangeBox} />
                            </Picker>
                        </div>
                    </li>
                    <li>
                        <label><b>Pick A Span of Months</b><span>(Available months from April 2013 to September 2016)</span></label>
                        <div className="edit">
                            <Picker
                                ref="pickRange2"
                                years={{min: {year: 2013, month: 4}, max: {year: 2016, month: 9}}}
                                range={mrange2}
                                lang={pickerLang}
                                theme="light"
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

        , handleClickMonthBox(e) {
            this.refs.pickAMonth.show()
        }
        , handleAMonthChange(value, text) {
            //
        }
        , handleAMonthDissmis(value) {
            this.setState( {mvalue: value} )
        }

        , _handleClickRangeBox(e) {
            this.refs.pickRange.show()
        }
        , handleRangeChange(value, text, listIndex) {
            //
        }
        , handleRangeDissmis(value) {
            this.setState( {mrange: value} )
        }

        , _handleClickRangeBox2(e) {
            this.refs.pickRange2.show()
        }
        , handleRangeChange2(value, text, listIndex) {
            //
        }
        , handleRangeDissmis2(value) {
            this.setState( {mrange2: value} )
        }
    })







    let Main = React.createClass({
        propTypes: {
            value: React.PropTypes.string
            , onClick: React.PropTypes.func
        }
        , getInitialState() {
            return {
                value: this.props.value
            }
        }
        , componentWillReceiveProps(nextProps){
            this.setState({
                value: nextProps.value
            })
        }

        , render() {

            return (
                <div className="list-area">
                    <List />
                </div>
            )
        }
    })





    ReactDOM.render(
        <Main/>
        , Dom.nodeById("page-container"))


})
