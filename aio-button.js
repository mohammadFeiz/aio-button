import React,{Component,createRef,Fragment} from 'react';
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
    let {options = [],onChange,values} = this.props;
    return (
      <AIOButtonBase
        popupWidth={'fit'} 
        caret={true} 
        {...this.props}
        type={'multiselect'}
        popOver={false}
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
  Render_radio(){
    return <RRadioButton {...this.props}/>
  }
  render(){
    let {type = 'button'} = this.props;
    return this[`Render_${type}`]()
  }
}
class RRadioButton extends Component {
  getStyle(){
    var {justify,style = {}} = this.props;
    var Style = {};
    if(justify){
      Style.justifyContent ='center';
    }
    return {...Style,...style};
  }
  getOptionStyle(style = {}){
    var {optionStyle = {},optionWidth} = this.props;
    return {width:optionWidth || '100%',...optionStyle,...style}
  }
  getColor(color){
    let Color = color || [];
    if(!Array.isArray(Color)){Color = [Color]}
    let [outerColor,innerColor = outerColor] = Color;
    return [outerColor,innerColor]
  }
  getOuterStyle(color,{round = true,size = []}){
    let [outer = 16,inner = 12,stroke = 2] = size;
    var style = {color:color[0],width:outer,height:outer,border:`${stroke}px solid`}
    if(round === false){style.borderRadius = 0;}
    return style;
  }
  getInnerIconStyle(color,{round = true,size = []}){
    let [outer = 16,inner = 12,stroke = 2] = size;
    let style = {background:color[1],width:inner,height:inner}
    if(round === false){style.borderRadius = 0;}
    return style;
  }
  getIcon(active,i,option){
    let icon = option.icon || this.props.icon || {}
    let color = this.getColor(icon.color);
            
    if(active){
      if(icon.active){return icon.active}
      return (
        <div className={'r-radio-button-outer' + active} style={this.getOuterStyle(color,icon)}>
          <div className='r-radio-button-inner' style={this.getInnerIconStyle(color,icon)}></div>
        </div>
      )
    }
    else{
      if(icon.deactive){return icon.deactive}
      return (
        <div className={'r-radio-button-outer' + active} style={this.getOuterStyle(color,icon)}></div>
      )
    }
    
  }
  render(){
    var {id,className,gap = 6,options,value = true,onChange,rtl} = this.props;
    return (
      <div 
        className={'r-radio-button' + (rtl?' rtl':'') + (className?' ' + className:'')} 
        style={this.getStyle()}
        id={id}
      >
        {
          options.map((option,i)=>{
            let active = option.value === value ?' active':'';
            return (
              <Fragment key={i}>
                <div className={'r-radio-button-option' + active} title={option.title} onClick={()=>onChange(option.value,i)} style={this.getOptionStyle(option.style)}>
                  {this.getIcon(active,i,option)}
                  <div className='r-radio-button-gap' style={{width:gap}}></div>  
                  <div className='r-radio-button-text' style={option.style}>
                    <div className='r-radio-button-uptext' style={option.style}>
                      {option.text}
                    </div>
                    <div className='r-radio-button-subtext' style={option.style}>
                      {option.subtext}
                    </div>  
                  </div>
                </div>
              </Fragment>
            )
          })
        }
      </div>
    );
  }
}

class AIOButtonBase extends Component {
    constructor(props){
      super(props);
      this.fn = new AIOBTNFN(
        ()=>this.props,
        ()=>this.state,
        (obj)=>{this.setState(obj)}
      )
      this.state = {open:this.props.open || false,touch:'ontouchstart' in document.documentElement}
    }
    render(){
      let {open} = this.state;
      return this.fn.render.base(open)
    }    
}
class Popup extends Component{
  constructor(props){
    super(props);
    this.dom = createRef();
    this.state = {searchValue:''};
  }
  componentDidMount(){
    let {fn} = this.props; 
    fn.update($(this.dom.current));
  }
  render(){
    var {fn} = this.props;
    let {searchValue} = this.state;
    return fn.render.popup(searchValue,(obj)=>this.setState(obj),this.dom);
  }
}

