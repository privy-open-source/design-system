import{Y as i}from"./framework.etf_9QdW.js";async function r(t){const e=await i(()=>import("./webfontloader.m2SJLwSD.js").then(o=>o.w),__vite__mapDeps([0,1,2]));return await new Promise((o,a)=>{e.load({google:{families:[t]},fontactive(){o()},fontinactive(){a(new Error("FONTLOADER_TIMEOUT"))}})})}export{r as l};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/webfontloader.m2SJLwSD.js","assets/chunks/theme.kz-EmXzd.js","assets/chunks/framework.etf_9QdW.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
