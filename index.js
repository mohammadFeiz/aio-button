"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@mdi/react");

var _js = require("@mdi/js");

var _jquery = _interopRequireDefault(require("jquery"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

let aioButtonContext = /*#__PURE__*/(0, _react.createContext)();

class AIOButton extends _react.Component {
  getMultiselectDetails() {
    let {
      options = [],
      value,
      selectAllText = 'Select All',
      removeAllText = 'Remove All'
    } = this.props;
    let type,
        Value = [],
        tags = [];

    if (Array.isArray(value)) {
      type = 'array';
      Value = value;
    } else if (typeof value === 'object') {
      type = 'object';

      for (let prop in value) {
        if (value[prop] === true) {
          Value.push(prop);
        }
      }
    } else {
      console.error('AIOButton => in multiselect type value must be array or object');
    }

    let Options = options.map((o, i) => {
      let a = { ...o
      };
      a.checked = Value.indexOf(a.value) !== -1;
      a.optionIndex = i;

      if (a.checked) {
        tags.push(a);
      }

      return { ...a
      };
    });

    if (Options.length > 9) {
      let text = options.length === Value.length ? removeAllText : selectAllText;
      Options = [{
        text,
        value: 'multiselect_selectAll',
        close: false
      }, ...Options];
    }

    return {
      type,
      options: Options,
      tags,
      value: Value
    };
  }

  Render_multiselect() {
    let details = this.getMultiselectDetails();
    let {
      onChange
    } = this.props;
    let props = {
      getProp: this.getProp.bind(this),
      popupWidth: 'fit',
      caret: true,
      ...this.props,
      type: 'multiselect',
      popOver: false,
      options: details.options,
      tags: details.tags,
      onClick: ({
        value
      }) => {
        let list, type;

        if (value === 'multiselect_selectAll') {
          list = details.options.length === details.value.length ? [] : details.options.map(o => o.value);
        } else {
          let copyValue = [...details.value];

          for (let i = 0; i < copyValue.length; i++) {
            if (copyValue[i] === value) {
              copyValue.splice(i, 1);
              i--;

              if (i < 0) {
                i = 0;
              }
            }
          }

          if (copyValue.length !== details.value.length) {
            list = copyValue;
            type = 'remove';
          } else {
            list = copyValue.concat(value);
            type = 'add';
          }
        }

        if (details.type === 'array') {
          onChange(list, value, type);
        } else {
          let obj = {};

          for (let prop in this.props.value) {
            obj[prop] = list.indexOf(prop) !== -1;
          }

          onChange(obj);
        }
      }
    };
    return /*#__PURE__*/_react.default.createElement(AIOButtonBase, props);
  }

  getSelectText() {
    let {
      options,
      value,
      text
    } = this.props;

    if (text === false) {
      return '';
    }

    if (text !== undefined) {
      return text;
    }

    if (this.text && this.value === value) {
      return this.text;
    } else {
      let option = options.filter(o => o.value === value)[0];

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

  Render_select() {
    let {
      options = [],
      onChange = () => {}
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(AIOButtonBase, _extends({
      getProp: this.getProp.bind(this),
      text: this.getSelectText(),
      caret: true
    }, this.props, {
      popOver: false,
      options: options,
      onClick: (obj, index) => {
        this.text = obj.text;
        this.value = obj.value;
        onChange(obj.value, obj, index);
      }
    }));
  }

  Render_button() {
    let {
      popOver
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(AIOButtonBase, _extends({
      caret: popOver ? true : false
    }, this.props, {
      getProp: this.getProp.bind(this)
    }));
  }

  Render_radio() {
    return /*#__PURE__*/_react.default.createElement(AIOButtonRadio, _extends({}, this.props, {
      getProp: this.getProp.bind(this)
    }));
  }

  Render_checkbox() {
    let {
      text,
      subtext,
      value,
      onChange,
      style,
      className,
      checkIcon,
      iconColor,
      iconSize
    } = this.props;
    let props = {
      text,
      subtext,
      value,
      style,
      className,
      checkIcon,
      iconColor,
      iconSize,
      onChange: () => onChange(value)
    };
    return /*#__PURE__*/_react.default.createElement(Checkbox, _extends({}, props, {
      getProp: this.getProp.bind(this)
    }));
  }

  Render_checklist() {
    return /*#__PURE__*/_react.default.createElement(AIOButtonRadio, _extends({}, this.props, {
      getProp: this.getProp.bind(this),
      value: true,
      options: this.props.options.map(o => {
        return { ...o,
          onClick: o.onChange ? () => o.onChange(o.value) : undefined,
          round: false,
          onChange: (value, obj, index) => {
            this.props.onChange(value, obj, index);
          }
        };
      })
    }));
  } //readFromProps baraye inke faghat meghdar ra az props bekhanad va na az option(estefade dar style va className ke union mishavand)


  getPropfromProps({
    option,
    index,
    field
  }) {
    let prop = this.props['option' + field[0].toUpperCase() + field.slice(1, field.length)];
    let value;

    if (typeof prop === 'string') {
      try {
        eval('value = ' + prop);
      } catch {
        value = undefined;
      }
    } else if (typeof prop === 'function') {
      value = prop(option, index);
    } else if (prop !== undefined) {
      value = prop;
    }

    return value;
  }

  getProp({
    option,
    index,
    field,
    def,
    type,
    readFrom
  }) {
    if (readFrom !== 'props') {
      let optionResult = option[field];

      if (optionResult !== undefined) {
        if (type) {
          if (this.getType(optionResult) === type) {
            return optionResult;
          }
        } else {
          return optionResult;
        }
      }
    }

    if (readFrom !== 'option') {
      let propsResult = this.getPropfromProps({
        option,
        index,
        field
      });

      if (propsResult !== undefined) {
        if (type) {
          if (this.getType(propsResult) === type) {
            return propsResult;
          }
        } else {
          return propsResult;
        }
      }
    }

    return def;
  }

  getType(a) {
    if (typeof a === 'object') {
      if (Array.isArray(a)) {
        return 'array';
      }

      return 'object';
    }

    return typeof a;
  }

  render() {
    let {
      type = 'button'
    } = this.props;
    return this[`Render_${type}`]();
  }

}

exports.default = AIOButton;

class Checkbox extends _react.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(AIOButtonRadioOption, _extends({}, this.props, {
      active: this.props.value,
      round: false
    }));
  }

}

class AIOButtonRadio extends _react.Component {
  getClassName() {
    let {
      attrs = {},
      rtl
    } = this.props;
    return 'r-radio-button' + (rtl ? ' rtl' : '') + (attrs.className ? ' ' + attrs.className : '');
  }

  getOptionClassName(option, index) {
    let a = this.props.getProp({
      option,
      index,
      field: 'className',
      def: undefined,
      readFrom: 'props'
    });
    let b = option.className;
    let className = [];

    if (a) {
      className.push(a);
    }

    if (b) {
      className.push(b);
    }

    return className.legth ? className.split(' ') : '';
  }

  render() {
    var {
      options = [],
      getProp,
      attrs = {},
      justify
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", _extends({}, attrs, {
      className: this.getClassName(),
      style: {
        justifyContent: justify ? 'center' : undefined,
        ...attrs.style
      }
    }), options.map((option, i) => {
      let show = getProp({
        option,
        index: i,
        field: 'show',
        def: true
      });

      if (!show) {
        return '';
      }

      let value = getProp({
        option,
        index: i,
        field: 'value',
        def: undefined
      });
      let props = {
        text: getProp({
          option,
          index: i,
          field: 'text',
          def: ''
        }),
        subtext: getProp({
          option,
          index: i,
          field: 'subtext',
          def: ''
        }),
        value,
        title: getProp({
          option,
          index: i,
          field: 'title',
          def: undefined
        }),
        style: { ...getProp({
            option,
            index: i,
            field: 'style',
            def: undefined,
            readFrom: 'props'
          }),
          ...option.style
        },
        iconColor: getProp({
          option,
          index: i,
          field: 'iconColor',
          def: undefined
        }),
        iconSize: getProp({
          option,
          index: i,
          field: 'iconSize',
          def: undefined
        }),
        className: this.getOptionClassName(option, i),
        checkIcon: getProp({
          option,
          index: i,
          field: 'checkIcon',
          def: undefined
        }),
        disabled: getProp({
          option,
          index: i,
          field: 'disabled',
          def: undefined
        }),
        key: i,
        onChange: () => option.onClick ? option.onClick() : this.props.onChange(value, i, option),
        active: value === this.props.value,
        round: option.round
      };
      return /*#__PURE__*/_react.default.createElement(AIOButtonRadioOption, props);
    }));
  }

}

class AIOButtonRadioOption extends _react.Component {
  getClassName() {
    var {
      active,
      className,
      disabled
    } = this.props;
    let result = 'r-radio-button-option';

    if (active) {
      result += ' active';
    }

    if (disabled) {
      result += ' disabled';
    }

    if (className) {
      result += ' ' + className;
    }

    return result;
  }

  render() {
    let {
      style,
      gap = 6,
      onChange,
      title,
      disabled,
      text,
      subtext,
      round = true
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: this.getClassName(),
      title: title,
      onClick: () => {
        if (!disabled) {
          onChange();
        }
      },
      style: style
    }, /*#__PURE__*/_react.default.createElement(CheckIcon, _extends({}, this.props, {
      round: round
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "aio-button-gap",
      style: {
        width: gap
      }
    }), /*#__PURE__*/_react.default.createElement(Text, {
      text: text,
      subtext: subtext
    }));
  }

}

function Text(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "aio-button-text"
  }, props.text !== undefined && props.text, props.subtext !== undefined && /*#__PURE__*/_react.default.createElement("div", {
    className: "r-radio-button-subtext"
  }, props.subtext));
}

