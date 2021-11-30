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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

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
    key: "getMultiselectValues",
    value: function getMultiselectValues() {
      var values = this.props.values,
          Values = [];

      if (Array.isArray(values)) {
        this.multiSelectType = 'array';
        Values = values;
      } else if (_typeof(values) === 'object') {
        this.multiSelectType = 'object';

        for (var prop in values) {
          if (values[prop] === true) {
            Values.push(prop);
          }
        }
      } else {
        console.error('values must be array or object');
        return [];
      }

      return Values;
    }
  }, {
    key: "getMultiselectOptions",
    value: function getMultiselectOptions(Values) {
      var _this = this;

      var _this$props = this.props,
          _this$props$options = _this$props.options,
          options = _this$props$options === void 0 ? [] : _this$props$options,
          selectAll = _this$props.selectAll,
          _this$props$editOptio = _this$props.editOptionText,
          editOptionText = _this$props$editOptio === void 0 ? function (value) {
        return value;
      } : _this$props$editOptio;
      this.checks = [];
      var Options = options.map(function (o) {
        o.checked = Values.indexOf(o.value) !== -1;

        if (o.checked) {
          _this.checks.push(o);
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

      return Options;
    }
  }, {
    key: "RenderMultiselect",
    value: function RenderMultiselect() {
      var _this2 = this;

      var _this$props2 = this.props,
          _this$props2$options = _this$props2.options,
          options = _this$props2$options === void 0 ? [] : _this$props2$options,
          onChange = _this$props2.onChange,
          values = _this$props2.values;
      var Values = this.getMultiselectValues();
      var Options = this.getMultiselectOptions(Values);
      return /*#__PURE__*/_react.default.createElement(AIOButtonBase, _extends({
        popupWidth: 'fit',
        caret: true
      }, this.props, {
        type: 'multiselect',
        popOver: false,
        items: Options,
        checks: this.checks,
        onClick: function onClick(_ref) {
          var value = _ref.value;
          var list, type;

          if (value === 'multiselect_selectAll') {
            list = options.length === Values.length ? [] : options.map(function (o) {
              return o.value;
            });
          } else {
            var index = Values.indexOf(value);

            if (index !== -1) {
              list = Values.filter(function (o, i) {
                return i !== index;
              });
              type = 'remove';
            } else {
              list = Values.concat(value);
              type = 'add';
            }
          }

          if (_this2.multiSelectType === 'array') {
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
    key: "RenderSelect",
    value: function RenderSelect() {
      var _this3 = this;

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
          _this3.text = obj.text;
          _this3.value = obj.value;
          onChange(obj.value, obj);
        }
      }));
    }
  }, {
    key: "RenderButton",
    value: function RenderButton() {
      var popOver = this.props.popOver;
      return /*#__PURE__*/_react.default.createElement(AIOButtonBase, _extends({
        caret: popOver ? true : false
      }, this.props));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$type = this.props.type,
          type = _this$props$type === void 0 ? 'button' : _this$props$type;

      if (type === 'select') {
        return this.RenderSelect();
      }

      if (type === 'multiselect') {
        return this.RenderMultiselect();
      }

      if (type === 'button') {
        return this.RenderButton();
      }
    }
  }]);

  return AIOButton;
}(_react.Component);

exports.default = AIOButton;
var dpContext = /*#__PURE__*/(0, _react.createContext)();

var AIOButtonBase = /*#__PURE__*/function (_Component2) {
  _inherits(AIOButtonBase, _Component2);

  var _super2 = _createSuper(AIOButtonBase);

  function AIOButtonBase(props) {
    var _this4;

    _classCallCheck(this, AIOButtonBase);

    _this4 = _super2.call(this, props);
    _this4.state = {
      open: _this4.props.open || false
    };
    _this4.dom = /*#__PURE__*/(0, _react.createRef)();
    _this4.touch = 'ontouchstart' in document.documentElement;
    return _this4;
  }

  _createClass(AIOButtonBase, [{
    key: "toggle",
    value: function toggle() {
      var _this5 = this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.state.open;
      var isBackdrop = arguments.length > 1 ? arguments[1] : undefined;
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(function () {
        if (state === _this5.state.open) {
          return;
        }

        _this5.setState({
          open: state
        });

        if (state) {
          (0, _jquery.default)('body').addClass('aio-button-open');
        } else {
          (0, _jquery.default)('body').removeClass('aio-button-open');
        }

        var _this5$props = _this5.props,
            onBackdropClick = _this5$props.onBackdropClick,
            onToggle = _this5$props.onToggle;

        if (onBackdropClick && isBackdrop) {
          onBackdropClick(_this5.props);
        }

        if (onToggle) {
          onToggle(state);
        }
      }, 100);
    }
  }, {
    key: "getValue",
    value: function getValue(value) {
      return typeof value === 'function' ? value(this.props) : value;
    }
  }, {
    key: "click",
    value: function click(e) {
      if ((0, _jquery.default)(e.target).parents('.aio-button-checkeds').length !== 0) {
        return;
      }

      var _this$props5 = this.props,
          items = _this$props5.items,
          popOver = _this$props5.popOver,
          _this$props5$onClick = _this$props5.onClick,
          onClick = _this$props5$onClick === void 0 ? function () {} : _this$props5$onClick;

      if (items || popOver) {
        this.toggle(true);
      } else {
        onClick(this.props);
      }
    }
  }, {
    key: "showPopup",
    value: function showPopup() {
      var _this$props6 = this.props,
          items = _this$props6.items,
          popOver = _this$props6.popOver,
          open = this.state.open;

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
    }
  }, {
    key: "getBadge",
    value: function getBadge() {
      var _this$props7 = this.props,
          badge = _this$props7.badge,
          badgeStyle = _this$props7.badgeStyle;

      if (badge === undefined) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-badge",
        style: badgeStyle
      }, badge);
    }
  }, {
    key: "getHoverEnabled",
    value: function getHoverEnabled() {
      if (this.touch) {
        return false;
      }

      return this.getValue(this.props.hover);
    }
  }, {
    key: "itemClick",
    value: function itemClick(item, e) {
      var onClick = this.props.onClick;

      if (item._disabled) {
        return;
      }

      if (item.onClick) {
        item.onClick(item);
      } else if (onClick) {
        onClick(item);
      }

      if (item.close !== false && item._checked === undefined) {
        this.toggle();
      }
    }
  }, {
    key: "getCaret",
    value: function getCaret() {
      var _this$props8 = this.props,
          caret = _this$props8.caret,
          caretStyle = _this$props8.caretStyle;

      if (caret === false) {
        return '';
      }

      if (caret === true) {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            flex: 1
          }
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "aio-button-caret",
          style: caretStyle
        }));
      }

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          flex: 1
        }
      }), caret);
    }
  }, {
    key: "getAfter",
    value: function getAfter() {
      var after = this.props.after;

      if (after === undefined) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          flex: 1
        }
      }), after);
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props9 = this.props,
          type = _this$props9.type,
          _this$props9$before = _this$props9.before,
          before = _this$props9$before === void 0 ? null : _this$props9$before,
          _this$props9$text = _this$props9.text,
          text = _this$props9$text === void 0 ? null : _this$props9$text,
          checks = _this$props9.checks;
      var id = this.getValue(this.props.id);
      var disabled = this.getValue(this.props.disabled);
      var title = this.getValue(this.props.title);
      var className = this.getValue(this.props.className);
      var rtl = this.getValue(this.props.rtl);
      var style = this.getValue(this.props.style);
      var hover = this.getHoverEnabled();

      var _this$props$onClick = this.props.onClick,
          _onClick = _this$props$onClick === void 0 ? function () {} : _this$props$onClick;

      var contextValue = { ...this.props
      };
      contextValue.toggle = this.toggle.bind(this);

      contextValue.SetState = function (obj) {
        return _this6.setState(obj);
      };

      contextValue.getValue = this.getValue.bind(this);
      contextValue.itemClick = this.itemClick.bind(this);
      contextValue.hover = hover;
      var props = {
        id: id,
        className: "aio-button ".concat(rtl ? 'rtl' : 'ltr').concat(className ? ' ' + className : ''),
        style: _jquery.default.extend({}, {
          direction: rtl ? 'rtl' : 'ltr'
        }, this.getValue(style)),
        disabled: disabled,
        title: title,
        ref: this.dom,
        onClick: this.click.bind(this),
        onMouseEnter: hover ? function () {
          return _this6.toggle(true);
        } : undefined,
        onMouseLeave: hover ? function () {
          return _this6.toggle(false);
        } : undefined,
        tabIndex: 0
      };

      var button = /*#__PURE__*/_react.default.createElement("button", props, before, " ", text, " ", this.getCaret(), " ", this.getAfter(), " ", this.getBadge());

      return /*#__PURE__*/_react.default.createElement(dpContext.Provider, {
        value: contextValue
      }, type === 'multiselect' && /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-multiselect",
        style: {
          width: props.style.width
        }
      }, button, checks.length !== 0 && /*#__PURE__*/_react.default.createElement("div", {
        className: 'aio-button-checkeds' + (rtl ? ' rtl' : '')
      }, checks.map(function (check) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "aio-button-checked",
          onClick: function onClick() {
            return _onClick(check);
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "aio-button-checked-close"
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "aio-button-checked-text"
        }, check.text));
      }))), type !== 'multiselect' && button, this.showPopup() && /*#__PURE__*/_react.default.createElement(Popup, {
        ref: this.popup
      }));
    }
  }]);

  return AIOButtonBase;
}(_react.Component);

