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

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTapper = require('react-tapper');

var _reactTapper2 = _interopRequireDefault(_reactTapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

var __MIN_VALID_YEAR = 1;

function mapToArray(num, callback) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(callback(i));
    }
    return arr;
}

function getYearMon(year, min, max) {
    var ym = (typeof year === 'undefined' ? 'undefined' : _typeof(year)) === 'object' && year.year ? { year: year.year, month: year.month } : { year: year };
    ym.min = min || 1;
    ym.max = max || 12;
    return ym;
}

function getYearsByNum(n, minYear) {
    var maxYear = new Date().getFullYear();
    // n is number of years
    if (n && n > 0 && n < 1000) {
        minYear = minYear || maxYear - n + 1;
    }
    // n is invalid value
    else {
            // n is max year
            if (n && n >= 1000) maxYear = n;

            if (minYear) {
                n = maxYear - minYear + 1;
            } else {
                n = 5;
                minYear = maxYear - n + 1;
            }
        }
    return mapToArray(n, function (i) {
        return getYearMon(minYear + i);
    });
}

function getYearArray(years) {
    if (Array.isArray(years)) return years.map(function (y, i) {
        return getYearMon(y);
    });
    if ((typeof years === 'undefined' ? 'undefined' : _typeof(years)) === 'object') {
        var n = 0,
            min = 0,
            ymin = getYearMon(years.min),
            ymax = getYearMon(years.max);
        if (typeof ymin.year === 'number' && ymin.year > __MIN_VALID_YEAR) min = ymin.year;
        if (typeof ymax.year === 'number' && ymax.year >= min) n = ymax.year;
        var arr = getYearsByNum(n, min),
            last = arr.length - 1;
        if (last >= 0) {
            arr[0].min = ymin.month || arr[0].month;
            arr[last].max = ymax.month || arr[last].month;
        }
        return arr;
    } else if (typeof years === 'number' && years > 0) return getYearsByNum(years);else return getYearsByNum(5);
}

function validate(d, years, idx, yearIndexes) {
    var now = new Date(),
        thisYear = now.getFullYear(),
        ym = void 0;
    if (d && typeof d.year === 'number' && d.year > __MIN_VALID_YEAR && typeof d.month === 'number' && d.month >= 1 && d.month <= 12) {
        ym = d;
    }

    var foundThisYear = void 0;
    for (var i = 0; i < years.length; i++) {
        if (ym && years[i].year === ym.year) {
            yearIndexes[idx] = i;
            return ym;
        } else if (years[i].year === thisYear) {
            foundThisYear = i;
        }
    }

    if (typeof foundThisYear === 'number') {
        yearIndexes[idx] = foundThisYear;
        return { year: thisYear };
    }

    var last = yearIndexes[idx] = years.length - 1;
    return { year: years[last].year };
}

function validValues(v, years, yearIndexes) {
    if (!v) return [];
    if (v.from || v.to) {
        var from = validate(v.from, years, 0, yearIndexes),
            to = validate(v.to, years, 1, yearIndexes);
        if (from.year > to.year || from.year === to.year && from.month > to.month) {
            from.year = to.year;
            from.month = to.month;
            if (from.month < 1) {
                from.year--;
                from.month += 12;
            }
        }
        return [from, to];
    }
    return [validate(v, years, 0, yearIndexes)];
}

function valuesChanged(values1, values2) {
    if (values1.length !== values2.length) return true;
    for (var i = 0; i < values1.length; i++) {
        var v1 = values1[i];
        var v2 = values2[i];
        if (v1.year !== v2.year || v1.month !== v2.month) return true;
    }
    return false;
}