class AIOButtonBase extends _react.Component {
  constructor(props) {
    super(props);
    this.activeIndex = false;
    this.state = {
      open: this.props.open || false,
      touch: 'ontouchstart' in document.documentElement
    };
  }

  dragStart(e) {
    this.dragIndex = parseInt((0, _jquery.default)(e.target).attr('datarealindex'));
  }

  dragOver(e) {
    e.preventDefault();
  }

  drop(e) {
    e.stopPropagation();
    let {
      onSwap
    } = this.props,
        from = this.dragIndex,
        dom = (0, _jquery.default)(e.target);

    if (!dom.hasClass('aio-button-list-item')) {
      dom = dom.parents('.aio-button-list-item');
    }

    ;

    if (!dom.hasClass('aio-button-list-item')) {
      return;
    }

    ;
    let to = parseInt(dom.attr('datarealindex'));

    if (from === to) {
      return;
    }

    onSwap(from, to, this.swap);
  }

  swap(arr, from, to) {
    let Arr = arr.map((o, i) => {
      o._testswapindex = i;
      return o;
    });
    let fromIndex = Arr[from]._testswapindex;
    Arr.splice(to, 0, { ...Arr[from],
      _testswapindex: false
    });
    return Arr.filter(o => o._testswapindex !== fromIndex);
  }

