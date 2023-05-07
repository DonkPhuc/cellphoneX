import{_ as j}from"./VButton.vue_vue_type_script_setup_true_lang-3c8d9d4b.js";import{d as q,g as T,s as H,u as $,A as P,m as g,o as i,c as a,h as r,a as e,b as n,n as m,F as D,e as F,t as f,k as B,q as b}from"./index-636745d2.js";const E={class:"flex"},I=e("div",{class:"hidden flex-1 lg:flex"},null,-1),S={key:0,class:"flex flex-1 flex-col py-4"},z={class:"flex flex-1 flex-col gap-12"},G={class:"flex"},M=e("span",{class:"flex flex-1 justify-center text-xl font-bold text-main"},[e("p",{class:"-ml-16"},"Giỏ hàng")],-1),Q={class:"flex justify-center pt-20"},K=e("div",{class:"flex justify-center"},[e("p",{class:"text-xl"},"Không có sản phẩm nào trong giỏ hàng, vui lòng quay lại")],-1),L={class:"flex justify-center"},A={key:1,class:"flex flex-1 flex-col py-4"},U={class:"flex flex-1 flex-col gap-12"},J={class:"flex"},O=e("span",{class:"flex flex-1 justify-center text-xl font-bold text-main"},[e("p",{class:"-ml-16"},"Giỏ hàng")],-1),W={class:"flex gap-8 border-b-2 p-4"},X=["src"],Y={class:"flex flex-1 flex-col gap-2"},Z={class:"flex justify-between"},ee=["onClick"],te=["onClick"],se={class:"flex justify-between"},oe={class:"font-bold text-main"},ne={class:"text-xs text-gray-500 line-through"},le={class:"flex items-center rounded-xl border bg-[#f4f4f4]"},ce=["onClick"],ie={class:"px-3 text-xs"},ae=["onClick"],re={class:"flex flex-col justify-center gap-4 rounded-lg border p-2 shadow-lg"},fe={class:"flex flex-1 justify-between"},ue=e("span",{class:"font-bold"},"Tổng tiền tạm tính:",-1),de={class:"font-bold text-main"},_e=e("div",{class:"hidden flex-1 lg:flex"},null,-1),pe=q({__name:"cart",setup(xe){const k=T(),{cart:o,currentProduct:v}=H(k),d=$();P(()=>{o.value.find(s=>s.id==="")&&o.value.splice(0,1),window.scrollTo(0,0)});async function _(){await d.push("/")}async function w(){await d.push("/payment")}const y=g(()=>t=>{let s={price:"",priceRRP:""};return s.price=new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(t.price*t.quality),s.priceRRP=new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(t.priceRRP*t.quality),s}),N=g(()=>{let t=0;return o.value.forEach(s=>{t+=Number(s.price*s.quality)}),new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(t)});function C(t){o.value[t].quality++}function V(t){o.value[t].quality>1&&o.value[t].quality--}function R(t){o.value.splice(t,1)}async function p(t){let s=o.value.find(({id:l})=>l===t);v.value=[],s&&v.value.push(s),t==="/"?await _():await d.push("products/detail")}return(t,s)=>{const l=B,x=j;return i(),a("main",E,[I,r(o).length===0?(i(),a("div",S,[e("div",z,[e("div",G,[e("span",{class:"flex cursor-pointer items-start font-bold text-main",onClick:s[0]||(s[0]=c=>p("/"))},[n(l,{size:"text-[20px]",icon:"fa-angle-left"}),m(" Trở về ")]),M]),e("div",Q,[n(l,{size:"text-[80px]",icon:"fa-smile-o"})]),K,e("div",L,[n(x,{"input-class":"!h-10 w-44 !bg-main border-none rounded-lg",label:"Quay lại trang chủ",onClick:_})])])])):(i(),a("div",A,[e("div",U,[e("div",J,[e("span",{class:"flex cursor-pointer items-start font-bold text-main",onClick:s[1]||(s[1]=c=>p("/"))},[n(l,{size:"text-[20px]",icon:"fa-angle-left"}),m(" Trở về ")]),O]),(i(!0),a(D,null,F(r(o),(c,u)=>(i(),a("div",{key:u,class:"flex max-h-[400px] flex-col overflow-y-auto"},[e("div",W,[e("img",{class:"h-32 w-32",src:c.imageLink,alt:""},null,8,X),e("div",Y,[e("div",Z,[e("p",{class:"cursor-pointer font-bold hover:underline",onClick:h=>p(c.id)},f(c.name),9,ee),e("div",{class:"cursor-pointer",onClick:h=>R(u)},[n(l,{icon:"fa-times"})],8,te)]),e("div",se,[e("p",oe,[m(f(r(y)(c).price)+" ",1),e("span",ne,f(r(y)(c).priceRRP),1)]),e("div",le,[e("div",{class:"cursor-pointer",onClick:h=>V(u)},[n(l,{icon:"fa-minus"})],8,ce),e("p",ie,f(c.quality),1),e("div",{class:"cursor-pointer",onClick:h=>C(u)},[n(l,{icon:"fa-plus"})],8,ae)])])])])]))),128)),e("div",re,[e("div",fe,[ue,e("span",de,f(r(N)),1)]),n(x,{"input-class":"!h-16 w-full !bg-main border-none rounded text-[16px] !font-bold",label:"TIẾN HÀNH ĐẶT HÀNG",onClick:w}),n(x,{variant:"outlined","input-class":"!h-16 w-full !border-main !text-main rounded hover:!bg-main/70 hover:!text-white !text-[16px] !font-bold active:bg-main/70",label:"CHỌN THÊM SẢN PHẨM KHÁC",onClick:_})])])])),_e])}}});typeof b=="function"&&b(pe);export{pe as default};