var MonthPicker = function (_Component) {
    _inherits(MonthPicker, _Component);

    function MonthPicker(props, context) {
        _classCallCheck(this, MonthPicker);

        var _this = _possibleConstructorReturn(this, (MonthPicker.__proto__ || Object.getPrototypeOf(MonthPicker)).call(this, props, context));

        _initialiseProps.call(_this);

        var yearArr = getYearArray(_this.props.years);
        var yearIndexes = [0];
        var values = validValues(_this.props.range || _this.props.value, yearArr, yearIndexes);
        _this.state = {
            years: yearArr,
            values: values,
            labelYears: [false, false],
            showed: _this.props.show,
            closeable: _this.props.show, //special, must not be changed with setState
            yearIndexes: yearIndexes,
            lastRange: _this.props.range,
            lastValue: _this.props.value
        };
        return _this;
    }

    _createClass(MonthPicker, [{
        key: 'value',
        value: function value() {
            var values = this.state.values;
            if (values.length >= 2) return { from: values[0], to: values[1] };else if (values.length === 1) return values[0];
            return {};
        }

        // componentDidUpdate(prevProps) {
        //     if(this.props.years !== prevProps.years || this.props.range !== prevProps.range ||
        //          this.props.value !== prevProps.value || this.props.show !== prevProps.show) {
        //         const yearArr = getYearArray(this.props.years)
        //             , yearIndexes = this.state.yearIndexes
        //             , nextValues = this.props.range || this.props.value //|| this.props.range || this.props.value
        //             , values = validValues(nextValues, yearArr, yearIndexes)
        //         this.setState({
        //             years: yearArr,
        //             values: values,
        //             labelYears: [false, false],
        //             yearIndexes,
        //             lastRange: this.props.range,
        //             lastValue: this.props.value,
        //             showed: this.props.show,
        //             closeable: this.props.show,
        //         })
        //     }
        // }

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (isBrowser) {
                document.addEventListener('keydown', this._keyDown);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (isBrowser) {
                document.removeEventListener('keydown', this._keyDown);
            }
        }
    }, {
        key: 'optionPad',
        value: function optionPad(padIndex) {
            var _this2 = this;

            var values = this.state.values;
            var value = values[padIndex];
            var labelYears = this.state.labelYears;
            var labelYear = labelYears[padIndex] = labelYears[padIndex] || value.year;
            var ymArr = this.state.years;
            var lang = this.props.lang || [];
            var months = Array.isArray(lang) ? lang : Array.isArray(lang.months) ? lang.months : [];
            var prevCss = '',
                nextCss = '';
            var yearMaxIdx = ymArr.length - 1;
            var yearIdx = this.state.yearIndexes[padIndex]; //yearMaxIdx

            if (yearIdx === 0) prevCss = 'disable';
            if (yearIdx === yearMaxIdx) nextCss = 'disable';

            var yearActive = labelYear === value.year;
            var atMinYear = labelYear === ymArr[0].year;
            var atMaxYear = labelYear === ymArr[yearMaxIdx].year;
            var otherValue = false;
            if (values.length > 1) {
                otherValue = values[1 - padIndex];
            }

            var labelTextKey = padIndex === 0 ? 'from' : 'to',
                labelPreText = void 0;
            if (otherValue && this.props.lang[labelTextKey]) {
                labelPreText = _react2.default.createElement(
                    'b',
                    null,
                    this.props.lang[labelTextKey]
                );
            }

            return _react2.default.createElement(
                'div',
                { className: 'rmp-pad', key: padIndex },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        labelPreText,
                        labelYear
                    ),
                    _react2.default.createElement(
                        'i',
                        { className: ["rmp-tab", "rmp-btn", "prev", prevCss].join(' '), 'data-id': padIndex, onClick: this.goPrevYear },
                        '<'
                    ),
                    _react2.default.createElement(
                        'i',
                        { className: ["rmp-tab", "rmp-btn", "next", nextCss].join(' '), 'data-id': padIndex, onClick: this.goNextYear },
                        '>'
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    mapToArray(12, function (i) {
                        var css = '',
                            m = i + 1;
                        if (yearActive && m === value.month) {
                            css = 'active';
                        }
                        if (values.length > 1 && padIndex === 0 && (labelYear > value.year || labelYear === value.year && m > value.month)) {
                            css = 'select';
                        }
                        if (values.length > 1 && padIndex === 1 && (labelYear < value.year || labelYear === value.year && m < value.month)) {
                            css = 'select';
                        }
                        if (atMinYear && m < ymArr[0].min) {
                            css = 'disable';
                        }
                        if (atMaxYear && m > ymArr[yearMaxIdx].max) {
                            css = 'disable';
                        }
                        if (otherValue) {
                            var y = otherValue.year,
                                _m = otherValue.month || 0;
                            var vy = labelYear,
                                vm = i + 1;
                            if (y === vy && _m && (padIndex === 0 && vm > _m || padIndex === 1 && vm < _m)) {
                                css = 'disable';
                            } else if (y > vy && padIndex === 1 || y < vy && padIndex === 0) {
                                css = 'disable';
                            }
                        }
                        var clickHandler = css !== 'disable' ? _this2.handleClickMonth : undefined;
                        return _react2.default.createElement(
                            'li',
                            { key: i, className: ["rmp-btn", css].join(' '),
                                'data-id': padIndex + ':' + (i + 1),
                                onClick: clickHandler },
                            months.length > i ? months[i] : i
                        );
                    })
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var pads = [];
            var popupClass = '';
            if (this.state.values.length > 1) {
                pads.push(this.optionPad(0), this.optionPad(1));
                popupClass = 'range';
            } else {
                pads.push(this.optionPad(0));
            }
            console.log('---- state: ', this.state);

            return _react2.default.createElement(
                'div',
                { className: ["month-picker", this.props.className].join(' ') },
                this.props.children,
                _react2.default.createElement(
                    'div',
                    { className: ["rmp-container", "rmp-table", this.props.className, this.state.showed ? "show" : ''].join(' ') },
                    _react2.default.createElement(_reactTapper2.default, { className: 'rmp-overlay', onTap: this._handleOverlayTouchTap }),
                    _react2.default.createElement(
                        'div',
                        { className: 'rmp-cell' },
                        _react2.default.createElement(
                            'div',
                            { className: ["rmp-popup", popupClass, this.props.theme, this.state.showed ? "show" : ''].join(' ') },
                            pads
                        )
                    )
                )
            );
        }
    }, {
        key: 'dismiss',
        value: function dismiss() {
            if (this.state.closeable) {
                this._onDismiss();
            }
        }
    }, {
        key: 'show',
        value: function show() {
            // prevent rapid show/hide
            this._onShow();
        }
    }, {
        key: '_onShow',
        value: function _onShow() {
            var _this3 = this;

            setTimeout(function () {
                _this3.state.closeable = true;
            }, 250);
            this.setState({ showed: true });
            this.props.onShow && this.props.onShow();
        }
    }, {
        key: '_onDismiss',
        value: function _onDismiss(s) {
            this.setState(Object.assign({ showed: false, loading: false }, s));
            this.props.onDismiss && this.props.onDismiss(this.value());
        }
    }, {
        key: 'setYear',
        value: function setYear(idx, step) {
            var yearIndex = this.state.yearIndexes[idx] += step;
            var labelYears = this.state.labelYears;
            var theYear = this.state.years[yearIndex].year;
            labelYears[idx] = theYear;
            this.setState({
                labelYears: labelYears
            });
            this.props.onYearChange && this.props.onYearChange(theYear);
        }
    }, {
        key: 'getDID',
        value: function getDID(e) {
            var el = e.target;
            return el.dataset ? el.dataset.id : el.getAttribute('data-id');
        }
    }, {
        key: '_reset',
        value: function _reset() {
            var values = validValues(this.state.lastRange || this.state.lastValue, this.state.years, this.state.yearIndexes);
            return { values: values };
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props, state) {
            var yearIndexes = state.yearIndexes;
            var values = validValues(props.range || props.value, state.years, yearIndexes);
            if (valuesChanged(values, state.values)) {
                console.log('---- update state by props: ', values, state.values);
                return {
                    values: values,
                    labelYears: [false, false],
                    yearIndexes: yearIndexes,
                    lastRange: props.range,
                    lastValue: props.value
                };
            }
            // No state update necessary
            return null;
        }
    }]);

    return MonthPicker;
}(_react.Component);

MonthPicker.propTypes = {
    years: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.number]),
    value: _propTypes2.default.object,
    range: _propTypes2.default.object,
    lang: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
    onChange: _propTypes2.default.func,
    onYearChange: _propTypes2.default.func,
    onShow: _propTypes2.default.func,
    onDismiss: _propTypes2.default.func,
    onClickAway: _propTypes2.default.func,
    theme: _propTypes2.default.string,
    show: _propTypes2.default.bool
};
MonthPicker.defaultProps = {
    years: getYearsByNum(5),
    onChange: function onChange(year, month, idx) {},

    theme: 'light',
    show: false
};

