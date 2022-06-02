# aio-button
## props
props         | Type                              | Default | Used in type                       | Description
------------- | --------------------------------- | ------- | ---------------------------------- | -----------
type          | 'button', 'select', 'multiselect', 'checkbox', 'radio', 'checklist' | required | all | component type
attrs         | object(attributes)                | -       | all                                | attributes(style,className,disabled,....)
show          | boolean                           | true    | all                                | visible or not
text          | any                               | -       | select,multiselect,button,checkbox | html as text
onChange      | function(value,option){void} | -       | select,multiselect,button,checkbox | onChange event
onClick       | function(){void} | -       | button | onClick event
before        | any                               | -       | select,multiselect,button          | before html
after         | any                               | -       | select,multiselect,button          | after html
badge         | number                            | -       | select,multiselect,button          | badge number
caret         | boolean or html/jsx               | true    | select,multiselect    | caret icon, true(default caret), false (without caret),html/jsx(custom caret)
caretAttrs    | object(attributes)                | true    | select,multiselect                 | default caret attributes(style,className,....)
badgeAttrs    | object(attributes)                | -       | select,multiselect,button          | badge attributes(style,className,disabled,....)
popupAttrs    | object(attributes)                | -       | select,multiselect                 | popup attributes(style,className,disabled,....)
poupWidth     | 'fit' or number                   | -       | select                             | popup width, 'fit' means popup width set to button width
poupOver      | function(props){return html}      | -       | button                             | open custom popup under button by clicking button
search        | boolean                           | true    | select,multiselect                 | search options
animate       | boolean or css object             | false   | select,multiselect                 | popup animation

## options prperties
Property      | Type                              | Default     | Used in type             | Description
------------- | --------------------------------- | ----------- | ------------------------ | -----------
value         | any                               | -           | select,multiselect,radio | option value
text          | any                               | -           | select,multiselect,radio | option text or html
subtext       | any                               | -           | select,multiselect,radio | option subtext
show          | boolean                           | true        | select,multiselect,radio | set option visible or not
attrs         | object attributes                 | -           | all                      | set option attributes (className,style,disabled,...)
before        | any                               | -           | select,multiselect       | set option before 
after         | any                               | -           | select,multiselect       | set option after
checked       | boolean                           | undefined   | select                   | set option checkbox
title         | string                            | option text | select,multiselect,radio | set option title(tooltip)
iconSize      | array of 3 numbers                | option text | select,multiselect,radio | set option check icon size([outer size,inner size,stroke width])
iconColor     | string or array of 2 color string | option text | select,multiselect,radio | set option check icon color (color or [outer color,inner color])
checkIcon     | html/jsx                          | default check icon | select,multiselect,radio | set option custom check icon
onClick       | function                          | -           | select                   | set option onClick(will prevent calling onChange by clicking on option)

- #### All of options properties can set in props 1 time instead of set on each option object.
- #### for example instead of value property in option object, you can set optionValue props (function or string) in root props of component
- #### for example (value => optionValue , text => optionText , disabled => optionDisabled)

## props for setting options properties
- #### these functions get option object and index of option as parameters and returns property value of options
Props               | Type                                           | Used in type             | Description
------------------- | ---------------------------------------------- | ------------------------ | -----------
optionValue         | function(option,index){return any}             | select,multiselect,radio | returns value of option
optionText          | function(option,index){return any}             | select,multiselect,radio | returns text or html of option
optionSubext        | function(option,index){return any}             | select,multiselect,radio | returns option subtext
optionDisabled      | function(option,index){return boolean}         | select,multiselect,radio | returns a boolean to set option disabled
optionShow          | function(option,index){return boolean}         | select,multiselect,radio | returns a boolean to set option visible or not
optionBefore        | function(option,index){return any}             | select,multiselect       | returns option before 
optionAfter         | function(option,index){return any}             | select,multiselect       | returns option after
optionChecked       | function(option,index){return boolean}         | select                   | returns a boolean for check or uncheck option
optionStyle         | function(option,index){return object}          | select,multiselect,radio | returns option css as object
optionClassName     | function(option,index){return string}          | select,multiselect,radio | returns option div className
optionTitle         | function(option,index){return string}          | select,multiselect,radio | returns option title(tooltip)
optionIconSize      | function(option,index){return array}           | select,multiselect,radio | returns option check icon size
optionIconColor     | function(option,index){return string or array} | select,multiselect,radio | returns option check icon color(s)
optionCheckedIcon   | function(option,index){return string}          | select,multiselect,radio | returns option custom checked icon
optionUncheckedIcon | function(option,index){return string}          | select,multiselect,radio | returns option custom unchecked icon 

