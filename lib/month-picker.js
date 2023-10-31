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
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactTapper = _interopRequireDefault(require("react-tapper"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
var __MIN_VALID_YEAR = 1000;
var _RANGE_KEYS = ['from', 'to'];
var __YEAR = new Date().getFullYear();
var _NUM_MONTHS = 12;
var _SELECT_CLASS_NAME = 'select';
function mapToArray(num, callback) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(callback(i));
  }
  return arr;
}
function getYearMon(year, min, max) {
  var ym = _typeof(year) === 'object' && year.year ? {
    year: year.year,
    month: year.month
  } : typeof year === 'number' ? {
    year: year
  } : {
    __YEAR: __YEAR
  };
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
  if (_typeof(years) === 'object') {
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
  var ym;
  if (d && typeof d.year === 'number' && d.year > __MIN_VALID_YEAR && typeof d.month === 'number' && d.month >= 1 && d.month <= 12) {
    ym = d;
  }
  var foundThisYear;
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
    return {
      year: __YEAR
    };
  }
  var last = yearIndexes[idx] = years.length - 1;
  var y = years[last];
  return {
    year: y.year,
    month: Math.floor((y.max - y.min) / 2)
  };
}
function validValue(value, years, yearIndexes) {
  value = value || {};
  if (typeof value.year === 'number') {
    var _validate = validate(value, years, 0, yearIndexes),
      year = _validate.year,
      month = _validate.month;
    return {
      type: 'single',
      pads: 1,
      year: year,
      month: month
    };
  } else if (Array.isArray(value) && value.length > 0) {
    return {
      type: 'multiple',
      pads: 1,
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
    return {
      type: 'range',
      pads: 2,
      from: from,
      to: to
    };
  }
  return {
    pads: 0
  };
}
function compareYM(ym1, ym2) {
  var d = ym1.year - ym2.year;
  return d === 0 ? ym1.month - ym2.month : d;
}
function isOlderThan(ym1, ym2) {
  return ym1.year > ym2.year || ym1.year === ym2.year && ym1.month > ym2.month;
}
var TypeYM = _propTypes["default"].shape({
  year: _propTypes["default"].number,
  month: _propTypes["default"].number
});
var MonthPicker = exports["default"] = /*#__PURE__*/function (_Component) {
  _inherits(MonthPicker, _Component);
  var _super = _createSuper(MonthPicker);
  function MonthPicker(props, context) {
    var _this;
    _classCallCheck(this, MonthPicker);
    if (props.range) {
      console.warn('Property "range" is deprecated, and use property "value" instead');
    }
    _this = _super.call(this, props, context);
    _defineProperty(_assertThisInitialized(_this), "_handleOverlayTouchTap", function (e) {
      if (_this.state.closeable) {
        _this._onDismiss();
        _this.props.onClickAway && _this.props.onClickAway(e);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_handleClickMonth", function (e) {
      if (_this.state.showed) {
        var refid = _this.getDID(e).split(':');
        var idx = parseInt(refid[0], 10);
        var month = parseInt(refid[1], 10);
        var year = _this.state.years[_this.state.yearIndexes[idx]].year;
        var rawValue = _objectSpread({}, _this.state.rawValue);
        // This is pass by reference, any change to rawValue will also update update.
        var selectedValue = {
          year: year,
          month: month,
          idx: idx
        };
        if (rawValue.type === 'single') {
          rawValue = _objectSpread(_objectSpread({}, rawValue), {
            year: year,
            month: month
          });
        } else if (rawValue.type === 'multiple') {
          rawValue['choices'] = rawValue.choices.concat();
          var existIndex = rawValue.choices.findIndex(function (c) {
            return c.year === year && c.month === month;
          });
          if (existIndex < 0) {
            rawValue.choices.push({
              year: year,
              month: month
            });
            rawValue.choices.sort(function (a, b) {
              return a.year === b.year ? a.month - b.month : a.year - b.year;
            });
          } else {
            rawValue.choices.splice(existIndex, 1);
          }
        } else if (rawValue.type === 'range') {
          // If the user has already selected a month, then we know what we are adding is the to period.
          // Otherwise we are setting the initial value.
          var pick = {
            year: year,
            month: month
          };
          if (!_this.state.selectedValue && _this.state.rawValue) {
            rawValue['to'] = undefined;
            rawValue['from'] = pick;
          } else {
            var fromValue = rawValue.from;
            rawValue['from'] = isOlderThan(fromValue, pick) ? pick : fromValue;
            rawValue['to'] = isOlderThan(fromValue, pick) ? fromValue : pick;
          }
        }
        var update = {
          selectedValue: selectedValue,
          rawValue: rawValue
        };
        _this.setState(update);
        // We don't want to call the onChange function if the user is in the process of selecting a range.
        if (rawValue.type !== 'range' || rawValue.type === 'range' && update.rawValue.from && update.rawValue.to) {
          _this.props.onChange(update);
          if (rawValue.type !== 'multiple') {
            _this._onDismiss();
          }
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "resetHoverRangeStatus", function () {
      var rawValue = _this.state.rawValue;
      if (rawValue.type === 'range') {
        var monthButtons = [].slice.call(document.getElementsByClassName('range'));
        monthButtons.forEach(function (monthButton) {
          monthButton.classList.remove("select");
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_goPrevYear", function (e) {
      var idx = parseInt(_this.getDID(e), 10);
      if (_this.state.yearIndexes[idx] > 0) {
        _this.resetHoverRangeStatus();
        _this.setYear(idx, -1);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_goNextYear", function (e) {
      var idx = parseInt(_this.getDID(e), 10);
      if (_this.state.yearIndexes[idx] < _this.state.years.length - 1) {
        _this.resetHoverRangeStatus();
        _this.setYear(idx, 1);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "_keyDown", function (e) {
      if (!_this.state.showed) return;
      if (e.key === 'Escape') {
        _this._onDismiss(_this._reset());
        e.stopPropagation();
      } else if (e.key === 'Enter') {
        _this._onDismiss();
        e.stopPropagation();
      }
    });
    var yearArr = getYearArray(_this.props.years);
    var yearIndexes = [0];
    var _rawValue = validValue(_this.props.value, yearArr, yearIndexes);
    if (!_rawValue.type) {
      throw new Error('invalid value of property "value" in month-picker');
    }
    _this.state = {
      age: _this.props.age,
      years: yearArr,
      rawValue: _rawValue,
      selectedValue: undefined,
      yearIndexes: yearIndexes,
      showed: false,
      closeable: false
    };
    return _this;
  }
  _createClass(MonthPicker, [{
    key: "value",
    value: function value() {
      var _this$state$rawValue = this.state.rawValue,
        year = _this$state$rawValue.year,
        month = _this$state$rawValue.month,
        choices = _this$state$rawValue.choices,
        from = _this$state$rawValue.from,
        to = _this$state$rawValue.to;
      if (from && to) return {
        from: from,
        to: to
      };else if (choices && choices.length > 0) return choices;else if (year && month) return {
        year: year,
        month: month
      };
      return null;
    }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     // ...
    // }
    // componentDidUpdate(prevProps, prevState) {
    // }
  }, {
    key: "setHoverState",
    value:
    /**
     * Sets hover state for month buttons when hovering over each month button.
     * @param {number} dataId 
     * ID (ex: 1 for Jan) for month that the user is currently hovering over.
     * @param {boolean} positiveIteration 
     * Whether we are currently in a future year or the hovered month is after the selected date. 
     * @param {number} selectedMonth 
     * The currently selected month
     * @param {boolean} isSameYear 
     * Whether the displayed year is the same year as the selected year
     */
    function setHoverState(dataId, positiveIteration, selectedMonth, isSameYear) {
      if (positiveIteration) {
        for (var i = 1; i <= 12; i += 1) {
          var element = document.querySelector("[data-id=\"0:".concat(i, "\"]"));
          if (element) {
            switch (true) {
              case i < dataId:
                element.classList.remove(_SELECT_CLASS_NAME);
                break;
              case i > selectedMonth && isSameYear:
                element.classList.remove(_SELECT_CLASS_NAME);
                break;
              case i === selectedMonth && isSameYear:
                break;
              default:
                element.classList.add(_SELECT_CLASS_NAME);
            }
          }
        }
      } else {
        for (var _i = _NUM_MONTHS; _i > 0; _i -= 1) {
          var _element = document.querySelector("[data-id=\"0:".concat(_i, "\"]"));
          if (_element) {
            switch (true) {
              case _i > dataId:
                _element.classList.remove(_SELECT_CLASS_NAME);
                break;
              case _i < selectedMonth && isSameYear:
                _element.classList.remove(_SELECT_CLASS_NAME);
                break;
              case _i === selectedMonth && isSameYear:
                break;
              default:
                _element.classList.add(_SELECT_CLASS_NAME);
            }
          }
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      if (isBrowser) {
        document.addEventListener("keydown", this._keyDown);
        // Setup hover effect (we only want do to do this when the type of the control is in multiple mode)
        if (this.state.rawValue.type === "range") {
          var monthButtons = [].slice.call(document.getElementsByClassName("range"));
          monthButtons.forEach(function (monthButton) {
            monthButton.addEventListener("mouseover", function (_) {
              var _this2$state = _this2.state,
                selectedValue = _this2$state.selectedValue,
                years = _this2$state.years,
                yearIndexes = _this2$state.yearIndexes;
              var yearIdx = yearIndexes[0];
              var currentYear = years[yearIdx].year;
              // Check to see if we currently have an active button.
              var dataId = parseInt(monthButton.getAttribute("data-id").split(":")[1], 10);
              if (selectedValue && dataId) {
                var selectedYear = selectedValue.year,
                  selectedMonth = selectedValue.month;
                var isSameYear = currentYear === selectedYear;
                // If there is a button currently selected, what we need to do is add the hover class to the buttons between the currently selected button and the button that is being hovered over.
                var diffSign = Math.sign(dataId - selectedMonth);
                if (isSameYear && diffSign <= 0 || currentYear < selectedYear) {
                  _this2.setHoverState(dataId, true, selectedMonth, isSameYear);
                } else if (isSameYear && diffSign > 0 || currentYear > selectedYear) {
                  _this2.setHoverState(dataId, false, selectedMonth, isSameYear);
                }
                _this2.forceUpdate();
              }
            });
          });
          var arrowButtons = [].slice.call(document.getElementsByClassName("rmp-tab"));
          arrowButtons.forEach(function (arrowButton) {
            arrowButton.addEventListener("mouseover", function (_) {
              var _this2$state2 = _this2.state,
                selectedValue = _this2$state2.selectedValue,
                years = _this2$state2.years,
                yearIndexes = _this2$state2.yearIndexes;
              var yearIdx = yearIndexes[0];
              var currentYear = years[yearIdx].year;
              var classNames = [].slice.call(arrowButton.classList);
              if (selectedValue) {
                var selectedYear = selectedValue.year,
                  selectedMonth = selectedValue.month;
                var isSameYear = currentYear === selectedYear;
                if (classNames.includes("prev") && !classNames.includes("disable")) {
                  _this2.setHoverState(currentYear <= selectedYear ? 1 : _NUM_MONTHS + 1, true, selectedMonth, isSameYear);
                } else if (classNames.includes("next") && !classNames.includes("disable")) {
                  _this2.setHoverState(currentYear >= isSameYear ? 12 : 0, false, selectedMonth, isSameYear);
                }
              }
            });
            arrowButton.addEventListener("mouseleave", function (_) {
              _this2.resetHoverRangeStatus();
            });
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (isBrowser) {
        document.removeEventListener('keydown', this._keyDown);
      }
    }
  }, {
    key: "optionPad",
    value: function optionPad(padIndex) {
      var _this3 = this;
      var _this$state = this.state,
        ymArr = _this$state.years,
        rawValue = _this$state.rawValue,
        yearIndexes = _this$state.yearIndexes;
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
        var endM = labelYear === (to === null || to === void 0 ? void 0 : to.year) ? (to === null || to === void 0 ? void 0 : to.month) || from.month : 12;
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
      var labelPreText;
      if (isRange) {
        labelPreText = /*#__PURE__*/_react["default"].createElement("b", null, this.props.lang[_RANGE_KEYS[padIndex]]);
      }
      if (yearIdx === 0) prevCss = 'disable';
      if (yearIdx === yearMaxIdx) nextCss = 'disable';
      var prevHandler = prevCss === 'disable' ? undefined : this._goPrevYear;
      var nextHandler = nextCss === 'disable' ? undefined : this._goNextYear;
      var valOffset = 0;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "rmp-pad",
        key: padIndex
      }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, labelPreText, labelYear), /*#__PURE__*/_react["default"].createElement("i", {
        className: ["rmp-tab", "rmp-btn", "prev", prevCss].join(' '),
        "data-id": padIndex,
        onClick: prevHandler
      }, '<'), /*#__PURE__*/_react["default"].createElement("i", {
        className: ["rmp-tab", "rmp-btn", "next", nextCss].join(' '),
        "data-id": padIndex,
        onClick: nextHandler
      }, '>')), /*#__PURE__*/_react["default"].createElement("ul", null, mapToArray(12, function (i) {
        var m = i + 1;
        var css = '';
        if (atMinYear && m < ymArr[0].min) {
          css = 'disable';
        } else if (atMaxYear && m > ymArr[yearMaxIdx].max) {
          css = 'disable';
        } else {
          var _from = rawValue.from,
            _to = rawValue.to;
          for (var _i2 = valOffset, last = values.length - 1; _i2 <= last; _i2++) {
            var v = values[_i2];
            if (v === m) {
              valOffset++;
              if (!isRange || _from.year === labelYear && padIndex === 0 && _i2 === 0 || (_to === null || _to === void 0 ? void 0 : _to.year) === labelYear && _i2 === last) {
                css = 'active';
              } else if (labelYear >= _from.year && labelYear <= (_to === null || _to === void 0 ? void 0 : _to.year)) {
                css = _SELECT_CLASS_NAME;
              }
            }
          }
        }
        var clickHandler = css !== 'disable' ? _this3._handleClickMonth : undefined;
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: i,
          className: ["rmp-btn", rawValue.type, css].join(' '),
          "data-id": padIndex + ':' + (i + 1),
          onClick: clickHandler
        }, months.length > i ? months[i] : i);
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var pads = [];
      var popupClass = '';
      pads.push(this.optionPad(0));
      console.log('RENDERING');
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: ["month-picker", this.props.className].join(' ')
      }, this.props.children, /*#__PURE__*/_react["default"].createElement("div", {
        className: ["rmp-container", "rmp-table", this.props.className, this.state.showed ? "show" : ''].join(' ')
      }, /*#__PURE__*/_react["default"].createElement(_reactTapper["default"], {
        className: "rmp-overlay",
        onTap: this._handleOverlayTouchTap
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "rmp-cell"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: ["rmp-popup", popupClass, this.props.theme, this.state.showed ? "show" : ''].join(' ')
      }, pads))));
    }
  }, {
    key: "dismiss",
    value: function dismiss() {
      if (this.state.closeable) {
        this._onDismiss();
      }
    }
  }, {
    key: "show",
    value: function show() {
      // prevent rapid show/hide
      this._onShow();
    }
  }, {
    key: "_onShow",
    value: function _onShow() {
      var _this4 = this;
      setTimeout(function () {
        _this4.state.closeable = true;
      }, 250);
      this.setState({
        showed: true
      });
      this.props.onShow && this.props.onShow();
    }
  }, {
    key: "_onDismiss",
    value: function _onDismiss(s) {
      this.setState(Object.assign({
        showed: false,
        loading: false,
        selectedValue: undefined
      }, s));
      this.props.onDismiss && this.props.onDismiss(this.value());
    }
  }, {
    key: "setYear",
    value: function setYear(idx, step) {
      var yearIndexes = this.state.yearIndexes.concat();
      yearIndexes[idx] += step;
      this.setState({
        yearIndexes: yearIndexes
      });
      var theYear = this.state.years[yearIndexes[idx]].year;
      this.props.onYearChange && this.props.onYearChange(theYear);
    }
  }, {
    key: "getDID",
    value: function getDID(e) {
      var el = e.target;
      return el.dataset ? el.dataset.id : el.getAttribute('data-id');
    }
  }, {
    key: "_reset",
    value: function _reset() {
      var rawValue = validValue(this.props.value, this.state.years, this.state.yearIndexes);
      return {
        rawValue: rawValue
      };
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.age > state.age) {
        var yearArr = getYearArray(props.years);
        var yearIndexes = [0];
        var rawValue = validValue(props.value, yearArr, yearIndexes);
        return {
          age: props.age,
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
_defineProperty(MonthPicker, "propTypes", {
  age: _propTypes["default"].number,
  years: _propTypes["default"].oneOfType([_propTypes["default"].number,
  // exact number of a year
  _propTypes["default"].arrayOf(_propTypes["default"].number),
  // array of specific years: [2008, 2011, 2012, 2014, 2016]
  _propTypes["default"].shape({
    // { min: 2013 } | { min: {year: 2013, month: 4} } | { min: {year: 2013, month: 4}, max: {year: 2016, month: 9} }
    min: _propTypes["default"].oneOfType([_propTypes["default"].number, TypeYM]),
    max: _propTypes["default"].oneOfType([_propTypes["default"].number, TypeYM])
  })]),
  value: _propTypes["default"].oneOfType([TypeYM, _propTypes["default"].arrayOf(TypeYM), _propTypes["default"].shape({
    from: TypeYM,
    to: TypeYM
  })]),
  lang: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string),
  // lang texts for months: ['Jan', 'Feb', 'Mar', 'Apr', ... ]
  _propTypes["default"].shape({
    months: _propTypes["default"].arrayOf(_propTypes["default"].string),
    from: _propTypes["default"].string,
    // lang text for 'from'
    to: _propTypes["default"].string // lang text for 'to'
  })]),

  onChange: _propTypes["default"].func,
  onYearChange: _propTypes["default"].func,
  onShow: _propTypes["default"].func,
  onDismiss: _propTypes["default"].func,
  onClickAway: _propTypes["default"].func,
  theme: _propTypes["default"].string
});
_defineProperty(MonthPicker, "defaultProps", {
  age: 0,
  years: getYearsByNum(5),
  onChange: function onChange(year, month, idx) {},
  theme: 'light'
});