  arrow(e, dom, dir) {
    e.preventDefault();
    let options = dom.find('.aio-button-list-item');
    let active = options.filter('.active');

    if (active.length === 0) {
      this.activeIndex = {
        real: 0,
        render: 0
      };
      options.eq(0).addClass('active');
    } else {
      let realIndex = +active.attr('datarealindex');
      let renderIndex = +active.attr('datarenderindex');
      renderIndex += dir;

      if (dir === 1) {
        if (renderIndex >= options.length) {
          renderIndex = 0;
        }
      } else {
        if (renderIndex < 0) {
          renderIndex = options.length - 1;
        }
      }

      options.removeClass('active');
      this.activeIndex = {
        real: realIndex,
        render: renderIndex
      };
      options.eq(renderIndex).addClass('active').focus();
    }
  }

  enter(e) {
    if (this.activeIndex !== false) {
      this.optionClick(this.props.options[this.activeIndex.real], e);
    }
  }

  keyDown(e, dom) {
    if (e.keyCode === 40) {
      this.arrow(e, dom, 1);
    } else if (e.keyCode === 38) {
      this.arrow(e, dom, -1);
    } else if (e.keyCode === 13) {
      this.enter(e);
    } else if (e.keyCode === 27) {
      this.toggle();
    }
  }

