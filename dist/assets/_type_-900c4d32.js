import{d as M,h as k,n as I,m as z,v as oe,z as pe,y as q,F as le,q as ae,U as ye,B as ne,g as _e,K as Pe,s as re,u as Se,o as J,c as Q,a as r,b as w,D as B,i as m,w as K,W as we,t as V,L as ue,M as $e,X as ke,I as Ie,e as Ee,f as Fe,j as Ce,P as Te,k as Oe,J as Be,Y as De,Z as Ne,l as je,Q as ie}from"./index-5ef231b5.js";/* empty css              */import"./index-10f110be.js";import{m as X,o as s,i as se,u as G,c as Re,l as H,y as Ve,j as Le,F as Ge,H as A,t as L,f as Z,a as ee,p as de,N as W,b as D,O as N,e as T,g as te}from"./hidden-5c81325f.js";import{b as He}from"./use-resolve-button-type-eaa9e448.js";import{E as Me,n as ve,d as O}from"./use-event-listener-65c01502.js";var Ke=(d=>(d[d.Open=0]="Open",d[d.Closed=1]="Closed",d))(Ke||{});let fe=Symbol("PopoverContext");function Y(d){let _=ne(fe,null);if(_===null){let P=new Error(`<${d} /> is missing a parent <${he.name} /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(P,Y),P}return _}let be=Symbol("PopoverGroupContext");function xe(){return ne(be,null)}let me=Symbol("PopoverPanelContext");function qe(){return ne(me,null)}let he=M({name:"Popover",props:{as:{type:[Object,String],default:"div"}},setup(d,{slots:_,attrs:P,expose:S}){var t;let e=k(null);S({el:e,$el:e});let f=k(1),u=k(null),$=k(null),x=k(null),b=k(null),c=I(()=>X(e)),a=I(()=>{var o,v;if(!s(u)||!s(b))return!1;for(let R of document.querySelectorAll("body > *"))if(Number(R==null?void 0:R.contains(s(u)))^Number(R==null?void 0:R.contains(s(b))))return!0;let p=se(),g=p.indexOf(s(u)),y=(g+p.length-1)%p.length,C=(g+1)%p.length,F=p[y],j=p[C];return!((o=s(b))!=null&&o.contains(F))&&!((v=s(b))!=null&&v.contains(j))}),i={popoverState:f,buttonId:k(null),panelId:k(null),panel:b,button:u,isPortalled:a,beforePanelSentinel:$,afterPanelSentinel:x,togglePopover(){f.value=G(f.value,{[0]:1,[1]:0})},closePopover(){f.value!==1&&(f.value=1)},close(o){i.closePopover();let v=(()=>o?o instanceof HTMLElement?o:o.value instanceof HTMLElement?s(o):s(i.button):s(i.button))();v==null||v.focus()}};ae(fe,i),Re(I(()=>G(f.value,{[0]:H.Open,[1]:H.Closed})));let E={buttonId:i.buttonId,panelId:i.panelId,close(){i.closePopover()}},h=xe(),l=h==null?void 0:h.registerPopover;function n(){var o,v,p,g;return(g=h==null?void 0:h.isFocusWithinPopoverGroup())!=null?g:((o=c.value)==null?void 0:o.activeElement)&&(((v=s(u))==null?void 0:v.contains(c.value.activeElement))||((p=s(b))==null?void 0:p.contains(c.value.activeElement)))}return z(()=>l==null?void 0:l(E)),Me((t=c.value)==null?void 0:t.defaultView,"focus",o=>{var v,p;f.value===0&&(n()||u&&b&&o.target!==window&&((v=s(i.beforePanelSentinel))!=null&&v.contains(o.target)||(p=s(i.afterPanelSentinel))!=null&&p.contains(o.target)||i.closePopover()))},!0),Ve([u,b],(o,v)=>{var p;i.closePopover(),Le(v,Ge.Loose)||(o.preventDefault(),(p=s(u))==null||p.focus())},I(()=>f.value===0)),()=>{let o={open:f.value===0,close:i.close};return A({theirProps:d,ourProps:{ref:e},slot:o,slots:_,attrs:P,name:"Popover"})}}}),ce=M({name:"PopoverButton",props:{as:{type:[Object,String],default:"button"},disabled:{type:[Boolean],default:!1},id:{type:String,default:()=>`headlessui-popover-button-${L()}`}},inheritAttrs:!1,setup(d,{attrs:_,slots:P,expose:S}){let t=Y("PopoverButton"),e=I(()=>X(t.button));S({el:t.button,$el:t.button}),oe(()=>{t.buttonId.value=d.id}),pe(()=>{t.buttonId.value=null});let f=xe(),u=f==null?void 0:f.closeOthers,$=qe(),x=I(()=>$===null?!1:$.value===t.panelId.value),b=k(null),c=`headlessui-focus-sentinel-${L()}`;x.value||z(()=>{t.button.value=b.value});let a=He(I(()=>({as:d.as,type:_.type})),b);function i(n){var o,v,p,g,y;if(x.value){if(t.popoverState.value===1)return;switch(n.key){case D.Space:case D.Enter:n.preventDefault(),(v=(o=n.target).click)==null||v.call(o),t.closePopover(),(p=s(t.button))==null||p.focus();break}}else switch(n.key){case D.Space:case D.Enter:n.preventDefault(),n.stopPropagation(),t.popoverState.value===1&&(u==null||u(t.buttonId.value)),t.togglePopover();break;case D.Escape:if(t.popoverState.value!==0)return u==null?void 0:u(t.buttonId.value);if(!s(t.button)||(g=e.value)!=null&&g.activeElement&&!((y=s(t.button))!=null&&y.contains(e.value.activeElement)))return;n.preventDefault(),n.stopPropagation(),t.closePopover();break}}function E(n){x.value||n.key===D.Space&&n.preventDefault()}function h(n){var o,v;d.disabled||(x.value?(t.closePopover(),(o=s(t.button))==null||o.focus()):(n.preventDefault(),n.stopPropagation(),t.popoverState.value===1&&(u==null||u(t.buttonId.value)),t.togglePopover(),(v=s(t.button))==null||v.focus()))}function l(n){n.preventDefault(),n.stopPropagation()}return()=>{let n=t.popoverState.value===0,o={open:n},{id:v,...p}=d,g=x.value?{ref:b,type:a.value,onKeydown:i,onClick:h}:{ref:b,id:v,type:a.value,"aria-expanded":d.disabled?void 0:t.popoverState.value===0,"aria-controls":s(t.panel)?t.panelId.value:void 0,disabled:d.disabled?!0:void 0,onKeydown:i,onKeyup:E,onClick:h,onMousedown:l},y=ve();function C(){let F=s(t.panel);if(!F)return;function j(){G(y.value,{[O.Forwards]:()=>N(F,T.First),[O.Backwards]:()=>N(F,T.Last)})===te.Error&&N(se().filter(R=>R.dataset.headlessuiFocusGuard!=="true"),G(y.value,{[O.Forwards]:T.Next,[O.Backwards]:T.Previous}),{relativeTo:s(t.button)})}j()}return q(le,[A({ourProps:g,theirProps:{..._,...p},slot:o,attrs:_,slots:P,name:"PopoverButton"}),n&&!x.value&&t.isPortalled.value&&q(Z,{id:c,features:ee.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:C})])}}});M({name:"PopoverOverlay",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0}},setup(d,{attrs:_,slots:P}){let S=Y("PopoverOverlay"),t=`headlessui-popover-overlay-${L()}`,e=de(),f=I(()=>e!==null?(e.value&H.Open)===H.Open:S.popoverState.value===0);function u(){S.closePopover()}return()=>{let $={open:S.popoverState.value===0};return A({ourProps:{id:t,"aria-hidden":!0,onClick:u},theirProps:d,slot:$,attrs:_,slots:P,features:W.RenderStrategy|W.Static,visible:f.value,name:"PopoverOverlay"})}}});let Ae=M({name:"PopoverPanel",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},focus:{type:Boolean,default:!1},id:{type:String,default:()=>`headlessui-popover-panel-${L()}`}},inheritAttrs:!1,setup(d,{attrs:_,slots:P,expose:S}){let{focus:t}=d,e=Y("PopoverPanel"),f=I(()=>X(e.panel)),u=`headlessui-focus-sentinel-before-${L()}`,$=`headlessui-focus-sentinel-after-${L()}`;S({el:e.panel,$el:e.panel}),oe(()=>{e.panelId.value=d.id}),pe(()=>{e.panelId.value=null}),ae(me,e.panelId),z(()=>{var l,n;if(!t||e.popoverState.value!==0||!e.panel)return;let o=(l=f.value)==null?void 0:l.activeElement;(n=s(e.panel))!=null&&n.contains(o)||N(s(e.panel),T.First)});let x=de(),b=I(()=>x!==null?(x.value&H.Open)===H.Open:e.popoverState.value===0);function c(l){var n,o;switch(l.key){case D.Escape:if(e.popoverState.value!==0||!s(e.panel)||f.value&&!((n=s(e.panel))!=null&&n.contains(f.value.activeElement)))return;l.preventDefault(),l.stopPropagation(),e.closePopover(),(o=s(e.button))==null||o.focus();break}}function a(l){var n,o,v,p,g;let y=l.relatedTarget;y&&s(e.panel)&&((n=s(e.panel))!=null&&n.contains(y)||(e.closePopover(),((v=(o=s(e.beforePanelSentinel))==null?void 0:o.contains)!=null&&v.call(o,y)||(g=(p=s(e.afterPanelSentinel))==null?void 0:p.contains)!=null&&g.call(p,y))&&y.focus({preventScroll:!0})))}let i=ve();function E(){let l=s(e.panel);if(!l)return;function n(){G(i.value,{[O.Forwards]:()=>{var o;N(l,T.First)===te.Error&&((o=s(e.afterPanelSentinel))==null||o.focus())},[O.Backwards]:()=>{var o;(o=s(e.button))==null||o.focus({preventScroll:!0})}})}n()}function h(){let l=s(e.panel);if(!l)return;function n(){G(i.value,{[O.Forwards]:()=>{let o=s(e.button),v=s(e.panel);if(!o)return;let p=se(),g=p.indexOf(o),y=p.slice(0,g+1),C=[...p.slice(g+1),...y];for(let F of C.slice())if(F.dataset.headlessuiFocusGuard==="true"||v!=null&&v.contains(F)){let j=C.indexOf(F);j!==-1&&C.splice(j,1)}N(C,T.First,{sorted:!1})},[O.Backwards]:()=>{var o;N(l,T.Previous)===te.Error&&((o=s(e.button))==null||o.focus())}})}n()}return()=>{let l={open:e.popoverState.value===0,close:e.close},{id:n,focus:o,...v}=d,p={ref:e.panel,id:n,onKeydown:c,onFocusout:t&&e.popoverState.value===0?a:void 0,tabIndex:-1};return A({ourProps:p,theirProps:{..._,...v},attrs:_,slot:l,slots:{...P,default:(...g)=>{var y;return[q(le,[b.value&&e.isPortalled.value&&q(Z,{id:u,ref:e.beforePanelSentinel,features:ee.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:E}),(y=P.default)==null?void 0:y.call(P,...g),b.value&&e.isPortalled.value&&q(Z,{id:$,ref:e.afterPanelSentinel,features:ee.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:h})])]}},features:W.RenderStrategy|W.Static,visible:b.value,name:"PopoverPanel"})}}});M({name:"PopoverGroup",props:{as:{type:[Object,String],default:"div"}},setup(d,{attrs:_,slots:P,expose:S}){let t=k(null),e=ye([]),f=I(()=>X(t));S({el:t,$el:t});function u(c){let a=e.value.indexOf(c);a!==-1&&e.value.splice(a,1)}function $(c){return e.value.push(c),()=>{u(c)}}function x(){var c;let a=f.value;if(!a)return!1;let i=a.activeElement;return(c=s(t))!=null&&c.contains(i)?!0:e.value.some(E=>{var h,l;return((h=a.getElementById(E.buttonId.value))==null?void 0:h.contains(i))||((l=a.getElementById(E.panelId.value))==null?void 0:l.contains(i))})}function b(c){for(let a of e.value)a.buttonId.value!==c&&a.close()}return ae(be,{registerPopover:$,unregisterPopover:u,isFocusWithinPopoverGroup:x,closeOthers:b}),()=>A({ourProps:{ref:t},theirProps:d,slot:{},attrs:_,slots:P,name:"PopoverGroup"})}});const U=d=>(De("data-v-47a060f1"),d=d(),Ne(),d),Ue={class:"flex p-2"},We=U(()=>r("div",{class:"hidden h-40 lg:flex lg:flex-1"},null,-1)),ze={class:"flex flex-[3] flex-col gap-4"},Xe=Fe('<div class="flex flex-col gap-2 py-4 md:flex-row" data-v-47a060f1><div class="flex-1 bg-red-200" data-v-47a060f1><img src="https://cdn2.cellphones.com.vn/595x,webp,q80/https://dashboard.cellphones.com.vn/storage/galaxy-tab-s8-cate-th5.png" alt="" data-v-47a060f1></div><div class="flex-1 bg-red-200" data-v-47a060f1><img src="https://cdn2.cellphones.com.vn/595x,webp,q80/https://dashboard.cellphones.com.vn/storage/seagame-banner-cate.png" alt="" data-v-47a060f1></div></div>',1),Ye={class:"flex gap-4"},Je={class:"flex"},Qe=U(()=>r("span",null,"Giá",-1)),Ze={class:"flex flex-1 justify-between"},et=U(()=>r("span",null," 100.000.000đ ",-1)),tt={class:"flex flex-1 justify-between gap-2"},ot={class:"flex-1"},lt={class:"flex-1"},at={class:"flex gap-4"},nt={class:"flex flex-wrap justify-start gap-4"},st={class:"flex w-full justify-end"},rt={class:"vc"},ut=["src","onClick"],it=["onClick"],ct={class:"gap-2 md:flex"},pt={class:"font-bold text-red-500"},dt={class:"flex items-center text-[14px] font-semibold text-gray-500 line-through"},vt={class:"w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-xs md:flex"},ft={class:"w-full justify-start md:flex"},bt={class:"hidden h-[20px] flex-1 items-center justify-end gap-2 md:flex"},xt=U(()=>r("p",{class:"text-xs text-gray-500"},"Yêu Thích",-1)),mt=U(()=>r("div",{class:"hidden h-40 lg:flex lg:flex-1"},null,-1)),ge=M({__name:"[type]",setup(d){const _=_e(),P=Pe();re(_);const{data:S}=re(P),t=Se(),e=Ce(),f=k(0),u=k([]);z(()=>{e.params.type&&(e.params.type==="all"?u.value=S.value:u.value=S.value.filter(c=>c.type===e.params.type))}),oe(()=>{e.params.type==="all"?u.value=S.value:u.value=S.value.filter(c=>c.type===e.params.type),window.scrollTo(0,0)});const $=I(()=>c=>{let a={price:"",priceRRP:""};return a.price=new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(c.price),a.priceRRP=new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(c.priceRRP),a}),x=k("");function b(c){c==="lowToHigh"&&(u.value.sort((a,i)=>a.price-i.price),x.value="lowToHigh"),c==="highToLow"&&(u.value.sort((a,i)=>i.price-a.price),x.value="highToLow"),c==="discount"&&(u.value.sort((a,i)=>i.discount-a.discount),x.value="discount")}return(c,a)=>{const i=Te,E=Oe,h=Be;return J(),Q("div",Ue,[We,r("main",ze,[Xe,w(i,{title:"Chọn theo tiêu chí"}),r("div",Ye,[r("div",{class:B(["cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs",m(e).params.type==="apple"?"border-main":""]),onClick:a[0]||(a[0]=l=>m(t).push("/products/brand/apple"))}," Apple ",2),r("div",{class:B(["cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs",m(e).params.type==="samsung"?"border-main":""]),onClick:a[1]||(a[1]=l=>m(t).push("/products/brand/samsung"))}," Samsung ",2),r("div",Je,[w(m(he),{class:"relative"},{default:K(({open:l})=>[w(m(ce),{class:B([l?"":"text-opacity-90","cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs ring-0"])},{default:K(()=>[Qe]),_:2},1032,["class"]),w(we,{"enter-active-class":"transition duration-200 ease-out","enter-from-class":"translate-y-1 opacity-0","enter-to-class":"translate-y-0 opacity-100","leave-active-class":"transition duration-150 ease-in","leave-from-class":"translate-y-0 opacity-100","leave-to-class":"translate-y-1 opacity-0"},{default:K(()=>[w(m(Ae),{class:"absolute left-1/2 z-10 mt-3 w-[320px] -translate-x-1/2 transform bg-gray-100 p-4"},{default:K(()=>[r("div",Ze,[r("span",null,V(m(f))+"đ ",1),ue(),et]),$e(r("input",{"onUpdate:modelValue":a[2]||(a[2]=n=>Ie(f)?f.value=n:null),type:"range",max:1e3*100*100,class:"my-4 w-full !text-main"},null,512),[[ke,m(f)]]),r("div",tt,[r("div",ot,[w(m(ce),{class:"h-8 !w-full rounded border border-main text-main hover:bg-main/20"},{default:K(()=>[ue("Đóng")]),_:1})]),r("div",lt,[w(E,{class:"!w-full",label:"Xem kết quả"})])])]),_:1})]),_:1})]),_:1})]),r("div",{class:B(["cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs",m(e).params.type==="all"?"border-main":""]),onClick:a[3]||(a[3]=l=>m(t).push("/products/brand/all"))}," Tất cả ",2)]),w(i,{title:"Sắp xếp theo"}),r("div",at,[r("div",{class:B(["cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs",m(x)==="highToLow"?"border-main bg-[#fef2f2] text-main":""]),onClick:a[4]||(a[4]=l=>b("highToLow"))}," Giá Cao - Thấp ",2),r("div",{class:B(["cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs",m(x)==="lowToHigh"?"border-main bg-[#fef2f2] text-main":""]),onClick:a[5]||(a[5]=l=>b("lowToHigh"))}," Giá Thấp - Cao ",2),r("div",{class:B(["cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs",m(x)==="discount"?"border-main bg-[#fef2f2] text-main":""]),onClick:a[6]||(a[6]=l=>b("discount"))}," Khuyến Mãi Hot ",2)]),r("div",nt,[(J(!0),Q(le,null,Ee(m(u),l=>(J(),Q("div",{key:l._id,class:"mx-auto flex w-full basis-[100%] flex-col gap-4 rounded-xl border border-slate-200 p-2 shadow-lg md:basis-[46%] lg:basis-[21%]"},[r("div",st,[r("span",rt,V(l.discount+"%"),1)]),r("img",{class:"mx-auto h-[180px] w-[180px] cursor-pointer",src:l.imageLink,alt:"",onClick:n=>m(t).push(`/products/${l._id}`)},null,8,ut),r("p",{class:"h-14 cursor-pointer text-justify text-sm font-bold md:flex",onClick:n=>m(t).push(`/products/${l._id}`)},V(l.name),9,it),r("div",ct,[r("p",pt,V(m($)(l).price),1),r("p",dt,V(m($)(l).priceRRP),1)]),r("div",vt,V(l.description),1),r("div",ft,[w(h,{"icon-class":"text-yellow-600",icon:"fa-star"}),w(h,{"icon-class":"text-yellow-600",icon:"fa-star"}),w(h,{"icon-class":"text-yellow-600",icon:"fa-star"}),w(h,{"icon-class":"text-yellow-600",icon:"fa-star"}),w(h,{"icon-class":"text-yellow-600",icon:"fa-star"})]),r("div",bt,[xt,w(h,{icon:l.favorite?"fa-heart":"fa-heart-o","icon-class":l.favorite?"!text-red-500":"!text-black-500"},null,8,["icon","icon-class"])])]))),128))])]),mt])}}});typeof ie=="function"&&ie(ge);const wt=je(ge,[["__scopeId","data-v-47a060f1"]]);export{wt as default};