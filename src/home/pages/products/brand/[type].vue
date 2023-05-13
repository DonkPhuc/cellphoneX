<script setup lang="ts">
import 'vue3-toastify/dist/index.css';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';

import { Products } from '~/home/dtos';
import { useStore } from '~/home/stores/Store';
import { useUserStore } from '~/user/stores/user';
const userStore = useUserStore();
const store = useStore();
const { isLoginSuccess } = storeToRefs(userStore);
const { data: dataAll } = storeToRefs(store);

const router = useRouter();
const route = useRoute();

const range = ref(0);
const data = ref<Products[]>([]);

watchEffect(() => {
  if (route.params.type) {
    if (route.params.type === 'all') {
      data.value = dataAll.value;
    } else {
      data.value = dataAll.value.filter((e) => e.type === route.params.type);
    }
  }
});

onMounted(() => {
  if (route.params.type === 'all') {
    data.value = dataAll.value;
  } else {
    data.value = dataAll.value.filter((e) => e.type === route.params.type);
  }
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

const notifySignUp = (error?: string) => {
  if (error !== '') {
    toast(`${error}`, {});
  }
};
const selectedSort = ref('');
function sortPrice(type: string) {
  if (type === 'lowToHigh') {
    data.value.sort((a, b) => a.price - b.price);
    selectedSort.value = 'lowToHigh';
  }
  if (type === 'highToLow') {
    data.value.sort((a, b) => b.price - a.price);
    selectedSort.value = 'highToLow';
  }
  if (type === 'discount') {
    data.value.sort((a, b) => b.discount - a.discount);
    selectedSort.value = 'discount';
  }
}
</script>

<template>
  <div class="flex p-2">
    <div class="hidden h-40 lg:flex lg:flex-1"></div>
    <main class="flex flex-[3] flex-col gap-4">
      <div class="flex flex-col gap-2 py-4 md:flex-row">
        <div class="flex-1 bg-red-200">
          <img
            src="https://cdn2.cellphones.com.vn/595x,webp,q80/https://dashboard.cellphones.com.vn/storage/galaxy-tab-s8-cate-th5.png"
            alt=""
          />
        </div>
        <div class="flex-1 bg-red-200">
          <img
            src="https://cdn2.cellphones.com.vn/595x,webp,q80/https://dashboard.cellphones.com.vn/storage/seagame-banner-cate.png"
            alt=""
          />
        </div>
      </div>

      <VTitle title="Chọn theo tiêu chí" />

      <div class="flex gap-4">
        <div
          class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs"
          :class="route.params.type === 'apple' ? 'border-main' : ''"
          @click="router.push(`/products/brand/apple`)"
        >
          Apple
        </div>
        <div
          class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs"
          :class="route.params.type === 'samsung' ? 'border-main' : ''"
          @click="router.push(`/products/brand/samsung`)"
        >
          Samsung
        </div>
        <div class="flex">
          <Popover v-slot="{ open: openPrice }" class="relative">
            <PopoverButton
              :class="openPrice ? '' : 'text-opacity-90'"
              class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs ring-0"
            >
              <span>Giá</span>
            </PopoverButton>

            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel class="absolute left-1/2 z-10 mt-3 w-[320px] -translate-x-1/2 transform bg-gray-100 p-4">
                <div class="flex flex-1 justify-between">
                  <span>{{ range }}đ </span> <span> 100.000.000đ </span>
                </div>
                <input v-model="range" type="range" :max="1000 * 100 * 100" class="my-4 w-full !text-main" />
                <div class="flex flex-1 justify-between gap-2">
                  <div class="flex-1">
                    <PopoverButton class="h-8 !w-full rounded border border-main text-main hover:bg-main/20"
                      >Đóng</PopoverButton
                    >
                  </div>
                  <div class="flex-1">
                    <VButton class="!w-full" label="Xem kết quả" />
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </div>
        <div
          class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs"
          :class="route.params.type === 'all' ? 'border-main' : ''"
          @click="router.push(`/products/brand/all`)"
        >
          Tất cả
        </div>
      </div>

      <VTitle title="Sắp xếp theo" />

      <div class="flex gap-4">
        <div
          class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs"
          :class="selectedSort === 'highToLow' ? 'border-main bg-[#fef2f2] text-main' : ''"
          @click="sortPrice('highToLow')"
        >
          Giá Cao - Thấp
        </div>
        <div
          class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs"
          :class="selectedSort === 'lowToHigh' ? 'border-main bg-[#fef2f2] text-main' : ''"
          @click="sortPrice('lowToHigh')"
        >
          Giá Thấp - Cao
        </div>
        <div
          class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs"
          :class="selectedSort === 'discount' ? 'border-main bg-[#fef2f2] text-main' : ''"
          @click="sortPrice('discount')"
        >
          Khuyến Mãi Hot
        </div>
      </div>

      <div class="flex flex-wrap justify-start gap-4">
        <div
          v-for="item in data"
          :key="item._id"
          class="mx-auto flex w-full basis-[100%] flex-col gap-4 rounded-xl border border-slate-200 p-2 shadow-lg md:basis-[46%] lg:basis-[21%]"
        >
          <div class="flex w-full justify-end">
            <span class="vc">{{ item.discount + '%' }}</span>
          </div>
          <img
            class="mx-auto h-[180px] w-[180px] cursor-pointer"
            :src="item.imageLink"
            alt=""
            @click="router.push(`/products/${item._id}`)"
          />
          <p
            class="h-14 cursor-pointer text-justify text-sm font-bold md:flex"
            @click="router.push(`/products/${item._id}`)"
          >
            {{ item.name }}
          </p>

          <div class="gap-2 md:flex">
            <p class="font-bold text-red-500">{{ formatVND(item).price }}</p>
            <p class="flex items-center text-[14px] font-semibold text-gray-500 line-through">
              {{ formatVND(item).priceRRP }}
            </p>
          </div>

          <div class="w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-xs md:flex">
            {{ item.description }}
          </div>

          <div class="w-full justify-start md:flex">
            <VIcon icon-class="text-yellow-600" icon="fa-star" />
            <VIcon icon-class="text-yellow-600" icon="fa-star" />
            <VIcon icon-class="text-yellow-600" icon="fa-star" />
            <VIcon icon-class="text-yellow-600" icon="fa-star" />
            <VIcon icon-class="text-yellow-600" icon="fa-star" />
          </div>

          <div class="hidden h-[20px] flex-1 items-center justify-end gap-2 md:flex">
            <p class="text-xs text-gray-500">Yêu Thích</p>
            <VIcon
              :icon="item.favorite ? 'fa-heart' : 'fa-heart-o'"
              :icon-class="item.favorite ? '!text-red-500' : '!text-black-500'"
            />
          </div>
        </div>
      </div>
    </main>
    <div class="hidden h-40 lg:flex lg:flex-1"></div>
  </div>
</template>

<style scoped>
.vc {
  right: -10px;
  background: #ff0045;
  border-radius: 30px 0 0 30px;
  color: #fff;
  width: 80px;
  text-align: center;
  position: relative;
  border-right: 1px dashed #fff;
}
.vc:after {
  width: 0;
  height: 0;
  border: 12.5px solid transparent;
  position: absolute;
  content: '';
  border-top-color: #ff0045;
  right: -26px;
  top: 0px;
  border-left-color: #ff0045;
}
.vc:before {
  width: 0;
  height: 0;
  border: 13px solid transparent;
  position: absolute;
  content: '';
  border-bottom-color: #ff0045;
  right: -25px;
  top: 2px;
}
</style>

<route lang="yaml">
meta:
  layout: Base
</route>
