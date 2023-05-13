import{d as A,g as P,s as H,u as z,h as l,m as Z,v as F,o as y,c as w,i as a,a as n,b as o,L as S,f as I,k as Q,J as q,Q as N}from"./index-5ef231b5.js";import{_ as J}from"./VInput.vue_vue_type_script_setup_true_lang-98256709.js";/* empty css              */import{i as K}from"./index-10f110be.js";const X={class:"flex"},D=n("div",{class:"hidden flex-1 lg:flex"},null,-1),G={key:0,class:"flex flex-1 flex-col px-2 py-4"},O={class:"flex flex-1 flex-col gap-4"},W=n("div",{class:"flex justify-center"},[n("img",{class:"w-[300px]",src:"https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.0251fdd.png"})],-1),Y=n("div",{class:"flex justify-center"},[n("p",{class:"text-lg font-bold"},"Đăng nhập tài khoản Smember")],-1),ee=n("p",{class:"flex cursor-pointer justify-end text-xs font-thin hover:text-main"},"Quên mật khẩu?",-1),ne=n("div",{class:"flex py-4"},[n("div",{class:"mt-[9px] !h-[1px] flex-1 border-2"}),n("p",{class:"mx-1"},"Hoặc"),n("div",{class:"mt-[9px] !h-[1px] flex-1 border-2"})],-1),te={key:1,class:"flex flex-1 flex-col px-2 py-4"},se={class:"flex flex-1 flex-col gap-4"},oe=n("div",{class:"flex justify-center"},[n("img",{class:"w-[300px]",src:"https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.0251fdd.png"})],-1),le=n("div",{class:"flex justify-center"},[n("p",{class:"text-lg font-bold"},"Đăng ký tài khoản Smember")],-1),ae=n("p",{class:"-mt-[14px] flex items-start text-xs font-semibold"}," Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt ",-1),ce=I('<div class="flex gap-2 text-xs"><input checked="true" class="text-main active:bg-main" type="checkbox"><p>Tôi đồng ý với các điều khoản bảo mật cá nhân</p></div><div class="flex gap-2 text-xs"><input checked="true" class="text-main active:bg-main" type="checkbox"><p>Đăng ký nhận bản tin khuyến mãi qua email</p></div><div class="flex py-4"><div class="mt-[9px] !h-[1px] flex-1 border-2"></div><p class="mx-1">Hoặc</p><div class="mt-[9px] !h-[1px] flex-1 border-2"></div></div>',3),ie=n("div",{class:"hidden flex-1 lg:flex"},null,-1),ue=A({__name:"login",setup(de){const p=P(),{isLoginSuccess:g}=H(p),U=z(),x=l(!0),i=l(""),d=l(""),r=l(""),h=l(""),m=l(""),c=l(""),f=l(""),v=l([]);Z(async()=>{g.value&&await U.push("/")}),F(async()=>{g.value&&await U.push("/"),window.scrollTo(0,0),v.value=await p.getAllCustomers()});const k=()=>{x.value=!x.value};function V(e){d.value=e}function $(e){m.value=e}function C(e){i.value=e}function T(e){c.value=e}function M(e){f.value=e}function L(e){h.value=e}function j(e){r.value=e}async function R(){const e=/^0\d{9}$/;let t="";if(e.test(d.value)||(t="SĐT không đúng định dạng"),m.value||(t="Mật khẩu không được để trống"),d.value||(t="SĐT không được để trống"),t===""){const s=v.value.find(u=>u.username===d.value);s!==void 0?s.password===m.value?(g.value=s.username,t="Đăng nhập thành công",v.value=await p.getAllCustomers()):t="Mật khẩu không đúng":t="Tài khoản/Mật khẩu không đúng"}_(t)}async function B(){let e="Đăng ký thành công",t="";if(c.value||(e="Mật khẩu không được để trống"),r.value||(e="Họ tên không được để trống"),h.value||(e="Email không được để trống"),i.value||(e="SĐT không được để trống"),e==="Đăng ký thành công"){const s=/^[a-zA-Z]+$/,u=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,b=/^0\d{9}$/,E=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;c.value!==f.value&&(e="Mật khẩu xác nhận không chính xác"),E.test(c.value)||(e="Mật khẩu không đúng định dạng"),s.test(r.value)||(e="Họ tên không được chứa số"),u.test(h.value)||(e="Email không đúng định dạng"),b.test(i.value)||(e="SĐT không đúng định dạng")}return e==="Đăng ký thành công"&&(t=await p.postSignUp(i.value,c.value)),t!=="exists account"?_(e):t==="exists account"&&_("Tài khoản đã tồn tại"),e}const _=e=>{e!==""&&(K(`${e}`,{}),e==="Đăng ký thành công"&&(i.value="",h.value="",r.value="",c.value="",f.value=""))};return(e,t)=>{const s=J,u=Q,b=q;return y(),w("main",X,[D,a(x)?(y(),w("div",G,[n("div",O,[W,Y,o(s,{"max-length":10,"input-class":"rounded-lg focus:border-main",placeholder:"Vui lòng nhập số điện thoại",model:a(d),"onUpdate:model":V},null,8,["model"]),o(s,{"input-class":"rounded-lg focus:border-main",placeholder:"Vui lòng nhập mật khẩu",type:"password",model:a(m),"onUpdate:model":$},null,8,["model"]),ee,o(u,{"input-class":"!h-10 !bg-main border-none rounded-2xl",label:"Đăng Nhập",onClick:R}),ne,n("div",{class:"flex justify-center text-slate-500"},[S(" Bạn chưa có tài khoản? "),n("span",{class:"mx-2 cursor-pointer text-main hover:underline",onClick:k}," Đăng ký ngay")])])])):(y(),w("div",te,[n("div",se,[n("span",{class:"cursor-pointer text-xl font-bold",onClick:k},[o(b,{icon:"fa-arrow-left"}),S(" Đăng nhập tài khoản")]),oe,le,o(s,{"max-length":10,"input-class":"rounded-lg focus:border-main",placeholder:"Vui lòng nhập số điện thoại(bắt buộc)",model:a(i),"onUpdate:model":C},null,8,["model"]),o(s,{"max-length":50,"input-class":"rounded-lg focus:border-main",placeholder:"Vui lòng nhập địa chỉ email(bắt buộc)",model:a(h),"onUpdate:model":L},null,8,["model"]),o(s,{"max-length":50,"input-class":"rounded-lg focus:border-main",placeholder:"Vui lòng nhập họ tên",model:a(r),"onUpdate:model":j},null,8,["model"]),o(s,{"max-length":50,"input-class":"rounded-lg focus:border-main",placeholder:"Nhập mật khẩu của bạn",model:a(c),type:"password","onUpdate:model":T},null,8,["model"]),ae,o(s,{"max-length":50,"input-class":"rounded-lg focus:border-main",placeholder:"Xác nhận lại mật khẩu",type:"password",model:a(f),"onUpdate:model":M},null,8,["model"]),o(u,{"input-class":"!h-10 !bg-main border-none rounded-2xl",label:"Đăng Ký",onClick:B}),ce,n("div",{class:"flex justify-center text-slate-500"},[S(" Bạn chưa có tài khoản? "),n("span",{class:"mx-2 cursor-pointer text-main hover:underline",onClick:k}," Đăng nhập ngay")])])])),ie])}}});typeof N=="function"&&N(ue);export{ue as default};