- #### all of these props can get an string eval as shorthand that can read option object 
- #### for example optionText='option.name' returns name property of option object as option text
- #### for example optionShow='option.priority > 5' will set true for show property of options that have priority property greater than 5
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
  value='opt2'
  ...
/>  
```
##### optionValue props(function)
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
  value='opt2'
  ...
/>  
```

##### optionValue shorthand (string)
```javascript
<AIOButton
  ...
  type='select'
  optionValue='option.id'
  options={[
    {text:'Option1',id:'opt1'},
    {text:'Option2',id:'opt2'},
    {text:'Option3',id:'opt3'}
  ]}
  value='opt2'
  ...
/>  
```

## Set option text
##### option.text
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
##### optionsText props
```javascript
<AIOButton
  ...
  type='select'
  optionText={(option)=>{
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
  value='opt2'
  ...
/>  
```

##### optionText shorthand (string)
```javascript
<AIOButton
  ...
  type='select'
  optionText='option.name'
  options={[
    {name:'Option1',value:'opt1'},
    {name:'Option2',value:'opt2'},
    {name:'Option3',value:'opt3'}
  ]}
  value='opt2'
  ...
/>  
```
## Set option className
##### option.className (string)
```javascript
<AIOButton
  ...
  type='select'
  options={[
    {text:'Option1',value:'opt1',className:'high-priority'},
    {text:'Option2',value:'opt2',className:'medium-priority'},
    {text:'Option3',value:'opt3',className:'low-priority'}
  ]}
  value='opt2'
  ...
/>  
```
##### optionClassName props (function)
```javascript
<AIOButton
  ...
  type='select'
  optionClassName={(option)=>{
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
  value='opt2'
  ...
/>  
```

##### classNameField shorthand (string)
```javascript
<AIOButton
  ...
  type='select'
  optionClassName='option.state + "-priority"'
  options={[
    {text:'Option1',value:'opt1',state:'low'},
    {text:'Option2',value:'opt2',state:'medium'},
    {text:'Option3',value:'opt3',state:'high'}
  ]}
  value='opt2'
  ...
/>  
```

## Set option style
##### option.style (object)
```javascript
<AIOButton
  ...
  type='select'
  options={[
    {text:'Option1',value:'opt1',style:{color:'red'}},
    {text:'Option2',value:'opt2',style:{color:'orange'}},
    {text:'Option3',value:'opt3',style:{color:'yellow'}}
  ]}
  value='opt2'
  ...
/>  
```
##### optionStyle props (function)
```javascript
<AIOButton
  ...
  type='select'
  optionStyle={(option)=>{
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
  value='opt2'
  ...
/>  
```
##### optionStyle shorthand (string)
```javascript
<AIOButton
  ...
  type='select'
  optionStyle='{color:option.color}'
  options={[
    {name:'Option1',value:'opt1',color:'red'},
    {name:'Option2',value:'opt2',color:'orange'},
    {name:'Option3',value:'opt3',color:'yellow'}
  ]}
  value='opt2'
  ...
/>  
```
## Set option disabled
##### option.disabled (boolean)
```javascript
<AIOButton
  ...
  type='select'
  options={[
    {text:'Option1',value:'opt1'},
    {text:'Option2',value:'opt2',disabled:true},
    {text:'Option3',value:'opt3'}
  ]}
  value='opt2'
  ...
/>  
```
##### optionDisabled props (function)
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
  value='opt2'
  ...
/>  
```
##### optionDisabled shorthand (string)
```javascript
<AIOButton
  ...
  type='select'
  optionDisabled='option.priority < 5'
  options={[
    {text:'Option1',value:'opt1',priority:10},
    {text:'Option2',value:'opt2',priority:8},
    {text:'Option3',value:'opt3',priority:4}
  ]}
  value='opt2'
  ...
/>  
```
## Set option show
##### option.show (boolean)
```javascript
<AIOButton
  ...
  type='select'
  options={[
    {text:'Option1',value:'opt1'},
    {text:'Option2',value:'opt2',show:false},
    {text:'Option3',value:'opt3'}
  ]}
  value='opt2'
  ...
/>  
```
##### optionShow props(function)
```javascript
<AIOButton
  ...
  type='select'
  optionShow={()=>option.priority > 5}}
  options={[
    {text:'Option1',value:'opt1',priority:10},
    {text:'Option2',value:'opt2',priority:8},
    {text:'Option3',value:'opt3',priority:4}
  ]}
  value='opt2'
  ...
