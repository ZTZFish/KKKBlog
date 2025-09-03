import{V as y}from"./ViewsContainer-C41_tyMz.js";import{C as h}from"./ChangeAnimation-CWrDi1DA.js";import{e as x,E as g}from"./essaysData-CULY9xb6.js";import{a as C,b as w,c as d,w as N}from"./index-CMbH7iHS.js";import{d as p,f as a,a as c,b as l,w as u,F as v,e as f,i as V,j as S,u as D,_ as E}from"./index-es9QLVd9.js";import"./render-fn-l-FAhAY_.js";import"./Logo-C1658mab.js";import"./useImages-Df9Uhu5m.js";/**
 * tdesign v1.16.1
 * (c) 2025 tdesign
 * @license MIT
 */var B={align:{type:String,default:"center",validator:function(e){return e?["left","right","center"].includes(e):!0}},content:{type:[String,Function]},dashed:Boolean,default:{type:[String,Function]},layout:{type:String,default:"horizontal",validator:function(e){return e?["horizontal","vertical"].includes(e):!0}},theme:{type:String,validator:function(e){return e?["horizontal","vertical"].includes(e):!0}}};/**
 * tdesign v1.16.1
 * (c) 2025 tdesign
 * @license MIT
 */var F=p({name:"TDivider",props:B,setup:function(e){var t=C("divider"),r=w();return function(){var o=e.layout,s=e.dashed,_=e.align,i=r("default","content"),m=["".concat(t.value),["".concat(t.value,"--").concat(o)],d(d(d({},"".concat(t.value,"--dashed"),!!s),"".concat(t.value,"--with-text"),!!i),"".concat(t.value,"--with-text-").concat(_),!!i)];return a("div",{class:m},[i&&a("span",{class:"".concat(t.value,"__inner-text")},[i])])}}});/**
 * tdesign v1.16.1
 * (c) 2025 tdesign
 * @license MIT
 */var I=N(F);const k={class:"index"},z={class:"essays"},P=p({__name:"IndexView",setup(n){const e=x();return(t,r)=>{const o=I;return l(),c(v,null,[a(h),a(y,null,{main:u(()=>[f("div",k,[a(o,null,{default:u(()=>[...r[0]||(r[0]=[V("精选文章",-1)])]),_:1}),f("div",z,[(l(!0),c(v,null,S(D(e).essays,s=>(l(),c("div",{class:"essay",key:s.id},[a(g,{essay:s},null,8,["essay"])]))),128))])])]),_:1})],64)}}}),G=E(P,[["__scopeId","data-v-40d46194"]]);export{G as default};
