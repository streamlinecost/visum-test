(this.webpackJsonpadvanced=this.webpackJsonpadvanced||[]).push([[0],{30:function(t,e,a){t.exports=a(68)},67:function(t,e,a){},68:function(t,e,a){"use strict";a.r(e);var n=a(0),o=a.n(n),i=a(6),s=a.n(i),r=(a(35),a(3)),l=a(1);class u extends l.TaskModel{static get fields(){return[{name:"deadline",type:"date"}]}get isLate(){return this.deadline&&Date.now()>this.deadline}get status(){let t="Not started";return this.isCompleted?t="Completed":this.endDate<Date.now()?t="Late":this.isStarted&&(t="Started"),t}}class c extends l.Column{static get $name(){return"StatusColumn"}static get type(){return"statuscolumn"}static get isGanttColumn(){return!0}static get defaults(){return{field:"status",text:"Status",editor:!1,cellCls:"b-status-column-cell",htmlEncode:!1,filterable:{filterField:{type:"combo",items:["Not Started","Started","Completed","Late"]}}}}renderer({record:t}){const e=t.status;return e?{tag:"i",className:"b-fa b-fa-circle "+e,html:e}:""}}l.ColumnStore.registerColumnType(c);class d extends l.Toolbar{static get type(){return"gantttoolbar"}static get $name(){return"GanttToolbar"}set parent(t){super.parent=t;this.gantt=t,t.project.on({load:"updateStartDateField",refresh:"updateStartDateField",thisObj:this}),this.styleNode=document.createElement("style"),document.head.appendChild(this.styleNode)}get parent(){return super.parent}static get configurable(){return{items:[{type:"buttonGroup",items:[{color:"b-green",ref:"addTaskButton",icon:"b-fa b-fa-plus",text:"Create",tooltip:"Create new task",onAction:"up.onAddTaskClick"}]},{type:"buttonGroup",items:[{ref:"editTaskButton",icon:"b-fa b-fa-pen",text:"Edit",tooltip:"Edit selected task",onAction:"up.onEditTaskClick"},{ref:"undoRedo",type:"undoredo",items:{transactionsCombo:null}}]},{type:"buttonGroup",items:[{ref:"expandAllButton",icon:"b-fa b-fa-angle-double-down",tooltip:"Expand all",onAction:"up.onExpandAllClick"},{ref:"collapseAllButton",icon:"b-fa b-fa-angle-double-up",tooltip:"Collapse all",onAction:"up.onCollapseAllClick"}]},{type:"buttonGroup",items:[{ref:"zoomInButton",icon:"b-fa b-fa-search-plus",tooltip:"Zoom in",onAction:"up.onZoomInClick"},{ref:"zoomOutButton",icon:"b-fa b-fa-search-minus",tooltip:"Zoom out",onAction:"up.onZoomOutClick"},{ref:"zoomToFitButton",icon:"b-fa b-fa-compress-arrows-alt",tooltip:"Zoom to fit",onAction:"up.onZoomToFitClick"},{ref:"previousButton",icon:"b-fa b-fa-angle-left",tooltip:"Previous time span",onAction:"up.onShiftPreviousClick"},{ref:"nextButton",icon:"b-fa b-fa-angle-right",tooltip:"Next time span",onAction:"up.onShiftNextClick"}]},{type:"buttonGroup",items:[{type:"button",ref:"featuresButton",icon:"b-fa b-fa-tasks",text:"Features",tooltip:"Toggle features",toggleable:!0,menu:{onItem:"up.onFeaturesClick",onBeforeShow:"up.onFeaturesShow",items:[{text:"Draw dependencies",feature:"dependencies",checked:!1},{text:"Task labels",feature:"labels",checked:!0},{text:"Project lines",feature:"projectLines",checked:!1},{text:"Highlight non-working time",feature:"nonWorkingTime",checked:!1},{text:"Enable cell editing",feature:"cellEdit",checked:!1},{text:"Show baselines",feature:"baselines",checked:!1},{text:"Show rollups",feature:"rollups",checked:!1},{text:"Show progress line",feature:"progressLine",checked:!1},{text:"Hide schedule",cls:"b-separator",subGrid:"normal",checked:!1}]}},{type:"button",ref:"settingsButton",icon:"b-fa b-fa-cogs",text:"Settings",tooltip:"Adjust settings",toggleable:!0,menu:{type:"popup",anchor:!0,cls:"settings-menu",layoutStyle:{flexDirection:"column"},onBeforeShow:"up.onSettingsShow",items:[{type:"slider",ref:"rowHeight",text:"Row height",width:"12em",showValue:!0,min:30,max:70,onInput:"up.onSettingsRowHeightChange"},{type:"slider",ref:"barMargin",text:"Bar margin",width:"12em",showValue:!0,min:0,max:10,onInput:"up.onSettingsMarginChange"},{type:"slider",ref:"duration",text:"Animation duration ",width:"12em",min:0,max:2e3,step:100,showValue:!0,onInput:"up.onSettingsDurationChange"}]}},{type:"button",color:"b-red",ref:"criticalPathsButton",icon:"b-fa b-fa-fire",text:"Critical paths",tooltip:"Highlight critical paths",toggleable:!0,onAction:"up.onCriticalPathsClick"}]},{type:"datefield",ref:"startDateField",label:"Project start",flex:"0 0 17em",listeners:{change:"up.onStartDateChange"}},{type:"textfield",ref:"filterByName",cls:"filter-by-name",flex:"0 0 12.5em",label:"Find tasks by name",placeholder:"Find tasks by name",clearable:!0,keyStrokeChangeDelay:100,triggers:{filter:{align:"end",cls:"b-fa b-fa-filter"}},onChange:"up.onFilterChange"}]}}setAnimationDuration(t){const e=this,a=`.b-animating .b-gantt-task-wrap { transition-duration: ${t/1e3}s !important; }`;e.gantt.transitionDuration=t,e.transitionRule?e.transitionRule.cssText=a:e.transitionRule=l.CSSHelper.insertRule(a)}updateStartDateField(){const{startDateField:t}=this.widgetMap;t.value=this.gantt.project.startDate,t.required=!0}async onAddTaskClick(){const{gantt:t}=this,e=t.taskStore.rootNode.appendChild({name:"New task",duration:1});await t.project.propagateAsync(),await t.scrollRowIntoView(e),t.features.cellEdit.startEditing({record:e,field:"name"})}onEditTaskClick(){const{gantt:t}=this;t.selectedRecord?t.editTask(t.selectedRecord):l.Toast.show("First select the task you want to edit")}onExpandAllClick(){this.gantt.expandAll()}onCollapseAllClick(){this.gantt.collapseAll()}onZoomInClick(){this.gantt.zoomIn()}onZoomOutClick(){this.gantt.zoomOut()}onZoomToFitClick(){this.gantt.zoomToFit({leftMargin:50,rightMargin:50})}onShiftPreviousClick(){this.gantt.shiftPrevious()}onShiftNextClick(){this.gantt.shiftNext()}onStartDateChange({value:t,oldValue:e}){e&&(this.gantt.startDate=l.DateHelper.add(t,-1,"week"),this.gantt.project.setStartDate(t))}onFilterChange({value:t}){""===t?this.gantt.taskStore.clearFilters():(t=t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),this.gantt.taskStore.filter({filters:e=>e.name&&e.name.match(new RegExp(t,"i")),replace:!0}))}onFeaturesClick({source:t}){const{gantt:e}=this;if(t.feature){const a=e.features[t.feature];a.disabled=!a.disabled}else if(t.subGrid){const a=e.subGrids[t.subGrid];a.collapsed=!a.collapsed}}onFeaturesShow({source:t}){const{gantt:e}=this;t.items.map(t=>{const{feature:a}=t;return a?e.features[a]?t.checked=!e.features[a].disabled:t.hide():t.checked=e.subGrids[t.subGrid].collapsed,t})}onSettingsShow({source:t}){const{gantt:e}=this,{rowHeight:a,barMargin:n,duration:o}=t.widgetMap;a.value=e.rowHeight,n.value=e.barMargin,n.max=e.rowHeight/2-5,o.value=e.transitionDuration}onSettingsRowHeightChange({value:t}){this.gantt.rowHeight=t,this.widgetMap.settingsButton.menu.widgetMap.barMargin.max=t/2-5}onSettingsMarginChange({value:t}){this.gantt.barMargin=t}onSettingsDurationChange({value:t}){this.gantt.transitionDuration=t,this.styleNode.innerHTML=`.b-animating .b-gantt-task-wrap { transition-duration: ${t/1e3}s !important; }`}onCriticalPathsClick({source:t}){this.gantt.features.criticalPaths.disabled=!t.pressed}}d.initClass();var p=t=>{const e={tbar:{type:"gantttoolbar"},dependencyIdField:"wbsCode",project:{taskModelClass:u,transport:{load:{url:"data/visum-test-data.json"}},autoLoad:!0,stm:{autoRecord:!0}},startDate:"2021-06-01",endDate:"2021-07-30",resourceImageFolderPath:"users/",columns:[{type:"id"},{type:"name",width:250},{type:"startdate"},{type:"duration"},{type:"percentdone",showCircle:!0,width:70},{type:"predecessor",width:112},{type:"successor",width:112},{type:"addnew"}],subGridConfigs:{locked:{flex:3},normal:{flex:4}},columnLines:!1,rollupsFeature:{disabled:!0},baselinesFeature:{disabled:!0},progressLineFeature:{disabled:!0,statusDate:new Date(2019,0,25)},filterFeature:!0,dependencyEditFeature:!0,timeRangesFeature:{showCurrentTimeLine:!0},labelsFeature:{left:{field:"name",editor:{type:"textfield"}}}};return o.a.createElement(r.b,Object.assign({},e,t))};var h=t=>{const{href:e,title:a}=t;return o.a.createElement(n.Fragment,null,o.a.createElement("header",{className:"visum-header"},o.a.createElement("div",{id:"title-container"},o.a.createElement("a",{id:"title",href:e},a)),t.children,o.a.createElement(r.a,null)))};a(67);var g=t=>o.a.createElement(n.Fragment,null,o.a.createElement(h,Object.assign({},{title:"Visum Test",href:"../../../../../#example-frameworks-react-javascript-advanced"},{children:o.a.createElement(r.c,null)})),o.a.createElement(p,null));s.a.render(o.a.createElement(g,null),document.getElementById("container"))}},[[30,1,2]]]);