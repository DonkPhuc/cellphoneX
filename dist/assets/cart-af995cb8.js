import{d as j,g as q,s as T,u as H,B as $,m as g,o as i,c as a,h as r,a as e,b as n,n as m,F as P,e as B,t as u,k as D,q as F,v as b}from"./index-ed37f930.js";const E={class:"flex"},I=e("div",{class:"hidden flex-1 lg:flex"},null,-1),S={key:0,class:"flex flex-1 flex-col py-4"},z={class:"flex flex-1 flex-col gap-12"},G={class:"flex"},M=e("span",{class:"flex flex-1 justify-center text-xl font-bold text-main"},[e("p",{class:"-ml-16"},"Giỏ hàng")],-1),Q={class:"flex justify-center pt-20"},K=e("div",{class:"flex justify-center"},[e("p",{class:"text-xl"},"Không có sản phẩm nào trong giỏ hàng, vui lòng quay lại")],-1),L={class:"flex justify-center"},U={key:1,class:"flex flex-1 flex-col py-4"},A={class:"flex flex-1 flex-col gap-12"},J={class:"flex"},O=e("span",{class:"flex flex-1 justify-center text-xl font-bold text-main"},[e("p",{class:"-ml-16"},"Giỏ hàng")],-1),W={class:"flex gap-8 border-b-2 p-4"},X=["src"],Y={class:"flex flex-1 flex-col gap-2"},Z={class:"flex justify-between"},ee=["onClick"],te=["onClick"],se={class:"flex justify-between"},oe={class:"font-bold text-main"},ne={class:"text-xs text-gray-500 line-through"},le={class:"flex items-center rounded-xl border bg-[#f4f4f4]"},ce=["onClick"],ie={class:"px-3 text-xs"},ae=["onClick"],re={class:"flex flex-col justify-center gap-4 rounded-lg border p-2 shadow-lg"},ue={class:"flex flex-1 justify-between"},fe=e("span",{class:"font-bold"},"Tổng tiền tạm tính:",-1),de={class:"font-bold text-main"},_e=e("div",{class:"hidden flex-1 lg:flex"},null,-1),pe=j({__name:"cart",setup(xe){const k=q(),{cart:o,currentProduct:v}=T(k),d=H();$(()=>{o.value.find(s=>s.id==="")&&o.value.splice(0,1),window.scrollTo(0,0)});async function _(){await d.push("/")}async function w(){await d.push("/payment")}const y=g(()=>t=>{let s={price:"",priceRRP:""};return s.price=new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(t.price*t.quality),s.priceRRP=new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(t.priceRRP*t.quality),s}),N=g(()=>{let t=0;return o.value.forEach(s=>{t+=Number(s.price*s.quality)}),new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(t)});function C(t){o.value[t].quality++}function V(t){o.value[t].quality>1&&o.value[t].quality--}function R(t){o.value.splice(t,1)}async function p(t){let s=o.value.find(({id:l})=>l===t);v.value=[],s&&v.value.push(s),t==="/"?await _():await d.push("products/detail")}return(t,s)=>{const l=D,x=F;return i(),a("main",E,[I,r(o).length===0?(i(),a("div",S,[e("div",z,[e("div",G,[e("span",{class:"flex cursor-pointer items-start font-bold text-main",onClick:s[0]||(s[0]=c=>p("/"))},[n(l,{size:"text-[20px]",icon:"fa-angle-left"}),m(" Trở về ")]),M]),e("div",Q,[n(l,{size:"text-[80px]",icon:"fa-smile-o"})]),K,e("div",L,[n(x,{"input-class":"!h-10 w-44 !bg-main border-none rounded-lg",label:"Quay lại trang chủ",onClick:_})])])])):(i(),a("div",U,[e("div",A,[e("div",J,[e("span",{class:"flex cursor-pointer items-start font-bold text-main",onClick:s[1]||(s[1]=c=>p("/"))},[n(l,{size:"text-[20px]",icon:"fa-angle-left"}),m(" Trở về ")]),O]),(i(!0),a(P,null,B(r(o),(c,f)=>(i(),a("div",{key:f,class:"flex max-h-[400px] flex-col overflow-y-auto"},[e("div",W,[e("img",{class:"h-32 w-32",src:c.imageLink,alt:""},null,8,X),e("div",Y,[e("div",Z,[e("p",{class:"cursor-pointer font-bold hover:underline",onClick:h=>p(c.id)},u(c.name),9,ee),e("div",{class:"cursor-pointer",onClick:h=>R(f)},[n(l,{icon:"fa-times"})],8,te)]),e("div",se,[e("p",oe,[m(u(r(y)(c).price)+" ",1),e("span",ne,u(r(y)(c).priceRRP),1)]),e("div",le,[e("div",{class:"cursor-pointer",onClick:h=>V(f)},[n(l,{icon:"fa-minus"})],8,ce),e("p",ie,u(c.quality),1),e("div",{class:"cursor-pointer",onClick:h=>C(f)},[n(l,{icon:"fa-plus"})],8,ae)])])])])]))),128)),e("div",re,[e("div",ue,[fe,e("span",de,u(r(N)),1)]),n(x,{"input-class":"!h-16 w-full !bg-main border-none rounded text-[16px] !font-bold",label:"TIẾN HÀNH ĐẶT HÀNG",onClick:w}),n(x,{variant:"outlined","input-class":"!h-16 w-full !border-main !text-main rounded hover:!bg-main/70 hover:!text-white !text-[16px] !font-bold active:bg-main/70",label:"CHỌN THÊM SẢN PHẨM KHÁC",onClick:_})])])])),_e])}}});typeof b=="function"&&b(pe);export{pe as default};
