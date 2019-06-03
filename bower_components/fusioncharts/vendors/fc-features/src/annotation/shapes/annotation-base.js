import{SmartRenderer}from'../../../../fc-core/src/component-interface';import{pluck,pluckNumber}from'../../../../fc-core/src/lib';import{isMacro,solveEquation,parseEquation,cleanMacro,getScaledVal}from'../utils';class AnnotationBase extends SmartRenderer{getType(){return'shape'}_setConfig(a,b){this.config[a]=b}_getConfig(a=''){return''===a?this.config:this.config[a]}getElement(){let a=this,b=a.config;return this.getGraphicalElement(b.id,b.animationLabel)}getBounds(){return this.getElement().getBBox()}data(a,b){let c=this;if(a&&'string'==typeof a)if(void 0!==b)c._data||(c._data={}),c._data[a]=b;else return c._data&&c._data[a]}parseAndSetAttribute(){let a,b,c=this,d=c.rawConfig,e=c.getFromEnv('snapPoints'),f=pluckNumber(d.autoscale,d.autoScale,1),g={x:pluck(d.x,d.xPos,0),y:pluck(d.y,d.yPos,0),toX:pluck(d.toX),toY:pluck(d.toY)},h=c.config.calculatedAttrs={},i=c.getScaleInfo();for(var j in g)g.hasOwnProperty(j)&&(b=g[j],'undefined'!=typeof b&&(b=b.toString(),i.axis=j,isMacro(b)?h[j]=solveEquation(parseEquation(cleanMacro(b.toLowerCase()),e,i)):(h[j]=solveEquation(parseEquation(cleanMacro(b.toLowerCase()),e)),f&&(h[j]=getScaledVal(h[j],i)))));'group'!==c.config.elementType&&(a=c.getLinkedParent().config.calculatedAttrs,h.x+=a.x||0,h.y+=a.y||0,isNaN(+h.toX)?h.toX=h.x:h.toX+=a.x||0,!isNaN(+h.toY)&&(h.toY+=a.y||0)),c.updateAttr()}getAttribute(a=''){return''===a?this.rawConfig:this.rawConfig[a]}show(){let a=this,b=Object.assign({},a.rawConfig);b.isVisible=!0,a.setData(b)}hide(){let a=this,b=Object.assign({},a.rawConfig);b.isVisible=!1,a.setData(b)}}export default AnnotationBase;