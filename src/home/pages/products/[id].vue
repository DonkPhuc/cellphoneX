<script setup lang="ts">
import 'vue3-toastify/dist/index.css';

import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';

import { Products } from '~/home/dtos';
import { useStore } from '~/home/stores/Store';
import { useUserStore } from '~/user/stores/user';
const userStore = useUserStore();
const store = useStore();
const { isLoginSuccess } = storeToRefs(userStore);

const router = useRouter();
const route = useRoute();
const currentProduct = ref();

onMounted(async () => {
  currentProduct.value = (await store.getProduct(route.params.id.toString())) as Products;
  currentProduct.value.price =
    currentProduct.value.priceRRP - (currentProduct.value.priceRRP * currentProduct.value.discount) / 100;
  window.scrollTo(0, 0);
});

const formatVND = computed(() => (slide: Products) => {
  let result = {
    price: '',
    priceRRP: '',
  };
  result.price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(slide.price);
  result.priceRRP = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(slide.priceRRP);

  return result;
});

async function addToCart(action: string) {
  if (!isLoginSuccess.value) {
    console.log('chua login');
  } else {
    const rs = await store.postAddToCart(isLoginSuccess.value, route.params.id.toString());
    if (action === 'buy') {
      await router.push(`/cart`);
    } else if (rs === 'successfully') {
      notifySignUp('Đã thêm vào giỏ hàng');
    } else {
      notifySignUp('Sản phẩm đã có trong giỏ hàng');
    }
  }
}

const notifySignUp = (error?: string) => {
  if (error !== '') {
    toast(`${error}`, {});
  }
};
// const isFound = cart.value.some((element) => {
//   if (element.name === currentProduct.value[0].name) {
//     return true;
//   }
//   return false;
// });
// if (cart.value.length === 0) {
//   cart.value.push(currentProduct.value[0]);
// } else {
//   if (isFound) {
//     const result = cart.value.find(({ id }) => id === currentProduct.value[0].id);
//     if (result) {
//       result.quantity++;
//     }
//   } else {
//     cart.value.push(currentProduct.value[0]);
//   }
// }
</script>

