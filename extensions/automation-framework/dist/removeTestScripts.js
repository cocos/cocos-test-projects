"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("fs-extra");function t(e){let t=!0,o=0;const s=["--project","--testConfig","--platformIndex","--build","configPath"];if(e.argv.length>=9){for(const t of s)for(const s of e.argv)s.includes(t)&&(o+=1);t=o===s.length}else t=!1;return t}function o(e){let t="";const o=process.argv.indexOf(e);return-1!==o&&(t=process.argv[o+1]),t}function s(e,t,o){const s=Object.keys(o)[0];return e.hasOwnProperty(t)?JSON.stringify(e[t][s])!=JSON.stringify(o[s])?e[t]=Object.assign(e[t],o):console.log("无需修改"):console.log(`字段${t}不存在`),e}exports.getArgv=o,exports.processJudge=t,exports.startTest=async function(n,r){const a={"automation-framework":{AutoTest:"",__version__:"1.0.0"}};if(t(n)){o("--testConfig"),Number(o("--platformIndex"));const t=n.argv.length;if(n.argv[t-1].includes("configPath")){const o=n.argv[t-1].split("=")[1],c=e.readJsonSync(o);s(c,"packages",a),c.packages[r].AutoTest=!0,e.writeJsonSync(o,c)}}else{await Editor.Panel.has(r)||console.log("developer open panel");const t=n.argv.length;if(n.argv[t-1].includes("configPath")){const o=n.argv[t-1].split("=")[1],c=e.readJsonSync(o);s(c,"packages",a),c.packages[r].AutoTest=!1,e.writeJsonSync(o,c)}}},exports.updataJsonObject=s;
