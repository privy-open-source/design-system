import{Y as i}from"./framework.JO26iv-T.js";async function r(t){const e=await i(()=>import("./webfontloader.L_Oxz2I6.js").then(o=>o.w),__vite__mapDeps([0,1,2]));return await new Promise((o,a)=>{e.load({google:{families:[t]},fontactive(){o()},fontinactive(){a(new Error("FONTLOADER_TIMEOUT"))}})})}export{r as l};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/webfontloader.L_Oxz2I6.js","assets/chunks/theme.A56b68fz.js","assets/chunks/framework.JO26iv-T.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}