var _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this._handleOverlayTouchTap = function (e) {
        if (_this4.state.closeable) {
            _this4._onDismiss();
            _this4.props.onClickAway && _this4.props.onClickAway(e);
        }
    };

    this.handleClickMonth = function (e) {
        if (_this4.state.showed) {
            var refid = _this4.getDID(e).split(':');
            var idx = parseInt(refid[0], 10);
            var month = parseInt(refid[1], 10);
            var year = _this4.state.labelYears[idx];
            var values = _this4.state.values;
            values[idx] = { year: year, month: month };
            _this4.setState({ values: values });
            _this4.props.onChange(year, month, idx);
        }
    };

    this.goPrevYear = function (e) {
        var idx = parseInt(_this4.getDID(e), 10);
        if (_this4.state.yearIndexes[idx] > 0) {
            _this4.setYear(idx, -1);
        }
    };

    this.goNextYear = function (e) {
        var idx = parseInt(_this4.getDID(e), 10);
        if (_this4.state.yearIndexes[idx] < _this4.state.years.length - 1) {
            _this4.setYear(idx, 1);
        }
    };

    this._keyDown = function (e) {
        if (!_this4.state.showed) return;

        if (e.key === 'Escape') {
            _this4._onDismiss(_this4._reset());
            e.stopPropagation();
        } else if (e.key === 'Enter') {
            _this4._onDismiss();
            e.stopPropagation();
        } else if (_this4.state.values.length === 1) {
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
    };
};

exports.default = MonthPicker;
