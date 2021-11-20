import React,{Component,Fragment,createRef,createContext} from 'react';
import $ from 'jquery'
import './index.css';
export default class RDButton extends Component{
  getMultiselectValues(){
    let {values} = this.props,Values = [];
    if(Array.isArray(values)){this.multiSelectType = 'array'; Values = values;}
    else if(typeof values === 'object'){
      this.multiSelectType = 'object';
      for(let prop in values){if(values[prop] === true){Values.push(prop);}}
    }
    else {
      console.error('values must be array or object');
      return [];
    }
    return Values;
  }
  getMultiselectOptions(Values){
    let {options = [],selectAll,editOptionText = (value)=>value} = this.props;
    this.checks = [];
    let Options = options.map((o)=>{
      o.checked = Values.indexOf(o.value) !== -1;
      if(o.checked){this.checks.push(o)}      
      return {...o,text:editOptionText(o.text)}
    })
    if(selectAll){
      let text = editOptionText(options.length === Values.length?'Remove All':'Select All');
      Options.splice(0,0,{text,value:'multiselect_selectAll',close:false})
    }
    return Options;
  }
  RenderMultiselect(){
    let {options = [],onChange,values,showTags} = this.props;
    let Values = this.getMultiselectValues();
    let Options = this.getMultiselectOptions(Values);
    return (
      <RDropdownButton
        popupWidth={'fit'} 
        caret={true} 
        {...this.props}
        type={'multiselect'}
        popOver={false}
        items={Options}
        checks={this.checks}
        onClick={({value})=>{
          let list,type;
          if(value === 'multiselect_selectAll'){
            list = options.length === Values.length?[]:options.map((o)=>o.value);  
          }
          else {
            let index = Values.indexOf(value);
            if(index !== -1){
              list = Values.filter((o,i)=>i !== index);
              type = 'remove'
            }
            else{
              list = Values.concat(value); 
              type = 'add'
            }
          }
          if(this.multiSelectType === 'array'){onChange(list,value,type)}
          else {
            let obj = {};
            for(let prop in values){obj[prop] = list.indexOf(prop) !== -1;}
            onChange(obj)
          } 
        }}
      />
    )
  }
  getSelectText(){
    let {options,value,text} = this.props;
    if(text === false){return ''}
    if(text !== undefined){return text}
    if(this.text && this.value === value){return this.text;}
    else{
        let option = options.filter((o)=>o.value === value)[0];
        if(!option){
          if(!options[0]){
            this.text = '';
            this.value = undefined;
            return '';
          }
          else{
            this.text = options[0].text;
            this.value = options[0].value;
            return options[0].text;
          }
        }
        else {
          this.text = option.text;
          this.value = option.value;
          return option.text;
        }
    }
  }
  RenderSelect(){
    let {options = [],onChange=()=>{}} = this.props;
    return (
      <RDropdownButton
        text={this.getSelectText()} 
        caret={true}
        {...this.props}
        popOver={false}
        items={options}
        onClick={(obj)=>{
          this.text = obj.text;
          this.value = obj.value;
          onChange(obj.value,obj)
        }}
      />
    )
  }
  render(){
    let {type} = this.props;
    if(type === 'select'){return this.RenderSelect()}
    if(type === 'multiselect'){return this.RenderMultiselect()}
    return <RDropdownButton {...this.props}/>;
  }
}
const dpContext = createContext();
class RDropdownButton extends Component {
    constructor(props){
      super(props);
      this.state = {open:this.props.open || false}
      this.dom = createRef();
      this.touch = 'ontouchstart' in document.documentElement;
    }
    toggle(state = !this.state.open,isBackdrop){
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(()=>{
        if(state === this.state.open){return}
        this.setState({open:state});
        if(state){$('body').addClass('rdb-open');}
        else{$('body').removeClass('rdb-open');}
        var {onBackdropClick,onToggle} = this.props;
        if(onBackdropClick && isBackdrop){onBackdropClick(this.props)}
        if(onToggle){onToggle(state)}
      },100)
    }
    getValue(value){return typeof value === 'function' ? value(this.props):value;}
    click(e){
      if($(e.target).parents('.rdb-checkeds').length !== 0){return;}
      var {items,popOver,onClick = ()=>{}} = this.props;
      if(items || popOver){this.toggle(true);}
      else{onClick(this.props);}
    }
    showPopup(){
      var {items,popOver} = this.props,{open} = this.state;
      if(!open){return false;}
      if(popOver){return true;}
      if(items !== undefined){return true;}
      return false
    }
    getBadge(){
      let {badge,badgeStyle} = this.props;
      if(badge === undefined){return null;}
      return <div className='rdb-badge' style={badgeStyle}>{badge}</div>
    }
    getHoverEnabled(){
      if(this.touch){return false}
      return this.getValue(this.props.hover);
    }
    itemClick(item,e){
      if($(e.target).parents('.rdb-list-item-after').length !== 0){return;}
      var {onClick} = this.props;
      if(item._disabled){return;}
      if(item.onClick){item.onClick(item);}
      else if(onClick){onClick(item);} 
      if(item.close !== false && item._checked === undefined ){this.toggle();}
    }
    getCaret(){
      var {items,caret,caretStyle} = this.props;
      if(!items || !caret){return '';}
      if(caret === true){
        return (<><div style={{flex:1}}></div><div className='rdb-caret' style={caretStyle}></div></>);
      }
      return (<><div style={{flex:1}}></div>{caret}</>)
    }
    getAfter(){
      let {after} = this.props;
      if(after === undefined){return null}
      return (<><div style={{flex:1}}></div>{after}</>)
    }
    render(){
        let {type,before = null,text = null,checks} = this.props;
        var id = this.getValue(this.props.id);
        var disabled = this.getValue(this.props.disabled);
        var title = this.getValue(this.props.title);
        var className = this.getValue(this.props.className); 
        var rtl = this.getValue(this.props.rtl); 
        var style = this.getValue(this.props.style); 
        var hover = this.getHoverEnabled();
        
        var {onClick=()=>{}} = this.props;
        var contextValue = {...this.props};
        contextValue.toggle = this.toggle.bind(this);
        contextValue.SetState = (obj)=>this.setState(obj);
        contextValue.getValue = this.getValue.bind(this);
        contextValue.itemClick = this.itemClick.bind(this);
        contextValue.hover = hover
        var props = {
          id,
          className:`r-dropdown-button ${rtl?'rtl':'ltr'}${className?' ' + className:''}`,
          style:$.extend({},{direction:rtl?'rtl':'ltr'},this.getValue(style)),
          disabled,title,
          ref:this.dom,
          onClick:this.click.bind(this),
          onMouseEnter:hover?()=>this.toggle(true):undefined,
          onMouseLeave:hover?()=>this.toggle(false):undefined,
          tabIndex:0
        }
        let button = (
          <button {...props}>{before} {text} {this.getCaret()} {this.getAfter()} {this.getBadge()}</button>
        )
        return (
          <dpContext.Provider value={contextValue}>
              {
                type === 'multiselect' &&
                <div className='rdb-multiselect' style={{width:props.style.width}}>
                  {button}
                  {
                    checks.length !== 0 &&
                    <div className={'rdb-checkeds' + (rtl?' rtl':'')}>
                      {
                        checks.map((check)=>{return (
                          <div className='rdb-checked' onClick={()=>onClick(check)}>
                            <div className='rdb-checked-close'></div>
                            <div className='rdb-checked-text'>{check.text}</div>
                          </div>
                        )})}
                    </div>
                  }
                </div>
                
              }
              {type !== 'multiselect' && button}
              {this.showPopup() && <Popup ref={this.popup}/>}
          </dpContext.Provider>
        );
    }    
}
RDropdownButton.defaultProps = {
  getOptionText:()=>{},
  getOptionChecked:()=>{},
  getOptionBefore:()=>{},
  getOptionAfter:()=>{},
  getOptionDisabled:()=>{},
  getOptionClassName:()=>{},
  getOptionStyle:()=>{},
  getOptionId:()=>{},
  getOptionShow:()=>{},
  getOptionHref:()=>{},
  getOptionTitle:()=>{},
}
class Popup extends Component{
  static contextType = dpContext;
  constructor(props){
    super(props);
    this.dom = createRef();
    this.activeIndex = false;
    this.state = {searchValue:''};
  }
  getLimit(dom){
    var offset = dom.offset();
    var left = offset.left - window.pageXOffset;
    var top = offset.top - window.pageYOffset;
    var width = dom.outerWidth();
    var height = dom.outerHeight();
    var right = left + width;
    var bottom = top + height;
    return {left,top,right,bottom,width,height};
  }
  update(){
    var {rtl,openRelatedTo,animate,dropdownType,type,popupWidth} = this.context;
    var popup = $(this.dom.current);
    var button = type === 'multiselect'?popup.prev().find('.r-dropdown-button'):popup.prev();
    var parent = openRelatedTo?popup.parents(openRelatedTo):undefined;
    parent = Array.isArray(parent) && parent.length === 0?undefined:parent;
    var bodyWidth = window.innerWidth;
    var bodyHeight = window.innerHeight;
    var parentLimit = parent?this.getLimit(parent):{left:0,top:0,right:bodyWidth,bottom:bodyHeight};
    if(parentLimit.left < 0){parentLimit.left = 0;}
    if(parentLimit.right > bodyWidth){parentLimit.right = bodyWidth;}
    if(parentLimit.top < 0){parentLimit.top = 0;}
    if(parentLimit.bottom > bodyHeight){parentLimit.bottom = bodyHeight;}
    
    var buttonLimit = this.getLimit(button);
    var popupLimit = this.getLimit(popup); 
    var left,right,top,bottom,style = {};
    top = buttonLimit.bottom;
    bottom = top + popupLimit.height;  
    if(dropdownType !== 'center'){
      if(popupWidth === 'fit'){
        style.left = buttonLimit.left;
        style.width = buttonLimit.width;
      }
      else if(rtl){
        right = buttonLimit.right;
        left = right - popupLimit.width;
        if(left < parentLimit.left){style.left = parentLimit.left;}
        else{style.left = left;}
      }
      else{
        left = buttonLimit.left; 
        right = left + popupLimit.width;
        if(right > parentLimit.right){style.left = parentLimit.right - popupLimit.width;}
        else{style.left = left}
      }
      if(bottom > parentLimit.bottom){
        if(popupLimit.height > buttonLimit.top - parentLimit.top){style.top = parentLimit.bottom - popupLimit.height;}  
        else{style.top = buttonLimit.top - popupLimit.height;}
      }
      else{
        style.top = buttonLimit.bottom;
      }
    }
    if(animate){
      popup.css({...style,opacity:0,top:style.top + 60})
      popup.animate({top:style.top,opacity:1},{duration:150})
    }
    else{
      popup.css(style)
    }
    popup.focus();
    $('body').addClass('rdb-open');
  }
  componentDidMount(){
    this.update();
  }
  getStyle(){
    var {rtl,dropdownType} = this.context;
    let style = {
      direction:rtl?'rtl':'ltr'
    }
    if(dropdownType === 'center'){
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
  getBackDropStyle(){
    var {backdropStyle} = this.context;
    return {height:'100%',width:'100%',right:0,top:0,position:'fixed',background:'rgba(0,0,0,0)',...backdropStyle}
  }
  keyDown(e){
    console.log(e.keyCode);
    if(e.keyCode === 40){
      e.preventDefault();
      var items = $(this.dom.current).find('.rdb-list-item')
      var active = items.filter('.active');
      if(active.length === 0){
        this.activeIndex = 0;
        items.eq(0).addClass('active');
      }
      else{
        let index = active.attr('dataindex');
        index++;
        if(index >= items.length){
          index = 0;
        }
        items.removeClass('active');
        this.activeIndex = index;
        items.eq(index).addClass('active').focus();
      }
    }
    else if(e.keyCode === 38){
      e.preventDefault();
      var items = $(this.dom.current).find('.rdb-list-item')
      var active = items.filter('.active');
      if(active.length === 0){
        this.activeIndex = items.length - 1;
        items.eq(items.length - 1).addClass('active');
      }
      else{
        let index = active.attr('dataindex');
        index--;
        if(index < 0){index = items.length - 1;}
        items.removeClass('active');
        this.activeIndex = index;
        items.eq(index).addClass('active').focus();
      }
    }
    else if(e.keyCode === 13){
      let {itemClick} = this.context;
      if(this.activeIndex !== false){
        itemClick(this.items[this.activeIndex],e);
      }
    }
    else if(e.keyCode === 27){
      let {toggle} = this.context;
      toggle();
    }
  }
  getOptions(){
    let {
      items,getOptionText,getOptionDisabled,getOptionBefore,getOptionAfter,getOptionChecked,getOptionClassName,
      getOptionStyle,getOptionId,getOptionShow,getOptionHref,getOptionTitle} = this.context,{searchValue} = this.state;
    let filteredItems = items.filter((item,i)=>{
      let {
        text = getOptionText(item,i),
        disabled = getOptionDisabled(item,i),
        before = getOptionBefore(item,i),
        after = getOptionAfter(item,i),
        checked = getOptionChecked(item,i),
        className = getOptionClassName(item,i),
        style = getOptionStyle(item,i),
        id = getOptionId(item,i),
        show = getOptionShow(item,i),
        href = getOptionHref(item,i),
        title = getOptionTitle(item,i)
      } = item;
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
      if(show === false){return false}
      if(!searchValue){return true;}
      if(text === undefined){return false;}
      return text.indexOf(searchValue) !== -1
    });
    this.items = filteredItems;
    return filteredItems.map((item, i)=><ListItem key={i} item={item} index={i}/>)
  }
  getSearchBox(){
    var {search,placeHolder} = this.context;
    if(!search){return null}
    let {searchValue} = this.state;
    return (
      <div className='rdb-search'>
        <div className={'rdb-search-icon' + (searchValue?' rdb-search-icon-filled':'')} onClick={()=>{this.setState({searchValue:''})}}></div>
        <input 
          type='text' value={searchValue} placeholder={placeHolder} 
          onChange={(e)=>this.setState({searchValue:e.target.value})}
        />
      </div>
    )
  }
  getClassName(){
    let {popupClassName,rtl} = this.context;
    let className = 'rdb-popup-container';
    className += rtl?' rtl':' ltr';
    if(popupClassName){className += ' ' + popupClassName}
    return className;
  }
  render(){
    var {toggle,getValue,hover,popupWidth,popOver} = this.context;
    var popupStyle = getValue(this.context.popupStyle);
    var PopOver = typeof popOver === 'function'?popOver(this.context):popOver;
    return(
      <div 
        className={this.getClassName()} ref={this.dom} style={this.getStyle()} 
        onMouseEnter={()=>{if(hover){toggle(true)}}} 
        onMouseLeave={()=>{if(hover){toggle(false)}}} 
        onKeyDown={this.keyDown.bind(this)} 
      tabIndex={0}>
        {!hover && <div className='rdb-backdrop' onClick={()=>toggle(false,true)} style={this.getBackDropStyle()}></div>} 
        <div className="rdb-popup" style={{width:popupWidth === 'fit'?undefined:popupWidth,...popupStyle}}>
          {this.getSearchBox()}
          <div className='rdb-items'>{PopOver || this.getOptions()}</div>     
        </div>
      </div>
    );
  }
}
class ListItem extends Component{
  static contextType = dpContext;
  
  render(){
    var {itemClick,gap = 8,rtl} = this.context;
    let {item,index} = this.props; 
    var Text = <div className='rdb-text' title={item._title || item._text}>{item._text}</div>;  
    var CheckIcon = item._checked !== undefined?(
      <Fragment>
        <div className={'rdb-check-icon' + (item._checked?' checked':'')}></div>
        <div className='rdb-gap' style={{width:gap}}></div>
      </Fragment>
    ):null;
    var props = {
      className:`rdb-list-item${item._className?' ' + item._className:''}${item._disabled?' disabled':''}`,
      style:item._style,onClick:(e)=>itemClick(item,e),title:'',dataindex:index,tabIndex:0
    }
    return(
      <Fragment>
        {item.splitter &&<div className={'rdb-splitter ' + (rtl?'rtl':'ltr')}>{item.splitter}</div>}
        {item._href?<a href={item._href} {...props}>{item._before}{Text}{item._after}</a>:<div {...props}>{CheckIcon}{item._before}{Text}{item._after}</div>}
      </Fragment>
    );
  }
}