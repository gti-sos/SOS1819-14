import{getValidValue,toRaphaelColor,isIE,extend2,pluck,pluckNumber,hasSVG}from'../../../../fc-core/src/lib';import ScatterBase from'../../../../fc-charts/src/chart/_internal/scatterbase';import SelectScatterDataset from'../../dataset/selectscatter';import{getDep}from'../../../../fc-core/src/dependency-manager';import{submitData}from'../_internal/editable-charts';import raphaelShapesButton from'../../../../fc-core/src/_internal/redraphael/redraphael-shapes/redraphael-shapes.button';let UNDEF,Raphael=getDep('redraphael','plugin'),COMMA=',',configStr='config',TRACKER_FILL='rgba(192,192,192,'+(isIE?.002:1e-6)+')',VISIBLE='visible',HIDDEN='hidden',ROUND='round',POINTER='pointer',deg2rad=Math.PI/180,getArcPath=function(a,b,c,d,e,f){return['A',c,d,0,f,e,a,b]},M='M',L='L',Z='Z',t='t';raphaelShapesButton(Raphael);function createSelectionBox(a){var b,c=a.chart,d=c.getFromEnv('paper'),e=c.config,f=c.getChildren('yAxis')[0],g=c.getChildren('xAxis')[0],h=a.selectionLeft,i=a.selectionTop,j=a.selectionWidth,k=a.selectionHeight,l=h+j,m=i+k,n=j>15&&k>15,o={resizeEleRadius:15,canvasTop:e.canvasTop,canvasRight:e.canvasLeft+e.canvasWidth,canvasLeft:e.canvasLeft,canvasBottom:e.canvasTop+e.canvasHeight},p=c.getChildContainer('trackerGroup'),q=e._selectEleArr||(e._selectEleArr=[]);o.index=q.length,o.id='SELECT_'+o.index,o.selectBoxG=b=d.group('selection-box',p).toFront(),o.selectBoxTracker=d.rect(h,i,j,k,b).attr({"stroke-width":1,stroke:toRaphaelColor(e.selectBorderColor),fill:e.selectFillColor}).css({cursor:'move'}),o.selectBoxTracker.node._isTrackerElem=!0,o.selectBoxTracker.data(configStr,{position:6,selectEleObj:o,chart:c,xChange:!0,yChange:!0}),o.topTracker=d.rect(h,i-6,j,12,b).attr({"stroke-width":0,fill:TRACKER_FILL}).css('cursor',hasSVG&&'ns-resize'||'n-resize'),o.topTracker.node._isTrackerElem=!0,o.topTracker.data(configStr,{position:1,selectEleObj:o,yChange:!0,chart:c}),o.rightTracker=d.rect(h+j-6,i,12,k,b).attr({"stroke-width":0,fill:TRACKER_FILL}).css('cursor',hasSVG&&'ew-resize'||'w-resize'),o.rightTracker.node._isTrackerElem=!0,o.rightTracker.data(configStr,{position:2,chart:c,selectEleObj:o,xChange:!0}),o.bottomTracker=d.rect(h,i+k-6,j,12,b).attr({"stroke-width":0,fill:TRACKER_FILL}).css('cursor',hasSVG&&'ns-resize'||'n-resize'),o.bottomTracker.node._isTrackerElem=!0,o.bottomTracker.data(configStr,{position:3,chart:c,selectEleObj:o,yChange:!0}),o.leftTracker=d.rect(h-6,i,12,k,b).attr({"stroke-width":0,fill:TRACKER_FILL}).css('cursor',hasSVG&&'ew-resize'||'e-resize'),o.leftTracker.node._isTrackerElem=!0,o.leftTracker.data(configStr,{position:4,chart:c,selectEleObj:o,xChange:!0}),o.cornerInnerSymbol=d.symbol('resizeIcon',0,0,15,b).attr({transform:t+l+COMMA+m,"stroke-width":1,visibility:n?VISIBLE:HIDDEN,stroke:'#999999'}),o.cornerInnerSymbol.node._isTrackerElem=!0,o.cornerOuterSymbol=d.symbol('resizeIcon',0,0,-12,b).attr({transform:t+l+COMMA+m,strokeWidth:1,visibility:n?HIDDEN:VISIBLE,stroke:'#777777'}),o.cornerOuterSymbol.node._isTrackerElem=!0,o.resizeTracker=d.circle(l,m,12,b).attr({"stroke-width":1,stroke:TRACKER_FILL,fill:TRACKER_FILL}).css('cursor',hasSVG&&'nwse-resize'||'nw-resize'),o.resizeTracker.node._isTrackerElem=!0,o.resizeTracker.data(configStr,{position:5,chart:c,selectEleObj:o,yChange:!0,xChange:!0}),o.closeButton=d.symbol('closeIcon',0,0,6,b).attr({transform:'t'+l+COMMA+i,"stroke-width":2,stroke:e.selectionCancelButtonBorderColor,fill:e.selectionCancelButtonFillColor,"stroke-linecap":ROUND,"stroke-linejoin":ROUND}).css({cursor:POINTER,_cursor:'hand'}).on('fc-click',function(){c.deleteSelection(this,c)}),o.closeButton.node._isTrackerElem=!0,o.closeButton.data(configStr,{chart:c,index:o.index}),o.startX=g.getValue(h),o.startY=f.getValue(i),o.endX=g.getValue(l),o.endY=f.getValue(m),o.isVisible=!0,q.push(o),c.bindDragEvent(o)}function deleteSelection(a,b){var c,d,e,f,g,h,i=a.data(configStr).index,j=b.config._selectEleArr,k=b.getChildren('xAxis')[0],l=b.getChildren('yAxis')[0];for(f in c=j.find(function(a){return a.index===i}),d=c.selectBoxTracker,g=d.getBBox(),h={selectionLeft:g.x,selectionTop:g.y,selectionWidth:g.width,selectionHeight:g.height,startXValue:k.getValue(g.x,1),startYValue:l.getValue(g.y,1),endXValue:k.getValue(g.x+g.width,1),endYValue:l.getValue(g.y+g.height,1),data:b.getCollatedData(),id:c.id},c)c.hasOwnProperty(f)&&(e=c[f],e.remove&&e.remove(),delete c[f]);j=j.filter(a=>Object.keys(a).length),b.fireChartInstanceEvent('selectionRemoved',h)}Raphael.addSymbol({resizeIcon:function(a,b,c){var d,e=pluckNumber(c,15)/3,f=[];for(0>e&&(e=-e,c=-c,a+=c-e/2,b+=c-e/2),d=3;0<d;d-=1)f.push(M,a-e*d,b-3,L,a-3,b-e*d);return f},closeIcon:function(a,b,c){var d,e=Math.sin,f=Math.cos,g=a,h=b,i=1.3*c,j=43*deg2rad,k=48*deg2rad,l=g+i*f(j),m=h+i*e(j),n=g+i*f(k),o=h+i*e(k),p=.71*(c-2),q=.71*(c-2),r=getArcPath(n,o,i,i,0,1);return d=[M,l,m],d=d.concat(r),d=d.concat([M,a+p,b-q,L,a-p,b+q,M,a-p,b-q,L,a+p,b+q]),d},configureIcon:function(a,b,c){--c;var d,e=.5,f=.25,g=.71*c,h=.71*(c+2),i=a-c,j=b-c,k=a+c,l=b+c,m=a+e,n=b+e,o=a-e,p=b-e,q=i-2,s=j-2,t=k+2,u=l+2,v=a+g,w=b+g,x=a-g,y=b-g,z=a+h,A=b+h,B=a-h,C=b-h;return d=[M,i,n,L,q,n,q,p,i,p,x-f,y+f,B-f,C+f,B+f,C-f,x+f,y-f,o,j,o,s,m,s,m,j,v-f,y-f,z-f,C-f,z+f,C+f,v+f,y+f,k,p,t,p,t,n,k,n,v+f,w-f,z+f,A-f,z-f,A+f,v-f,w+f,m,l,m,u,o,u,o,l,x+f,w+f,B+f,A+f,B-f,A-f,x-f,w-f,Z],d},axisIcon:function(a,b,c){--c;var d,e=.33*c,f=c/2,g=a-c,h=b-c,i=a+f,j=b+c,k=a-f,l=b+e,m=b-e;return d=[M,g,h,L,i,h,i,j,g,j,M,k,l,L,i,l,M,k,m,L,i,m],d},loggerIcon:function(a,b,c){--c,a-=c,b-=c;var d,e=2*c,f=a+e,g=a+2,h=f-2,i=b+2,j=i+c,k=j+2;return d=[M,a,b,L,f,b,f,i,h,i,h,j,f,j,f,k,a,k,a,j,g,j,g,i,a,i,a,b],d}});class SelectScatter extends ScatterBase{static getName(){return'SelectScatter'}parseChartAttr(a){super.parseChartAttr(a),this.config.formBtnTitle=pluck(a.chart.submittext,a.chart.formbtntitle,'Submit'),this.config.restoreBtnTitle=pluck(a.chart.restoretext,a.chart.restorebtntitle,'Restore')}constructor(){super(),this.isXY=!0,this.defaultZeroPlaneHighlighted=!1,this.eiMethods={getData:function(a){var b=this.apiInstance;return b&&b.getData(a)},restoreData:function(){var a=this.apiInstance;return a&&a.restoreData()},submitData:function(){var a=this.apiInstance;return a&&a.submitData()}}}getName(){return'SelectScatter'}configureAttributes(a){var b=this,c=b.getFromEnv('chart').config,d=b.getFromEnv('dataSource').chart||{};c.formAction=getValidValue(d.formaction),c.enableSubmit=pluckNumber(d.enablesubmit,d.showformbtn,1)&&c.formAction,c.enableRestore=pluckNumber(d.enablerestore,d.showrestorebtn,1),super.configureAttributes(a)}__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.friendlyName='Dragable Scatter Chart',a.hasLegend=!0,a.defaultDatasetType='selectScatter',a.allowreversexaxis=!0,a.enablemousetracking=!0}_createToolBox(){super._createToolBox();var a,b=this,c=b.getFromEnv('chartConfig'),d=b.getFromEnv('toolbar'),e=d.getChild(`hamburgerMenu-${d.getId()}-${b.getId()}-0`),f=[];c.enableRestore&&f.push({name:c.restoreBtnTitle,handler:function(){b.restoreData()},action:'click'}),c.enableSubmit&&(a={name:c.formBtnTitle,handler:function(){submitData.call(b)},action:'click'},f.push(a)),0<f.length&&e.appendInMenu(f)}getData(a){var b,c,d,e=this,f=e.getCollatedData(),g=[],h=f.dataset,i=h&&h.length||0,k=0,l=0;if(a)g=/^json$/ig.test(a)?f:/^csv$/ig.test(a)?e.getCSVString():global.core.transcodeData(f,'json',a);else for(;k<i;k+=1)if(c=h[k],c){for(c=h[k]&&h[k].data,d=b=c&&c.length||0,d&&(g[l]||(g[l]=[getValidValue(h[k].id,'null')]));d--;)g[l][d+1]=getValidValue(c[d].id,'null');b&&(l+=1)}return g}getCSVString(){for(var a=this,b=a.getData(),c=b.length;c--;)b[c]=b[c].join(COMMA);return b.join('|')}getCollatedData(a){var b,c,d,e,f,g,h,i,j,k,l,m=this,n=m.getDatasets(),o=m.config._selectEleArr,p=o&&o.length||0,q=a||m.getFromEnv('dataSource'),r=extend2({},q),s=r.dataset,t=s&&s.length,u=!1,v=[];if(!p||!t)return q;for(;p--;)if(e=o[p],!!e)for(i=e.startX,j=e.endX,k=e.startY,l=e.endY,f=t;f--;)if(n[f].getState('visible'))for(v[f]||(v[f]={data:[]}),d=s[f].data,h=d&&d.length;h--;)g=d[h],b=g.x,c=g.y,b>i&&b<j&&c<k&&c>l&&(v[f].data[h]=u=!0);for(;t--;)for(d=s[t].data,h=d&&d.length;h--;)v[t]&&v[t].data[h]||d.splice(h,1);return u?r:q}createSelectionBox(a){createSelectionBox.call(this,a)}_deleteAllSelection(){var a,b,c,d,e,f=this,g=f.config._selectEleArr;if(g){for(b=0,c=g.length;b<c;b++)for(e in a=g[b],a)a.hasOwnProperty(e)&&(d=a[e],d.remove&&d.remove(),delete a[e]);delete f.config._selectEleArr}}deleteSelection(a,b){deleteSelection.call(this,a,b)}bindDragEvent(a){var b,c=this;for(b in a)/Tracker/.test(b)&&a[b].drag(c.move,c.start,c.up)}start(){var a=this,b=a.data(configStr),c=b.selectEleObj,d=c.topTracker,e=c.rightTracker,f=c.bottomTracker,g=c.leftTracker,h=c.resizeTracker,i=d.data(configStr),j=e.data(configStr),k=f.data(configStr),l=g.data(configStr),m=h.data(configStr),n=c.selectBoxTracker.data(configStr),o=c.selectBoxTracker.getBBox();i.ox=o.x,i.oy=o.y,j.ox=o.x2,j.oy=o.y,k.ox=o.x,k.oy=o.y2,l.ox=o.x,l.oy=o.y,i.ox=o.x,i.oy=o.y,m.ox=o.x2,m.oy=o.y2,n.ox=o.x,n.oy=o.y,n.ow=o.width,n.oh=o.height,n.ox2=o.x2,n.oy2=o.y2,c.selectBoxG.toFront(),d.hide(),e.hide(),f.hide(),g.hide(),h.hide(),a.show()}move(a){var b,c,d,e,f=Math.abs,g=Math.min,h=Math.max,i=this,j=i.data('config'),k=j.selectEleObj,l=j.chart,m=k.topTracker,n=k.rightTracker,o=k.bottomTracker,p=k.leftTracker,q=k.resizeTracker,r=k.selectBoxTracker,s=k.canvasLeft,t=k.canvasRight,u=k.canvasTop,v=k.canvasBottom,w=l.getChildren('xAxis')[0],z=l.getChildren('yAxis')[0],A=r.data('config'),B={},C=a.data[0],D=a.data[1];switch(C=j.xChange?C:0,D=j.yChange?D:0,d=C+j.ox,e=D+j.oy,d=g(t-(j.ow||0),h(d,s)),e=g(v-(j.oh||0),h(e,u)),j.position){case 1:B.y=g(A.oy2,e),B.height=f(A.oy2-e)||1,m.attr({y:e+-6});break;case 2:B.x=g(A.ox,d),B.width=f(A.ox-d)||1,n.attr({x:d+-6});break;case 3:B.y=g(A.oy,e),B.height=f(A.oy-e)||1,o.attr({y:e+-6});break;case 4:B.x=g(A.ox2,d),B.width=f(A.ox2-d)||1,p.attr({x:d+-6});break;case 5:B.x=g(A.ox,d),B.width=f(A.ox-d)||1,B.y=g(A.oy,e),B.height=f(A.oy-e)||1,q.attr({cx:d,cy:e});break;default:B.x=d,B.y=e;}i.data('dragStarted')||(b=r.getBBox(),c={selectionLeft:b.x,selectionTop:b.y,selectionWidth:b.width,selectionHeight:b.height,startXValue:w.getValue(b.x),startYValue:z.getValue(b.y),endXValue:w.getValue(b.x+b.width),endYValue:z.getValue(b.y+b.height),id:k.id},l.fireChartInstanceEvent('BeforeSelectionUpdate',c),i.data('dragStarted',1)),r.animate(B),k.isVisible&&(k.closeButton.hide(),k.cornerInnerSymbol.hide(),k.cornerOuterSymbol.hide(),k.isVisible=!1)}up(){var a,b,c=this,d=c.data(configStr),e=d.selectEleObj,f=d.chart,g=f.getChildren('xAxis')[0],h=f.getChildren('yAxis')[0],i=e.topTracker,j=e.rightTracker,k=e.bottomTracker,l=e.leftTracker,m=e.resizeTracker,n=e.selectBoxTracker;setTimeout(function(){a=n.getBBox(),e.startX=g.getValue(a.x),e.startY=h.getValue(a.y),e.endX=g.getValue(a.x2),e.endY=h.getValue(a.y2),i.attr({x:a.x,y:a.y+-6,width:a.width}),j.attr({x:a.x2+-6,y:a.y,height:a.height}),k.attr({x:a.x,y:a.y2+-6,width:a.width}),l.attr({x:a.x+-6,y:a.y,height:a.height}),m.attr({cx:a.x2,cy:a.y2}),e.closeButton.transform(t+a.x2+COMMA+a.y),e.cornerInnerSymbol.transform(t+a.x2+COMMA+a.y2),e.cornerOuterSymbol.transform(t+a.x2+COMMA+a.y2),e.closeButton.show(),a.width<15||a.height<15?(e.cornerInnerSymbol.hide(),e.cornerOuterSymbol.show()):(e.cornerInnerSymbol.show(),e.cornerOuterSymbol.hide()),e.isVisible=!0,i.show(),j.show(),k.show(),l.show(),m.show(),c.data('dragStarted')&&(b={selectionLeft:a.x,selectionTop:a.y,selectionWidth:a.width,selectionHeight:a.height,startXValue:g.getValue(a.x),startYValue:h.getValue(a.y),endXValue:g.getValue(a.x+a.width),endYValue:h.getValue(a.y+a.height),data:f.getCollatedData(),id:e.id},f.fireChartInstanceEvent('SelectionUpdated',b),c.data('dragStarted',0))},100)}restoreData(){var a,b=this,c=[];for(b.iterateComponents(a=>{a.getType&&'dataset'===a.getType()&&c.push(a)}),b._deleteAllSelection(),a=0;a<c.length;a++)c[a].asyncDraw();return b.fireChartInstanceEvent('dataRestored',{}),!0}_postSpaceManagement(){var a=this;super._postSpaceManagement(),a._deleteAllSelection()}getDSdef(){return SelectScatterDataset}getDSGroupdef(){return UNDEF}}export default SelectScatter;