function AIOBTNFN(getProps,getState,setState){
  let $$ = {
    activeIndex:false,
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
    getPopupContent(searchValue){
      let {items,popOver} = getProps();
      if(popOver){return typeof popOver === 'function'?popOver(getProps()):popOver}
      $$.items = $$.getOptions(items,searchValue);
      return $$.items.map((item, i)=>$$.render.listItem(item,i))
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
      return {...props,type,before,text,checks,onClick,id,disabled,title,className,rtl,style,hover};
    },
    getButtonConfig(){
      let {id,disabled,title,className,rtl,style,hover} = $$.getProps()
      return {
        id,
        className:`aio-button ${rtl?'rtl':'ltr'}${className?' ' + className:''}`,
        style:$.extend({},{direction:rtl?'rtl':'ltr'},$$.getValue(style)),
        disabled,title,
        onClick:(e)=>$$.onClick(e),
        onMouseEnter:hover?()=>$$.toggle(true):undefined,
        onMouseLeave:hover?()=>$$.toggle(false):undefined,
        tabIndex:0
      }
    },
    dragStart(e){
      let index = parseInt($(e.target).attr('dataindex'));
      $$.dragIndex = index;
    },
    dragOver(e){
      e.preventDefault();
    },
    swap(arr,from,to){
      let Arr = arr.map((o,i)=>{o._testswapindex = i; return o})
      let fromIndex = Arr[from]._testswapindex
      Arr.splice(to,0,{...Arr[from],_testswapindex:false})
      return Arr.filter((o)=>o._testswapindex !== fromIndex)
      
    },
    drop(e){
      e.stopPropagation();
      let {onSwap,options} = getProps();
      let from = $$.dragIndex;
      let dom = $(e.target);
      if(!dom.hasClass('aio-button-list-item')){
        dom = dom.parents('.aio-button-list-item');
      };
      if(!dom.hasClass('aio-button-list-item')){
        return
      };

      let to = parseInt(dom.attr('dataindex'));
      if(from === to){return}
      onSwap(from,to,$$.swap)
    }

  }
  $$.render = new AIOBTNrender($$);
  return {
    getLimit:$$.getLimit,
    update:$$.update,
    getOptions:$$.getOptions,
    getPopupClassName:$$.getPopupClassName,
    toggle:$$.toggle,
    keyDown:$$.keyDown,
    itemClick:$$.itemClick,
    onClick:$$.onClick,
    showPopup:$$.showPopup,
    getPopupContent:$$.getPopupContent,
    getProps:$$.getProps,
    getHoverEnabled:$$.getHoverEnabled,
    getValue:$$.getValue,
    render:$$.render
  }
}

