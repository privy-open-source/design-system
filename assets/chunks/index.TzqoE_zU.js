import{Z as n,aM as r}from"./framework.1iuB3FAc.js";import{s as p}from"./index.6rf5cb_9.js";async function u(o,a,s,i){if(typeof o=="string")return await u({text:o,title:a,type:s,variant:i});const{default:t}=await n(()=>import("./Popup.zdvTZlxS.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]));return await p({component:r(t),props:o,duration:o.duration,position:o.position})}export{u as s};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/Popup.zdvTZlxS.js","assets/chunks/Popup.vue_vue_type_style_index_0_lang.Um5AdJRC.js","assets/chunks/framework.1iuB3FAc.js","assets/chunks/20.MeSgGyFg.js","assets/chunks/20.5yP5rLlp.js","assets/chunks/20.Yrmj7fT6.js","assets/chunks/16.rVdy33WI.js","assets/chunks/index.aPVAFx1T.js","assets/chunks/defu.3rjBFRnm.js","assets/chunks/index.6rf5cb_9.js","assets/chunks/use-singleton.FGib2EyL.js","assets/chunks/queue.-V8fDHS_.js","assets/chunks/noop.Uu3q6ZSj.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
