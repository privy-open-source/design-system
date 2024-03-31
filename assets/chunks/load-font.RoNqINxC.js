function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/webfontloader.B1C6lyck.js","assets/chunks/theme.DzWj0gpB.js","assets/chunks/framework.Icj7jQBO.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{Z as i}from"./framework.Icj7jQBO.js";import{Q as r}from"./queue.CxBKXn5n.js";const s=new r,t=new Set;async function u(e){return await s.add(async()=>{if(!t.has(e)){const a=await i(()=>import("./webfontloader.B1C6lyck.js").then(o=>o.w),__vite__mapDeps([0,1,2]));return await new Promise((o,n)=>{a.load({google:{families:[e]},fontactive(){t.add(e),o()},fontinactive(){n(new Error("FONTLOADER_TIMEOUT"))}})})}})}export{u as l};