function AIOBTNrender(actions){
  let $$ = {
    base(open){
      let {type} = actions.getProps()
      return (
        <>
            {type === 'multiselect' && $$.multiselect()}
            {type !== 'multiselect' && $$.button()}
            {actions.showPopup(open) && <Popup fn={actions}/>}
        </>
      );
    },
    caret(platform = 'react'){
      var {caret,caretStyle} = actions.getProps();
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
    after(platform = 'react'){
      let {after} = actions.getProps();
      if(after === undefined){return ''}
      if(platform === 'react'){
        return (<><div style={{flex:1}}></div>{after}</>)
      }
      if(platform === 'jquery'){
        return `<div style='flex:1;'></div>${after}`
      }
    },
    badge(platform = 'react'){
      let {badge,badgeStyle} = actions.getProps();
      if(badge === undefined){return '';}
      if(platform === 'react'){
        return <div className='aio-button-badge' style={badgeStyle}>{badge}</div>
      }
      if(platform === 'jquery'){
        return `<div class='aio-button-badge' style='${badgeStyle}'>${badge}</div>`
      }
    },
    button(){
      let {before,text} = actions.getProps()
      let config = actions.getButtonConfig();
      return (
        <button {...config}>{before} {text} {$$.caret('react')} {$$.after('react')} {$$.badge('react')}</button>
      )
    },
    multiselect(){
      let {rtl,style = {},onClick,checks} = actions.getProps()
      return (
        <div className='aio-button-multiselect' style={{width:style.width}}>
          {$$.button()}
          {
            checks.length !== 0 &&
            <div className={'aio-button-checkeds' + (rtl?' rtl':'')}>
              {
                checks.map((check,i)=>{return (
                  <div key={i} className='aio-button-checked' onClick={()=>onClick(check)}>
                    <div className='aio-button-checked-close'></div>
                    <div className='aio-button-checked-text'>{check.text}</div>
                  </div>
                )})}
            </div>
          }
        </div>
      )
    },
    searchBox(searchValue,onChange){
      var {search,placeHolder} = actions.getProps();
      if(!search){return ''}
      return (
        <div className='aio-button-search'>
          <div className={'aio-button-search-icon' + (searchValue?' aio-button-search-icon-filled':'')} onClick={()=>{onChange({searchValue:''})}}></div>
          <input 
            type='text' value={searchValue} placeholder={placeHolder} 
            onChange={(e)=>onChange({searchValue:e.target.value})}
          />
        </div>
      )
    },
    getPopupStyle(platform = 'react'){
      var {rtl,dropdownType} = actions.getProps();
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
      var {backdropStyle} = actions.getProps();
      if(platform === 'react'){
        return {height:'100%',width:'100%',right:0,top:0,position:'fixed',background:'rgba(0,0,0,0)',...backdropStyle}
      }
      if(platform === 'jquery'){
        return `height:100%;width:100%;right:0;top:0;position:fixed;background:rgba(0,0,0,0);${backdropStyle}`
      } 
    },
    
    popup(searchValue,onChange,ref){
      var {hover,popupWidth,popupStyle} = actions.getProps();
      var PopupStyle = actions.getValue(popupStyle);
      return(
        <div 
          className={actions.getPopupClassName()} ref={ref} style={$$.getPopupStyle()} 
          onMouseEnter={()=>{if(hover){actions.toggle(true)}}} 
          onMouseLeave={()=>{if(hover){actions.toggle(false)}}} 
          onKeyDown={(e)=>actions.keyDown(e,$(ref.current))} 
        tabIndex={0}>
          {!hover && <div className='aio-button-backdrop' onClick={()=>actions.toggle(false,true)} style={$$.getBackDropStyle()}></div>} 
          <div className="aio-button-popup" style={{width:popupWidth === 'fit'?undefined:popupWidth,...PopupStyle}}>
            {$$.searchBox(searchValue,(obj)=>onChange(obj))}
            <div className='aio-button-items'>{actions.getPopupContent(searchValue)}</div>     
          </div>
        </div>
      );
    },
    checkIcon(item){
      if(item._checked === undefined){return ''}
      let {gap = 8} = actions.getProps();
      return (
        <>
          <div className={'aio-button-check-icon' + (item._checked?' checked':'')}></div>
          <div className='aio-button-gap' style={{width:gap}}></div>
        </>
      );
    },
    listItem(item,index){
      var {rtl,onSwap} = actions.getProps();
      var Text = <div className='aio-button-text' title={item._title || item._text}>{item._text}</div>;  
      var props = {
        className:`aio-button-list-item${item._className?' ' + item._className:''}${item._disabled?' disabled':''}`,
        style:item._style,onClick:(e)=>actions.itemClick(item,e),title:'',dataindex:index,tabIndex:0,key:index,
        
      }
      if(onSwap){
        props.onDragStart = (e)=>actions.dragStart(e);
        props.onDragOver = (e)=>actions.dragOver(e);
        props.onDrop = (e)=>{actions.drop(e);}
        props.draggable = true;
      }
      return(
        <>
          {item.splitter &&<div className={'aio-button-splitter ' + (rtl?'rtl':'ltr')}>{item.splitter}</div>}
          <div {...props}>
            {$$.checkIcon(item)}
            {item._before}
            {Text}
            {item._after}
          </div>
        </>
      );
    }
  }
  return {
    base:$$.base,
    button:$$.button,
    multiselect:$$.multiselect,
    searchBox:$$.searchBox,
    popup:$$.popup,
    listItem:$$.listItem
  }
}