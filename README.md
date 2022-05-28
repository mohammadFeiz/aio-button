# aio-button
## Set option value
##### option.value(any)
```javascript
<AIOButton
  ...
  type='select'
  options={[
    {text:'Option1',value:'opt1'},
    {text:'Option2',value:'opt2'},
    {text:'Option3',value:'opt3'}
  ]}
  ...
/>  
```
##### valueField props(string)
```javascript
<AIOButton
  ...
  type='select'
  valueField='option.id'
  options={[
    {text:'Option1',id:'opt1'},
    {text:'Option2',id:'opt2'},
    {text:'Option3',id:'opt3'}
  ]}
  ...
/>  
```
##### valueField props(function)
```javascript
<AIOButton
  ...
  type='select'
  valueField={(option)=>option.id}
  options={[
    {text:'Option1',id:'opt1'},
    {text:'Option2',id:'opt2'},
    {text:'Option3',id:'opt3'}
  ]}
  ...
/>  
```

## Set option text
##### option.text(string)
```javascript
<AIOButton
  ...
  type='select'
  options={[
    {text:'Option1',value:'opt1'},
    {text:'Option2',value:'opt2'},
    {text:'Option3',value:'opt3'}
  ]}
  ...
/>  
```
##### textField props(string)
```javascript
<AIOButton
  ...
  type='select'
  textField='option.name'
  options={[
    {name:'Option1',value:'opt1'},
    {name:'Option2',value:'opt2'},
    {name:'Option3',value:'opt3'}
  ]}
  ...
/>  
```
##### textField props(function)
```javascript
<AIOButton
  ...
  type='select'
  textField={(option)=>{
    let {priority = 0} = option;
    if(priority < 5){
      return `${option.name} (low priority)`
    }
    if(priority < 7){
      return `${option.name} (medium priority)`
    }
    else{
      return `${option.name} (high priority)`
    }
  }}
  options={[
    {name:'Option1',value:'opt1',priority:10},
    {name:'Option2',value:'opt2',priority:6},
    {name:'Option3',value:'opt3',priority:2}
  ]}
  ...
/>  
```
## Set option className
##### option.className(string)
```javascript
<AIOButton
  ...
  type='select'
  options={[
    {text:'Option1',value:'opt1',className:'high-priority'},
    {text:'Option2',value:'opt2',className:'medium-priority'},
    {text:'Option3',value:'opt3',className:'low-priority'}
  ]}
  ...
/>  
```
##### classNameField props(string)
```javascript
<AIOButton
  ...
  type='select'
  classNameField='option.state + "-priority"'
  options={[
    {text:'Option1',value:'opt1',state:'low'},
    {text:'Option2',value:'opt2',state:'medium'},
    {text:'Option3',value:'opt3',state:'high'}
  ]}
  ...
/>  
```
##### classNameField props(function)
```javascript
<AIOButton
  ...
  type='select'
  classNameField={(option)=>{
    let {priority = 0} = option;
    if(priority < 5){return 'low-priority'}
    if(priority < 7){return 'medium-priority'}
    else{return 'high-priority'}
  }}
  options={[
    {text:'Option1',value:'opt1',priority:10},
    {text:'Option2',value:'opt2',priority:6},
    {text:'Option3',value:'opt3',priority:2}
  ]}
  ...
/>  
```

## Set option style
##### option.style(object)
```javascript
<AIOButton
  ...
  type='select'
  options={[
    {text:'Option1',value:'opt1',style:{color:'red'}},
    {text:'Option2',value:'opt2',style:{color:'orange'}},
    {text:'Option3',value:'opt3',style:{color:'yellow'}}
  ]}
  ...
/>  
```
##### styleField props(string)
```javascript
<AIOButton
  ...
  type='select'
  styleField='{color:option.color}'
  options={[
    {name:'Option1',value:'opt1',color:'red'},
    {name:'Option2',value:'opt2',color:'orange'},
    {name:'Option3',value:'opt3',color:'yellow'}
  ]}
  ...
/>  
```
##### styleField props(function)
```javascript
<AIOButton
  ...
  type='select'
  styleField={(option)=>{
    let {priority = 0} = option;
    if(priority < 5){return {color:'yellow'}}
    if(priority < 7){return {color:'orange'}}
    else{return {color:'red'}}
  }}
  options={[
    {name:'Option1',value:'opt1',priority:10},
    {name:'Option2',value:'opt2',priority:6},
    {name:'Option3',value:'opt3',priority:2}
  ]}
  ...
/>  
```


## Set option disabled
##### option.disabled(boolean)
```javascript
<AIOButton
  ...
  type='select'
  options={[
    {text:'Option1',value:'opt1'},
    {text:'Option2',value:'opt2',disabled:true},
    {text:'Option3',value:'opt3'}
  ]}
  ...
/>  
```
##### disabledField props(string)
```javascript
<AIOButton
  ...
  type='select'
  disabledField='option.priority < 5'
  options={[
    {text:'Option1',value:'opt1',priority:10},
    {text:'Option2',value:'opt2',priority:8},
    {text:'Option3',value:'opt3',priority:4}
  ]}
  ...
/>  
```
##### disabledField props(function)
```javascript
<AIOButton
  ...
  type='select'
  disabledField={()=>option.priority < 5}}
  options={[
    {text:'Option1',value:'opt1',priority:10},
    {text:'Option2',value:'opt2',priority:8},
    {text:'Option3',value:'opt3',priority:4}
  ]}
  ...
/>  
```

## Set option show
##### option.show(boolean)
```javascript
<AIOButton
  ...
  type='select'
  options={[
    {text:'Option1',value:'opt1'},
    {text:'Option2',value:'opt2',show:false},
    {text:'Option3',value:'opt3'}
  ]}
  ...
/>  
```
##### showField props(string)
```javascript
<AIOButton
  ...
  type='select'
  showField='option.priority > 5'
  options={[
    {text:'Option1',value:'opt1',priority:10},
    {text:'Option2',value:'opt2',priority:8},
    {text:'Option3',value:'opt3',priority:4}
  ]}
  ...
/>  
```
##### showField props(function)
```javascript
<AIOButton
  ...
  type='select'
  showField={()=>option.priority > 5}}
  options={[
    {text:'Option1',value:'opt1',priority:10},
    {text:'Option2',value:'opt2',priority:8},
    {text:'Option3',value:'opt3',priority:4}
  ]}
  ...
/>  
```
