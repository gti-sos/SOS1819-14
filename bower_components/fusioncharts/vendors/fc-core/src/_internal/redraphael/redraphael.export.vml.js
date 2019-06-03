import{stubFN,pluckNumber,pluck}from'../../lib';export default function(a){let b,c=a._availableAttrs,d='',e=' ',f='_',g=':',h='; ',i='="',j='"',k='>',l='text',m='text-anchor',n='middle',o='font-size',p=')',q='stroke-opacity',s='linear',t='radial',u='" id = "',v='">',r=/^matrix\(|\)$/g,w=/\,/g,y=/\n|<br\s*?\/?>/ig,z=/[^\d\.]/ig,x=/[\%\(\)\s,\xb0#]/g,A=/group/ig,B=/&/g,C=/"/g,D=/'/g,E=/</g,F=/>/g,G=0,H={userSpaceOnUse:'userSpaceOnUse',objectBoundingBox:'objectBoundingBox'},I=Math,J=parseFloat,K=I.max,L=I.abs,M=I.pow,N=String,O=/[, ]+/,P={blur:function(){},transform:function(){},src:function(){var a=arguments[1],b=a.attrs,c=b.src;a.attrSTR+=' xlink:href="'+c+j},path:function(){var b=arguments[1],c=b.attrs,f=c.path;f=a._pathToAbsolute(f||d),b.attrSTR+=' d="'+(f.toString&&f.toString()||d).replace(w,e)+j},gradient:function(c,e,g){var h,j,k,l,m,n,o,q,w,y,z=c.attrs,A=z.gradient,B=s,C=A,D=.5,E=.5,F=d,G=d,O=d;if(C=C.replace(x,f),!g[C]){if(A=N(A).replace(a._radial_gradient,function(a,b){var c,d,e,f,g,h,i,j;return(b=b&&b.split(',')||[],B=t,c=b[0],d=b[1],f=b[2],g=b[3],h=b[4],y=b[5],j=c&&d,f&&(w=/\%/.test(f)?f:J(f)),y===H.userSpaceOnUse)?(j&&(D=c,E=d),g&&h&&(o=g,q=h,!j&&(D=o,E=q)),''):(j&&(D=J(c),E=J(d),e=2*(.5<E)-1,.25<(i=M(D-.5,2))+M(E-.5,2)&&.25>i&&(E=I.sqrt(.25-i)*e+.5)&&.5!==E&&(E=E.toFixed(5)-1e-5*e)),g&&h&&(o=J(g),q=J(h),e=2*(.5<q)-1,.25<(i=M(o-.5,2))+M(q-.5,2)&&.25>i&&(q=I.sqrt(.25-i)*e+.5)&&.5!==q&&(q=q.toFixed(5)-1e-5*e),!j&&(D=o,E=q)),'')}),A=A.split(/\s*\-\s*/),B==s){if(h=A.shift(),h=-J(h),isNaN(h))return null;j=[0,0,I.cos(a.rad(h)),I.sin(a.rad(h))],k=1/(K(L(j[2]),L(j[3]))||1),j[2]*=k,j[3]*=k,0>j[2]&&(j[0]=-j[2],j[2]=0),0>j[3]&&(j[1]=-j[3],j[3]=0)}if(l=a._parseDots(A),!l)return null;for(B==t?(F='<radialGradient fx = "'+D+'" fy = "'+E+'" cy = "'+q+'" cx = "'+o+'" r = "'+w+'" gradientUnits = "'+y+u+C+v,G='</radialGradient>'):(F='<linearGradient x1 = "'+j[0]+'" y1 = "'+j[1]+'" x2 = "'+j[2]+'" y2 = "'+j[3]+'" gradientTransform ="matrix('+c.matrix.invert()+p+u+C+v,G='</linearGradient>'),m=0,n=l.length;m<n;m++)O+='<stop offset="'+(l[m].offset?l[m].offset:m?'100%':'0%')+'" stop-color="'+(l[m].color||'#fff')+'" stop-opacity="'+(l[m].opacity===b?1:l[m].opacity)+'" />';g[C]=!0,g.str+=F+O+G}e.attrSTR+=' fill="url(\'#'+C+'\')"'},fill:function(b,c){var d,e,f=c.attrs,i=f.fill;b.attrs.gradient||(d=a.color(i),e=d.opacity,b.type===l?c.styleSTR+='fill:'+d+h+q+g+0+h:(c.attrSTR+=' fill="'+d+j,!f['fill-opacity']&&(e||0===e)&&(c.attrSTR+=' fill-opacity="'+e+j)))},stroke:function(b,c){var d,e,f=c.attrs,g=f.stroke;d=a.color(g),e=d.opacity,b.type!==l&&(c.attrSTR+=' stroke="'+d+j,!f[q]&&(e||0===e)&&(c.attrSTR+=' stroke-opacity="'+e+j))},"clip-rect":function(a,b,c){var e=b.attrs,g=N(e['clip-rect']),h=g.split(O),i=g.replace(x,f)+f+f+G++;4===h.length&&(!c[i]&&(c[i]=!0,c.str+='<clipPath id="'+i+'"><rect x="'+h[0]+'" y="'+h[1]+'" width="'+h[2]+'" height="'+h[3]+'" transform="matrix('+a.matrix.invert().toMatrixString().replace(r,d)+p+'"/></clipPath>'),b.attrSTR+=' clip-path="url(#'+i+p+j)},cursor:function(){var a=arguments[1],b=a.attrs,c=b.cursor;c&&(a.styleSTR+='cursor:'+c+h)},font:function(){var a=arguments[1],b=a.attrs,c=b.font;a.styleSTR+='font:'+c.replace(/\"/ig,e)+h},"font-size":function(){var a=arguments[1],b=a.attrs,c=pluck(b[o],'10');c&&c.replace&&(c=c.replace(z,d)),a.styleSTR+='font-size:'+c+'px; '},"font-weight":function(){var a=arguments[1],b=a.attrs,c=b['font-weight'];a.styleSTR+='font-weight:'+c+h},"font-family":function(){var a=arguments[1],b=a.attrs,c=b['font-family'];a.styleSTR+='font-family:'+c+h},"line-height":stubFN,"clip-path":stubFN,visibility:stubFN,"vertical-align":stubFN,"text-anchor":function(a,b){var c=b.attrs,d=c[m]||n;a.type===l&&(b.attrSTR+=' text-anchor="'+d+j)},title:stubFN,text:function(){var a,b,c,e,f,g,h,l,m=arguments[1],p=m.attrs,q=p.text,r=pluck(p[o],p['font'],'10'),s=pluck(p['line-height']);for(r&&r.replace&&(r=r.replace(z,d)),r=pluckNumber(r),s&&s.replace&&(s=s.replace(z,d)),s=pluckNumber(s,r&&1.2*r),a=r?.85*r:.75*s,b=p.x,c=pluck(p['vertical-align'],n).toLowerCase(),e=N(q).split(y),g=e.length,f=0,h=c==='top'?a:c==='bottom'?a-s*g:a-.5*(s*g);f<g;f++)m.textSTR+='<tspan ',l=(e[f]||d).replace(B,'&amp;').replace(C,'&quot;').replace(D,'&#39;').replace(E,'&lt;').replace(F,'&gt;'),m.textSTR+=f?'dy="'+s+'" x="'+b+'" ':'dy="'+h+j,m.textSTR+=k+l+'</tspan>'}},Q=function(a,f){var n,o,p,q=d,s={attrSTR:d,styleSTR:d,textSTR:d,attrs:a.attr()},t=a.isShadow,u=d,v=d,w=s.attrs;if(a.node.style.display!=='none'&&!t){for(n in w)n!=='gradient'&&(c[n]!==b||P[n])&&w[n]!==b&&(P[n]?P[n](a,s,f):s.attrSTR+=e+n+i+w[n]+j);for(o in a.attrs.gradient&&P.gradient(a,s,f),a.type==='rect'&&w.r&&(s.attrSTR+=' rx="'+w.r+j+e+'ry'+i+w.r+j),a.styles)s.styleSTR+=o+g+a.styles[o]+h;a.type==='image'&&(s.attrSTR+=' preserveAspectRatio="none"'),a.type!==l||w[m]||P[m](a,s),a.bottom&&(u=Q(a.bottom,f)),a.next&&(v=Q(a.next,f)),p=a.type,p.match(A)&&(p='g'),q+='<'+p+' transform="matrix('+a.matrix.toMatrixString().replace(r,d)+')" style="'+s.styleSTR+j+s.attrSTR+k+s.textSTR+u+'</'+p+k+v}else a.next&&(q+=Q(a.next,f));return q};a.vml&&(a.fn.toSVG=function(a){var b=this,c=d,e={str:d},f=d;return c='<svg style="overflow: hidden; position: relative;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+b.width+'" version="1.1" height="'+b.height+'">',b.bottom&&(f=Q(b.bottom,e)),c+='<defs>'+e.str+'</defs>'+f+'</svg>',a||(c=c.replace(/<image[^\>]*\>[^\>]*\>/gi,function(a){return a.match(/href=\"data\:image/i)?a:''})),c})}