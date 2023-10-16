import{_ as t}from"./chunks/Button.vue_vue_type_script_setup_true_lang.acf90816.js";import"./chunks/Button.vue_vue_type_style_index_0_lang.4ed993c7.js";import{_,o as y,c as d,k as p,d as B,h as b,g as v,j as T,z as A,C as L,a6 as k,r as D,b as w,I as S,e as C,a2 as g,H as n,n as $,U as I,w as l,l as e,Q as m,a as c}from"./chunks/framework.e7be1a03.js";import{I as P}from"./chunks/16.f7114713.js";import{p as V}from"./chunks/index.005a5f18.js";import{u as q}from"./chunks/use-singleton.b5d88af5.js";import"./chunks/index.a3ecab28.js";import"./chunks/SpinnerRinggo.65df7df6.js";import"./chunks/marked.esm.bd0bcd16.js";import"./chunks/commonjsHelpers.de833af9.js";import"./chunks/vite-browser-external_commonjs-proxy.0726eb50.js";import"./chunks/defu.573334b8.js";const N={},z={xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",class:"persona-icon",viewBox:"0 0 24 24"},R=p("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm-2.25 9c0 .414.336.75.75.75h.75v3.5H9.5a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-1.75V11a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75Zm1.963-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z","clip-rule":"evenodd"},null,-1),Z=[R];function U(a,i){return y(),d("svg",z,Z)}const M=_(N,[["render",U]]),O={},W={xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",class:"persona-icon",viewBox:"0 0 24 24"},j=p("path",{fill:"currentColor","fill-rule":"evenodd",d:"M21.784 5.226a.798.798 0 0 1 0 1.093L9.877 18.774a.716.716 0 0 1-1.046 0l-6.615-6.92a.798.798 0 0 1 0-1.092.716.716 0 0 1 1.045 0l6.093 6.372L20.739 5.226a.716.716 0 0 1 1.045 0Z","clip-rule":"evenodd"},null,-1),H=[j];function J(a,i){return y(),d("svg",W,H)}const Q=_(O,[["render",J]]),Y={},G={xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",class:"persona-icon",viewBox:"0 0 24 24"},K=p("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm-1 15a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm.25-4a.75.75 0 0 0 1.5 0V7a.75.75 0 0 0-1.5 0v6Z","clip-rule":"evenodd"},null,-1),X=[K];function ss(a,i){return y(),d("svg",G,X)}const ns=_(Y,[["render",ss]]),as={},os={xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",class:"persona-icon",viewBox:"0 0 24 24"},ls=p("path",{fill:"currentColor","fill-rule":"evenodd",d:"M10.275 4.497 2.771 17.5c-.769 1.333.19 3.001 1.725 3.001h15.008c1.535 0 2.494-1.668 1.725-3L13.725 4.496c-.768-1.33-2.682-1.33-3.45 0Zm.728 12.763c0-.552.446-1 .996-1s.996.448.996 1-.446 1-.996 1a.998.998 0 0 1-.996-1Zm.996-3.209a.748.748 0 0 1-.747-.75V8.507a.749.749 0 1 1 1.494 0v4.796c0 .414-.334.75-.747.75Z","clip-rule":"evenodd"},null,-1),ps=[ls];function ts(a,i){return y(),d("svg",os,ps)}const es=_(as,[["render",ts]]),cs={info:M,success:Q,warning:ns,error:es},rs=B({components:{IconClose:P},directives:{pMd:V},props:{title:{type:String,required:!0},text:{type:String},type:{type:String,default:"info"},variant:{type:String,default:"simple"},duration:{type:Number,default:3e3}},emits:["dismissed"],setup(a,{emit:i}){const s=b(),u=v(()=>{const F=["toast"];return a.type&&F.push(`toast--${a.type}`),a.variant&&F.push(`toast--${a.variant}`),F}),o=v(()=>cs[a.type]);function f(){i("dismissed")}return T(()=>{Number.isFinite(a.duration)&&a.duration>0&&(s.value=setTimeout(()=>{i("dismissed")},a.duration))}),A(()=>{s.value&&clearTimeout(s.value)}),{classNames:u,toastIcon:o,close:f}}});const is={class:"toast__icon"},Es={class:"toast__body"},ys={class:"toast__title"},ds={key:0,class:"toast__text","data-testid":"toast-text"};function ms(a,i,s,u,o,f){const F=L("IconClose"),h=k("p-md");return y(),d("div",{"data-testid":"toast",class:$(a.classNames)},[p("div",is,[D(a.$slots,"icon",{},()=>[a.toastIcon?(y(),w(S(a.toastIcon),{key:0})):C("",!0)])]),p("div",Es,[g(p("div",ys,null,512),[[h,a.title,void 0,{inline:!0}]]),a.text?g((y(),d("div",ds,null,512)),[[h,a.text,void 0,{inline:!0}]]):C("",!0)]),p("div",{"data-testid":"toast-close",class:"toast__close",onClick:i[0]||(i[0]=(...x)=>a.close&&a.close(...x))},[n(F)])],2)}const E=_(rs,[["render",ms]]);async function r(a){const{default:i}=await I(()=>import("./chunks/ToastRoot.946f727e.js"),["assets/chunks/ToastRoot.946f727e.js","assets/chunks/baseClamp.947838b9.js","assets/chunks/toString.314d06e3.js","assets/chunks/isObjectLike.53b0037d.js","assets/chunks/isArray.513c67aa.js","assets/chunks/isSymbol.4326927f.js","assets/chunks/toInteger.d4d227f4.js","assets/chunks/toNumber.75689a18.js","assets/chunks/isObject.32699ff3.js","assets/chunks/framework.e7be1a03.js","assets/chunks/Button.vue_vue_type_script_setup_true_lang.acf90816.js","assets/chunks/index.a3ecab28.js","assets/chunks/SpinnerRinggo.65df7df6.js","assets/chunks/Button.vue_vue_type_style_index_0_lang.4ed993c7.js","assets/chunks/16.f7114713.js","assets/chunks/index.005a5f18.js","assets/chunks/marked.esm.bd0bcd16.js","assets/chunks/commonjsHelpers.de833af9.js","assets/chunks/vite-browser-external_commonjs-proxy.0726eb50.js","assets/chunks/defu.573334b8.js","assets/chunks/use-singleton.b5d88af5.js"]);await(await q(i)).add(a)}const us=m('<h1 id="toast" tabindex="-1">Toast <a class="header-anchor" href="#toast" aria-label="Permalink to &quot;Toast&quot;">​</a></h1><blockquote><p>Simple notification pop-up.</p></blockquote><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><h3 id="simple-usage" tabindex="-1">Simple Usage <a class="header-anchor" href="#simple-usage" aria-label="Permalink to &quot;Simple Usage&quot;">​</a></h3>',4),Fs={class:"flex mt-3"},_s=m(`<div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toast } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { toast } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="advance-usage" tabindex="-1">Advance Usage <a class="header-anchor" href="#advance-usage" aria-label="Permalink to &quot;Advance Usage&quot;">​</a></h3>`,2),fs={class:"flex mt-3"},hs=m(`<div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toast } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  type      : </span><span style="color:#9ECBFF;">&#39;error&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  title     : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text      : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  variant   : </span><span style="color:#9ECBFF;">&#39;filled&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  duration  : </span><span style="color:#79B8FF;">5000</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  toastClass: </span><span style="color:#9ECBFF;">&#39;custom-toast&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { toast } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  type      : </span><span style="color:#032F62;">&#39;error&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  title     : </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text      : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  variant   : </span><span style="color:#032F62;">&#39;filled&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  duration  : </span><span style="color:#005CC5;">5000</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  toastClass: </span><span style="color:#032F62;">&#39;custom-toast&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="type-variant" tabindex="-1">Type Variant <a class="header-anchor" href="#type-variant" aria-label="Permalink to &quot;Type Variant&quot;">​</a></h2><p>There available 4 type variants: <code>info</code>, <code>success</code>, <code>warning</code>, <code>error</code>. default is <code>info</code></p>`,3),vs=p("p",null,[p("strong",null,"Try it:")],-1),Cs={class:"mt-3 space-gap-3"},gs=m(`<div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toast } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// info</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  type : </span><span style="color:#9ECBFF;">&#39;info&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// success</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  type : </span><span style="color:#9ECBFF;">&#39;success&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// warning</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  type : </span><span style="color:#9ECBFF;">&#39;warning&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// error</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  type : </span><span style="color:#9ECBFF;">&#39;error&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { toast } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// info</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  type : </span><span style="color:#032F62;">&#39;info&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// success</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  type : </span><span style="color:#032F62;">&#39;success&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// warning</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  type : </span><span style="color:#032F62;">&#39;warning&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// error</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  type : </span><span style="color:#032F62;">&#39;error&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="style-variant" tabindex="-1">Style Variant <a class="header-anchor" href="#style-variant" aria-label="Permalink to &quot;Style Variant&quot;">​</a></h2><p>There available 2 style variant: <code>simple</code> and <code>filled</code>. default is <code>simple</code></p>`,3),Ls=p("p",null,[p("strong",null,"Try it:")],-1),xs={class:"mt-3 space-gap-3"},Bs=m(`<div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toast } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// info</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  type   : </span><span style="color:#9ECBFF;">&#39;info&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  variant: </span><span style="color:#9ECBFF;">&#39;filled&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  title  : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text   : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// success</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  type   : </span><span style="color:#9ECBFF;">&#39;success&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  variant: </span><span style="color:#9ECBFF;">&#39;filled&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  title  : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text   : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// warning</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  type   : </span><span style="color:#9ECBFF;">&#39;warning&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  variant: </span><span style="color:#9ECBFF;">&#39;filled&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  title  : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text   : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// error</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  type   : </span><span style="color:#9ECBFF;">&#39;error&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  variant: </span><span style="color:#9ECBFF;">&#39;filled&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  title  : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text   : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { toast } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// info</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  type   : </span><span style="color:#032F62;">&#39;info&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  variant: </span><span style="color:#032F62;">&#39;filled&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  title  : </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text   : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// success</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  type   : </span><span style="color:#032F62;">&#39;success&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  variant: </span><span style="color:#032F62;">&#39;filled&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  title  : </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text   : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// warning</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  type   : </span><span style="color:#032F62;">&#39;warning&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  variant: </span><span style="color:#032F62;">&#39;filled&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  title  : </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text   : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// error</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  type   : </span><span style="color:#032F62;">&#39;error&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  variant: </span><span style="color:#032F62;">&#39;filled&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  title  : </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text   : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="position" tabindex="-1">Position <a class="header-anchor" href="#position" aria-label="Permalink to &quot;Position&quot;">​</a></h2><p>There available 6 position for toast: <code>top-left</code>, <code>top-center</code>, <code>top-right</code>, <code>bottom-left</code>, <code>bottom-center</code>, <code>top-right</code> default is <code>bottom-left</code></p><p><strong>Try it:</strong></p>`,4),bs={class:"mt-3 space-gap-3"},Ts=m(`<div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toast } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// top-left</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  position : </span><span style="color:#9ECBFF;">&#39;top-left&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// top-center</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  position : </span><span style="color:#9ECBFF;">&#39;top-center&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// top-right</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  position : </span><span style="color:#9ECBFF;">&#39;top-right&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// bottom-left</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  position : </span><span style="color:#9ECBFF;">&#39;bottom-left&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// bottom-center</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  position : </span><span style="color:#9ECBFF;">&#39;bottom-center&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// bottom-right</span></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  position : </span><span style="color:#9ECBFF;">&#39;bottom-right&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { toast } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// top-left</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  position : </span><span style="color:#032F62;">&#39;top-left&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// top-center</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  position : </span><span style="color:#032F62;">&#39;top-center&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// top-right</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  position : </span><span style="color:#032F62;">&#39;top-right&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// bottom-left</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  position : </span><span style="color:#032F62;">&#39;bottom-left&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// bottom-center</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  position : </span><span style="color:#032F62;">&#39;bottom-center&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// bottom-right</span></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  position : </span><span style="color:#032F62;">&#39;bottom-right&#39;</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="customization" tabindex="-1">Customization <a class="header-anchor" href="#customization" aria-label="Permalink to &quot;Customization&quot;">​</a></h2><p>You can add some custom class to Toast element via <code>toastClass</code>.</p>`,3),As={class:"mt-3"},ks=m(`<div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toast } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  title     : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text      : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  toastClass: </span><span style="color:#9ECBFF;">&#39;mt-28 mr-10&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { toast } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  title     : </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text      : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  toastClass: </span><span style="color:#032F62;">&#39;mt-28 mr-10&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="variables" tabindex="-1">Variables <a class="header-anchor" href="#variables" aria-label="Permalink to &quot;Variables&quot;">​</a></h2><p>Toast use local CSS variables on <code>.toast-container</code> for enhanced real-time customization.</p><div class="language-sass vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sass</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">--p-toast-z-index</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">theme(</span><span style="color:#79B8FF;">zIndex.toast</span><span style="color:#B392F0;">)</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">//1090</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">--p-toast-z-index</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">theme(</span><span style="color:#005CC5;">zIndex.toast</span><span style="color:#6F42C1;">)</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">//1090</span></span></code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="toast-1" tabindex="-1">toast <a class="header-anchor" href="#toast-1" aria-label="Permalink to &quot;toast&quot;">​</a></h3><p><code>toast(options: ToastOptions): Promise&lt;void&gt;</code></p><table><thead><tr><th>Options</th><th style="text-align:center;">Type</th><th style="text-align:center;">Default</th><th>Description</th></tr></thead><tbody><tr><td><code>type</code></td><td style="text-align:center;"><code>String</code></td><td style="text-align:center;"><code>info</code></td><td>Toast type variant, valid value is <code>info</code>, <code>success</code>, <code>warning</code>, <code>error</code></td></tr><tr><td><code>title</code></td><td style="text-align:center;"><code>String</code></td><td style="text-align:center;">-</td><td>Toast title message, <strong>required</strong> (support markdown)</td></tr><tr><td><code>text</code></td><td style="text-align:center;"><code>String</code></td><td style="text-align:center;">-</td><td>Toast text message (support markdown)</td></tr><tr><td><code>icon</code></td><td style="text-align:center;"><code>String</code> or <code>Component</code></td><td style="text-align:center;">-</td><td>Custom toast icon (will replace default icon)</td></tr><tr><td><code>variant</code></td><td style="text-align:center;"><code>String</code></td><td style="text-align:center;"><code>simple</code></td><td>Toast style variant, valid value is <code>simple</code>, <code>filled</code></td></tr><tr><td><code>duration</code></td><td style="text-align:center;"><code>Number</code></td><td style="text-align:center;"><code>3000</code></td><td>Duration for which the toast should be displayed. <code>-1</code> to permanent toast</td></tr><tr><td><code>position</code></td><td style="text-align:center;"><code>String</code></td><td style="text-align:center;"><code>bottom-left</code></td><td>Position for toast, valid value is <code>top-left</code>, <code>top-center</code>, <code>top-right</code>, <code>bottom-left</code>, <code>bottom-center</code>, <code>top-right</code></td></tr><tr><td><code>toastClass</code></td><td style="text-align:center;"><code>String</code></td><td style="text-align:center;">-</td><td>Add class to toast component</td></tr></tbody></table>`,8),Ms=JSON.parse('{"title":"Toast · Components","description":"Simple notification pop-up.","frontmatter":{"title":"Toast · Components","description":"Simple notification pop-up."},"headers":[],"relativePath":"components/toast/index.md","filePath":"components/toast/index.md"}'),Ds={name:"components/toast/index.md"},Os=Object.assign(Ds,{setup(a){return(i,s)=>{const u=L("preview");return y(),d("div",null,[us,p("div",Fs,[n(t,{color:"info",onClick:s[0]||(s[0]=o=>e(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Show Toast ")]),_:1})]),_s,p("div",fs,[n(t,{color:"info",onClick:s[1]||(s[1]=o=>e(r)({type:"error",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",variant:"filled",duration:5e3,toastClass:"custom-toast"}))},{default:l(()=>[c(" Show Toast ")]),_:1})]),hs,n(u,{class:"flex-col items-center space-y-3"},{default:l(()=>[n(E,{type:"info",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}),n(E,{type:"success",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}),n(E,{type:"warning",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}),n(E,{type:"error",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."})]),_:1}),vs,p("div",Cs,[n(t,{color:"info",onClick:s[2]||(s[2]=o=>e(r)({type:"info",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Info ")]),_:1}),n(t,{color:"success",onClick:s[3]||(s[3]=o=>e(r)({type:"success",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Success ")]),_:1}),n(t,{color:"warning",onClick:s[4]||(s[4]=o=>e(r)({type:"warning",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Warning ")]),_:1}),n(t,{color:"danger",onClick:s[5]||(s[5]=o=>e(r)({type:"error",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Error ")]),_:1})]),gs,n(u,{class:"flex-col items-center space-y-3"},{default:l(()=>[n(E,{variant:"filled",type:"info",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}),n(E,{variant:"filled",type:"success",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}),n(E,{variant:"filled",type:"warning",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}),n(E,{variant:"filled",type:"error",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."})]),_:1}),Ls,p("div",xs,[n(t,{color:"info",onClick:s[6]||(s[6]=o=>e(r)({type:"info",variant:"filled",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Info ")]),_:1}),n(t,{color:"success",onClick:s[7]||(s[7]=o=>e(r)({type:"success",variant:"filled",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Success ")]),_:1}),n(t,{color:"warning",onClick:s[8]||(s[8]=o=>e(r)({type:"warning",variant:"filled",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Warning ")]),_:1}),n(t,{color:"danger",onClick:s[9]||(s[9]=o=>e(r)({type:"error",variant:"filled",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Error ")]),_:1})]),Bs,p("div",bs,[n(t,{color:"info",onClick:s[10]||(s[10]=o=>e(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",position:"top-left"}))},{default:l(()=>[c(" Top Left ")]),_:1}),n(t,{color:"info",onClick:s[11]||(s[11]=o=>e(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",position:"top-center"}))},{default:l(()=>[c(" Top Center ")]),_:1}),n(t,{color:"info",onClick:s[12]||(s[12]=o=>e(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",position:"top-right"}))},{default:l(()=>[c(" Top Right ")]),_:1}),n(t,{color:"info",onClick:s[13]||(s[13]=o=>e(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",position:"bottom-left"}))},{default:l(()=>[c(" Bottom Left ")]),_:1}),n(t,{color:"info",onClick:s[14]||(s[14]=o=>e(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",position:"bottom-center"}))},{default:l(()=>[c(" Bottom Center ")]),_:1}),n(t,{color:"info",onClick:s[15]||(s[15]=o=>e(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",position:"bottom-right"}))},{default:l(()=>[c(" Bottom Right ")]),_:1})]),Ts,p("div",As,[n(t,{type:"",color:"info",onClick:s[16]||(s[16]=o=>e(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",toastClass:"mt-28 mr-10"}))},{default:l(()=>[c(" Custom Toast ")]),_:1})]),ks])}}});export{E as T,Ms as __pageData,Os as default};
