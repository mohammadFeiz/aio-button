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

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

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
          values = _this$props2.values,
          popOver = _this$props2.popOver;
      return /*#__PURE__*/_react.default.createElement(AIOButtonBase, _extends({
        popupWidth: popOver ? undefined : 'fit',
        caret: true
      }, this.props, {
        type: 'multiselect',
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
var dpContext = /*#__PURE__*/(0, _react.createContext)();

var AIOButtonBase = /*#__PURE__*/function (_Component2) {
  _inherits(AIOButtonBase, _Component2);

  var _super2 = _createSuper(AIOButtonBase);

  function AIOButtonBase(props) {
    var _this2;

    _classCallCheck(this, AIOButtonBase);

    _this2 = _super2.call(this, props);
    _this2.fn = new AIOBTNFN(function () {
      return _this2.props;
    }, function () {
      return _this2.state;
    }, function (obj) {
      _this2.setState(obj);
    });
    _this2.state = {
      open: _this2.props.open || false,
      touch: 'ontouchstart' in document.documentElement
    };
    _this2.dom = /*#__PURE__*/(0, _react.createRef)();
    return _this2;
  }

  _createClass(AIOButtonBase, [{
    key: "getValue",
    value: function getValue(value) {
      return typeof value === 'function' ? value(this.props) : value;
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      if (!this.props.onSwipe) {
        return;
      }

      this.canMove = false;
      this.firstMove = true;
      this.moved = false;
      this.coords = {
        x: e.clientX,
        y: e.clientY
      };
      (0, _jquery.default)(window).bind('mousemove', _jquery.default.proxy(this.mouseMove, this));
      (0, _jquery.default)(window).bind('mouseup', _jquery.default.proxy(this.mouseUp, this));
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var offsetX = e.clientX - this.coords.x;
      var offsetY = this.coords.y - e.clientY;

      if (!this.canMove && Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)) < 7) {
        return;
      }

      if (this.firstMove) {
        this.coords = {
          x: e.clientX,
          y: e.clientY
        };
        this.firstMove = false;
        return;
      }

      this.canMove = true;
      this.moved = true;
      var onSwipe = this.props.onSwipe;
      onSwipe(offsetX, offsetY);
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      (0, _jquery.default)(window).unbind('mousemove', this.mouseMove);
      (0, _jquery.default)(window).unbind('mouseup', this.mouseUp);

      if (!this.moved) {
        return;
      }

      var _this$props$onSwipeEn = this.props.onSwipeEnd,
          onSwipeEnd = _this$props$onSwipeEn === void 0 ? function () {} : _this$props$onSwipeEn;
      onSwipeEnd();
    }
  }, {
    key: "getTags",
    value: function getTags() {
      var checks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var rtl = arguments.length > 1 ? arguments[1] : undefined;

      var _onClick = arguments.length > 2 ? arguments[2] : undefined;

      var _this$props$editTag = this.props.editTag,
          editTag = _this$props$editTag === void 0 ? function (text) {
        return text;
      } : _this$props$editTag;

      if (checks.length === 0) {
        return '';
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: 'aio-button-checkeds' + (rtl ? ' rtl' : '')
      }, checks.map(function (check, i) {
        var _check$color = check.color,
            color = _check$color === void 0 ? [] : _check$color;
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: "aio-button-checked",
          onClick: function onClick() {
            return _onClick(check);
          },
          style: {
            background: color[0],
            color: color[1]
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "aio-button-checked-close"
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "aio-button-checked-text"
        }, editTag(check.text)));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$fn$getProps = this.fn.getProps(),
          type = _this$fn$getProps.type,
          before = _this$fn$getProps.before,
          text = _this$fn$getProps.text,
          checks = _this$fn$getProps.checks,
          onClick = _this$fn$getProps.onClick,
          id = _this$fn$getProps.id,
          disabled = _this$fn$getProps.disabled,
          title = _this$fn$getProps.title,
          className = _this$fn$getProps.className,
          rtl = _this$fn$getProps.rtl,
          style = _this$fn$getProps.style,
          hover = _this$fn$getProps.hover,
          attrs = _this$fn$getProps.attrs;

      var open = this.state.open;
      var contextValue = { ...this.props
      };
      contextValue.getValue = this.getValue.bind(this);
      contextValue.hover = hover;
      contextValue.fn = this.fn;
      var props = { ...attrs,
        id: id,
        className: "aio-button ".concat(rtl ? 'rtl' : 'ltr').concat(className ? ' ' + className : ''),
        style: _jquery.default.extend({}, {
          direction: rtl ? 'rtl' : 'ltr'
        }, this.getValue(style)),
        disabled: disabled,
        title: title,
        ref: this.dom,
        onClick: function onClick(e) {
          return _this3.fn.onClick(e);
        },
        onMouseEnter: hover ? function () {
          return _this3.fn.toggle(true);
        } : undefined,
        onMouseLeave: hover ? function () {
          return _this3.fn.toggle(false);
        } : undefined,
        onMouseDown: this.mouseDown.bind(this),
        onTouchStart: this.mouseDown.bind(this),
        tabIndex: 0
      };

      var button = /*#__PURE__*/_react.default.createElement("button", props, before, " ", text, " ", this.fn.getCaret('react'), " ", this.fn.getAfter('react'), " ", this.fn.getBadge('react'));

      return /*#__PURE__*/_react.default.createElement(dpContext.Provider, {
        value: contextValue
      }, type === 'multiselect' && /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-multiselect",
        style: {
          width: props.style.width
        }
      }, button, this.getTags(checks, rtl, onClick)), type !== 'multiselect' && button, this.fn.showPopup(open) && /*#__PURE__*/_react.default.createElement(Popup, {
        ref: this.popup
      }));
    }
  }]);

  return AIOButtonBase;
}(_react.Component);