AIOButtonBase.defaultProps = {
  getOptionText: function getOptionText() {},
  getOptionChecked: function getOptionChecked() {},
  getOptionBefore: function getOptionBefore() {},
  getOptionAfter: function getOptionAfter() {},
  getOptionDisabled: function getOptionDisabled() {},
  getOptionClassName: function getOptionClassName() {},
  getOptionStyle: function getOptionStyle() {},
  getOptionId: function getOptionId() {},
  getOptionShow: function getOptionShow() {},
  getOptionHref: function getOptionHref() {},
  getOptionTitle: function getOptionTitle() {}
};

var Popup = /*#__PURE__*/function (_Component3) {
  _inherits(Popup, _Component3);

  var _super3 = _createSuper(Popup);

  function Popup(props) {
    var _this7;

    _classCallCheck(this, Popup);

    _this7 = _super3.call(this, props);
    _this7.dom = /*#__PURE__*/(0, _react.createRef)();
    _this7.activeIndex = false;
    _this7.state = {
      searchValue: ''
    };
    return _this7;
  }

  _createClass(Popup, [{
    key: "getLimit",
    value: function getLimit(dom) {
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
    }
  }, {
    key: "update",
    value: function update() {
      var _this$context = this.context,
          rtl = _this$context.rtl,
          openRelatedTo = _this$context.openRelatedTo,
          animate = _this$context.animate,
          dropdownType = _this$context.dropdownType,
          type = _this$context.type,
          popupWidth = _this$context.popupWidth;
      var popup = (0, _jquery.default)(this.dom.current);
      var button = type === 'multiselect' ? popup.prev().find('.aio-button') : popup.prev();
      var parent = openRelatedTo ? popup.parents(openRelatedTo) : undefined;
      parent = Array.isArray(parent) && parent.length === 0 ? undefined : parent;
      var bodyWidth = window.innerWidth;
      var bodyHeight = window.innerHeight;
      var parentLimit = parent ? this.getLimit(parent) : {
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

      var buttonLimit = this.getLimit(button);
      var popupLimit = this.getLimit(popup);
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
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var _this$context2 = this.context,
          rtl = _this$context2.rtl,
          dropdownType = _this$context2.dropdownType;
      var style = {
        direction: rtl ? 'rtl' : 'ltr'
      };

      if (dropdownType === 'center') {
        style.left = 0;
        style.top = 0;
        style.width = '100%';
        style.height = '100%';
        style.display = 'flex';
        style.alignItems = 'center';
        style.justifyContent = 'center';
      }

      return style;
    }
  }, {
    key: "getBackDropStyle",
    value: function getBackDropStyle() {
      var backdropStyle = this.context.backdropStyle;
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
  }, {
    key: "keyDown",
    value: function keyDown(e) {
      console.log(e.keyCode);

      if (e.keyCode === 40) {
        e.preventDefault();
        var items = (0, _jquery.default)(this.dom.current).find('.aio-button-list-item');
        var active = items.filter('.active');

        if (active.length === 0) {
          this.activeIndex = 0;
          items.eq(0).addClass('active');
        } else {
          var index = active.attr('dataindex');
          index++;

          if (index >= items.length) {
            index = 0;
          }

          items.removeClass('active');
          this.activeIndex = index;
          items.eq(index).addClass('active').focus();
        }
      } else if (e.keyCode === 38) {
        e.preventDefault();
        var items = (0, _jquery.default)(this.dom.current).find('.aio-button-list-item');
        var active = items.filter('.active');

        if (active.length === 0) {
          this.activeIndex = items.length - 1;
          items.eq(items.length - 1).addClass('active');
        } else {
          var _index = active.attr('dataindex');

          _index--;

          if (_index < 0) {
            _index = items.length - 1;
          }

          items.removeClass('active');
          this.activeIndex = _index;
          items.eq(_index).addClass('active').focus();
        }
      } else if (e.keyCode === 13) {
        var itemClick = this.context.itemClick;

        if (this.activeIndex !== false) {
          itemClick(this.items[this.activeIndex], e);
        }
      } else if (e.keyCode === 27) {
        var toggle = this.context.toggle;
        toggle();
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      var _this$context3 = this.context,
          items = _this$context3.items,
          getOptionText = _this$context3.getOptionText,
          getOptionDisabled = _this$context3.getOptionDisabled,
          getOptionBefore = _this$context3.getOptionBefore,
          getOptionAfter = _this$context3.getOptionAfter,
          getOptionChecked = _this$context3.getOptionChecked,
          getOptionClassName = _this$context3.getOptionClassName,
          getOptionStyle = _this$context3.getOptionStyle,
          getOptionId = _this$context3.getOptionId,
          getOptionShow = _this$context3.getOptionShow,
          getOptionHref = _this$context3.getOptionHref,
          getOptionTitle = _this$context3.getOptionTitle,
          searchValue = this.state.searchValue;
      var filteredItems = items.filter(function (item, i) {
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
      this.items = filteredItems;
      return filteredItems.map(function (item, i) {
        return /*#__PURE__*/_react.default.createElement(ListItem, {
          key: i,
          item: item,
          index: i
        });
      });
    }
  }, {
    key: "getSearchBox",
    value: function getSearchBox() {
      var _this8 = this;

      var _this$context4 = this.context,
          search = _this$context4.search,
          placeHolder = _this$context4.placeHolder;

      if (!search) {
        return null;
      }

      var searchValue = this.state.searchValue;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-search"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'aio-button-search-icon' + (searchValue ? ' aio-button-search-icon-filled' : ''),
        onClick: function onClick() {
          _this8.setState({
            searchValue: ''
          });
        }
      }), /*#__PURE__*/_react.default.createElement("input", {
        type: "text",
        value: searchValue,
        placeholder: placeHolder,
        onChange: function onChange(e) {
          return _this8.setState({
            searchValue: e.target.value
          });
        }
      }));
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var _this$context5 = this.context,
          popupClassName = _this$context5.popupClassName,
          rtl = _this$context5.rtl;
      var className = 'aio-button-popup-container';
      className += rtl ? ' rtl' : ' ltr';

      if (popupClassName) {
        className += ' ' + popupClassName;
      }

      return className;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context6 = this.context,
          toggle = _this$context6.toggle,
          getValue = _this$context6.getValue,
          hover = _this$context6.hover,
          popupWidth = _this$context6.popupWidth,
          popOver = _this$context6.popOver;
      var popupStyle = getValue(this.context.popupStyle);
      var PopOver = typeof popOver === 'function' ? popOver(this.context) : popOver;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: this.getClassName(),
        ref: this.dom,
        style: this.getStyle(),
        onMouseEnter: function onMouseEnter() {
          if (hover) {
            toggle(true);
          }
        },
        onMouseLeave: function onMouseLeave() {
          if (hover) {
            toggle(false);
          }
        },
        onKeyDown: this.keyDown.bind(this),
        tabIndex: 0
      }, !hover && /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-backdrop",
        onClick: function onClick() {
          return toggle(false, true);
        },
        style: this.getBackDropStyle()
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-popup",
        style: {
          width: popupWidth === 'fit' ? undefined : popupWidth,
          ...popupStyle
        }
      }, this.getSearchBox(), /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-items"
      }, PopOver || this.getOptions())));
    }
  }]);

  return Popup;
}(_react.Component);

