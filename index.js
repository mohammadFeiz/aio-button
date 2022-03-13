"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AIOButton = /*#__PURE__*/function (_Component) {
  _inherits(AIOButton, _Component);

  var _super = _createSuper(AIOButton);

  function AIOButton() {
    _classCallCheck(this, AIOButton);

    return _super.apply(this, arguments);
  }

  _createClass(AIOButton, [{
    key: "getMultiselectDetails",
    value: function getMultiselectDetails() {
      var _this$props = this.props,
          _this$props$options = _this$props.options,
          options = _this$props$options === void 0 ? [] : _this$props$options,
          values = _this$props.values,
          selectAll = _this$props.selectAll,
          _this$props$editOptio = _this$props.editOptionText,
          editOptionText = _this$props$editOptio === void 0 ? function (value) {
        return value;
      } : _this$props$editOptio;
      var type,
          Values = [],
          checks = [];

      if (Array.isArray(values)) {
        type = 'array';
        Values = values;
      } else if (_typeof(values) === 'object') {
        type = 'object';

        for (var prop in values) {
          if (values[prop] === true) {
            Values.push(prop);
          }
        }
      } else {
        console.error('values must be array or object');
      }

      var Options = options.map(function (o) {
        o.checked = Values.indexOf(o.value) !== -1;

        if (o.checked) {
          checks.push(o);
        }

        return { ...o,
          text: editOptionText(o.text)
        };
      });

      if (selectAll) {
        var text = editOptionText(options.length === Values.length ? 'Remove All' : 'Select All');
        Options.splice(0, 0, {
          text: text,
          value: 'multiselect_selectAll',
          close: false
        });
      }

      return {
        type: type,
        options: Options,
        checks: checks,
        values: Values
      };
    }
  }, {
    key: "Render_multiselect",
    value: function Render_multiselect() {
      var details = this.getMultiselectDetails();
      var _this$props2 = this.props,
          _this$props2$options = _this$props2.options,
          options = _this$props2$options === void 0 ? [] : _this$props2$options,
          onChange = _this$props2.onChange,
          values = _this$props2.values;
      return /*#__PURE__*/_react.default.createElement(AIOButtonBase, _extends({
        popupWidth: 'fit',
        caret: true
      }, this.props, {
        type: 'multiselect',
        popOver: false,
        items: details.options,
        checks: details.checks,
        onClick: function onClick(_ref) {
          var value = _ref.value;
          var list, type;

          if (value === 'multiselect_selectAll') {
            list = options.length === details.values.length ? [] : options.map(function (o) {
              return o.value;
            });
          } else {
            var index = details.values.indexOf(value);

            if (index !== -1) {
              list = details.values.filter(function (o, i) {
                return i !== index;
              });
              type = 'remove';
            } else {
              list = details.values.concat(value);
              type = 'add';
            }
          }

          if (details.type === 'array') {
            onChange(list, value, type);
          } else {
            var obj = {};

            for (var prop in values) {
              obj[prop] = list.indexOf(prop) !== -1;
            }

            onChange(obj);
          }
        }
      }));
    }
  }, {
    key: "getSelectText",
    value: function getSelectText() {
      var _this$props3 = this.props,
          options = _this$props3.options,
          value = _this$props3.value,
          text = _this$props3.text;

      if (text === false) {
        return '';
      }

      if (text !== undefined) {
        return text;
      }

      if (this.text && this.value === value) {
        return this.text;
      } else {
        var option = options.filter(function (o) {
          return o.value === value;
        })[0];

        if (!option) {
          if (!options[0]) {
            this.text = '';
            this.value = undefined;
            return '';
          } else {
            this.text = options[0].text;
            this.value = options[0].value;
            return options[0].text;
          }
        } else {
          this.text = option.text;
          this.value = option.value;
          return option.text;
        }
      }
    }
  }, {
    key: "Render_select",
    value: function Render_select() {
      var _this = this;

      var _this$props4 = this.props,
          _this$props4$options = _this$props4.options,
          options = _this$props4$options === void 0 ? [] : _this$props4$options,
          _this$props4$onChange = _this$props4.onChange,
          onChange = _this$props4$onChange === void 0 ? function () {} : _this$props4$onChange;
      return /*#__PURE__*/_react.default.createElement(AIOButtonBase, _extends({
        text: this.getSelectText(),
        caret: true
      }, this.props, {
        popOver: false,
        items: options,
        onClick: function onClick(obj) {
          _this.text = obj.text;
          _this.value = obj.value;
          onChange(obj.value, obj);
        }
      }));
    }
  }, {
    key: "Render_button",
    value: function Render_button() {
      var popOver = this.props.popOver;
      return /*#__PURE__*/_react.default.createElement(AIOButtonBase, _extends({
        caret: popOver ? true : false
      }, this.props));
    }
  }, {
    key: "Render_radio",
    value: function Render_radio() {
      return /*#__PURE__*/_react.default.createElement(RRadioButton, this.props);
    }
  }, {
    key: "Render_checklist",
    value: function Render_checklist() {
      var _this$props5 = this.props,
          _this$props5$icon = _this$props5.icon,
          icon = _this$props5$icon === void 0 ? {} : _this$props5$icon,
          _this$props5$options = _this$props5.options,
          options = _this$props5$options === void 0 ? [] : _this$props5$options,
          _this$props5$onChange = _this$props5.onChange,
          _onChange = _this$props5$onChange === void 0 ? function () {} : _this$props5$onChange,
          value = _this$props5.value;

      return /*#__PURE__*/_react.default.createElement(RRadioButton, _extends({}, this.props, {
        options: options,
        value: value,
        icon: {
          round: false,
          ...icon
        },
        onChange: function onChange(val, index) {
          return _onChange(val, index);
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$type = this.props.type,
          type = _this$props$type === void 0 ? 'button' : _this$props$type;
      return this["Render_".concat(type)]();
    }
  }]);

  return AIOButton;
}(_react.Component);

exports.default = AIOButton;

var RRadioButton = /*#__PURE__*/function (_Component2) {
  _inherits(RRadioButton, _Component2);

  var _super2 = _createSuper(RRadioButton);

  function RRadioButton() {
    _classCallCheck(this, RRadioButton);

    return _super2.apply(this, arguments);
  }

  _createClass(RRadioButton, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$props6 = this.props,
          justify = _this$props6.justify,
          _this$props6$style = _this$props6.style,
          style = _this$props6$style === void 0 ? {} : _this$props6$style;
      var Style = {};

      if (justify) {
        Style.justifyContent = 'center';
      }

      return { ...Style,
        ...style
      };
    }
  }, {
    key: "getOptionStyle",
    value: function getOptionStyle() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props7 = this.props,
          _this$props7$optionSt = _this$props7.optionStyle,
          optionStyle = _this$props7$optionSt === void 0 ? {} : _this$props7$optionSt,
          optionWidth = _this$props7.optionWidth;
      return {
        width: optionWidth || '100%',
        ...optionStyle,
        ...style
      };
    }
  }, {
    key: "getColor",
    value: function getColor(color) {
      var Color = color || [];

      if (!Array.isArray(Color)) {
        Color = [Color];
      }

      var _Color = Color,
          _Color2 = _slicedToArray(_Color, 2),
          outerColor = _Color2[0],
          _Color2$ = _Color2[1],
          innerColor = _Color2$ === void 0 ? outerColor : _Color2$;

      return [outerColor, innerColor];
    }
  }, {
    key: "getOuterStyle",
    value: function getOuterStyle(color, _ref2) {
      var _ref2$round = _ref2.round,
          round = _ref2$round === void 0 ? true : _ref2$round,
          _ref2$size = _ref2.size,
          size = _ref2$size === void 0 ? [] : _ref2$size;
      var outer = size[0] === undefined ? 16 : size[0];
      var stroke = size[2] === undefined ? 2 : size[2];
      var style = {
        color: color[0],
        width: outer,
        height: outer,
        border: "".concat(stroke, "px solid")
      };

      if (round === false) {
        style.borderRadius = 0;
      }

      return style;
    }
  }, {
    key: "getInnerIconStyle",
    value: function getInnerIconStyle(color, _ref3) {
      var _ref3$round = _ref3.round,
          round = _ref3$round === void 0 ? true : _ref3$round,
          _ref3$size = _ref3.size,
          size = _ref3$size === void 0 ? [] : _ref3$size;
      var inner = size[1] === undefined ? 12 : size[1];
      var style = {
        background: color[1],
        width: inner,
        height: inner
      };

      if (round === false) {
        style.borderRadius = 0;
      }

      return style;
    }
  }, {
    key: "getIcon",
    value: function getIcon(active, i, option) {
      var icon = option.icon || this.props.icon || {};
      var color = this.getColor(icon.color);

      if (active) {
        if (icon.active) {
          return icon.active;
        }

        return /*#__PURE__*/_react.default.createElement("div", {
          className: 'r-radio-button-outer' + active,
          style: this.getOuterStyle(color, icon)
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "r-radio-button-inner",
          style: this.getInnerIconStyle(color, icon)
        }));
      } else {
        if (icon.deactive) {
          return icon.deactive;
        }

        return /*#__PURE__*/_react.default.createElement("div", {
          className: 'r-radio-button-outer' + active,
          style: this.getOuterStyle(color, icon)
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props8 = this.props,
          id = _this$props8.id,
          className = _this$props8.className,
          _this$props8$gap = _this$props8.gap,
          gap = _this$props8$gap === void 0 ? 6 : _this$props8$gap,
          options = _this$props8.options,
          _this$props8$value = _this$props8.value,
          value = _this$props8$value === void 0 ? true : _this$props8$value,
          onChange = _this$props8.onChange,
          rtl = _this$props8.rtl,
          _this$props8$disabled = _this$props8.disabled,
          disabled = _this$props8$disabled === void 0 ? false : _this$props8$disabled;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: 'r-radio-button' + (rtl ? ' rtl' : '') + (className ? ' ' + className : ''),
        style: this.getStyle(),
        id: id
      }, options.map(function (option, i) {
        var active = option.value === value ? ' active' : '';
        var disabledClass = disabled ? ' disabled' : '';
        return /*#__PURE__*/_react.default.createElement(_react.Fragment, {
          key: i
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: 'r-radio-button-option' + active + disabledClass,
          title: option.title,
          onClick: function onClick() {
            if (disabled) {
              return;
            }

            onChange(option.value, i);
          },
          style: _this2.getOptionStyle(option.style)
        }, _this2.getIcon(active, i, option), /*#__PURE__*/_react.default.createElement("div", {
          className: "r-radio-button-gap",
          style: {
            width: gap
          }
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "r-radio-button-text",
          style: option.style
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "r-radio-button-uptext",
          style: option.style
        }, option.text), /*#__PURE__*/_react.default.createElement("div", {
          className: "r-radio-button-subtext",
          style: option.style
        }, option.subtext))));
      }));
    }
  }]);

  return RRadioButton;
}(_react.Component);