var Popup = /*#__PURE__*/function (_Component3) {
  _inherits(Popup, _Component3);

  var _super3 = _createSuper(Popup);

  function Popup(props) {
    var _this4;

    _classCallCheck(this, Popup);

    _this4 = _super3.call(this, props);
    _this4.dom = /*#__PURE__*/(0, _react.createRef)();
    _this4.state = {
      searchValue: ''
    };
    return _this4;
  }

  _createClass(Popup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var fn = this.context.fn;
      fn.update((0, _jquery.default)(this.dom.current));
    }
  }, {
    key: "getSearchBox",
    value: function getSearchBox() {
      var _this5 = this;

      var _this$context = this.context,
          search = _this$context.search,
          placeHolder = _this$context.placeHolder;

      if (!search) {
        return null;
      }

      var searchValue = this.state.searchValue;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-search"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'aio-button-search-icon' + (searchValue ? ' aio-button-search-icon-filled' : ''),
        onClick: function onClick() {
          _this5.setState({
            searchValue: ''
          });
        }
      }), /*#__PURE__*/_react.default.createElement("input", {
        type: "text",
        value: searchValue,
        placeholder: placeHolder,
        onChange: function onChange(e) {
          return _this5.setState({
            searchValue: e.target.value
          });
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$context2 = this.context,
          getValue = _this$context2.getValue,
          hover = _this$context2.hover,
          popupWidth = _this$context2.popupWidth,
          fn = _this$context2.fn;
      var searchValue = this.state.searchValue;
      var popupStyle = getValue(this.context.popupStyle);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: fn.getPopupClassName(),
        ref: this.dom,
        style: fn.getPopupStyle('react'),
        onMouseEnter: function onMouseEnter() {
          if (hover) {
            fn.toggle(true);
          }
        },
        onMouseLeave: function onMouseLeave() {
          if (hover) {
            fn.toggle(false);
          }
        },
        onKeyDown: function onKeyDown(e) {
          return fn.keyDown(e, (0, _jquery.default)(_this6.dom.current));
        },
        tabIndex: 0
      }, !hover && /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-backdrop",
        onClick: function onClick() {
          return fn.toggle(false, true);
        },
        style: fn.getBackDropStyle('react')
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-popup",
        style: {
          width: popupWidth === 'fit' ? undefined : popupWidth,
          ...popupStyle
        }
      }, this.getSearchBox(), /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-items"
      }, fn.getPopupContent(searchValue, 'react'))));
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
      var _this$context3 = this.context,
          fn = _this$context3.fn,
          rtl = _this$context3.rtl;
      var _this$props5 = this.props,
          item = _this$props5.item,
          index = _this$props5.index;

      var Text = /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-button-text",
        title: item._title || item._text
      }, item._text);

      var props = {
        className: "aio-button-list-item".concat(item._className ? ' ' + item._className : '').concat(item._disabled ? ' disabled' : ''),
        style: item._style,
        onClick: function onClick(e) {
          return fn.itemClick(item, e);
        },
        title: '',
        dataindex: index,
        tabIndex: 0
      };
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, item.splitter && /*#__PURE__*/_react.default.createElement("div", {
        className: 'aio-button-splitter ' + (rtl ? 'rtl' : 'ltr')
      }, item.splitter), /*#__PURE__*/_react.default.createElement("div", props, fn.getCheckIcon(item, 'react'), item._before, Text, item._after));
    }
  }]);

  return ListItem;
}(_react.Component);

