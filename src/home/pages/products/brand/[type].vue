<script setup lang="ts">
import 'vue3-toastify/dist/index.css';
import '@vueform/slider/themes/default.css';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import Slider from '@vueform/slider';
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

const range = ref([0, 50000000]);
const filterRange = ref(false);
const searchKey = ref(false);
const data = ref<Products[]>([]);
const dataAll = ref<Products[]>([]);
const selectedSort = ref('');
const loading = ref(false);

onMounted(async () => {
  data.value = [];
  await getData();
  data.value = dataAll.value;
  data.value.forEach((e) => {
    e.price = e.priceRRP - e.priceRRP * (e.discount / 100);
    function countRate() {
      let total = 0;
      let length = 0;
      length = e.rate.length;
      e.rate.forEach((e: { value: number }) => {
        total += e.value / length;
      });
      return total;
    }
    e.averageRate = countRate();
  });
  if (route.query.selloff) {
    data.value.sort((a, b) => b.discount - a.discount);
    selectedSort.value = 'discount';
  }
  if (route.params.type === 'all') {
    data.value = dataAll.value;
  } else {
    data.value = dataAll.value.filter((e) => e.type === route.params.type);
  }
  window.scrollTo(0, 0);
});
watchEffect(async () => {
  if (route.params.type) {
    if (route.params.type === 'all') {
      data.value = dataAll.value;
    } else {
      data.value = dataAll.value.filter((e) => e.type === route.params.type);
    }
  }
  if (route.query.selloff) {
    selectedSort.value = 'discount';
  }
});
watch(
  () => route.query.search,
  async () => {
    if (route.query.search) {
      loading.value = true;
      setTimeout(async () => {
        await getDataSearch();
      }, 500);
      setTimeout(() => {
        searchKey.value = true;
        loading.value = true;
      }, 600);
    } else {
      data.value = dataAll.value;
      searchKey.value = false;
    }
  },
  { immediate: true, deep: true }
);
async function getDataSearch() {
  let result = [] as Products[];
  if (route.query.search) {
    result = (await store.getSearchProducts(route.query.search.toString())) as Products[];
  }
  result.forEach((e) => {
    e.price = e.priceRRP - e.priceRRP * (e.discount / 100);
    const countRate = computed(() => {
      let total = 0;
      let length = 0;
      length = Number(e.rate.length);
      e.rate.forEach((e: { value: number }) => (total = (total + e.value) / length));
      return total;
    });
    e.averageRate = countRate.value;
  });
  data.value = result;
}
const formatVND = computed(() => (slide: Products) => {
  let result = {
    price: '',
    priceRRP: '',
  };
  result.price = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(slide.price);
  result.priceRRP = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(slide.priceRRP);

  return result;
});
const formatRange = computed(() => (slide: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(slide);
});
async function getData() {
  loading.value = false;
  const result = (await store.getData()) as Products[];
  result.forEach((e) => {
    e.price = e.priceRRP - e.priceRRP * (e.discount / 100);
    function countRate() {
      let total = 0;
      let length = 0;
      length = e.rate.length;
      e.rate.forEach((e: { value: number }) => {
        total += e.value / length;
      });
      return total;
    }
    e.averageRate = countRate();
  });
  dataAll.value = result;
  loading.value = true;
}
function notifySignUp(error?: string) {
  if (error !== '') {
    toast(`${error}`, {});
  }
}
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
function filterPriceRange() {
  const rs = data.value.filter((e) => e.price >= range.value[0] && e.price < range.value[1]);
  data.value = [];
  data.value = rs;
  filterRange.value = true;
}
function unFilterPrice() {
  data.value = dataAll.value;
  if (route.params.type === 'all') {
    data.value = dataAll.value;
  } else if (route.params.type === 'search') {
    getDataSearch();
  } else {
    data.value = dataAll.value.filter((e) => e.type === route.params.type);
  }
  filterRange.value = false;
  range.value[0] = 0;
  range.value[1] = 50000000;
  selectedSort.value = '';
}
function addToFav() {
  console.log('add fav');
}
const buttonList = [
  { title: 'Apple' },
  { title: 'Samsung' },
  { title: 'Tablet' },
  { title: 'Accessory' },
] as Products[];
</script>

