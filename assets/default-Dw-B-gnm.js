import{s as u,o as c,c as m,r as d,p as _,m as f,a as p,b as v,g as y,u as B,d as w,e as k,f as n,h as S,i as b,j as g,w as M}from"./index-BUXJvlqT.js";function V(){const e=u(!1);return c(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:m(()=>e.value?void 0:{transition:"none !important"}),isBooted:d(e)}}const h=_({scrollable:Boolean,...f(),...p(),...v({tag:"main"})},"VMain"),C=y()({name:"VMain",props:h(),setup(e,s){let{slots:a}=s;const{dimensionStyles:o}=B(e),{mainStyles:r}=w(),{ssrBootStyles:i}=V();return k(()=>n(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[r.value,i.value,o.value,e.style]},{default:()=>{var t,l;return[e.scrollable?n("div",{class:"v-main__scroller"},[(t=a.default)==null?void 0:t.call(a)]):(l=a.default)==null?void 0:l.call(a)]}})),{}}}),x={__name:"default",setup(e){return(s,a)=>{const o=S("router-view");return b(),g(C,null,{default:M(()=>[n(o)]),_:1})}}};export{x as default};
