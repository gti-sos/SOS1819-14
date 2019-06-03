import{pluck,pluckNumber,getValidValue,getDashStyle,getFirstColor,parseUnsafeString,preDefStr,parseTooltext}from'../../../../fc-core/src/lib';import ErrorBar2DDataset from'../../dataset/errorbar2d';import{addDep}from'../../../../fc-core/src/dependency-manager';import candlestickAnimation from'./candlestick.animation';import{_removePlots}from'../../../../fc-charts/src/dataset/column';let UNDEF,colorStrings=preDefStr.colors,COLOR_B90000=colorStrings.B90000,COLOR_FFFFFF=colorStrings.FFFFFF,BLANKSTRING='',DASH_DEF='none',POINTER='pointer',DEFAULT_CURSOR='default',SHOWSHADOW='showShadow',ROLLOVER='DataPlotRollOver',ROLLOUT='DataPlotRollOut',LINE='line',BOLDSTARTTAG='<b>',BOLDENDTAG='</b>',BLANKSPACE=' ',BREAKSTRING='<br />',_firePlotEvent=function(a,b,c){var d,e,f,g=this,h=g.getFromEnv('chart'),i=g.components,j=i.data,k=j[b],l=g.config.currentToolTip,m=k.graphics.element,n=c.originalEvent,o=h.getFromEnv('paper').canvas.style,p=g.getFromEnv('toolTipController');m&&(e=k.config,d=e.toolText,f=e.setLink,'fc-mouseover'===a?(d&&(l?p.draw(n,d,l):l=g.config.currentToolTip=p.draw(n,d)),h.plotEventHandler(m,c,ROLLOVER),f&&(o.cursor=POINTER)):'fc-mouseout'===a?(p.hide(l),h.plotEventHandler(m,c,ROLLOUT),f&&(o.cursor=DEFAULT_CURSOR)):'fc-click'===a?h.plotEventHandler(m,c):'fc-mousemove'===a?d&&(l?p.draw(n,d,l):l=g.config.currentToolTip=p.draw(n,d)):void 0)},getPlotIndices=function(a){var b,c,d=this,e=Math.floor(a),f=Math.ceil(a),g=[],h=d.config.JSONData&&d.config.JSONData.data;for(b=h.length;b--;)c=h[b],c.x>=e&&c.x<=f&&g.push(b);return g},__parseToolText=function(a){var b,c=this,d=c.config,e=d.JSONData.data,f=c.components.data,g=c.getFromEnv('xAxis'),h=c.getFromEnv('chart-attrib'),i=d.plotType===LINE?1:0,j=e[a],k=f[a].config,l=g.getLabel(k.x).label,m=k.open,n=k.close,o=c.getFromEnv('yAxis'),p=k.high,q=k.low,r=k.volume,s=r===UNDEF?UNDEF:j.volumetooltext;return d.showTooltip?(b=getValidValue(parseUnsafeString(pluck(s,j.tooltext,d.volumeToolText,d.toolText))),b===UNDEF?(b=null===m||i?'':'<b>Open:</b> '+o.dataLabels(m)+BREAKSTRING,b+=null===n?'':'<b>Close:</b> '+o.dataLabels(n)+BREAKSTRING,b+=null===p||i?'':'<b>High:</b> '+o.dataLabels(p)+BREAKSTRING,b+=null===q||i?'':'<b>Low:</b> '+o.dataLabels(q)+BREAKSTRING,b+=null===r?'':'<b>Volume:</b> '+o.dataLabels(r)):b=parseTooltext(b,[3,5,6,10,54,55,56,57,58,59,60,61,81,82],{label:l,yaxisName:parseUnsafeString(h.yaxisname),xaxisName:parseUnsafeString(h.xaxisname),openValue:j.open,openDataValue:o.dataLabels(m),closeValue:j.close,closeDataValue:o.dataLabels(n),highValue:j.high,highDataValue:o.dataLabels(p),lowValue:j.low,lowDataValue:o.dataLabels(q),volumeValue:j.volume,volumeDataValue:o.dataLabels(r)},j,h)):b='',b};addDep({name:'candlestickAnimation',type:'animationRule',extension:candlestickAnimation});class CandleStickDataset extends ErrorBar2DDataset{trimData(a){if(!(!this.components&&this.components.data&&this.components.data.length)){let b=this,c=b.components,d=c&&c.data,e=d&&d.length,f=a.data,g=Array.isArray(f)&&f.filter(a=>a.high||a.open||a.close||a.low).length||0,h=e-g;0<h&&this.removeData(g,h,!1)}}removePlots(){var a=this,b=a.components,c=b&&b.removeDataArr;_removePlots(c,a.__removeElem)}configureAttributes(a){var b=Math.min,c=Math.max,d=Math.abs;if(!a)return!1;this.trimData(a),this.config.JSONData=a;var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,y,z,A,B=this,C=B.config,D=B.getFromEnv('chart'),E=D.getFromEnv('dataSource'),F=B.config.JSONData,G=F.data||[],H=E.chart,I=G.length,J=B.getFromEnv('number-formatter'),K=B.getFromEnv('color-manager'),L=C.bearBorderColor=getFirstColor(pluck(H.bearbordercolor,COLOR_B90000)),M=C.bearFillColor=getFirstColor(pluck(H.bearfillcolor,COLOR_B90000)),N=C.bullBorderColor=getFirstColor(pluck(H.bullbordercolor,K.getColor('canvasBorderColor'))),O=C.bullFillColor=getFirstColor(pluck(H.bullfillcolor,COLOR_FFFFFF)),P=C.linethickness=C.plotBorderThickness=pluckNumber(H.plotlinethickness,1),Q=C.plotLineDashLen=pluckNumber(H.plotlinedashlen,5),R=C.plotLineDashGap=pluckNumber(H.plotlinedashgap,4),S=!1,T=-Infinity,U=+Infinity,V=-Infinity,W=+Infinity;for(B.setState('visible',1===pluckNumber(F.visible,1)),B._conatinerHidden=!!B.getState('visible'),C.defaultPadding={left:.5,right:.5},C.parentYAxis=0,C.toolText=getValidValue(parseUnsafeString(pluck(F.tooltext,H.plottooltext))),C.name=getValidValue(F.seriesname),C.showTooltip=pluck(H.showtooltip,1),C.showShadow=pluckNumber(H.showshadow,K.getColor(SHOWSHADOW)),C.showErrorValue=!0,C.errorBarWidthPercent=0,S=!0,A=pluck(H.maxcolwidth),C.maxColWidth=d(pluckNumber(A,50))||1,z=c(pluckNumber(H.plotspacepercent,20)%100,0),C.plotSpacePercent=C.groupPadding=z/200,v=B.components.data=B.components.data||(B.components.data=[]),C.valuePadding=pluckNumber(F.valuepadding,H.valuepadding,2),C.plotBorderThickness=P,i=0;i<I;i+=1)w=G[i],j=v[i],j||(j=v[i]={}),j.config||(j.config={}),j.graphics||(j.graphics={}),y=j.config,w&&!w.vline&&(y.setLink=pluck(w.link),k=y.open=J.getCleanValue(w.open),l=y.close=J.getCleanValue(w.close),m=y.high=J.getCleanValue(w.high),n=y.low=J.getCleanValue(w.low),o=y.volume=J.getCleanValue(w.volume,!0),null!==o&&(D.config.drawVolume=!0),r=y.x=J.getCleanValue(w.x),s=y.closeVal=b(k,l),u=y.yVal=c(k,l),p=b(k,l,m,n),q=c(k,l,m,n),f=getFirstColor(pluck(w.bordercolor,l<k?L:N)),g=pluckNumber(w.alpha,100),e=getFirstColor(pluck(w.color,l<k?M:O)),y.plotBorderDashStyle=pluckNumber(w.dashed)?getDashStyle(Q,R):DASH_DEF,h={opacity:C.showShadow?g/100:0},y.color=S?e:f,y.alpha=g,y.setColor=y.color,y.setAlpha=y.alpha,y.anchorImageUrl=pluck(w.anchorimageurl,F.anchorimageurl,H.anchorimageurl),t=y.borderColor=f,y.borderAlpha=y.plotLineAlpha,y.colorArr=[{color:y.color,alpha:y.alpha},{color:y.borderColor,alpha:y.borderAlpha}],y.showValue=1,y.hoverEffects={},y.y=d(l-k),y.previousY=s,y.link=pluck(w.link),y.errorValueArr=[],0<m-u&&(y.errorValue=!0,y.errorValueArr.push({errorValue:u-m,errorStartValue:u,errorBarColor:t,errorBarThickness:P,opacity:1})),0>n-s&&(y.errorValue=!0,y.errorValueArr.push({errorValue:s-n,errorStartValue:s,errorBarColor:t,errorBarThickness:P,opacity:1})),y.setValue=u,null!==p&&(T=c(T,p),U=b(U,p)),null!==q&&(T=c(T,q),U=b(U,q)),null!==r&&(V=c(V,r),W=b(W,r)),r=null===r?i+1:r,y._x=r,y._y=u,y._b=s,y.high=c(k,l,m,n),y.low=b(k,l,m,n),y.shadow=h,y.toolText=B._parseToolText(i),y.toolTipValue='',y.displayValue=parseUnsafeString(pluck(w.displayvalue,w.valuetext,BLANKSTRING)));C.yMax=T,C.yMin=U,C.xMax=V,C.xMin=W,B.setState('dirty',!0)}_parseToolText(a){return __parseToolText.call(this,a)}calculateScrollRange(){let a=this,b=a.config,c=a.components.data&&a.components.data.length;b.scrollMinVal=b.scrollMinValForLabel=0,b.scrollMaxVal=b.scrollMaxValForLabel=c}getPlotIndices(a){return getPlotIndices.call(this,a)}_getHoveredPlot(a,b){var c,d,e,f,g,h=this,j=h.getFromEnv('xAxis');for(c=j.getValue(a),f=h.getPlotIndices(c),d=f.length-1;-1<d&&(g=f[d],e=0<g-c?h._checkPointerOverPlot(g,a,b)||h._checkPointerOverPlot(g-1,a,b):h._checkPointerOverPlot(g+1,a,b)||h._checkPointerOverPlot(g,a,b),!e);d--);return e}_firePlotEvent(a,b,c){_firePlotEvent.call(this,a,b,c)}getDataLimits(){var a=this.config;return{max:a.yMax,min:a.yMin,xMax:a.xMax,xMin:a.xMin}}getName(){return'candlestick'}}export default CandleStickDataset;export{getPlotIndices,_firePlotEvent,__parseToolText as _parseToolText};