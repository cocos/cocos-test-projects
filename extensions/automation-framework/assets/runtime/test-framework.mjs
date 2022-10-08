import{HTML5 as e}from"cc/env";var t,n,o,r,s,i,a,c,u,l;!function(e){e.TestEvent="Test",e.ImageEvent="Capture"}(t||(t={})),function(e){e.START="Start",e.ERROR="Error",e.END="End",e.TEST="Test",e.IMAGEINIT="ImageInit",e.IMAGEEND="ImageEnd"}(n||(n={})),function(e){e.PASS="PASS",e.FAIL="FAIL",e.NA="NA"}(o||(o={})),function(e){e.PassDetail="Assert Pass",e.NaDetail="No Detail"}(r||(r={})),function(e){e.FAILED="Failed",e.ERROR="Error",e.Pass="Pass",e.OK="Ok",e.MSG_OK="Msg_Ok",e.IMAGE_OK="Image_Ok",e.IMAGE_END="Image_End"}(s||(s={})),function(e){e.BEGIN_IMAGE_UPLOAD="begin-image-upload",e.UPLOAD_IMAGE_FINISH="upload-image-finish"}(i||(i={})),function(e){e.WECHAT_GAME="WECHAT_GAME",e.BAIDU_MINI_GAME="BAIDU_MINI_GAME",e.XIAOMI_QUICK_GAME="XIAOMI_QUICK_GAME",e.ALIPAY_MINI_GAME="ALIPAY_MINI_GAME",e.BYTEDANCE_MINI_GAME="BYTEDANCE_MINI_GAME"}(a||(a={})),function(e){e.WIN32="WIN32",e.ANDROID="ANDROID",e.IOS="IOS",e.MACOS="MACOS",e.OHOS="OHOS"}(c||(c={})),function(e){e.EDITOR_PAGE="EDITOR_PAGE",e.EDITOR_CORE="EDITOR_CORE",e.MOBILE_BROWSER="MOBILE_BROWSER",e.DESKTOP_BROWSER="DESKTOP_BROWSER"}(u||(u={})),function(e){e.OPPO_MINI_GAME="OPPO_MINI_GAME",e.VIVO_MINI_GAME="VIVO_MINI_GAME",e.HUAWEI_QUICK_GAME="HUAWEI_QUICK_GAME",e.COCOSPLAY="COCOSPLAY",e.LINKSURE_MINI_GAME="LINKSURE_MINI_GAME",e.QTT_MINI_GAME="QTT_MINI_GAME"}(l||(l={}));let f,p,d;function h(e){return console.info(`key ${e}`),console.info(`---------platformInfo------,${f}`),"all"===e?f:f[e]}async function y(){if(console.log("🚀 ~ file: utils.ts ~ line 75 ~ getassemblyData ~ platformInfo",f),!f)return e?new Promise(((e,t)=>{const n=new XMLHttpRequest;n.responseType="text";let o=`testConfig.json?v=${(new Date).getTime()}`;n.open("GET",o,!0),n.responseType="text",n.onload=()=>{let t=JSON.parse(n.response);console.log("😊 ~ file: utils.ts ~ line 96 ~ testconfig data",t);const{platforms:o,jobId:r,localServer:{ip:s,port:i,timeout:a}}=t;f={classList:o[0].testScripts.map((e=>e.classNames[0])),testScript:o[0].testScripts.map((e=>e.scriptName)),platformIndex:o[0].platformIndex,jobId:r,ip:s,port:i,timeout:a},e()},n.onerror=()=>{t(new Error("request get testconfig failed!"))},n.send(null)})):(console.log("🚀 ~ file: utils.ts ~ line 77 ~ getassemblyData ~ HTML5",e),new Promise((e=>{const{platforms:t,jobId:n,localServer:{ip:o,port:r,timeout:s}}=fsUtils.readJsonSync("testConfig.json");f={classList:t[0].testScripts.map((e=>e.classNames[0])),testScript:t[0].testScripts.map((e=>e.scriptName)),platformIndex:t[0].platformIndex,jobId:n,ip:o,port:r,timeout:s},console.log("🚀 ~ file: utils.ts ~ line 80 ~ returnnewPromise ~ platformInfo",JSON.stringify(f)),e(f)})))}function m(e){return"[object ArrayBuffer]"===Object.prototype.toString.call(e)||ArrayBuffer.isView(e)}function b(e){return"function"==typeof e?(...t)=>{const n=e(...t);return n instanceof Promise?n:Promise.resolve(n)}:()=>Promise.resolve(e)}function w(e){return"object"==typeof e&&null!==e}function g(e){for(const t in e)return!1;return!0}async function v(e){return new Promise((t=>{setTimeout((()=>{t("延迟")}),1e3*e)}))}function x(){if(console.info(`current platform is ${cc.sys.platform}`),cc.sys.platform in l||cc.sys.platform in a)return!0}let O,M=0,E=0;const j=new Map;function N(e="127.0.0.1",t=8e3){return new Promise((n=>{if(console.log("createWebsoket",`ws://${e}:${t}/ws/caster`),p)return p;O=()=>{console.log("reConnect"),p=new WebSocket(`ws://${e}:${t}/ws/caster`),async function(e){if(!p)return;console.log("initSocket"),p.onopen=()=>{console.info("socket connected ~~~"),M=0,e("")},p.onmessage=e=>{const{id:t,state:n,message:o}=JSON.parse(e.data);["Image_Ok","Msg_Ok"].some((e=>e===n))&&t&&(j.get(Number(t))[1](""),j.delete(t))},p.onerror=()=>{console.info("socket disconnect & retry ~~~"),p=null,++M<=5?O&&O():console.error("【automation error】 socket disconnect on error")},p.onclose=()=>{console.info("socket closed ~~~"),p=null}}(n)},O()}))}function S(e,t){p&&(e.id||(e.id=++E),p.send(JSON.stringify(e)),t&&j.set(E,[()=>S(e),t]))}function I(e,t,n){null==p||p.send(e),t&&n&&j.set(t,[()=>I(e),n])}function A(e,t){return new Promise((o=>{const r={state:n.START,platformIndex:e,jobId:h("jobId"),logs:t};clearInterval(d),function(){console.log("🚀 ~ file: client.ts ~ line 73 ~ heartBeat ~ heartBeat");const{platformIndex:e,jobId:t}=h("all");null==p||p.send(`type:ping_${t}_${e}`),d=setInterval((()=>{null==p||p.send(`type:ping_${t}_${e}`)}),1e4)}(),S(r,o)}))}let P;function D(e,t,n){P={className:e,functionName:t,testScript:n}}let k=0;const T={};async function _(){return new Promise(((e,t)=>{cc.director.on,cc.director.once(cc.Director.EVENT_END_FRAME,(()=>{e()}))}))}async function C(e){k++;const t=performance.now(),n=await async function(e){return new Promise((async(t,n)=>{const{width:o,height:r}=cc.screen.resolution,{className:s,functionName:i}=P,a=cc.director.getScene().getComponentsInChildren(cc.CameraComponent),c=new cc.RenderTexture;c.reset({width:o,height:r}),a.forEach((e=>{e.targetTexture||(e.targetTexture=c)})),await _(),a.forEach((e=>{e.targetTexture===c&&(e.targetTexture=null)}));const u=c.readPixels();if(u.byteLength!==parseInt(o)*parseInt(r)*4)return n("readPixels is not accord with width * height * 4");const l=Object.assign(P,{width:parseInt(o),height:parseInt(r),imageName:`${s}_${i}${e?`_${e}`:""}`,imageData:u});c.destroy(),t(l)}))}(e),r={resultDetail:"This is a image!",logs:"",testTimer:performance.now()-t,assertResult:o.PASS},s=Object.assign(Object.assign(Object.assign({},n),r),{imgIdx:k});return await async function(e){const{jobId:t,platformIndex:n}=h("all"),{testScript:o,className:r,functionName:s,imageName:i,testTimer:a,width:c,height:u,imgIdx:l,imageData:f}=e,p=[t,n,o,r,s,`${i}_${l}`,a,c,u,!0].join(","),d=new ArrayBuffer(2+p.length+e.imageData.length);T[r]||(T[r]={});T[r][s]||(T[r][s]=0);T[r][s]++;const y=new DataView(d);y.setUint8(0,p.length);for(let e=0;e<p.length;e++)y.setUint8(2+e,p[e].charCodeAt(0));new Uint8Array(d).set(f,2+p.length),await async function(e,t,n){const o=e.byteLength,r=1048576,s=++E,i=h("jobId"),a=Math.ceil(o/r);for(let c=0;c<a;c++){const u=c*r,l=Math.min(o,u+r),f=[i,t,k,o,r,a,c,u,l,s,n].join(","),p=new Uint8Array(e,u,l-u),d=new ArrayBuffer(2+f.length+p.length),h=new DataView(d);h.setUint8(0,f.length);for(let e=0;e<f.length;e++)h.setUint8(2+e,f[e].charCodeAt(0));new Uint8Array(d).set(p,2+f.length),await L(d,s).catch((e=>console.error(`【automation error】 ${n}.png chunks ${c} not send seccess`)))}}(d,n,`${i}_${l}`)}(s),n}function L(e,t){let n;return new Promise(((o,r)=>{I(e,t,o),n=setTimeout((()=>{r("now Buffer is not success")}),5e3)})).then((()=>{clearTimeout(n)}))}let z={platformIndex:0,sceneList:[],classList:{}};function q(e,t){return new Promise(((n,o)=>{const r=h("ip"),s=h("port");e=`${`http://${r}${s?`:${s}`:""}`}/${e}`;const i=new XMLHttpRequest;i.open("POST",e,!0),i.setRequestHeader("content-type","application/json"),i.send(JSON.stringify(t)),i.onload=()=>{200!==i.status&&0!==i.status||(console.log("😊 ~ file: reset-api.ts ~ line 61 ~ xhr.response",i.response),n(i.response)),400===i.status&&o(`request is bad,${i.responseText}`),i.status>=500&&o(`server error,${i.responseText}`)},i.onerror=()=>{o(`post error,url= ${e}`)}}))}async function B(e,t){console.info("request请求",e);const n=h("ip"),o=h("port"),r=`http://${n}${o?`:${o}`:""}`;if(!x())return console.info("fetch ############",e),fetch(`${r}/${e}`,{method:"post",body:JSON.stringify(t)});console.info("is mini game############"),await q(e,t).catch((e=>console.info(`post request mini game error,${e}`)))}function R(e,t){const{platformIndex:n,jobId:o}=h("all");return q("runtime/nowScript",{platformIndex:n,sceneName:e,scriptName:t,jobId:o}),new Promise(((t,n)=>{cc.director.loadScene(e,(e=>{e?n(e):t()}))}))}function F(){return new Promise((e=>{cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH,(()=>{e()}))}))}function $(){return new Promise((e=>{cc.director.once(cc.Director.EVENT_AFTER_UPDATE,(()=>{e()}))}))}function V(){return new Promise(((e,t)=>{cc.director.once(cc.Director.EVENT_END_FRAME,(()=>{e()}))}))}function U(){return new Promise((e=>{cc.director.once(cc.Director.EVENT_AFTER_PHYSICS,(()=>{e()}))}))}function H(){return new Promise((e=>{cc.director.once(cc.Director.EVENT_AFTER_DRAW,(()=>{e()}))}))}class G{constructor(){this.classMap=new Map,this.setupFuncMap=new Map,this.setupClassMap=new Map,this.teardownFuncMap=new Map,this.teardownClassMap=new Map,this.functionMap=new Map,this.testCaseList=[],this.sceneName=new Map}static get instance(){return G._instance||(G._instance=new G),G._instance}}let K;const W=[],J=new Map;function Q(e){return function(t){try{G.instance.classMap.set(e,t);const n=oe(t.name);J.delete(t.name),K=n,n.name=e,J.set(e,n)}catch(e){throw console.error("【automation error】",JSON.stringify(e)),new Error("装饰器获取测试类名失败!")}}}function Y(e){return function(t){try{G.instance.sceneName.set(t,e),console.log("className",t);const n=K||oe(t.name);K=null,n.scene=e,async function(e){z.classList[e.name]=e,z.sceneList.push(e.scene)}({name:n.name,scene:e,caseList:W.reduce(((e,t)=>(e[t]=[],e)),{})}),W.length=0}catch(e){throw console.error("【automation error】",JSON.stringify(e)),new Error("未获取到场景名称！")}}}function X(e,t){try{G.instance.setupFuncMap.set(e.constructor,[t]),oe(e.constructor.name,e.constructor).setupFunc=b(e[t])}catch(e){throw console.error("【automation error】",JSON.stringify(e)),new Error("装饰器获取setupFunc失败!")}}function Z(e,t){try{G.instance.setupClassMap.set(e.constructor,[t]),oe(e.constructor.name,e.constructor).setup=b(e[t])}catch(e){throw console.error("【automation error】",JSON.stringify(e)),new Error("装饰器获取setup失败!")}}function ee(e,t){try{G.instance.teardownFuncMap.set(e.constructor,[t]),oe(e.constructor.name,e.constructor).teardownFunc=b(e[t])}catch(e){throw console.error("【automation error】",JSON.stringify(e)),new Error("装饰器获取teardownFunc失败!")}}function te(e,t){try{G.instance.teardownClassMap.set(e.constructor,[t]),oe(e.constructor.name,e.constructor).teardown=b(e[t])}catch(e){throw console.error("【automation error】",JSON.stringify(e)),new Error("装饰器获取teardown失败!")}}function ne(e,t){try{G.instance.testCaseList.push({clazz:e.constructor,func:t});const n=oe(e.constructor.name,e.constructor),o=e[t].bind(n);o.realName=t,n.testCase.push(o),W.push(t)}catch(e){throw console.error("【automation error】",JSON.stringify(e)),new Error("装饰器获取testCase失败!")}}function oe(e,t){let n=J.get(e);return t&&!n&&(n=new t,n.testCase=[],J.set(e,n),n.name=t.name),console.info(`getTestObj ---obj,${n} `),n}async function re(e,t,n,o){let r=-1;for(const s of n){r+=1;const n=J.get(String(s));if(console.log("🚀 ~ file: fixture.ts ~ line 177 ~ runAllTestObj ~ testObj",n,String(s)),!n)continue;const{setup:i,setupFunc:a,teardown:c,teardownFunc:u,scene:l}=n;l&&await R(l,o[r]),i&&await i();for(const i of n.testCase){const n=i.realName;D(s,n,o[r]),k=0,a&&await a();try{await i()}catch(i){console.error(`【automation error】jobId:${e},platformIndex: ${t},${o[r]},classname:${s},functionname:${n},error:${i}`)}u&&await u()}c&&await c()}}var se="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},ie={};
/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */
/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */
function ae(){var e=[].slice.call(arguments);function t(t,n){Object.keys(n).forEach((function(o){~e.indexOf(o)||(t[o]=n[o])}))}return function(){for(var e=[].slice.call(arguments),n=0,o={};n<e.length;n++)t(o,e[n]);return o}}
/*!
 * Primary Exports
 */var ce=ue;function ue(e,t,n){var o=ae("name","message","stack","constructor","toJSON")(t||{});for(var r in this.message=e||"Unspecified AssertionError",this.showDiff=!1,o)this[r]=o[r];if(n=n||ue,Error.captureStackTrace)Error.captureStackTrace(this,n);else try{throw new Error}catch(e){this.stack=e.stack}}
/*!
 * Inherit from Error.prototype
 */ue.prototype=Object.create(Error.prototype),
/*!
 * Statically set name
 */
ue.prototype.name="AssertionError",
/*!
 * Ensure correct constructor
 */
ue.prototype.constructor=ue,ue.prototype.toJSON=function(e){var t=ae("constructor","toJSON","stack")({name:this.name},this);return!1!==e&&this.stack&&(t.stack=this.stack),t};var le={};function fe(e,t){return null!=e&&t in Object(e)}function pe(e){return e.replace(/([^\\])\[/g,"$1.[").match(/(\\\.|[^.]+?)+/g).map((function(e){if("constructor"===e||"__proto__"===e||"prototype"===e)return{};var t=/^\[(\d+)\]$/.exec(e);return t?{i:parseFloat(t[1])}:{p:e.replace(/\\([.[\]])/g,"$1")}}))}function de(e,t,n){var o=e,r=null;n=void 0===n?t.length:n;for(var s=0;s<n;s++){var i=t[s];o&&(o=void 0===i.p?o[i.i]:o[i.p],s===n-1&&(r=o))}return r}function he(e,t){var n=pe(t),o=n[n.length-1],r={parent:n.length>1?de(e,n,n.length-1):e,name:o.p||o.i,value:de(e,n)};return r.exists=fe(r.parent,r.name),r}var ye={hasProperty:fe,getPathInfo:he,getPathValue:function(e,t){return he(e,t).value},setPathValue:function(e,t,n){return function(e,t,n){for(var o=e,r=n.length,s=null,i=0;i<r;i++){var a=null,c=null;if(s=n[i],i===r-1)o[a=void 0===s.p?s.i:s.p]=t;else if(void 0!==s.p&&o[s.p])o=o[s.p];else if(void 0!==s.i&&o[s.i])o=o[s.i];else{var u=n[i+1];a=void 0===s.p?s.i:s.p,c=void 0===u.p?[]:{},o[a]=c,o=o[a]}}}(e,n,pe(t)),e}},me=function(e,t,n){var o=e.__flags||(e.__flags=Object.create(null));if(3!==arguments.length)return o[t];o[t]=n},be=me,we={exports:{}};
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */we.exports=function(){var e="function"==typeof Promise,t="object"==typeof self?self:se,n="undefined"!=typeof Symbol,o="undefined"!=typeof Map,r="undefined"!=typeof Set,s="undefined"!=typeof WeakMap,i="undefined"!=typeof WeakSet,a="undefined"!=typeof DataView,c=n&&void 0!==Symbol.iterator,u=n&&void 0!==Symbol.toStringTag,l=r&&"function"==typeof Set.prototype.entries,f=o&&"function"==typeof Map.prototype.entries,p=l&&Object.getPrototypeOf((new Set).entries()),d=f&&Object.getPrototypeOf((new Map).entries()),h=c&&"function"==typeof Array.prototype[Symbol.iterator],y=h&&Object.getPrototypeOf([][Symbol.iterator]()),m=c&&"function"==typeof String.prototype[Symbol.iterator],b=m&&Object.getPrototypeOf(""[Symbol.iterator]()),w=8,g=-1;function v(n){var c=typeof n;if("object"!==c)return c;if(null===n)return"null";if(n===t)return"global";if(Array.isArray(n)&&(!1===u||!(Symbol.toStringTag in n)))return"Array";if("object"==typeof window&&null!==window){if("object"==typeof window.location&&n===window.location)return"Location";if("object"==typeof window.document&&n===window.document)return"Document";if("object"==typeof window.navigator){if("object"==typeof window.navigator.mimeTypes&&n===window.navigator.mimeTypes)return"MimeTypeArray";if("object"==typeof window.navigator.plugins&&n===window.navigator.plugins)return"PluginArray"}if(("function"==typeof window.HTMLElement||"object"==typeof window.HTMLElement)&&n instanceof window.HTMLElement){if("BLOCKQUOTE"===n.tagName)return"HTMLQuoteElement";if("TD"===n.tagName)return"HTMLTableDataCellElement";if("TH"===n.tagName)return"HTMLTableHeaderCellElement"}}var l=u&&n[Symbol.toStringTag];if("string"==typeof l)return l;var f=Object.getPrototypeOf(n);return f===RegExp.prototype?"RegExp":f===Date.prototype?"Date":e&&f===Promise.prototype?"Promise":r&&f===Set.prototype?"Set":o&&f===Map.prototype?"Map":i&&f===WeakSet.prototype?"WeakSet":s&&f===WeakMap.prototype?"WeakMap":a&&f===DataView.prototype?"DataView":o&&f===d?"Map Iterator":r&&f===p?"Set Iterator":h&&f===y?"Array Iterator":m&&f===b?"String Iterator":null===f?"Object":Object.prototype.toString.call(n).slice(w,g)}return v}();
/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var ge=ce,ve=me,xe=we.exports,Oe=function(e,t){return t.length>4?t[4]:e._obj},Me={exports:{}},Ee=Function.prototype.toString,je=/\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;var Ne=function(e){if("function"!=typeof e)return null;var t="";if(void 0===Function.prototype.name&&void 0===e.name){var n=Ee.call(e).match(je);n&&(t=n[1])}else t=e.name;return t},Se=function(e){var t=Object.getOwnPropertyNames(e);function n(e){-1===t.indexOf(e)&&t.push(e)}for(var o=Object.getPrototypeOf(e);null!==o;)Object.getOwnPropertyNames(o).forEach(n),o=Object.getPrototypeOf(o);return t},Ie=function(e){var t=[];for(var n in e)t.push(n);return t},Ae={includeStack:!1,showDiff:!0,truncateThreshold:40,useProxy:!0,proxyExcludedKeys:["then","catch","inspect","toJSON"]};
/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */!function(e,t){var n=Ne,o=Se,r=Ie,s=Ae;Me.exports=function(e,t,n,o){return i({showHidden:t,seen:[],stylize:function(e){return e}},e,void 0===n?2:n)};function i(e,d,h){if(d&&"function"==typeof d.inspect&&d.inspect!==t.inspect&&(!d.constructor||d.constructor.prototype!==d)){var y=d.inspect(h,e);return"string"!=typeof y&&(y=i(e,y,h)),y}var m,b=function(e,t){switch(typeof t){case"undefined":return e.stylize("undefined","undefined");case"string":var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string");case"number":return 0===t&&1/t==-1/0?e.stylize("-0","number"):e.stylize(""+t,"number");case"boolean":return e.stylize(""+t,"boolean");case"symbol":return e.stylize(t.toString(),"symbol")}if(null===t)return e.stylize("null","null")}(e,d);if(b)return b;if(m=d,"object"==typeof HTMLElement?m instanceof HTMLElement:m&&"object"==typeof m&&"nodeType"in m&&1===m.nodeType&&"string"==typeof m.nodeName){if("outerHTML"in d)return d.outerHTML;try{if(document.xmlVersion)return(new XMLSerializer).serializeToString(d);var w=document.createElementNS("http://www.w3.org/1999/xhtml","_");w.appendChild(d.cloneNode(!1));var g=w.innerHTML.replace("><",">"+d.innerHTML+"<");return w.innerHTML="",g}catch(e){}}var v,x,O=r(d),M=e.showHidden?o(d):O;if(0===M.length||f(d)&&(1===M.length&&"stack"===M[0]||2===M.length&&"description"===M[0]&&"stack"===M[1])){if("function"==typeof d)return x=(v=n(d))?": "+v:"",e.stylize("[Function"+x+"]","special");if(u(d))return e.stylize(RegExp.prototype.toString.call(d),"regexp");if(l(d))return e.stylize(Date.prototype.toUTCString.call(d),"date");if(f(d))return a(d)}var E,j,N="",S=!1,I=!1,A=["{","}"];if("object"==typeof(E=d)&&/\w+Array]$/.test(p(E))&&(I=!0,A=["[","]"]),function(e){return Array.isArray(e)||"object"==typeof e&&"[object Array]"===p(e)}(d)&&(S=!0,A=["[","]"]),"function"==typeof d&&(N=" [Function"+(x=(v=n(d))?": "+v:"")+"]"),u(d)&&(N=" "+RegExp.prototype.toString.call(d)),l(d)&&(N=" "+Date.prototype.toUTCString.call(d)),f(d))return a(d);if(0===M.length&&(!S||0==d.length))return A[0]+N+A[1];if(h<0)return u(d)?e.stylize(RegExp.prototype.toString.call(d),"regexp"):e.stylize("[Object]","special");if(e.seen.push(d),S)j=function(e,t,n,o,r){for(var s=[],i=0,a=t.length;i<a;++i)Object.prototype.hasOwnProperty.call(t,String(i))?s.push(c(e,t,n,o,String(i),!0)):s.push("");return r.forEach((function(r){r.match(/^\d+$/)||s.push(c(e,t,n,o,r,!0))})),s}(e,d,h,O,M);else{if(I)return function(e){for(var t="[ ",n=0;n<e.length;++n){if(t.length>=s.truncateThreshold-7){t+="...";break}t+=e[n]+", "}-1!==(t+=" ]").indexOf(",  ]")&&(t=t.replace(",  ]"," ]"));return t}(d);j=M.map((function(t){return c(e,d,h,O,t,S)}))}return e.seen.pop(),function(e,t,n){if(e.reduce((function(e,t){return e+t.length+1}),0)>60)return n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1];return n[0]+t+" "+e.join(", ")+" "+n[1]}(j,N,A)}function a(e){return"["+Error.prototype.toString.call(e)+"]"}function c(e,t,n,o,r,s){var a,c,u=Object.getOwnPropertyDescriptor(t,r);if(u&&(u.get?c=u.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):u.set&&(c=e.stylize("[Setter]","special"))),o.indexOf(r)<0&&(a="["+r+"]"),c||(e.seen.indexOf(t[r])<0?(c=i(e,t[r],null===n?null:n-1)).indexOf("\n")>-1&&(c=s?c.split("\n").map((function(e){return"  "+e})).join("\n").substr(2):"\n"+c.split("\n").map((function(e){return"   "+e})).join("\n")):c=e.stylize("[Circular]","special")),void 0===a){if(s&&r.match(/^\d+$/))return c;(a=JSON.stringify(""+r)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),a=e.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),a=e.stylize(a,"string"))}return a+": "+c}function u(e){return"object"==typeof e&&"[object RegExp]"===p(e)}function l(e){return"object"==typeof e&&"[object Date]"===p(e)}function f(e){return"object"==typeof e&&"[object Error]"===p(e)}function p(e){return Object.prototype.toString.call(e)}}(0,Me.exports);
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Module dependencies
 */
var Pe=Me.exports,De=Ae,ke=function(e){var t=Pe(e),n=Object.prototype.toString.call(e);if(De.truncateThreshold&&t.length>=De.truncateThreshold){if("[object Function]"===n)return e.name&&""!==e.name?"[Function: "+e.name+"]":"[Function]";if("[object Array]"===n)return"[ Array("+e.length+") ]";if("[object Object]"===n){var o=Object.keys(e);return"{ Object ("+(o.length>2?o.splice(0,2).join(", ")+", ...":o.join(", "))+") }"}return t}return t},Te=me,_e=Oe,Ce=ke,Le=function(e,t,n){var o=e.__flags||(e.__flags=Object.create(null));for(var r in t.__flags||(t.__flags=Object.create(null)),n=3!==arguments.length||n,o)(n||"object"!==r&&"ssfi"!==r&&"lockSsfi"!==r&&"message"!=r)&&(t.__flags[r]=o[r])},ze={exports:{}},qe=we.exports;function Be(){this._key="chai/deep-eql__"+Math.random()+Date.now()}Be.prototype={get:function(e){return e[this._key]},set:function(e,t){Object.isExtensible(e)&&Object.defineProperty(e,this._key,{value:t,configurable:!0})}};var Re="function"==typeof WeakMap?WeakMap:Be;
/*!
 * Check to see if the MemoizeMap has recorded a result of the two operands
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @returns {Boolean|null} result
*/function Fe(e,t,n){if(!n||Ye(e)||Ye(t))return null;var o=n.get(e);if(o){var r=o.get(t);if("boolean"==typeof r)return r}return null}
/*!
 * Set the result of the equality into the MemoizeMap
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @param {Boolean} result
*/function $e(e,t,n,o){if(n&&!Ye(e)&&!Ye(t)){var r=n.get(e);r?r.set(t,o):((r=new Re).set(t,o),n.set(e,r))}}
/*!
 * Primary Export
 */function Ve(e,t,n){if(n&&n.comparator)return He(e,t,n);var o=Ue(e,t);return null!==o?o:He(e,t,n)}function Ue(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t||!Ye(e)&&!Ye(t)&&null}
/*!
 * The main logic of the `deepEqual` function.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
*/function He(e,t,n){(n=n||{}).memoize=!1!==n.memoize&&(n.memoize||new Re);var o=n&&n.comparator,r=Fe(e,t,n.memoize);if(null!==r)return r;var s=Fe(t,e,n.memoize);if(null!==s)return s;if(o){var i=o(e,t);if(!1===i||!0===i)return $e(e,t,n.memoize,i),i;var a=Ue(e,t);if(null!==a)return a}var c=qe(e);if(c!==qe(t))return $e(e,t,n.memoize,!1),!1;$e(e,t,n.memoize,!0);var u=function(e,t,n,o){switch(n){case"String":case"Number":case"Boolean":case"Date":return Ve(e.valueOf(),t.valueOf());case"Promise":case"Symbol":case"function":case"WeakMap":case"WeakSet":case"Error":return e===t;case"Arguments":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"Array":return Ke(e,t,o);case"RegExp":
/*!
 * Compare two Regular Expressions for equality.
 *
 * @param {RegExp} leftHandOperand
 * @param {RegExp} rightHandOperand
 * @return {Boolean} result
 */
return function(e,t){return e.toString()===t.toString()}
/*!
 * Compare two Sets/Maps for equality. Faster than other equality functions.
 *
 * @param {Set} leftHandOperand
 * @param {Set} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */(e,t);case"Generator":
/*!
 * Simple equality for generator objects such as those returned by generator functions.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
return function(e,t,n){return Ke(Je(e),Je(t),n)}
/*!
 * Determine if the given object has an @@iterator function.
 *
 * @param {Object} target
 * @return {Boolean} `true` if the object has an @@iterator function.
 */(e,t,o);case"DataView":return Ke(new Uint8Array(e.buffer),new Uint8Array(t.buffer),o);case"ArrayBuffer":return Ke(new Uint8Array(e),new Uint8Array(t),o);case"Set":case"Map":return Ge(e,t,o);default:
/*!
 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
 * for each enumerable key in the object.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
return function(e,t,n){var o=Qe(e),r=Qe(t);if(o.length&&o.length===r.length)return o.sort(),r.sort(),!1!==Ke(o,r)&&
/*!
 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
 * each key. If any value of the given key is not equal, the function will return false (early).
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
function(e,t,n,o){var r=n.length;if(0===r)return!0;for(var s=0;s<r;s+=1)if(!1===Ve(e[n[s]],t[n[s]],o))return!1;return!0}(e,t,o,n);var s=We(e),i=We(t);if(s.length&&s.length===i.length)return s.sort(),i.sort(),Ke(s,i,n);if(0===o.length&&0===s.length&&0===r.length&&0===i.length)return!0;return!1}
/*!
 * Returns true if the argument is a primitive.
 *
 * This intentionally returns true for all objects that can be compared by reference,
 * including functions and symbols.
 *
 * @param {Mixed} value
 * @return {Boolean} result
 */(e,t,o)}}(e,t,c,n);return $e(e,t,n.memoize,u),u}function Ge(e,t,n){if(e.size!==t.size)return!1;if(0===e.size)return!0;var o=[],r=[];return e.forEach((function(e,t){o.push([e,t])})),t.forEach((function(e,t){r.push([e,t])})),Ke(o.sort(),r.sort(),n)}
/*!
 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */function Ke(e,t,n){var o=e.length;if(o!==t.length)return!1;if(0===o)return!0;for(var r=-1;++r<o;)if(!1===Ve(e[r],t[r],n))return!1;return!0}
/*!
 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
 *
 * @param {Object} target
 * @returns {Array} an array of entries from the @@iterator function
 */
function We(e){if(function(e){return"undefined"!=typeof Symbol&&"object"==typeof e&&void 0!==Symbol.iterator&&"function"==typeof e[Symbol.iterator]}(e))try{return Je(e[Symbol.iterator]())}catch(e){return[]}return[]}
/*!
 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
 *
 * @param {Generator} target
 * @returns {Array} an array of entries from the Generator.
 */function Je(e){for(var t=e.next(),n=[t.value];!1===t.done;)t=e.next(),n.push(t.value);return n}
/*!
 * Gets all own and inherited enumerable keys from a target.
 *
 * @param {Object} target
 * @returns {Array} an array of own and inherited enumerable keys from the target.
 */function Qe(e){var t=[];for(var n in e)t.push(n);return t}function Ye(e){return null===e||"object"!=typeof e}ze.exports=Ve,ze.exports.MemoizeMap=Re;var Xe=Ae,Ze=function(){return Xe.useProxy&&"undefined"!=typeof Proxy&&"undefined"!=typeof Reflect},et=ie,tt=me,nt=Ze,ot=Le,rt=Object.getOwnPropertyDescriptor((function(){}),"length"),st=function(e,t,n){return rt.configurable?(Object.defineProperty(e,"length",{get:function(){if(n)throw Error("Invalid Chai property: "+t+'.length. Due to a compatibility issue, "length" cannot directly follow "'+t+'". Use "'+t+'.lengthOf" instead.');throw Error("Invalid Chai property: "+t+'.length. See docs for proper usage of "'+t+'".')}}),e):e},it=Ae,at=me,ct=Se,ut=Ze,lt=["__flags","__methods","_obj","assert"],ft=function(e,t){return ut()?new Proxy(e,{get:function e(n,o){if("string"==typeof o&&-1===it.proxyExcludedKeys.indexOf(o)&&!Reflect.has(n,o)){if(t)throw Error("Invalid Chai property: "+t+"."+o+'. See docs for proper usage of "'+t+'".');var r=null,s=4;throw ct(n).forEach((function(e){if(!Object.prototype.hasOwnProperty(e)&&-1===lt.indexOf(e)){var t=function(e,t,n){if(Math.abs(e.length-t.length)>=n)return n;for(var o=[],r=0;r<=e.length;r++)o[r]=Array(t.length+1).fill(0),o[r][0]=r;for(var s=0;s<t.length;s++)o[0][s]=s;for(r=1;r<=e.length;r++){var i=e.charCodeAt(r-1);for(s=1;s<=t.length;s++)Math.abs(r-s)>=n?o[r][s]=n:o[r][s]=Math.min(o[r-1][s]+1,o[r][s-1]+1,o[r-1][s-1]+(i===t.charCodeAt(s-1)?0:1))}return o[e.length][t.length]}
/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */(o,e,s);t<s&&(r=e,s=t)}})),null!==r?Error("Invalid Chai property: "+o+'. Did you mean "'+r+'"?'):Error("Invalid Chai property: "+o)}return-1!==lt.indexOf(o)||at(n,"lockSsfi")||at(n,"ssfi",e),Reflect.get(n,o)}}):e};
/*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */var pt=st,dt=ie,ht=me,yt=ft,mt=Le,bt=ie,wt=me,gt=Ze,vt=Le,xt=st,Ot=ie,Mt=me,Et=ft,jt=Le,Nt=st,St=ie,It=me,At=ft,Pt=Le,Dt="function"==typeof Object.setPrototypeOf,kt=function(){},Tt=Object.getOwnPropertyNames(kt).filter((function(e){var t=Object.getOwnPropertyDescriptor(kt,e);return"object"!=typeof t||!t.configurable})),_t=Function.prototype.call,Ct=Function.prototype.apply,Lt=ie,zt=Le,qt=Me.exports,Bt=function(e){return"function"!=typeof Object.getOwnPropertySymbols?[]:Object.getOwnPropertySymbols(e).filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))},Rt=Bt;var Ft=/\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;function $t(e){var t="";if(void 0===e.name){var n=String(e).match(Ft);n&&(t=n[1])}else t=e.name;return t}var Vt={compatibleInstance:function(e,t){return t instanceof Error&&e===t},compatibleConstructor:function(e,t){return t instanceof Error?e.constructor===t.constructor||e instanceof t.constructor:(t.prototype instanceof Error||t===Error)&&(e.constructor===t||e instanceof t)},compatibleMessage:function(e,t){var n="string"==typeof e?e:e.message;return t instanceof RegExp?t.test(n):"string"==typeof t&&-1!==n.indexOf(t)},getMessage:function(e){var t="";return e&&e.message?t=e.message:"string"==typeof e&&(t=e),t},getConstructorName:function(e){var t=e;return e instanceof Error?t=$t(e.constructor):"function"==typeof e&&(t=$t(e).trim()||$t(new e)),t}};
/*!
 * Chai - isNaN utility
 * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
 * MIT Licensed
 */var Ut=Number.isNaN||function(e){return e!=e},Ht=ye;
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
/*!
 * Dependencies that are used for multiple exports are required here only once
 */
/*!
 * test utility
 */
le.test=function(e,t){var n=be(e,"negate"),o=t[0];return n?!o:o},
/*!
 * type utility
 */
le.type=we.exports,
/*!
 * expectTypes utility
 */
le.expectTypes=function(e,t){var n=ve(e,"message"),o=ve(e,"ssfi");n=n?n+": ":"",e=ve(e,"object"),(t=t.map((function(e){return e.toLowerCase()}))).sort();var r=t.map((function(e,n){var o=~["a","e","i","o","u"].indexOf(e.charAt(0))?"an":"a";return(t.length>1&&n===t.length-1?"or ":"")+o+" "+e})).join(", "),s=xe(e).toLowerCase();if(!t.some((function(e){return s===e})))throw new ge(n+"object tested must be "+r+", but "+s+" given",void 0,o)},
/*!
 * message utility
 */
le.getMessage=function(e,t){var n=Te(e,"negate"),o=Te(e,"object"),r=t[3],s=_e(e,t),i=n?t[2]:t[1],a=Te(e,"message");return"function"==typeof i&&(i=i()),i=(i=i||"").replace(/#\{this\}/g,(function(){return Ce(o)})).replace(/#\{act\}/g,(function(){return Ce(s)})).replace(/#\{exp\}/g,(function(){return Ce(r)})),a?a+": "+i:i},
/*!
 * actual utility
 */
le.getActual=Oe,
/*!
 * Inspect util
 */
le.inspect=Me.exports,
/*!
 * Object Display util
 */
le.objDisplay=ke,
/*!
 * Flag utility
 */
le.flag=me,
/*!
 * Flag transferring utility
 */
le.transferFlags=Le,
/*!
 * Deep equal utility
 */
le.eql=ze.exports,
/*!
 * Deep path info
 */
le.getPathInfo=Ht.getPathInfo,
/*!
 * Check if a property exists
 */
le.hasProperty=Ht.hasProperty,
/*!
 * Function name
 */
le.getName=Ne,
/*!
 * add Property
 */
le.addProperty=function(e,t,n){n=void 0===n?function(){}:n,Object.defineProperty(e,t,{get:function e(){nt()||tt(this,"lockSsfi")||tt(this,"ssfi",e);var t=n.call(this);if(void 0!==t)return t;var o=new et.Assertion;return ot(this,o),o},configurable:!0})},
/*!
 * add Method
 */
le.addMethod=function(e,t,n){var o=function(){ht(this,"lockSsfi")||ht(this,"ssfi",o);var e=n.apply(this,arguments);if(void 0!==e)return e;var t=new dt.Assertion;return mt(this,t),t};pt(o,t,!1),e[t]=yt(o,t)},
/*!
 * overwrite Property
 */
le.overwriteProperty=function(e,t,n){var o=Object.getOwnPropertyDescriptor(e,t),r=function(){};o&&"function"==typeof o.get&&(r=o.get),Object.defineProperty(e,t,{get:function e(){gt()||wt(this,"lockSsfi")||wt(this,"ssfi",e);var t=wt(this,"lockSsfi");wt(this,"lockSsfi",!0);var o=n(r).call(this);if(wt(this,"lockSsfi",t),void 0!==o)return o;var s=new bt.Assertion;return vt(this,s),s},configurable:!0})},
/*!
 * overwrite Method
 */
le.overwriteMethod=function(e,t,n){var o=e[t],r=function(){throw new Error(t+" is not a function")};o&&"function"==typeof o&&(r=o);var s=function(){Mt(this,"lockSsfi")||Mt(this,"ssfi",s);var e=Mt(this,"lockSsfi");Mt(this,"lockSsfi",!0);var t=n(r).apply(this,arguments);if(Mt(this,"lockSsfi",e),void 0!==t)return t;var o=new Ot.Assertion;return jt(this,o),o};xt(s,t,!1),e[t]=Et(s,t)},
/*!
 * Add a chainable method
 */
le.addChainableMethod=function(e,t,n,o){"function"!=typeof o&&(o=function(){});var r={method:n,chainingBehavior:o};e.__methods||(e.__methods={}),e.__methods[t]=r,Object.defineProperty(e,t,{get:function(){r.chainingBehavior.call(this);var n=function(){It(this,"lockSsfi")||It(this,"ssfi",n);var e=r.method.apply(this,arguments);if(void 0!==e)return e;var t=new St.Assertion;return Pt(this,t),t};if(Nt(n,t,!0),Dt){var o=Object.create(this);o.call=_t,o.apply=Ct,Object.setPrototypeOf(n,o)}else{Object.getOwnPropertyNames(e).forEach((function(t){if(-1===Tt.indexOf(t)){var o=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,o)}}))}return Pt(this,n),At(n)},configurable:!0})},
/*!
 * Overwrite chainable method
 */
le.overwriteChainableMethod=function(e,t,n,o){var r=e.__methods[t],s=r.chainingBehavior;r.chainingBehavior=function(){var e=o(s).call(this);if(void 0!==e)return e;var t=new Lt.Assertion;return zt(this,t),t};var i=r.method;r.method=function(){var e=n(i).apply(this,arguments);if(void 0!==e)return e;var t=new Lt.Assertion;return zt(this,t),t}},
/*!
 * Compare by inspect method
 */
le.compareByInspect=function(e,t){return qt(e)<qt(t)?-1:1},
/*!
 * Get own enumerable property symbols method
 */
le.getOwnEnumerablePropertySymbols=Bt,
/*!
 * Get own enumerable properties method
 */
le.getOwnEnumerableProperties=function(e){return Object.keys(e).concat(Rt(e))},
/*!
 * Checks error against a given set of criteria
 */
le.checkError=Vt,
/*!
 * Proxify util
 */
le.proxify=ft,
/*!
 * addLengthGuard util
 */
le.addLengthGuard=st,
/*!
 * isProxyEnabled helper
 */
le.isProxyEnabled=Ze,
/*!
 * isNaN method
 */
le.isNaN=Ut;
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var Gt=Ae,Kt=function(e,t){
/*!
   * Module dependencies.
   */
var n=e.AssertionError,o=t.flag;
/*!
   * Module export.
   */
/*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   */
function r(e,n,s,i){return o(this,"ssfi",s||r),o(this,"lockSsfi",i),o(this,"object",e),o(this,"message",n),t.proxify(this)}e.Assertion=r,Object.defineProperty(r,"includeStack",{get:function(){return console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),Gt.includeStack},set:function(e){console.warn("Assertion.includeStack is deprecated, use chai.config.includeStack instead."),Gt.includeStack=e}}),Object.defineProperty(r,"showDiff",{get:function(){return console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),Gt.showDiff},set:function(e){console.warn("Assertion.showDiff is deprecated, use chai.config.showDiff instead."),Gt.showDiff=e}}),r.addProperty=function(e,n){t.addProperty(this.prototype,e,n)},r.addMethod=function(e,n){t.addMethod(this.prototype,e,n)},r.addChainableMethod=function(e,n,o){t.addChainableMethod(this.prototype,e,n,o)},r.overwriteProperty=function(e,n){t.overwriteProperty(this.prototype,e,n)},r.overwriteMethod=function(e,n){t.overwriteMethod(this.prototype,e,n)},r.overwriteChainableMethod=function(e,n,o){t.overwriteChainableMethod(this.prototype,e,n,o)},r.prototype.assert=function(e,r,s,i,a,c){var u=t.test(this,arguments);if(!1!==c&&(c=!0),void 0===i&&void 0===a&&(c=!1),!0!==Gt.showDiff&&(c=!1),!u){r=t.getMessage(this,arguments);var l=t.getActual(this,arguments);throw new n(r,{actual:l,expected:i,showDiff:c},Gt.includeStack?this.assert:o(this,"ssfi"))}},
/*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */
Object.defineProperty(r.prototype,"_obj",{get:function(){return o(this,"object")},set:function(e){o(this,"object",e)}})},Wt=function(e,t){var n=e.Assertion,o=e.AssertionError,r=t.flag;function s(e,n){n&&r(this,"message",n),e=e.toLowerCase();var o=r(this,"object"),s=~["a","e","i","o","u"].indexOf(e.charAt(0))?"an ":"a ";this.assert(e===t.type(o).toLowerCase(),"expected #{this} to be "+s+e,"expected #{this} not to be "+s+e)}function i(e,n){return t.isNaN(e)&&t.isNaN(n)||e===n}function a(){r(this,"contains",!0)}function c(e,s){s&&r(this,"message",s);var a=r(this,"object"),c=t.type(a).toLowerCase(),u=r(this,"message"),l=r(this,"negate"),f=r(this,"ssfi"),p=r(this,"deep"),d=p?"deep ":"";u=u?u+": ":"";var h=!1;switch(c){case"string":h=-1!==a.indexOf(e);break;case"weakset":if(p)throw new o(u+"unable to use .deep.include with WeakSet",void 0,f);h=a.has(e);break;case"map":var y=p?t.eql:i;a.forEach((function(t){h=h||y(t,e)}));break;case"set":p?a.forEach((function(n){h=h||t.eql(n,e)})):h=a.has(e);break;case"array":h=p?a.some((function(n){return t.eql(n,e)})):-1!==a.indexOf(e);break;default:if(e!==Object(e))throw new o(u+"object tested must be an array, a map, an object, a set, a string, or a weakset, but "+c+" given",void 0,f);var m=Object.keys(e),b=null,w=0;if(m.forEach((function(s){var i=new n(a);if(t.transferFlags(this,i,!0),r(i,"lockSsfi",!0),l&&1!==m.length)try{i.property(s,e[s])}catch(e){if(!t.checkError.compatibleConstructor(e,o))throw e;null===b&&(b=e),w++}else i.property(s,e[s])}),this),l&&m.length>1&&w===m.length)throw b;return}this.assert(h,"expected #{this} to "+d+"include "+t.inspect(e),"expected #{this} to not "+d+"include "+t.inspect(e))}function u(){var e=r(this,"object"),n=t.type(e);this.assert("Arguments"===n,"expected #{this} to be arguments but got "+n,"expected #{this} to not be arguments")}function l(e,t){t&&r(this,"message",t);var n=r(this,"object");if(r(this,"deep")){var o=r(this,"lockSsfi");r(this,"lockSsfi",!0),this.eql(e),r(this,"lockSsfi",o)}else this.assert(e===n,"expected #{this} to equal #{exp}","expected #{this} to not equal #{exp}",e,this._obj,!0)}function f(e,n){n&&r(this,"message",n),this.assert(t.eql(e,r(this,"object")),"expected #{this} to deeply equal #{exp}","expected #{this} to not deeply equal #{exp}",e,this._obj,!0)}function p(e,s){s&&r(this,"message",s);var i,a=r(this,"object"),c=r(this,"doLength"),u=r(this,"message"),l=u?u+": ":"",f=r(this,"ssfi"),p=t.type(a).toLowerCase(),d=t.type(e).toLowerCase(),h=!0;if(c&&"map"!==p&&"set"!==p&&new n(a,u,f,!0).to.have.property("length"),c||"date"!==p||"date"===d)if("number"===d||!c&&"number"!==p)if(c||"date"===p||"number"===p)h=!1;else{i=l+"expected "+("string"===p?"'"+a+"'":a)+" to be a number or a date"}else i=l+"the argument to above must be a number";else i=l+"the argument to above must be a date";if(h)throw new o(i,void 0,f);if(c){var y,m="length";"map"===p||"set"===p?(m="size",y=a.size):y=a.length,this.assert(y>e,"expected #{this} to have a "+m+" above #{exp} but got #{act}","expected #{this} to not have a "+m+" above #{exp}",e,y)}else this.assert(a>e,"expected #{this} to be above #{exp}","expected #{this} to be at most #{exp}",e)}function d(e,s){s&&r(this,"message",s);var i,a=r(this,"object"),c=r(this,"doLength"),u=r(this,"message"),l=u?u+": ":"",f=r(this,"ssfi"),p=t.type(a).toLowerCase(),d=t.type(e).toLowerCase(),h=!0;if(c&&"map"!==p&&"set"!==p&&new n(a,u,f,!0).to.have.property("length"),c||"date"!==p||"date"===d)if("number"===d||!c&&"number"!==p)if(c||"date"===p||"number"===p)h=!1;else{i=l+"expected "+("string"===p?"'"+a+"'":a)+" to be a number or a date"}else i=l+"the argument to least must be a number";else i=l+"the argument to least must be a date";if(h)throw new o(i,void 0,f);if(c){var y,m="length";"map"===p||"set"===p?(m="size",y=a.size):y=a.length,this.assert(y>=e,"expected #{this} to have a "+m+" at least #{exp} but got #{act}","expected #{this} to have a "+m+" below #{exp}",e,y)}else this.assert(a>=e,"expected #{this} to be at least #{exp}","expected #{this} to be below #{exp}",e)}function h(e,s){s&&r(this,"message",s);var i,a=r(this,"object"),c=r(this,"doLength"),u=r(this,"message"),l=u?u+": ":"",f=r(this,"ssfi"),p=t.type(a).toLowerCase(),d=t.type(e).toLowerCase(),h=!0;if(c&&"map"!==p&&"set"!==p&&new n(a,u,f,!0).to.have.property("length"),c||"date"!==p||"date"===d)if("number"===d||!c&&"number"!==p)if(c||"date"===p||"number"===p)h=!1;else{i=l+"expected "+("string"===p?"'"+a+"'":a)+" to be a number or a date"}else i=l+"the argument to below must be a number";else i=l+"the argument to below must be a date";if(h)throw new o(i,void 0,f);if(c){var y,m="length";"map"===p||"set"===p?(m="size",y=a.size):y=a.length,this.assert(y<e,"expected #{this} to have a "+m+" below #{exp} but got #{act}","expected #{this} to not have a "+m+" below #{exp}",e,y)}else this.assert(a<e,"expected #{this} to be below #{exp}","expected #{this} to be at least #{exp}",e)}function y(e,s){s&&r(this,"message",s);var i,a=r(this,"object"),c=r(this,"doLength"),u=r(this,"message"),l=u?u+": ":"",f=r(this,"ssfi"),p=t.type(a).toLowerCase(),d=t.type(e).toLowerCase(),h=!0;if(c&&"map"!==p&&"set"!==p&&new n(a,u,f,!0).to.have.property("length"),c||"date"!==p||"date"===d)if("number"===d||!c&&"number"!==p)if(c||"date"===p||"number"===p)h=!1;else{i=l+"expected "+("string"===p?"'"+a+"'":a)+" to be a number or a date"}else i=l+"the argument to most must be a number";else i=l+"the argument to most must be a date";if(h)throw new o(i,void 0,f);if(c){var y,m="length";"map"===p||"set"===p?(m="size",y=a.size):y=a.length,this.assert(y<=e,"expected #{this} to have a "+m+" at most #{exp} but got #{act}","expected #{this} to have a "+m+" above #{exp}",e,y)}else this.assert(a<=e,"expected #{this} to be at most #{exp}","expected #{this} to be above #{exp}",e)}function m(e,n){n&&r(this,"message",n);var s=r(this,"object"),i=r(this,"ssfi"),a=r(this,"message");try{var c=s instanceof e}catch(n){if(n instanceof TypeError)throw new o((a=a?a+": ":"")+"The instanceof assertion needs a constructor but "+t.type(e)+" was given.",void 0,i);throw n}var u=t.getName(e);null===u&&(u="an unnamed constructor"),this.assert(c,"expected #{this} to be an instance of "+u,"expected #{this} to not be an instance of "+u)}function b(e,n,s){s&&r(this,"message",s);var i=r(this,"nested"),a=r(this,"own"),c=r(this,"message"),u=r(this,"object"),l=r(this,"ssfi"),f=typeof e;if(c=c?c+": ":"",i){if("string"!==f)throw new o(c+"the argument to property must be a string when using nested syntax",void 0,l)}else if("string"!==f&&"number"!==f&&"symbol"!==f)throw new o(c+"the argument to property must be a string, number, or symbol",void 0,l);if(i&&a)throw new o(c+'The "nested" and "own" flags cannot be combined.',void 0,l);if(null==u)throw new o(c+"Target cannot be null or undefined.",void 0,l);var p,d=r(this,"deep"),h=r(this,"negate"),y=i?t.getPathInfo(u,e):null,m=i?y.value:u[e],b="";d&&(b+="deep "),a&&(b+="own "),i&&(b+="nested "),b+="property ",p=a?Object.prototype.hasOwnProperty.call(u,e):i?y.exists:t.hasProperty(u,e),h&&1!==arguments.length||this.assert(p,"expected #{this} to have "+b+t.inspect(e),"expected #{this} to not have "+b+t.inspect(e)),arguments.length>1&&this.assert(p&&(d?t.eql(n,m):n===m),"expected #{this} to have "+b+t.inspect(e)+" of #{exp}, but got #{act}","expected #{this} to not have "+b+t.inspect(e)+" of #{act}",n,m),r(this,"object",m)}function w(e,t,n){r(this,"own",!0),b.apply(this,arguments)}function g(e,n,o){"string"==typeof n&&(o=n,n=null),o&&r(this,"message",o);var s=r(this,"object"),i=Object.getOwnPropertyDescriptor(Object(s),e);i&&n?this.assert(t.eql(n,i),"expected the own property descriptor for "+t.inspect(e)+" on #{this} to match "+t.inspect(n)+", got "+t.inspect(i),"expected the own property descriptor for "+t.inspect(e)+" on #{this} to not match "+t.inspect(n),n,i,!0):this.assert(i,"expected #{this} to have an own property descriptor for "+t.inspect(e),"expected #{this} to not have an own property descriptor for "+t.inspect(e)),r(this,"object",i)}function v(){r(this,"doLength",!0)}function x(e,o){o&&r(this,"message",o);var s,i=r(this,"object"),a=t.type(i).toLowerCase(),c=r(this,"message"),u=r(this,"ssfi"),l="length";switch(a){case"map":case"set":l="size",s=i.size;break;default:new n(i,c,u,!0).to.have.property("length"),s=i.length}this.assert(s==e,"expected #{this} to have a "+l+" of #{exp} but got #{act}","expected #{this} to not have a "+l+" of #{act}",e,s)}function O(e,t){t&&r(this,"message",t);var n=r(this,"object");this.assert(e.exec(n),"expected #{this} to match "+e,"expected #{this} not to match "+e)}function M(e){var n,s,i=r(this,"object"),a=t.type(i),c=t.type(e),u=r(this,"ssfi"),l=r(this,"deep"),f="",p=!0,d=r(this,"message"),h=(d=d?d+": ":"")+"when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";if("Map"===a||"Set"===a)f=l?"deeply ":"",s=[],i.forEach((function(e,t){s.push(t)})),"Array"!==c&&(e=Array.prototype.slice.call(arguments));else{switch(s=t.getOwnEnumerableProperties(i),c){case"Array":if(arguments.length>1)throw new o(h,void 0,u);break;case"Object":if(arguments.length>1)throw new o(h,void 0,u);e=Object.keys(e);break;default:e=Array.prototype.slice.call(arguments)}e=e.map((function(e){return"symbol"==typeof e?e:String(e)}))}if(!e.length)throw new o(d+"keys required",void 0,u);var y=e.length,m=r(this,"any"),b=r(this,"all"),w=e;if(m||b||(b=!0),m&&(p=w.some((function(e){return s.some((function(n){return l?t.eql(e,n):e===n}))}))),b&&(p=w.every((function(e){return s.some((function(n){return l?t.eql(e,n):e===n}))})),r(this,"contains")||(p=p&&e.length==s.length)),y>1){var g=(e=e.map((function(e){return t.inspect(e)}))).pop();b&&(n=e.join(", ")+", and "+g),m&&(n=e.join(", ")+", or "+g)}else n=t.inspect(e[0]);n=(y>1?"keys ":"key ")+n,n=(r(this,"contains")?"contain ":"have ")+n,this.assert(p,"expected #{this} to "+f+n,"expected #{this} to not "+f+n,w.slice(0).sort(t.compareByInspect),s.sort(t.compareByInspect),!0)}function E(e,o,s){s&&r(this,"message",s);var i,a=r(this,"object"),c=r(this,"ssfi"),u=r(this,"message"),l=r(this,"negate")||!1;new n(a,u,c,!0).is.a("function"),(e instanceof RegExp||"string"==typeof e)&&(o=e,e=null);try{a()}catch(e){i=e}var f=void 0===e&&void 0===o,p=Boolean(e&&o),d=!1,h=!1;if(f||!f&&!l){var y="an error";e instanceof Error?y="#{exp}":e&&(y=t.checkError.getConstructorName(e)),this.assert(i,"expected #{this} to throw "+y,"expected #{this} to not throw an error but #{act} was thrown",e&&e.toString(),i instanceof Error?i.toString():"string"==typeof i?i:i&&t.checkError.getConstructorName(i))}if(e&&i){if(e instanceof Error)t.checkError.compatibleInstance(i,e)===l&&(p&&l?d=!0:this.assert(l,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}"+(i&&!l?" but #{act} was thrown":""),e.toString(),i.toString()));t.checkError.compatibleConstructor(i,e)===l&&(p&&l?d=!0:this.assert(l,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}"+(i?" but #{act} was thrown":""),e instanceof Error?e.toString():e&&t.checkError.getConstructorName(e),i instanceof Error?i.toString():i&&t.checkError.getConstructorName(i)))}if(i&&null!=o){var m="including";o instanceof RegExp&&(m="matching"),t.checkError.compatibleMessage(i,o)===l&&(p&&l?h=!0:this.assert(l,"expected #{this} to throw error "+m+" #{exp} but got #{act}","expected #{this} to throw error not "+m+" #{exp}",o,t.checkError.getMessage(i)))}d&&h&&this.assert(l,"expected #{this} to throw #{exp} but #{act} was thrown","expected #{this} to not throw #{exp}"+(i?" but #{act} was thrown":""),e instanceof Error?e.toString():e&&t.checkError.getConstructorName(e),i instanceof Error?i.toString():i&&t.checkError.getConstructorName(i)),r(this,"object",i)}function j(e,n){n&&r(this,"message",n);var o=r(this,"object"),s=r(this,"itself"),i="function"!=typeof o||s?o[e]:o.prototype[e];this.assert("function"==typeof i,"expected #{this} to respond to "+t.inspect(e),"expected #{this} to not respond to "+t.inspect(e))}function N(e,n){n&&r(this,"message",n);var o=e(r(this,"object"));this.assert(o,"expected #{this} to satisfy "+t.objDisplay(e),"expected #{this} to not satisfy"+t.objDisplay(e),!r(this,"negate"),o)}function S(e,t,s){s&&r(this,"message",s);var i=r(this,"object"),a=r(this,"message"),c=r(this,"ssfi");if(new n(i,a,c,!0).is.a("number"),"number"!=typeof e||"number"!=typeof t)throw new o((a=a?a+": ":"")+"the arguments to closeTo or approximately must be numbers",void 0,c);this.assert(Math.abs(i-e)<=t,"expected #{this} to be close to "+e+" +/- "+t,"expected #{this} not to be close to "+e+" +/- "+t)}function I(e,t,o){o&&r(this,"message",o);var s,i=r(this,"object"),a=r(this,"message"),c=r(this,"ssfi");new n(i,a,c,!0).is.a("function"),t?(new n(e,a,c,!0).to.have.property(t),s=e[t]):(new n(e,a,c,!0).is.a("function"),s=e()),i();var u=null==t?e():e[t],l=null==t?s:"."+t;r(this,"deltaMsgObj",l),r(this,"initialDeltaValue",s),r(this,"finalDeltaValue",u),r(this,"deltaBehavior","change"),r(this,"realDelta",u!==s),this.assert(s!==u,"expected "+l+" to change","expected "+l+" to not change")}function A(e,t,o){o&&r(this,"message",o);var s,i=r(this,"object"),a=r(this,"message"),c=r(this,"ssfi");new n(i,a,c,!0).is.a("function"),t?(new n(e,a,c,!0).to.have.property(t),s=e[t]):(new n(e,a,c,!0).is.a("function"),s=e()),new n(s,a,c,!0).is.a("number"),i();var u=null==t?e():e[t],l=null==t?s:"."+t;r(this,"deltaMsgObj",l),r(this,"initialDeltaValue",s),r(this,"finalDeltaValue",u),r(this,"deltaBehavior","increase"),r(this,"realDelta",u-s),this.assert(u-s>0,"expected "+l+" to increase","expected "+l+" to not increase")}function P(e,t,o){o&&r(this,"message",o);var s,i=r(this,"object"),a=r(this,"message"),c=r(this,"ssfi");new n(i,a,c,!0).is.a("function"),t?(new n(e,a,c,!0).to.have.property(t),s=e[t]):(new n(e,a,c,!0).is.a("function"),s=e()),new n(s,a,c,!0).is.a("number"),i();var u=null==t?e():e[t],l=null==t?s:"."+t;r(this,"deltaMsgObj",l),r(this,"initialDeltaValue",s),r(this,"finalDeltaValue",u),r(this,"deltaBehavior","decrease"),r(this,"realDelta",s-u),this.assert(u-s<0,"expected "+l+" to decrease","expected "+l+" to not decrease")}["to","be","been","is","and","has","have","with","that","which","at","of","same","but","does","still"].forEach((function(e){n.addProperty(e)})),n.addProperty("not",(function(){r(this,"negate",!0)})),n.addProperty("deep",(function(){r(this,"deep",!0)})),n.addProperty("nested",(function(){r(this,"nested",!0)})),n.addProperty("own",(function(){r(this,"own",!0)})),n.addProperty("ordered",(function(){r(this,"ordered",!0)})),n.addProperty("any",(function(){r(this,"any",!0),r(this,"all",!1)})),n.addProperty("all",(function(){r(this,"all",!0),r(this,"any",!1)})),n.addChainableMethod("an",s),n.addChainableMethod("a",s),n.addChainableMethod("include",c,a),n.addChainableMethod("contain",c,a),n.addChainableMethod("contains",c,a),n.addChainableMethod("includes",c,a),n.addProperty("ok",(function(){this.assert(r(this,"object"),"expected #{this} to be truthy","expected #{this} to be falsy")})),n.addProperty("true",(function(){this.assert(!0===r(this,"object"),"expected #{this} to be true","expected #{this} to be false",!r(this,"negate"))})),n.addProperty("false",(function(){this.assert(!1===r(this,"object"),"expected #{this} to be false","expected #{this} to be true",!!r(this,"negate"))})),n.addProperty("null",(function(){this.assert(null===r(this,"object"),"expected #{this} to be null","expected #{this} not to be null")})),n.addProperty("undefined",(function(){this.assert(void 0===r(this,"object"),"expected #{this} to be undefined","expected #{this} not to be undefined")})),n.addProperty("NaN",(function(){this.assert(t.isNaN(r(this,"object")),"expected #{this} to be NaN","expected #{this} not to be NaN")})),n.addProperty("exist",(function(){var e=r(this,"object");this.assert(null!=e,"expected #{this} to exist","expected #{this} to not exist")})),n.addProperty("empty",(function(){var e,n=r(this,"object"),s=r(this,"ssfi"),i=r(this,"message");switch(i=i?i+": ":"",t.type(n).toLowerCase()){case"array":case"string":e=n.length;break;case"map":case"set":e=n.size;break;case"weakmap":case"weakset":throw new o(i+".empty was passed a weak collection",void 0,s);case"function":var a=i+".empty was passed a function "+t.getName(n);throw new o(a.trim(),void 0,s);default:if(n!==Object(n))throw new o(i+".empty was passed non-string primitive "+t.inspect(n),void 0,s);e=Object.keys(n).length}this.assert(0===e,"expected #{this} to be empty","expected #{this} not to be empty")})),n.addProperty("arguments",u),n.addProperty("Arguments",u),n.addMethod("equal",l),n.addMethod("equals",l),n.addMethod("eq",l),n.addMethod("eql",f),n.addMethod("eqls",f),n.addMethod("above",p),n.addMethod("gt",p),n.addMethod("greaterThan",p),n.addMethod("least",d),n.addMethod("gte",d),n.addMethod("below",h),n.addMethod("lt",h),n.addMethod("lessThan",h),n.addMethod("most",y),n.addMethod("lte",y),n.addMethod("within",(function(e,s,i){i&&r(this,"message",i);var a,c=r(this,"object"),u=r(this,"doLength"),l=r(this,"message"),f=l?l+": ":"",p=r(this,"ssfi"),d=t.type(c).toLowerCase(),h=t.type(e).toLowerCase(),y=t.type(s).toLowerCase(),m=!0,b="date"===h&&"date"===y?e.toUTCString()+".."+s.toUTCString():e+".."+s;if(u&&"map"!==d&&"set"!==d&&new n(c,l,p,!0).to.have.property("length"),u||"date"!==d||"date"===h&&"date"===y)if("number"===h&&"number"===y||!u&&"number"!==d)if(u||"date"===d||"number"===d)m=!1;else{a=f+"expected "+("string"===d?"'"+c+"'":c)+" to be a number or a date"}else a=f+"the arguments to within must be numbers";else a=f+"the arguments to within must be dates";if(m)throw new o(a,void 0,p);if(u){var w,g="length";"map"===d||"set"===d?(g="size",w=c.size):w=c.length,this.assert(w>=e&&w<=s,"expected #{this} to have a "+g+" within "+b,"expected #{this} to not have a "+g+" within "+b)}else this.assert(c>=e&&c<=s,"expected #{this} to be within "+b,"expected #{this} to not be within "+b)})),n.addMethod("instanceof",m),n.addMethod("instanceOf",m),n.addMethod("property",b),n.addMethod("ownProperty",w),n.addMethod("haveOwnProperty",w),n.addMethod("ownPropertyDescriptor",g),n.addMethod("haveOwnPropertyDescriptor",g),n.addChainableMethod("length",x,v),n.addChainableMethod("lengthOf",x,v),n.addMethod("match",O),n.addMethod("matches",O),n.addMethod("string",(function(e,o){o&&r(this,"message",o);var s=r(this,"object"),i=r(this,"message"),a=r(this,"ssfi");new n(s,i,a,!0).is.a("string"),this.assert(~s.indexOf(e),"expected #{this} to contain "+t.inspect(e),"expected #{this} to not contain "+t.inspect(e))})),n.addMethod("keys",M),n.addMethod("key",M),n.addMethod("throw",E),n.addMethod("throws",E),n.addMethod("Throw",E),n.addMethod("respondTo",j),n.addMethod("respondsTo",j),n.addProperty("itself",(function(){r(this,"itself",!0)})),n.addMethod("satisfy",N),n.addMethod("satisfies",N),n.addMethod("closeTo",S),n.addMethod("approximately",S),n.addMethod("members",(function(e,o){o&&r(this,"message",o);var s=r(this,"object"),i=r(this,"message"),a=r(this,"ssfi");new n(s,i,a,!0).to.be.an("array"),new n(e,i,a,!0).to.be.an("array");var c,u,l,f=r(this,"contains"),p=r(this,"ordered");f?(u="expected #{this} to be "+(c=p?"an ordered superset":"a superset")+" of #{exp}",l="expected #{this} to not be "+c+" of #{exp}"):(u="expected #{this} to have the same "+(c=p?"ordered members":"members")+" as #{exp}",l="expected #{this} to not have the same "+c+" as #{exp}");var d=r(this,"deep")?t.eql:void 0;this.assert(function(e,t,n,o,r){if(!o){if(e.length!==t.length)return!1;t=t.slice()}return e.every((function(e,s){if(r)return n?n(e,t[s]):e===t[s];if(!n){var i=t.indexOf(e);return-1!==i&&(o||t.splice(i,1),!0)}return t.some((function(r,s){return!!n(e,r)&&(o||t.splice(s,1),!0)}))}))}(e,s,d,f,p),u,l,e,s,!0)})),n.addMethod("oneOf",(function(e,t){t&&r(this,"message",t);var o=r(this,"object"),s=r(this,"message"),i=r(this,"ssfi");new n(e,s,i,!0).to.be.an("array"),this.assert(e.indexOf(o)>-1,"expected #{this} to be one of #{exp}","expected #{this} to not be one of #{exp}",e,o)})),n.addMethod("change",I),n.addMethod("changes",I),n.addMethod("increase",A),n.addMethod("increases",A),n.addMethod("decrease",P),n.addMethod("decreases",P),n.addMethod("by",(function(e,t){t&&r(this,"message",t);var n,o=r(this,"deltaMsgObj"),s=r(this,"initialDeltaValue"),i=r(this,"finalDeltaValue"),a=r(this,"deltaBehavior"),c=r(this,"realDelta");n="change"===a?Math.abs(i-s)===Math.abs(e):c===Math.abs(e),this.assert(n,"expected "+o+" to "+a+" by "+e,"expected "+o+" to not "+a+" by "+e)})),n.addProperty("extensible",(function(){var e=r(this,"object"),t=e===Object(e)&&Object.isExtensible(e);this.assert(t,"expected #{this} to be extensible","expected #{this} to not be extensible")})),n.addProperty("sealed",(function(){var e=r(this,"object"),t=e!==Object(e)||Object.isSealed(e);this.assert(t,"expected #{this} to be sealed","expected #{this} to not be sealed")})),n.addProperty("frozen",(function(){var e=r(this,"object"),t=e!==Object(e)||Object.isFrozen(e);this.assert(t,"expected #{this} to be frozen","expected #{this} to not be frozen")})),n.addProperty("finite",(function(e){var t=r(this,"object");this.assert("number"==typeof t&&isFinite(t),"expected #{this} to be a finite number","expected #{this} to not be a finite number")}))},Jt=function(e,t){e.expect=function(t,n){return new e.Assertion(t,n)},e.expect.fail=function(t,n,o,r){throw arguments.length<2&&(o=t,t=void 0),o=o||"expect.fail()",new e.AssertionError(o,{actual:t,expected:n,operator:r},e.expect.fail)}},Qt=function(e,t){var n=e.Assertion;function o(){Object.defineProperty(Object.prototype,"should",{set:function(e){Object.defineProperty(this,"should",{value:e,enumerable:!0,configurable:!0,writable:!0})},get:function e(){return this instanceof String||this instanceof Number||this instanceof Boolean||"function"==typeof Symbol&&this instanceof Symbol?new n(this.valueOf(),null,e):new n(this,null,e)},configurable:!0});var t={fail:function(n,o,r,s){throw arguments.length<2&&(r=n,n=void 0),r=r||"should.fail()",new e.AssertionError(r,{actual:n,expected:o,operator:s},t.fail)},equal:function(e,t,o){new n(e,o).to.equal(t)},Throw:function(e,t,o,r){new n(e,r).to.Throw(t,o)},exist:function(e,t){new n(e,t).to.exist},not:{}};return t.not.equal=function(e,t,o){new n(e,o).to.not.equal(t)},t.not.Throw=function(e,t,o,r){new n(e,r).to.not.Throw(t,o)},t.not.exist=function(e,t){new n(e,t).to.not.exist},t.throw=t.Throw,t.not.throw=t.not.Throw,t}e.should=o,e.Should=o},Yt=function(e,t){
/*!
   * Chai dependencies.
   */
var n=e.Assertion,o=t.flag,r=e.assert=function(t,o){new n(null,null,e.assert,!0).assert(t,o,"[ negation message unavailable ]")};
/*!
   * Module export.
   */r.fail=function(t,n,o,s){throw arguments.length<2&&(o=t,t=void 0),o=o||"assert.fail()",new e.AssertionError(o,{actual:t,expected:n,operator:s},r.fail)},r.isOk=function(e,t){new n(e,t,r.isOk,!0).is.ok},r.isNotOk=function(e,t){new n(e,t,r.isNotOk,!0).is.not.ok},r.equal=function(e,t,s){var i=new n(e,s,r.equal,!0);i.assert(t==o(i,"object"),"expected #{this} to equal #{exp}","expected #{this} to not equal #{act}",t,e,!0)},r.notEqual=function(e,t,s){var i=new n(e,s,r.notEqual,!0);i.assert(t!=o(i,"object"),"expected #{this} to not equal #{exp}","expected #{this} to equal #{act}",t,e,!0)},r.strictEqual=function(e,t,o){new n(e,o,r.strictEqual,!0).to.equal(t)},r.notStrictEqual=function(e,t,o){new n(e,o,r.notStrictEqual,!0).to.not.equal(t)},r.deepEqual=r.deepStrictEqual=function(e,t,o){new n(e,o,r.deepEqual,!0).to.eql(t)},r.notDeepEqual=function(e,t,o){new n(e,o,r.notDeepEqual,!0).to.not.eql(t)},r.isAbove=function(e,t,o){new n(e,o,r.isAbove,!0).to.be.above(t)},r.isAtLeast=function(e,t,o){new n(e,o,r.isAtLeast,!0).to.be.least(t)},r.isBelow=function(e,t,o){new n(e,o,r.isBelow,!0).to.be.below(t)},r.isAtMost=function(e,t,o){new n(e,o,r.isAtMost,!0).to.be.most(t)},r.isTrue=function(e,t){new n(e,t,r.isTrue,!0).is.true},r.isNotTrue=function(e,t){new n(e,t,r.isNotTrue,!0).to.not.equal(!0)},r.isFalse=function(e,t){new n(e,t,r.isFalse,!0).is.false},r.isNotFalse=function(e,t){new n(e,t,r.isNotFalse,!0).to.not.equal(!1)},r.isNull=function(e,t){new n(e,t,r.isNull,!0).to.equal(null)},r.isNotNull=function(e,t){new n(e,t,r.isNotNull,!0).to.not.equal(null)},r.isNaN=function(e,t){new n(e,t,r.isNaN,!0).to.be.NaN},r.isNotNaN=function(e,t){new n(e,t,r.isNotNaN,!0).not.to.be.NaN},r.exists=function(e,t){new n(e,t,r.exists,!0).to.exist},r.notExists=function(e,t){new n(e,t,r.notExists,!0).to.not.exist},r.isUndefined=function(e,t){new n(e,t,r.isUndefined,!0).to.equal(void 0)},r.isDefined=function(e,t){new n(e,t,r.isDefined,!0).to.not.equal(void 0)},r.isFunction=function(e,t){new n(e,t,r.isFunction,!0).to.be.a("function")},r.isNotFunction=function(e,t){new n(e,t,r.isNotFunction,!0).to.not.be.a("function")},r.isObject=function(e,t){new n(e,t,r.isObject,!0).to.be.a("object")},r.isNotObject=function(e,t){new n(e,t,r.isNotObject,!0).to.not.be.a("object")},r.isArray=function(e,t){new n(e,t,r.isArray,!0).to.be.an("array")},r.isNotArray=function(e,t){new n(e,t,r.isNotArray,!0).to.not.be.an("array")},r.isString=function(e,t){new n(e,t,r.isString,!0).to.be.a("string")},r.isNotString=function(e,t){new n(e,t,r.isNotString,!0).to.not.be.a("string")},r.isNumber=function(e,t){new n(e,t,r.isNumber,!0).to.be.a("number")},r.isNotNumber=function(e,t){new n(e,t,r.isNotNumber,!0).to.not.be.a("number")},r.isFinite=function(e,t){new n(e,t,r.isFinite,!0).to.be.finite},r.isBoolean=function(e,t){new n(e,t,r.isBoolean,!0).to.be.a("boolean")},r.isNotBoolean=function(e,t){new n(e,t,r.isNotBoolean,!0).to.not.be.a("boolean")},r.typeOf=function(e,t,o){new n(e,o,r.typeOf,!0).to.be.a(t)},r.notTypeOf=function(e,t,o){new n(e,o,r.notTypeOf,!0).to.not.be.a(t)},r.instanceOf=function(e,t,o){new n(e,o,r.instanceOf,!0).to.be.instanceOf(t)},r.notInstanceOf=function(e,t,o){new n(e,o,r.notInstanceOf,!0).to.not.be.instanceOf(t)},r.include=function(e,t,o){new n(e,o,r.include,!0).include(t)},r.notInclude=function(e,t,o){new n(e,o,r.notInclude,!0).not.include(t)},r.deepInclude=function(e,t,o){new n(e,o,r.deepInclude,!0).deep.include(t)},r.notDeepInclude=function(e,t,o){new n(e,o,r.notDeepInclude,!0).not.deep.include(t)},r.nestedInclude=function(e,t,o){new n(e,o,r.nestedInclude,!0).nested.include(t)},r.notNestedInclude=function(e,t,o){new n(e,o,r.notNestedInclude,!0).not.nested.include(t)},r.deepNestedInclude=function(e,t,o){new n(e,o,r.deepNestedInclude,!0).deep.nested.include(t)},r.notDeepNestedInclude=function(e,t,o){new n(e,o,r.notDeepNestedInclude,!0).not.deep.nested.include(t)},r.ownInclude=function(e,t,o){new n(e,o,r.ownInclude,!0).own.include(t)},r.notOwnInclude=function(e,t,o){new n(e,o,r.notOwnInclude,!0).not.own.include(t)},r.deepOwnInclude=function(e,t,o){new n(e,o,r.deepOwnInclude,!0).deep.own.include(t)},r.notDeepOwnInclude=function(e,t,o){new n(e,o,r.notDeepOwnInclude,!0).not.deep.own.include(t)},r.match=function(e,t,o){new n(e,o,r.match,!0).to.match(t)},r.notMatch=function(e,t,o){new n(e,o,r.notMatch,!0).to.not.match(t)},r.property=function(e,t,o){new n(e,o,r.property,!0).to.have.property(t)},r.notProperty=function(e,t,o){new n(e,o,r.notProperty,!0).to.not.have.property(t)},r.propertyVal=function(e,t,o,s){new n(e,s,r.propertyVal,!0).to.have.property(t,o)},r.notPropertyVal=function(e,t,o,s){new n(e,s,r.notPropertyVal,!0).to.not.have.property(t,o)},r.deepPropertyVal=function(e,t,o,s){new n(e,s,r.deepPropertyVal,!0).to.have.deep.property(t,o)},r.notDeepPropertyVal=function(e,t,o,s){new n(e,s,r.notDeepPropertyVal,!0).to.not.have.deep.property(t,o)},r.ownProperty=function(e,t,o){new n(e,o,r.ownProperty,!0).to.have.own.property(t)},r.notOwnProperty=function(e,t,o){new n(e,o,r.notOwnProperty,!0).to.not.have.own.property(t)},r.ownPropertyVal=function(e,t,o,s){new n(e,s,r.ownPropertyVal,!0).to.have.own.property(t,o)},r.notOwnPropertyVal=function(e,t,o,s){new n(e,s,r.notOwnPropertyVal,!0).to.not.have.own.property(t,o)},r.deepOwnPropertyVal=function(e,t,o,s){new n(e,s,r.deepOwnPropertyVal,!0).to.have.deep.own.property(t,o)},r.notDeepOwnPropertyVal=function(e,t,o,s){new n(e,s,r.notDeepOwnPropertyVal,!0).to.not.have.deep.own.property(t,o)},r.nestedProperty=function(e,t,o){new n(e,o,r.nestedProperty,!0).to.have.nested.property(t)},r.notNestedProperty=function(e,t,o){new n(e,o,r.notNestedProperty,!0).to.not.have.nested.property(t)},r.nestedPropertyVal=function(e,t,o,s){new n(e,s,r.nestedPropertyVal,!0).to.have.nested.property(t,o)},r.notNestedPropertyVal=function(e,t,o,s){new n(e,s,r.notNestedPropertyVal,!0).to.not.have.nested.property(t,o)},r.deepNestedPropertyVal=function(e,t,o,s){new n(e,s,r.deepNestedPropertyVal,!0).to.have.deep.nested.property(t,o)},r.notDeepNestedPropertyVal=function(e,t,o,s){new n(e,s,r.notDeepNestedPropertyVal,!0).to.not.have.deep.nested.property(t,o)},r.lengthOf=function(e,t,o){new n(e,o,r.lengthOf,!0).to.have.lengthOf(t)},r.hasAnyKeys=function(e,t,o){new n(e,o,r.hasAnyKeys,!0).to.have.any.keys(t)},r.hasAllKeys=function(e,t,o){new n(e,o,r.hasAllKeys,!0).to.have.all.keys(t)},r.containsAllKeys=function(e,t,o){new n(e,o,r.containsAllKeys,!0).to.contain.all.keys(t)},r.doesNotHaveAnyKeys=function(e,t,o){new n(e,o,r.doesNotHaveAnyKeys,!0).to.not.have.any.keys(t)},r.doesNotHaveAllKeys=function(e,t,o){new n(e,o,r.doesNotHaveAllKeys,!0).to.not.have.all.keys(t)},r.hasAnyDeepKeys=function(e,t,o){new n(e,o,r.hasAnyDeepKeys,!0).to.have.any.deep.keys(t)},r.hasAllDeepKeys=function(e,t,o){new n(e,o,r.hasAllDeepKeys,!0).to.have.all.deep.keys(t)},r.containsAllDeepKeys=function(e,t,o){new n(e,o,r.containsAllDeepKeys,!0).to.contain.all.deep.keys(t)},r.doesNotHaveAnyDeepKeys=function(e,t,o){new n(e,o,r.doesNotHaveAnyDeepKeys,!0).to.not.have.any.deep.keys(t)},r.doesNotHaveAllDeepKeys=function(e,t,o){new n(e,o,r.doesNotHaveAllDeepKeys,!0).to.not.have.all.deep.keys(t)},r.throws=function(e,t,s,i){("string"==typeof t||t instanceof RegExp)&&(s=t,t=null);var a=new n(e,i,r.throws,!0).to.throw(t,s);return o(a,"object")},r.doesNotThrow=function(e,t,o,s){("string"==typeof t||t instanceof RegExp)&&(o=t,t=null),new n(e,s,r.doesNotThrow,!0).to.not.throw(t,o)},r.operator=function(s,i,a,c){var u;switch(i){case"==":u=s==a;break;case"===":u=s===a;break;case">":u=s>a;break;case">=":u=s>=a;break;case"<":u=s<a;break;case"<=":u=s<=a;break;case"!=":u=s!=a;break;case"!==":u=s!==a;break;default:throw c=c?c+": ":c,new e.AssertionError(c+'Invalid operator "'+i+'"',void 0,r.operator)}var l=new n(u,c,r.operator,!0);l.assert(!0===o(l,"object"),"expected "+t.inspect(s)+" to be "+i+" "+t.inspect(a),"expected "+t.inspect(s)+" to not be "+i+" "+t.inspect(a))},r.closeTo=function(e,t,o,s){new n(e,s,r.closeTo,!0).to.be.closeTo(t,o)},r.approximately=function(e,t,o,s){new n(e,s,r.approximately,!0).to.be.approximately(t,o)},r.sameMembers=function(e,t,o){new n(e,o,r.sameMembers,!0).to.have.same.members(t)},r.notSameMembers=function(e,t,o){new n(e,o,r.notSameMembers,!0).to.not.have.same.members(t)},r.sameDeepMembers=function(e,t,o){new n(e,o,r.sameDeepMembers,!0).to.have.same.deep.members(t)},r.notSameDeepMembers=function(e,t,o){new n(e,o,r.notSameDeepMembers,!0).to.not.have.same.deep.members(t)},r.sameOrderedMembers=function(e,t,o){new n(e,o,r.sameOrderedMembers,!0).to.have.same.ordered.members(t)},r.notSameOrderedMembers=function(e,t,o){new n(e,o,r.notSameOrderedMembers,!0).to.not.have.same.ordered.members(t)},r.sameDeepOrderedMembers=function(e,t,o){new n(e,o,r.sameDeepOrderedMembers,!0).to.have.same.deep.ordered.members(t)},r.notSameDeepOrderedMembers=function(e,t,o){new n(e,o,r.notSameDeepOrderedMembers,!0).to.not.have.same.deep.ordered.members(t)},r.includeMembers=function(e,t,o){new n(e,o,r.includeMembers,!0).to.include.members(t)},r.notIncludeMembers=function(e,t,o){new n(e,o,r.notIncludeMembers,!0).to.not.include.members(t)},r.includeDeepMembers=function(e,t,o){new n(e,o,r.includeDeepMembers,!0).to.include.deep.members(t)},r.notIncludeDeepMembers=function(e,t,o){new n(e,o,r.notIncludeDeepMembers,!0).to.not.include.deep.members(t)},r.includeOrderedMembers=function(e,t,o){new n(e,o,r.includeOrderedMembers,!0).to.include.ordered.members(t)},r.notIncludeOrderedMembers=function(e,t,o){new n(e,o,r.notIncludeOrderedMembers,!0).to.not.include.ordered.members(t)},r.includeDeepOrderedMembers=function(e,t,o){new n(e,o,r.includeDeepOrderedMembers,!0).to.include.deep.ordered.members(t)},r.notIncludeDeepOrderedMembers=function(e,t,o){new n(e,o,r.notIncludeDeepOrderedMembers,!0).to.not.include.deep.ordered.members(t)},r.oneOf=function(e,t,o){new n(e,o,r.oneOf,!0).to.be.oneOf(t)},r.changes=function(e,t,o,s){3===arguments.length&&"function"==typeof t&&(s=o,o=null),new n(e,s,r.changes,!0).to.change(t,o)},r.changesBy=function(e,t,o,s,i){if(4===arguments.length&&"function"==typeof t){var a=s;s=o,i=a}else 3===arguments.length&&(s=o,o=null);new n(e,i,r.changesBy,!0).to.change(t,o).by(s)},r.doesNotChange=function(e,t,o,s){return 3===arguments.length&&"function"==typeof t&&(s=o,o=null),new n(e,s,r.doesNotChange,!0).to.not.change(t,o)},r.changesButNotBy=function(e,t,o,s,i){if(4===arguments.length&&"function"==typeof t){var a=s;s=o,i=a}else 3===arguments.length&&(s=o,o=null);new n(e,i,r.changesButNotBy,!0).to.change(t,o).but.not.by(s)},r.increases=function(e,t,o,s){return 3===arguments.length&&"function"==typeof t&&(s=o,o=null),new n(e,s,r.increases,!0).to.increase(t,o)},r.increasesBy=function(e,t,o,s,i){if(4===arguments.length&&"function"==typeof t){var a=s;s=o,i=a}else 3===arguments.length&&(s=o,o=null);new n(e,i,r.increasesBy,!0).to.increase(t,o).by(s)},r.doesNotIncrease=function(e,t,o,s){return 3===arguments.length&&"function"==typeof t&&(s=o,o=null),new n(e,s,r.doesNotIncrease,!0).to.not.increase(t,o)},r.increasesButNotBy=function(e,t,o,s,i){if(4===arguments.length&&"function"==typeof t){var a=s;s=o,i=a}else 3===arguments.length&&(s=o,o=null);new n(e,i,r.increasesButNotBy,!0).to.increase(t,o).but.not.by(s)},r.decreases=function(e,t,o,s){return 3===arguments.length&&"function"==typeof t&&(s=o,o=null),new n(e,s,r.decreases,!0).to.decrease(t,o)},r.decreasesBy=function(e,t,o,s,i){if(4===arguments.length&&"function"==typeof t){var a=s;s=o,i=a}else 3===arguments.length&&(s=o,o=null);new n(e,i,r.decreasesBy,!0).to.decrease(t,o).by(s)},r.doesNotDecrease=function(e,t,o,s){return 3===arguments.length&&"function"==typeof t&&(s=o,o=null),new n(e,s,r.doesNotDecrease,!0).to.not.decrease(t,o)},r.doesNotDecreaseBy=function(e,t,o,s,i){if(4===arguments.length&&"function"==typeof t){var a=s;s=o,i=a}else 3===arguments.length&&(s=o,o=null);return new n(e,i,r.doesNotDecreaseBy,!0).to.not.decrease(t,o).by(s)},r.decreasesButNotBy=function(e,t,o,s,i){if(4===arguments.length&&"function"==typeof t){var a=s;s=o,i=a}else 3===arguments.length&&(s=o,o=null);new n(e,i,r.decreasesButNotBy,!0).to.decrease(t,o).but.not.by(s)},
/*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   */
r.ifError=function(e){if(e)throw e},r.isExtensible=function(e,t){new n(e,t,r.isExtensible,!0).to.be.extensible},r.isNotExtensible=function(e,t){new n(e,t,r.isNotExtensible,!0).to.not.be.extensible},r.isSealed=function(e,t){new n(e,t,r.isSealed,!0).to.be.sealed},r.isNotSealed=function(e,t){new n(e,t,r.isNotSealed,!0).to.not.be.sealed},r.isFrozen=function(e,t){new n(e,t,r.isFrozen,!0).to.be.frozen},r.isNotFrozen=function(e,t){new n(e,t,r.isNotFrozen,!0).to.not.be.frozen},r.isEmpty=function(e,t){new n(e,t,r.isEmpty,!0).to.be.empty},r.isNotEmpty=function(e,t){new n(e,t,r.isNotEmpty,!0).to.not.be.empty},
/*!
   * Aliases.
   */
function e(t,n){return r[n]=r[t],e}("isOk","ok")("isNotOk","notOk")("throws","throw")("throws","Throw")("isExtensible","extensible")("isNotExtensible","notExtensible")("isSealed","sealed")("isNotSealed","notSealed")("isFrozen","frozen")("isNotFrozen","notFrozen")("isEmpty","empty")("isNotEmpty","notEmpty")};
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
!function(e){var t=[];
/*!
   * Chai version
   */e.version="4.2.0",
/*!
   * Assertion Error
   */
e.AssertionError=ce;
/*!
   * Utils for plugins (not exported)
   */
var n=le;e.use=function(o){return~t.indexOf(o)||(o(e,n),t.push(o)),e},
/*!
   * Utility Functions
   */
e.util=n;
/*!
   * Configuration
   */
var o=Ae;e.config=o;
/*!
   * Primary `Assertion` prototype
   */
var r=Kt;e.use(r);
/*!
   * Core Assertions
   */
var s=Wt;e.use(s);
/*!
   * Expect interface
   */
var i=Jt;e.use(i);
/*!
   * Should interface
   */
var a=Qt;e.use(a);
/*!
   * Assert interface
   */
var c=Yt;e.use(c)}(ie);const Xt=ie.expect;const Zt=new class{async run(){console.info("🚀 ~ file: runner.ts ~ line 26 ~ TestRunner ~ run ~ run"),await y(),console.log("🚀 ~ file: runner.ts ~ line 35 ~ TestRunner ~ run ~ getassemblyData"),cc.profiler.hideStats();try{const{platformIndex:e,classList:t,testScript:o,ip:r,port:s,timeout:i,jobId:a}=h("all");console.log("🚀 ~ file: runner.ts ~ line 36 ~ TestRunner ~ run ~ ip",r),console.log("🚀 ~ file: runner.ts ~ line 36 ~ TestRunner ~ run ~ port",s),console.log("🚀 ~ file: runner.ts ~ line 36 ~ TestRunner ~ run ~ classList",t),(()=>{console.log("🚀 ~ file: reset-api.ts ~ line 6 ~ platformIndex");const{ip:e,port:t,platformIndex:n,jobId:o}=h("all");console.log("🚀 ~ file: reset-api.ts ~ line 10 ~ platformIndex",n);const{log:r,error:s,timeEnd:i}=window.console;window.console.log=async(...e)=>{r(...e);const t=e.join(" ");await B("runtime/log",{type:"info",msg:t,platformIndex:n,jobId:o})},window.console.error=async(...e)=>{s(...e);const t=e.join(" ");await B("runtime/log",{type:"error",msg:t,platformIndex:n,jobId:o})},window.addEventListener("error",(e=>{console.error(e.message)})),window.console.timeEnd=async e=>{i(e),(null==e?void 0:e.startsWith("LoadScene"))&&await B("runtime/log",{type:"info",msg:e,platformIndex:n,jobId:o})},cc.debug._resetDebugSetting(2)})(),z.platformIndex=e,console.info("🚀 ~ file: runner.ts ~ line 56 ~ TestRunner ~ run ~ initJson.platformIndex",z.platformIndex),console.info("init json------------------",z),console.info("addPlatform",z),await N(r,s),console.info("createWebsoket"),await A(e,"Test Start"),console.info("startTest"),await re(a,e,t,o),await function(e,t){return new Promise((o=>{const r={state:n.END,platformIndex:e,jobId:h("jobId"),logs:t,imgList:T};console.log("🚀 ~ file: client.ts ~ line 137 ~ returnnewPromise ~ imgList",r.jobId),clearInterval(d),S(r,o)}))}(e,"Test End")}catch(e){console.info("🚀 ~ file: runner.ts ~ line 82 ~ TestRunner ~ run ~ error"),console.error(`【automation error】 ${e.stack?e.stack:e}`)}}};export{Zt as Runner,G as TestClassInfo,C as captureOneImage,H as ensureAfterDraw,U as ensureAfterPhysics,F as ensureFirstSceneLaunched,V as ensureFrameEnd,$ as ensureSceneUpdated,Xt as expect,h as getPlatformInfo,oe as getTestObj,y as getassemblyData,m as isArrayBuffer,g as isEmptyObject,x as isMiniGame,w as isObject,R as loadScene,b as promisify,re as runAllTestObj,Y as runScene,Z as setup,X as setupFunc,v as sleep,te as teardown,ee as teardownFunc,ne as testCase,Q as testClass,J as testClassMap,_ as waitForNextFrame};