var AIOButtonBase = /*#__PURE__*/function (_Component3) {
  _inherits(AIOButtonBase, _Component3);

  var _super3 = _createSuper(AIOButtonBase);

  function AIOButtonBase(props) {
    var _this3;

    _classCallCheck(this, AIOButtonBase);

    _this3 = _super3.call(this, props);
    _this3.fn = new AIOBTNFN(function () {
      return _this3.props;
    }, function () {
      return _this3.state;
    }, function (obj) {
      _this3.setState(obj);
    });
    _this3.state = {
      open: _this3.props.open || false,
      touch: 'ontouchstart' in document.documentElement
    };
    return _this3;
  }

  _createClass(AIOButtonBase, [{
    key: "render",
    value: function render() {
      var open = this.state.open;
      return this.fn.render.base(open);
    }
  }]);

  return AIOButtonBase;
}(_react.Component);

var Popup = /*#__PURE__*/function (_Component4) {
  _inherits(Popup, _Component4);

  var _super4 = _createSuper(Popup);

  function Popup(props) {
    var _this4;

    _classCallCheck(this, Popup);

    _this4 = _super4.call(this, props);
    _this4.dom = /*#__PURE__*/(0, _react.createRef)();
    _this4.state = {
      searchValue: ''
    };
    return _this4;
  }

  _createClass(Popup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var fn = this.props.fn;
      fn.update((0, _jquery.default)(this.dom.current));
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var fn = this.props.fn;
      var searchValue = this.state.searchValue;
      return fn.render.popup(searchValue, function (obj) {
        return _this5.setState(obj);
      }, this.dom);
    }
  }]);

  return Popup;
}(_react.Component);