_defineProperty(ListItem, "contextType", dpContext);

function AIOBTNFN(_getProps16, getState, setState) {
  var $$ = {
    activeIndex: false,
    getCheckIcon: function getCheckIcon(item) {
      var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'react';

      if (item._checked === undefined) {
        return '';
      }

      var _getProps = _getProps16(),
          _getProps$gap = _getProps.gap,
          gap = _getProps$gap === void 0 ? 8 : _getProps$gap;

      if (platform === 'react') {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
          className: 'aio-button-check-icon' + (item._checked ? ' checked' : '')
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "aio-button-gap",
          style: {
            width: gap
          }
        }));
      }

      if (platform === 'jquery') {
        return "\n          <div class='aio-button-check-icon".concat(item._checked ? ' checked' : '', "'></div>\n          <div class='aio-button-gap' style='width:").concat(gap, "px;'></div>\n        ");
      }
    },
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
      var _getProps2 = _getProps16(),
          rtl = _getProps2.rtl,
          openRelatedTo = _getProps2.openRelatedTo,
          animate = _getProps2.animate,
          dropdownType = _getProps2.dropdownType,
          type = _getProps2.type,
          popupWidth = _getProps2.popupWidth;

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
      var _getProps3 = _getProps16(),
          _getProps3$getOptionT = _getProps3.getOptionText,
          getOptionText = _getProps3$getOptionT === void 0 ? function () {} : _getProps3$getOptionT,
          _getProps3$getOptionD = _getProps3.getOptionDisabled,
          getOptionDisabled = _getProps3$getOptionD === void 0 ? function () {} : _getProps3$getOptionD,
          _getProps3$getOptionB = _getProps3.getOptionBefore,
          getOptionBefore = _getProps3$getOptionB === void 0 ? function () {} : _getProps3$getOptionB,
          _getProps3$getOptionA = _getProps3.getOptionAfter,
          getOptionAfter = _getProps3$getOptionA === void 0 ? function () {} : _getProps3$getOptionA,
          _getProps3$getOptionC = _getProps3.getOptionChecked,
          getOptionChecked = _getProps3$getOptionC === void 0 ? function () {} : _getProps3$getOptionC,
          _getProps3$getOptionC2 = _getProps3.getOptionClassName,
          getOptionClassName = _getProps3$getOptionC2 === void 0 ? function () {} : _getProps3$getOptionC2,
          _getProps3$getOptionS = _getProps3.getOptionStyle,
          getOptionStyle = _getProps3$getOptionS === void 0 ? function () {} : _getProps3$getOptionS,
          _getProps3$getOptionI = _getProps3.getOptionId,
          getOptionId = _getProps3$getOptionI === void 0 ? function () {} : _getProps3$getOptionI,
          _getProps3$getOptionS2 = _getProps3.getOptionShow,
          getOptionShow = _getProps3$getOptionS2 === void 0 ? function () {} : _getProps3$getOptionS2,
          _getProps3$getOptionH = _getProps3.getOptionHref,
          getOptionHref = _getProps3$getOptionH === void 0 ? function () {} : _getProps3$getOptionH,
          _getProps3$getOptionT2 = _getProps3.getOptionTitle,
          getOptionTitle = _getProps3$getOptionT2 === void 0 ? function () {} : _getProps3$getOptionT2;

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
      var _getProps4 = _getProps16(),
          popupClassName = _getProps4.popupClassName,
          rtl = _getProps4.rtl;

      var className = 'aio-button-popup-container';
      className += rtl ? ' rtl' : ' ltr';

      if (popupClassName) {
        className += ' ' + popupClassName;
      }

      return className;
    },
    getPopupStyle: function getPopupStyle() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'react';

      var _getProps5 = _getProps16(),
          rtl = _getProps5.rtl,
          dropdownType = _getProps5.dropdownType;

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

      var _getProps6 = _getProps16(),
          backdropStyle = _getProps6.backdropStyle;

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

        var _getProps7 = _getProps16(),
            onBackdropClick = _getProps7.onBackdropClick,
            onToggle = _getProps7.onToggle;

        if (onBackdropClick && isBackdrop) {
          onBackdropClick(_getProps16());
        }

        if (onToggle) {
          onToggle(state);
        }
      }, 100);
    },
    itemClick: function itemClick(item, e) {
      var _getProps8 = _getProps16(),
          onClick = _getProps8.onClick;

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
      var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'react';

      var _getProps9 = _getProps16(),
          items = _getProps9.items,
          popOver = _getProps9.popOver;

      if (popOver) {
        return typeof popOver === 'function' ? popOver(_getProps16()) : popOver;
      }

      $$.items = $$.getOptions(items, searchValue);

      if (platform === 'react') {
        return $$.items.map(function (item, i) {
          return /*#__PURE__*/_react.default.createElement(ListItem, {
            key: i,
            item: item,
            index: i
          });
        });
      }

      if (platform === 'jquery') {
        return $$.items.map(function (item, i) {
          return ListItem({
            item: item,
            index: i
          });
        }).join(' ');
      }
    },
    getCaret: function getCaret() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'react';

      var _getProps10 = _getProps16(),
          caret = _getProps10.caret,
          caretStyle = _getProps10.caretStyle;

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
    getAfter: function getAfter(platform) {
      var _getProps11 = _getProps16(),
          after = _getProps11.after;

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
    onClick: function onClick(e) {
      if ((0, _jquery.default)(e.target).parents('.aio-button-checkeds').length !== 0) {
        return;
      }

      var _getProps12 = _getProps16(),
          items = _getProps12.items,
          popOver = _getProps12.popOver,
          _getProps12$onClick = _getProps12.onClick,
          onClick = _getProps12$onClick === void 0 ? function () {} : _getProps12$onClick;

      if (items || popOver) {
        $$.toggle(true);
      } else {
        onClick(_getProps16());
      }
    },
    showPopup: function showPopup(open) {
      var _getProps13 = _getProps16(),
          items = _getProps13.items,
          popOver = _getProps13.popOver;

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
    getBadge: function getBadge() {
      var platform = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'react';

      var _getProps14 = _getProps16(),
          badge = _getProps14.badge,
          badgeStyle = _getProps14.badgeStyle;

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
    getHoverEnabled: function getHoverEnabled() {
      var _getState2 = getState(),
          touch = _getState2.touch;

      if (touch) {
        return false;
      }

      var _getProps15 = _getProps16(),
          hover = _getProps15.hover;

      return typeof hover === 'function' ? hover(_getProps16()) : hover;
    },
    getValue: function getValue(value) {
      return typeof value === 'function' ? value(_getProps16()) : value;
    },
    getProps: function getProps() {
      var props = _getProps16();

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
      return {
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
    }
  };
  return {
    getLimit: $$.getLimit,
    update: $$.update,
    getOptions: $$.getOptions,
    getPopupClassName: $$.getPopupClassName,
    getPopupStyle: $$.getPopupStyle,
    getBackDropStyle: $$.getBackDropStyle,
    toggle: $$.toggle,
    keyDown: $$.keyDown,
    itemClick: $$.itemClick,
    getCaret: $$.getCaret,
    getAfter: $$.getAfter,
    onClick: $$.onClick,
    showPopup: $$.showPopup,
    getPopupContent: $$.getPopupContent,
    getBadge: $$.getBadge,
    getProps: $$.getProps,
    getHoverEnabled: $$.getHoverEnabled,
    getCheckIcon: $$.getCheckIcon
  };
}