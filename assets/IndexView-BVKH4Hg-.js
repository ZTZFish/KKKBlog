import{V as y}from"./ViewsContainer-DmUECtCp.js";import{C as h}from"./ChangeAnimation-riIYbpo5.js";import{e as g,E as x}from"./essaysData-C6VU71eM.js";import{a as C,b as w,c as d,w as N}from"./index-IwgWiUsY.js";import{d as f,e as a,a as c,w as u,F as v,b as _,i as V,j as S,u as D,g as l,_ as E}from"./index-UTA6jkVN.js";import"./render-fn-CWOtDoMp.js";import"./Logo-DCj5ALvT.js";import"./useImages-YFkZmwJ8.js";/**
 * tdesign v1.15.2
 * (c) 2025 tdesign
 * @license MIT
 */var B={align:{type:String,default:"center",validator:function(e){return e?["left","right","center"].includes(e):!0}},content:{type:[String,Function]},dashed:Boolean,default:{type:[String,Function]},layout:{type:String,default:"horizontal",validator:function(e){return e?["horizontal","vertical"].includes(e):!0}},theme:{type:String,validator:function(e){return e?["horizontal","vertical"].includes(e):!0}}};/**
 * tdesign v1.15.2
 * (c) 2025 tdesign
 * @license MIT
 */var F=f({name:"TDivider",props:B,setup:function(e){var t=C("divider"),r=w();return function(){var o=e.layout,s=e.dashed,p=e.align,i=r("default","content"),m=["".concat(t.value),["".concat(t.value,"--").concat(o)],d(d(d({},"".concat(t.value,"--dashed"),!!s),"".concat(t.value,"--with-text"),!!i),"".concat(t.value,"--with-text-").concat(p),!!i)];return a("div",{class:m},[i&&a("span",{class:"".concat(t.value,"__inner-text")},[i])])}}});/**
 * tdesign v1.15.2
 * (c) 2025 tdesign
 * @license MIT
 */var I=N(F);const k={class:"index"},z={class:"essays"},P=f({__name:"IndexView",setup(n){const e=g();return(t,r)=>{const o=I;return l(),c(v,null,[a(h),a(y,null,{main:u(()=>[_("div",k,[a(o,null,{default:u(()=>r[0]||(r[0]=[V("精选文章",-1)])),_:1,__:[0]}),_("div",z,[(l(!0),c(v,null,S(D(e).essays,s=>(l(),c("div",{class:"essay",key:s.id},[a(x,{essay:s},null,8,["essay"])]))),128))])])]),_:1})],64)}}}),G=E(P,[["__scopeId","data-v-40d46194"]]);export{G as default};