function AIOBTNFN(_getProps10, getState, setState) {
  var $$ = {
    activeIndex: false,
    getLimit: function getLimit(dom) {
      var offset = dom.offset();
      var left = offset.left - window.pageXOffset;
      var top = offset.top - window.pageYOffset;
      var width = dom.outerWidth();
      var height = dom.outerHeight();
      var right = left + width;
      var bottom = top + height;
      return {
        left: left,
        top: top,
        right: right,
        bottom: bottom,
        width: width,
        height: height
      };
    },
    update: function update(popup) {
      var _getProps = _getProps10(),
          rtl = _getProps.rtl,
          openRelatedTo = _getProps.openRelatedTo,
          animate = _getProps.animate,
          dropdownType = _getProps.dropdownType,
          type = _getProps.type,
          popupWidth = _getProps.popupWidth;

      var button = type === 'multiselect' ? popup.prev().find('.aio-button') : popup.prev();
      var parent = openRelatedTo ? popup.parents(openRelatedTo) : undefined;
      parent = Array.isArray(parent) && parent.length === 0 ? undefined : parent;
      var bodyWidth = window.innerWidth;
      var bodyHeight = window.innerHeight;
      var parentLimit = parent ? $$.getLimit(parent) : {
        left: 0,
        top: 0,
        right: bodyWidth,
        bottom: bodyHeight
      };

      if (parentLimit.left < 0) {
        parentLimit.left = 0;
      }

      if (parentLimit.right > bodyWidth) {
        parentLimit.right = bodyWidth;
      }

      if (parentLimit.top < 0) {
        parentLimit.top = 0;
      }

      if (parentLimit.bottom > bodyHeight) {
        parentLimit.bottom = bodyHeight;
      }

      var buttonLimit = $$.getLimit(button);
      var popupLimit = $$.getLimit(popup);
      var left,
          right,
          top,
          bottom,
          style = {};
      top = buttonLimit.bottom;
      bottom = top + popupLimit.height;

      if (dropdownType !== 'center') {
        if (popupWidth === 'fit') {
          style.left = buttonLimit.left;
          style.width = buttonLimit.width;
        } else if (rtl) {
          right = buttonLimit.right;
          left = right - popupLimit.width;

          if (left < parentLimit.left) {
            style.left = parentLimit.left;
          } else {
            style.left = left;
          }
        } else {
          left = buttonLimit.left;
          right = left + popupLimit.width;

          if (right > parentLimit.right) {
            style.left = parentLimit.right - popupLimit.width;
          } else {
            style.left = left;
          }
        }

        if (bottom > parentLimit.bottom) {
          if (popupLimit.height > buttonLimit.top - parentLimit.top) {
            style.top = parentLimit.bottom - popupLimit.height;
          } else {
            style.top = buttonLimit.top - popupLimit.height;
          }
        } else {
          style.top = buttonLimit.bottom;
        }
      }

      if (animate) {
        popup.css({ ...style,
          opacity: 0,
          top: style.top + 60
        });
        popup.animate({
          top: style.top,
          opacity: 1
        }, {
          duration: 150
        });
      } else {
        popup.css(style);
      }

      popup.focus();
      (0, _jquery.default)('body').addClass('aio-button-open');
    },
    getOptions: function getOptions(items, searchValue) {
      var _getProps2 = _getProps10(),
          _getProps2$getOptionT = _getProps2.getOptionText,
          getOptionText = _getProps2$getOptionT === void 0 ? function () {} : _getProps2$getOptionT,
          _getProps2$getOptionD = _getProps2.getOptionDisabled,
          getOptionDisabled = _getProps2$getOptionD === void 0 ? function () {} : _getProps2$getOptionD,
          _getProps2$getOptionB = _getProps2.getOptionBefore,
          getOptionBefore = _getProps2$getOptionB === void 0 ? function () {} : _getProps2$getOptionB,
          _getProps2$getOptionA = _getProps2.getOptionAfter,
          getOptionAfter = _getProps2$getOptionA === void 0 ? function () {} : _getProps2$getOptionA,
          _getProps2$getOptionC = _getProps2.getOptionChecked,
          getOptionChecked = _getProps2$getOptionC === void 0 ? function () {} : _getProps2$getOptionC,
          _getProps2$getOptionC2 = _getProps2.getOptionClassName,
          getOptionClassName = _getProps2$getOptionC2 === void 0 ? function () {} : _getProps2$getOptionC2,
          _getProps2$getOptionS = _getProps2.getOptionStyle,
          getOptionStyle = _getProps2$getOptionS === void 0 ? function () {} : _getProps2$getOptionS,
          _getProps2$getOptionI = _getProps2.getOptionId,
          getOptionId = _getProps2$getOptionI === void 0 ? function () {} : _getProps2$getOptionI,
          _getProps2$getOptionS2 = _getProps2.getOptionShow,
          getOptionShow = _getProps2$getOptionS2 === void 0 ? function () {} : _getProps2$getOptionS2,
          _getProps2$getOptionH = _getProps2.getOptionHref,
          getOptionHref = _getProps2$getOptionH === void 0 ? function () {} : _getProps2$getOptionH,
          _getProps2$getOptionT2 = _getProps2.getOptionTitle,
          getOptionTitle = _getProps2$getOptionT2 === void 0 ? function () {} : _getProps2$getOptionT2;

      return items.filter(function (item, i) {
        var _item$text = item.text,
            text = _item$text === void 0 ? getOptionText(item, i) : _item$text,
            _item$disabled = item.disabled,
            disabled = _item$disabled === void 0 ? getOptionDisabled(item, i) : _item$disabled,
            _item$before = item.before,
            before = _item$before === void 0 ? getOptionBefore(item, i) : _item$before,
            _item$after = item.after,
            after = _item$after === void 0 ? getOptionAfter(item, i) : _item$after,
            _item$checked = item.checked,
            checked = _item$checked === void 0 ? getOptionChecked(item, i) : _item$checked,
            _item$className = item.className,
            className = _item$className === void 0 ? getOptionClassName(item, i) : _item$className,
            _item$style = item.style,
            style = _item$style === void 0 ? getOptionStyle(item, i) : _item$style,
            _item$id = item.id,
            id = _item$id === void 0 ? getOptionId(item, i) : _item$id,
            _item$show = item.show,
            show = _item$show === void 0 ? getOptionShow(item, i) : _item$show,
            _item$href = item.href,
            href = _item$href === void 0 ? getOptionHref(item, i) : _item$href,
            _item$title = item.title,
            title = _item$title === void 0 ? getOptionTitle(item, i) : _item$title;
        item._text = text;
        item._index = i;
        item._disabled = disabled;
        item._before = before;
        item._after = after;
        item._checked = checked;
        item._className = className;
        item._style = style;
        item._id = id;
        item._show = show;
        item._href = href;
        item._title = title;

        if (show === false) {
          return false;
        }

        if (!searchValue) {
          return true;
        }

        if (text === undefined) {
          return false;
        }

        return text.indexOf(searchValue) !== -1;
      });
    },
    getPopupClassName: function getPopupClassName() {
      var _getProps3 = _getProps10(),
          popupClassName = _getProps3.popupClassName,
          rtl = _getProps3.rtl;

      var className = 'aio-button-popup-container';
      className += rtl ? ' rtl' : ' ltr';

      if (popupClassName) {
        className += ' ' + popupClassName;
      }

      return className;
    },
    toggle: function toggle(state, isBackdrop) {
      var _getState = getState(),
          open = _getState.open;

      if (state === undefined) {
        state = !open;
      }

      clearTimeout($$.timeOut);
      $$.timeOut = setTimeout(function () {
        if (state === open) {
          return;
        }

        setState({
          open: state
        });

        if (state) {
          (0, _jquery.default)('body').addClass('aio-button-open');
        } else {
          (0, _jquery.default)('body').removeClass('aio-button-open');
        }

        var _getProps4 = _getProps10(),
            onBackdropClick = _getProps4.onBackdropClick,
            onToggle = _getProps4.onToggle;

        if (onBackdropClick && isBackdrop) {
          onBackdropClick(_getProps10());
        }

        if (onToggle) {
          onToggle(state);
        }
      }, 100);
    },
    itemClick: function itemClick(item, e) {
      var _getProps5 = _getProps10(),
          onClick = _getProps5.onClick;

      if (item._disabled) {
        return;
      }

      if (item.onClick) {
        item.onClick(item);
      } else if (onClick) {
        onClick(item);
      }

      if (item.close !== false && item._checked === undefined) {
        $$.toggle();
      }
    },
    keyDown: function keyDown(e, dom) {
      if (e.keyCode === 40) {
        e.preventDefault();
        var items = dom.find('.aio-button-list-item');
        var active = items.filter('.active');

        if (active.length === 0) {
          $$.activeIndex = 0;
          items.eq(0).addClass('active');
        } else {
          var index = active.attr('dataindex');
          index++;

          if (index >= items.length) {
            index = 0;
          }

          items.removeClass('active');
          $$.activeIndex = index;
          items.eq(index).addClass('active').focus();
        }
      } else if (e.keyCode === 38) {
        e.preventDefault();
        var items = dom.find('.aio-button-list-item');
        var active = items.filter('.active');

        if (active.length === 0) {
          $$.activeIndex = items.length - 1;
          items.eq(items.length - 1).addClass('active');
        } else {
          var _index = active.attr('dataindex');

          _index--;

          if (_index < 0) {
            _index = items.length - 1;
          }

          items.removeClass('active');
          $$.activeIndex = _index;
          items.eq(_index).addClass('active').focus();
        }
      } else if (e.keyCode === 13) {
        if ($$.activeIndex !== false) {
          $$.itemClick($$.items[$$.activeIndex], e);
        }
      } else if (e.keyCode === 27) {
        $$.toggle();
      }
    },
    getPopupContent: function getPopupContent(searchValue) {
      var _getProps6 = _getProps10(),
          items = _getProps6.items,
          popOver = _getProps6.popOver;

      if (popOver) {
        return typeof popOver === 'function' ? popOver(_getProps10()) : popOver;
      }

      $$.items = $$.getOptions(items, searchValue);
      return $$.items.map(function (item, i) {
        return $$.render.listItem(item, i);
      });
    },
    onClick: function onClick(e) {
      if ((0, _jquery.default)(e.target).parents('.aio-button-checkeds').length !== 0) {
        return;
      }

      var _getProps7 = _getProps10(),
          items = _getProps7.items,
          popOver = _getProps7.popOver,
          _getProps7$onClick = _getProps7.onClick,
          onClick = _getProps7$onClick === void 0 ? function () {} : _getProps7$onClick;

      if (items || popOver) {
        $$.toggle(true);
      } else {
        onClick(_getProps10());
      }
    },
    showPopup: function showPopup(open) {
      var _getProps8 = _getProps10(),
          items = _getProps8.items,
          popOver = _getProps8.popOver;

      if (!open) {
        return false;
      }

      if (popOver) {
        return true;
      }

      if (items !== undefined) {
        return true;
      }

      return false;
    },
    getHoverEnabled: function getHoverEnabled() {
      var _getState2 = getState(),
          touch = _getState2.touch;

      if (touch) {
        return false;
      }

      var _getProps9 = _getProps10(),
          hover = _getProps9.hover;

      return typeof hover === 'function' ? hover(_getProps10()) : hover;
    },
    getValue: function getValue(value) {
      return typeof value === 'function' ? value(_getProps10()) : value;
    },
    getProps: function getProps() {
      var props = _getProps10();

      var type = props.type,
          _props$before = props.before,
          before = _props$before === void 0 ? '' : _props$before,
          _props$text = props.text,
          text = _props$text === void 0 ? '' : _props$text,
          checks = props.checks,
          _props$onClick = props.onClick,
          onClick = _props$onClick === void 0 ? function () {} : _props$onClick;
      var id = $$.getValue(props.id);
      var disabled = $$.getValue(props.disabled);
      var title = $$.getValue(props.title);
      var className = $$.getValue(props.className);
      var rtl = $$.getValue(props.rtl);
      var style = $$.getValue(props.style);
      var hover = $$.getHoverEnabled();
      return { ...props,
        type: type,
        before: before,
        text: text,
        checks: checks,
        onClick: onClick,
        id: id,
        disabled: disabled,
        title: title,
        className: className,
        rtl: rtl,
        style: style,
        hover: hover
      };
    },
    getButtonConfig: function getButtonConfig() {
      var _$$$getProps = $$.getProps(),
          id = _$$$getProps.id,
          disabled = _$$$getProps.disabled,
          title = _$$$getProps.title,
          className = _$$$getProps.className,
          rtl = _$$$getProps.rtl,
          style = _$$$getProps.style,
          hover = _$$$getProps.hover;

      return {
        id: id,
        className: "aio-button ".concat(rtl ? 'rtl' : 'ltr').concat(className ? ' ' + className : ''),
        style: _jquery.default.extend({}, {
          direction: rtl ? 'rtl' : 'ltr'
        }, $$.getValue(style)),
        disabled: disabled,
        title: title,
        onClick: function onClick(e) {
          return $$.onClick(e);
        },
        onMouseEnter: hover ? function () {
          return $$.toggle(true);
        } : undefined,
        onMouseLeave: hover ? function () {
          return $$.toggle(false);
        } : undefined,
        tabIndex: 0
      };
    },
    dragStart: function dragStart(e) {
      var index = parseInt((0, _jquery.default)(e.target).attr('dataindex'));
      $$.dragIndex = index;
    },
    dragOver: function dragOver(e) {
      e.preventDefault();
    },
    swap: function swap(arr, from, to) {
      var Arr = arr.map(function (o, i) {
        o._testswapindex = i;
        return o;
      });
      var fromIndex = Arr[from]._testswapindex;
      Arr.splice(to, 0, { ...Arr[from],
        _testswapindex: false
      });
      return Arr.filter(function (o) {
        return o._testswapindex !== fromIndex;
      });
    },
    drop: function drop(e) {
      e.stopPropagation();

      var _getProps11 = _getProps10(),
          onSwap = _getProps11.onSwap,
          options = _getProps11.options;

      var from = $$.dragIndex;
      var dom = (0, _jquery.default)(e.target);

      if (!dom.hasClass('aio-button-list-item')) {
        dom = dom.parents('.aio-button-list-item');
      }

      ;

      if (!dom.hasClass('aio-button-list-item')) {
        return;
      }

      ;
      var to = parseInt(dom.attr('dataindex'));

      if (from === to) {
        return;
      }

      onSwap(from, to, $$.swap);
    }
  };
  $$.render = new AIOBTNrender($$);
  return {
    getLimit: $$.getLimit,
    update: $$.update,
    getOptions: $$.getOptions,
    getPopupClassName: $$.getPopupClassName,
    toggle: $$.toggle,
    keyDown: $$.keyDown,
    itemClick: $$.itemClick,
    onClick: $$.onClick,
    showPopup: $$.showPopup,
    getPopupContent: $$.getPopupContent,
    getProps: $$.getProps,
    getHoverEnabled: $$.getHoverEnabled,
    getValue: $$.getValue,
    render: $$.render
  };
}

