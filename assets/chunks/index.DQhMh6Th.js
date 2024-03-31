function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/Notify.Dt0LMYai.js","assets/chunks/framework.Icj7jQBO.js","assets/chunks/defu.CMw4_7D2.js","assets/chunks/use-singleton.Csg9VML9.js","assets/chunks/queue.CxBKXn5n.js","assets/chunks/noop.DX6rZLP_.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{Z as e,P as s}from"./framework.Icj7jQBO.js";import{u as i}from"./use-singleton.Csg9VML9.js";import{n as t}from"./noop.DX6rZLP_.js";const a=Symbol("NotifyContext");async function m(o){const{default:n}=await e(()=>import("./Notify.Dt0LMYai.js"),__vite__mapDeps([0,1,2,3,4,5]));return(await i(n)).show(o)}function _(){return s(a,()=>({close:t,update:t}),!0)}export{a as N,m as s,_ as u};
