import{Y as i}from"./framework.9r1f5sdm.js";async function r(t){const e=await i(()=>import("./webfontloader.AsE0-zAu.js").then(o=>o.w),__vite__mapDeps([0,1,2]));return await new Promise((o,a)=>{e.load({google:{families:[t]},fontactive(){o()},fontinactive(){a(new Error("FONTLOADER_TIMEOUT"))}})})}export{r as l};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/webfontloader.AsE0-zAu.js","assets/chunks/theme.bACF73O4.js","assets/chunks/framework.9r1f5sdm.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
