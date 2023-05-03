<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { Products } from '~/home/dtos';

import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const { cart, currentProduct } = storeToRefs(userStore);

const router = useRouter();

const deliveryMode = ref('pickup');
const company = ref(false);
const step = ref(0);
const selectedPayment = ref(0);
const selectedName = ref('');
const selectedPhoneNo = ref(0);
const selectedEmail = ref('');

onMounted(() => {
  if (cart.value.length === 0) {
    router.push(`/`);
  }
  window.scrollTo(0, 0);
});

const styleSelectedPayment = computed(() => (index: number) => {
  if (selectedPayment.value === index) {
    return 'border-main border';
  }
  return '';
});

const totalCart = computed(() => {
  let total = 0;
  cart.value.forEach((element) => {
    total += Number(element.price * element.quality);
  });
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
});

async function goCart(go: string) {
  await router.push(`/${go}`);
}

function nextStep() {
  step.value++;
}

function choosePayment(index: number) {
  selectedPayment.value = index;
}
</script>

<template>
  <main class="flex">
    <div class="flex-1"></div>

    <div class="flex flex-1 flex-col py-4">
      <div class="flex flex-1 flex-col gap-12">
        <div class="flex">
          <span class="flex cursor-pointer items-start font-bold text-main" @click="goCart('cart')"
            ><VIcon size="text-[20px]" icon="fa-angle-left" /> Trở về
          </span>
          <span class="flex flex-1 justify-center text-xl font-bold text-main">
            <p class="-ml-16">Giỏ hàng</p>
          </span>
        </div>

        <div class="flex flex-col">
          <div class="-mb-2 flex h-24 rounded-t-xl bg-red-100/50">
            <div class="flex flex-1 items-center justify-center">
              <div class="flex-col">
                <div
                  class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-main text-lg text-main"
                >
                  <VIcon icon="fa-shopping-cart" />
                </div>
                <p class="text-xs text-main">Chọn sản phẩm</p>
              </div>
            </div>
            <div class="flex flex-[0.2] items-center text-main">-----</div>
            <div class="flex flex-1 items-center justify-center">
              <div class="flex-col">
                <div
                  class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-main text-lg text-main"
                >
                  <VIcon icon="fa-address-card" />
                </div>
                <p class="text-xs text-main">Thông tin đặt hàng</p>
              </div>
            </div>
            <div class="flex flex-[0.2] items-center" :class="step > 0 ? 'text-main' : ''">-----</div>
            <div class="flex flex-1 items-center justify-center">
              <div class="flex-col">
                <div
                  :class="step > 0 ? '!border-main !text-main' : ''"
                  class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-black/40 text-lg text-black/40"
                >
                  <VIcon icon="fa-credit-card-alt" />
                </div>
                <p :class="step > 0 ? 'text-main' : ''" class="text-xs">Thanh toán</p>
              </div>
            </div>
            <div class="flex flex-[0.2] items-center">-----</div>
            <div class="flex flex-1 items-center justify-center">
              <div class="flex-col">
                <div
                  class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-black/40 text-lg text-black/40"
                >
                  <VIcon icon="fa-archive" />
                </div>
                <p class="text-xs">Hoàn tất đặt hàng</p>
              </div>
            </div>
          </div>

          <div v-if="step === 0" class="z-1 flex flex-col gap-3 rounded-2xl border bg-white p-2 shadow-xl">
            <VTitle title="Thông tin khách hàng" />
            <VInput placeholder="Họ và tên(bắc buộc)" input-class="rounded-lg !h-10" />
            <VInput placeholder="Số điện thoại(bắt buộc)" input-class="rounded-lg !h-10" />
            <VInput placeholder="Email (Vui lòng điền email để nhận hóa đơn VAT)" input-class="rounded-lg !h-10" />
            <VTitle title="Chọn cách thức giao hàng" />
            <form class="flex items-center gap-2">
              <input
                id="pickup"
                v-model="deliveryMode"
                :checked="true"
                name="deliveryMode"
                class="text-main"
                type="radio"
                value="pickup"
              /><label for="pickup">Nhận tại cửa hàng </label>

              <input
                id="delivery"
                v-model="deliveryMode"
                name="deliveryMode"
                class="text-main"
                type="radio"
                value="delivery"
              /><label for="delivery">Giao hàng tận nơi </label>
            </form>
            <div class="flex flex-col gap-2 rounded-lg bg-gray-200/70 p-3">
              <div class="flex gap-2">
                <div class="flex-1">
                  <VSelect input-class="rounded-xl" placeholder="Thành phố/Tỉnh" size="large" />
                </div>
                <div class="flex-1">
                  <VSelect input-class="rounded-xl" placeholder="Quận/Huyện" size="large" />
                </div>
              </div>
              <div class="flex-1">
                <VSelect
                  v-if="deliveryMode === 'pickup'"
                  input-class="rounded-xl"
                  placeholder="Chọn địa chỉ cửa hàng"
                  size="large"
                />
                <VInput v-else input-class="rounded-xl !h-11" size="large" placeholder="Số nhà,tên đường" />
              </div>
            </div>
            <VInput placeholder="Yêu cầu khác" input-class="rounded-lg !h-10" />
            <div class="flex items-center gap-2">
              <input id="company" v-model="company" class="text-main" type="checkbox" />
              <label class="cursor-pointer" for="company">
                Yêu cầu xuất hóa đơn công ty (Vui lòng điền email để nhận hoá đơn VAT)</label
              >
            </div>
            <p class="italic text-main/70">
              (Với đơn hàng trên 20 triệu vui lòng thanh toán chuyển khoản từ tài khoản công ty khi cần xuất VAT cho
              công ty)
            </p>
            <VInput v-if="company" placeholder="Tên công ty" input-class="rounded-lg !h-10" />
            <VInput v-if="company" placeholder="Địa chỉ công ty" input-class="rounded-lg !h-10" />
            <VInput v-if="company" placeholder="Mã số thuế" input-class="rounded-lg !h-10" />
          </div>
          <div v-if="step >= 1" class="z-1 flex flex-col gap-3 rounded-2xl border bg-white p-2 shadow-xl">
            <div class="flex flex-col gap-3 rounded-2xl border p-3 shadow-xl">
              <div class="flex justify-center">
                <VTitle title="THÔNG TIN ĐẶT HÀNG" />
              </div>
              <div class="flex gap-3">
                <VTitle title="Mã Đơn Hàng: " />
                <p>WN0301052629</p>
              </div>
              <div class="flex gap-3">
                <VTitle title="Người Đặt: " />
                <p>Phuc Do</p>
              </div>
              <div class="flex gap-3">
                <VTitle title="Số Điện Thoại: " />
                <p>0327200651</p>
              </div>
              <div class="flex gap-3">
                <VTitle title="Email: " />
                <p>phucdongoc1c@gmail.com</p>
              </div>
              <div class="flex gap-3">
                <p>
                  <span class="font-bold">Nhận Sản Phẩm Tại: </span>139 Trần Não, Ấp Bình Khánh 3, Phường Bình An, Quận
                  2, Quận 2, Hồ Chí Minh
                </p>
              </div>
              <div class="flex gap-3">
                <VTitle title="Tổng Tiền: " />
                <p class="font-bold text-main">{{ totalCart }}</p>
              </div>
            </div>

            <div class="flex p-4">
              <VTitle title="Chọn hình thức thanh toán" />
            </div>

            <div class="flex flex-col gap-3">
              <div class="flex gap-2">
                <div
                  class="flex flex-1 cursor-pointer justify-center rounded-xl border p-4 shadow-lg"
                  :class="styleSelectedPayment(1)"
                  @click="choosePayment(1)"
                >
                  <div class="flex-col">
                    <span class="text-xs font-bold">Thanh toán tại cửa hàng</span>
                    <img class="mx-auto" src="" alt="" />
                  </div>
                </div>
                <div
                  class="flex flex-1 cursor-pointer justify-center rounded-xl border p-4 shadow-lg"
                  :class="styleSelectedPayment(2)"
                  @click="choosePayment(2)"
                >
                  <div class="flex-col">
                    <span class="text-xs font-bold">Thanh toán chuyển khoản</span>
                    <img class="mx-auto" src="" alt="" />
                  </div>
                </div>
              </div>

              <div class="flex gap-2">
                <div
                  class="flex flex-1 cursor-pointer justify-center rounded-xl border p-4 shadow-lg"
                  :class="styleSelectedPayment(3)"
                  @click="choosePayment(3)"
                >
                  <div class="flex-col">
                    <span class="text-xs font-bold">Thanh toán tại cửa hàng</span>
                    <img class="mx-auto" src="" alt="" />
                  </div>
                </div>
                <div
                  class="flex flex-1 cursor-pointer justify-center rounded-xl border p-4 shadow-lg"
                  :class="styleSelectedPayment(4)"
                  @click="choosePayment(4)"
                >
                  <div class="flex-col">
                    <span class="text-xs font-bold">Thanh toán chuyển khoản</span>
                    <img class="mx-auto" src="" alt="" />
                  </div>
                </div>
              </div>

              <div class="flex gap-2">
                <div
                  class="flex flex-1 cursor-pointer justify-center rounded-xl border p-4 shadow-lg"
                  :class="styleSelectedPayment(5)"
                  @click="choosePayment(5)"
                >
                  <div class="flex-col">
                    <span class="text-xs font-bold">Thanh toán tại cửa hàng</span>
                    <img class="mx-auto" src="" alt="" />
                  </div>
                </div>
                <div
                  class="flex flex-1 cursor-pointer justify-center rounded-xl border p-4 shadow-lg"
                  :class="styleSelectedPayment(6)"
                  @click="choosePayment(6)"
                >
                  <div class="flex-col">
                    <span class="text-xs font-bold">Thanh toán chuyển khoản</span>
                    <img class="mx-auto" src="" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center gap-4 rounded-lg border p-2 shadow-lg">
          <div class="flex flex-1 justify-between">
            <span class="font-bold">Tổng tiền tạm tính:</span>
            <span class="font-bold text-main">{{ totalCart }} </span>
          </div>
          <VButton
            input-class="!h-16 w-full !bg-main border-none rounded text-[16px] !font-bold"
            label="TIẾP TỤC"
            @click="nextStep"
          />
          <VButton
            variant="outlined"
            input-class="!h-16 w-full !border-main !text-main rounded hover:!bg-main/70 hover:!text-white !text-[16px] !font-bold active:bg-main/70"
            label="CHỌN THÊM SẢN PHẨM KHÁC"
            @click="goCart('')"
          />
        </div>
      </div>
    </div>

    <div class="flex-1"></div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: Base
</route>
