import React,{Component,createRef,createContext} from 'react';
import $ from 'jquery'
import './index.css';
export default class AIOButton extends Component{
  getMultiselectDetails(){
    let {options = [],values,selectAll,editOptionText = (value)=>value} = this.props;
    let type,Values = [],checks = [];
    if(Array.isArray(values)){type = 'array'; Values = values;}
    else if(typeof values === 'object'){
      type = 'object';
      for(let prop in values){if(values[prop] === true){Values.push(prop);}}
    }
    else {console.error('values must be array or object');}
    let Options = options.map((o)=>{
      o.checked = Values.indexOf(o.value) !== -1;
      if(o.checked){checks.push(o)}      
      return {...o,text:editOptionText(o.text)}
    })
    if(selectAll){
      let text = editOptionText(options.length === Values.length?'Remove All':'Select All');
      Options.splice(0,0,{text,value:'multiselect_selectAll',close:false})
    }
    return {type,options:Options,checks,values:Values}
  }
  Render_multiselect(){
    let details = this.getMultiselectDetails();
    let {options = [],onChange,values,popOver} = this.props;
    return (
      <AIOButtonBase
        popupWidth={popOver?undefined:'fit'} 
        caret={true} 
        {...this.props}
        type={'multiselect'}
        items={details.options}
        checks={details.checks}
        onClick={({value})=>{
          let list,type;
          if(value === 'multiselect_selectAll'){
            list = options.length === details.values.length?[]:options.map((o)=>o.value);  
          }
          else {
            let index = details.values.indexOf(value);
            if(index !== -1){
              list = details.values.filter((o,i)=>i !== index);
              type = 'remove'
            }
            else{
              list = details.values.concat(value); 
              type = 'add'
            }
          }
          if(details.type === 'array'){onChange(list,value,type)}
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
  Render_select(){
    let {options = [],onChange=()=>{}} = this.props;
    return (
      <AIOButtonBase
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
  Render_button(){
    let {popOver} = this.props;
    return <AIOButtonBase caret={popOver?true:false} {...this.props}/>;
  }
  render(){
    let {type = 'button'} = this.props;
    return this[`Render_${type}`]()
  }
}
const dpContext = createContext();
class AIOButtonBase extends Component {
    constructor(props){
      super(props);
      this.fn = new AIOBTNFN(
        ()=>this.props,
        ()=>this.state,
        (obj)=>{this.setState(obj)}
      )
      this.state = {open:this.props.open || false,touch:'ontouchstart' in document.documentElement}
      this.dom = createRef();
    }
    getValue(value){return typeof value === 'function' ? value(this.props):value;}
    mouseDown(e){
      if(!this.props.onSwipe){return;}
      this.canMove = false;
      this.firstMove = true;
      this.moved = false;
      this.coords = {x:e.clientX,y:e.clientY}
      $(window).bind('mousemove',$.proxy(this.mouseMove,this))
      $(window).bind('mouseup',$.proxy(this.mouseUp,this))
    }
    mouseMove(e){
      let offsetX = e.clientX - this.coords.x;
      let offsetY = this.coords.y - e.clientY;
      if(!this.canMove && Math.sqrt(Math.pow(offsetX,2) + Math.pow(offsetY,2)) < 7){return}
      if(this.firstMove){
        this.coords = {x:e.clientX,y:e.clientY}
        this.firstMove = false;
        return;
      }
      this.canMove = true;
      this.moved = true;
      let {onSwipe} = this.props;
      onSwipe(offsetX,offsetY)
    }
    mouseUp(){
      $(window).unbind('mousemove',this.mouseMove)
      $(window).unbind('mouseup',this.mouseUp)
      if(!this.moved){return}
      let {onSwipeEnd = ()=>{}} = this.props;
      onSwipeEnd();
    }
    getTags(checks = [],rtl,onClick){
      let {editTag = (text)=>text,showTag = true} = this.props;
      if(checks.length === 0 || !showTag){return ''}
      return (
        <div className={'aio-button-checkeds' + (rtl?' rtl':'')}>
          {
            checks.map((check,i)=>{
              let {color=[]} = check;
              return (
                <div key={i} className='aio-button-checked' onClick={()=>onClick(check)} style={{background:color[0],color:color[1]}}>
                  <div className='aio-button-checked-close'></div>
                  <div className='aio-button-checked-text'>{editTag(check.text)}</div>
                </div>
              )
            })}
        </div>
      )
    }
    render(){
        let {type,before,text,checks,onClick,id,disabled,title,className,rtl,style,hover,attrs} = this.fn.getProps()
        let {open} = this.state;
        var contextValue = {...this.props};
        contextValue.getValue = this.getValue.bind(this);
        contextValue.hover = hover;
        contextValue.fn = this.fn;
        var props = {
          ...attrs,
          id,
          className:`aio-button ${rtl?'rtl':'ltr'}${className?' ' + className:''}`,
          style:$.extend({},{direction:rtl?'rtl':'ltr'},this.getValue(style)),
          disabled,title,
          ref:this.dom,
          onClick:(e)=>this.fn.onClick(e),
          onMouseEnter:hover?()=>this.fn.toggle(true):undefined,
          onMouseLeave:hover?()=>this.fn.toggle(false):undefined,
          onMouseDown:this.mouseDown.bind(this),
          onTouchStart:this.mouseDown.bind(this),
          tabIndex:0
        }
        let button = (
          <button {...props}>{before} {text} {this.fn.getCaret('react')} {this.fn.getAfter('react')} {this.fn.getBadge('react')}</button>
        )
        return (
          <dpContext.Provider value={contextValue}>
              {
                type === 'multiselect' &&
                <div className='aio-button-multiselect' style={{width:props.style.width}}>
                  {button}
                  {this.getTags(checks,rtl,onClick)}
                </div>
              }
              {type !== 'multiselect' && button}
              {this.fn.showPopup(open) && <Popup ref={this.popup}/>}
          </dpContext.Provider>
        );
    }    
}
class Popup extends Component{
  static contextType = dpContext;
  constructor(props){
    super(props);
    this.dom = createRef();
    this.state = {searchValue:''};
  }
  
  componentDidMount(){
    let {fn} = this.context; 
    fn.update($(this.dom.current));
  }
  
  getSearchBox(){
    var {search,placeHolder} = this.context;
    if(!search){return null}
    let {searchValue} = this.state;
    return (
      <div className='aio-button-search'>
        <div className={'aio-button-search-icon' + (searchValue?' aio-button-search-icon-filled':'')} onClick={()=>{this.setState({searchValue:''})}}></div>
        <input 
          type='text' value={searchValue} placeholder={placeHolder} 
          onChange={(e)=>this.setState({searchValue:e.target.value})}
        />
      </div>
    )
  }
  render(){
    var {getValue,hover,popupWidth,fn} = this.context;
    let {searchValue} = this.state;
    var popupStyle = getValue(this.context.popupStyle);
    return(
      <div 
        className={fn.getPopupClassName()} ref={this.dom} style={fn.getPopupStyle('react')} 
        onMouseEnter={()=>{if(hover){fn.toggle(true)}}} 
        onMouseLeave={()=>{if(hover){fn.toggle(false)}}} 
        onKeyDown={(e)=>fn.keyDown(e,$(this.dom.current))} 
      tabIndex={0}>
        {!hover && <div className='aio-button-backdrop' onClick={()=>fn.toggle(false,true)} style={fn.getBackDropStyle('react')}></div>} 
        <div className="aio-button-popup" style={{width:popupWidth === 'fit'?undefined:popupWidth,...popupStyle}}>
          {this.getSearchBox()}
          <div className='aio-button-items'>{fn.getPopupContent(searchValue,'react')}</div>     
        </div>
      </div>
    );
  }
}
class ListItem extends Component{
  static contextType = dpContext;
  render(){
    var {fn,rtl} = this.context;
    let {item,index} = this.props; 
    var Text = <div className='aio-button-text' title={item._title || item._text}>{item._text}</div>;  
    var props = {
      className:`aio-button-list-item${item._className?' ' + item._className:''}${item._disabled?' disabled':''}`,
      style:item._style,onClick:(e)=>fn.itemClick(item,e),title:'',dataindex:index,tabIndex:0
    }
    return(
      <>
        {item.splitter &&<div className={'aio-button-splitter ' + (rtl?'rtl':'ltr')}>{item.splitter}</div>}
        <div {...props}>
          {fn.getCheckIcon(item,'react')}
          {item._before}
          {Text}
          {item._after}
        </div>
      </>
    );
  }
}

function AIOBTNFN(getProps,getState,setState){
  let $$ = {
    activeIndex:false,
    getCheckIcon(item,platform = 'react'){
      if(item._checked === undefined){return ''}
      let {gap = 8} = getProps();
      if(platform === 'react'){
        return (
          <>
            <div className={'aio-button-check-icon' + (item._checked?' checked':'')}></div>
            <div className='aio-button-gap' style={{width:gap}}></div>
          </>
        );
      }
      if(platform === 'jquery'){
        return (`
          <div class='aio-button-check-icon${item._checked?' checked':''}'></div>
          <div class='aio-button-gap' style='width:${gap}px;'></div>
        `);
      }
    },
    getLimit(dom){
      var offset = dom.offset();
      var left = offset.left - window.pageXOffset;
      var top = offset.top - window.pageYOffset;
      var width = dom.outerWidth();
      var height = dom.outerHeight();
      var right = left + width;
      var bottom = top + height;
      return {left,top,right,bottom,width,height};
    },
    update(popup){
      var {rtl,openRelatedTo,animate,dropdownType,type,popupWidth} = getProps();
      var button = type === 'multiselect'?popup.prev().find('.aio-button'):popup.prev();
      var parent = openRelatedTo?popup.parents(openRelatedTo):undefined;
      parent = Array.isArray(parent) && parent.length === 0?undefined:parent;
      var bodyWidth = window.innerWidth;
      var bodyHeight = window.innerHeight;
      var parentLimit = parent?$$.getLimit(parent):{left:0,top:0,right:bodyWidth,bottom:bodyHeight};
      if(parentLimit.left < 0){parentLimit.left = 0;}
      if(parentLimit.right > bodyWidth){parentLimit.right = bodyWidth;}
      if(parentLimit.top < 0){parentLimit.top = 0;}
      if(parentLimit.bottom > bodyHeight){parentLimit.bottom = bodyHeight;}
      
      var buttonLimit = $$.getLimit(button);
      var popupLimit = $$.getLimit(popup); 
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
      $('body').addClass('aio-button-open');
    },
    getOptions(items,searchValue){
      let {
        getOptionText = ()=>{},
        getOptionDisabled = ()=>{},
        getOptionBefore = ()=>{},
        getOptionAfter = ()=>{},
        getOptionChecked = ()=>{},
        getOptionClassName = ()=>{},
        getOptionStyle = ()=>{},
        getOptionId = ()=>{},
        getOptionShow = ()=>{},
        getOptionHref = ()=>{},
        getOptionTitle = ()=>{}
      } = getProps();
      return items.filter((item,i)=>{
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
    },
    getPopupClassName(){
      let {popupClassName,rtl} = getProps();
      let className = 'aio-button-popup-container';
      className += rtl?' rtl':' ltr';
      if(popupClassName){className += ' ' + popupClassName}
      return className;
    },
    getPopupStyle(platform = 'react'){
      var {rtl,dropdownType} = getProps();
      if(platform === 'react'){
        let style = {direction:rtl?'rtl':'ltr'}
        if(dropdownType === 'center'){
            style = {...style,left:0,top:0,width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}
        }
        return style;
      }
      if(platform === 'jquery'){
        let style = `direction:${rtl?'rtl':'ltr'};`;
        if(dropdownType === 'center'){
            style += `left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;`;
        }
        return style;
      }
    },
    getBackDropStyle(platform = 'react'){
      var {backdropStyle} = getProps();
      if(platform === 'react'){
        return {height:'100%',width:'100%',right:0,top:0,position:'fixed',background:'rgba(0,0,0,0)',...backdropStyle}
      }
      if(platform === 'jquery'){
        return `height:100%;width:100%;right:0;top:0;position:fixed;background:rgba(0,0,0,0);${backdropStyle}`
      } 
    },
    toggle(state,isBackdrop){
      let {open} = getState();
      if(state === undefined){state = !open}
      clearTimeout($$.timeOut);
      $$.timeOut = setTimeout(()=>{
        if(state === open){return}
        setState({open:state});
        if(state){$('body').addClass('aio-button-open');}
        else{$('body').removeClass('aio-button-open');}
        var {onBackdropClick,onToggle} = getProps();
        if(onBackdropClick && isBackdrop){onBackdropClick(getProps())}
        if(onToggle){onToggle(state)}
      },100)
    },
    itemClick(item,e){
      var {onClick} = getProps();
      if(item._disabled){return;}
      if(item.onClick){item.onClick(item);}
      else if(onClick){onClick(item);} 
      if(item.close !== false && item._checked === undefined ){$$.toggle();}
    },
    keyDown(e,dom){
      if(e.keyCode === 40){
        e.preventDefault();
        var items = dom.find('.aio-button-list-item')
        var active = items.filter('.active');
        if(active.length === 0){
          $$.activeIndex = 0;
          items.eq(0).addClass('active');
        }
        else{
          let index = active.attr('dataindex');
          index++;
          if(index >= items.length){
            index = 0;
          }
          items.removeClass('active');
          $$.activeIndex = index;
          items.eq(index).addClass('active').focus();
        }
      }
      else if(e.keyCode === 38){
        e.preventDefault();
        var items = dom.find('.aio-button-list-item')
        var active = items.filter('.active');
        if(active.length === 0){
          $$.activeIndex = items.length - 1;
          items.eq(items.length - 1).addClass('active');
        }
        else{
          let index = active.attr('dataindex');
          index--;
          if(index < 0){index = items.length - 1;}
          items.removeClass('active');
          $$.activeIndex = index;
          items.eq(index).addClass('active').focus();
        }
      }
      else if(e.keyCode === 13){
        if($$.activeIndex !== false){
          $$.itemClick($$.items[$$.activeIndex],e);
        }
      }
      else if(e.keyCode === 27){
        $$.toggle();
      }
    },
    getPopupContent(searchValue,platform = 'react'){
      let {items,popOver} = getProps();
      if(popOver){return typeof popOver === 'function'?popOver(getProps()):popOver}
      $$.items = $$.getOptions(items,searchValue);
      if(platform === 'react'){
        return $$.items.map((item, i)=><ListItem key={i} item={item} index={i}/>)
      }
      if(platform === 'jquery'){
        return $$.items.map((item, i)=>{
          return ListItem({item,index:i})
        }).join(' ');
      }
    },
    getCaret(platform = 'react'){
      var {caret,caretStyle} = getProps();
      if(caret === false){return '';}
      let cls = 'aio-button-caret';
      if(caret === true){
        if(platform === 'react'){
          return (<><div style={{flex:1}}></div><div className={cls} style={caretStyle}></div></>);
        }
        if(platform === 'jquery'){
          return `<div style='flex:1;'></div><div class='${cls}' style='${caretStyle}'></div>`;
        }
      }
      if(platform === 'react'){return (<><div style={{flex:1}}></div>{caret}</>)}
      if(platform === 'jquery'){return `<div style='flex:1;'></div>${caret}`}
    },
    getAfter(platform){
      let {after} = getProps();
      if(after === undefined){return ''}
      if(platform === 'react'){
        return (<><div style={{flex:1}}></div>{after}</>)
      }
      if(platform === 'jquery'){
        return `<div style='flex:1;'></div>${after}`
      }
    },
    onClick(e){
      if($(e.target).parents('.aio-button-checkeds').length !== 0){return;}
      var {items,popOver,onClick = ()=>{}} = getProps();
      if(items || popOver){$$.toggle(true);}
      else{onClick(getProps());}
    },
    showPopup(open){
      var {items,popOver} = getProps();
      if(!open){return false;}
      if(popOver){return true;}
      if(items !== undefined){return true;}
      return false
    },
    getBadge(platform = 'react'){
      let {badge,badgeStyle} = getProps();
      if(badge === undefined){return '';}
      if(platform === 'react'){
        return <div className='aio-button-badge' style={badgeStyle}>{badge}</div>
      }
      if(platform === 'jquery'){
        return `<div class='aio-button-badge' style='${badgeStyle}'>${badge}</div>`
      }
    },
    getHoverEnabled(){
      let {touch} = getState();
      if(touch){return false}
      let {hover} = getProps();  
      return typeof hover === 'function'?hover(getProps()):hover;
    },
    getValue(value){return typeof value === 'function' ? value(getProps()):value;},
    getProps(){
      let props = getProps();
      let {type,before = '',text = '',checks,onClick=()=>{}} = props;
      var id = $$.getValue(props.id);
      var disabled = $$.getValue(props.disabled);
      var title = $$.getValue(props.title);
      var className = $$.getValue(props.className); 
      var rtl = $$.getValue(props.rtl); 
      var style = $$.getValue(props.style); 
      var hover = $$.getHoverEnabled();
      return {type,before,text,checks,onClick,id,disabled,title,className,rtl,style,hover};
    }
  }
  return {
    getLimit:$$.getLimit,
    update:$$.update,
    getOptions:$$.getOptions,
    getPopupClassName:$$.getPopupClassName,
    getPopupStyle:$$.getPopupStyle,
    getBackDropStyle:$$.getBackDropStyle,
    toggle:$$.toggle,
    keyDown:$$.keyDown,
    itemClick:$$.itemClick,
    getCaret:$$.getCaret,
    getAfter:$$.getAfter,
    onClick:$$.onClick,
    showPopup:$$.showPopup,
    getPopupContent:$$.getPopupContent,
    getBadge:$$.getBadge,
    getProps:$$.getProps,
    getHoverEnabled:$$.getHoverEnabled,
    getCheckIcon:$$.getCheckIcon,
  }
}