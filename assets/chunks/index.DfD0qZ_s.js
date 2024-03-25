function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/Popup.CbV0cxK9.js","assets/chunks/Popup.vue_vue_type_style_index_0_lang.CkmftoqS.js","assets/chunks/framework.EvKTlcrl.js","assets/chunks/20.C_iL-Q2S.js","assets/chunks/20.pw1ywq8z.js","assets/chunks/20.B_RucCtI.js","assets/chunks/16.Bvf1xn41.js","assets/chunks/index.CcZ8N_DT.js","assets/chunks/defu.CMw4_7D2.js","assets/chunks/index.C0qufVm5.js","assets/chunks/use-singleton.C4jgQRFv.js","assets/chunks/queue.CxBKXn5n.js","assets/chunks/noop.DX6rZLP_.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{Z as n,a9 as r}from"./framework.EvKTlcrl.js";import{s as p}from"./index.C0qufVm5.js";async function u(o,a,s,i){if(typeof o=="string")return await u({text:o,title:a,type:s,variant:i});const{default:t}=await n(()=>import("./Popup.CbV0cxK9.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]));return await p({component:r(t),props:o,duration:o.duration,position:o.position})}export{u as s};
