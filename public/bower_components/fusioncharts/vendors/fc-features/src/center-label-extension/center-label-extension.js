import{ComponentInterface}from'../../../fc-core/src/component-interface';import{toRaphaelColor,hashify,parseUnsafeString,pluck,pluckNumber,BLANKSTRING,getFirstColor}from'../../../fc-core/src/lib';import{addDep}from'../../../fc-core/src/dependency-manager';import centerLabelAnimation from'./center-label.animation';let UNDEF,HIDDEN='hidden',VISIBLE='visible';function replaceMacros(a,b,c){if(a)for(var d,e=b.length||0;e--;)d=new RegExp(b[e],'gi'),a=a.replace(d,c[e]);return a}addDep({name:'centerLabelAnimation',type:'animationRule',extension:centerLabelAnimation});export default class CenterLabel extends ComponentInterface{getName(){return'centerLabel'}getType(){return'centerLabel'}configure(a){let b=this.getFromEnv('chart-attrib'),c=this.getFromEnv('number-formatter'),d=a.dataLabelStyle,e=this;e.config={label:parseUnsafeString(pluck(b.defaultcenterlabel,'')),font:pluck(b.centerlabelfont,d.fontFamily),fontSize:pluckNumber(b.centerlabelfontsize,parseInt(d.fontSize,10)),color:getFirstColor(pluck(b.centerlabelcolor,b.valuefontcolor,a.style.inCanvasStyle.color,'555555')),alpha:pluckNumber(b.centerlabelalpha,100),bold:pluckNumber(b.centerlabelbold,d.fontWeight),italic:pluckNumber(b.centerlabelitalic,d.style),bgColor:pluck(b.centerlabelbgcolor,''),bgAlpha:pluckNumber(b.centerlabelbgalpha,100),borderColor:pluck(b.centerlabelbordercolor,d.borderColor),borderAlpha:pluckNumber(b.centerlabelborderalpha,100),borderThickness:pluckNumber(b.centerlabelborderthickness,d.borderThickness),borderRadius:pluckNumber(b.centerlabelborderradius,d.borderRadius),textPadding:pluckNumber(b.centerlabeltextpadding,d.borderPadding),padding:pluckNumber(b.centerlabelpadding,2),bgOval:pluckNumber(b.centerlabelbgoval,0),shadow:pluckNumber(b.showcenterlabelshadow,0),hoverColor:b.centerlabelhovercolor&&getFirstColor(pluck(b.centerlabelhovercolor)),hoverAlpha:pluckNumber(b.centerlabelhoveralpha),toolText:parseUnsafeString(pluck(b.centerlabeltooltext,BLANKSTRING))},e.addExtEventListener('datasetrollover',function(a){let b=a.sender.getFromEnv('dataSource'),d=a.data,f=pluck(replaceMacros(b.chart.centerlabel,['\\$value','\\$percentValue','\\$displayValue','\\$label'],[c.scale(d.value),d.pValue,d.displayValue,d.label]),'');e.draw(f,!1)},this.getFromEnv('chart').getDatasets()[0]),e.addExtEventListener('datasetrollout',function(a){let b=a.sender.config.label,c=pluck(b,'');e.draw(c,!1)},this.getFromEnv('chart').getDatasets()[0])}draw(a){var b,c=this,d=c.getFromEnv('chart'),e=d.config.canvasLeft+.5*d.config.canvasWidth,f=d.config.canvasTop+.5*d.config.canvasHeight,g=d.getDatasets()[0].config.innerSize,h=d.getDatasets()[0].config.innerSize,i=d.getDatasets()[0],j=i.config,k=this.config,l=c.getFromEnv('animationManager'),m=c.getFromEnv('smartLabel'),n=this.getGraphicalElement('centerLabel'),o=n,p=this.getGraphicalElement('centerLabelBg'),q=d.getChildContainer('plotGroup'),r=k.padding,s=2*k.textPadding,t={fontFamily:k.font,fontSize:k.fontSize+'px',lineHeight:1.2*k.fontSize+'px',fontWeight:k.bold?'bold':'',fontStyle:k.italic?'italic':''},u=c.getFromEnv('toolTipController');a=pluck(a,k.label),m.setStyle(t),m.useEllipsesOnOverflow(d.config.useEllipsesWhenOverflow),b=m.getSmartText(a,1.414*(.5*g-r)-s,1.414*(.5*h-r)-s),a?(k.bgOval&&(p=l.setAnimation({el:p||'circle',attr:{cx:e,cy:f,r:.5*g-r,visibility:VISIBLE,container:q,fill:hashify(k.bgColor),"fill-opacity":k.bgAlpha/100,stroke:hashify(k.borderColor),"stroke-width":k.borderThickness,"stroke-opacity":k.borderAlpha/100},component:c})),o=l.setAnimation({el:n||'text',component:c,container:q,css:t,attr:{x:e,y:f,text:b.text,visibility:VISIBLE,direction:d.config.textDirection,fill:toRaphaelColor({FCcolor:{color:k.color,alpha:k.alpha}}),"text-bound":k.bgOval?'none':[toRaphaelColor({FCcolor:{color:k.bgColor,alpha:k.bgAlpha}}),toRaphaelColor({FCcolor:{color:k.borderColor,alpha:k.borderAlpha}}),k.borderThickness,k.textPadding,k.borderRadius]},label:'text'}),u.enableToolTip(o,k.toolText||b.tooltext)):(o&&l.setAnimation({el:o,attr:{visibility:HIDDEN},component:c}),p&&l.setAnimation({el:p,attr:{visibility:HIDDEN},component:c})),n?o.attr('text')!==a&&c.centerLabelChange(a):(c.addEventListener('fc-mouseover',function(){c._centerLabelRollover(d)}),c.addEventListener('fc-mouseout',function(){c._centerLabelRollout(d)}),c.addEventListener('fc-click',function(){c._centerLabelClick(d)}),c.addGraphicalElement('centerLabel',o),c.addGraphicalElement('centerLabelBg',p)),j.lastCenterLabelConfig=k,j.centerLabelConfig=k}centerLabelChange(a){let b=this,c=b.getFromEnv('chart'),d=c.config,e=b.getFromEnv('chartInstance'),f={height:d.height,width:d.width,pixelHeight:c.getFromEnv('chartWidth'),pixelWidth:c.getFromEnv('chartHeight'),id:e.id,renderer:e.args.renderer,container:e.options.containerElement,centerLabelText:a};c.fireChartInstanceEvent('centerLabelChanged',f)}_centerLabelRollover(a){let b=a.config,c=a.getFromEnv('chartInstance'),d=this.config,e=this,f={height:b.height,width:b.width,pixelHeight:a.getFromEnv('chartWidth'),pixelWidth:a.getFromEnv('chartHeight'),id:c.id,renderer:c.args.renderer,container:c.options.containerElement,centerLabelText:d&&d.label};this.getFromEnv('paper').attr('text')&&a.fireChartInstanceEvent('centerLabelRollover',f,UNDEF,e.hoverOnCenterLabel.bind(e,a))}_centerLabelRollout(a){let b=a.config,c=this,d=a.getFromEnv('chartInstance'),e=this.config,f={height:b.height,width:b.width,pixelHeight:a.getFromEnv('chartWidth'),pixelWidth:a.getFromEnv('chartHeight'),id:d.id,renderer:d.args.renderer,container:d.options.containerElement,centerLabelText:e&&e.label};this.getFromEnv('paper').attr('text')&&a.fireChartInstanceEvent('centerLabelRollout',f,UNDEF,c.hoverOffCenterLabel.bind(c,a))}_centerLabelClick(a){let b,c=a.config,d=a.getFromEnv('chartInstance'),e={height:c.height,width:c.width,pixelHeight:a.getFromEnv('chartWidth'),pixelWidth:a.getFromEnv('chartHeight'),id:d.id,renderer:d.args.renderer,container:d.options.containerElement};b=this.config,e.centerLabelText=b&&b.label,this.getFromEnv('paper').attr('text')&&a.fireChartInstanceEvent('centerLabelClick',e)}hoverOnCenterLabel(a){let b=a.getChildren('dataset')[0],c=b.config,d=c.lastCenterLabelConfig;(d.hoverColor||d.hoverAlpha)&&this.getGraphicalElement('centerLabel').attr({fill:toRaphaelColor({FCcolor:{color:d.hoverColor||d.color,alpha:d.hoverAlpha||d.alpha}})})}hoverOffCenterLabel(a){let b=a.getChildren('dataset')[0],c=b.config,d=c.lastCenterLabelConfig;(d.hoverColor||d.hoverAlpha)&&this.getGraphicalElement('centerLabel').attr({fill:toRaphaelColor({FCcolor:{color:d.color,alpha:d.alpha}})})}}