function AIOBTNrender(actions) {
  var $$ = {
    base: function base(open) {
      var _actions$getProps = actions.getProps(),
          type = _actions$getProps.type;

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, type === 'multiselect' && $$.multiselect(), type !== 'multiselect' && $$.button(), actions.showPopup(open) && /*#__PURE__*/_react.default.createElement(Popup, {
        fn: actions
      }));
    },
    caret: function caret() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'react';

      var _actions$getProps2 = actions.getProps(),
          caret = _actions$getProps2.caret,
          caretStyle = _actions$getProps2.caretStyle;

      if (caret === false) {
        return '';
      }

      var cls = 'aio-button-caret';

      if (caret === true) {
        if (platform === 'react') {
          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
            style: {
              flex: 1
            }
          }), /*#__PURE__*/_react.default.createElement("div", {
            className: cls,
            style: caretStyle
          }));
        }

        if (platform === 'jquery') {
          return "<div style='flex:1;'></div><div class='".concat(cls, "' style='").concat(caretStyle, "'></div>");
        }
      }

      if (platform === 'react') {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            flex: 1
          }
        }), caret);
      }

      if (platform === 'jquery') {
        return "<div style='flex:1;'></div>".concat(caret);
      }
    },
    after: function after() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'react';

      var _actions$getProps3 = actions.getProps(),
          after = _actions$getProps3.after;

      if (after === undefined) {
        return '';
      }

      if (platform === 'react') {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            flex: 1
          }
        }), after);
      }

      if (platform === 'jquery') {
        return "<div style='flex:1;'></div>".concat(after);
      }
    },
    badge: function badge() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'react';

      var _actions$getProps4 = actions.getProps(),
          badge = _actions$getProps4.badge,
          badgeStyle = _actions$getProps4.badgeStyle;

      if (badge === undefined) {
        return '';
      }

      if (platform === 'react') {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "aio-button-badge",
          style: badgeStyle
        }, badge);
      }

      if (platform === 'jquery') {
        return "<div class='aio-button-badge' style='".concat(badgeStyle, "'>").concat(badge, "</div>");
      }
    },
    button: function button() {
      var _actions$getProps5 = actions.getProps(),
          before = _actions$getProps5.before,
          text = _actions$getProps5.text;

      var config = actions.getButtonConfig();
      return /*#__PURE__*/_react.default.createElement("button", config, before, " ", text, " ", $$.caret('react'), " ", $$.after('react'), " ", $$.badge('react'));
    },
    multiselect: function multiselect() {
      var _actions$getProps6 = actions.getProps(),
          rtl = _actions$getProps6.rtl,
          _actions$getProps6$st = _actions$getProps6.style,
          style = _actions$getProps6$st === void 0 ? {} : _actions$getProps6$st,
          _onClick = _actions$getProps6.onClick,
          checks = _actions$getProps6.checks,
          showTags = _actions$getProps6.showTags,
          _actions$getProps6$ta = _actions$getProps6.tagContainerStyle,
          tagContainerStyle = _actions$getProps6$ta === void 0 ? {} : _actions$getProps6$ta,
          _actions$getProps6$ta2 = _actions$getProps6.tagStyle,
          tagStyle = _actions$getProps6$ta2 === void 0 ? {} : _actions$getProps6$ta2;

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-multiselect",
        style: {
          width: style.width
        }
      }, $$.button(), showTags !== false && checks.length !== 0 && /*#__PURE__*/_react.default.createElement("div", {
        className: 'aio-button-checkeds' + (rtl ? ' rtl' : ''),
        style: tagContainerStyle
      }, checks.map(function (check, i) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: "aio-button-checked",
          onClick: function onClick() {
            return _onClick(check);
          },
          style: { ...check.style,
            ...tagStyle
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "aio-button-checked-close"
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "aio-button-checked-text"
        }, check.text));
      })));
    },
    searchBox: function searchBox(searchValue, _onChange2) {
      var _actions$getProps7 = actions.getProps(),
          search = _actions$getProps7.search,
          placeHolder = _actions$getProps7.placeHolder;

      if (!search) {
        return '';
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-search"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'aio-button-search-icon' + (searchValue ? ' aio-button-search-icon-filled' : ''),
        onClick: function onClick() {
          _onChange2({
            searchValue: ''
          });
        }
      }), /*#__PURE__*/_react.default.createElement("input", {
        type: "text",
        value: searchValue,
        placeholder: placeHolder,
        onChange: function onChange(e) {
          return _onChange2({
            searchValue: e.target.value
          });
        }
      }));
    },
    getPopupStyle: function getPopupStyle() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'react';

      var _actions$getProps8 = actions.getProps(),
          rtl = _actions$getProps8.rtl,
          dropdownType = _actions$getProps8.dropdownType;

      if (platform === 'react') {
        var style = {
          direction: rtl ? 'rtl' : 'ltr'
        };

        if (dropdownType === 'center') {
          style = { ...style,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          };
        }

        return style;
      }

      if (platform === 'jquery') {
        var _style = "direction:".concat(rtl ? 'rtl' : 'ltr', ";");

        if (dropdownType === 'center') {
          _style += "left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;";
        }

        return _style;
      }
    },
    getBackDropStyle: function getBackDropStyle() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'react';

      var _actions$getProps9 = actions.getProps(),
          backdropStyle = _actions$getProps9.backdropStyle;

      if (platform === 'react') {
        return {
          height: '100%',
          width: '100%',
          right: 0,
          top: 0,
          position: 'fixed',
          background: 'rgba(0,0,0,0)',
          ...backdropStyle
        };
      }

      if (platform === 'jquery') {
        return "height:100%;width:100%;right:0;top:0;position:fixed;background:rgba(0,0,0,0);".concat(backdropStyle);
      }
    },
    popup: function popup(searchValue, onChange, ref) {
      var _actions$getProps10 = actions.getProps(),
          hover = _actions$getProps10.hover,
          popupWidth = _actions$getProps10.popupWidth,
          popupStyle = _actions$getProps10.popupStyle;

      var PopupStyle = actions.getValue(popupStyle);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: actions.getPopupClassName(),
        ref: ref,
        style: $$.getPopupStyle(),
        onMouseEnter: function onMouseEnter() {
          if (hover) {
            actions.toggle(true);
          }
        },
        onMouseLeave: function onMouseLeave() {
          if (hover) {
            actions.toggle(false);
          }
        },
        onKeyDown: function onKeyDown(e) {
          return actions.keyDown(e, (0, _jquery.default)(ref.current));
        },
        tabIndex: 0
      }, !hover && /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-backdrop",
        onClick: function onClick() {
          return actions.toggle(false, true);
        },
        style: $$.getBackDropStyle()
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-popup",
        style: {
          width: popupWidth === 'fit' ? undefined : popupWidth,
          ...PopupStyle
        }
      }, $$.searchBox(searchValue, function (obj) {
        return onChange(obj);
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-items"
      }, actions.getPopupContent(searchValue))));
    },
    checkIcon: function checkIcon(item) {
      if (item._checked === undefined) {
        return '';
      }

      var _actions$getProps11 = actions.getProps(),
          _actions$getProps11$g = _actions$getProps11.gap,
          gap = _actions$getProps11$g === void 0 ? 8 : _actions$getProps11$g;

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: 'aio-button-check-icon' + (item._checked ? ' checked' : '')
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-gap",
        style: {
          width: gap
        }
      }));
    },
    listItem: function listItem(item, index) {
      var _actions$getProps12 = actions.getProps(),
          rtl = _actions$getProps12.rtl,
          onSwap = _actions$getProps12.onSwap;

      var Text = /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-text",
        title: item._title || item._text
      }, item._text);

      var props = {
        className: "aio-button-list-item".concat(item._className ? ' ' + item._className : '').concat(item._disabled ? ' disabled' : ''),
        style: item._style,
        onClick: function onClick(e) {
          return actions.itemClick(item, e);
        },
        title: '',
        dataindex: index,
        tabIndex: 0
      };

      if (onSwap) {
        props.onDragStart = function (e) {
          return actions.dragStart(e);
        };

        props.onDragOver = function (e) {
          return actions.dragOver(e);
        };

        props.onDrop = function (e) {
          actions.drop(e);
        };

        props.draggable = true;
      }

      return /*#__PURE__*/_react.default.createElement(_react.Fragment, {
        key: index
      }, item.splitter && /*#__PURE__*/_react.default.createElement("div", {
        className: 'aio-button-splitter ' + (rtl ? 'rtl' : 'ltr')
      }, item.splitter), /*#__PURE__*/_react.default.createElement("div", props, $$.checkIcon(item), item._before, Text, item._after));
    }
  };
  return {
    base: $$.base,
    button: $$.button,
    multiselect: $$.multiselect,
    searchBox: $$.searchBox,
    popup: $$.popup,
    listItem: $$.listItem
  };
}