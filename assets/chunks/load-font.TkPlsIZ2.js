import{Z as i}from"./framework.kdG7p9fL.js";import{Q as r}from"./queue.-V8fDHS_.js";const s=new r,t=new Set;async function u(e){return await s.add(async()=>{if(!t.has(e)){const a=await i(()=>import("./webfontloader.lN0-XuL0.js").then(o=>o.w),__vite__mapDeps([0,1,2]));return await new Promise((o,n)=>{a.load({google:{families:[e]},fontactive(){t.add(e),o()},fontinactive(){n(new Error("FONTLOADER_TIMEOUT"))}})})}})}export{u as l};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/webfontloader.lN0-XuL0.js","assets/chunks/theme.meo-tmh0.js","assets/chunks/framework.kdG7p9fL.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