  optionClick(option, realIndex) {
    if (this.props.getProp({
      option,
      index: realIndex,
      field: 'disabled'
    })) {
      return;
    }

    if (option.onClick) {
      option.onClick(option, realIndex);
    } else if (this.props.onClick) {
      this.props.onClick(option);
    }

    if (option.close !== false && this.props.getProp({
      option,
      index: realIndex,
      field: 'checked',
      def: undefined
    }) === undefined) {
      this.toggle();
    }
  }

  onButtonClick(e) {
    if ((0, _jquery.default)(e.target).parents('.aio-button-tags').length !== 0) {
      return;
    }

    var {
      options,
      popOver,
      onClick = () => {}
    } = this.props;

    if (options || popOver) {
      this.toggle(true);
    } else {
      onClick(this.props);
    }
  }

  showPopup(open) {
    var {
      options,
      popOver
    } = this.props;

    if (!open) {
      return false;
    }

    if (popOver) {
      return true;
    }

    if (options !== undefined) {
      return true;
    }

    return false;
  }

  toggle(state, isBackdrop) {
    let {
      open
    } = this.state;
    let {
      onBackdropClick,
      onToggle
    } = this.props;

    if (state === undefined) {
      state = !open;
    }

    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      if (state === open) {
        return;
      }

      this.setState({
        open: state
      });

      if (state) {
        (0, _jquery.default)('body').addClass('aio-button-open');
      } else {
        (0, _jquery.default)('body').removeClass('aio-button-open');
      }

      if (onBackdropClick && isBackdrop) {
        onBackdropClick(this.props);
      }

      if (onToggle) {
        onToggle(state);
      }
    }, 100);
  }

  render() {
    let {
      type
    } = this.props;
    let {
      open,
      touch
    } = this.state;
    let context = { ...this.props,
      touch,
      optionClick: this.optionClick.bind(this),
      onButtonClick: this.onButtonClick.bind(this),
      toggle: this.toggle.bind(this),
      dragStart: this.dragStart.bind(this),
      dragOver: this.dragOver.bind(this),
      drop: this.drop.bind(this),
      keyDown: this.keyDown.bind(this)
    };
    return /*#__PURE__*/_react.default.createElement(aioButtonContext.Provider, {
      value: context
    }, type === 'multiselect' && /*#__PURE__*/_react.default.createElement(Multiselect, null), type !== 'multiselect' && /*#__PURE__*/_react.default.createElement(Button, null), this.showPopup(open) && /*#__PURE__*/_react.default.createElement(Popup, null));
  }

}

AIOButtonBase.defaultProps = {
  gap: 6
};

class Button extends _react.Component {
  render() {
    let {
      toggle,
      onButtonClick,
      before,
      text,
      gap,
      attrs = {},
      rtl,
      caret,
      caretAttrs,
      badge,
      badgeAttrs,
      after,
      hover,
      touch
    } = this.context;
    let props = { ...attrs,
      tabIndex: 0,
      onClick: onButtonClick,
      className: `aio-button ${rtl ? 'rtl' : 'ltr'}${attrs.className ? ' ' + attrs.className : ''}`,
      onMouseEnter: hover && !touch ? () => toggle(true) : undefined,
      onMouseLeave: hover && !touch ? () => toggle(false) : undefined
    };
    return /*#__PURE__*/_react.default.createElement("button", props, before !== undefined && /*#__PURE__*/_react.default.createElement(Before, {
      before: before,
      gap: gap
    }), text, caret !== false && /*#__PURE__*/_react.default.createElement(Caret, {
      caret: caret,
      attrs: caretAttrs
    }), after !== undefined && /*#__PURE__*/_react.default.createElement(After, {
      after: after,
      gap: gap
    }), badge !== undefined && /*#__PURE__*/_react.default.createElement(Badge, {
      badge: badge,
      attrs: badgeAttrs
    }));
  }

}

