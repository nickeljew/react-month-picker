/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = PropTypes;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTapper = __webpack_require__(8);

var _reactTapper2 = _interopRequireDefault(_reactTapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

var __MIN_VALID_YEAR = 1970;

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

    if (n && n > 0 && n < 1000) {
        minYear = minYear || maxYear - n + 1;
    } else {
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

var MonthPicker = function (_Component) {
    _inherits(MonthPicker, _Component);

    function MonthPicker(props, context) {
        _classCallCheck(this, MonthPicker);

        var _this = _possibleConstructorReturn(this, (MonthPicker.__proto__ || Object.getPrototypeOf(MonthPicker)).call(this, props, context));

        var yearArr = getYearArray(_this.props.years),
            yearIndexes = [0],
            values = _this.validValues(_this.props.range || _this.props.value, yearArr, yearIndexes);
        _this.state = {
            years: yearArr,
            values: values,
            labelYears: [false, false],
            showed: _this.props.show,
            closeable: _this.props.show,
            yearIndexes: yearIndexes,
            lastRange: _this.props.range,
            lastValue: _this.props.value
        };

        _this._handleOverlayTouchTap = _this._handleOverlayTouchTap.bind(_this);
        _this.handleClickMonth = _this.handleClickMonth.bind(_this);
        _this.goPrevYear = _this.goPrevYear.bind(_this);
        _this.goNextYear = _this.goNextYear.bind(_this);
        _this._keyDown = _this._keyDown.bind(_this);
        return _this;
    }

    _createClass(MonthPicker, [{
        key: 'validate',
        value: function validate(d, years, idx, yearIndexes) {
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
    }, {
        key: 'validValues',
        value: function validValues(v, years, yearIndexes) {
            if (!v) return [];
            if (v.from || v.to) {
                var from = this.validate(v.from, years, 0, yearIndexes),
                    to = this.validate(v.to, years, 1, yearIndexes);
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
            return [this.validate(v, years, 0, yearIndexes)];
        }
    }, {
        key: 'value',
        value: function value() {
            var values = this.state.values;
            if (values.length >= 2) return { from: values[0], to: values[1] };else if (values.length === 1) return values[0];
            return {};
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var yearArr = getYearArray(nextProps.years),
                yearIndexes = this.state.yearIndexes,
                nextValues = nextProps.range || nextProps.value,
                values = this.validValues(nextValues, yearArr, yearIndexes);
            this.setState({
                years: yearArr,
                values: values,
                labelYears: [false, false],
                yearIndexes: yearIndexes,
                lastRange: nextProps.range,
                lastValue: nextProps.value,
                showed: nextProps.show,
                closeable: nextProps.show
            });
        }
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

            var values = this.state.values,
                value = values[padIndex],
                labelYears = this.state.labelYears,
                labelYear = labelYears[padIndex] = labelYears[padIndex] || value.year,
                ymArr = this.state.years,
                lang = this.props.lang || [],
                months = Array.isArray(lang) ? lang : Array.isArray(lang.months) ? lang.months : [],
                prevCss = '',
                nextCss = '',
                yearMaxIdx = ymArr.length - 1,
                yearIdx = this.state.yearIndexes[padIndex];

            if (yearIdx === 0) prevCss = 'disable';
            if (yearIdx === yearMaxIdx) nextCss = 'disable';

            var yearActive = labelYear === value.year,
                atMinYear = labelYear === ymArr[0].year,
                atMaxYear = labelYear === ymArr[yearMaxIdx].year,
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
                        var css = '',
                            m = i + 1;
                        if (yearActive && m === value.month) {
                            css = 'active';
                        }
                        if (atMinYear && m < ymArr[0].min) {
                            css = 'disable';
                        }
                        if (atMaxYear && m > ymArr[yearMaxIdx].max) {
                            css = 'disable';
                        }
                        if (otherValue) {
                            var y = otherValue.year,
                                _m = otherValue.month || 0,
                                vy = labelYear,
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
                            { key: i, className: ["btn", css].join(' '),
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
            this._onShow();
        }
    }, {
        key: '_handleOverlayTouchTap',
        value: function _handleOverlayTouchTap(e) {
            if (this.state.closeable) {
                this._onDismiss();
                this.props.onClickAway && this.props.onClickAway(e);
            }
        }
    }, {
        key: '_onShow',
        value: function _onShow() {
            setTimeout(function () {
                this.state.closeable = true;
            }.bind(this), 250);
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
        key: 'handleClickMonth',
        value: function handleClickMonth(e) {
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
        }
    }, {
        key: 'goPrevYear',
        value: function goPrevYear(e) {
            var idx = parseInt(this.getDID(e), 10);
            if (this.state.yearIndexes[idx] > 0) {
                this.setYear(idx, -1);
            }
        }
    }, {
        key: 'goNextYear',
        value: function goNextYear(e) {
            var idx = parseInt(this.getDID(e), 10);
            if (this.state.yearIndexes[idx] < this.state.years.length - 1) {
                this.setYear(idx, 1);
            }
        }
    }, {
        key: 'setYear',
        value: function setYear(idx, step) {
            var yearIndex = this.state.yearIndexes[idx] += step,
                labelYears = this.state.labelYears,
                theYear = this.state.years[yearIndex].year;
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
            var values = this.validValues(this.state.lastRange || this.state.lastValue, this.state.years, this.state.yearIndexes);
            return { values: values };
        }
    }, {
        key: '_keyDown',
        value: function _keyDown(e) {
            if (!this.state.showed) return;

            if (e.key === 'Escape') {
                this._onDismiss(this._reset());
                e.stopPropagation();
            } else if (e.key === 'Enter') {
                this._onDismiss();
                e.stopPropagation();
            } else if (this.state.values.length === 1) {}
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

exports.default = MonthPicker;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = docReady;

function docReady(callback) {

    function completed() {
        document.removeEventListener("DOMContentLoaded", completed, false);
        window.removeEventListener("load", completed, false);
        callback();
    }

    //Events.on(document, 'DOMContentLoaded', completed)

    if (document.readyState === "complete") {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        setTimeout(callback);
    } else {

        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", completed, false);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", completed, false);
    }
}

module.exports = exports["default"];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
    value: true
});

var dom = {

    isDescendant: function isDescendant(parent, child) {
        var node = child.parentNode;

        while (node !== null) {
            if (node === parent) return true;
            node = node.parentNode;
        }

        return false;
    },

    offset: function offset(el) {
        var rect = el.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    },

    getStyleAttributeAsNumber: function getStyleAttributeAsNumber(el, attr) {
        var attrStyle = el.style[attr];
        var attrNum = 0;
        if (attrStyle && attrStyle.length) {
            attrNum = parseInt(attrStyle);
        }

        return attrNum;
    },

    addClass: function addClass(el, className) {
        if (el.classList) el.classList.add(className);else el.className += ' ' + className;
    },

    removeClass: function removeClass(el, className) {
        if (el.classList) el.classList.remove(className);else el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },

    hasClass: function hasClass(el, className) {
        if (el.classList) return el.classList.contains(className);else return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    },

    toggleClass: function toggleClass(el, className) {
        if (this.hasClass(el, className)) this.removeClass(el, className);else this.addClass(el, className);
    },

    forceRedraw: function forceRedraw(el) {
        var originalDisplay = el.style.display;

        el.style.display = 'none';
        el.offsetHeight;
        el.style.display = originalDisplay;
    },

    withoutTransition: function withoutTransition(el, callback) {
        var originalTransition = el.style.transition;

        //turn off transition
        el.style.transition = null;

        callback();

        //force a redraw
        this.forceRedraw(el);

        //put the transition back
        el.style.transition = originalTransition;
    },

    nodeById: function nodeById(id) {
        return document.getElementById(id);
    },

    nodeBySelector: function nodeBySelector(el, s) {
        return (el || document).querySelector(s);
    },

    nodesBySelector: function nodesBySelector(el, s) {
        return (el || document).querySelectorAll(s);
    },

    text: function text(el, _text) {
        if (typeof _text === 'string') {
            el && (el.innerText = _text);
            return this;
        }
        return el ? el.innerText || el.textContent || '' : '';
    }

};

exports['default'] = dom;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(5);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _es6Docready = __webpack_require__(3);

var _es6Docready2 = _interopRequireDefault(_es6Docready);

var _es6Dom = __webpack_require__(4);

var _es6Dom2 = _interopRequireDefault(_es6Dom);

var _monthPicker = __webpack_require__(2);

var _monthPicker2 = _interopRequireDefault(_monthPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _es6Docready2.default)(function () {
    var MonthBox = function (_Component) {
        _inherits(MonthBox, _Component);

        function MonthBox(props, context) {
            _classCallCheck(this, MonthBox);

            var _this = _possibleConstructorReturn(this, (MonthBox.__proto__ || Object.getPrototypeOf(MonthBox)).call(this, props, context));

            _this.state = {
                value: _this.props.value || 'N/A'
            };

            _this._handleClick = _this._handleClick.bind(_this);
            return _this;
        }

        _createClass(MonthBox, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                this.setState({
                    value: nextProps.value || 'N/A'
                });
            }
        }, {
            key: 'render',
            value: function render() {

                return _react2.default.createElement(
                    'div',
                    { className: 'box', onClick: this._handleClick },
                    _react2.default.createElement(
                        'label',
                        null,
                        this.state.value
                    )
                );
            }
        }, {
            key: '_handleClick',
            value: function _handleClick(e) {
                this.props.onClick && this.props.onClick(e);
            }
        }]);

        return MonthBox;
    }(_react.Component);

    MonthBox.propTypes = {
        value: _propTypes2.default.string,
        onClick: _propTypes2.default.func
    };

    var List = function (_Component2) {
        _inherits(List, _Component2);

        function List(props, context) {
            _classCallCheck(this, List);

            var _this2 = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props, context));

            _this2.state = {
                mvalue: { year: 2014, month: 11 },
                mvalue2: { year: 2016, month: 7 },
                mrange: { from: { year: 2014, month: 8 }, to: { year: 2015, month: 5 } },
                mrange2: { from: { year: 2013, month: 11 }, to: { year: 2016, month: 3 } }
            };

            _this2.handleClickMonthBox = _this2.handleClickMonthBox.bind(_this2);
            _this2.handleAMonthChange = _this2.handleAMonthChange.bind(_this2);
            _this2.handleAMonthDissmis = _this2.handleAMonthDissmis.bind(_this2);

            _this2.handleClickMonthBox2 = _this2.handleClickMonthBox2.bind(_this2);
            _this2.handleAMonthChange2 = _this2.handleAMonthChange2.bind(_this2);
            _this2.handleAMonthDissmis2 = _this2.handleAMonthDissmis2.bind(_this2);

            _this2._handleClickRangeBox = _this2._handleClickRangeBox.bind(_this2);
            _this2.handleRangeChange = _this2.handleRangeChange.bind(_this2);
            _this2.handleRangeDissmis = _this2.handleRangeDissmis.bind(_this2);

            _this2._handleClickRangeBox2 = _this2._handleClickRangeBox2.bind(_this2);
            _this2.handleRangeChange2 = _this2.handleRangeChange2.bind(_this2);
            _this2.handleRangeDissmis2 = _this2.handleRangeDissmis2.bind(_this2);
            return _this2;
        }

        _createClass(List, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                this.setState({
                    value: nextProps.value || 'N/A'
                });
            }
        }, {
            key: 'render',
            value: function render() {

                var pickerLang = {
                    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    from: 'From', to: 'To'
                };
                var mvalue = this.state.mvalue,
                    mvalue2 = this.state.mvalue2,
                    mrange = this.state.mrange,
                    mrange2 = this.state.mrange2;

                var makeText = function makeText(m) {
                    if (m && m.year && m.month) return pickerLang.months[m.month - 1] + '. ' + m.year;
                    return '?';
                };

                return _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            _react2.default.createElement(
                                'b',
                                null,
                                'Pick A Month'
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '(Available years: 2008, 2011, 2012, 2014, 2016)'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'edit' },
                            _react2.default.createElement(
                                _monthPicker2.default,
                                {
                                    ref: 'pickAMonth',
                                    years: [2008, 2011, 2012, 2014, 2016],
                                    value: mvalue,
                                    lang: pickerLang.months,
                                    onChange: this.handleAMonthChange,
                                    onDismiss: this.handleAMonthDissmis
                                },
                                _react2.default.createElement(MonthBox, { value: makeText(mvalue), onClick: this.handleClickMonthBox })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            _react2.default.createElement(
                                'b',
                                null,
                                'Pick A Month'
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '(Available months from Feb.2016 to Sep.2016)'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'edit' },
                            _react2.default.createElement(
                                _monthPicker2.default,
                                {
                                    ref: 'pickAMonth2',
                                    years: { min: { year: 2016, month: 2 }, max: { year: 2016, month: 9 } },
                                    value: mvalue2,
                                    lang: pickerLang.months,
                                    theme: 'dark',
                                    onChange: this.handleAMonthChange2,
                                    onDismiss: this.handleAMonthDissmis2
                                },
                                _react2.default.createElement(MonthBox, { value: makeText(mvalue2), onClick: this.handleClickMonthBox2 })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            _react2.default.createElement(
                                'b',
                                null,
                                'Pick A Span of Months'
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '(Available years from 2013 to this year)'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'edit' },
                            _react2.default.createElement(
                                _monthPicker2.default,
                                {
                                    ref: 'pickRange',
                                    years: { min: 2013 },
                                    range: mrange,
                                    lang: pickerLang,
                                    theme: 'light',
                                    onChange: this.handleRangeChange,
                                    onDismiss: this.handleRangeDissmis
                                },
                                _react2.default.createElement(MonthBox, { value: makeText(mrange.from) + ' ~ ' + makeText(mrange.to), onClick: this._handleClickRangeBox })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            _react2.default.createElement(
                                'b',
                                null,
                                'Pick A Span of Months'
                            ),
                            _react2.default.createElement(
                                'span',
                                null,
                                '(Available months from Apr.2013 to Sep.2016)'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'edit' },
                            _react2.default.createElement(
                                _monthPicker2.default,
                                {
                                    ref: 'pickRange2',
                                    years: { min: { year: 2013, month: 4 }, max: { year: 2016, month: 9 } },
                                    range: mrange2,
                                    lang: pickerLang,
                                    theme: 'dark',
                                    onChange: this.handleRangeChange2,
                                    onDismiss: this.handleRangeDissmis2
                                },
                                _react2.default.createElement(MonthBox, { value: makeText(mrange2.from) + ' ~ ' + makeText(mrange2.to), onClick: this._handleClickRangeBox2 })
                            )
                        )
                    )
                );
            }
        }, {
            key: 'handleClickMonthBox',
            value: function handleClickMonthBox(e) {
                this.refs.pickAMonth.show();
            }
        }, {
            key: 'handleAMonthChange',
            value: function handleAMonthChange(value, text) {}
        }, {
            key: 'handleAMonthDissmis',
            value: function handleAMonthDissmis(value) {
                this.setState({ mvalue: value });
            }
        }, {
            key: 'handleClickMonthBox2',
            value: function handleClickMonthBox2(e) {
                this.refs.pickAMonth2.show();
            }
        }, {
            key: 'handleAMonthChange2',
            value: function handleAMonthChange2(value, text) {}
        }, {
            key: 'handleAMonthDissmis2',
            value: function handleAMonthDissmis2(value) {
                this.setState({ mvalue2: value });
            }
        }, {
            key: '_handleClickRangeBox',
            value: function _handleClickRangeBox(e) {
                this.refs.pickRange.show();
            }
        }, {
            key: 'handleRangeChange',
            value: function handleRangeChange(value, text, listIndex) {}
        }, {
            key: 'handleRangeDissmis',
            value: function handleRangeDissmis(value) {
                this.setState({ mrange: value });
            }
        }, {
            key: '_handleClickRangeBox2',
            value: function _handleClickRangeBox2(e) {
                this.refs.pickRange2.show();
            }
        }, {
            key: 'handleRangeChange2',
            value: function handleRangeChange2(value, text, listIndex) {}
        }, {
            key: 'handleRangeDissmis2',
            value: function handleRangeDissmis2(value) {
                this.setState({ mrange2: value });
            }
        }]);

        return List;
    }(_react.Component);

    var Main = function (_Component3) {
        _inherits(Main, _Component3);

        function Main(props, context) {
            _classCallCheck(this, Main);

            var _this3 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props, context));

            _this3.state = {
                value: _this3.props.value
            };
            return _this3;
        }

        _createClass(Main, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                this.setState({
                    value: nextProps.value
                });
            }
        }, {
            key: 'render',
            value: function render() {

                return _react2.default.createElement(
                    'div',
                    { className: 'list-area' },
                    _react2.default.createElement(List, null)
                );
            }
        }]);

        return Main;
    }(_react.Component);

    Main.propTypes = {
        value: _propTypes2.default.string,
        onClick: _propTypes2.default.func
    };

    _reactDom2.default.render(_react2.default.createElement(Main, null), _es6Dom2.default.nodeById("page-container"));
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var TAGNAMES = {
    'select': 'input',
    'change': 'input',
    'submit': 'form',
    'reset': 'form',
    'error': 'img',
    'load': 'img',
    'abort': 'img'
};

