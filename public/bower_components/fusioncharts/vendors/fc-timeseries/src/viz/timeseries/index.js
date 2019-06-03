import chain from'ramda/es/chain';import addIndex from'ramda/es/addIndex';import xprod from'ramda/es/xprod';import clone from'ramda/es/clone';import unique from'ramda/es/uniq';import equals from'ramda/es/equals';import CommonAPI from'../../../../fc-charts/src/chart/_internal/commonchartapi';import{pluckNumber,pluck,safeMax,extend2,convertColor,getLinkAction,hashify,HASHSTRING,toRaphaelColor,getLightColor,regex,extent,UNDEF,stubFN,DEFAULT_FT_FONT,PXSTRING}from'../../../../fc-core/src/lib';import ColorManager from'../../../../fc-charts/src/_internal/color-utils/colormanager';import Line from'../../_internal/components/dataset/line';import timeNavigatorFactory from'./factories/navigator-time';import toolbarFactory from'../../../src/_internal/factories/toolbar-factory';import standardRangeSelectorFactory from'../../../src/_internal/factories/standard-range-selector.factory';import legendFactory from'../../../src/_internal/factories/legend-factory';import xFactory from'./factories/x';import yFactory from'./factories/y';import CaptionFactory from'./factories/caption';import CustomRangeFactory from'./factories/custom-range-selector';import CrosslineManager from'../../_internal/factories/multicanvas-crossline-manager';import panelFactory from'./factories/panel';import expanderAxis from'./_utils/expanders/axis';import expanderPanel from'./_utils/expanders/panel';import expanderSeries from'./_utils/expanders/series';import OrdinalScale from'../../../../fc-core/src/axis/scales/ordinal';import arrayHasContent from'../../../../fc-utils/src/type/array-has-content';import stringHasContent from'../../../../fc-utils/src/type/string-has-content';import backgroundFactory from'./factories/background';import{groupBy,between,pivot,filter as filterBy}from'../../../../fc-datatable/src/operators';import{DatetimeUnits as time}from'../../../../fc-utils/src/datetime-enums';import isValidNumber from'../../../../fc-utils/src/type/is-valid-number';import{timeYear}from'../../../../fc-utils/src/time-intervals';import toolbarManagerFactory from'./factories/toolbar-manager-factory';import isObject from'../../../../fc-utils/src/type/is-object';const DEFAULT_CANVAS_DISTANCE=20,DEFAULT_TIMENAV_HEIGHT_RATIO=.3,DEFAULT_AXIS_HEIGHT_RATIO=.6,DEFAULT_CAPTION_HEIGHT_RATIO=.3,DEFAULT_LEGEND_RATIO=.1,CANVAS_TOP_PADDING=6,LINE_HEIGHT_FACTOR=1.2,dropHash=regex.dropHash,columnsFilter=(a,b)=>a.getSchema().filter(b).map(a=>a.name),capsFirst=a=>a.charAt(0).toUpperCase()+a.slice(1),permuteIndices=a=>a.map(a=>({x:a.x,y:a.y,plots:xprod(a.x.map(a=>a.index),a.y.map(a=>a.index)).map(a=>({x:a[0],y:a[1]}))})),getIndex=a=>+a.split('_').pop(),toolbarPositionParser=function(a){return a='tr'===a||'rt'===a||'top right'===a||'right top'===a?'tr':'br'===a||'rb'===a||'bottom right'===a||'right bottom'===a?'br':'tl'===a||'lt'===a||'top left'===a||'left top'===a?'tl':'bl'===a||'lb'===a||'bottom left'===a||'left bottom'===a?'bl':'tr',a},isTemporalScheme=a=>'date'===a.type||'interval'===a.type,isNumericScheme=a=>'number'===a.type,isStringyScheme=a=>'string'===a.type,flatMap=addIndex(chain),defaultPanelsMulticanvas=(a,b)=>flatMap((a,c)=>b.map((a,b,d)=>({x:[{index:c,visible:b===d.length-1}],y:[{index:b,align:'left'}]})),a),defaultPanelsSingleCanvas=(a,b)=>flatMap((a,c)=>({x:[{index:c,visible:!0}],y:b.map((a,b)=>({index:b,align:0==b%2?'left':'right'}))}),a),parsePaletteColor=(a=[])=>{let b=[];return arrayHasContent(a)?b=a.slice():stringHasContent(a)&&(b=a.split(/\s*,\s*/)),b=b.filter(a=>!!a),b.map(a=>hashify(a))},setLineHeight=(a,b)=>{'object'==typeof a&&(a['line-height']||(a['line-height']=(parseFloat(a['font-size'])||b||10)*LINE_HEIGHT_FACTOR+PXSTRING))},filterer=(a,b)=>{for(let c in a)a[c]._fc_info.table=a[c]._fc_info.filter?b.table.query([a[c]._fc_info.filterInfo.query]):b.table,a[c]._fc_info.filterInfo.table=a[c]._fc_info.table,tableCreator(a[c])},grouping=(a,b)=>{for(let c in a)a[c]._fc_info.table=b.table,a[c]._fc_info.group=c,tableCreator(a[c])},pivoter=(a,b)=>{for(let c in a)a[c]._fc_info.table=b.table,a[c]._fc_info.groupItems=b.groupItems,a[c]._fc_info.group=b.group,tableCreator(a[c])},aggregator=a=>{let b=a.op,c=a.operands,d=a.filter,e=[];if(d){for(let a in c)c.hasOwnProperty(a)&&e.push(...Object.keys(c[a]));e=unique(e)}else e=Object.keys(c);return e.map(a=>({column:a,operation:b}))},seriesGenerator=(a,b=[],c,d)=>{let e=[];for(let f in a)if('plottype'!==f){const g=a=>a.column===f&&a.operation===d;e=0<b.length?chain(a=>c.filter(g).map(b=>[a,b.column,b.operation]),b).map(a=>a.join(' - ')):c.filter(g).map(a=>[a.column,a.operation].join(' - ')),e.forEach(b=>a[f].push(b))}},binner=(a,b)=>{for(let c in a){let d=a[c]._fc_info.binDecider,e=a[c]._fc_info.chart,f=d.getRangeThreshold(),g=[{column:a[c]._fc_info.bin,timeUnit:time[capsFirst(f[0].name())],binSize:f[1],startValue:a[c]._fc_info.totalStart}],h=b.group,i=b.groupItems,j=b.pivot,k=b.table,l=a=>filterBy((b,c)=>b[c[h]]===a);for(let b in a[c])if('aggregate'===b){let m,n=a[c][b]._fc_info,o=[],p=[],q=[],r=[],s=[];for(let a in n)o.push({op:a,operands:n[a],filter:h});if(p=chain(aggregator,o),h){const a=i.map(l),b=a.map(a=>k.query([a]));j?(m=pivot(g,j,p),b.forEach(a=>{q.push(a.query([m])),r.push(a.unique(j))})):(m=groupBy(g,p),q=b.map(a=>a.query([m])))}else j?(m=pivot(g,j,p),s=k.unique(j)):m=groupBy(g,p),q=[k.query([m])];e.addEventListener('focusLimitChanged',()=>{f=d.getRangeThreshold(),g=[{column:a[c]._fc_info.bin,timeUnit:time[capsFirst(f[0].name())],binSize:f[1],startValue:a[c]._fc_info.totalStart}],j?m._updateArgs(g,j,p):m._updateArgs(g,p)}),o.forEach(b=>{let d=b.operands;h?i.forEach((e,f)=>{const g=d[e];g.table=q[f],g.position=a[c]._fc_info.bin,g.filterItem=e,seriesGenerator(g,r[f],p,b.op)}):(d.table=q[0],d.position=a[c]._fc_info.bin,seriesGenerator(d,s,p,b.op))})}}},tableCreator=a=>{for(let b in a){const c=a[b];'filter'==b?filterer(c,a._fc_info):'group'==b?grouping(c,a._fc_info):'pivot'==b?pivoter(c,a._fc_info):'bin'==b&&binner(c,a._fc_info)}},mapper=(a,b)=>{let c,d,e,f,g,h,i;b?(c=a.config.contextPanels,d=a.config.contextAxesX,e=a.config.contextAxesY,f=a.getFromEnv('contextBins'),g=a.getFromEnv('contextScalesX'),h=a.getFromEnv('contextScalesY'),i=a.config.contextTableMap):(c=a.config.focusPanels,d=a.config.focusAxesX,e=a.config.focusAxesY,f=a.getFromEnv('focusBins'),g=a.getFromEnv('focusScalesX'),h=a.getFromEnv('focusScalesY'),i=a.config.focusTableMap);for(let j=0,k=c.length;j<k;j++){const b=c[j].plots;for(let c=0,j=b.length;c<j;c++){const j=b[c],k=d[j.x],l=e[j.y],m=f[j.x],n=m.getRangeThreshold(),o=m.getBinDomain().map(Number),p=g[j.x],q=h[j.y];let r=i;j.plots||(j.plots=[]),k.binDecider=m,k.scale=p,l.scale=q,k.filter&&(!r.filter&&(r.filter={}),r=r.filter,k.filterInfo.query=between(k.filter[0],o[0]-2*n[2],o[1]+2*n[2]),!r[`x__FC_OP_SEP__${j.x}`]&&(r[`x__FC_OP_SEP__${j.x}`]={_fc_info:{filter:k.filter[0],filterInfo:k.filterInfo,start:o[0],end:o[1]}}),r=r[`x__FC_OP_SEP__${j.x}`]),l.filter&&(!r&&(r.filter={}),r=r.filter,!r[`y__FC_OP_SEP__${j.y}`]&&(r[`y__FC_OP_SEP__${j.y}`]={_fc_info:{filter:l.filter[0]}}),r=r[`y__FC_OP_SEP__${j.y}`]),l.plot.forEach((b,c)=>{let d=r,e=[];if(b.group){const c=b.group;r.group||(r.group={}),r=r.group,r[c]||(r[c]={_fc_info:{}}),r[c]._fc_info.groupItems=e=a.config.dataTable.unique(c),r=r[c]}if(b.stack){const a=b.stack;r.pivot||(r.pivot={}),r=r.pivot,r[a]||(r[a]={_fc_info:{pivot:a}}),r=r[a]}if(k.bin&&(!r.bin&&(r.bin={}),r=r.bin,!r[`x__FC_OP_SEP__${j.x}`]&&(r[`x__FC_OP_SEP__${j.x}`]={_fc_info:{chart:a,bin:k.bin[0],binDecider:m,totalStart:+timeYear.floor(new Date(a.config.dataTable.min(k.bin[0])))}}),r=r[`x__FC_OP_SEP__${j.x}`]),l.bin&&(!r.bin&&(r.bin={}),r=r.bin,!r[`y__FC_OP_SEP__${j.y}`]&&(r[`y__FC_OP_SEP__${j.y}`]={_fc_info:{bin:l.bin[0]}}),r=r[`y__FC_OP_SEP__${j.y}`]),r.aggregate||(r.aggregate={_fc_info:{}}),'candlestick'===b.type||'ohlc'===b.type){let a=b.group?e.length:1;for(let d=0;d<a;++d){let a={plottype:b.type,typeinnavigator:b.typeinnavigator},f=b.group?e[d]:UNDEF;if(b.open){r.aggregate._fc_info.first||(r.aggregate._fc_info.first={});const c=r.aggregate._fc_info.first;f&&!c[f]&&(c[f]={}),f?!c[f][b.open]&&(c[f][b.open]=[]):!c[b.open]&&(c[b.open]=[]),a.open=f?c[f][b.open]:c[b.open]}if(b.high){r.aggregate._fc_info.max||(r.aggregate._fc_info.max={});const c=r.aggregate._fc_info.max;f&&!c[f]&&(c[f]={}),f?!c[f][b.high]&&(c[f][b.high]=[]):!c[b.high]&&(c[b.high]=[]),a.high=f?c[f][b.high]:c[b.high]}if(b.low){r.aggregate._fc_info.min||(r.aggregate._fc_info.min={});const c=r.aggregate._fc_info.min;f&&!c[f]&&(c[f]={}),f?!c[f][b.low]&&(c[f][b.low]=[]):!c[b.low]&&(c[b.low]=[]),a.low=f?c[f][b.low]:c[b.low]}if(b.close){r.aggregate._fc_info.last||(r.aggregate._fc_info.last={});const c=r.aggregate._fc_info.last;f&&!c[f]&&(c[f]={}),f?!c[f][b.close]&&(c[f][b.close]=[]):!c[b.close]&&(c[b.close]=[]),a.close=f?c[f][b.close]:c[b.close]}const g=r.aggregate._fc_info;a.tableInfo=(f?[g.first[f],g.max[f],g.min[f],g.last[f]]:[g.first,g.max,g.min,g.last]).filter(a=>!!a)[0],a.value=b.value,a.plotInAxisIndex=c,j.plots.push(a)}}else{r.aggregate._fc_info[b.aggregation]||(r.aggregate._fc_info[b.aggregation]={});const a=r.aggregate._fc_info[b.aggregation];if(b.group)for(let d,f=0;f<e.length;++f)d=e[f],a[d]||(a[d]={}),a[d][b.value]||(a[d][b.value]=[]),j.plots.push({plottype:b.type,typeinnavigator:b.typeinnavigator,tableInfo:a[d],value:a[d][b.value],stack:b.stack,plotInAxisIndex:c});else a[b.value]||(a[b.value]=[]),j.plots.push({plottype:b.type,typeinnavigator:b.typeinnavigator,tableInfo:a,value:a[b.value],stack:b.stack,plotInAxisIndex:c})}r=d})}}},getSmartLinearMin=(a,b)=>{let c=a-Math.abs(.1*a);return 0<c&&b?0:c},getSmartLogMin=(a,b)=>{let c=.9*a;return b?Math.min(c,1):c},getLogMinMax=(a,b,c,d,e,f)=>{isValidNumber(e)&&0!==e||(e=10);const g=0<a&&isFinite(a)?getSmartLogMin(a,f):1,h=isValidNumber(c)&&0<c&&c<a?c:g,i=0<b&&isFinite(b)?b:g+ +e,j=isValidNumber(d)&&d>h?d:1.2*i;return[h,j]},getLinearMinMax=(a,b,c,d,e)=>{isFinite(a)||(a=UNDEF),isFinite(b)||(b=UNDEF),isFinite(c)||(c=UNDEF),isFinite(d)||(d=UNDEF);const f=c<a?c:a===UNDEF?0:getSmartLinearMin(a,e),g=0>f&&(0>d||0>b);let h;return h=d>b?d:b===UNDEF?f+1:g&&e?0:b+Math.abs(.2*b),[f,h]},parseStrokeDashArray=a=>{for(var b in a)a.hasOwnProperty(b)&&('object'==typeof a[b]?parseStrokeDashArray(a[b]):'stroke-dasharray'===b&&'string'==typeof a[b]&&(a[b]=a[b].replace(/^\s+|\s+$/g,'').replace(/,/g,' ').split(' ').map(a=>+a)))},parseOpacity=a=>{for(var b in a)a.hasOwnProperty(b)&&('object'==typeof a[b]?parseOpacity(a[b]):('opacity'===b||'stroke-opacity'===b||'fill-opacity'===b)&&(a[b]=Math.max(0,Math.min(1,+a[b]))))},disposeFn=a=>{a.dispose&&a.dispose()},useFirstTables=(a,b,c=stubFN)=>{let d=Object.keys(a),e=d.length,f=!0;for(var g=0;g<e&&f;++g){let e=d[g],h=a[e];if('_fc_info'===e||'table'===e){let a='table'===e?h:h.table;a&&a!==b&&(c(a),f=!1)}else'aggregate'===e?useFirstTables(h._fc_info,b,c):isObject(h)&&useFirstTables(h,b,c)}},actionsReducer=function(a,b,c){'plot'===a?c.showWarning('02362480','param',' Timeseries',' Some plot configurations were ignored. Please provide valid values to the plot attribute within a '+b+'Axis configuration.'):'axis'===a?c.showWarning('08927060','param',' Timeseries','Some '+b+'Axis configurations were ignored. Please provide a valid value to the plot attribute within the '+b+'Axis configurations.'):'fullaxis'===a?c.showWarning('08963401','param',' Timeseries','All '+b+'Axis configurations were ignored. Please provide a valid value to the plot attribute within the '+b+'Axis configurations. Defaulting to showing all numeric columns in separate canvases.'):void 0},createStyleStr=(a={})=>{let b,c='style=\'';for(b in a)c+=b+': '+a[b]+'; ';return c+='\'',c};class TimeSeries extends CommonAPI{constructor(){super();let a=this;a.addToEnv('getStyleDef',function(b={}){let c,d=a.getFromEnv('textStyle');if('string'==typeof b){let d=a.getFromEnv('dataSource').styledefinition;c={},d&&b.split(/\s+/g).forEach(a=>extend2(c,d[a.toLowerCase()]))}return c&&(b=c),parseStrokeDashArray(b),parseOpacity(b),(b['font-size']||0===b['font-size'])&&setLineHeight(b,d['font-size']),b}),a.deregisterFactory('canvas'),a.registerFactory('background',backgroundFactory),a.registerFactory('caption',CaptionFactory),a.registerFactory('legend',legendFactory),a.registerFactory('panel',panelFactory),a.registerFactory('selectorToolbar',toolbarFactory,['timeNavigator','canvas']),a.registerFactory('timeNavigator',timeNavigatorFactory),a.registerFactory('standardRangeSelector',standardRangeSelectorFactory,['selectorToolbar']),a.registerFactory('customRangeSelector',CustomRangeFactory,['selectorToolbar']),a.registerFactory('multicanvasCrosslineManager',CrosslineManager,['mouseTracker']),a.registerFactory('toolbarManager',toolbarManagerFactory,['standardRangeSelector','customRangeSelector'])}static getName(){return'timeseries'}getName(){return'timeseries'}__setDefaultConfig(){let a=this.config;a.skipConfigureIteration={},a.canvasAxisMap={},a.scaleYDsMap={},a.palettecolors=['#5D62B5','#29C3BE','#F2726F','#FFC533','#62B58F','#BC95DF','#67CDF2'],a.defaultLegendTextStyle={"font-family":DEFAULT_FT_FONT,"font-weight":'normal',"font-style":'normal',"font-size":'12px',fill:'#5F5F5F',"line-height":'14px',opacity:'1',"fill-opacity":'1'},a.defaultTooltipStyle={"background-color":convertColor('#ffffff','90'),color:'#5f5f5f',"border-color":'#e8e8e8',"border-width":'1px',"border-radius":'0px',"line-height":1,"font-family":DEFAULT_FT_FONT,padding:'3px',opacity:.9},this.addToEnv('textStyle',{"font-family":'sans-serif',"font-size":'10',fill:'#000000',"line-height":'12'}),a.contextPanels=UNDEF,a.contextLimit=a.focusLimit=UNDEF,a.legendMap={}}setTooltipStyle(){let a=this.getFromEnv('tooltipStyle'),b=this.getFromEnv('baseTextStyle'),c=this.getFromEnv('toolTipController');a.container=Object.assign({},this.config.defaultTooltipStyle,b,a.text,a.container),a.header=Object.assign({"font-size":pluck(a.container['font-size'],'12px'),"font-weight":pluck(a.container['font-weight'],'bold'),"font-family":a.container['font-family'],padding:'5px 5px 0',color:getLightColor('#5f5f5f',76)},a.header),a.body=Object.assign({"font-size":pluck(a.container['font-size'],'11px'),"font-weight":pluck(a.container['font-weight'],'normal'),"font-family":a.container['font-family'],padding:'0 5px 5px'},a.body),c.setStyle(a.container),c.setRestrictionWithinCanvas({bottom:!0}),a.headerStyleString=createStyleStr(a.header),a.bodyStyleString=createStyleStr(a.body)}sanitizeData(a){super.sanitizeData(a);let{expandedAxis:b,actions:c}=expanderAxis(columnsFilter(a.data,isTemporalScheme),a.xaxis,!1),{expandedAxis:d,actions:e}=expanderAxis(columnsFilter(a.data,isNumericScheme),a.yaxis);a.xaxis=b,a.yaxis=d,c.forEach(a=>actionsReducer(a,'x',this)),e.forEach(a=>actionsReducer(a,'y',this))}getDSdef(){return Line}_updateVisuals(){super._updateVisuals(),this.getFromEnv('paper').config.noDefaultAttribs=!0}domainValidator(a,b,c=[]){let d,e,f=this,g=f.getFromEnv('contextBins')[0].getBinMin(),h=a[0],i=a[1],j=b[0],k=b[1],l=+a[0],m=+a[1],n=+b[0],o=+b[1];return c.length&&(d=1<Math.abs(m-l-(+c[1]-+c[0]))?'squeeze':'drag'),l<n&&(h=j,i='drag'===d?new Date(m+(n-l)):i),m>o&&(i=k,h='drag'===d?new Date(l-(m-o)):h),m<n&&(i=j),l>o&&(h=k),l>m&&([h,i]=[i,h]),e=i-h,e>=3*g[2]?(f.fireEvent('domainValidated'),[+h,+i]):f.getFocusLimit()||f.getContextLimit()}configureAttributes(a){const b=this,c=b.config,d=new ColorManager(b),e=new OrdinalScale,f=a.chart,g=parsePaletteColor(f.palettecolors),h=b.getFromEnv('getStyleDef'),i=a.legend,j=f.style||{},k=h(j.text),l=c.legendMap,m={},n=b.getFromEnv('legendMap'),o=b.getFromEnv('dataSource'),p=extend2(b.getFromEnv('textStyle'),k),q=isObject(a.tooltip)?a.tooltip:{},r=isObject(q.style)?q.style:{},s=b.getChildren('legend')&&b.getChildren('legend')[0];let t=h(i&&i.item&&i.item.style&&i.item.style.text),u=[];for(let b in this.addToEnv('baseTextStyle',Object.assign({"font-family":DEFAULT_FT_FONT},k)),t=Object.assign({},this.getFromEnv('baseTextStyle'),t),c.mergedLegendStyle=extend2(extend2({},c.defaultLegendTextStyle),t),c.focusTableMap&&useFirstTables(c.focusTableMap,c.focusTableMap._fc_info.table,disposeFn),c.contextTableMap&&(useFirstTables(c.contextTableMap,c.contextTableMap._fc_info.table,disposeFn),c.contextTableMap=UNDEF),this.addToEnv('chart-attrib',f),d.configure(),this.addToEnv('color-manager',d),g.length&&(c.palettecolors=g),e.setRange(c.palettecolors),this.addToEnv('ordinalScale',e),c.dataTable=a.data,c.showLegend=pluckNumber(f.showlegend,1),c.navigatorEnabled=pluckNumber(o.navigator&&o.navigator.enabled,f.enablenavigator,1),c.showTooltip=pluckNumber(q.enabled,f.showtooltip,1),c.interCanvasSpace=pluckNumber(f.intercanvasspace,DEFAULT_CANVAS_DISTANCE),c.multiCanvas=pluckNumber(f.multicanvas,1),this.addToEnv('UTC',pluck(f.enableutc,!1)),this.addToEnv('dateAPI',(a,b,c)=>a['get'+(c?'UTC':'')+b]()),u=a.xaxis.slice(0,1).map(a=>Object.assign({},a,{bin:a.plot.map(a=>a.value)})),c.focusAxesX=u.map(a=>Object.assign({},a,{filter:a.plot.map(a=>a.value),filterInfo:{}})),c.focusAxesY=expanderSeries(columnsFilter(c.dataTable,isStringyScheme),a.yaxis,a.series,a.stack,a.group),c.focusPanels=permuteIndices(expanderPanel(c.focusAxesX,c.focusAxesY,a.canvas,c.multiCanvas?defaultPanelsMulticanvas:defaultPanelsSingleCanvas)),c.pixelMultiplier=1,c.focusAxesY.forEach(({plot:a})=>{let b,d=0;a.forEach(({stack:a,group:e,value:f,type:g})=>{let h='column'===g;if(h&&(b=e?c.dataTable.unique(e):[,],d+=b.length),a){if(m[a])return;m[a]=c.dataTable.unique(a)}else if(e){if(m[e])return;m[e]=h?b:c.dataTable.unique(e)}else if('ohlc'!==g&&'candlestick'!==g){if(m[f])return;m[f]=[f]}}),c.pixelMultiplier=Math.max(d,c.pixelMultiplier)}),m){const a=m[b];a.forEach(a=>{l[a]||(l[a]={visibility:!0,series:a})})}if(b.addToEnv('legendMap',l),n){const a=(b,c)=>{for(const d in b)if(b.hasOwnProperty(d)){const e=c&&c[d],f=b[d];f.hasOwnProperty('visibility')?e?(!f.visibility&&(s.getItem(f.legendItemId).removeLegendState('hidden'),f.visibility=!0),c[d]=f):s&&s.disposeItem(f.legendItemId):a(f,e)}};a(n,l)}c.contextAxesX=clone(u),c.contextAxesY=clone(c.focusAxesY),xFactory(this),yFactory(this),c.focusTableMap={_fc_info:{table:c.dataTable}},mapper(b),c.navigatorEnabled&&(c.contextPanels=permuteIndices(expanderPanel(c.contextAxesX,c.contextAxesY,[],(a,b)=>a.map((a,c)=>({x:[{index:c}],y:b.map((a,b)=>({index:b,visible:!1}))})))),c.contextTableMap={_fc_info:{table:c.dataTable}},mapper(b,!0)),tableCreator(c.focusTableMap),tableCreator(c.contextTableMap),c.printOption={enabled:pluckNumber(f.printshowbutton,f.showprintmenuitem,0)},c.toolbarPosition=toolbarPositionParser(pluck(f.toolbarposition,'tr').toLowerCase()),c.toolbarHAlign='left'===(''+f.toolbarhalign).toLowerCase()?'l':c.toolbarPosition.charAt(1),c.toolbarVAlign='bottom'===(''+f.toolbarvalign).toLowerCase()?'b':c.toolbarPosition.charAt(0),c.link=f.clickurl,this.addToEnv('linkClickFN',getLinkAction(this.getFromEnv('dataSource'),this)),this.addToEnv('chartConfig',c),b.addToEnv('tooltipStyle',{container:h(r.container),text:h(r.text),header:h(r.header),body:h(r.body)}),this.addToEnv('style',{outCancolor:p.fill,fontSize:p['font-size'],outCanfontFamily:p['font-family']}),this.createBaseComponent(),this.getFromEnv('animationManager').setAnimationState(this._firstConfigure?'initial':'update'),this._createToolBox(),this.configureChildren(),this.setTooltipStyle()}_addLegend(a){var b,c,d,e=this,f=e.config,g=f.mergedLegendStyle,h=a.series,i=e.getFromEnv('ordinalScale').getRangeValue(h),j=e.getFromEnv('legend'),k=getLightColor(i,60).replace(dropHash,HASHSTRING);f.showLegend&&(b={FCcolor:{color:i,angle:0,ratio:'0',alpha:'100'}},d=j.getItem(a.legendItemId),c={label:h},!d&&(a.legendItemId=j.createItem(),d=j.getItem(a.legendItemId),e.addExtEventListener('fc-click',()=>{const b=a.visibility,c=a=>a._flushResult&&a._flushResult({legendInteracted:!0});b?(a.visibility=!1,d.setLegendState('hidden')):(a.visibility=!0,d.removeLegendState('hidden')),f.focusTableMap&&useFirstTables(f.focusTableMap,f.focusTableMap._fc_info.table,c),f.contextTableMap&&useFirstTables(f.contextTableMap,f.contextTableMap._fc_info.table,c)},d)),d.configure(c),d.setStateCosmetics('default',{symbol:{fill:toRaphaelColor(b),rawFillColor:i,stroke:toRaphaelColor(k)},text:Object.assign({},g,{fill:convertColor(g.fill,100*(g.opacity*g['fill-opacity']))})}))}_createGroup(a={},b){const c=this.getFromEnv('animationManager');return c.setAnimation({attr:a,container:b,el:'group',component:this,label:'group'})}_createLayers(){const a=this.getFromEnv('animationManager');let b,c=this.getContainer('parentgroup');c||(c=this.addContainer('parentgroup',a.setAnimation({el:c||'group',attr:{name:'parentgroup'},component:this}))),this.getChildContainer('tropo')||this.addChildContainer('tropo',this._createGroup({name:'chart-tropo'},c)),this.getChildContainer('strato')||this.addChildContainer('strato',this._createGroup({name:'chart-strato'},c)),this.getChildContainer('meso')||this.addChildContainer('meso',this._createGroup({name:'chart-meso'},c)),this.getChildContainer('thermo')||this.addChildContainer('thermo',this._createGroup({name:'chart-thermo'},c)),this.getChildContainer('exo')||(b=this.addChildContainer('exo',this._createGroup({name:'chart-exo'},c))),this.getChildContainer('toolbar-master')||this.addChildContainer('toolbar-master',this._createGroup({name:'toolbar-master'},b)),this.getChildContainer('legendGroup')||this.addChildContainer('legendGroup',this._createGroup({name:'legend-group'},b))}manageSpace(){var a=Math.max,b=Math.min;let c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u=this,v=u.config,w=v.focusPanels,z=v.canvasAxisMap,x=u.getFromEnv('focusScalesY'),y=u.getFromEnv('focusScalesX'),A=u.getChildren('caption'),B=u.getFromEnv('selectorToolbar'),C=u.getFromEnv('toolbar'),D=C.getLogicalSpace(),E=u.getChildren('legend')&&u.getChildren('legend')[0],F=u.getChildren('background')[0],G=u.getChildren('canvas_0'),H=0,I=0,J=u.getChildren('timeNavigator'),K=0,L={left:0,right:0},M=0,N=0,O=c=+u.getFromEnv('chartWidth'),P=d=+u.getFromEnv('chartHeight'),Q=0,R=0,S=.03*c,T=.03*d,U=0,V=v.interCanvasSpace;if(N+=pluckNumber(v.marginTop,T),P-=pluckNumber(v.marginBottom,T),M+=pluckNumber(v.marginLeft,S),O-=pluckNumber(v.marginRight,S),F.setDimension({height:d,width:c}),F.setTranslation(0,0),w.forEach((b,c)=>{let d=z[`canvas_${c}`],{y:e}=d,f=DEFAULT_AXIS_HEIGHT_RATIO*(O-M)/(e.length||1);l=e.map(a=>{let c=getIndex(a),d=u.getChildren(a)[0].setDimension({width:f});return b.y[c].overlap?{}:d}),l.forEach(b=>{'number'==typeof b.left?L.left=a(L.left,b.left):L.right=a(L.right,b.right)})}),w.forEach((a,b)=>{let c,d,e,f=z[`canvas_${b}`],{y:g}=f,h=0,i=0;g.forEach(a=>{c=u.getChildren(a)[0],e=c.getAlignment(),d=c.updateMaxLabelSpace(L[e]),h+=pluckNumber(d.left,0),i+=pluckNumber(d.right,0)}),Q=safeMax([Q,h]),R=safeMax([R,i])}),w.forEach((a,b)=>{let c=z[`canvas_${b}`],{x:d}=c,e=DEFAULT_AXIS_HEIGHT_RATIO*(P-N)/(d.length||1);m=d.map(b=>{let c=getIndex(b),d=u.getChildren(b)[0].setDimension({height:e});return a.x[c].overlap?{}:d}),m.forEach(a=>{U+=pluckNumber(a.top,a.bottom,0)})}),M+=Q,O-=R,e=P-N,A&&A.length?(j=A[0].setDimension({width:O-M-D.width,height:DEFAULT_CAPTION_HEIGHT_RATIO*e}),A[0].setTranslation(M,N),t=a(j.height,D.height)):t=D.height,D.height&&(C.setDimension({x:O-D.width,y:N}),C.manageSpace()),N+=t,g=a(0,O-M),s=B.getLogicalSpace().height,B.setDimension({x:M,y:N,width:g}),B.manageSpace(),N+=s,k=U+(w.length-1)*V,e=a(0,P-N-k),E&&(r=a(0,E.setDimension({height:e*DEFAULT_LEGEND_RATIO,width:g}).height),P-=r,e-=r,E.setTranslation(M,P)),J&&J.length&&(i=(1-DEFAULT_TIMENAV_HEIGHT_RATIO)*e/(w.length||1),n=DEFAULT_TIMENAV_HEIGHT_RATIO*e/(J.length||1),J.forEach((c,d)=>{q=c.getChildren('brush')[0],f=q.getLabelSpace()+c.config.scrollbarHeight,o=b(a(b(n,.8*i),48),60),p=o+f,c.setDimension({width:g,height:p}),c.setTranslation(M,P-(J.length-d)*p),K+=p}),K>e?J.forEach(a=>a.setDimension({width:0,height:0})):e-=K),h=a(0,e/(w.length||1)),G&&G[0]){const a=G[0].getCanvasBorder();H=a.topBorder+a.bottomBorder,I=a.leftBorder+a.rightBorder}x.forEach(a=>a.setRange([h-H-CANVAS_TOP_PADDING,0])),y.forEach(a=>a.setRange([0,g-I])),w.forEach((a,b)=>{let c=`canvas_${b}`,{x:d,y:e}=z[c],{x:f,y:i}=a,j=M,k=M+g,l=u.getChildren(c)[0],m=l.getCanvasBorder(),n=N+m.topBorder,o=n+h,p=[];l.setPadding({top:CANVAS_TOP_PADDING}),l.setDimension({width:g,height:h}),d.forEach(a=>{let b=f[getIndex(a)],c=u.getChildren(a)[0],d=c.getDimension();return b.overlap?void p.push(a):void('top'===b.align?(c.setTranslation(M+m.leftBorder,n),n+=d.top):'bottom'===b.align&&(c.setTranslation(M+m.leftBorder,o),o+=d.bottom))}),l.setTranslation(M,n),p.forEach(a=>{let b=f[getIndex(a)],c=u.getChildren(a)[0],d=c.getDimension();'top'===b.align?c.setTranslation(M+m.leftBorder,n):'bottom'===b.align&&c.setTranslation(M+m.leftBorder,n+h-d.bottom)}),e.forEach(a=>{const b=n+CANVAS_TOP_PADDING;let c=i[getIndex(a)],d=u.getChildren(a)[0],e=d.getDimension();c.overlap?'left'===c.align?d.setTranslation(M,b):'right'===c.align&&d.setTranslation(M+g-e.right,b):'left'===c.align?(j-=e.left,d.setTranslation(j,b)):'right'===c.align&&(d.setTranslation(k,b),k+=e.right)}),N=o+V})}_setDataLabelStyle(){return this}_checkInvalidData(){const a=this.getFromEnv('dataSource'),b=this.getFromEnv('chartInstance');return!a.data&&(b.__state.dataReady=!1,b.jsVars.hasNativeMessage=!0,b.jsVars.drawCount+=1,!0)}_checkInvalidSpecificData(){const a=this.getFromEnv('dataSource');if(a.data&&'function'==typeof a.data.getData){let{data:b,schema:c}=a.data.getData();return!(Array.isArray(b)&&0!==b.length&&Array.isArray(c)&&c.filter(a=>'date'===a.type).length&&c.filter(a=>'number'===a.type).length)}return!0}setYScaleLimit(a,b,c,d=!0){let e,f,g,h,j=this,i=j.config,k=i.scaleYDsMap,l=k[a],m=({scale:b})=>b&&b.getId()===a,n=i.focusAxesY.find(m),o=i.contextAxesY.find(m),p=n||o,q=p&&p.scale;if(q){for(const i in l||(l=k[a]={}),(e=l[b])||(e=l[b]={}),e.limit=c,e.baseRequired=d,l)if(l.hasOwnProperty(i)){const a=l[i];[f,g]=extent([f,g].concat(a.limit)),h=h||a.baseRequired}'log'===q.getType()?q.setDomain(getLogMinMax(f,g,p.min,p.max,p.base,h)):q.setDomain(getLinearMinMax(f,g,p.min,p.max,h)),j.config.focusPanels.forEach((a,b)=>{let c=`canvas_${b}`,d=j.getChildren(c),e=d&&d[0],f=j.config.canvasAxisMap[c],g=f&&f.y;g&&e&&(e.asyncDraw(),g.forEach(a=>{const b=j.getChildren(a);b.forEach(a=>{a.getScale()===q&&(a.placeAxis(),a.asyncDraw())})}))})}}setXScaleLimit(a,b,c){var d=Math.max,e=Math.min;let f,g,h,i,j,k=this,l=k.config,m=l.scaleYDsMap,n=m[a],[o,p]=k.getContextLimit(),q=({scale:b})=>b&&b.getId()===a,r=l.focusAxesX.find(q),s=l.contextAxesX.find(q),t=r||s,u=t&&t.scale;if(u){for(const d in n||(n=m[a]={}),(f=n[b])||(f=n[b]={}),f.limit=c,n)if(n.hasOwnProperty(d)){const a=n[d];[g,h]=extent([g,h].concat(a.limit))}r?([i,j]=k.getFocusLimit(),+i===o&&isValidNumber(g)&&(i=e(i,g)),+j===p&&isValidNumber(h)&&(j=d(j,h)),u.setDomain([i,j])):(i=isValidNumber(g)?e(o,g):o,j=isValidNumber(h)?d(p,h):p,u.setDomain([i,j])),k.config.focusPanels.forEach((a,b)=>{let c=`canvas_${b}`,d=k.getChildren(c),e=d&&d[0],f=k.config.canvasAxisMap[c],g=f&&f.x;g&&e&&(e.asyncDraw(),g.forEach(a=>{const b=k.getChildren(a);b.forEach(a=>{a.getScale()===u&&(a.placeAxis(),a.asyncDraw())})}))})}}setFocusLimit(a=[]){const b=this,c=b.config,d=this.domainValidator(a,this.getContextLimit(),c.focusLimit),e=c.focusAxesX[0],f=this.getFromEnv('focusBins')[0],g=this.getFromEnv('focusScalesX')[0],h=b.getFocusLimit();c.focusLimit=d,f.setBinDomain(d);let i=f.getRangeThreshold();g.setRangeThreshold(i),this.fireEvent('focusLimitChanged');equals(d,h)||e.filterInfo&&e.filterInfo.query&&(e.filterInfo.query._updateArgs(+d[0]-2*+i[2],+d[1]+2*+i[2]),e.filterInfo.table._flushResult(),b.updateVerticalAxesWidth())}updateVerticalAxesWidth(){var a=Math.max;let b,c,d,e=this,f=e.config.canvasAxisMap,g=Object.keys(f),h={left:0,right:0};g.forEach(g=>{b=f[g],b.y.forEach(b=>{d=e.getChildren(b),d.forEach(b=>{c=b.getDimension(),'number'==typeof c.left?h.left=a(h.left,c.left):h.right=a(h.right,c.right)})})}),g.forEach(a=>{b=f[a],b.y.forEach(a=>{d=e.getChildren(a),d.forEach(a=>{a.updateMaxLabelSpace(h[a.getAlignment()])})})})}getFocusLimit(){let a=this.config.focusLimit;return a&&a.slice()}setContextLimit(a=[]){let b=this.getFromEnv('contextBins');this.config.contextLimit=a.slice(),b[0].setBinDomain(a),this.getFromEnv('contextScalesX')[0].setRangeThreshold(b[0].getRangeThreshold())}getContextLimit(){return this.config.contextLimit.slice()}}export default TimeSeries;