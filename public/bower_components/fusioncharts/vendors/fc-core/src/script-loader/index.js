import{isXSSSafe}from'../lib';const SCRIPT_LOAD_TIMEOUT=12e4;let loadedScripts={};function loadScript(a){if(!loadedScripts[a]){let b=document.getElementsByTagName('head')[0],c=document.createElement('script'),d=setTimeout(()=>{c.onerror({type:'timeout',target:c})},SCRIPT_LOAD_TIMEOUT);c.charset='utf-8',c.timeout=SCRIPT_LOAD_TIMEOUT,loadedScripts[a]=new Promise((a,b)=>{c.onload=function(b){c.onerror=c.onload=null,clearTimeout(d),a(b)},c.onerror=function(a){c.onerror=c.onload=null,clearTimeout(d),b(a)}}),isXSSSafe(a,!1)||(a='function'==typeof window.encodeURIComponent?window.encodeURIComponent(a):window.escape(a)),c.src=a,b.appendChild(c)}return loadedScripts[a]}export default loadScript;