_defineProperty(Button, "contextType", aioButtonContext);

function Before(props) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.before, /*#__PURE__*/_react.default.createElement("div", {
    className: "aio-button-gap",
    style: {
      width: props.gap
    }
  }));
}

function Caret(props) {
  let {
    attrs = {}
  } = props;
  let icon = props.caret === true ? /*#__PURE__*/_react.default.createElement("div", _extends({
    className: 'aio-button-caret'
  }, attrs)) : props.caret;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      flex: 1
    }
  }), icon);
}

function After(props) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      flex: 1,
      minWidth: props.gap
    }
  }), props.after);
}

function Badge({
  badge,
  attrs = {}
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, attrs, {
    className: 'aio-button-badge' + (attrs.className ? ' ' + attrs.className : '')
  }), badge);
}

function SearchBox(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "aio-button-search"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: 'aio-button-search-icon' + (props.value ? ' aio-button-search-icon-filled' : ''),
    onClick: () => {
      props.onChange('');
    }
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    value: props.value,
    placeholder: props.placeholder,
    onChange: e => props.onChange(e.target.value)
  }));
}

class Popup extends _react.Component {
  constructor(props) {
    super(props);
    this.dom = /*#__PURE__*/(0, _react.createRef)();
    this.state = {
      searchValue: ''
    };
  }

  componentDidMount() {
    this.update((0, _jquery.default)(this.dom.current));
  }

  getLimit(dom) {
    var offset = dom.offset();
    var left = offset.left - window.pageXOffset;
    var top = offset.top - window.pageYOffset;
    var width = dom.outerWidth();
    var height = dom.outerHeight();
    var right = left + width;
    var bottom = top + height;
    return {
      left,
      top,
      right,
      bottom,
      width,
      height
    };
  }

  update(popup) {
    var {
      rtl,
      openRelatedTo,
      animate,
      dropdownType,
      type,
      popupWidth
    } = this.context;
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
  }

  getOptions() {
    let {
      searchValue
    } = this.state;
    let {
      getProp,
      options
    } = this.context;
    let renderIndex = 0;
    let result = [];

    for (let realIndex = 0; realIndex < options.length; realIndex++) {
      let option = options[realIndex];

      if (getProp({
        option,
        index: realIndex,
        field: 'show',
        def: true
      }) === false) {
        continue;
      }

      let text = getProp({
        option,
        index: realIndex,
        field: 'text',
        def: ''
      });

      if (text === undefined) {
        continue;
      }

      if (searchValue && text.indexOf(searchValue) === -1) {
        continue;
      }

      result.push( /*#__PURE__*/_react.default.createElement(Option, {
        key: realIndex,
        renderIndex: renderIndex,
        realIndex: realIndex,
        option: option
      }));
      renderIndex++;
    }

    return result;
  }

  renderPopOver() {
    return this.context.popOver ? this.context.popOver(this.context) : null;
  }

