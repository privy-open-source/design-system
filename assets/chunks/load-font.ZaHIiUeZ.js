import{X as i}from"./framework.5W3OCrpp.js";async function r(t){const e=await i(()=>import("./webfontloader.bnElkmE3.js").then(o=>o.w),__vite__mapDeps([0,1]));return await new Promise((o,a)=>{e.load({google:{families:[t]},fontactive(){o()},fontinactive(){a(new Error("FONTLOADER_TIMEOUT"))}})})}export{r as l};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/webfontloader.bnElkmE3.js","assets/chunks/commonjsHelpers.4gQjN7DL.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}