<template>
  <div class="flex !border-none p-2">
    <div class="hidden h-40 lg:flex lg:flex-1"></div>
    <main v-if="loading" class="flex flex-[3] flex-col gap-4">
      <div class="flex flex-col gap-2 py-4 md:flex-row">
        <div class="flex-1">
          <img
            src="https://cdn2.cellphones.com.vn/595x,webp,q80/https://dashboard.cellphones.com.vn/storage/galaxy-tab-s8-cate-th5.png"
            alt=""
          />
        </div>
        <div class="flex-1">
          <img
            src="https://cdn2.cellphones.com.vn/595x,webp,q80/https://dashboard.cellphones.com.vn/storage/seagame-banner-cate.png"
            alt=""
          />
        </div>
      </div>

      <VTitle title="Chọn theo tiêu chí" />

      <div class="flex gap-4">
        <div
          v-for="item in buttonList"
          :key="item.title"
          class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs"
          :class="route.params.type === `${item.title.toLowerCase()}` ? 'border-main bg-[#fef2f2] text-main' : ''"
          @click="router.push(`/products/brand/${item.title.toLowerCase()}`), unFilterPrice()"
        >
          <VIcon :icon="item.title === 'Apple' ? 'fa-apple' : 'fa-tablet'" />
          {{ item.title }}
        </div>

        <div class="flex">
          <Popover v-slot="{ open: openPrice }" class="relative !ring-0">
            <PopoverButton
              :class="openPrice ? 'border-main bg-[#fef2f2] text-main' : ''"
              class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs !ring-0 focus-visible:!ring-0"
            >
              <span> <VIcon icon="fa-money" /> Giá </span>
            </PopoverButton>

            <transition
              enter-active-class="transition duration-200 ease-out ring-0"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel
                class="absolute left-1/2 z-10 mt-3 w-[300px] -translate-x-1/2 transform rounded-lg border bg-gray-100 p-4"
              >
                <div class="flex flex-col gap-4">
                  <div class="flex flex-1 justify-between pb-6">
                    <span class="text-md font-bold text-main">
                      {{
                        new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(range[0])
                      }}
                    </span>
                    <span class="text-md font-bold text-main">
                      {{
                        new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(range[1])
                      }}
                    </span>
                  </div>
                  <Slider
                    v-model="range"
                    class="[&_.slider-connect]:!bg-main [&_.slider-tooltip]:!border-0 [&_.slider-tooltip]:!bg-main"
                    :min="0"
                    :max="5000 * 100 * 100"
                    :format="formatRange"
                  />
                  <div class="flex flex-1 justify-between gap-2">
                    <div class="flex-1">
                      <PopoverButton class="h-8 !w-full rounded border border-main text-main hover:bg-main/20"
                        >Đóng
                      </PopoverButton>
                    </div>
                    <div class="flex-1">
                      <PopoverButton class="h-8 !w-full rounded bg-main text-white" @click="filterPriceRange"
                        >Xem kết quả
                      </PopoverButton>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
        </div>

        <div v-if="searchKey" class="cursor-pointer rounded-xl border border-main bg-[#fef2f2] p-2 text-xs text-main">
          <VIcon icon="fa-sort-amount-desc" />
          {{ `Search : ${route.query.search}` }}
        </div>

        <div
          class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs"
          :class="route.params.type === 'all' ? 'border-main bg-[#fef2f2] text-main' : ''"
          @click="router.push(`/products/brand/all`), unFilterPrice()"
        >
          <VIcon icon="fa-align-justify" />
          Tất cả
        </div>
      </div>

      <template v-if="filterRange">
        <VTitle title="Đang lọc theo" />

        <div class="flex gap-4">
          <div class="cursor-pointer rounded-xl border border-main bg-[#fef2f2] p-2 text-xs text-main">
            <VIcon v-if="filterRange" icon="fa-sort-amount-desc" />
            Giá từ
            {{
              new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(range[0])
            }}
            -
            {{
              new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(range[1])
            }}
          </div>

          <div
            class="cursor-pointer rounded-xl border border-main bg-[#fef2f2] p-2 text-xs text-main"
            @click="unFilterPrice"
          >
            × Bỏ chọn tất cả
          </div>
        </div>
      </template>

      <VTitle title="Sắp xếp theo" />

      <div class="flex gap-4">
        <div
          class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs"
          :class="selectedSort === 'highToLow' ? 'border-main bg-[#fef2f2] text-main' : ''"
          @click="sortPrice('highToLow')"
        >
          <VIcon icon="fa-sort-amount-desc" />
          Giá Cao - Thấp
        </div>
        <div
          class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs"
          :class="selectedSort === 'lowToHigh' ? 'border-main bg-[#fef2f2] text-main' : ''"
          @click="sortPrice('lowToHigh')"
        >
          <VIcon icon="fa-sort-amount-asc" />
          Giá Thấp - Cao
        </div>
        <div
          class="cursor-pointer rounded-xl border bg-[#f3f4f6] p-2 text-xs"
          :class="selectedSort === 'discount' ? 'border-main bg-[#fef2f2] text-main' : ''"
          @click="sortPrice('discount')"
        >
          <VIcon icon="fa-strikethrough" />
          Khuyến Mãi Hot
        </div>
      </div>

      <div class="flex flex-wrap justify-start gap-4">
        <div
          v-for="(item, index) in data"
          :key="index"
          class="mx-auto flex w-full basis-[100%] flex-col gap-4 rounded-xl border border-slate-200 p-2 shadow-lg md:basis-[46%] lg:basis-[21%]"
        >
          <div class="flex w-full justify-end">
            <span class="vc py-1 text-xs font-semibold before:hidden after:hidden before:md:block after:md:block"
              >Giảm {{ item.discount + '%' }}</span
            >
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

          <div class="flex items-center">
            <VIcon :icon-class="item.averageRate > 0 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
            <VIcon :icon-class="item.averageRate > 1 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
            <VIcon :icon-class="item.averageRate > 2 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
            <VIcon :icon-class="item.averageRate > 3 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
            <VIcon :icon-class="item.averageRate > 4 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
          </div>

          <div class="hidden h-[20px] flex-1 cursor-pointer items-center justify-end gap-2 md:flex" @click="addToFav">
            <p class="text-xs text-gray-500">Yêu Thích</p>
            <VIcon :icon="1 ? 'fa-heart' : 'fa-heart-o'" :icon-class="1 ? '!text-red-500' : '!text-black-500'" />
          </div>
        </div>
        <div v-if="data.length === 0 && searchKey" class="flex w-full flex-col items-center justify-center gap-2 py-8">
          <VIcon size="text-4xl" icon="fa-meh-o"></VIcon>
          <span class="font-bold"> Không tìm thấy sản phẩm phù hợp</span>
        </div>
      </div>
    </main>
    <div v-else class="flex h-[500px] w-full flex-col items-center justify-center">
      <VSpinner size="large" />
      <p class="text-center">
        Nếu thời gian tải dữ liệu quá lâu vui lòng quay trở về
        <a class="text-main" href="/">trang chủ</a>
      </p>
    </div>
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
