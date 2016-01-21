/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _es6Docready = __webpack_require__(3);

	var _es6Docready2 = _interopRequireDefault(_es6Docready);

	var _es6Dom = __webpack_require__(4);

	var _es6Dom2 = _interopRequireDefault(_es6Dom);

	var _monthPicker = __webpack_require__(5);

	var _monthPicker2 = _interopRequireDefault(_monthPicker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _es6Docready2.default)(function () {

	    var MonthBox = _react2.default.createClass({
	        displayName: 'MonthBox',

	        propTypes: {
	            value: _react2.default.PropTypes.string,
	            onClick: _react2.default.PropTypes.func
	        },
	        getInitialState: function getInitialState() {
	            return {
	                value: this.props.value || 'N/A'
	            };
	        },
	        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	            this.setState({
	                value: nextProps.value || 'N/A'
	            });
	        },
	        render: function render() {

	            return _react2.default.createElement(
	                'div',
	                { className: 'box', onClick: this._handleClick },
	                _react2.default.createElement(
	                    'label',
	                    null,
	                    this.state.value
	                )
	            );
	        },
	        _handleClick: function _handleClick(e) {
	            this.props.onClick && this.props.onClick(e);
	        }
	    });

	    var List = _react2.default.createClass({
	        displayName: 'List',

	        propTypes: {},
	        getDefaultProps: function getDefaultProps() {
	            return {};
	        },
	        getInitialState: function getInitialState() {
	            return {
	                mvalue: { year: 2015, month: 11 },
	                mrange: { from: { year: 2014, month: 8 }, to: { year: 2015, month: 5 } }
	            };
	        },
	        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	            this.setState({});
	        },
	        componentDidMount: function componentDidMount() {},
	        render: function render() {

	            var pickerLang = {
	                months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	                from: 'From', to: 'To'
	            },
	                mvalue = this.state.mvalue,
	                mrange = this.state.mrange;

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
	                        'Pick A Month'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'edit' },
	                        _react2.default.createElement(
	                            _monthPicker2.default,
	                            {
	                                ref: 'pickAMonth',
	                                years: [2008, 2010, 2011, 2012, 2014, 2015, 2016, 2017],
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
	                        'Pick A Span of Months'
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
	                                theme: 'dark',
	                                onChange: this.handleRangeChange,
	                                onDismiss: this.handleRangeDissmis
	                            },
	                            _react2.default.createElement(MonthBox, { value: makeText(mrange.from) + ' ~ ' + makeText(mrange.to), onClick: this._handleClickRangeBox })
	                        )
	                    )
	                )
	            );
	        },
	        handleClickMonthBox: function handleClickMonthBox(e) {
	            this.refs.pickAMonth.show();
	        },
	        handleAMonthChange: function handleAMonthChange(value, text) {},
	        handleAMonthDissmis: function handleAMonthDissmis(value) {
	            this.setState({ mvalue: value });
	        },
	        _handleClickRangeBox: function _handleClickRangeBox(e) {
	            this.refs.pickRange.show();
	        },
	        handleRangeChange: function handleRangeChange(value, text, listIndex) {},
	        handleRangeDissmis: function handleRangeDissmis(value) {
	            this.setState({ mrange: value });
	        }
	    });

	    var Main = _react2.default.createClass({
	        displayName: 'Main',

	        propTypes: {
	            value: _react2.default.PropTypes.string,
	            onClick: _react2.default.PropTypes.func
	        },
	        getInitialState: function getInitialState() {
	            return {
	                value: this.props.value
	            };
	        },
	        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	            this.setState({
	                value: nextProps.value
	            });
	        },
	        render: function render() {

	            return _react2.default.createElement(
	                'div',
	                { className: 'list-area' },
	                _react2.default.createElement(List, null)
	            );
	        }
	    });

	    _reactDom2.default.render(_react2.default.createElement(Main, null), _es6Dom2.default.nodeById("page-container"));
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactTapper = __webpack_require__(6);

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
	        onShow: _react2.default.PropTypes.func,
	        onDismiss: _react2.default.PropTypes.func,
	        onClickAway: _react2.default.PropTypes.func,
	        theme: _react2.default.PropTypes.string
	    },

	    validate: function validate(d, years, idx, yearIndexes) {
	        var now = new Date(),
	            thisYear = now.getFullYear(),
	            ym = undefined;
	        if (d && typeof d.year === 'number' && d.year > __MIN_VALID_YEAR && typeof d.month === 'number' && d.month >= 1 && d.month <= 12) {
	            ym = d;
	        }

	        var foundThisYear = undefined;
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
	    },
	    optionPad: function optionPad(padIndex) {
	        var _this = this;

	        var values = this.state.values,
	            value = values[padIndex],
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
	        if (yearIdx === 0) prevCss = 'disable';
	        if (yearIdx === yearMaxIdx) nextCss = 'disable';

	        var yearActive = labelYear === value.year,
	            otherValue = false;
	        if (values.length > 1) {
	            otherValue = values[1 - padIndex];
	        }

	        var labelTextKey = padIndex === 0 ? 'from' : 'to',
	            labelPreText = undefined;
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
	        this._onShow();
	    },
	    _handleOverlayTouchTap: function _handleOverlayTouchTap() {
	        if (this.closeable) {
	            this._onDismiss();
	            this.props.onClickAway && this.props.onClickAway();
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
	        var refid = this.getDID(e).split(':'),
	            idx = parseInt(refid[0], 10),
	            month = parseInt(refid[1], 10),
	            year = this.state.labelYears[idx],
	            values = this.state.values;
	        values[idx] = { year: year, month: month };
	        this.setState({
	            values: values
	        });
	        this.props.onChange(year, month, idx);
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
	    },
	    getDID: function getDID(e) {
	        var el = e.target;
	        return el.dataset ? el.dataset.id : el.getAttribute('data-id');
	    }
	});

	exports.default = MonthPicker;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _touchSupport = __webpack_require__(7);

	var _touchSupport2 = _interopRequireDefault(_touchSupport);

	var _touchStyles = __webpack_require__(9);

	var _touchStyles2 = _interopRequireDefault(_touchStyles);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];for (var key in source) {
	            if (Object.prototype.hasOwnProperty.call(source, key)) {
	                target[key] = source[key];
	            }
	        }
	    }return target;
	};

	var Tappable = _react2.default.createClass({
	    displayName: 'Tappable',

	    propTypes: {
	        component: _react2.default.PropTypes.any,
	        onTap: _react2.default.PropTypes.func,

	        onSwiped: _react2.default.PropTypes.func,
	        onSwipingUp: _react2.default.PropTypes.func,
	        onSwipingRight: _react2.default.PropTypes.func,
	        onSwipingDown: _react2.default.PropTypes.func,
	        onSwipingLeft: _react2.default.PropTypes.func,
	        onSwipedUp: _react2.default.PropTypes.func,
	        onSwipedRight: _react2.default.PropTypes.func,
	        onSwipedDown: _react2.default.PropTypes.func,
	        onSwipedLeft: _react2.default.PropTypes.func,
	        flickThreshold: _react2.default.PropTypes.number,
	        delta: _react2.default.PropTypes.number
	    },
	    touchable: (0, _touchSupport2.default)(),
	    getDefaultProps: function getDefaultProps() {
	        return {
	            component: 'div',
	            flickThreshold: 0.6,
	            delta: 10
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            x: null,
	            y: null,
	            swiping: false,
	            start: 0
	        };
	    },
	    calculatePos: function calculatePos(e) {
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
	    },
	    touchStart: function touchStart(e) {
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
	    },
	    touchMove: function touchMove(e) {
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
	    },
	    touchEnd: function touchEnd(ev) {
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
	    },
	    _handleClick: function _handleClick(ev) {
	        !this.touchable && this._handleTap(ev);
	    },
	    _handleTap: function _handleTap(ev) {
	        this.props.onTap && this.props.onTap(ev);
	    },
	    handlers: function handlers() {
	        return {
	            onTouchStart: this.touchStart,
	            onTouchMove: this.touchMove,
	            onTouchEnd: this.touchEnd,
	            onClick: this._handleClick
	        };
	    },
	    render: function render() {

	        var props = this.props,
	            style = {};
	        _extends(style, _touchStyles2.default, props.style);

	        var newComponentProps = _extends({}, props, {
	            style: style,
	            className: props.className,
	            disabled: props.disabled,
	            handlers: this.handlers
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

	        return _react2.default.createElement(props.component, newComponentProps, props.children);
	    }
	});

	exports.default = Tappable;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _eventSupport = __webpack_require__(8);

	var _eventSupport2 = _interopRequireDefault(_eventSupport);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var __TouchSupported = undefined;
	var touchSupport = function touchSupport() {
	    if (typeof __TouchSupported === 'boolean') return __TouchSupported;

	    __TouchSupported = (0, _eventSupport2.default)("touchstart"); //("ontouchstart" in document.documentElement)
	    return __TouchSupported;
	};

	exports.default = touchSupport;


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

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


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

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

	//cursor: 'pointer'
	exports.default = touchStyles;


/***/ }
/******/ ]);