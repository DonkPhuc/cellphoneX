import{m as fe,f as we,a as Ee,H as O,d as W,o as S,u as Y,O as ce,e as V,g as Qe,t as z,p as Be,l as F,y as Xe,b as Ze,N as Se,C as Ke,S as I,c as et,h as tt,T as lt}from"./hidden-5c81325f.js";import{n as nt,E as xe,d as ie}from"./use-event-listener-65c01502.js";import{d as L,h as m,n as v,v as $,z as A,y as T,F as ke,m as k,x as te,q as _,B,T as at,S as rt,i as x,U as ot,A as it,D as st,C as ut,o as dt,c as ct,a as R,V as se,b as J,w as Q}from"./index-5ef231b5.js";import{t as ft}from"./platform-80eef2e2.js";function _e(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}function je(e){if(!e)return new Set;if(typeof e=="function")return new Set(e());let t=new Set;for(let l of e.value){let n=S(l);n instanceof HTMLElement&&t.add(n)}return t}var Me=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(Me||{});let K=Object.assign(L({name:"FocusTrap",props:{as:{type:[Object,String],default:"div"},initialFocus:{type:Object,default:null},features:{type:Number,default:30},containers:{type:[Object,Function],default:m(new Set)}},inheritAttrs:!1,setup(e,{attrs:t,slots:l,expose:n}){let a=m(null);n({el:a,$el:a});let r=v(()=>fe(a)),o=m(!1);$(()=>o.value=!0),A(()=>o.value=!1),vt({ownerDocument:r},v(()=>o.value&&Boolean(e.features&16)));let i=mt({ownerDocument:r,container:a,initialFocus:v(()=>e.initialFocus)},v(()=>o.value&&Boolean(e.features&2)));ht({ownerDocument:r,container:a,containers:e.containers,previousActiveElement:i},v(()=>o.value&&Boolean(e.features&8)));let s=nt();function u(f){let w=S(a);w&&(E=>E())(()=>{Y(s.value,{[ie.Forwards]:()=>{ce(w,V.First,{skipElements:[f.relatedTarget]})},[ie.Backwards]:()=>{ce(w,V.Last,{skipElements:[f.relatedTarget]})}})})}let d=m(!1);function h(f){f.key==="Tab"&&(d.value=!0,requestAnimationFrame(()=>{d.value=!1}))}function b(f){if(!o.value)return;let w=je(e.containers);S(a)instanceof HTMLElement&&w.add(S(a));let E=f.relatedTarget;E instanceof HTMLElement&&E.dataset.headlessuiFocusGuard!=="true"&&(He(w,E)||(d.value?ce(S(a),Y(s.value,{[ie.Forwards]:()=>V.Next,[ie.Backwards]:()=>V.Previous})|V.WrapAround,{relativeTo:f.target}):f.target instanceof HTMLElement&&W(f.target)))}return()=>{let f={},w={ref:a,onKeydown:h,onFocusout:b},{features:E,initialFocus:j,containers:X,...P}=e;return T(ke,[Boolean(E&4)&&T(we,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:u,features:Ee.Focusable}),O({ourProps:w,theirProps:{...t,...P},slot:f,attrs:t,slots:l,name:"FocusTrap"}),Boolean(E&4)&&T(we,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:u,features:Ee.Focusable})])}}}),{features:Me}),q=[];if(typeof window<"u"&&typeof document<"u"){let e=function(t){t.target instanceof HTMLElement&&t.target!==document.body&&q[0]!==t.target&&(q.unshift(t.target),q=q.filter(l=>l!=null&&l.isConnected),q.splice(10))};window.addEventListener("click",e,{capture:!0}),window.addEventListener("mousedown",e,{capture:!0}),window.addEventListener("focus",e,{capture:!0}),document.body.addEventListener("click",e,{capture:!0}),document.body.addEventListener("mousedown",e,{capture:!0}),document.body.addEventListener("focus",e,{capture:!0})}function pt(e){let t=m(q.slice());return te([e],([l],[n])=>{n===!0&&l===!1?_e(()=>{t.value.splice(0)}):n===!1&&l===!0&&(t.value=q.slice())},{flush:"post"}),()=>{var l;return(l=t.value.find(n=>n!=null&&n.isConnected))!=null?l:null}}function vt({ownerDocument:e},t){let l=pt(t);$(()=>{k(()=>{var n,a;t.value||((n=e.value)==null?void 0:n.activeElement)===((a=e.value)==null?void 0:a.body)&&W(l())},{flush:"post"})}),A(()=>{W(l())})}function mt({ownerDocument:e,container:t,initialFocus:l},n){let a=m(null),r=m(!1);return $(()=>r.value=!0),A(()=>r.value=!1),$(()=>{te([t,l,n],(o,i)=>{if(o.every((u,d)=>(i==null?void 0:i[d])===u)||!n.value)return;let s=S(t);s&&_e(()=>{var u,d;if(!r.value)return;let h=S(l),b=(u=e.value)==null?void 0:u.activeElement;if(h){if(h===b){a.value=b;return}}else if(s.contains(b)){a.value=b;return}h?W(h):ce(s,V.First|V.NoScroll)===Qe.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),a.value=(d=e.value)==null?void 0:d.activeElement})},{immediate:!0,flush:"post"})}),a}function ht({ownerDocument:e,container:t,containers:l,previousActiveElement:n},a){var r;xe((r=e.value)==null?void 0:r.defaultView,"focus",o=>{if(!a.value)return;let i=je(l);S(t)instanceof HTMLElement&&i.add(S(t));let s=n.value;if(!s)return;let u=o.target;u&&u instanceof HTMLElement?He(i,u)?(n.value=u,W(u)):(o.preventDefault(),o.stopPropagation(),W(s)):W(n.value)},!0)}function He(e,t){for(let l of e)if(l.contains(t))return!0;return!1}let ye=new Map,ee=new Map;function Ce(e,t=m(!0)){k(l=>{var n;if(!t.value)return;let a=S(e);if(!a)return;l(function(){var o;if(!a)return;let i=(o=ee.get(a))!=null?o:1;if(i===1?ee.delete(a):ee.set(a,i-1),i!==1)return;let s=ye.get(a);s&&(s["aria-hidden"]===null?a.removeAttribute("aria-hidden"):a.setAttribute("aria-hidden",s["aria-hidden"]),a.inert=s.inert,ye.delete(a))});let r=(n=ee.get(a))!=null?n:0;ee.set(a,r+1),r===0&&(ye.set(a,{"aria-hidden":a.getAttribute("aria-hidden"),inert:a.inert}),a.setAttribute("aria-hidden","true"),a.inert=!0)})}let Ne=Symbol("ForcePortalRootContext");function gt(){return B(Ne,!1)}let Te=L({name:"ForcePortalRoot",props:{as:{type:[Object,String],default:"template"},force:{type:Boolean,default:!1}},setup(e,{slots:t,attrs:l}){return _(Ne,e.force),()=>{let{force:n,...a}=e;return O({theirProps:a,ourProps:{},slot:{},slots:t,attrs:l,name:"ForcePortalRoot"})}}});function yt(e){let t=fe(e);if(!t){if(e===null)return null;throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`)}let l=t.getElementById("headlessui-portal-root");if(l)return l;let n=t.createElement("div");return n.setAttribute("id","headlessui-portal-root"),t.body.appendChild(n)}let Ve=L({name:"Portal",props:{as:{type:[Object,String],default:"div"}},setup(e,{slots:t,attrs:l}){let n=m(null),a=v(()=>fe(n)),r=gt(),o=B(qe,null),i=m(r===!0||o==null?yt(n.value):o.resolveTarget());return k(()=>{r||o!=null&&(i.value=o.resolveTarget())}),A(()=>{var s,u;let d=(s=a.value)==null?void 0:s.getElementById("headlessui-portal-root");d&&i.value===d&&i.value.children.length<=0&&((u=i.value.parentElement)==null||u.removeChild(i.value))}),()=>{if(i.value===null)return null;let s={ref:n,"data-headlessui-portal":""};return T(at,{to:i.value},O({ourProps:s,theirProps:e,slot:{},attrs:l,slots:t,name:"Portal"}))}}}),qe=Symbol("PortalGroupContext"),bt=L({name:"PortalGroup",props:{as:{type:[Object,String],default:"template"},target:{type:Object,default:null}},setup(e,{attrs:t,slots:l}){let n=rt({resolveTarget(){return e.target}});return _(qe,n),()=>{let{target:a,...r}=e;return O({theirProps:r,ourProps:{},slot:{},attrs:t,slots:l,name:"PortalGroup"})}}}),Ie=Symbol("StackContext");var $e=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))($e||{});function wt(){return B(Ie,()=>{})}function Et({type:e,enabled:t,element:l,onUpdate:n}){let a=wt();function r(...o){n==null||n(...o),a(...o)}$(()=>{te(t,(o,i)=>{o?r(0,e,l):i===!0&&r(1,e,l)},{immediate:!0,flush:"sync"})}),A(()=>{t.value&&r(1,e,l)}),_(Ie,r)}let Ue=Symbol("DescriptionContext");function St(){let e=B(Ue,null);if(e===null)throw new Error("Missing parent");return e}function Tt({slot:e=m({}),name:t="Description",props:l={}}={}){let n=m([]);function a(r){return n.value.push(r),()=>{let o=n.value.indexOf(r);o!==-1&&n.value.splice(o,1)}}return _(Ue,{register:a,slot:e,name:t,props:l}),v(()=>n.value.length>0?n.value.join(" "):void 0)}L({name:"Description",props:{as:{type:[Object,String],default:"p"},id:{type:String,default:()=>`headlessui-description-${z()}`}},setup(e,{attrs:t,slots:l}){let n=St();return $(()=>A(n.register(e.id))),()=>{let{name:a="Description",slot:r=m({}),props:o={}}=n,{id:i,...s}=e,u={...Object.entries(o).reduce((d,[h,b])=>Object.assign(d,{[h]:x(b)}),{}),id:i};return O({ourProps:u,theirProps:s,slot:r.value,attrs:t,slots:l,name:a})}}});function $t(e){let t=ot(e.getSnapshot());return A(e.subscribe(()=>{t.value=e.getSnapshot()})),t}function pe(){let e=[],t={addEventListener(l,n,a,r){return l.addEventListener(n,a,r),t.add(()=>l.removeEventListener(n,a,r))},requestAnimationFrame(...l){let n=requestAnimationFrame(...l);t.add(()=>cancelAnimationFrame(n))},nextFrame(...l){t.requestAnimationFrame(()=>{t.requestAnimationFrame(...l)})},setTimeout(...l){let n=setTimeout(...l);t.add(()=>clearTimeout(n))},style(l,n,a){let r=l.style.getPropertyValue(n);return Object.assign(l.style,{[n]:a}),this.add(()=>{Object.assign(l.style,{[n]:r})})},group(l){let n=pe();return l(n),this.add(()=>n.dispose())},add(l){return e.push(l),()=>{let n=e.indexOf(l);if(n>=0)for(let a of e.splice(n,1))a()}},dispose(){for(let l of e.splice(0))l()}};return t}function Lt(e,t){let l=e(),n=new Set;return{getSnapshot(){return l},subscribe(a){return n.add(a),()=>n.delete(a)},dispatch(a,...r){let o=t[a].call(l,...r);o&&(l=o,n.forEach(i=>i()))}}}function Ft(){let e;return{before({doc:t}){var l;let n=t.documentElement;e=((l=t.defaultView)!=null?l:window).innerWidth-n.clientWidth},after({doc:t,d:l}){let n=t.documentElement,a=n.clientWidth-n.offsetWidth,r=e-a;l.style(n,"paddingRight",`${r}px`)}}}function Ot(){if(!ft())return{};let e;return{before(){e=window.pageYOffset},after({doc:t,d:l,meta:n}){function a(o){return n.containers.flatMap(i=>i()).some(i=>i.contains(o))}l.style(t.body,"marginTop",`-${e}px`),window.scrollTo(0,0);let r=null;l.addEventListener(t,"click",o=>{if(o.target instanceof HTMLElement)try{let i=o.target.closest("a");if(!i)return;let{hash:s}=new URL(i.href),u=t.querySelector(s);u&&!a(u)&&(r=u)}catch{}},!0),l.addEventListener(t,"touchmove",o=>{o.target instanceof HTMLElement&&!a(o.target)&&o.preventDefault()},{passive:!1}),l.add(()=>{window.scrollTo(0,window.pageYOffset+e),r&&r.isConnected&&(r.scrollIntoView({block:"nearest"}),r=null)})}}}function Pt(){return{before({doc:e,d:t}){t.style(e.documentElement,"overflow","hidden")}}}function Dt(e){let t={};for(let l of e)Object.assign(t,l(t));return t}let U=Lt(()=>new Map,{PUSH(e,t){var l;let n=(l=this.get(e))!=null?l:{doc:e,count:0,d:pe(),meta:new Set};return n.count++,n.meta.add(t),this.set(e,n),this},POP(e,t){let l=this.get(e);return l&&(l.count--,l.meta.delete(t)),this},SCROLL_PREVENT({doc:e,d:t,meta:l}){let n={doc:e,d:t,meta:Dt(l)},a=[Ot(),Ft(),Pt()];a.forEach(({before:r})=>r==null?void 0:r(n)),a.forEach(({after:r})=>r==null?void 0:r(n))},SCROLL_ALLOW({d:e}){e.dispose()},TEARDOWN({doc:e}){this.delete(e)}});U.subscribe(()=>{let e=U.getSnapshot(),t=new Map;for(let[l]of e)t.set(l,l.documentElement.style.overflow);for(let l of e.values()){let n=t.get(l.doc)==="hidden",a=l.count!==0;(a&&!n||!a&&n)&&U.dispatch(l.count>0?"SCROLL_PREVENT":"SCROLL_ALLOW",l),l.count===0&&U.dispatch("TEARDOWN",l)}});function At(e,t,l){let n=$t(U),a=v(()=>{let r=e.value?n.value.get(e.value):void 0;return r?r.count>0:!1});return te([e,t],([r,o],[i],s)=>{if(!r||!o)return;U.dispatch("PUSH",r,l);let u=!1;s(()=>{u||(U.dispatch("POP",i??r,l),u=!0)})},{immediate:!0}),a}var Ct=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Ct||{});let Le=Symbol("DialogContext");function le(e){let t=B(Le,null);if(t===null){let l=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(l,le),l}return t}let ue="DC8F892D-2EBD-447C-A4C8-A03058436FF4",Rt=L({name:"Dialog",inheritAttrs:!1,props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},open:{type:[Boolean,String],default:ue},initialFocus:{type:Object,default:null},id:{type:String,default:()=>`headlessui-dialog-${z()}`}},emits:{close:e=>!0},setup(e,{emit:t,attrs:l,slots:n,expose:a}){var r;let o=m(!1);$(()=>{o.value=!0});let i=m(0),s=Be(),u=v(()=>e.open===ue&&s!==null?(s.value&F.Open)===F.Open:e.open),d=m(null),h=m(null),b=v(()=>fe(d));if(a({el:d,$el:d}),!(e.open!==ue||s!==null))throw new Error("You forgot to provide an `open` prop to the `Dialog`.");if(typeof u.value!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${u.value===ue?void 0:e.open}`);let f=v(()=>o.value&&u.value?0:1),w=v(()=>f.value===0),E=v(()=>i.value>1),j=B(Le,null)!==null,X=v(()=>E.value?"parent":"leaf"),P=v(()=>s!==null?(s.value&F.Closing)===F.Closing:!1),G=v(()=>j||P.value?!1:w.value),ne=v(()=>{var c,p,g;return(g=Array.from((p=(c=b.value)==null?void 0:c.querySelectorAll("body > *"))!=null?p:[]).find(y=>y.id==="headlessui-portal-root"?!1:y.contains(S(h))&&y instanceof HTMLElement))!=null?g:null});Ce(ne,G);let ae=v(()=>E.value?!0:w.value),re=v(()=>{var c,p,g;return(g=Array.from((p=(c=b.value)==null?void 0:c.querySelectorAll("[data-headlessui-portal]"))!=null?p:[]).find(y=>y.contains(S(h))&&y instanceof HTMLElement))!=null?g:null});Ce(re,ae),Et({type:"Dialog",enabled:v(()=>f.value===0),element:d,onUpdate:(c,p)=>{if(p==="Dialog")return Y(c,{[$e.Add]:()=>i.value+=1,[$e.Remove]:()=>i.value-=1})}});let me=Tt({name:"DialogDescription",slot:v(()=>({open:u.value}))}),M=m(null),C={titleId:M,panelRef:m(null),dialogState:f,setTitleId(c){M.value!==c&&(M.value=c)},close(){t("close",!1)}};_(Le,C);function Z(){var c,p,g;return[...Array.from((p=(c=b.value)==null?void 0:c.querySelectorAll("html > *, body > *, [data-headlessui-portal]"))!=null?p:[]).filter(y=>!(y===document.body||y===document.head||!(y instanceof HTMLElement)||y.contains(S(h))||C.panelRef.value&&y.contains(C.panelRef.value))),(g=C.panelRef.value)!=null?g:d.value]}let he=v(()=>!(!w.value||E.value));Xe(()=>Z(),(c,p)=>{C.close(),it(()=>p==null?void 0:p.focus())},he);let ge=v(()=>!(E.value||f.value!==0));xe((r=b.value)==null?void 0:r.defaultView,"keydown",c=>{ge.value&&(c.defaultPrevented||c.key===Ze.Escape&&(c.preventDefault(),c.stopPropagation(),C.close()))});let D=v(()=>!(P.value||f.value!==0||j));return At(b,D,c=>{var p;return{containers:[...(p=c.containers)!=null?p:[],Z]}}),k(c=>{if(f.value!==0)return;let p=S(d);if(!p)return;let g=new ResizeObserver(y=>{for(let oe of y){let H=oe.target.getBoundingClientRect();H.x===0&&H.y===0&&H.width===0&&H.height===0&&C.close()}});g.observe(p),c(()=>g.disconnect())}),()=>{let{id:c,open:p,initialFocus:g,...y}=e,oe={...l,ref:d,id:c,role:"dialog","aria-modal":f.value===0?!0:void 0,"aria-labelledby":M.value,"aria-describedby":me.value},H={open:f.value===0};return T(Te,{force:!0},()=>[T(Ve,()=>T(bt,{target:d.value},()=>T(Te,{force:!1},()=>T(K,{initialFocus:g,containers:Z,features:w.value?Y(X.value,{parent:K.features.RestoreFocus,leaf:K.features.All&~K.features.FocusLock}):K.features.None},()=>O({ourProps:oe,theirProps:y,slot:H,attrs:l,slots:n,visible:f.value===0,features:Se.RenderStrategy|Se.Static,name:"Dialog"}))))),T(we,{features:Ee.Hidden,ref:h})])}}});L({name:"DialogOverlay",props:{as:{type:[Object,String],default:"div"},id:{type:String,default:()=>`headlessui-dialog-overlay-${z()}`}},setup(e,{attrs:t,slots:l}){let n=le("DialogOverlay");function a(r){r.target===r.currentTarget&&(r.preventDefault(),r.stopPropagation(),n.close())}return()=>{let{id:r,...o}=e;return O({ourProps:{id:r,"aria-hidden":!0,onClick:a},theirProps:o,slot:{open:n.dialogState.value===0},attrs:t,slots:l,name:"DialogOverlay"})}}});L({name:"DialogBackdrop",props:{as:{type:[Object,String],default:"div"},id:{type:String,default:()=>`headlessui-dialog-backdrop-${z()}`}},inheritAttrs:!1,setup(e,{attrs:t,slots:l,expose:n}){let a=le("DialogBackdrop"),r=m(null);return n({el:r,$el:r}),$(()=>{if(a.panelRef.value===null)throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.")}),()=>{let{id:o,...i}=e,s={id:o,ref:r,"aria-hidden":!0};return T(Te,{force:!0},()=>T(Ve,()=>O({ourProps:s,theirProps:{...t,...i},slot:{open:a.dialogState.value===0},attrs:t,slots:l,name:"DialogBackdrop"})))}}});let Bt=L({name:"DialogPanel",props:{as:{type:[Object,String],default:"div"},id:{type:String,default:()=>`headlessui-dialog-panel-${z()}`}},setup(e,{attrs:t,slots:l,expose:n}){let a=le("DialogPanel");n({el:a.panelRef,$el:a.panelRef});function r(o){o.stopPropagation()}return()=>{let{id:o,...i}=e,s={id:o,ref:a.panelRef,onClick:r};return O({ourProps:s,theirProps:i,slot:{open:a.dialogState.value===0},attrs:t,slots:l,name:"DialogPanel"})}}}),xt=L({name:"DialogTitle",props:{as:{type:[Object,String],default:"h2"},id:{type:String,default:()=>`headlessui-dialog-title-${z()}`}},setup(e,{attrs:t,slots:l}){let n=le("DialogTitle");return $(()=>{n.setTitleId(e.id),A(()=>n.setTitleId(null))}),()=>{let{id:a,...r}=e;return O({ourProps:{id:a},theirProps:r,slot:{open:n.dialogState.value===0},attrs:t,slots:l,name:"DialogTitle"})}}});function kt(e){let t={called:!1};return(...l)=>{if(!t.called)return t.called=!0,e(...l)}}function be(e,...t){e&&t.length>0&&e.classList.add(...t)}function de(e,...t){e&&t.length>0&&e.classList.remove(...t)}var Fe=(e=>(e.Finished="finished",e.Cancelled="cancelled",e))(Fe||{});function _t(e,t){let l=pe();if(!e)return l.dispose;let{transitionDuration:n,transitionDelay:a}=getComputedStyle(e),[r,o]=[n,a].map(i=>{let[s=0]=i.split(",").filter(Boolean).map(u=>u.includes("ms")?parseFloat(u):parseFloat(u)*1e3).sort((u,d)=>d-u);return s});return r!==0?l.setTimeout(()=>t("finished"),r+o):t("finished"),l.add(()=>t("cancelled")),l.dispose}function Re(e,t,l,n,a,r){let o=pe(),i=r!==void 0?kt(r):()=>{};return de(e,...a),be(e,...t,...l),o.nextFrame(()=>{de(e,...l),be(e,...n),o.add(_t(e,s=>(de(e,...n,...t),be(e,...a),i(s))))}),o.add(()=>de(e,...t,...l,...n,...a)),o.add(()=>i("cancelled")),o.dispose}function N(e=""){return e.split(" ").filter(t=>t.trim().length>1)}let Pe=Symbol("TransitionContext");var jt=(e=>(e.Visible="visible",e.Hidden="hidden",e))(jt||{});function Mt(){return B(Pe,null)!==null}function Ht(){let e=B(Pe,null);if(e===null)throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");return e}function Nt(){let e=B(De,null);if(e===null)throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");return e}let De=Symbol("NestingContext");function ve(e){return"children"in e?ve(e.children):e.value.filter(({state:t})=>t==="visible").length>0}function We(e){let t=m([]),l=m(!1);$(()=>l.value=!0),A(()=>l.value=!1);function n(r,o=I.Hidden){let i=t.value.findIndex(({id:s})=>s===r);i!==-1&&(Y(o,{[I.Unmount](){t.value.splice(i,1)},[I.Hidden](){t.value[i].state="hidden"}}),!ve(t)&&l.value&&(e==null||e()))}function a(r){let o=t.value.find(({id:i})=>i===r);return o?o.state!=="visible"&&(o.state="visible"):t.value.push({id:r,state:"visible"}),()=>n(r,I.Unmount)}return{children:t,register:a,unregister:n}}let Ye=Se.RenderStrategy,Oe=L({props:{as:{type:[Object,String],default:"div"},show:{type:[Boolean],default:null},unmount:{type:[Boolean],default:!0},appear:{type:[Boolean],default:!1},enter:{type:[String],default:""},enterFrom:{type:[String],default:""},enterTo:{type:[String],default:""},entered:{type:[String],default:""},leave:{type:[String],default:""},leaveFrom:{type:[String],default:""},leaveTo:{type:[String],default:""}},emits:{beforeEnter:()=>!0,afterEnter:()=>!0,beforeLeave:()=>!0,afterLeave:()=>!0},setup(e,{emit:t,attrs:l,slots:n,expose:a}){let r=m(0);function o(){r.value|=F.Opening,t("beforeEnter")}function i(){r.value&=~F.Opening,t("afterEnter")}function s(){r.value|=F.Closing,t("beforeLeave")}function u(){r.value&=~F.Closing,t("afterLeave")}if(!Mt()&&Ke())return()=>T(ze,{...e,onBeforeEnter:o,onAfterEnter:i,onBeforeLeave:s,onAfterLeave:u},n);let d=m(null),h=m("visible"),b=v(()=>e.unmount?I.Unmount:I.Hidden);a({el:d,$el:d});let{show:f,appear:w}=Ht(),{register:E,unregister:j}=Nt(),X={value:!0},P=z(),G={value:!1},ne=We(()=>{!G.value&&h.value!=="hidden"&&(h.value="hidden",j(P),u())});$(()=>{let D=E(P);A(D)}),k(()=>{if(b.value===I.Hidden&&P){if(f&&h.value!=="visible"){h.value="visible";return}Y(h.value,{hidden:()=>j(P),visible:()=>E(P)})}});let ae=N(e.enter),re=N(e.enterFrom),me=N(e.enterTo),M=N(e.entered),C=N(e.leave),Z=N(e.leaveFrom),he=N(e.leaveTo);$(()=>{k(()=>{if(h.value==="visible"){let D=S(d);if(D instanceof Comment&&D.data==="")throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")}})});function ge(D){let c=X.value&&!w.value,p=S(d);!p||!(p instanceof HTMLElement)||c||(G.value=!0,f.value&&o(),f.value||s(),D(f.value?Re(p,ae,re,me,M,g=>{G.value=!1,g===Fe.Finished&&i()}):Re(p,C,Z,he,M,g=>{G.value=!1,g===Fe.Finished&&(ve(ne)||(h.value="hidden",j(P),u()))})))}return $(()=>{te([f],(D,c,p)=>{ge(p),X.value=!1},{immediate:!0})}),_(De,ne),et(v(()=>Y(h.value,{visible:F.Open,hidden:F.Closed})|r.value)),()=>{let{appear:D,show:c,enter:p,enterFrom:g,enterTo:y,entered:oe,leave:H,leaveFrom:Qt,leaveTo:Xt,...Ae}=e,Ge={ref:d},Je={...Ae,...w&&f&&tt.isServer?{class:st([l.class,Ae.class,...ae,...re])}:{}};return O({theirProps:Je,ourProps:Ge,slot:{},slots:n,attrs:l,features:Ye,visible:h.value==="visible",name:"TransitionChild"})}}}),Vt=Oe,ze=L({inheritAttrs:!1,props:{as:{type:[Object,String],default:"div"},show:{type:[Boolean],default:null},unmount:{type:[Boolean],default:!0},appear:{type:[Boolean],default:!1},enter:{type:[String],default:""},enterFrom:{type:[String],default:""},enterTo:{type:[String],default:""},entered:{type:[String],default:""},leave:{type:[String],default:""},leaveFrom:{type:[String],default:""},leaveTo:{type:[String],default:""}},emits:{beforeEnter:()=>!0,afterEnter:()=>!0,beforeLeave:()=>!0,afterLeave:()=>!0},setup(e,{emit:t,attrs:l,slots:n}){let a=Be(),r=v(()=>e.show===null&&a!==null?(a.value&F.Open)===F.Open:e.show);k(()=>{if(![!0,!1].includes(r.value))throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.')});let o=m(r.value?"visible":"hidden"),i=We(()=>{o.value="hidden"}),s=m(!0),u={show:r,appear:v(()=>e.appear||!s.value)};return $(()=>{k(()=>{s.value=!1,r.value?o.value="visible":ve(i)||(o.value="hidden")})}),_(De,i),_(Pe,u),()=>{let d=lt(e,["show","appear","unmount","onBeforeEnter","onBeforeLeave","onAfterEnter","onAfterLeave"]),h={unmount:e.unmount};return O({ourProps:{...h,as:"template"},theirProps:{},slot:{},slots:{...n,default:()=>[T(Vt,{onBeforeEnter:()=>t("beforeEnter"),onAfterEnter:()=>t("afterEnter"),onBeforeLeave:()=>t("beforeLeave"),onAfterLeave:()=>t("afterLeave"),...l,...h,...d},n.default)]},attrs:{},features:Ye,visible:o.value==="visible",name:"Transition"})}}});const qt={class:"relative flex"},It=R("div",{class:"fixed inset-0 bg-black bg-opacity-25"},null,-1),Ut={class:"fixed inset-0 overflow-y-auto"},Wt={class:"flex min-h-full items-center justify-center p-4"},Yt={class:"p-2"},zt={class:"px-6"},Gt={class:"mt-4"},Jt={class:"flex justify-around"},ll=L({__name:"VDialog",props:{isOpen:{type:Boolean,default:!1}},emits:["close"],setup(e,{emit:t}){const l=e,{isOpen:n}=ut(l);function a(){t("close",!1)}return(r,o)=>(dt(),ct(ke,null,[R("div",qt,[R("div",null,[se(r.$slots,"button-open")])]),J(x(ze),{appear:"",show:x(n),as:"template"},{default:Q(()=>[J(x(Rt),{as:"div",class:"relative z-10",onClose:a},{default:Q(()=>[J(x(Oe),{as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-200 ease-in","leave-from":"opacity-100","leave-to":"opacity-0"},{default:Q(()=>[It]),_:1}),R("div",Ut,[R("div",Wt,[J(x(Oe),{as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0 scale-95","enter-to":"opacity-100 scale-100",leave:"duration-200 ease-in","leave-from":"opacity-100 scale-100","leave-to":"opacity-0 scale-95"},{default:Q(()=>[J(x(Bt),{class:"transform overflow-hidden rounded-xl bg-white align-middle shadow-xl transition-all"},{default:Q(()=>[J(x(xt),{class:"flex items-center justify-center text-lg"},{default:Q(()=>[R("div",Yt,[se(r.$slots,"title")])]),_:3}),R("div",zt,[se(r.$slots,"detail")]),R("div",Gt,[R("div",Jt,[se(r.$slots,"action")])])]),_:3})]),_:3})])])]),_:3})]),_:3},8,["show"])],64))}});export{ll as _};