  renderOptions() {
    let {
      popOver,
      searchText = 'Search'
    } = this.context;
    let {
      searchValue
    } = this.state;

    if (popOver) {
      return null;
    }

    let options = this.getOptions();
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (searchValue !== '' || options.length > 10) && /*#__PURE__*/_react.default.createElement(SearchBox, {
      value: searchValue,
      onChange: text => this.setState({
        searchValue: text
      }),
      placeholder: searchText
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "aio-button-options"
    }, options));
  }

  getClassName() {
    let {
      rtl,
      popupClassName,
      dropdownType
    } = this.context;
    let className = 'aio-button-popup-container';

    if (rtl) {
      className += ' rtl';
    }

    if (popupClassName) {
      className += ' ' + popupClassName;
    }

    if (dropdownType === 'center') {
      className += ' aio-button-popup-center';
    }

    return className;
  }

  render() {
    var {
      toggle,
      hover,
      popupWidth,
      popupStyle,
      backdropStyle,
      keyDown
    } = this.context;
    let props = {
      ref: this.dom,
      className: this.getClassName(),
      tabIndex: 0,
      onMouseEnter: () => {
        if (hover) {
          toggle(true);
        }
      },
      onMouseLeave: () => {
        if (hover) {
          toggle(false);
        }
      },
      onKeyDown: e => keyDown(e, (0, _jquery.default)(this.dom.current))
    };
    return /*#__PURE__*/_react.default.createElement("div", props, !hover && /*#__PURE__*/_react.default.createElement(Backdrop, {
      onClick: () => toggle(false, true),
      style: backdropStyle
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "aio-button-popup",
      style: {
        width: popupWidth === 'fit' ? undefined : popupWidth,
        popupStyle
      }
    }, this.renderPopOver(), this.renderOptions()));
  }

}

_defineProperty(Popup, "contextType", aioButtonContext);

function Backdrop(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "aio-button-backdrop",
    onClick: props.onClick,
    style: props.style
  });
}

class Multiselect extends _react.Component {
  render() {
    let {
      tags,
      style = {},
      showTags
    } = this.context;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "aio-button-multiselect",
      style: {
        width: style.width
      }
    }, /*#__PURE__*/_react.default.createElement(Button, null), showTags !== false && tags.length !== 0 && /*#__PURE__*/_react.default.createElement(Tags, {
      tags: tags
    }));
  }

}

_defineProperty(Multiselect, "contextType", aioButtonContext);

class Tags extends _react.Component {
  render() {
    let {
      tagsContainerClassName: tcc,
      tagsContainerStyle: tcs,
      rtl,
      disabled,
      onClick,
      getProp
    } = this.context;
    let {
      tags
    } = this.props;
    let Tags = tags.map((tag, i) => {
      let tagStyle = getProp({
        option: tag,
        index: tag.optionIndex,
        field: 'tagStyle',
        def: undefined
      });
      let tagClassName = getProp({
        option: tag,
        index: tag.optionIndex,
        field: 'tagClassName',
        def: undefined
      });
      let props = {
        key: i,
        onClick: () => {
          if (!disabled && !tag.disabled) {
            onClick(tag);
          }
        },
        before: tag.before,
        text: tag.text,
        style: tagStyle,
        className: tagClassName,
        disabled: disabled || tag.disabled
      };
      return /*#__PURE__*/_react.default.createElement(Tag, props);
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      className: 'aio-button-tags' + (rtl ? ' rtl' : '') + (disabled ? ' disabled' : '') + (tcc ? ' ' + tcc : ''),
      style: tcs
    }, Tags);
  }

}

_defineProperty(Tags, "contextType", aioButtonContext);

function Tag(props) {
  let {
    text,
    before = /*#__PURE__*/_react.default.createElement(_react2.Icon, {
      path: _js.mdiCircleMedium,
      size: 0.6
    }),
    onClick,
    style,
    className,
    disabled
  } = props;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'aio-button-tag' + (className ? ' ' + className : '') + (disabled ? ' disabled' : ''),
    onClick: onClick,
    style: style
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "aio-button-tag-icon"
  }, before), /*#__PURE__*/_react.default.createElement("div", {
    className: "aio-button-tag-text"
  }, text), /*#__PURE__*/_react.default.createElement("div", {
    className: "aio-button-tag-icon"
  }, /*#__PURE__*/_react.default.createElement(_react2.Icon, {
    path: _js.mdiClose,
    size: 0.6
  })));
}

