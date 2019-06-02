/*
 Highcharts JS v7.1.1 (2019-04-09)

 (c) 2016-2019 Highsoft AS
 Authors: Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?(d["default"]=d,module.exports=d):"function"===typeof define&&define.amd?define("highcharts/modules/sunburst",["highcharts"],function(w){d(w);d.Highcharts=w;return d}):d("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(d){function w(b,k,d,h){b.hasOwnProperty(k)||(b[k]=h.apply(null,d))}d=d?d._modules:{};w(d,"mixins/draw-point.js",[],function(){var b=function(b){var d=this,h=d.graphic,k=b.animatableAttribs,E=b.onComplete,v=b.css,G=b.renderer;
if(d.shouldDraw())h||(d.graphic=h=G[b.shapeType](b.shapeArgs).add(b.group)),h.css(v).attr(b.attribs).animate(k,b.isNew?!1:void 0,E);else if(h){var q=function(){d.graphic=h=h.destroy();"function"===typeof E&&E()};Object.keys(k).length?h.animate(k,void 0,function(){q()}):q()}};return function(d){(d.attribs=d.attribs||{})["class"]=this.getClassName();b.call(this,d)}});w(d,"mixins/tree-series.js",[d["parts/Globals.js"]],function(b){var d=b.extend,w=b.isArray,h=b.isObject,M=b.isNumber,E=b.merge,v=b.pick;
return{getColor:function(d,q){var C=q.index,g=q.mapOptionsToLevel,h=q.parentColor,G=q.parentColorIndex,H=q.series,D=q.colors,k=q.siblings,m=H.points,A=H.chart.options.chart,u,z,e,p;if(d){m=m[d.i];d=g[d.level]||{};if(g=m&&d.colorByPoint)z=m.index%(D?D.length:A.colorCount),u=D&&D[z];if(!H.chart.styledMode){D=m&&m.options.color;A=d&&d.color;if(e=h)e=(e=d&&d.colorVariation)&&"brightness"===e.key?b.color(h).brighten(C/k*e.to).get():h;e=v(D,A,u,e,H.color)}p=v(m&&m.options.colorIndex,d&&d.colorIndex,z,G,
q.colorIndex)}return{color:e,colorIndex:p}},getLevelOptions:function(b){var q=null,C,g,v,k;if(h(b))for(q={},v=M(b.from)?b.from:1,k=b.levels,g={},C=h(b.defaults)?b.defaults:{},w(k)&&(g=k.reduce(function(b,g){var q,m;h(g)&&M(g.level)&&(m=E({},g),q="boolean"===typeof m.levelIsConstant?m.levelIsConstant:C.levelIsConstant,delete m.levelIsConstant,delete m.level,g=g.level+(q?0:v-1),h(b[g])?d(b[g],m):b[g]=m);return b},{})),k=M(b.to)?b.to:1,b=0;b<=k;b++)q[b]=E({},C,h(g[b])?g[b]:{});return q},setTreeValues:function q(b,
g){var h=g.before,k=g.idRoot,C=g.mapIdToNode[k],D=g.points[b.i],E=D&&D.options||{},m=0,A=[];d(b,{levelDynamic:b.level-(("boolean"===typeof g.levelIsConstant?g.levelIsConstant:1)?0:C.level),name:v(D&&D.name,""),visible:k===b.id||("boolean"===typeof g.visible?g.visible:!1)});"function"===typeof h&&(b=h(b,g));b.children.forEach(function(h,k){var e=d({},g);d(e,{index:k,siblings:b.children.length,visible:b.visible});h=q(h,e);A.push(h);h.visible&&(m+=h.val)});b.visible=0<m||b.visible;h=v(E.value,m);d(b,
{children:A,childrenTotal:m,isLeaf:b.visible&&!m,val:h});return b},updateRootId:function(b){var d;h(b)&&(d=h(b.options)?b.options:{},d=v(b.rootNode,d.rootId,""),h(b.userOptions)&&(b.userOptions.rootId=d),b.rootNode=d);return d}}});w(d,"modules/treemap.src.js",[d["parts/Globals.js"],d["mixins/tree-series.js"],d["mixins/draw-point.js"]],function(b,d,w){var h=b.seriesType,k=b.seriesTypes,E=b.addEvent,v=b.merge,G=b.extend,q=b.error,C=b.defined,g=b.noop,I=b.fireEvent,L=d.getColor,H=d.getLevelOptions,D=
b.isArray,K=b.isNumber,m=b.isObject,A=b.isString,u=b.pick,z=b.Series,e=b.stableSort,p=b.Color,r=function(a,c,f){f=f||this;b.objectEach(a,function(l,n){c.call(f,l,n,a)})},t=function(a,c,f){f=f||this;a=c.call(f,a);!1!==a&&t(a,c,f)},J=d.updateRootId;h("treemap","scatter",{allowTraversingTree:!1,animationLimit:250,showInLegend:!1,marker:!1,colorByPoint:!1,dataLabels:{defer:!1,enabled:!0,formatter:function(){var a=this&&this.point?this.point:{};return A(a.name)?a.name:""},inside:!0,verticalAlign:"middle"},
tooltip:{headerFormat:"",pointFormat:"\x3cb\x3e{point.name}\x3c/b\x3e: {point.value}\x3cbr/\x3e"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,drillUpButton:{position:{align:"right",x:-10,y:10}},traverseUpButton:{position:{align:"right",x:-10,y:10}},borderColor:"#e6e6e6",borderWidth:1,opacity:.15,states:{hover:{borderColor:"#999999",brightness:k.heatmap?0:.1,halo:!1,opacity:.75,shadow:!1}}},{pointArrayMap:["value"],
directTouch:!0,optionalAxis:"colorAxis",getSymbol:g,parallelArrays:["x","y","value","colorValue"],colorKey:"colorValue",trackerGroups:["group","dataLabelsGroup"],getListOfParents:function(a,c){a=D(a)?a:[];var f=D(c)?c:[];c=a.reduce(function(a,c,f){c=u(c.parent,"");void 0===a[c]&&(a[c]=[]);a[c].push(f);return a},{"":[]});r(c,function(a,c,b){""!==c&&-1===f.indexOf(c)&&(a.forEach(function(a){b[""].push(a)}),delete b[c])});return c},getTree:function(){var a=this.data.map(function(a){return a.id}),a=this.getListOfParents(this.data,
a);this.nodeMap=[];return this.buildNode("",-1,0,a,null)},hasData:function(){return!!this.processedXData.length},init:function(a,c){var f=b.colorSeriesMixin;b.colorSeriesMixin&&(this.translateColors=f.translateColors,this.colorAttribs=f.colorAttribs,this.axisTypes=f.axisTypes);E(this,"setOptions",function(a){a=a.userOptions;C(a.allowDrillToNode)&&!C(a.allowTraversingTree)&&(a.allowTraversingTree=a.allowDrillToNode,delete a.allowDrillToNode);C(a.drillUpButton)&&!C(a.traverseUpButton)&&(a.traverseUpButton=
a.drillUpButton,delete a.drillUpButton)});z.prototype.init.call(this,a,c);this.options.allowTraversingTree&&E(this,"click",this.onClickDrillToNode)},buildNode:function(a,c,f,b,n){var l=this,e=[],d=l.points[c],F=0,N;(b[a]||[]).forEach(function(c){N=l.buildNode(l.points[c].id,c,f+1,b,a);F=Math.max(N.height+1,F);e.push(N)});c={id:a,i:c,children:e,height:F,level:f,parent:n,visible:!1};l.nodeMap[c.id]=c;d&&(d.node=c);return c},setTreeValues:function(a){var c=this,f=c.options,b=c.nodeMap[c.rootNode],f=
"boolean"===typeof f.levelIsConstant?f.levelIsConstant:!0,n=0,x=[],d,y=c.points[a.i];a.children.forEach(function(a){a=c.setTreeValues(a);x.push(a);a.ignore||(n+=a.val)});e(x,function(a,c){return a.sortIndex-c.sortIndex});d=u(y&&y.options.value,n);y&&(y.value=d);G(a,{children:x,childrenTotal:n,ignore:!(u(y&&y.visible,!0)&&0<d),isLeaf:a.visible&&!n,levelDynamic:a.level-(f?0:b.level),name:u(y&&y.name,""),sortIndex:u(y&&y.sortIndex,-d),val:d});return a},calculateChildrenAreas:function(a,c){var f=this,
b=f.options,n=f.mapOptionsToLevel[a.level+1],e=u(f[n&&n.layoutAlgorithm]&&n.layoutAlgorithm,b.layoutAlgorithm),d=b.alternateStartingDirection,y=[];a=a.children.filter(function(a){return!a.ignore});n&&n.layoutStartingDirection&&(c.direction="vertical"===n.layoutStartingDirection?0:1);y=f[e](c,a);a.forEach(function(a,b){b=y[b];a.values=v(b,{val:a.childrenTotal,direction:d?1-c.direction:c.direction});a.pointValues=v(b,{x:b.x/f.axisRatio,width:b.width/f.axisRatio});a.children.length&&f.calculateChildrenAreas(a,
a.values)})},setPointValues:function(){var a=this,c=a.xAxis,f=a.yAxis;a.points.forEach(function(b){var n=b.node,e=n.pointValues,l,d,p=0;a.chart.styledMode||(p=(a.pointAttribs(b)["stroke-width"]||0)%2/2);e&&n.visible?(n=Math.round(c.translate(e.x,0,0,0,1))-p,l=Math.round(c.translate(e.x+e.width,0,0,0,1))-p,d=Math.round(f.translate(e.y,0,0,0,1))-p,e=Math.round(f.translate(e.y+e.height,0,0,0,1))-p,b.shapeArgs={x:Math.min(n,l),y:Math.min(d,e),width:Math.abs(l-n),height:Math.abs(e-d)},b.plotX=b.shapeArgs.x+
b.shapeArgs.width/2,b.plotY=b.shapeArgs.y+b.shapeArgs.height/2):(delete b.plotX,delete b.plotY)})},setColorRecursive:function(a,c,b,e,n){var f=this,l=f&&f.chart,l=l&&l.options&&l.options.colors,d;if(a){d=L(a,{colors:l,index:e,mapOptionsToLevel:f.mapOptionsToLevel,parentColor:c,parentColorIndex:b,series:f,siblings:n});if(c=f.points[a.i])c.color=d.color,c.colorIndex=d.colorIndex;(a.children||[]).forEach(function(c,b){f.setColorRecursive(c,d.color,d.colorIndex,b,a.children.length)})}},algorithmGroup:function(a,
c,b,e){this.height=a;this.width=c;this.plot=e;this.startDirection=this.direction=b;this.lH=this.nH=this.lW=this.nW=this.total=0;this.elArr=[];this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(a,c){return Math.max(a/c,c/a)}};this.addElement=function(a){this.lP.total=this.elArr[this.elArr.length-1];this.total+=a;0===this.direction?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/
this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH));this.elArr.push(a)};this.reset=function(){this.lW=this.nW=0;this.elArr=[];this.total=0}},algorithmCalcPoints:function(a,c,f,e){var n,l,d,p,h=f.lW,r=f.lH,g=f.plot,t,m=0,k=f.elArr.length-1;c?(h=f.nW,r=f.nH):t=f.elArr[f.elArr.length-
1];f.elArr.forEach(function(a){if(c||m<k)0===f.direction?(n=g.x,l=g.y,d=h,p=a/d):(n=g.x,l=g.y,p=r,d=a/p),e.push({x:n,y:l,width:d,height:b.correctFloat(p)}),0===f.direction?g.y+=p:g.x+=d;m+=1});f.reset();0===f.direction?f.width-=h:f.height-=r;g.y=g.parent.y+(g.parent.height-f.height);g.x=g.parent.x+(g.parent.width-f.width);a&&(f.direction=1-f.direction);c||f.addElement(t)},algorithmLowAspectRatio:function(a,c,b){var f=[],e=this,d,p={x:c.x,y:c.y,parent:c},g=0,h=b.length-1,r=new this.algorithmGroup(c.height,
c.width,c.direction,p);b.forEach(function(b){d=b.val/c.val*c.height*c.width;r.addElement(d);r.lP.nR>r.lP.lR&&e.algorithmCalcPoints(a,!1,r,f,p);g===h&&e.algorithmCalcPoints(a,!0,r,f,p);g+=1});return f},algorithmFill:function(a,c,b){var f=[],e,d=c.direction,p=c.x,g=c.y,r=c.width,h=c.height,t,m,k,q;b.forEach(function(b){e=b.val/c.val*c.height*c.width;t=p;m=g;0===d?(q=h,k=e/q,r-=k,p+=k):(k=r,q=e/k,h-=q,g+=q);f.push({x:t,y:m,width:k,height:q});a&&(d=1-d)});return f},strip:function(a,c){return this.algorithmLowAspectRatio(!1,
a,c)},squarified:function(a,c){return this.algorithmLowAspectRatio(!0,a,c)},sliceAndDice:function(a,c){return this.algorithmFill(!0,a,c)},stripes:function(a,c){return this.algorithmFill(!1,a,c)},translate:function(){var a=this,c=a.options,b=J(a),e,d;z.prototype.translate.call(a);d=a.tree=a.getTree();e=a.nodeMap[b];a.renderTraverseUpButton(b);a.mapOptionsToLevel=H({from:e.level+1,levels:c.levels,to:d.height,defaults:{levelIsConstant:a.options.levelIsConstant,colorByPoint:c.colorByPoint}});""===b||
e&&e.children.length||(a.setRootNode("",!1),b=a.rootNode,e=a.nodeMap[b]);t(a.nodeMap[a.rootNode],function(c){var b=!1,e=c.parent;c.visible=!0;if(e||""===e)b=a.nodeMap[e];return b});t(a.nodeMap[a.rootNode].children,function(a){var c=!1;a.forEach(function(a){a.visible=!0;a.children.length&&(c=(c||[]).concat(a.children))});return c});a.setTreeValues(d);a.axisRatio=a.xAxis.len/a.yAxis.len;a.nodeMap[""].pointValues=b={x:0,y:0,width:100,height:100};a.nodeMap[""].values=b=v(b,{width:b.width*a.axisRatio,
direction:"vertical"===c.layoutStartingDirection?0:1,val:d.val});a.calculateChildrenAreas(d,b);a.colorAxis?a.translateColors():c.colorByPoint||a.setColorRecursive(a.tree);c.allowTraversingTree&&(c=e.pointValues,a.xAxis.setExtremes(c.x,c.x+c.width,!1),a.yAxis.setExtremes(c.y,c.y+c.height,!1),a.xAxis.setScale(),a.yAxis.setScale());a.setPointValues()},drawDataLabels:function(){var a=this,c=a.mapOptionsToLevel,b,e;a.points.filter(function(a){return a.node.visible}).forEach(function(f){e=c[f.node.level];
b={style:{}};f.node.isLeaf||(b.enabled=!1);e&&e.dataLabels&&(b=v(b,e.dataLabels),a._hasPointLabels=!0);f.shapeArgs&&(b.style.width=f.shapeArgs.width,f.dataLabel&&f.dataLabel.css({width:f.shapeArgs.width+"px"}));f.dlOptions=v(b,f.options.dataLabels)});z.prototype.drawDataLabels.call(this)},alignDataLabel:function(a,c,e){var f=e.style;!b.defined(f.textOverflow)&&c.text&&c.getBBox().width>c.text.textWidth&&c.css({textOverflow:"ellipsis",width:f.width+="px"});k.column.prototype.alignDataLabel.apply(this,
arguments);a.dataLabel&&a.dataLabel.attr({zIndex:(a.node.zIndex||0)+1})},pointAttribs:function(a,c){var b=m(this.mapOptionsToLevel)?this.mapOptionsToLevel:{},e=a&&b[a.node.level]||{},b=this.options,d=c&&b.states[c]||{},g=a&&a.getClassName()||"";a={stroke:a&&a.borderColor||e.borderColor||d.borderColor||b.borderColor,"stroke-width":u(a&&a.borderWidth,e.borderWidth,d.borderWidth,b.borderWidth),dashstyle:a&&a.borderDashStyle||e.borderDashStyle||d.borderDashStyle||b.borderDashStyle,fill:a&&a.color||this.color};
-1!==g.indexOf("highcharts-above-level")?(a.fill="none",a["stroke-width"]=0):-1!==g.indexOf("highcharts-internal-node-interactive")?(c=u(d.opacity,b.opacity),a.fill=p(a.fill).setOpacity(c).get(),a.cursor="pointer"):-1!==g.indexOf("highcharts-internal-node")?a.fill="none":c&&(a.fill=p(a.fill).brighten(d.brightness).get());return a},drawPoints:function(){var a=this,c=a.chart,b=c.renderer,e=c.styledMode,d=a.options,p=e?{}:d.shadow,g=d.borderRadius,r=c.pointCount<d.animationLimit,h=d.allowTraversingTree;
a.points.forEach(function(c){var f=c.node.levelDynamic,l={},n={},k={},t="level-group-"+f,m=!!c.graphic,q=r&&m,x=c.shapeArgs;c.shouldDraw()&&(g&&(n.r=g),v(!0,q?l:n,m?x:{},e?{}:a.pointAttribs(c,c.selected&&"select")),a.colorAttribs&&e&&G(k,a.colorAttribs(c)),a[t]||(a[t]=b.g(t).attr({zIndex:1E3-f}).add(a.group)));c.draw({animatableAttribs:l,attribs:n,css:k,group:a[t],renderer:b,shadow:p,shapeArgs:x,shapeType:"rect"});h&&c.graphic&&(c.drillId=d.interactByLeaf?a.drillToByLeaf(c):a.drillToByGroup(c))})},
onClickDrillToNode:function(a){var c=(a=a.point)&&a.drillId;A(c)&&(a.setState(""),this.setRootNode(c,!0,{trigger:"click"}))},drillToByGroup:function(a){var c=!1;1!==a.node.level-this.nodeMap[this.rootNode].level||a.node.isLeaf||(c=a.id);return c},drillToByLeaf:function(a){var c=!1;if(a.node.parent!==this.rootNode&&a.node.isLeaf)for(a=a.node;!c;)a=this.nodeMap[a.parent],a.parent===this.rootNode&&(c=a.id);return c},drillUp:function(){var a=this.nodeMap[this.rootNode];a&&A(a.parent)&&this.setRootNode(a.parent,
!0,{trigger:"traverseUpButton"})},drillToNode:function(a,c){q("WARNING: treemap.drillToNode has been renamed to treemap.setRootNode, and will be removed in the next major version.");this.setRootNode(a,c)},setRootNode:function(a,c,b){a=G({newRootId:a,previousRootId:this.rootNode,redraw:u(c,!0),series:this},b);I(this,"setRootNode",a,function(a){var c=a.series;c.idPreviousRoot=a.previousRootId;c.rootNode=a.newRootId;c.isDirty=!0;a.redraw&&c.chart.redraw()})},renderTraverseUpButton:function(a){var c=
this,b=c.options.traverseUpButton,e=u(b.text,c.nodeMap[a].name,"\x3c Back"),d;""===a?c.drillUpButton&&(c.drillUpButton=c.drillUpButton.destroy()):this.drillUpButton?(this.drillUpButton.placed=!1,this.drillUpButton.attr({text:e}).align()):(d=(a=b.theme)&&a.states,this.drillUpButton=this.chart.renderer.button(e,null,null,function(){c.drillUp()},a,d&&d.hover,d&&d.select).addClass("highcharts-drillup-button").attr({align:b.position.align,zIndex:7}).add().align(b.position,!1,b.relativeTo||"plotBox"))},
buildKDTree:g,drawLegendSymbol:b.LegendSymbolMixin.drawRectangle,getExtremes:function(){z.prototype.getExtremes.call(this,this.colorValueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;z.prototype.getExtremes.call(this)},getExtremesFromAll:!0,bindAxes:function(){var a={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,dataMin:0,minPadding:0,max:100,dataMax:100,maxPadding:0,startOnTick:!1,title:null,tickPositions:[]};z.prototype.bindAxes.call(this);b.extend(this.yAxis.options,a);b.extend(this.xAxis.options,
a)},setState:function(a){this.options.inactiveOtherPoints=!0;z.prototype.setState.call(this,a,!1);this.options.inactiveOtherPoints=!1},utils:{recursive:t}},{draw:w,getClassName:function(){var a=b.Point.prototype.getClassName.call(this),c=this.series,e=c.options;this.node.level<=c.nodeMap[c.rootNode].level?a+=" highcharts-above-level":this.node.isLeaf||u(e.interactByLeaf,!e.allowTraversingTree)?this.node.isLeaf||(a+=" highcharts-internal-node"):a+=" highcharts-internal-node-interactive";return a},
isValid:function(){return this.id||K(this.value)},setState:function(a){b.Point.prototype.setState.call(this,a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:0})},setVisible:k.pie.prototype.pointClass.prototype.setVisible,shouldDraw:function(){return K(this.plotY)&&null!==this.y}})});w(d,"modules/sunburst.src.js",[d["parts/Globals.js"],d["mixins/draw-point.js"],d["mixins/tree-series.js"]],function(b,d,w){var h=b.CenteredSeriesMixin,k=b.Series,E=b.extend,v=h.getCenter,G=w.getColor,q=w.getLevelOptions,
C=h.getStartAndEndRadians,g=b.isNumber,I=b.isObject,L=b.isString,H=b.merge,D=180/Math.PI,h=b.seriesType,K=w.setTreeValues,m=w.updateRootId,A=function(b,d){var e=[];if(g(b)&&g(d)&&b<=d)for(;b<=d;b++)e.push(b);return e},u=function(b,d){var e;d=I(d)?d:{};var p=0,h,a,c,f;I(b)&&(e=H({},b),b=g(d.from)?d.from:0,f=g(d.to)?d.to:0,a=A(b,f),b=Object.keys(e).filter(function(c){return-1===a.indexOf(+c)}),h=c=g(d.diffRadius)?d.diffRadius:0,a.forEach(function(a){a=e[a];var b=a.levelSize.unit,d=a.levelSize.value;
"weight"===b?p+=d:"percentage"===b?(a.levelSize={unit:"pixels",value:d/100*h},c-=a.levelSize.value):"pixels"===b&&(c-=d)}),a.forEach(function(a){var b=e[a];"weight"===b.levelSize.unit&&(b=b.levelSize.value,e[a].levelSize={unit:"pixels",value:b/p*c})}),b.forEach(function(a){e[a].levelSize={value:0,unit:"pixels"}}));return e},z=function(b,d){var e=d.mapIdToNode[b.parent],g=d.series,h=g.chart,a=g.points[b.i],e=G(b,{colors:h&&h.options&&h.options.colors,colorIndex:g.colorIndex,index:d.index,mapOptionsToLevel:d.mapOptionsToLevel,
parentColor:e&&e.color,parentColorIndex:e&&e.colorIndex,series:d.series,siblings:d.siblings});b.color=e.color;b.colorIndex=e.colorIndex;a&&(a.color=b.color,a.colorIndex=b.colorIndex,b.sliced=b.id!==d.idRoot?a.sliced:!1);return b};h("sunburst","treemap",{center:["50%","50%"],colorByPoint:!1,opacity:1,dataLabels:{allowOverlap:!0,defer:!0,rotationMode:"auto",style:{textOverflow:"ellipsis"}},rootId:void 0,levelIsConstant:!0,levelSize:{value:1,unit:"weight"},slicedOffset:10},{drawDataLabels:b.noop,drawPoints:function(){var b=
this,d=b.mapOptionsToLevel,h=b.shapeRoot,m=b.group,q=b.hasRendered,a=b.rootNode,c=b.idPreviousRoot,f=b.nodeMap,l=f[c],n=l&&l.shapeArgs,l=b.points,x=b.startAndEndRadians,v=b.chart,y=v&&v.options&&v.options.chart||{},w="boolean"===typeof y.animation?y.animation:!0,u=b.center[3]/2,C=b.chart.renderer,A,z=!1,G=!1;if(y=!!(w&&q&&a!==c&&b.dataLabelsGroup))b.dataLabelsGroup.attr({opacity:0}),A=function(){z=!0;b.dataLabelsGroup&&b.dataLabelsGroup.animate({opacity:1,visibility:"visible"})};l.forEach(function(e){var l,
p,k=e.node,r=d[k.level];l=e.shapeExisting||{};var t=k.shapeArgs||{},y,z=!(!k.visible||!k.shapeArgs);if(q&&w){var J={};p={end:t.end,start:t.start,innerR:t.innerR,r:t.r,x:t.x,y:t.y};z?!e.graphic&&n&&(J=a===e.id?{start:x.start,end:x.end}:n.end<=t.start?{start:x.end,end:x.end}:{start:x.start,end:x.start},J.innerR=J.r=u):e.graphic&&(c===e.id?p={innerR:u,r:u}:h&&(p=h.end<=l.start?{innerR:u,r:u,start:x.end,end:x.end}:{innerR:u,r:u,start:x.start,end:x.start}));l=J}else p=t,l={};var J=[t.plotX,t.plotY],B;
e.node.isLeaf||(a===e.id?(B=f[a],B=B.parent):B=e.id);E(e,{shapeExisting:t,tooltipPos:J,drillId:B,name:""+(e.name||e.id||e.index),plotX:t.plotX,plotY:t.plotY,value:k.val,isNull:!z});B=e.options;k=I(t)?t:{};B=I(B)?B.dataLabels:{};var r=I(r)?r.dataLabels:{},r=H({style:{}},r,B),F;B=r.rotationMode;g(r.rotation)||("auto"===B&&(1>e.innerArcLength&&e.outerArcLength>k.radius?F=0:B=1<e.innerArcLength&&e.outerArcLength>1.5*k.radius?"parallel":"perpendicular"),"auto"!==B&&(F=k.end-(k.end-k.start)/2),r.style.width=
"parallel"===B?Math.min(2.5*k.radius,(e.outerArcLength+e.innerArcLength)/2):k.radius,"perpendicular"===B&&e.series.chart.renderer.fontMetrics(r.style.fontSize).h>e.outerArcLength&&(r.style.width=1),r.style.width=Math.max(r.style.width-2*(r.padding||0),1),F=F*D%180,"parallel"===B&&(F-=90),90<F?F-=180:-90>F&&(F+=180),r.rotation=F);0===r.rotation&&(r.rotation=.001);e.dlOptions=r;!G&&z&&(G=!0,y=A);e.draw({animatableAttribs:p,attribs:E(l,!v.styledMode&&b.pointAttribs(e,e.selected&&"select")),onComplete:y,
group:m,renderer:C,shapeType:"arc",shapeArgs:t})});y&&G?(b.hasRendered=!1,b.options.dataLabels.defer=!0,k.prototype.drawDataLabels.call(b),b.hasRendered=!0,z&&A()):k.prototype.drawDataLabels.call(b)},pointAttribs:b.seriesTypes.column.prototype.pointAttribs,layoutAlgorithm:function(b,d,h){var e=b.start,k=b.end-e,a=b.val,c=b.x,f=b.y,l=h&&I(h.levelSize)&&g(h.levelSize.value)?h.levelSize.value:0,p=b.r,r=p+l,m=h&&g(h.slicedOffset)?h.slicedOffset:0;return(d||[]).reduce(function(b,d){var g=1/a*d.val*k,h=
e+g/2,n=c+Math.cos(h)*m,h=f+Math.sin(h)*m;d={x:d.sliced?n:c,y:d.sliced?h:f,innerR:p,r:r,radius:l,start:e,end:e+g};b.push(d);e=d.end;return b},[])},setShapeArgs:function(b,d,h){var e=[],g=h[b.level+1];b=b.children.filter(function(a){return a.visible});e=this.layoutAlgorithm(d,b,g);b.forEach(function(a,b){b=e[b];var c=b.start+(b.end-b.start)/2,d=b.innerR+(b.r-b.innerR)/2,g=b.end-b.start,d=0===b.innerR&&6.28<g?{x:b.x,y:b.y}:{x:b.x+Math.cos(c)*d,y:b.y+Math.sin(c)*d},k=a.val?a.childrenTotal>a.val?a.childrenTotal:
a.val:a.childrenTotal;this.points[a.i]&&(this.points[a.i].innerArcLength=g*b.innerR,this.points[a.i].outerArcLength=g*b.r);a.shapeArgs=H(b,{plotX:d.x,plotY:d.y+4*Math.abs(Math.cos(c))});a.values=H(b,{val:k});a.children.length&&this.setShapeArgs(a,a.values,h)},this)},translate:function(){var b=this.options,d=this.center=v.call(this),g=this.startAndEndRadians=C(b.startAngle,b.endAngle),h=d[3]/2,w=d[2]/2-h,a=m(this),c=this.nodeMap,f,l=c&&c[a],n,x;this.shapeRoot=l&&l.shapeArgs;k.prototype.translate.call(this);
x=this.tree=this.getTree();this.renderTraverseUpButton(a);c=this.nodeMap;l=c[a];f=L(l.parent)?l.parent:"";n=c[f];f=q({from:0<l.level?l.level:1,levels:this.options.levels,to:x.height,defaults:{colorByPoint:b.colorByPoint,dataLabels:b.dataLabels,levelIsConstant:b.levelIsConstant,levelSize:b.levelSize,slicedOffset:b.slicedOffset}});f=u(f,{diffRadius:w,from:0<l.level?l.level:1,to:x.height});K(x,{before:z,idRoot:a,levelIsConstant:b.levelIsConstant,mapOptionsToLevel:f,mapIdToNode:c,points:this.points,series:this});
b=c[""].shapeArgs={end:g.end,r:h,start:g.start,val:l.val,x:d[0],y:d[1]};this.setShapeArgs(n,b,f);this.mapOptionsToLevel=f},animate:function(b){var d=this.chart,e=[d.plotWidth/2,d.plotHeight/2],g=d.plotLeft,h=d.plotTop,d=this.group;b?(b={translateX:e[0]+g,translateY:e[1]+h,scaleX:.001,scaleY:.001,rotation:10,opacity:.01},d.attr(b)):(b={translateX:g,translateY:h,scaleX:1,scaleY:1,rotation:0,opacity:1},d.animate(b,this.options.animation),this.animate=null)},utils:{calculateLevelSizes:u,range:A}},{draw:d,
shouldDraw:function(){return!this.isNull},isValid:function(){return!0}})});w(d,"masters/modules/sunburst.src.js",[],function(){})});
//# sourceMappingURL=sunburst.js.map