var eventSupport = function eventSupport(eventName) {
    //to support compilation in server-side
    if (typeof window === "undefined" || typeof document === "undefined") return false;
    var el = document.createElement(TAGNAMES[eventName] || 'div');
    eventName = 'on' + eventName;
    var isSupported = eventName in el;
    if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = typeof el[eventName] == 'function';
    }
    el = null;
    return isSupported;
};

exports.default = eventSupport;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(0);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _touchSupport = __webpack_require__(10);

var _touchSupport2 = _interopRequireDefault(_touchSupport);

var _touchStyles = __webpack_require__(9);

var _touchStyles2 = _interopRequireDefault(_touchStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var Tappable = function (_Component) {
    _inherits(Tappable, _Component);

    function Tappable(props, context) {
        _classCallCheck(this, Tappable);

        var _this = _possibleConstructorReturn(this, (Tappable.__proto__ || Object.getPrototypeOf(Tappable)).call(this, props, context));

        _this.state = {
            x: null,
            y: null,
            swiping: false,
            start: 0
        };

        _this.touchable = (0, _touchSupport2.default)();
        return _this;
    }

    _createClass(Tappable, [{
        key: 'render',
        value: function render() {
            var props = this.props,
                style = {};
            _extends(style, _touchStyles2.default, props.style);

            var newComponentProps = _extends({}, props, {
                style: style,
                className: props.className,
                disabled: props.disabled
                //, handlers: this.handlers
            }, this.handlers());

            delete newComponentProps.onTap;
            delete newComponentProps.onPress;
            delete newComponentProps.onPinchStart;
            delete newComponentProps.onPinchMove;
            delete newComponentProps.onPinchEnd;
            delete newComponentProps.moveThreshold;
            delete newComponentProps.pressDelay;
            delete newComponentProps.pressMoveThreshold;
            delete newComponentProps.preventDefault;
            delete newComponentProps.stopPropagation;
            delete newComponentProps.component;
            delete newComponentProps.flickThreshold;
            delete newComponentProps.delta;
            //delete newComponentProps.handlers

            return (0, _react.createElement)(props.component, newComponentProps, props.children);
        }
    }, {
        key: 'calculatePos',
        value: function calculatePos(e) {
            var x = e.changedTouches[0].clientX;
            var y = e.changedTouches[0].clientY;

            var xd = this.state.x - x;
            var yd = this.state.y - y;

            var axd = Math.abs(xd);
            var ayd = Math.abs(yd);

            return {
                deltaX: xd,
                deltaY: yd,
                absX: axd,
                absY: ayd
            };
        }
    }, {
        key: 'touchStart',
        value: function touchStart(e) {
            if (e.touches.length > 1) {
                return;
            }

            if (!this.touchable) {
                console.debug('Damn! You are using a non-touchable browser simulating touch events!');
                this.touchable = true;
            }

            this.setState({
                start: Date.now(),
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                swiping: false
            });
        }
    }, {
        key: 'touchMove',
        value: function touchMove(e) {
            if (!this.state.x || !this.state.y || e.touches.length > 1) {
                return;
            }

            var cancelPageSwipe = false;
            var pos = this.calculatePos(e);

            if (pos.absX < this.props.delta && pos.absY < this.props.delta) {
                return;
            }

            if (pos.absX > pos.absY) {
                if (pos.deltaX > 0) {
                    if (this.props.onSwipingLeft) {
                        this.props.onSwipingLeft(e, pos.absX);
                        cancelPageSwipe = true;
                    }
                } else {
                    if (this.props.onSwipingRight) {
                        this.props.onSwipingRight(e, pos.absX);
                        cancelPageSwipe = true;
                    }
                }
            } else {
                if (pos.deltaY > 0) {
                    if (this.props.onSwipingUp) {
                        this.props.onSwipingUp(e, pos.absY);
                        cancelPageSwipe = true;
                    }
                } else {
                    if (this.props.onSwipingDown) {
                        this.props.onSwipingDown(e, pos.absY);
                        cancelPageSwipe = true;
                    }
                }
            }

            this.setState({ swiping: true });

            if (cancelPageSwipe) {
                e.preventDefault();
            }
        }
    }, {
        key: 'touchEnd',
        value: function touchEnd(ev) {
            if (this.state.swiping) {
                var pos = this.calculatePos(ev);

                var time = Date.now() - this.state.start;
                var velocity = Math.sqrt(pos.absX * pos.absX + pos.absY * pos.absY) / time;
                var isFlick = velocity > this.props.flickThreshold;

                this.props.onSwiped && this.props.onSwiped(ev, pos.deltaX, pos.deltaY, isFlick);

                if (pos.absX > pos.absY) {
                    if (pos.deltaX > 0) {
                        this.props.onSwipedLeft && this.props.onSwipedLeft(ev, pos.deltaX);
                    } else {
                        this.props.onSwipedRight && this.props.onSwipedRight(ev, pos.deltaX);
                    }
                } else {
                    if (pos.deltaY > 0) {
                        this.props.onSwipedUp && this.props.onSwipedUp(ev, pos.deltaY);
                    } else {
                        this.props.onSwipedDown && this.props.onSwipedDown(ev, pos.deltaY);
                    }
                }
            } else {
                this._handleTap(ev);
            }

            this.setState(this.getInitialState());
        }
    }, {
        key: 'touchCancel',
        value: function touchCancel(ev) {
            this.setState(this.getInitialState());
        }
    }, {
        key: '_handleClick',
        value: function _handleClick(ev) {
            var _this2 = this;

            //!this.touchable && this._handleTap(ev)
            if (this.state.start === 0) {
                this._handleTap(ev);
            } else {
                setTimeout(function () {
                    _this2.state.start === 0 && _this2._handleTap(ev);
                }, 300);
            }
        }
    }, {
        key: '_handleTap',
        value: function _handleTap(ev) {
            this.props.onTap && this.props.onTap(ev);
        }
    }, {
        key: 'handlers',
        value: function handlers() {
            return {
                onTouchStart: this.touchStart.bind(this),
                onTouchMove: this.touchMove.bind(this),
                onTouchEnd: this.touchEnd.bind(this),
                onTouchCancel: this.touchCancel.bind(this),
                onClick: this._handleClick.bind(this)
            };
        }
    }]);

    return Tappable;
}(_react.Component);

Tappable.propTypes = {
    component: _propTypes2.default.any,
    onTap: _propTypes2.default.func,

    onSwiped: _propTypes2.default.func,
    onSwipingUp: _propTypes2.default.func,
    onSwipingRight: _propTypes2.default.func,
    onSwipingDown: _propTypes2.default.func,
    onSwipingLeft: _propTypes2.default.func,
    onSwipedUp: _propTypes2.default.func,
    onSwipedRight: _propTypes2.default.func,
    onSwipedDown: _propTypes2.default.func,
    onSwipedLeft: _propTypes2.default.func,
    flickThreshold: _propTypes2.default.number,
    delta: _propTypes2.default.number
};

Tappable.defaultProps = {
    component: 'div',
    flickThreshold: 0.6,
    delta: 10
};

exports.default = Tappable;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var touchStyles = {
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none'
};

exports.default = touchStyles;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _eventSupport = __webpack_require__(7);

var _eventSupport2 = _interopRequireDefault(_eventSupport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __TouchSupported = void 0;
var touchSupport = function touchSupport() {
    if (typeof __TouchSupported === 'boolean') return __TouchSupported;

    __TouchSupported = (0, _eventSupport2.default)("touchstart"); //("ontouchstart" in document.documentElement)
    return __TouchSupported;
};

exports.default = touchSupport;


/***/ })
/******/ ]);