function CheckIcon(props) {
  let {
    active,
    iconColor,
    iconSize,
    checkIcon,
    round
  } = props;

  if (checkIcon !== undefined) {
    return checkIcon;
  }

  if (!Array.isArray(iconColor)) {
    iconColor = [iconColor];
  }

  let [outerColor, innerColor = outerColor] = iconColor;
  iconColor = [outerColor, innerColor];

  if (!Array.isArray(iconSize)) {
    iconSize = [];
  }

  let [outerSize, innerSize, stroke] = iconSize;
  iconSize = [outerSize, innerSize, stroke];
  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'aio-button-check-out' + (active ? ' active' : '') + (round ? ' round' : ''),
    style: {
      color: iconColor[0],
      width: iconSize[0],
      height: iconSize[0],
      border: `${iconSize[2]}px solid`
    }
  }, active && /*#__PURE__*/_react.default.createElement("div", {
    className: 'aio-button-check-in' + (round ? ' round' : ''),
    style: {
      background: iconColor[1],
      width: iconSize[1],
      height: iconSize[1]
    }
  }));
}

class Option extends _react.Component {
  getCheckIcon(checked) {
    if (checked === undefined) {
      return '';
    }

    let {
      getProp,
      gap
    } = this.context;
    let {
      option,
      realIndex
    } = this.props;
    let props = {
      iconColor: getProp({
        option,
        index: realIndex,
        field: 'iconColor',
        def: undefined
      }),
      iconSize: getProp({
        option,
        index: realIndex,
        field: 'iconSize',
        def: undefined
      }),
      checkIcon: getProp({
        option,
        index: realIndex,
        field: 'checkIcon',
        def: undefined
      }),
      active: checked
    };
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(CheckIcon, props), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: gap
      }
    }));
  }

  render() {
    let {
      optionClick,
      onSwap,
      rtl,
      gap,
      getProp,
      dragStart,
      dragOver,
      drop
    } = this.context;
    let {
      option,
      realIndex,
      renderIndex
    } = this.props;
    let className = getProp({
      option,
      index: realIndex,
      field: 'className',
      def: ''
    });
    let disabled = getProp({
      option,
      index: realIndex,
      field: 'disabled',
      def: false
    });
    let style = getProp({
      option,
      index: realIndex,
      field: 'style',
      def: {},
      type: 'object'
    });
    var props = {
      className: `aio-button-list-item${className ? ' ' + className : ''}${disabled ? ' disabled' : ''}`,
      style,
      onClick: e => optionClick(option, e),
      title: '',
      datarenderindex: renderIndex,
      datarealindex: realIndex,
      tabIndex: 0
    };

    if (onSwap) {
      props.onDragStart = dragStart;
      props.onDragOver = dragOver;
      props.onDrop = drop;
      props.draggable = true;
    }

    let before = getProp({
      option,
      index: realIndex,
      field: 'before',
      def: undefined
    });
    let after = getProp({
      option,
      index: realIndex,
      field: 'after',
      def: undefined
    });
    let checked = getProp({
      option,
      index: realIndex,
      field: 'checked',
      def: undefined
    });
    let text = getProp({
      option,
      index: realIndex,
      field: 'text',
      def: undefined
    });
    let title = getProp({
      option,
      index: realIndex,
      field: 'title',
      def: ''
    });
    let subtext = getProp({
      option,
      index: realIndex,
      field: 'subtext',
      def: undefined
    });
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, option.splitter && /*#__PURE__*/_react.default.createElement("div", {
      className: 'aio-button-splitter ' + (rtl ? 'rtl' : 'ltr')
    }, option.splitter), /*#__PURE__*/_react.default.createElement("div", _extends({}, props, {
      title: title
    }), this.getCheckIcon(checked), before && /*#__PURE__*/_react.default.createElement(Before, {
      before: before,
      gap: gap
    }), /*#__PURE__*/_react.default.createElement(Text, {
      text: text,
      subtext: subtext
    }), after && /*#__PURE__*/_react.default.createElement(After, {
      after: after,
      gap: gap
    })));
  }

}

_defineProperty(Option, "contextType", aioButtonContext);