_defineProperty(Popup, "contextType", dpContext);

var ListItem = /*#__PURE__*/function (_Component4) {
  _inherits(ListItem, _Component4);

  var _super4 = _createSuper(ListItem);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _super4.apply(this, arguments);
  }

  _createClass(ListItem, [{
    key: "render",
    value: function render() {
      var _this$context7 = this.context,
          itemClick = _this$context7.itemClick,
          _this$context7$gap = _this$context7.gap,
          gap = _this$context7$gap === void 0 ? 8 : _this$context7$gap,
          rtl = _this$context7.rtl;
      var _this$props10 = this.props,
          item = _this$props10.item,
          index = _this$props10.index;

      var Text = /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-text",
        title: item._title || item._text
      }, item._text);

      var CheckIcon = item._checked !== undefined ? /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: 'aio-button-check-icon' + (item._checked ? ' checked' : '')
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-gap",
        style: {
          width: gap
        }
      })) : null;
      var props = {
        className: "aio-button-list-item".concat(item._className ? ' ' + item._className : '').concat(item._disabled ? ' disabled' : ''),
        style: item._style,
        onClick: function onClick(e) {
          return itemClick(item, e);
        },
        title: '',
        dataindex: index,
        tabIndex: 0
      };
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, item.splitter && /*#__PURE__*/_react.default.createElement("div", {
        className: 'aio-button-splitter ' + (rtl ? 'rtl' : 'ltr')
      }, item.splitter), /*#__PURE__*/_react.default.createElement("div", props, CheckIcon, item._before, Text, item._after));
    }
  }]);

  return ListItem;
}(_react.Component);

_defineProperty(ListItem, "contextType", dpContext);