/>  
```
##### optionShow shorthand (string)
```javascript
<AIOButton
  ...
  type='select'
  optionShow='option.priority > 5'
  options={[
    {text:'Option1',value:'opt1',priority:10},
    {text:'Option2',value:'opt2',priority:8},
    {text:'Option3',value:'opt3',priority:4}
  ]}
  value='opt2'
  ...
/>  
```
## Set option checked
##### option.checked (boolean)
```javascript
<AIOButton
  type='select'
  text='Setting'
  options={[
    {text:'Option1',key:'opt1',checked:opt1},
    {text:'Option2',key:'opt2',checked:opt2},
    {text:'Option3',key:'opt3',checked:opt3}
  ]}
  value='opt2'
  onChange={(value,option)=>this.setState({[option.key]:!option.checked})}
/>    
```
##### optionChecked props (function)
```javascript
<AIOButton
  type='select'
  text='Setting'
  optionChecked={(option)=>this.state[option.key]}
  options={[
    {text:'Option1',key:'opt1'},
    {text:'Option2',key:'opt2'},
    {text:'Option3',key:'opt3'}
  ]}
  onChange={(value,option)=>this.setState({[option.key]:!this.state[option.key]})}
/>  
```
##### optionChecked shorthand (string)
```javascript
<AIOButton
  type='select'
  text='Setting'
  optionChecked='option.value'
  options={[
    {text:'Option1',value:opt1,key:'opt1'},
    {text:'Option2',value:opt2,key:'opt2'},
    {text:'Option3',value:opt3,key:'opt3'}
  ]}
  onChange={(value,option)=>this.setState({[option.key]:!value})}
/>    
```
## Set option before
##### option.before(boolean)
```javascript
<AIOButton
  type='select'
  className='button'
  options={[
    {text:'Option1',value:'opt1',before:<Icon path={mdiAccount} size={0.8}/>},
    {text:'Option2',value:'opt2',before:<Icon path={mdiTag} size={0.8}/>},
    {text:'Option3',value:'opt3',before:<Icon path={mdiAttachment} size={0.8}/>}
  ]}
  value={opt}
  onChange={(value)=>this.setState({opt:value})}
/>  
```
##### optionBefore props (function)
```javascript
<AIOButton
  type='select'
  className='button'
  optionBefore={(option)=>{
    if(option.type === 'account'){return <Icon path={mdiAccount} size={0.8}/>}
    if(option.type === 'tag'){return <Icon path={mdiTag} size={0.8}/>}
    if(option.type === 'attachment'){return <Icon path={mdiAttachment} size={0.8}/>}
  }}
  options={[
    {text:'Option1',value:'opt1',type:'account'},
    {text:'Option2',value:'opt2',type:'tag'},
    {text:'Option3',value:'opt3',type:'attachment'}
  ]}
  value={opt}
  onChange={(value)=>this.setState({opt:value})}
/>  
```
##### optionBefore shorthand (string)
```javascript
<AIOButton
  type='select'
  className='button'
  optionBefore='option.value + " - "'
  options={[
    {text:'Option1',value:'opt1'},
    {text:'Option2',value:'opt2'},
    {text:'Option3',value:'opt3'}
  ]}
  value={opt}
  onChange={(value)=>this.setState({opt:value})}
/> 
```
## Set option after
##### option.after (boolean)
```javascript
<AIOButton
  type='select'
  className='button'
  options={[
    {text:'Option1',value:'opt1',after:<div className='after'>account</div>},
    {text:'Option2',value:'opt2',after:<div className='after'>tag</div>},
    {text:'Option3',value:'opt3',after:<div className='after'>attachment</div>}
  ]}
  value={opt}
  onChange={(value)=>this.setState({opt:value})}
/>  
```
##### optionAfter props(function)
```javascript
<AIOButton
  type='select'
  open={true}
  className='button'
  optionAfter={(option)=>{ 
    return <div className='after'>{option.type}</div>
  }}
  options={[
    {text:'Option1',value:'opt1',type:'account'},
    {text:'Option2',value:'opt2',type:'tag'},
    {text:'Option3',value:'opt3',type:'attachment'}
  ]}
  value={opt}
  onChange={(value)=>this.setState({opt:value})}
/>    
```
##### optionAfter shorthand (string)
```javascript
<AIOButton
  type='select'
  className='button'
  optionAfter='" - " + option.value'
  options={[
    {text:'Option1',value:'opt1'},
    {text:'Option2',value:'opt2'},
    {text:'Option3',value:'opt3'}
  ]}
  value={opt}
  onChange={(value)=>this.setState({opt:value})}
/>   
```
