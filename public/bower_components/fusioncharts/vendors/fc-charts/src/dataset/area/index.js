import ColumnDataset from'../column';import{pluck,pluckNumber,toRaphaelColor,parseConfiguration,extend2,hasSVG,TOUCH_THRESHOLD_PIXELS,CLICK_THRESHOLD_PIXELS,HUNDREDSTRING,hasTouch,getValidValue,preDefStr,getDefinedColor,getDashStyle,parseUnsafeString,parseTooltext,getFirstValue,polyPathToPath,mapSymbolName,getFirstAlpha,getFirstColor}from'../../../../fc-core/src/lib';import{priorityList}from'../../../../fc-core/src/schedular';import{addDep}from'../../../../fc-core/src/dependency-manager';import areaAnimation from'./index.animation';var UNDEF,isVML=!hasSVG,NONE='none',ROLLOVER='DataPlotRollOver',ROLLOUT='DataPlotRollOut',MOUSEOVER='mouseOver',MOUSEOUT='mouseOut',HTP=hasTouch?TOUCH_THRESHOLD_PIXELS:CLICK_THRESHOLD_PIXELS,PLOTBORDERCOLOR='plotBorderColor',PLOTGRADIENTCOLOR='plotGradientColor',SHOWSHADOW='showShadow',POINTER='pointer',EVENTARGS='eventArgs',DATAPLOTCLICK='dataplotclick',LABELUPDATEONIMAGELOADID='labelUpdateOnImageLoadID',DEFAULT_CURSOR=preDefStr.DEFAULT,SETROLLOVERATTR=preDefStr.setRolloverAttrStr,SETROLLOUTATTR=preDefStr.setRolloutAttrStr,getPathArr=function(){var e=this,a=e.pathArr,o=e.path2Arr;return a.length||o.length?a.concat(o):['M0,0']},defined=function(e){return e!==UNDEF&&null!==e&&''!==e},M='M',L='L',Z='Z',math=Math,mathMin=math.min,mathMax=math.max,mathCeil=math.ceil,MAX_MITER_LINEJOIN=2,_imageDrawHelper=function(e,a){let o,r,t,n,l,i,h,c,s,d,g,p,m,v,u,b,f,A=e.getFromEnv('chart'),w=A.config,k=a.config,S=a.graphics,E=S.image||S.element,P=k.eventArgs,_=E._.RefImg,T=a._xPos,x=a._yPos,y=k.anchorProps,R=e.getContainer('shadowGroup'),C=k.hoverEffects,V=k.setLink,F=y.imageScale,I=y.imageAlpha,L=C.imageHoverAlpha,D=C.imageHoverScale,O=.01*(_.height*F),H=.01*(_.width*F),B=.01*(_.width*D),N=.01*(_.height*D);u=y.isAnchorRadius,y.markerRadius=t=y.radius=u?y.radius:mathMin(H,O)/2,isVML?(m={x:T-.005*(_.width*F),y:x-.005*(_.height*F),width:H,height:O},p={x:T-.005*(_.width*D),y:x-.005*(_.height*D),width:B,height:.01*(_.height*D),alpha:L},k.isAnchorsDrawn=!0,w.dragTolerance=w.dragTolerance<O?O+.5:w.dragTolerance,E.data('alwaysInvisible',!F).data('setRolloverProperties',C).data('hoverEnabled',C).data(SETROLLOVERATTR,p).data(SETROLLOUTATTR,m).data('imgRef',_).data('anchorRadius',F).data('anchorHoverRadius',D),E.attr(m),m.alpha=I):(o=y.symbol[1],b=C.isAnchorHoverRadius,n=y.shadow,s=y.imagePadding,C.radius=b?C.anchorRadius:t+1,i=C.radius-s-.5*C.anchorBorderThickness,c=t-s-.5*y.borderThickness,p=m={},w.dragTolerance=w.dragTolerance<t?t+.5:w.dragTolerance,f={fill:toRaphaelColor({color:y.bgColor,alpha:y.bgAlpha}),"stroke-width":y.borderThickness,stroke:toRaphaelColor({color:y.borderColor,alpha:y.borderAlpha})},m=extend2({path:polyPathToPath([o||2,T,x,t,y.startAngle,r])},f),C&&(p={path:polyPathToPath([C.anchorSides||2,T,x,C.radius,C.startAngle,C.dip]),fill:toRaphaelColor({color:C.anchorColor,alpha:C.anchorBgAlpha}),"stroke-width":C.anchorBorderThickness,stroke:toRaphaelColor({color:C.anchorBorderColor,alpha:C.anchorBorderAlpha})},g=mathMax(C.anchorAlpha,C.anchorBorderAlpha),L>g&&(L=g)),y.bgAlpha&&y.borderAlpha&&(d=mathMax(y.bgAlpha,y.borderAlpha),I>d&&(I=d)),v=S.element,v.attr(Object.assign(f,{path:m.path})),v.attr({cursor:V?POINTER:''}).data('alwaysInvisible',!t).data('setRolloverProperties',C).data('hoverEnabled',C.enabled).data(SETROLLOVERATTR,p).data(SETROLLOUTATTR,m).data('anchorRadius',t).data('anchorHoverRadius',C&&C.radius).data(EVENTARGS,P).shadow(n,R),h=polyPathToPath([o||2,T,x,0<c?c:0,y.startAngle,r]),l=polyPathToPath([o||2,T,x,0<i?i:0,C.startAngle,C.dip]),y.imgRefWidth=_.width,y.imgRefHeight=_.height,y.imgRefScale=F,y.rolloutClipRadius=c,m={x:T-.005*(_.width*F),y:x-.005*(_.height*F),width:H,height:O,"clip-path":h},p={x:T-.005*(_.width*D),y:x-.005*(_.height*D),width:B,height:N,alpha:L,"clip-path":l},E.attr({x:m.x,y:m.y,width:m.width,height:m.height,"clip-path":m['clip-path']}).data('alwaysInvisible',!F).data('setRolloverProperties',C).data(SETROLLOVERATTR,p).data(SETROLLOUTATTR,m).data('anchorRadius',F).data('imgRef',_).data('anchorHoverRadius',D),k.isAnchorsDrawn=!0,t=mathMax(t,C&&C.anchorRadius||0,2)),a._xPos=T,a._yPos=x,e.parseLabelAttributes(a,a._index)};addDep({name:'areaAnimation',type:'animationRule',extension:areaAnimation});class AreaDataset extends ColumnDataset{constructor(){super();let e=this;e.__removeElem=(a,o)=>{e._setRemoveAnim(a,'element'===o||'image'===o?'anchor':'label')},e.config.primitiveType='area'}getType(){return'dataset'}getName(){return'area'}__setDefaultConfig(){super.__setDefaultConfig();let e=this.config;e.valueposition=UNDEF,e.plotborderdashlen=UNDEF,e.plotborderdashgap=UNDEF,e.plotborderdashstyle=UNDEF,e.plotborderthickness=UNDEF,e.linethickness=UNDEF,e.linedashlen=UNDEF,e.linedashgap=UNDEF,e.dashed=UNDEF,e.linedashstyle=UNDEF,e.linecolor=UNDEF,e.linealpha=UNDEF,e.anchorbgcolor=UNDEF,e.anchorbordercolor=UNDEF,e.anchorradius=UNDEF,e.anchoralpha=UNDEF,e.anchorimageurl=UNDEF,e.anchorsides=UNDEF,e.anchorbgalpha=UNDEF,e.anchorborderthickness=UNDEF,e.anchorshadow=UNDEF,e.anchorstartangle=UNDEF,e.anchorimagealpha=UNDEF,e.anchorimagescale=UNDEF,e.anchorimagepadding=UNDEF,e.alpha=UNDEF,e.parentyaxis=UNDEF}_getHoveredPlot(e,a){var o,r,t,n,l,i,h,c,s,d=this,g=d.getFromEnv('xAxis'),p=d.components,m=p.data,v=m.length,u=d.config,b=d.getFromEnv('chartConfig').viewPortConfig.step||1,f=u&&u.radius||0,A=d.getSkippingInfo&&d.getSkippingInfo(),x=A.plotsPerBin;for(e+=g.getTranslation(),r=Math.floor(Math.max(g.getValue(e-f),0)),t=Math.ceil(Math.min(g.getValue(e+f),v-1)),c=h+x-1,1<x&&(l=mathCeil(r/x),i=mathCeil(t/x),h=(l-1)*x+1,c=i*x,r=h,t=c),s=t;s>=r&&!((o=m[s])&&!(s%b)&&(n=d.isWithinShape(o,s,e,a),n));s--);return n}getClip(e){var a=Math.abs,o=this,r=o.getFromEnv('xAxis'),t=o.getFromEnv('yAxis'),n=t.getLimit(),l=r.getLimit(),i=r.getPixel(l.min),h=t.getPixel(n.min),c=t.getPixel(n.max),s=a(r.getPixel(l.max)-i),d=h-c,g=[];return g.push(i),g.push(0>d?h:c),'init'===e?g.push(0):'canvas'==e&&g.push(s),g.push(a(d)),g}isWithinShape(e,a,o,r,t){var n,l,i,h,c,s,d,g,p,m,v,u,b,f,A,x,w=Math.pow;if(e&&((t=e.config.setValue)||0===t))return(n=e.config.anchorProps,l=e.config,h=n&&n.borderThickness,c=this,s=c.getFromEnv('chart').config.viewPortConfig,d=c.components,g=d.data,p=pluckNumber(l.dragTolerance,0),x=s?s.x*s.scaleX:0,m=e._xPos-x,v=e._yPos,null!==v)?(A=e.config.hoverEffects,i=Math.max(n&&n.radius,A&&A.anchorRadius||0,HTP)+h/2,i||(i=3),u=o-m,b=r-v,f=Math.sqrt(w(u,2)+w(b,2)),!!(f<=i||f<=p)&&{pointIndex:a,hovered:!0,pointObj:g[a]}):void 0}_parseShadowOptions(){var e=this,a=e.getFromEnv('chart'),o=e.config,r=a.getFromEnv('dataSource').chart,t=e.getFromEnv('color-manager'),n=pluckNumber(a.defaultPlotShadow,t.getColor(SHOWSHADOW));return{opacity:pluckNumber(r.showshadow,n)?o.alpha/100:0}}_firePlotEvent(a,o,r){var e,t,n,l=this,i=l.getFromEnv('chart'),h=l.components,c=l.getFromEnv('toolTipController'),s=h.data,d=s[o]||{},g=l.getGraphicalElement('sharedAnchor'),p=d.graphics&&d.graphics.element||(d.config&&d.config.setValue)!==UNDEF&&g,m=this.config.currentToolTip,v=i.getFromEnv('paper').canvas.style;p&&(e=d.config,n=e.setLink,t=e.eventArgs,'fc-mouseover'===a?(l._decideTooltipType(o,r),l._rolloverResponseSetter(i,d,r),n&&(v.cursor=POINTER)):'fc-mouseout'===a?(c.hide(m),l._rolloutResponseSetter(i,d,r),v.cursor=DEFAULT_CURSOR):'fc-click'===a?i.plotEventHandler(p,r,DATAPLOTCLICK,t):'fc-mousemove'===a?l._decideTooltipType(o,r):void 0)}_rolloverResponseSetter(e,a,o,r){var t=this,n=a.graphics,l=n&&(n.element||t.getAnchor(a)),i=l&&l.data('draged'),h=l&&l.data('hoverEnabled');!0!==i&&(t._hoverFunc(a,ROLLOVER,h,e.getFromEnv('dataSource').chart),!r&&l&&e.plotEventHandler(l,o,ROLLOVER))}_rolloutResponseSetter(e,a,o,r){var t=this,n=a.graphics,l=n&&(n.element||t.getAnchor(a)),i=l&&l.data('draged'),h=l&&l.data('hoverEnabled'),c=t.type,s=a.config,d=s.anchorProps,g=d.radius&&d.anchorAlpha;!0!==i&&(t._hoverFunc(a,ROLLOUT,h,e.getFromEnv('dataSource').chart),!r&&l&&e.plotEventHandler(l,o,ROLLOUT)),s.isAnchorsDrawn&&!g&&'area'===c&&l&&l.hide()}getAnchor(e={}){var a,o,r,t,n,l,i,h,c,s=this,d=s.getFromEnv('animationManager'),g=s.getGraphicalElement('sharedAnchor'),p=e.config;return g?(a=p.anchorProps,o=p.eventArgs,n=p.hoverEffects,l=n.enabled,l&&(r=n.attrs&&n.attrs.setRolloutAttr,t=n.attrs&&n.attrs.setRolloverAttr),i=a.radius,h=a.shadow,c=s.getFromEnv('chartConfig').prevAnchorHovered,n.anchorAnimation=0,e._index!==c&&(g.shadow(h,s.getContainer('shadowGroup')).data('anchorRadius',i).data('anchorHoverRadius',n.anchorRadius).data('hoverEnabled',l).data(EVENTARGS,o),l&&g.data(SETROLLOVERATTR,t).data(SETROLLOUTATTR,r)),s.getFromEnv('chartConfig').prevAnchorHovered=e._index,g):(g=d.setAnimation({el:'path',container:s.getContainer('plotGroup'),label:'anchor',doNotRemove:!0,component:s}),s.addGraphicalElement('sharedAnchor',g),g)}configureAttributes(e){if(!e)return!1;this.trimData(e);let a=this,o=a.getFromEnv('chart');a.config.JSONData=e,a.parseAttributes(),a._setConfigure(),a._realTimeConfigure&&a._realTimeConfigure(),!1!==o.config.hasLegend&&o.config.showLegend&&a._addLegend(),a.setState('dirty',!0)}parseAttributes(){let e,a,o=this,r=o.getFromEnv('chart'),t=r.config,n=o.config,l=o.getName(),i=o.config.JSONData,h=r.getFromEnv('dataSource').chart,c=r.config.singleseries,s=o.getFromEnv('color-manager'),d=Math.floor(o.getJSONIndex()),g=pluckNumber(i.showplotborder,h.showplotborder||1),p=getFirstColor(!c||getValidValue(h.palettecolors)?s.getPlotColor(d):s.getColor('plotFillColor').split(/\s*\,\s*/)[0]),m=t.isdual,v=t.haslineset;n.maxValue=-Infinity,n.minValue=1/0,parseConfiguration(i,n,r.config,{data:!0}),n.showValues=pluckNumber(i.showvalues,h.showvalues,'radar'===l?0:1),n.anchorimageurl=pluck(i.anchorimageurl,h.anchorimageurl,UNDEF),n.plotColor=p,n.parentYAxis=m?v?1:'s'===pluck(i.parentyaxis&&i.parentyaxis.toLowerCase(),'p')?1:0:0,n.valueposition=n.valueposition.toLowerCase(),n.plotfillcolor=pluck(i.color,h.plotfillcolor,p),n.seriesname=parseUnsafeString(i.seriesname),e=t.useplotgradientcolor,n.plotgradientcolor=0===e?'':getDefinedColor(h.plotgradientcolor,s.getColor(PLOTGRADIENTCOLOR)),n.plotfillalpha=pluck(i.alpha,t.plotfillalpha),n.fillColor={color:n.plotfillcolor+(n.plotgradientcolor?','+n.plotgradientcolor:''),alpha:n.plotfillalpha,angle:n.plotfillangle},n.plotborderalpha=g?pluck(i.plotborderalpha,h.plotborderalpha,i.alpha,h.plotfillalpha,'95'):0,n.plotbordercolor=pluck(i.plotbordercolor,h.plotbordercolor,h.areabordercolor,c?getValidValue(h.palettecolors)?s.getPlotColor(0):s.getColor(PLOTBORDERCOLOR).split(/\s*\,\s*/)[0]:'666666'),n.drawLine=pluckNumber(i.drawline,h.drawlines,1),n.plotborderdashstyle=n.dashed?getDashStyle(n.plotborderdashlen,n.plotborderdashgap):NONE,n.linecolor=pluck(i.color,h.linecolor,n.plotColor),n.legendSymbolColor='line'===o.type?n.linecolor:n.plotfillcolor,n.includeinlegend=pluckNumber(i.includeinlegend,n.seriesname?1:0),a=getDashStyle(n.linedashlen,n.linedashgap),n.lineDashStyle=n.dashed?a:NONE,n.defaultPadding={left:0,right:0},n.shadow=o._parseShadowOptions(),n.drawanchors=pluckNumber(i.drawanchors,i.showanchors,h.showanchors,h.drawanchors),n.anchorbgcolor=getFirstColor(pluck(i.anchorbgcolor,t.anchorbgcolor,s.getColor('anchorBgColor'))),n.anchorbordercolor=getFirstColor(pluck(i.anchorbordercolor,t.anchorbordercolor,n.linecolor,n.plotColor)),o.setState('visible',1===pluckNumber(i.visible,!+i.initiallyhidden,1)&&n.drawLine)}_setConfigure(e,a){var o,r,t,n,l,h,c,s,d,g=this,p=g.getFromEnv('chart'),m=g.config,v=p.config,u=g.config.JSONData||[],b=g.getFromEnv('xAxis'),f=p.isRealTime,A=v.realTimeConfig&&v.realTimeConfig.numDisplaySets,x=g.getFromEnv('dataSource').categories&&g.getFromEnv('dataSource').categories[0]&&g.getFromEnv('dataSource').categories[0].category,w=m.initCatLen=f?x&&Array.isArray(x)&&x.filter(e=>!e.vline).length||0:b.getTicksLen(),k=e||u.data,S=e&&e.data.length,E=v.isDrag,P=g.getSkippingInfo&&g.getSkippingInfo(),y=P&&P.draw||[],_=y.length,T=P&&P.skippingApplied;for(d=S===UNDEF&&w>A?w-A:0,t=f?pluckNumber(S,w):Math.min(w,k&&k.length),m.imageCount=0,n=g.components.data,n||(n=g.components.data=[]),m.maxRadius=-Infinity,v.dragTolerance=v.dragTolerance||-Infinity,T&&(t=_),h=d;h<t;h++)l=y[h]||h,e?(o=e&&e.data[l]||{},a===UNDEF?(s=n.length-t+l,r=n[s]):(s=a+l,r=n[s]),c=s):(o=k&&k[l]||{},l-=d,r=n[l],c=l),r||(r=n[c]={}),r.config||(r.config={}),r.graphics||(r.graphics={}),g._plotConfigure(c,o,S),s&&s++;T&&g.addJob('configureRestID',g._configureRestData.bind(g),priorityList.postRender),v.dragTolerance=E?(5<v.dragTolerance?v.dragTolerance:5.5)+HTP:0,g.ErrorValueConfigure&&g.ErrorValueConfigure()}_configureRestData(){var e,a,o,r,t,n,l=this,h=l.getFromEnv('chart'),c=l.config,s=h.config,d=l.config.JSONData,g=d.data||[],p=l.getSkippingInfo&&l.getSkippingInfo(),m=p.drawOnlyMap,v=l.getFromEnv('xAxis'),u=v.getTicksLen();for(c.imageCount=0,o=l.components.data,o||(o=l.components.data=[]),c.maxRadius=-Infinity,s.dragTolerance=s.dragTolerance||-Infinity,c.maxValue=-Infinity,c.minValue=1/0,r=0;r<u;r++)m[r]||(a=o[r],e=g&&g[r]||{},t=r,a||(a=o[r]={}),a.config||(o[r].config={}),a.graphics||(a.graphics={}),l._plotConfigure(t,e),n&&n++)}_plotConfigure(e,a,o){var r,t,n,l,i,h,c,s,d,g,p=this,m=p.getFromEnv('chart'),v=p.config,u=m.config,b=p.config.JSONData,f=m.getFromEnv('dataSource').chart,A=p.components.data,x=A[e],w=p.getFromEnv('xAxis'),k=p.getFromEnv('yAxis'),S=u.isDrag,E=x&&x.config,P=parseUnsafeString(u.yaxisname),y=parseUnsafeString(u.xaxisname),_=u.tooltipsepchar,T=v.dashed,R=u.realTimeConfig&&u.realTimeConfig.numDisplaySets,C=R-v.initCatLen,V=R&&0<=C?C:0;d=w.getLabel(o?e-o:V+e),E.label=getValidValue(parseUnsafeString(d.tooltext||d.label)),a.tooltext!==UNDEF&&(a.tooltext=parseTooltext(a.tooltext,[3],{label:d.label},a,f,b)),E.setValue=n=k.getCleanValue(a.value,v.stack100percent),E.setLink=pluck(a.link),E.anchorProps=this._parseAnchorProperties(e),v.maxRadius=mathMax(E.anchorProps.radius+E.anchorProps.borderThickness/2,v.maxRadius),g=E.anchorProps.radius+E.anchorProps.borderThickness/2,E.dragTolerance=S?(6>g?5.5:g+.5)+HTP:0,E.label=getValidValue(parseUnsafeString(d.tooltext||d.label)),E.showValue=pluckNumber(a.showvalue,v.showValues),E.dashed=pluckNumber(a.dashed,T),E.dashStyle=E.dashed?getDashStyle(v.linedashlen,v.linedashgap):'none',E.color=pluck(a.color,v.linecolor),E.setColor=a.color,E.setAlpha=a.alpha,E.setDashed=a.dashed,E.alpha=pluck(a.alpha,a.linealpha,v.linealpha),E.origLabel=getValidValue(parseUnsafeString(d.label)),null!==n&&(v.maxValue=mathMax(v.maxValue,n),v.minValue=mathMin(v.minValue,n)),E.setTooltext=parseUnsafeString(a.toolText),E.toolTipValue=t=k.dataLabels(n),E.setDisplayValue=l=parseUnsafeString(a.displayvalue),E.displayValue=pluck(l,t),E.formatedVal=c=E.toolTipValue,E.setTooltext=getValidValue(parseUnsafeString(pluck(a.tooltext,b.plottooltext,f.plottooltext))),E.valuePosition=pluck(a.valueposition,v.valueposition),E.valuePosition&&(E.valuePosition=E.valuePosition.toLowerCase()),u.showtooltip?null===c?r=!1:E.setTooltext===UNDEF?(u.seriesnameintooltip&&(s=getFirstValue(b&&b.seriesname)),r=s?s+_:'',r+=E.label?E.label+_:'',r+=E.setTooltext?'':E.toolTipValue):(i=[1,2,3,4,5,6,7],h={yaxisName:P,xaxisName:y,formattedValue:c,label:E.label},r=parseTooltext(E.setTooltext,i,h,a,f,b)):r=!1,E.toolText=r,E.setLevelTooltext=E.setTooltext,E._x=a.index===UNDEF?e:a.index,E._y=n,E.finalTooltext=E.setTooltext=r,E.hoverEffects=this._parseHoverEffectOptions(x,a),E.anchorProps.isAnchorHoverRadius=E.hoverEffects.anchorRadius,u.dragTolerance=mathMax(u.dragTolerance,v.maxRadius,E.hoverEffects.anchorRadius)}drawCommonElements(){var e,a,o,r,t,n,l,h,c=this,s=c.components.data,d=c.getFromEnv('chart'),g=c.config,p=d.config,m=c.getFromEnv('xAxis'),v=c.getFromEnv('yAxis'),u=g.scrollMinVal,b=g.scrollMaxVal,f=!p.drawfullareaborder,A=g.plotbordercolor,x=g.plotborderalpha,w=g.plotborderdashstyle,k=g.plotborderthickness,S=g.fillColor,E=c.getFromEnv('animationManager'),P={x:m.getLimit(),y:v.getLimit()},y=[],_=g.shadow,T=c.getContainer('shadowGroup'),R=m.getState('scrolling'),C=c.getSkippingInfo&&c.getSkippingInfo(),V=C&&C.draw||[],F=V.length,I=C&&C.skippingApplied;for(P.x.minPixel=m.getPixel(P.x.min),P.x.maxPixel=m.getPixel(P.x.max),P.y.minPixel=v.getPixel(P.y.min),P.y.maxPixel=v.getPixel(P.y.max),P.y.base=v.getPixel(0),P.x.base=m.getPixel(0),I&&(u=0,b=F),l=u;l<b;l++)(n=V[l]||l,s[n]&&s[n].config)&&(y[n]={config:{_Px:s[n].config._Px,_Pbx:s[n].config._Pbx,_Py:s[n].config._Py,_Pby:s[n].config._Pby,setValue:s[n].config.setValue}});h={begin:u,end:b},o=this.getLinePath(s,R?h:null,!c.getState('visible')&&'base'),r={path:o.getPathArr(),stroke:toRaphaelColor({color:A,alpha:x}),"stroke-width":f?0:k,"stroke-linecap":'round',fill:toRaphaelColor(S),"stroke-linejoin":k>MAX_MITER_LINEJOIN?'round':'miter',"stroke-dasharray":w},a=c.getGraphicalElement('lineElement'),e=E.setAnimation({el:a||'path',container:c.getContainer('commonElemsGroup'),attr:c.getState('visible')&&r,component:c,doNotRemove:!0,label:'line',callback:function(){c.getState('visible')||this.hide()}}),!a&&e&&c.addGraphicalElement('lineElement',e),c.getState('visible')&&e&&e.show(),c.getState('visible')&&!R&&e.shadow(_,T),R||(t=c.getGraphicalElement('connector'),f?t=c.addGraphicalElement('connector',E.setAnimation({attr:{path:o.getPathArr(),stroke:toRaphaelColor({color:A,alpha:x}),"stroke-width":k,"stroke-linecap":'round',"stroke-linejoin":k>MAX_MITER_LINEJOIN?'round':'miter',"stroke-dasharray":w},el:t||'path',container:c.getContainer('commonElemsGroup'),component:c,label:'line',callback:!c.getState('visible')&&function(){this.hide()}})):t&&E.setAnimation({attr:{},el:t,container:c.getContainer('commonElemsGroup'),component:c,label:'line',callback:function(){this.hide()}})),g.prevLim=P,g.prevDataStore=y,'realTimeUpdate'===d.state&&(c.realTimeUpdated=!0),p.connectnulldataOld=p.connectnulldata}parsePlotAttributes(e,a){var o,r,t,n,l,h,c,s,d,g,p,m=this,v=m.getJSONIndex(),u=m.getState('visible'),b=m.config,f=m.config.JSONData,A=a,i={},x={},w={};p=e.config,s=p._Px,d=p._Py,o=p._x,r=p._y,n=p.setLink,t=p.setValue,i=p.anchorProps,g=p.displayValue,c=p.hoverEffects,h=p.finalTooltext=p.toolText,p.eventArgs={index:A,link:n,value:t,displayValue:g,categoryLabel:p.origLabel,toolText:h,id:b.userID,datasetIndex:v||0,datasetName:f.seriesname,visible:u},l=i.symbol,e._xPos=s,e._yPos=d,e._xVal=o,e._yVal=r,e._index=A,null!==r&&null!==o?(p.eventArgs.x=o,p.eventArgs.y=r,c.enabled&&(w={path:polyPathToPath([c.anchorSides||2,s,d,c.anchorRadius,c.startAngle,c.dip]),fill:toRaphaelColor({color:c.anchorColor,alpha:c.anchorBgAlpha}),stroke:toRaphaelColor({color:c.anchorBorderColor,alpha:c.anchorBorderAlpha}),"stroke-width":c.anchorBorderThickness},x={path:polyPathToPath([l[1]||2,s,d,i.radius,i.startAngle,p.dip||0]),fill:toRaphaelColor({color:i.bgColor,alpha:i.bgAlpha}),stroke:toRaphaelColor({color:i.borderColor,alpha:i.borderAlpha}),"stroke-width":i.borderThickness},c.attrs={hoverEnabled:c.enabled,anchorRadius:i.radius,anchorHoverRadius:c.anchorRadius},c.attrs[SETROLLOVERATTR]=w,c.attrs[SETROLLOUTATTR]=x,i.isAnchorHoverRadius=c.attrs.anchorRadius),i.imageUrl&&(p.anchorImageLoaded=!1),p.props={element:{attr:{path:polyPathToPath([l[1]||2,s,d,i.radius,i.startAngle,p.dip||0]),fill:toRaphaelColor({color:i.bgColor,alpha:i.bgAlpha}),stroke:toRaphaelColor({color:i.borderColor,alpha:i.borderAlpha}),"stroke-width":i.borderThickness}}}):t&&(t.isNull=!0)}parseLabelAttributes(e,a){var o,r,t,n,l,h,c,s,d,g,p,m,v,u,b,f,A,x,w,k,S,E,P=this,y=P.getFromEnv('chart'),_=y.config,T=P.getFromEnv('smartLabel'),R=y.config.dataLabelStyle,C=P.components.data,V=_.stack100percent,F='',I=_.rotatevalues?270:0,L=_.canvasTop,D=_.canvasHeight,O=y.config.isstacked,H=a;return(v=e&&e.config,S=v&&v.setValue,e===UNDEF||S===UNDEF||null===S||!0===v.labelSkip)?void(v&&delete v.labelSkip):void(s=v.anchorProps,b=e._yPos||e.config._Py,u=e._xPos||e.config._Px,k=s.markerRadius||s.radius-3,o=_.valuepadding+2+k,d=v.valuePosition,'above'===d?g=0:'below'===d?g=1:(f=C[H-1]&&C[H-1].config||{},O&&V?(A=f.value,x=v.value):(A=f.setValue,x=v.setValue),g=H?A>x?1:0:0),F=v.displayValue,w=v.showValue,defined(F)&&''!==F&&null!==x&&w&&(E={text:F,fill:R.color,"text-bound":[R.backgroundColor,R.borderColor,R.borderThickness,R.borderPadding,R.borderRadius,R.borderDash]},r=T.getOriSize(F),v._state=v._state||{},I?(v._state.labelWidth=r.height,v._state.labelHeight=r.width,v._rotated=!0):(v._state.labelWidth=r.width,v._state.labelHeight=r.height,v._rotated=!1),t=n=v._state.labelHeight,t+=o,c=.5*n+o,p=b-L,m=L+D-b,l=b,h=u,t+=4,g?m>t?(l+=c,v._valueBelowPoint=1):p>t&&(l-=c,v._valueBelowPoint=0):p>t?(l-=c,v._valueBelowPoint=0):m>t&&(l+=c,v._valueBelowPoint=1),E.x=h,E.y=l),v.props=v.props||{},v.props.label={attr:E})}allocatePosition(){var e,a,o,r,t=this,n=t.config,l=t.getFromEnv('chart'),h=l.config,c=h.showpercentvalues,s=h.showpercentintooltip,d=t.components,g=d.data,p=t.getFromEnv('xAxis'),m=0,v=0,u=h.isstacked,b=+h.stack100percent,f=h.viewPortConfig.step||1,A=l.hasScroll,x=t.getSkippingInfo&&t.getSkippingInfo(),w=x&&x.labelDraw||[],k=x&&x.draw||[];for(a=d.animAttrs=[],t.calculateScrollRange(),!p.getState('scrolling')&&u&&(b||c||s)&&t.updateYForStack(),t.createCoordinates(),v=n.scrollMinVal;v<n.scrollMaxVal;v+=f)if(m=k[v]||v,!(A&&!h.skipAttr&&(m<o||m>r))){if(e=g[m],!e||!e.config){a[m]=UNDEF;continue}t.parsePlotAttributes(e,m)}for(1<f&&n.skipIgnorerIndices.map(e=>g[e]).filter(e=>e||e.config).forEach(e=>t.parsePlotAttributes(e,m)),v=n.scrollMinValForLabel;v<n.scrollMaxValForLabel;v+=f)m=w[v]||v,e=g[m],t.parseLabelAttributes(e,m)}drawPlot(e,a){let o,r,t,n=this,l=n.config,i=e.config,h=e.graphics,c=i.anchorProps,s=n.getState('visible'),d=c.radius,g=c.shadow,p=c.anchorAlpha,m=n.getContainer('plotGroup'),v=n.getContainer('shadowGroup'),u=n.getFromEnv('animationManager');null!==i._y&&null!==i._x?(c.imageUrl?n.drawAnchorImage(e):(o=h.element,t=h.image,t&&t.remove(),delete h.image,(l.drawanchors||d&&p)&&s&&null!==e.config.setValue?(o=h.element=u.setAnimation({el:o||'path',container:m,attr:i.props.element.attr,index:a,length:length,callback:function(){this.show()},component:n,label:'anchor'}),o.shadow(g,v)):o&&(n.__removeElem(h.element,'element'),delete h.element,o=UNDEF)),r=i.hoverEffects,o&&(r.enabled?o.data('hoverEnabled',r.attrs.hoverEnabled).data('anchorRadius',r.attrs.anchorRadius).data('anchorHoverRadius',r.attrs.anchorHoverRadius).data(SETROLLOVERATTR,r.attrs[SETROLLOVERATTR]).data(SETROLLOUTATTR,r.attrs[SETROLLOUTATTR]):o.data('hoverEnabled',!1),o.data(EVENTARGS,i&&i.eventArgs))):h.element&&(h.element=u.setAnimation({el:h.element,component:n}))}drawPlots(){var e,a,o,r=this,t=r.getFromEnv('chart'),n=t.config,l=r.components,h=r.config,c=l.data,s=0,d=0,g=l.animAttrs,p=h._oldStartIndex,m=h._oldEndIndex,v=r.getGraphicalElement('sharedAnchor'),u=n.viewPortConfig.step||1,b=r.getSkippingInfo&&r.getSkippingInfo(),f=b&&b.draw||[];for(g=l.animAttrs=[],a=h.scrollMinVal,o=h.scrollMaxVal,a>p&&r.flushOnScroll(p,a>m?m:a),o<m&&r.flushOnScroll(o<p?p:o,m),h._oldStartIndex=a,h._oldEndIndex=o,r.hideAllAnchors&&r.hideAllAnchors(),d=a;d<o;d+=u){if(s=f[d]||d,e=c[s],!e||!e.config){g[s]=UNDEF;continue}r.drawPlot(e,s)}1<u&&h.skipIgnorerIndices.map(e=>c[e]).filter(e=>e||e.config).forEach(e=>r.drawPlot(e,s)),s===0||h.drawanchors?v&&v.hide():v?v.hide():r.getAnchor()}drawAnchorImage(e){let a,o=this,r=o.getContainer('plotGroup'),t=e.graphics,n=o.getFromEnv('animationManager'),l=isVML?t.element:t.image,i=e.config.anchorProps,h=i.anchorAlpha&&i.radius,c=i.imageAlpha,s=o.getState('visible');s&&h?(!isVML&&(t.element=n.setAnimation({el:t.element||'path',container:r,attr:e.config.props.element.attr,label:'anchor',component:o}).show()),e.config.props.element.attr.opacity=.01*c,a=n.setAnimation({el:l||'image',container:r,component:o,label:'anchor',attr:{opacity:.01*c}}),isVML?t.element=a:t.image=a,l?a.attrs.src===i.imageUrl?a._.RefImg&&_imageDrawHelper(o,e):a.attr('src',i.imageUrl):(a.on('load',o._onAnchorImageLoad(e)),a.attr('src',i.imageUrl)),a.show()):(t.image&&n.setAnimation({el:t.image,state:'disappearing',component:o,doNotRemove:!0,callback:function(){this.hide()}}),t.element&&n.setAnimation({el:t.element,state:'disappearing',component:o,doNotRemove:!0,callback:function(){this.hide()}}))}getLineSegment(e,a,o){let r=this,t=a._Px,n=a._Py,l=a._Pbx,i=a._Pby,h=r.getFromEnv('yAxis'),c=h.getPixel(0),s=a.setValue,d=r.getFromEnv('chart').config.connectnulldata;return'zero'===o?(n=c,i=c):'base'==o&&(n=a._Pby),null===s||s.isNull?!d&&(0<e.pointsJoined&&(e.path2Arr[e.path2Arr.length-1]!==Z&&i!==UNDEF&&e.path2Arr.push(Z),e.pathArr=e.pathArr.concat(e.path2Arr),e.path2Arr=[]),e.temp=[],e.temp2=[],e.lastValidValue=!1):e.lastValidValue?(e.temp.length&&(e.pathArr=e.pathArr.concat(e.temp),l!==UNDEF&&(e.path2Arr=e.temp2,e.temp2=[]),e.temp=[],e.pointsJoined++),e.pathArr.push([L,t,n]),i!==UNDEF&&e.path2Arr.unshift([L,t,i])):(e.temp.push([M,t,n]),i!==UNDEF&&e.temp2.push([L,l,i]),e.pointsJoined=0,e.lastValidValue=!0),e}getLinePath(e,a,o){var r,t,n,l,h,c,s,d,g,p,m=this,v=m.getFromEnv('chart'),u=v.config,b=e.length,f=a&&a.begin||0,A=m.getState('visible')?a&&a.end||b:0,x=u.viewPortConfig.step||1,w=m.removeDataLen||0,k=[],S=m.getSkippingInfo&&m.getSkippingInfo(),E=S&&S.draw||[],P=E.length,y=S&&S.skippingApplied,_=m.config.skipIgnorerIndices,T=[],R={},C=0;for(w=0,k=k.concat(e),y&&(f=0,A=P),t=f+w;t<A+w;t+=x)if(r=E[t]||t,h=k[r],!!h){if(n=h.config,c=n.setValue,c===UNDEF||n&&!0===n.isSkipped){n&&delete n.isSkipped;continue}if(1<x)for(;_[C]<t;)if(d=k[_[C]],!!d){if(g=d.config,p=g.setValue,p===UNDEF||g&&!0===g.isSkipped){g&&delete g.isSkipped;continue}T=T.concat(g),C++}T=T.concat(n),l=n._Pby,s=t}if(1<x)for(r=s+1;r<=t;r++)if(h=k[E[r]||r],!!h){if(n=h.config,c=n.setValue,c===UNDEF||n&&!0===n.isSkipped){n&&delete n.isSkipped;continue}_.includes(r)&&(T=T.concat(n),l=n._Pby)}return R=T.reduce((e,a)=>m.getLineSegment(e,a,o),{temp:[],temp2:[],pathArr:[],path2Arr:[],pointsJoined:0,lastValidValue:!1,getPathArr}),R.path2Arr[R.path2Arr.length-1]!==Z&&0<R.pointsJoined&&l!==UNDEF&&R.path2Arr.push(Z),R}_removeDataVisuals(e){var a,o,r,t,n=this,l=n.components.pool||(n.components.pool={});if(e)for(o in r=e.graphics,r)a=l[o]||(l[o]=[]),t=r[o],t.hide&&'function'==typeof t.hide&&(t.attr({"text-bound":[]}),t.hide(),t.shadow&&t.shadow(!1)),a.push(r[o])}_parseAnchorProperties(e,a){var o,r,t,n=this,l=n.config,i=n.getName(),h=n.getFromEnv('chart'),c=h.config.anchoralpha,s=!h.config.anchoralpha&&/area/ig.test(i)?0:1,d=l.JSONData,g=h.getFromEnv('dataSource').chart,p=a||d.data||[],m=p[e]||{},v={};return r=pluck(m.anchorstartangle,d.anchorstartangle,g.anchorstartangle,m.anchorimagealpha,d.anchorimagealpha,g.anchorimagealpha,m.anchorimagescale,d.anchorimagescale,g.anchorimagescale,m.anchorimagepadding,d.anchorimagepadding,g.anchorimagepadding,m.anchorimageurl,d.anchorimageurl,g.anchorimageurl,m.anchorradius,d.anchorradius,g.anchorradius,m.anchorbgcolor,d.anchorbgcolor,g.anchorbgcolor,m.anchorbordercolor,d.anchorbordercolor,g.anchorbordercolor,m.anchoralpha,d.anchoralpha,g.anchoralpha,m.anchorsides,d.anchorsides,g.anchorsides,m.anchorborderthickness,d.anchorborderthickness,g.anchorborderthickness,UNDEF)!==UNDEF,t=pluckNumber(m.drawanchors,l.drawanchors),v.enabled=r?pluckNumber(t,r):pluckNumber(t,s),v.startAngle=pluckNumber(m.anchorstartangle,l.anchorstartangle),v.imageAlpha=pluckNumber(m.anchorimagealpha,l.anchorimagealpha),v.imageScale=pluckNumber(m.anchorimagescale,l.anchorimagescale),v.imagePadding=pluckNumber(m.anchorimagepadding,l.anchorimagepadding),0>v.imagePadding&&(v.imagePadding=0),v.imageUrl=pluck(m.anchorimageurl,l.anchorimageurl),v.imageUrl&&l.imageCount++,v.radius=v.enabled?pluckNumber(m.anchorradius,l.anchorradius):0,v.isAnchorRadius=pluck(m.anchorradius,d.anchorradius,g.anchorradius),v.bgColor=pluck(m.anchorbgcolor,l.anchorbgcolor),c=v.enabled?getFirstAlpha(pluck(m.anchoralpha,l.anchoralpha,v.enabled?HUNDREDSTRING:'0')):0,v.anchorAlpha=c,v.bgAlpha=getFirstAlpha(pluck(m.anchorbgalpha,l.anchorbgalpha,c))*c/100,v.imageAlpha=v.imageAlpha*c/100,v.borderColor=pluck(m.anchorbordercolor,l.anchorbordercolor),v.borderAlpha=c,v.sides=pluck(m.anchorsides,l.anchorsides),v.borderThickness=pluck(m.anchorborderthickness,l.anchorborderthickness),v.symbol=mapSymbolName(v.sides).split('_'),o=pluckNumber(m.anchorshadow,l.anchorshadow)&&1<=v.radius,v.shadow={opacity:o?c/100:0},v}_hideGraphics(e){var a,o,r=this;for(o in e)if(e.hasOwnProperty(o)){if(a=e[o],!a)continue;a.hide?a.hide():r._hideGraphics(a)}}_parseHoverEffectOptions(e,a){var o=this,r=o.config.JSONData,t=o.getFromEnv('chart'),n=t.getFromEnv('dataSource').chart,l=t.config,i=e.config,h=o.config,c=i.anchorProps||{},s=l.plothovereffect,d=h.drawanchors,g={enabled:!1};return a=a||{},0!==s&&0!==d&&(g.enabled=pluck(a.hovercolor,a.anchorhovercolor,a.hovercolor,r.hovercolor,a.anchorbghovercolor,r.anchorbghovercolor,n.anchorbghovercolor,r.anchorhovercolor,n.anchorhovercolor,a.hoveralpha,a.anchorhoveralpha,r.anchorhoveralpha,n.anchorhoveralpha,a.bghoveralpha,a.anchorbghoveralpha,r.anchorbghoveralpha,n.anchorbghoveralpha,a.anchorborderhovercolor,a.borderhovercolor,r.anchorborderhovercolor,n.anchorborderhovercolor,a.anchorborderhoverthickness,a.borderhoverthickness,r.anchorborderhoverthickness,n.anchorborderhoverthickness,a.anchorborderhoveralpha,a.borderhoveralpha,r.anchorborderhoveralpha,n.anchorborderhoveralpha,a.hoverdip,a.anchorhoverdip,r.anchorhoverdip,n.anchorhoverdip,a.anchorhoverstartangle,r.anchorhoverstartangle,n.anchorhoverstartangle,a.hoversides,a.anchorhoversides,r.anchorhoversides,n.anchorhoversides,a.hoverradius,a.anchorhoverradius,r.anchorhoverradius,n.anchorhoverradius,r.plotfillhovercolor,n.plotfillhovercolor,l.plothovereffect,UNDEF)!==UNDEF,g.startAngle=pluckNumber(a.anchorhoverstartangle,r.anchorhoverstartangle,n.anchorhoverstartangle,c.startAngle),g.anchorSides=pluckNumber(a.hoversides,a.anchorhoversides,r.anchorhoversides,n.anchorhoversides,c.sides),g.anchorRadius=pluckNumber(a.anchorhoverradius,r.anchorhoverradius,n.anchorhoverradius),g.isAnchorHoverRadius=g.anchorRadius,g.anchorRadius=pluckNumber(g.anchorRadius,c.radius+(s?2:0)),g.anchorScale=pluck(a.hoverscale,r.anchorscale,n.anchorscale),g.imageHoverScale=pluckNumber(a.anchorimagehoverScale,r.anchorimagehoverscale,n.anchorimagehoverscale,110),g.imageHoverAlpha=pluckNumber(a.anchorimagehoveralpha,r.anchorimaghoverealpha,n.anchorimagehoveralpha),g.anchorAlpha=pluck(a.anchorhoveralpha,a.hoveralpha,r.anchorhoveralpha,n.anchorhoveralpha,c.anchorAlpha),g.anchorColor=getFirstColor(pluck(a.hovercolor,a.anchorhovercolor,a.hoverColor,a.anchorbghovercolor,r.anchorbghovercolor,r.anchorhovercolor,r.hovercolor,n.anchorbghovercolor,n.anchorhovercolor,n.plotfillhovercolor,c.bgColor)),g.anchorBgAlpha=pluck(a.bghoveralpha,a.anchorbghoveralpha,r.anchorbghoveralpha,n.anchorbghoveralpha,n.plotfillhoveralpha,c.bgAlpha),g.anchorBgAlpha=g.anchorBgAlpha*g.anchorAlpha/100,g.anchorBorderColor=pluck(a.borderhovercolor,a.anchorborderhovercolor,r.anchorborderhovercolor,n.anchorborderhovercolor,c.borderColor),g.anchorBorderAlpha=pluck(a.borderhoveralpha,a.anchorborderhoveralpha,r.anchorborderhoveralpha,n.anchorborderhoveralpha,g.anchorAlpha,c.borderAlpha),g.anchorBorderThickness=pluckNumber(a.borderhoverthickness,a.anchorborderhoverthickness,r.anchorborderhoverthickness,n.anchorborderhoverthickness,n.anchorBorderThickness,c.borderThickness),g.dip=pluck(a.hoverdip,a.anchorhoverdip,r.anchorhoverdip,n.anchorhoverdip,c.dip),g.anchorAnimation=pluckNumber(a.anchorhoveranimation,r.anchorhoveranimation,n.anchorhoveranimation,1)),g}_hoverPlotAnchor(e,a){var o,r,t,n,l,i,h=this,c=h.getFromEnv('smartLabel'),s=h.getFromEnv('chart').getChildren('canvas')[0],d=s.getEffectiveDimensions(),g=d.top,p=g+d.height,m=e.config._Py,v=h.getFromEnv('animationManager'),u=h.getGraphicalElement('sharedAnchor'),b=e.graphics.element||u,f=e.graphics.label,A=e.config||{},x=A.anchorProps.anchorAlpha,w=A&&A.anchorProps.imageUrl,k=isVML&&w?e.graphics.element:e.graphics.image,S='image'===b.type,E=b.data('anchorRadius'),P=b.data('anchorHoverRadius'),y=b.data(SETROLLOVERATTR),_=b.data(SETROLLOUTATTR),T=f&&(f.data('isBelow')?1:-1)*(S?.5*(y.height-_.height):P-E),R=a===ROLLOVER?y:_,C=!0,V={path:R.path},F={fill:R.fill,"stroke-width":R['stroke-width'],stroke:R.stroke},I=f&&f.data('rotation')||'';r=c.getOriSize(A.displayValue),o=r.height,m-3*o/2+T<g?T=g-m+3*o/2:m+3*o/2+T>p&&(T=p-m-3*o/2),i={transform:'T0,'+(a===ROLLOVER?T:0)+I},v.setAnimationState(a===ROLLOVER?MOUSEOVER:MOUSEOUT),k&&(n=k.data(SETROLLOVERATTR),l=k.data(SETROLLOUTATTR),t=a==ROLLOVER?n:l,t.alpha*=.01),S?V.alpha*=.01:Object.assign(V,F),(a!==ROLLOVER||P)&&(a!==ROLLOUT||E)||(C=!1),v.setAnimation({el:b,label:'anchor',component:h,doNotRemove:!0,callback:function(){C||b.hide()},attr:C&&V}),C&&b.show(),k&&(v.setAnimation({el:k,label:'anchor',component:h,attr:C&&t}),C&&k.show()),(e.graphics&&e.graphics.element||u&&u.element)&&x&&1&&f&&v.setAnimation({el:f,label:'label',component:h,doNotRemove:!0,attr:i})}drawLabel(e,a){var o,r,t,n,l,h,c,s,d,g,p,m,v,u,b=this,f=b.getFromEnv('chart'),A=f.config,x=b.getFromEnv('smartLabel'),w=f.config.dataLabelStyle,k=b.components.data,S=b.getFromEnv('paper'),E=b.getFromEnv('animationManager'),P='',y=A.rotatevalues?270:0,_=b.getContainer('labelGroup'),T=b.getState('visible'),R=k.length,C=b.getSkippingInfo&&b.getSkippingInfo(),V=C&&C.skippingApplied,F=C&&C.labelDraw||[],I=F.length,L=pluckNumber(e,0),D=pluckNumber(a,V?I:R),O=I===Math.abs(D-(L+1));for(c={"font-weight":w.fontWeight,"font-style":w.fontStyle,"font-family":w.fontFamily,"font-size":w.fontSize,"line-height":w.lineHeight},x.setStyle(c),g=L;g<D;g++){if(d=V&&O?F[g]:g,s=k[d],n=s&&s.config,p=n&&n.setValue,s===UNDEF||p===UNDEF||null===p||!0===n.labelSkip){n&&delete n.labelSkip,v=s&&s.graphics,v&&v.label&&(v.label=E.setAnimation({el:v.label,component:b}));continue}o=s.graphics,P=n.displayValue,l=n.showValue,h=o.label,m=n.props.label.attr,u=defined(P)&&l&&T,u?(t=n.props.label.attr.x,r=n.props.label.attr.y,m.transform=S.getSuggestiveRotation(y,t,r),o.label=h=E.setAnimation({el:h||'text',container:_,component:b,attr:m,label:'label'}),h.data('isBelow',n._valueBelowPoint),h.data('rotation',m.transform)):h&&(o.label=E.setAnimation({el:h,component:b,label:'label'}))}}getAxisValuePadding(){return this.config.defaultPadding}_hoverFunc(e,a,o,r){if(o)return this._hoverPlotAnchor(e,a,r)}_onAnchorImageLoad(e){let a=this;return function(){let o=e._index;_imageDrawHelper(a,e),a.config.drawn?a.drawLabel(o,o+1):a.addJob(LABELUPDATEONIMAGELOADID+o,function(){a.drawLabel(o,o+1)},priorityList.label)}}}export default AreaDataset;