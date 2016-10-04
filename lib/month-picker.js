'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTapper = require('react-tapper');

var _reactTapper2 = _interopRequireDefault(_reactTapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __MIN_VALID_YEAR = 1970;

function mapToArray(num, callback) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(callback(i));
    }
    return arr;
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
        return minYear + i;
    });
}

function getYearArray(years) {
    if (Array.isArray(years)) return years;
    if ((typeof years === 'undefined' ? 'undefined' : _typeof(years)) === 'object') {
        var n = 0,
            min = 0;
        if (typeof years.min === 'number' && years.min > __MIN_VALID_YEAR) min = years.min;
        if (typeof years.max === 'number' && years.max >= min) n = years.max;
        return getYearsByNum(n, min);
    } else if (typeof years === 'number' && years > 0) return getYearsByNum(years);else return getYearsByNum(5);
}

var MonthPicker = _react2.default.createClass({
    displayName: 'MonthPicker',


    propTypes: {
        years: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object, _react2.default.PropTypes.number]),
        value: _react2.default.PropTypes.object,
        range: _react2.default.PropTypes.object,
        lang: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]),
        onChange: _react2.default.PropTypes.func,
        onYearChange: _react2.default.PropTypes.func,
        onShow: _react2.default.PropTypes.func,
        onDismiss: _react2.default.PropTypes.func,
        onClickAway: _react2.default.PropTypes.func,
        theme: _react2.default.PropTypes.string
    },

    validate: function validate(d, years, idx, yearIndexes) {
        var now = new Date(),
            thisYear = now.getFullYear(),
            ym = void 0;
        if (d && typeof d.year === 'number' && d.year > __MIN_VALID_YEAR && typeof d.month === 'number' && d.month >= 1 && d.month <= 12) {
            ym = d;
        }

        var foundThisYear = void 0;
        for (var i = 0; i < years.length; i++) {
            if (ym && years[i] == ym.year) {
                yearIndexes[idx] = i;
                return ym;
            } else if (years[i] == thisYear) {
                foundThisYear = i;
            }
        }

        if (typeof foundThisYear === 'number') {
            yearIndexes[idx] = foundThisYear;
            return { year: thisYear };
        }

        var last = yearIndexes[idx] = years.length - 1;
        return { year: years[last] };
    },
    validValues: function validValues(v, years, yearIndexes) {
        if (!v) return [];
        if (v.from || v.to) {
            var from = this.validate(v.from, years, 0, yearIndexes),
                to = this.validate(v.to, years, 1, yearIndexes);
            if (from.year > to.year || from.year === to.year && from.month >= to.month) {
                from.year = to.year;
                from.month = to.month - 5;
                if (from.month < 1) {
                    from.year--;
                    from.month += 12;
                }
            }
            return [from, to];
        }
        return [this.validate(v, years, 0, yearIndexes)];
    },
    value: function value() {
        var values = this.state.values;
        if (values.length >= 2) return { from: values[0], to: values[1] };else if (values.length === 1) return values[0];
        return {};
    },
    getDefaultProps: function getDefaultProps() {
        return {
            years: getYearsByNum(5),
            onChange: function onChange(year, month, idx) {},
            theme: 'light'
        };
    },
    getInitialState: function getInitialState() {
        var yearArr = getYearArray(this.props.years),
            yearIndexes = [0],
            values = this.validValues(this.props.range || this.props.value, yearArr, yearIndexes);
        return {
            years: yearArr,
            values: values,
            labelYears: [false, false],
            showed: false,
            yearIndexes: yearIndexes
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var yearArr = getYearArray(nextProps.years),
            yearIndexes = this.state.yearIndexes,
            values = this.validValues(nextProps.range || nextProps.value, yearArr, yearIndexes);
        this.setState({
            years: yearArr,
            values: values,
            labelYears: [false, false],
            yearIndexes: yearIndexes
        });
    }

    //, componentDidMount () {}
    //, componentWillUnmount () {}

    ,
    optionPad: function optionPad(padIndex) {
        var _this = this;

        var values = this.state.values,
            value = values[padIndex],
            yearIndex = this.state.yearIndexes[padIndex],
            labelYears = this.state.labelYears,
            labelYear = labelYears[padIndex] = labelYears[padIndex] || value.year,
            years = this.state.years,
            lang = this.props.lang || [],
            months = Array.isArray(lang) ? lang : Array.isArray(lang.months) ? lang.months : [],
            prevCss = '',
            nextCss = '',
            yearMaxIdx = years.length - 1,
            yearIdx = yearMaxIdx;

        for (var i = 0; i < years.length; i++) {
            if (value.year === years[i]) {
                yearIdx = i;
                break;
            }
        }

        if ( yearIndex === 0 ) {
            prevCss = 'disable';
        }
        if ( yearMaxIdx === yearIndex  ) {
            nextCss = 'disable';
        }

        var yearActive = labelYear === value.year,
            otherValue = false;
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
            { className: 'pad', key: padIndex },
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
                    { className: ["tab", "btn", "prev", prevCss].join(' '), 'data-id': padIndex, onClick: this.goPrevYear },
                    '<'
                ),
                _react2.default.createElement(
                    'i',
                    { className: ["tab", "btn", "next", nextCss].join(' '), 'data-id': padIndex, onClick: this.goNextYear },
                    '>'
                )
            ),
            _react2.default.createElement(
                'ul',
                null,
                mapToArray(12, function (i) {
                    var css = '';
                    if (yearActive && i + 1 == value.month) {
                        css = 'active';
                    }
                    if (otherValue) {
                        var y = otherValue.year,
                            m = otherValue.month || 0,
                            vy = labelYear,
                            vm = i + 1;
                        if (y === vy && m && (padIndex === 0 && vm > m || padIndex === 1 && vm < m)) {
                            css = 'disable';
                        } else if (y > vy && padIndex === 1 || y < vy && padIndex === 0) {
                            css = 'disable';
                        }
                    }
                    var clickHandler = css !== 'disable' ? _this.handleClickMonth : undefined;
                    return _react2.default.createElement(
                        'li',
                        { key: i, className: ["btn", css].join(' '),
                            'data-id': padIndex + ':' + (i + 1),
                            onClick: clickHandler },
                        months.length > i ? months[i] : i
                    );
                })
            )
        );
    },
    render: function render() {
        var pads = [],
            popupClass = '';
        if (this.state.values.length > 1) {
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
                { className: ["container", "table", this.props.className, this.state.showed ? "show" : ''].join(' ') },
                _react2.default.createElement(_reactTapper2.default, { className: 'overlay', onTap: this._handleOverlayTouchTap }),
                _react2.default.createElement(
                    'div',
                    { className: 'cell' },
                    _react2.default.createElement(
                        'div',
                        { className: ["popup", popupClass, this.props.theme, this.state.showed ? "show" : ''].join(' ') },
                        pads
                    )
                )
            )
        );
    },
    closeable: false,

    dismiss: function dismiss() {
        if (this.closeable) {
            this._onDismiss();
        }
    },
    show: function show() {
        // prevent rapid show/hide
        this._onShow();
    },
    _handleOverlayTouchTap: function _handleOverlayTouchTap(e) {
        if (this.closeable) {
            this._onDismiss();
            this.props.onClickAway && this.props.onClickAway(e);
        }
    },
    _onShow: function _onShow() {
        setTimeout(function () {
            this.closeable = true;
        }.bind(this), 250);
        this.setState({ showed: true });
        this.props.onShow && this.props.onShow();
    },
    _onDismiss: function _onDismiss() {
        this.setState({ showed: false, loading: false });
        this.props.onDismiss && this.props.onDismiss(this.value());
    },
    handleClickMonth: function handleClickMonth(e) {
        if (this.state.showed) {
            var refid = this.getDID(e).split(':'),
                idx = parseInt(refid[0], 10),
                month = parseInt(refid[1], 10),
                year = this.state.labelYears[idx],
                values = this.state.values;
            values[idx] = { year: year, month: month };
            this.setState({ values: values });
            this.props.onChange(year, month, idx);
        }
    },
    goPrevYear: function goPrevYear(e) {
        var idx = parseInt(this.getDID(e), 10);
        if (this.state.yearIndexes[idx] > 0) {
            this.setYear(idx, -1);
        }
    },
    goNextYear: function goNextYear(e) {
        var idx = parseInt(this.getDID(e), 10);
        if (this.state.yearIndexes[idx] < this.state.years.length - 1) {
            this.setYear(idx, 1);
        }
    },
    setYear: function setYear(idx, step) {
        var yearIndex = this.state.yearIndexes[idx] += step,
            labelYears = this.state.labelYears;
        labelYears[idx] = this.state.years[yearIndex];
        this.setState({
            labelYears: labelYears
        });
        this.props.onYearChange && this.props.onYearChange();
    },
    getDID: function getDID(e) {
        var el = e.target;
        return el.dataset ? el.dataset.id : el.getAttribute('data-id');
    }
});

exports.default = MonthPicker;
