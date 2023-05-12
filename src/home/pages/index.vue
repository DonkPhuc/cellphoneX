<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useStore } from '~/home/stores/Store';
import { useUserStore } from '~/user/stores/user';

import { Products } from '../dtos';
const userStore = useUserStore();
const store = useStore();

const router = useRouter();

const itemList = ref<Products[]>([]);
const phoneList = ref<Products[]>([]);
const laptopList = ref<Products[]>([]);

onMounted(() => {
  getData();
  window.scrollTo(0, 0);
});

async function getData() {
  const result = (await store.getData()) as Products[];
  result.forEach((e) => {
    e.price = e.priceRRP - e.priceRRP * (e.discount / 100);
  });
  itemList.value = result;
  phoneList.value = itemList.value.filter((e) => e.type === 'apple');
  laptopList.value = itemList.value.filter((e) => e.type === 'samsung');
}

const listFeature = [
  {
    imageLink:
      'https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/s20-fe-right-th555.jpg',
  },
  {
    imageLink:
      'https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/right-banner-th5-newww1.jpg',
  },
  {
    imageLink:
      'https://cdn2.cellphones.com.vn/690x300,webp,q10/https://dashboard.cellphones.com.vn/storage/right-banner-ideapad-3.jpg',
  },
] as Products[];
const listCarousel = [
  {
    imageLink:
      'https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/s23-ultra-sliding-th5.png',
    title: 'Mừng Khai Trương',
    description: 'giảm đến 70%',
  },
  {
    imageLink:
      'https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/apple%20watch%20sliding.png',
    title: 'IPhone 14 Pro',
    description: 'giá tốt bất ngờ',
  },
  {
    imageLink:
      'https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/seagames-tv-toshiba.png',
    title: 'Redmi Note 12',
    description: 'mở bán giá tốt',
  },
  {
    imageLink:
      'https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/redmi-note12-sliding-0805.jpg',
    title: 'Redmi Note 123',
    description: 'mở bán giá tốt',
  },
  {
    imageLink:
      'https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/s23-ultra-sliding-th5.png',
    title: 'Redmi Note 124',
    description: 'mở bán giá tốt',
  },
] as Products[];
const buttonList = [
  {
    title: 'Apple',
  },
  {
    title: 'Samsung',
  },
] as Products[];
const menuList = [
  {
    title: 'Điện Thoại',
    imageLink: 'https://cellphones.com.vn/media/icons/menu/icon-cps-3.svg',
  },
  {
    title: 'Laptop',
    imageLink: 'https://cdn2.cellphones.com.vn/x/media/icons/menu/icon-cps-380.svg',
  },
  {
    title: 'Máy Tính Bảng',
    imageLink: 'https://cellphones.com.vn/media/icons/menu/icon-cps-4.svg',
  },
  {
    title: 'Âm Thanh',
    imageLink: 'https://cellphones.com.vn/media/icons/menu/icon-cps-220.svg',
  },
  {
    title: 'Đồng Hồ',
    imageLink: 'https://cellphones.com.vn/media/icons/menu/icon-cps-845.svg',
  },
  {
    title: 'Phụ Kiện',
    imageLink: 'https://cellphones.com.vn/media/icons/menu/icon-cps-30.svg',
  },
  {
    title: 'PC,Màn Hình',
    imageLink: 'https://cdn2.cellphones.com.vn/x/media/icons/menu/icon_cpu.svg',
  },
  {
    title: 'Tivi',
    imageLink: 'https://cellphones.com.vn/media/icons/menu/icon-cps-1124.svg',
  },
  {
    title: 'Khuyến Mãi',
    imageLink: 'https://cellphones.com.vn/media/icons/menu/icon-cps-tech.svg',
  },
] as Products[];

function eventMenu(title: string) {
  console.log(title);
}

async function goDetail(index: number, id: string) {
  console.log('🚀 ~ file: index.vue:136 ~ goDetail ~ id: string:', id);
  const currentRoute = router.currentRoute.value.fullPath;
  await router.push(`products/${id}`);
  if (currentRoute === id) {
    router.go(0);
  }
}
</script>

<template>
  <main class="mx-auto flex px-2">
    <div class="hidden lg:flex lg:flex-[0.3]"></div>

    <div class="flex flex-1">
      <div class="flex flex-col gap-4 pt-4">
        <div class="flex h-[376px] w-full gap-4">
          <div class="hidden flex-[0.35] flex-col rounded-xl border shadow-xl lg:flex">
            <VMenuList :data="menuList" @event-menu="eventMenu" />
          </div>

          <div class="flex-1 rounded-xl border shadow-xl">
            <VProductsList :data-carousel="listCarousel" type="carousel" />
          </div>

          <div class="hidden flex-[0.5] lg:flex">
            <div class="flex h-full flex-1 flex-col gap-4">
              <div v-for="item in listFeature" :key="item.imageLink" class="flex-1 rounded-xl border shadow-xl">
                <img class="h-[114px] w-full rounded-xl" :src="item.imageLink" />
              </div>
            </div>
          </div>
        </div>

        <div class="flex h-[75px]">
          <img
            src="https://cdn2.cellphones.com.vn/1200x75,webp,q100/https://dashboard.cellphones.com.vn/storage/banner-special-desktop-pkchaohe.png"
            alt=""
            class="w-full rounded-xl"
          />
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex w-full">
            <VProductsList
              v-if="itemList.length"
              type="product"
              :button-list="buttonList"
              :data="phoneList"
              title="IPHONE NỔI BẬT NHẤT"
              @go-detail="goDetail"
            />
          </div>
          <div class="flex w-full">
            <VProductsList
              v-if="itemList.length"
              type="product"
              :button-list="buttonList"
              :data="laptopList"
              title="SAMSUNG NỔI BẬT NHẤT"
              @go-detail="goDetail"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="hidden lg:flex lg:flex-[0.3]"></div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: Base
</route>
