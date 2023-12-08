import{X as d}from"./framework.5W3OCrpp.js";function r(t,e,s=!1){if(Number.isFinite(e)){const i=t.clientWidth/e;s?t.style.height=`${i}px`:t.style.minHeight=`${i}px`}}let o;async function n(){let t=window.ResizeObserver;if(!t){const{ResizeObserver:e}=await d(()=>import("./resize-observer.uyOeyzT0.js"),__vite__mapDeps([]));t=e}return o||(o=new t(e=>{for(const s of e){const a=s.target,i=Number.parseFloat(a.dataset.aspectRatio),c=a.dataset.aspectFixed==="true";r(a,i,c)}})),o}const f={async mounted(t,{value:e,modifiers:s}){const a=await n();t.dataset.aspectRatio=`${e}`,t.dataset.aspectFixed=s.fixed?"true":"false",r(t,e,!!s.fixed),a.observe(t)},updated(t,{value:e,modifiers:s}){t.dataset.aspectRatio=`${e}`,t.dataset.aspectFixed=s.fixed?"true":"false",r(t,e,!!s.fixed)},async beforeUnmount(t){(await n()).unobserve(t)}},b=f;export{f as p,b as v};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}