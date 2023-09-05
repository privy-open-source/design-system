import{_ as e}from"./chunks/Button.vue_vue_type_script_setup_true_lang.99aa9448.js";import"./chunks/Button.vue_vue_type_style_index_0_lang.4ed993c7.js";import{_,o as y,c as m,k as p,d as L,h as x,g as h,j as B,z as b,C,b as T,I as A,e as k,t as v,H as n,n as D,U as w,w as l,l as t,Q as d,a as c}from"./chunks/framework.4146f201.js";import{I as S}from"./chunks/16.971da8ac.js";import{u as $}from"./chunks/use-singleton.c43946bb.js";import"./chunks/index.a3ecab28.js";import"./chunks/SpinnerRinggo.62674c99.js";const P={},I={xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",class:"persona-icon",viewBox:"0 0 24 24"},V=p("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm-2.25 9c0 .414.336.75.75.75h.75v3.5H9.5a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5h-1.75V11a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75Zm1.963-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z","clip-rule":"evenodd"},null,-1),q=[V];function N(a,i){return y(),m("svg",I,q)}const z=_(P,[["render",N]]),R={},Z={xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",class:"persona-icon",viewBox:"0 0 24 24"},U=p("path",{fill:"currentColor","fill-rule":"evenodd",d:"M21.784 5.226a.798.798 0 0 1 0 1.093L9.877 18.774a.716.716 0 0 1-1.046 0l-6.615-6.92a.798.798 0 0 1 0-1.092.716.716 0 0 1 1.045 0l6.093 6.372L20.739 5.226a.716.716 0 0 1 1.045 0Z","clip-rule":"evenodd"},null,-1),M=[U];function O(a,i){return y(),m("svg",Z,M)}const W=_(R,[["render",O]]),j={},H={xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",class:"persona-icon",viewBox:"0 0 24 24"},J=p("path",{fill:"currentColor","fill-rule":"evenodd",d:"M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm-1 15a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm.25-4a.75.75 0 0 0 1.5 0V7a.75.75 0 0 0-1.5 0v6Z","clip-rule":"evenodd"},null,-1),Q=[J];function Y(a,i){return y(),m("svg",H,Q)}const G=_(j,[["render",Y]]),K={},X={xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"none",class:"persona-icon",viewBox:"0 0 24 24"},ss=p("path",{fill:"currentColor","fill-rule":"evenodd",d:"M10.275 4.497 2.771 17.5c-.769 1.333.19 3.001 1.725 3.001h15.008c1.535 0 2.494-1.668 1.725-3L13.725 4.496c-.768-1.33-2.682-1.33-3.45 0Zm.728 12.763c0-.552.446-1 .996-1s.996.448.996 1-.446 1-.996 1a.998.998 0 0 1-.996-1Zm.996-3.209a.748.748 0 0 1-.747-.75V8.507a.749.749 0 1 1 1.494 0v4.796c0 .414-.334.75-.747.75Z","clip-rule":"evenodd"},null,-1),ns=[ss];function as(a,i){return y(),m("svg",X,ns)}const os=_(K,[["render",as]]),ls={info:z,success:W,warning:G,error:os},ps=L({components:{IconClose:S},props:{title:{type:String,required:!0},text:{type:String,required:!0},type:{type:String,default:"info"},variant:{type:String,default:"simple"},duration:{type:Number,default:3e3}},emits:["dismissed"],setup(a,{emit:i}){const s=x(),u=h(()=>{const F=["toast"];return a.type&&F.push(`toast--${a.type}`),a.variant&&F.push(`toast--${a.variant}`),F}),o=h(()=>ls[a.type]);function f(){i("dismissed")}return B(()=>{Number.isFinite(a.duration)&&a.duration>0&&(s.value=setTimeout(()=>{i("dismissed")},a.duration))}),b(()=>{s.value&&clearTimeout(s.value)}),{classNames:u,icon:o,close:f}}});const es={class:"toast__icon"},ts={class:"toast__body"},cs={class:"toast__title"},rs={class:"toast__text"};function is(a,i,s,u,o,f){const F=C("IconClose");return y(),m("div",{"data-testid":"toast",class:D(a.classNames)},[p("div",es,[a.icon?(y(),T(A(a.icon),{key:0})):k("",!0)]),p("div",ts,[p("div",cs,v(a.title),1),p("div",rs,v(a.text),1)]),p("div",{"data-testid":"toast-close",class:"toast__close",onClick:i[0]||(i[0]=(...g)=>a.close&&a.close(...g))},[n(F)])],2)}const E=_(ps,[["render",is]]);async function r(a){const{default:i}=await w(()=>import("./chunks/ToastRoot.18552be5.js"),["assets/chunks/ToastRoot.18552be5.js","assets/chunks/baseClamp.947838b9.js","assets/chunks/toString.314d06e3.js","assets/chunks/isObjectLike.53b0037d.js","assets/chunks/isArray.513c67aa.js","assets/chunks/isSymbol.4326927f.js","assets/chunks/toInteger.d4d227f4.js","assets/chunks/toNumber.75689a18.js","assets/chunks/isObject.32699ff3.js","assets/chunks/framework.4146f201.js","assets/chunks/Button.vue_vue_type_script_setup_true_lang.99aa9448.js","assets/chunks/index.a3ecab28.js","assets/chunks/SpinnerRinggo.62674c99.js","assets/chunks/Button.vue_vue_type_style_index_0_lang.4ed993c7.js","assets/chunks/16.971da8ac.js","assets/chunks/use-singleton.c43946bb.js"]);await(await $(i)).add(a)}const Es=d('<h1 id="toast" tabindex="-1">Toast <a class="header-anchor" href="#toast" aria-label="Permalink to &quot;Toast&quot;">​</a></h1><blockquote><p>Simple notification pop-up.</p></blockquote><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><h3 id="simple-usage" tabindex="-1">Simple Usage <a class="header-anchor" href="#simple-usage" aria-label="Permalink to &quot;Simple Usage&quot;">​</a></h3>',4),ys={class:"flex mt-3"},ds=d(`<div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toast } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">toast</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  title: </span><span style="color:#9ECBFF;">&#39;Lorem ipsum&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  text : </span><span style="color:#9ECBFF;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { toast } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@privyid/persona/core&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">toast</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  title: </span><span style="color:#032F62;">&#39;Lorem ipsum&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  text : </span><span style="color:#032F62;">&#39;Lorem ipsum dolor sit amet.&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h3 id="advance-usage" tabindex="-1">Advance Usage <a class="header-anchor" href="#advance-usage" aria-label="Permalink to &quot;Advance Usage&quot;">​</a></h3>`,2),ms={class:"flex mt-3"},us=d(`<div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toast } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@privyid/persona/core&#39;</span></span>
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
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="type-variant" tabindex="-1">Type Variant <a class="header-anchor" href="#type-variant" aria-label="Permalink to &quot;Type Variant&quot;">​</a></h2><p>There available 4 type variants: <code>info</code>, <code>success</code>, <code>warning</code>, <code>error</code>. default is <code>info</code></p>`,3),Fs=p("p",null,[p("strong",null,"Try it:")],-1),_s={class:"mt-3 space-gap-3"},fs=d(`<div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toast } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@privyid/persona/core&#39;</span></span>
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
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="style-variant" tabindex="-1">Style Variant <a class="header-anchor" href="#style-variant" aria-label="Permalink to &quot;Style Variant&quot;">​</a></h2><p>There available 2 style variant: <code>simple</code> and <code>filled</code>. default is <code>simple</code></p>`,3),hs=p("p",null,[p("strong",null,"Try it:")],-1),vs={class:"mt-3 space-gap-3"},Cs=d(`<div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toast } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@privyid/persona/core&#39;</span></span>
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
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="position" tabindex="-1">Position <a class="header-anchor" href="#position" aria-label="Permalink to &quot;Position&quot;">​</a></h2><p>There available 6 position for toast: <code>top-left</code>, <code>top-center</code>, <code>top-right</code>, <code>bottom-left</code>, <code>bottom-center</code>, <code>top-right</code> default is <code>bottom-left</code></p><p><strong>Try it:</strong></p>`,4),gs={class:"mt-3 space-gap-3"},Ls=d(`<div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toast } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@privyid/persona/core&#39;</span></span>
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
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="customization" tabindex="-1">Customization <a class="header-anchor" href="#customization" aria-label="Permalink to &quot;Customization&quot;">​</a></h2><p>You can add some custom class to Toast element via <code>toastClass</code>.</p>`,3),xs={class:"mt-3"},Bs=d(`<div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { toast } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@privyid/persona/core&#39;</span></span>
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
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><h2 id="variables" tabindex="-1">Variables <a class="header-anchor" href="#variables" aria-label="Permalink to &quot;Variables&quot;">​</a></h2><p>Toast use local CSS variables on <code>.toast-container</code> for enhanced real-time customization.</p><div class="language-sass vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sass</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">--p-toast-z-index</span><span style="color:#E1E4E8;">: </span><span style="color:#B392F0;">theme(</span><span style="color:#79B8FF;">zIndex.toast</span><span style="color:#B392F0;">)</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">//1090</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">--p-toast-z-index</span><span style="color:#24292E;">: </span><span style="color:#6F42C1;">theme(</span><span style="color:#005CC5;">zIndex.toast</span><span style="color:#6F42C1;">)</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">//1090</span></span></code></pre></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="toast-1" tabindex="-1">toast <a class="header-anchor" href="#toast-1" aria-label="Permalink to &quot;toast&quot;">​</a></h3><p><code>toast(options: ToastOptions): Promise&lt;void&gt;</code></p><table><thead><tr><th>Options</th><th style="text-align:center;">Type</th><th style="text-align:center;">Default</th><th>Description</th></tr></thead><tbody><tr><td><code>type</code></td><td style="text-align:center;"><code>String</code></td><td style="text-align:center;"><code>info</code></td><td>Toast type variant, valid value is <code>info</code>, <code>success</code>, <code>warning</code>, <code>error</code></td></tr><tr><td><code>title</code></td><td style="text-align:center;"><code>String</code></td><td style="text-align:center;">-</td><td>Toast title message, <strong>required</strong></td></tr><tr><td><code>text</code></td><td style="text-align:center;"><code>String</code></td><td style="text-align:center;">-</td><td>Toast text message, <strong>required</strong></td></tr><tr><td><code>variant</code></td><td style="text-align:center;"><code>String</code></td><td style="text-align:center;"><code>simple</code></td><td>Toast style variant, valid value is <code>simple</code>, <code>filled</code></td></tr><tr><td><code>duration</code></td><td style="text-align:center;"><code>Number</code></td><td style="text-align:center;"><code>3000</code></td><td>Duration for which the toast should be displayed. <code>-1</code> to permanent toast</td></tr><tr><td><code>position</code></td><td style="text-align:center;"><code>String</code></td><td style="text-align:center;"><code>bottom-left</code></td><td>Position for toast, valid value is <code>top-left</code>, <code>top-center</code>, <code>top-right</code>, <code>bottom-left</code>, <code>bottom-center</code>, <code>top-right</code></td></tr><tr><td><code>toastClass</code></td><td style="text-align:center;"><code>String</code></td><td style="text-align:center;">-</td><td>Add class to toast component</td></tr></tbody></table>`,8),Ps=JSON.parse('{"title":"Toast · Components","description":"Simple notification pop-up.","frontmatter":{"title":"Toast · Components","description":"Simple notification pop-up."},"headers":[],"relativePath":"components/toast/index.md","filePath":"components/toast/index.md"}'),bs={name:"components/toast/index.md"},Is=Object.assign(bs,{setup(a){return(i,s)=>{const u=C("preview");return y(),m("div",null,[Es,p("div",ys,[n(e,{color:"info",onClick:s[0]||(s[0]=o=>t(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Show Toast ")]),_:1})]),ds,p("div",ms,[n(e,{color:"info",onClick:s[1]||(s[1]=o=>t(r)({type:"error",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",variant:"filled",duration:5e3,toastClass:"custom-toast"}))},{default:l(()=>[c(" Show Toast ")]),_:1})]),us,n(u,{class:"flex-col items-center space-y-3"},{default:l(()=>[n(E,{type:"info",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}),n(E,{type:"success",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}),n(E,{type:"warning",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}),n(E,{type:"error",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."})]),_:1}),Fs,p("div",_s,[n(e,{color:"info",onClick:s[2]||(s[2]=o=>t(r)({type:"info",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Info ")]),_:1}),n(e,{color:"success",onClick:s[3]||(s[3]=o=>t(r)({type:"success",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Success ")]),_:1}),n(e,{color:"warning",onClick:s[4]||(s[4]=o=>t(r)({type:"warning",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Warning ")]),_:1}),n(e,{color:"danger",onClick:s[5]||(s[5]=o=>t(r)({type:"error",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Error ")]),_:1})]),fs,n(u,{class:"flex-col items-center space-y-3"},{default:l(()=>[n(E,{variant:"filled",type:"info",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}),n(E,{variant:"filled",type:"success",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}),n(E,{variant:"filled",type:"warning",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}),n(E,{variant:"filled",type:"error",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."})]),_:1}),hs,p("div",vs,[n(e,{color:"info",onClick:s[6]||(s[6]=o=>t(r)({type:"info",variant:"filled",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Info ")]),_:1}),n(e,{color:"success",onClick:s[7]||(s[7]=o=>t(r)({type:"success",variant:"filled",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Success ")]),_:1}),n(e,{color:"warning",onClick:s[8]||(s[8]=o=>t(r)({type:"warning",variant:"filled",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Warning ")]),_:1}),n(e,{color:"danger",onClick:s[9]||(s[9]=o=>t(r)({type:"error",variant:"filled",title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet."}))},{default:l(()=>[c(" Error ")]),_:1})]),Cs,p("div",gs,[n(e,{color:"info",onClick:s[10]||(s[10]=o=>t(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",position:"top-left"}))},{default:l(()=>[c(" Top Left ")]),_:1}),n(e,{color:"info",onClick:s[11]||(s[11]=o=>t(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",position:"top-center"}))},{default:l(()=>[c(" Top Center ")]),_:1}),n(e,{color:"info",onClick:s[12]||(s[12]=o=>t(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",position:"top-right"}))},{default:l(()=>[c(" Top Right ")]),_:1}),n(e,{color:"info",onClick:s[13]||(s[13]=o=>t(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",position:"bottom-left"}))},{default:l(()=>[c(" Bottom Left ")]),_:1}),n(e,{color:"info",onClick:s[14]||(s[14]=o=>t(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",position:"bottom-center"}))},{default:l(()=>[c(" Bottom Center ")]),_:1}),n(e,{color:"info",onClick:s[15]||(s[15]=o=>t(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",position:"bottom-right"}))},{default:l(()=>[c(" Bottom Right ")]),_:1})]),Ls,p("div",xs,[n(e,{type:"",color:"info",onClick:s[16]||(s[16]=o=>t(r)({title:"Lorem ipsum",text:"Lorem ipsum dolor sit amet.",toastClass:"mt-28 mr-10"}))},{default:l(()=>[c(" Custom Toast ")]),_:1})]),Bs])}}});export{E as T,Ps as __pageData,Is as default};