<template>
  <div class="flex">
    <div class="hidden flex-[0.3] lg:flex"></div>
    <main v-if="currentProduct" class="flex-1 py-4">
      <div class="flex flex-col gap-4">
        <div class="flex w-full items-center gap-4 border-b-2 px-4 py-2">
          <span class="text-lg font-bold text-black">{{ currentProduct.name }}</span>
          <div class="hidden pl-8 lg:flex">
            <div class="hidden items-center justify-end lg:flex">
              <VIcon icon-class="text-yellow-600" icon="fa-star" />
              <VIcon icon-class="text-yellow-600" icon="fa-star" />
              <VIcon icon-class="text-yellow-600" icon="fa-star" />
              <VIcon icon-class="text-yellow-600" icon="fa-star" />
              <VIcon icon-class="text-yellow-600" icon="fa-star" />
            </div>
            <span class="hidden lg:flex">8 đánh giá</span>
          </div>
        </div>

        <div class="flex flex-col gap-4 border-b-2 p-4 md:flex-row md:px-2 lg:flex-row">
          <div class="flex-1">
            <VProductsList :data-detail="currentProduct" type="detail" />
          </div>

          <div class="flex-1">
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-4">
                <span class="font-bold text-red-600"> {{ formatVND(currentProduct).price }} </span>
                <span class="text-xs line-through"> {{ formatVND(currentProduct).priceRRP }} </span>
              </div>

              <div class="flex gap-4">
                <div class="h-20 flex-1 rounded-md border"></div>
                <div class="h-20 flex-1 rounded-md border"></div>
                <div class="h-20 flex-1 rounded-md border"></div>
              </div>

              <span>Chọn màu để xem giá và chi nhánh có hàng</span>

              <div class="flex gap-4">
                <div class="h-10 flex-1 rounded-md border"></div>
                <div class="h-10 flex-1 rounded-md border"></div>
                <div class="h-10 flex-1 rounded-md border"></div>
              </div>

              <div class="flex flex-col">
                <div class="rounded-t-2xl bg-[#FEE2E2] p-2 !font-bold text-main">
                  <VIconLabel icon-color="text-main" icon="fa-archive" label="Khuyến Mãi" />
                </div>
                <div class="h-40 rounded-b-2xl border">
                  <div class="flex flex-col">
                    <div class="flex items-center gap-2 p-2">
                      1
                      <p class="text-xs">
                        Giảm ngay 3.000.000đ khi tham gia thu cũ đổi mới - Giá thu tốt nhất thị trường (Xem chi tiết)
                      </p>
                    </div>
                    <div class="flex items-center gap-2 p-2">
                      1
                      <p class="text-xs">
                        Giảm ngay 3.000.000đ khi tham gia thu cũ đổi mới - Giá thu tốt nhất thị trường (Xem chi tiết)
                      </p>
                    </div>
                    <div class="flex items-center gap-2 p-2">
                      1
                      <p class="text-xs">
                        Giảm ngay 3.000.000đ khi tham gia thu cũ đổi mới - Giá thu tốt nhất thị trường (Xem chi tiết)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex gap-2">
                <div class="flex-1 rounded-xl">
                  <VButton
                    input-class="w-full !h-14 rounded-xl border-none !bg-main"
                    :style="'2line'"
                    label="Mua Ngay"
                    label2="(Giao hàng nhanh từ 2 giờ hoặc nhận tại cửa hàng)"
                    @click="addToCart('buy')"
                  />
                </div>
                <div class="flex-[1/4] rounded-xl">
                  <VButton
                    :style="'2line'"
                    input-class="w-full !h-14 rounded-xl !border-main !text-main hover:!bg-white active:!bg-white focus:!bg-white"
                    variant="outlined"
                    label2="Thêm vào giỏ"
                    icon="fa-cart-arrow-down"
                    @click="addToCart('cart')"
                  />
                </div>
              </div>

              <div class="flex gap-2">
                <div class="flex-1 rounded-xl">
                  <VButton
                    input-class="w-full !h-14 rounded-xl border-none !bg-[linear-gradient(180deg,#3a78d0,#277cea)]"
                    label="trả góp 0%"
                    :style="'2line'"
                    label2="(Xét duyệt qua điện thoại)"
                  />
                </div>
                <div class="flex-1 rounded-xl">
                  <VButton
                    input-class="w-full !h-14 rounded-xl border-none !bg-[linear-gradient(180deg,#3a78d0,#277cea)]"
                    :style="'2line'"
                    label2="(Visa, MasterCard, JCB)"
                    label="tra góp qua thẻ"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="hidden flex-1 lg:flex">
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-4 rounded-xl border p-4">
                <span class="font-bold">Thông tin sản phẩm</span>
                <span class="flex items-center gap-2">
                  <img
                    class="h-8 w-5"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAyCAYAAADWU2JnAAAABHNCSVQICAgIfAhkiAAAAWRJREFUWEftmcFNw0AQRf+sG6ADoAJCBUAHlJDL7hW7ApIOcrS8PpgKKAHTQaiAlOBcfdhBIxHJRgFpbWT7MHuLtM78efu0hx0CAOfcM4A1gCv5PdVi5oaIamNMluf5gZxzGwASZrbFzHvv/a2E+ZyayLmuQwgPEoZnQ9IvnC0pzHbRYbIQwn6qYzPG7ADcfNfrkxGJyrKspwpjra2J6E7D/CSuZH5zUMkomdj7SZ1RZ9SZWALqTCwxvWfUGXUmloA6E0tM7xl1Rp2JJaDOxBL7855h5hTAZC9XAHZEtDr7WBTb2T/vX/YDY2yzL23bplVVNc65RwCvsX/Q2T+KzLEoiotucWutOPA0MNDwMMz87r2/7xYeOYcYHkZCGGOuZRpyCmStfSOiXsAISluy1h6I6DLio+5WCbIJITTGGBkRiTeD1mmQMfuIB8BHURQrkjbkrJl5PYLQIBoAjsxcJ0mSynF/AXY82KKEipF6AAAAAElFTkSuQmCC"
                  />
                  <p class="text-sm font-extralight">
                    Nguyên hộp, đầy đủ phụ kiện từ nhà sản suất<br />Bảo hành pin 12 tháng
                  </p>
                </span>
                <span class="flex items-center gap-2">
                  <img
                    class="h-5 w-5"
                    src="data:image/png;base64,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"
                  />
                  <p class="text-sm font-extralight">
                    Bảo hành 24 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ
                    nhà sản xuất.
                  </p>
                </span>
              </div>

              <div class="flex flex-col gap-4 rounded-xl border p-4">
                <span class="flex items-start gap-2">
                  <img
                    class="mt-1 h-5 w-5"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAACdRJREFUaEPNWnmQXGUR//WbyW5IKoSNUEhU2HAYlMuyUigFhKAoYgQlZCNXwh7zvpcEghwlaBXgKlCcIhDY7PT3ZgihkGMgHAUlghxyqCVQiEUUsYSAbgTBzAY53My8r61Ovana7M7xdnaw6P929/u6+/f13W8JHwEZY3YGcKqIfAPAZ4lIALwiIg8R0a3M/E6rxVIrGRpjdgNwLoAVAKbV4P0hEXEqlbp8YGDgzVbJbwmQFStWdJTL5fOJaJUCEBG1wK8B3FwqlZ5pb2+Hc+5QAKcBOIKIVO4HIrI6nU5fsWbNmuJkAU0KyLJlyz7R3t5+VgxgZgzg/iiKLsnn889VUy4IgnkicqGIHBsD2qKARkZGrl23bt2/mwXUFJAgCPZxzp1ORL0AZgBQCzwSRdGFuVzu90mU6evrOziVSl0M4Ovx+f8AyBHRQDab/WsSHqPPJAbS1dXVttNOOy0koh4ACwF4sQUeBHCZtfY3ExWu53t7e+el0+mLRORbsYWciDwGYGB4ePjBQqGwNQnfukC6urp26Ojo+AqARQC+A2BWzPRdALeUSqWBm2666U9JBDU6EwTB50VkJYClAHbU8yKyGcC9RLS+WCw+VigUPqzFZzsg8avP8zzvcBFRAIcD2CG+XBaRJ0Tkdufcnfl8Xl2h5dTb2zvD87wlnuedKCJHElEqFqLZ7kkAjzvnnhoeHn5utLW2A2KMUcRTR2n3XwBPOufuB3BXGIZvtVzzOgwzmcyunuctBnAcgPljdWPmyiNjLJASgLSIXENEvwTwNDN/8P9UvpaspUuXTp86dephRHQ0gLMBlJl5SuX8dkB831fzTfU8b9fBwcF/fRwAjNWhu7v7k21tbf/UOsTM06sCMcZs0UCLoqgzl8u9/nEEkslk5nie9yqAIjNXks/2ruX7/t+J6NNEtF82m21JNmr1Y2QymQM9z3sRwEZmnlPLIn8EcIBzbn4Yhk81o4Rmvo6OjsUicjwRaRWfrXyIaEhEnvc8b/3mzZvvTlofxupgjDkSgNaZF5j5i7Vi5HEiWiAii6y190wUiO/7JxDRNQB2b3D3DSI6O5vNrm9CxhIiugPAw8ysgb+NxmatW7T9BrCKmW+YgBDP933NdN+L77yklVlEHh0eHt6ov5sxY8acdDqttel0APvp70TkOmvtOQBcUlnGGO2urxaRnLU2UwvIZQB+ICJXW2u/n5S57/vXKggR2UpE5xaLxTWFQiGqdr+rqys1a9aslc65q4moDcC1zKzpNBH5vn993KRexMzaq1W1iCK0ANYz8wlJOPu+r7GgLlJyzi0Mw/CR0feMMdpQgpnHpvqjADxIRFOIaHFSN/N9X4ezo0XkJGvt7VWBLF++/FDn3NMAXmbmzzUCEge2dqoaE1XdsRYQ5W2MOQPAagBvFIvFfZIkAGOMloXdnXMHhWGoyWm8Rfr6+mZ5nvcOEUVbt26dsXbtWm1RalIQBCeJyM8BvFQsFr9QzZ3qAdEYNca8AOAgIjo5m83eVk/eKP22tre3z1y9evVIVSDxK/0NwJ7OuUPCMPxdPca+7xfULQCsZOY11c42AALf91cS0Y0ACsy8pIG8o4noIRF51lp78Oiz49p4Y4z63XdF5Cxr7XX1GBtjXgPQKSJzrbWvNAOkt7d3bjqdfhnAa8y8ZwMgPyYinV1WW2vPbARkm9+KyD3WWp1DapIxRl2vvVgstlfzb2PMvgD+XC3YK0xXrVrVPjIyonxGmHl05z1Oru/7TxKRjhjj6tw4i8QDzgbtZWbPnr1zf39/zRxfD4gx5jQRuZGItLHbwMz7V3uRpEBOOeWUHadNm/Y2gFQ6nd5l7MKi6oRojHkDwGd0sGJmzWJVqeJa5XJ533w+/5c4xnSLogC69WcRWUtEp9caB0ZZra5rGWO6ANyp8xEzHzFWoVpABnQ31agwVgv2IAi0zyqIyPsxgJsb+H2iYDfGaEY7EcA5zPyzREB83z+KiLSwvR53mNuK2lgalX43FIvFgyrp1xjzIyIqJOigNf3+AcCBzrmTwzCsmn7joeqteFbaY3BwcCgREG0jOjo61L1mi8gCa60u28bR6IIoImdaa7W4JSbf91cR0fWNCmIQBD0ikgfwKDNrRzCOam5RjDFXADhPRG611mojWZWCIFgkIneJiI7JC621v0qCJAiCr4mIrpLSzrnFYRjW7ISNMVrPvuScOzEMQ+18kwPp6+vbO5VKaQCXPM/bvd7oW2kaAegO6lxm1gJX1R21mvu+fwYR/RSAztx1m8ZMJvNlz/N+C0DH2z2YWR8sORA9aYx5QF9ZRC6x1l5Y56XV13UO0TZerfyiiHA6nX5048aN29r4zs7OznK5/FUiCjQmYqDXMbO28bVAa+VfT0THA/ghM19eS4e6C7ogCOaLiMaHLpnnMLPO9DUpk8ks8jxPM0rDwco5d3Y9d1Ihuid2zukKdgsRddaT33Blaox5QjfoAC5m5osa+b8mgJkzZ57geZ6+oo66n9I7OuoCeM45d8+WLVsSjbrGGF1J6W74Ama+tJ7sJEAO0yIkIh+kUqm51VJfI3DN/L1SAkRk0/Dw8NxCofDepIDEsXIXAB20bmfmk5pRbCJ3uru7p7a1temssY+I9Fhr1za639AiymD58uWdURS9FPdNxzPzvY0YT+bvvu9fTEQX6K7ZWqtzfs1kUJGTCEhsFZ3hr9Q0mEql9mvFV6ZqYOMAf0bTfhRFB+bzeV3GNaTEQOJqr7uuQwDczcw6ULWUtMOdPn368wD21lTOzFr1E1FiILFV9gLwLIAOrfrMfFUiKQkPVYY6APczs36PaehSE3atygXf9/XL0n3xLmohMz+cUM+6x7TRBNAP4NVUKjVvoq47IYtUNDHG/ASAVvp3oyhakMvldIHQNAVBcKpzbh0RvR9F0fxm+DUFJO6XdGBaBuDNcrm8oDJYTRSNMUZdSAcmRFF0XC6Xe2iiPPR8s0DQ39+fHhoauo+IvqmZrFQqHTXR74kKQkTuIKK0fhdl5rpDWD2ATQNRpvHH0rsBHCMib0dR9O18Pq+dakPKZDJ9nucN6tdh55wJwzDX8FKdA5MCEoPRzwi6pNPK/6GI9I5eZY6V3d/f723atOlSEdH/lND9cGYylmg6a1V7FFVuaGjoKiLa1pKLyA2lUum8sZvKnp6eXaZMmaLucwyA90RkibX2F5OxREuBVJhlMpkez/P0c4RuUjZEUeRXXC0IgmNFJAtgNxHRxZ7upnRebwlN2rXGatHX17d/KpVSVztAa42I3Bb3aJqd1FwPOOdOy+Vy+s8ALaOWAxkVNxdo9ddNZKztuxoX1loN8JbTRwKkoqUxZi8R0U5WnHPnh2H4j5YjiBn+DxTLpG8FcaEaAAAAAElFTkSuQmCC"
                  />
                  <div>
                    <p class="font-bold">Bảo vệ sản phẩm toàn diện với dịch vụ bảo hành mở rộng</p>
                    <p class="text-sm">
                      (Khách hàng đăng ký thông tin để được hỗ trợ tư vấn và thanh toán tại cửa hàng nhanh nhất, số tiền
                      phải thanh toán chưa bao gồm giá trị của gói bảo hành mở rộng)
                    </p>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4 md:flex-row lg:flex-row">
          <div class="flex-1 rounded-xl border p-4 shadow-xl">
            <div class="flex flex-col gap-4 rounded-xl">
              <span class="py-2 font-bold">Đánh giá & nhận xét {{ currentProduct.name }}</span>

              <div class="flex">
                <div class="flex flex-[0.7] items-center justify-center rounded-l-2xl border">
                  <div class="flex flex-col items-center">
                    <span class="flex justify-center text-2xl font-bold">5.0/5</span>
                    <div class="flex w-full justify-center">
                      <VIcon icon-class="text-yellow-600" icon="fa-star" />
                      <VIcon icon-class="text-yellow-600" icon="fa-star" />
                      <VIcon icon-class="text-yellow-600" icon="fa-star" />
                      <VIcon icon-class="text-yellow-600" icon="fa-star" />
                      <VIcon icon-class="text-yellow-600" icon="fa-star" />
                    </div>
                    <span class="flex justify-center"> <b>8 </b> đánh giá và nhận xét </span>
                  </div>
                </div>
                <div class="flex-1 rounded-r-2xl border p-2">
                  <div class="flex items-center">
                    <p class="flex-[0.2]">5 <VIcon icon-class="text-yellow-600" icon="fa-star" /></p>
                    <div class="h-2 w-full flex-1 rounded-lg bg-main"></div>
                    <p class="flex flex-[0.4] justify-center">8 đánh giá</p>
                  </div>
                  <div class="flex items-center">
                    <p class="flex-[0.2]">4 <VIcon icon-class="text-yellow-600" icon="fa-star" /></p>

                    <div class="h-2 w-full flex-1 rounded-lg bg-gray-200"></div>
                    <p class="flex flex-[0.4] justify-center">0 đánh giá</p>
                  </div>
                  <div class="flex items-center">
                    <p class="flex-[0.2]">3 <VIcon icon-class="text-yellow-600" icon="fa-star" /></p>

                    <div class="h-2 w-full flex-1 rounded-lg bg-gray-200"></div>
                    <p class="flex flex-[0.4] justify-center">0 đánh giá</p>
                  </div>
                  <div class="flex items-center">
                    <p class="flex-[0.2]">2 <VIcon icon-class="text-yellow-600" icon="fa-star" /></p>

                    <div class="h-2 w-full flex-1 rounded-lg bg-gray-200"></div>
                    <p class="flex flex-[0.4] justify-center">0 đánh giá</p>
                  </div>
                  <div class="flex items-center">
                    <p class="flex-[0.2]">1 <VIcon icon-class="text-yellow-600" icon="fa-star" /></p>

                    <div class="h-2 w-full flex-1 rounded-lg bg-gray-200"></div>
                    <p class="flex flex-[0.4] justify-center">0 đánh giá</p>
                  </div>
                </div>
              </div>

              <div class="flex justify-center">Bạn đánh giá sao sản phẩm này</div>

              <div class="flex justify-center">
                <VButton
                  label="Đánh giá ngay"
                  input-class="!h-[35px] border-none !bg-main text-white w-[300px] rounded-lg"
                />
              </div>

              <div class="flex h-auto max-h-[600px] flex-col gap-4 overflow-y-auto">
                <div class="flex-col">
                  <div class="flex justify-between">
                    <div class="flex gap-2">
                      <img class="h-5 w-5 bg-red-100" src="" alt="" />
                      <span class="font-bold">Ha Quoc</span>
                    </div>
                    <span class="text-xs font-bold text-gray-500">26/2/2023 09:25</span>
                  </div>
                  <div class="flex justify-end">
                    <div class="flex flex-1 flex-col gap-2 rounded-xl bg-[#f3f4f6] p-2">
                      <div class="flex">
                        <span class="text-sm font-bold">Đánh giá: </span>
                        <div class="flex items-center">
                          <VIcon icon-class="text-yellow-600" icon="fa-star" />
                          <VIcon icon-class="text-yellow-600" icon="fa-star" />
                          <VIcon icon-class="text-yellow-600" icon="fa-star" />
                          <VIcon icon-class="text-yellow-600" icon="fa-star" />
                          <VIcon icon-class="text-yellow-600" icon="fa-star" />
                        </div>
                      </div>
                      <p class="text-sm">
                        <span class="font-bold">Nhận xét:</span>
                        Laptop này có độ thêm được ram 16G ko hay chỉ ram 8G thôi ạ
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex-col">
                  <div class="flex justify-between">
                    <div class="flex gap-2">
                      <img class="h-5 w-5 bg-red-100" src="" alt="" />
                      <span class="font-bold">Ha Quoc</span>
                    </div>
                    <span class="text-xs font-bold text-gray-500">26/2/2023 09:25</span>
                  </div>
                  <div class="flex justify-end">
                    <div class="flex flex-1 flex-col gap-2 rounded-xl bg-[#f3f4f6] p-2">
                      <div class="flex">
                        <span class="text-sm font-bold">Đánh giá: </span>
                        <div class="flex items-center">
                          <VIcon icon-class="text-yellow-600" icon="fa-star" />
                          <VIcon icon-class="text-yellow-600" icon="fa-star" />
                          <VIcon icon-class="text-yellow-600" icon="fa-star" />
                          <VIcon icon-class="text-yellow-600" icon="fa-star" />
                          <VIcon icon-class="text-yellow-600" icon="fa-star" />
                        </div>
                      </div>
                      <p class="text-sm">
                        <span class="font-bold">Nhận xét:</span>
                        Laptop này có độ thêm được ram 16G ko hay chỉ ram 8G thôi ạ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex-[0.5] rounded-xl border shadow-xl">
              <div class="flex flex-col gap-2 p-4">
                <span class="font-bold">Thông số kỹ thuật</span>
                <div class="flex flex-col rounded-xl border">
                  <div class="flex justify-between bg-[#f2f2f2] p-2">
                    <p class="flex flex-1 items-center text-sm">Thông số kỹ thuật</p>
                    <p class="flex flex-1 items-center text-sm">Geforce GTX 1650 4GB</p>
                  </div>
                  <div class="flex justify-between p-2">
                    <p class="flex flex-1 items-center text-sm">Dung lượng RAM</p>
                    <p class="flex flex-1 items-center text-sm">8GB</p>
                  </div>
                  <div class="flex justify-between bg-[#f2f2f2] p-2">
                    <p class="flex flex-1 items-center text-sm">Loại RAM</p>
                    <p class="flex flex-1 items-center text-sm">DDR4 8GB (1 x 8GB) 3200MHz, up to 32GB</p>
                  </div>
                  <div class="flex justify-between p-2">
                    <p class="flex flex-1 items-center text-sm">Số khe ram</p>
                    <p class="flex flex-1 items-center text-sm">2 khe</p>
                  </div>
                  <div class="flex justify-between bg-[#f2f2f2] p-2">
                    <p class="flex flex-1 items-center text-sm">Ổ cứng</p>
                    <p class="flex flex-1 items-center text-sm">512GB SSD NVMe M.2 PCIe Gen 3 x 4</p>
                  </div>
                  <div class="flex justify-between p-2">
                    <p class="flex flex-1 items-center text-sm">Kích thước màn hình</p>
                    <p class="flex flex-1 items-center text-sm">15.6 inches</p>
                  </div>
                  <div class="flex justify-between bg-[#f2f2f2] p-2">
                    <p class="flex flex-1 items-center text-sm">Công nghệ màn hình</p>
                    <p class="flex flex-1 items-center text-sm">IPS Panel, 144Hz</p>
                  </div>
                  <div class="flex justify-between p-2">
                    <p class="flex flex-1 items-center text-sm">Hệ điều hành</p>
                    <p class="flex flex-1 items-center text-sm">Windows 11 SL 64 Bit</p>
                  </div>
                  <div class="flex justify-between bg-[#f2f2f2] p-2">
                    <p class="flex flex-1 items-center text-sm">Độ phân giải màn hình</p>
                    <p class="flex flex-1 items-center text-sm">1920 x 1080 pixels (FullHD)</p>
                  </div>
                  <div class="flex justify-between p-2">
                    <p class="flex flex-1 items-center text-sm">Cổng giao tiếp</p>
                    <p class="flex flex-1 items-center text-sm">
                      1x Type C USB 3.2 Gen <br />
                      1 (Power Delivery/Display Port) 3x USB 3.2 Gen <br />
                      1 Type-A 1x 3.5mm Combo Audio<br />
                      Jack 1x HDMI 2.0b
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="hidden flex-[0.3] lg:flex"></div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: Base
</route>
