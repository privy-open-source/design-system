function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/Notify.DANpQLf1.js","assets/chunks/framework.EvKTlcrl.js","assets/chunks/defu.CMw4_7D2.js","assets/chunks/use-singleton.C4jgQRFv.js","assets/chunks/queue.CxBKXn5n.js","assets/chunks/noop.DX6rZLP_.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{Z as e,P as s}from"./framework.EvKTlcrl.js";import{u as i}from"./use-singleton.C4jgQRFv.js";import{n as t}from"./noop.DX6rZLP_.js";const a=Symbol("NotifyContext");async function m(o){const{default:n}=await e(()=>import("./Notify.DANpQLf1.js"),__vite__mapDeps([0,1,2,3,4,5]));return(await i(n)).show(o)}function _(){return s(a,()=>({close:t,update:t}),!0)}export{a as N,m as s,_ as u};
