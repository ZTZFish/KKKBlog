import{H as _,U as f}from"./ChangeAnimation-DbEpM2mv.js";import{c as p,g as m,f as o,w as h}from"./Logo-D5kBNazZ.js";import{d as c,e as a,a as g,F as y,b as s,J as C,f as w,_ as x}from"./index-DCU06PzP.js";/**
 * tdesign v1.14.2
 * (c) 2025 tdesign
 * @license MIT
 */var N={align:{type:String,default:"center",validator:function(e){return e?["left","right","center"].includes(e):!0}},content:{type:[String,Function]},dashed:Boolean,default:{type:[String,Function]},layout:{type:String,default:"horizontal",validator:function(e){return e?["horizontal","vertical"].includes(e):!0}},theme:{type:String,validator:function(e){return e?["horizontal","vertical"].includes(e):!0}}};/**
 * tdesign v1.14.2
 * (c) 2025 tdesign
 * @license MIT
 */var S=c({name:"TDivider",props:N,setup:function(e){var t=p("divider"),i=m();return function(){var d=e.layout,l=e.dashed,u=e.align,r=i("default","content"),v=["".concat(t.value),["".concat(t.value,"--").concat(d)],o(o(o({},"".concat(t.value,"--dashed"),!!l),"".concat(t.value,"--with-text"),!!r),"".concat(t.value,"--with-text-").concat(u),!!r)];return a("div",{class:v},[r&&a("span",{class:"".concat(t.value,"__inner-text")},[r])])}}});/**
 * tdesign v1.14.2
 * (c) 2025 tdesign
 * @license MIT
 */var V=h(S);const B={class:"view"},D={class:"main"},F={class:"user",ref:"user"},z=c({__name:"ViewsContainer",setup(n){return(e,t)=>{const i=V;return w(),g(y,null,[a(_),a(i,{style:{margin:"0"}}),s("div",B,[s("main",D,[C(e.$slots,"main",{},void 0)]),s("div",F,[a(f)],512)])],64)}}}),P=x(z,[["__scopeId","data-v-2e801013"]]);export{V as D,P as V};
