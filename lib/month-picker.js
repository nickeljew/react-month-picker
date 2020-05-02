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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

var __MIN_VALID_YEAR = 1000;
var _SINGLE_KEYS = ['year', 'month'];
var _RANGE_KEYS = ['from', 'to'];
var __YEAR = new Date().getFullYear();

function mapToArray(num, callback) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(callback(i));
    }
    return arr;
}

function getYearMon(year, min, max) {
    var ym = (typeof year === 'undefined' ? 'undefined' : _typeof(year)) === 'object' && year.year ? { year: year.year, month: year.month } : typeof year === 'number' ? { year: year } : { __YEAR: __YEAR };
    ym.min = min || 1;
    ym.max = max || 12;
    return ym;
}

function getYearsByNum(n, minYear) {
    var maxYear = __YEAR;
    // n is count of years
    if (n && n > 0 && n < 100) {
        minYear = minYear || maxYear - n + 1;
    }
    //
    else {
            // n is max year
            if (n && n >= __MIN_VALID_YEAR) maxYear = n;

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
    if (Array.isArray(years)) {
        return years.map(function (y, i) {
            return getYearMon(y);
        }).sort(function (a, b) {
            return a.year - b.year;
        });
    }
    if ((typeof years === 'undefined' ? 'undefined' : _typeof(years)) === 'object') {
        var n = 0,
            min = 0;
        var ymin = getYearMon(years.min),
            ymax = getYearMon(years.max);
        if (ymin.year > __MIN_VALID_YEAR) min = ymin.year;
        if (ymax.year >= min) n = ymax.year;
        var arr = getYearsByNum(n, min);
        var last = arr.length - 1;
        if (last >= 0) {
            arr[0].min = ymin.month || arr[0].min;
            arr[last].max = ymax.month || arr[last].max;
        }
        return arr;
    } else if (typeof years === 'number' && years > 0) return getYearsByNum(years);else return getYearsByNum(5);
}

function validate(d, years, idx, yearIndexes) {
    var ym = void 0;
    if (d && typeof d.year === 'number' && d.year > __MIN_VALID_YEAR && typeof d.month === 'number' && d.month >= 1 && d.month <= 12) {
        ym = d;
    }

    var foundThisYear = void 0;
    for (var i = 0; i < years.length; i++) {
        if (ym && years[i].year === ym.year) {
            yearIndexes[idx] = i;
            return ym;
        } else if (years[i].year === __YEAR) {
            foundThisYear = i;
        }
    }

    if (typeof foundThisYear === 'number') {
        yearIndexes[idx] = foundThisYear;
        return { year: __YEAR };
    }

    var last = yearIndexes[idx] = years.length - 1;
    var y = years[last];
    return { year: y.year, month: Math.floor((y.max - y.min) / 2) };
}

function validValue(value, years, yearIndexes) {
    value = value || {};
    if (typeof value.year === 'number') {
        var _validate = validate(value, years, 0, yearIndexes),
            year = _validate.year,
            month = _validate.month;

        return { type: 'single', pads: 1, year: year, month: month };
    } else if (Array.isArray(value) && value.length > 0) {
        return {
            type: 'multiple', pads: 1,
            choices: value.map(function (v, i) {
                return validate(v, years, 0, i === 0 ? yearIndexes : [0]);
            })
        };
    } else if (value.from && value.to) {
        var from = validate(value.from, years, 0, yearIndexes),
            to = validate(value.to, years, 1, yearIndexes);
        if (from.year > to.year || from.year === to.year && from.month > to.month) {
            from.year = to.year;
            from.month = to.month;
            if (from.month < 1) {
                from.year--;
                from.month += 12;
            }
        }
        return { type: 'range', pads: 2, from: from, to: to };
    }
    return { pads: 0 };
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


function validateAutoRange(n) {
    if (n <= 0) return 0;
    return Math.floor(n);
}

function compareYM(ym1, ym2) {
    var d = ym1.year - ym2.year;
    return d === 0 ? ym1.month - ym2.month : d;
}

var TypeYM = _propTypes2.default.shape({
    year: _propTypes2.default.number,
    month: _propTypes2.default.number
});

var MonthPicker = function (_Component) {
    _inherits(MonthPicker, _Component);

    function MonthPicker(props, context) {
        _classCallCheck(this, MonthPicker);

        if (props.range) {
            console.warn('Property "range" is deprecated, and use property "value" instead');
        }

        var _this = _possibleConstructorReturn(this, (MonthPicker.__proto__ || Object.getPrototypeOf(MonthPicker)).call(this, props, context));

        _initialiseProps.call(_this);

        var yearArr = getYearArray(_this.props.years);
        var yearIndexes = [0];
        var rawValue = validValue(_this.props.value, yearArr, yearIndexes);
        if (!rawValue.type) {
            throw new Error('invalid value of property "value" in month-picker');
        }
        _this.state = {
            age: _this.props.age,
            autoRange: validateAutoRange(_this.props.autoRange),
            years: yearArr,
            rawValue: rawValue,
            yearIndexes: yearIndexes,
            showed: false,
            closeable: false
        };
        return _this;
    }

    _createClass(MonthPicker, [{
        key: 'value',
        value: function value() {
            var _state$rawValue = this.state.rawValue,
                year = _state$rawValue.year,
                month = _state$rawValue.month,
                choices = _state$rawValue.choices,
                from = _state$rawValue.from,
                to = _state$rawValue.to;

            if (from && to) return { from: from, to: to };else if (choices && choices.length > 0) return choices;else if (year && month) return { year: year, month: month };
            return null;
        }

        // getSnapshotBeforeUpdate(prevProps, prevState) {
        //     // ...
        // }
        // componentDidUpdate(prevProps, prevState) {
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

            var _state = this.state,
                ymArr = _state.years,
                rawValue = _state.rawValue,
                yearIndexes = _state.yearIndexes,
                autoRange = _state.autoRange;

            var yearIdx = yearIndexes[padIndex];
            var labelYear = ymArr[yearIdx].year;

            var values = [];
            var isRange = false;
            if (rawValue.type === 'single') {
                if (rawValue.year === labelYear) {
                    rawValue.month && values.push(rawValue.month);
                }
            } else if (rawValue.type === 'multiple') {
                var choices = rawValue.choices;
                choices.forEach(function (c) {
                    if (labelYear === c.year) {
                        c.month && values.push(c.month);
                    }
                });
            } else if (rawValue.type === 'range') {
                isRange = true;
                var from = rawValue.from,
                    to = rawValue.to;

                var startM = labelYear === from.year ? from.month : 1;
                var endM = labelYear === to.year ? to.month : 12;
                for (var i = startM; i <= endM; i++) {
                    values.push(i);
                }
            }

            var lang = this.props.lang || [];
            var months = Array.isArray(lang) ? lang : Array.isArray(lang.months) ? lang.months : [];
            var prevCss = '',
                nextCss = '';
            var yearMaxIdx = ymArr.length - 1;

            var atMinYear = labelYear === ymArr[0].year;
            var atMaxYear = labelYear === ymArr[yearMaxIdx].year;
            var otherValue = { year: 0, month: 0 },
                labelPreText = void 0;
            if (isRange) {
                otherValue = rawValue[_RANGE_KEYS[1 - padIndex]];
                labelPreText = _react2.default.createElement(
                    'b',
                    null,
                    this.props.lang[_RANGE_KEYS[padIndex]]
                );
            }

            if (yearIdx === 0) prevCss = 'disable';
            if (yearIdx === yearMaxIdx) nextCss = 'disable';
            if (autoRange === 0) {
                if (padIndex === 1 && otherValue.year === labelYear) prevCss = 'disable';
                if (padIndex === 0 && otherValue.year === labelYear) nextCss = 'disable';
            }

            var prevHandler = prevCss === 'disable' ? undefined : this._goPrevYear;
            var nextHandler = nextCss === 'disable' ? undefined : this._goNextYear;

            var valOffset = 0;

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
                        { className: ["rmp-tab", "rmp-btn", "prev", prevCss].join(' '), 'data-id': padIndex, onClick: prevHandler },
                        '<'
                    ),
                    _react2.default.createElement(
                        'i',
                        { className: ["rmp-tab", "rmp-btn", "next", nextCss].join(' '), 'data-id': padIndex, onClick: nextHandler },
                        '>'
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    mapToArray(12, function (i) {
                        var m = i + 1;
                        var css = '';

                        if (atMinYear && m < ymArr[0].min) {
                            css = 'disable';
                        } else if (atMaxYear && m > ymArr[yearMaxIdx].max) {
                            css = 'disable';
                        } else {
                            var _from = rawValue.from,
                                _to = rawValue.to;

                            for (var _i = valOffset, last = values.length - 1; _i <= last; _i++) {
                                var v = values[_i];
                                if (v === m) {
                                    valOffset++;
                                    if (!isRange || _from.year === labelYear && padIndex === 0 && _i === 0 || _to.year === labelYear && padIndex === 1 && _i === last) {
                                        css = 'active';
                                    } else if (labelYear >= _from.year && labelYear <= _to.year) {
                                        css = 'select';
                                    }
                                }
                            }
                            if (_this2.state.autoRange === 0) {
                                var otherM = otherValue.month;
                                if (otherM) {
                                    if (padIndex === 0 && nextCss === 'disable' && m > otherM || padIndex === 1 && prevCss === 'disable' && m < otherM) {
                                        css = 'disable';
                                    }
                                }
                            }
                        }
                        var clickHandler = css !== 'disable' ? _this2._handleClickMonth : undefined;
                        return _react2.default.createElement(
                            'li',
                            { key: i, className: ["rmp-btn", rawValue.type, css].join(' '),
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
            if (this.state.rawValue.type === 'range') {
                pads.push(this.optionPad(0), this.optionPad(1));
                popupClass = 'range';
            } else {
                pads.push(this.optionPad(0));
            }

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
        key: 'getAvailable',
        value: function getAvailable(n, _ref) {
            var year = _ref.year,
                month = _ref.month;

            if (n === 0) return null;
            month += n - 1;
            while (month > 12 || month < 1) {
                if (month > 12) {
                    month -= 12;
                    year += 1;
                } else {
                    month += 12;
                    year -= 1;
                }
            }

            var years = this.state.years;

            if (n > 0) {
                var y = years[years.length - 1];
                var last = { year: y.year, month: y.max };
                var d = compareYM({ year: year, month: month }, last);
                if (d > 0) return last;
            } else {
                var _y = years[0];
                var first = { year: _y.year, month: _y.min };
                var _d = compareYM({ year: year, month: month }, first);
                if (_d < 0) return first;
            }
            return { year: year, month: month };
        }
    }, {
        key: 'setYear',
        value: function setYear(idx, step) {
            var yearIndexes = this.state.yearIndexes.concat();
            yearIndexes[idx] += step;
            this.setState({ yearIndexes: yearIndexes });

            var theYear = this.state.years[yearIndexes[idx]].year;
            this.props.onYearChange && this.props.onYearChange(theYear);
        }
    }, {
        key: 'getDID',
        value: function getDID(e) {
            var el = e.target;
            return el.dataset ? el.dataset.id : el.getAttribute('data-id');
        }

        // hasStyleClass(e, name) {
        //     const el = e.target
        //     const styleClass = el.getAttribute('class').split(' ')
        //     return styleClass.includes(name)
        // }

    }, {
        key: '_reset',
        value: function _reset() {
            var rawValue = validValue(this.props.value, this.state.years, this.state.yearIndexes);
            return { rawValue: rawValue };
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props, state) {
            if (props.age > state.age) {
                var yearArr = getYearArray(props.years);
                var yearIndexes = [0];
                var rawValue = validValue(props.value, yearArr, yearIndexes);
                return {
                    age: props.age,
                    autoRange: validateAutoRange(props.autoRange),
                    years: yearArr,
                    rawValue: rawValue,
                    yearIndexes: yearIndexes
                };
            }
            // No state update necessary
            return null;
        }
    }]);

    return MonthPicker;
}(_react.Component);

MonthPicker.propTypes = {
    age: _propTypes2.default.number,
    autoRange: _propTypes2.default.number,
    years: _propTypes2.default.oneOfType([_propTypes2.default.number, // exact number of a year
    _propTypes2.default.arrayOf(_propTypes2.default.number), // array of specific years: [2008, 2011, 2012, 2014, 2016]
    _propTypes2.default.shape({ // { min: 2013 } | { min: {year: 2013, month: 4} } | { min: {year: 2013, month: 4}, max: {year: 2016, month: 9} }
        min: _propTypes2.default.oneOfType([_propTypes2.default.number, TypeYM]),
        max: _propTypes2.default.oneOfType([_propTypes2.default.number, TypeYM])
    })]),
    value: _propTypes2.default.oneOfType([TypeYM, _propTypes2.default.arrayOf(TypeYM), _propTypes2.default.shape({
        from: TypeYM,
        to: TypeYM
    })]),
    lang: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), // lang texts for months: ['Jan', 'Feb', 'Mar', 'Apr', ... ]
    _propTypes2.default.shape({
        months: _propTypes2.default.arrayOf(_propTypes2.default.string),
        from: _propTypes2.default.string, // lang text for 'from'
        to: _propTypes2.default.string // lang text for 'to'
    })]),
    onChange: _propTypes2.default.func,
    onYearChange: _propTypes2.default.func,
    onShow: _propTypes2.default.func,
    onDismiss: _propTypes2.default.func,
    onClickAway: _propTypes2.default.func,
    theme: _propTypes2.default.string
};
MonthPicker.defaultProps = {
    age: 0,
    autoRange: 0,
    years: getYearsByNum(5),
    onChange: function onChange(year, month, idx) {},

    theme: 'light'
};

var _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this._handleOverlayTouchTap = function (e) {
        if (_this4.state.closeable) {
            _this4._onDismiss();
            _this4.props.onClickAway && _this4.props.onClickAway(e);
        }
    };

    this._handleClickMonth = function (e) {
        if (_this4.state.showed) {
            var refid = _this4.getDID(e).split(':');
            var idx = parseInt(refid[0], 10);
            var month = parseInt(refid[1], 10);
            var year = _this4.state.years[_this4.state.yearIndexes[idx]].year;
            var rawValue = Object.assign({}, _this4.state.rawValue);
            var update = { rawValue: rawValue };
            if (rawValue.type === 'single') {
                Object.assign(rawValue, { year: year, month: month });
            } else if (rawValue.type === 'multiple') {
                Object.assign(rawValue, { choices: rawValue.choices.concat() });
                var existIndex = rawValue.choices.findIndex(function (c) {
                    return c.year === year && c.month === month;
                });
                if (existIndex < 0) {
                    rawValue.choices.push({ year: year, month: month });
                    rawValue.choices.sort(function (a, b) {
                        return a.year === b.year ? a.month - b.month : a.year - b.year;
                    });
                } else {
                    rawValue.choices.splice(existIndex, 1);
                }
            } else if (rawValue.type === 'range') {
                var keys = _RANGE_KEYS;
                var thisKey = keys[idx],
                    otherKey = keys[1 - idx];
                var pick = { year: year, month: month };
                Object.assign(rawValue, _defineProperty({}, thisKey, pick));

                var d = compareYM(pick, rawValue[otherKey]);
                if (thisKey === 'from' && d > 0 || thisKey === 'to' && d < 0) {
                    var n = Math.sign(d) * _this4.state.autoRange;
                    var otherV = _this4.getAvailable(n, { year: year, month: month });
                    if (otherV) {
                        Object.assign(rawValue, _defineProperty({}, otherKey, otherV));
                        var _state2 = _this4.state,
                            yearIndexes = _state2.yearIndexes,
                            years = _state2.years;

                        for (var i = 0, l = years.length; i < l; i++) {
                            if (years[i].year === otherV.year) {
                                update.yearIndexes = yearIndexes.concat();
                                update.yearIndexes[1 - idx] = i;
                                break;
                            }
                        }
                    }
                }
            }
            _this4.setState(update);
            _this4.props.onChange(year, month, idx);
        }
    };

    this._goPrevYear = function (e) {
        var idx = parseInt(_this4.getDID(e), 10);
        if (_this4.state.yearIndexes[idx] > 0) {
            _this4.setYear(idx, -1);
        }
    };

    this._goNextYear = function (e) {
        var idx = parseInt(_this4.getDID(e), 10);
        if (_this4.state.yearIndexes[idx] < _this4.state.years.length - 1) {
            _this4.setYear(idx, 1);
        }
    };

    this._keyDown = function (e) {
        if (!_this4.state.showed) return;

        var _state$rawValue2 = _this4.state.rawValue,
            type = _state$rawValue2.type,
            pads = _state$rawValue2.pads,
            year = _state$rawValue2.year,
            month = _state$rawValue2.month,
            choices = _state$rawValue2.choices;


        if (e.key === 'Escape') {
            _this4._onDismiss(_this4._reset());
            e.stopPropagation();
        } else if (e.key === 'Enter') {
            _this4._onDismiss();
            e.stopPropagation();
        } else if (pads === 1) {
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
    };
};

exports.default = MonthPicker;
