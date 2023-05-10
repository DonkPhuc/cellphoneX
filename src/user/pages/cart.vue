<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { Products } from '~/home/dtos';
import { useStore } from '~/home/stores/Store';
import { Customers } from '~/user/dtos/Customers.dto';

import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const store = useStore();
const { currentProduct, isLoginSuccess } = storeToRefs(userStore);

const router = useRouter();
const cart = ref<Products[]>([]);

watchEffect(() => {
  if (isLoginSuccess.value === '') {
    goHome();
  }
});

onMounted(async () => {
  const result = (await userStore.getCustomer(isLoginSuccess.value)) as Customers[];
  if (result[0]) {
    cart.value = result[0].cart;
    cart.value.forEach((e) => {
      e.price = e.priceRRP - e.priceRRP * (e.discount / 100);
    });
  }
  window.scrollTo(0, 0);
});

async function goHome() {
  await router.push('/');
}

async function goPayment() {
  await router.push('/payment');
}

const formatVND = computed(() => (slide: Products) => {
  let result = {
    price: '',
    priceRRP: '',
  };
  result.price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
    slide.price * slide.quantity
  );
  result.priceRRP = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
    slide.priceRRP * slide.quantity
  );

  return result;
});

const totalCart = computed(() => {
  let total = 0;
  cart.value.forEach((e: Products) => {
    total += Number(e.price * e.quantity);
  });
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
});

function plusQuality(index: number) {
  cart.value[index].quantity++;
  console.log(cart.value);
}
function minusQuality(index: number) {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--;
  }
}
async function remove(id: string) {
  await store.postRemoveCart(isLoginSuccess.value, id);
  const result = (await userStore.getCustomer(isLoginSuccess.value)) as Customers[];
  if (result[0]) {
    cart.value = result[0].cart;
    cart.value.forEach((e) => {
      e.price = e.priceRRP - e.priceRRP * (e.discount / 100);
    });
  }
}

async function go(getId: string) {
  // let result = cart.value.find(({ _id }) => _id === getId);
  let result = '';
  currentProduct.value = [];
  if (result) {
    // currentProduct.value.push(result);
  }
  if (getId === '/') {
    await goHome();
  } else {
    await router.push(`products/detail`);
  }
}
</script>

<template>
  <main class="flex">
    <div class="hidden flex-1 lg:flex"></div>

    <div v-if="cart[0] && !cart[0]._id" class="flex flex-1 flex-col py-4">
      <div class="flex flex-1 flex-col gap-12">
        <div class="flex">
          <span class="flex cursor-pointer items-start font-bold text-main" @click="go('/')"
            ><VIcon size="text-[20px]" icon="fa-angle-left" /> Trở về
          </span>
          <span class="flex flex-1 justify-center text-xl font-bold text-main"> <p class="-ml-16">Giỏ hàng</p> </span>
        </div>

        <div class="flex justify-center pt-20">
          <VIcon size="text-[80px]" icon="fa-smile-o" />
        </div>

        <div class="flex justify-center">
          <p class="text-xl">Không có sản phẩm nào trong giỏ hàng, vui lòng quay lại</p>
        </div>

        <div class="flex justify-center">
          <VButton
            input-class="!h-10 w-44 !bg-main border-none rounded-lg"
            label="Quay lại trang chủ"
            @click="goHome"
          />
        </div>
      </div>
    </div>

    <div v-else class="flex flex-1 flex-col py-4">
      <div class="flex flex-1 flex-col gap-12">
        <div class="flex">
          <span class="flex cursor-pointer items-start font-bold text-main" @click="go('/')"
            ><VIcon size="text-[20px]" icon="fa-angle-left" /> Trở về
          </span>
          <span class="flex flex-1 justify-center text-xl font-bold text-main"> <p class="-ml-16">Giỏ hàng</p> </span>
        </div>

        <div v-for="(item, index) in cart" :key="index" class="flex max-h-[400px] flex-col overflow-y-auto">
          <div class="flex gap-8 border-b-2 p-4">
            <img class="h-32 w-32" :src="item.imageLink" alt="" />
            <div class="flex flex-1 flex-col gap-2">
              <div class="flex justify-between">
                <p class="cursor-pointer font-bold hover:underline" @click="go(item._id)">
                  {{ item.name }}
                </p>
                <div class="cursor-pointer" @click="remove(item._id)">
                  <VIcon icon="fa-times" />
                </div>
              </div>

              <div class="flex justify-between">
                <p class="font-bold text-main">
                  {{ formatVND(cart[index]).price }}
                  <span class="text-xs text-gray-500 line-through"> {{ formatVND(cart[index]).priceRRP }} </span>
                </p>
                <div class="flex items-center rounded-xl border bg-[#f4f4f4]">
                  <div class="cursor-pointer" @click="minusQuality(index)">
                    <VIcon icon="fa-minus" />
                  </div>
                  <p class="px-3 text-xs">{{ item.quantity }}</p>
                  <div class="cursor-pointer" @click="plusQuality(index)">
                    <VIcon icon="fa-plus" />
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
            label="TIẾN HÀNH ĐẶT HÀNG"
            @click="goPayment"
          />

          <VButton
            variant="outlined"
            input-class="!h-16 w-full !border-main !text-main rounded hover:!bg-main/70 hover:!text-white !text-[16px] !font-bold active:bg-main/70"
            label="CHỌN THÊM SẢN PHẨM KHÁC"
            @click="goHome"
          />
        </div>
      </div>
    </div>

    <div class="hidden flex-1 lg:flex"></div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: Base
</route>
