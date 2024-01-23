import{Z as e,P as s}from"./framework.pPTQOZ96.js";import{u as i}from"./use-singleton.lLw3WmtX.js";import{n as t}from"./noop.Uu3q6ZSj.js";const a=Symbol("NotifyContext");async function m(o){const{default:n}=await e(()=>import("./Notify.UTDquiRw.js"),__vite__mapDeps([0,1,2,3,4,5]));return(await i(n)).show(o)}function _(){return s(a,()=>({close:t,update:t}),!0)}export{a as N,m as s,_ as u};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/Notify.UTDquiRw.js","assets/chunks/framework.pPTQOZ96.js","assets/chunks/defu.3rjBFRnm.js","assets/chunks/use-singleton.lLw3WmtX.js","assets/chunks/queue.-V8fDHS_.js","assets/chunks/noop.Uu3q6ZSj.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
