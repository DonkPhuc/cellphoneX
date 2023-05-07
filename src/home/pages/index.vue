<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useStore } from '~/home/stores/Store';
import { useUserStore } from '~/user/stores/user';

import { Products } from '../dtos';
const userStore = useUserStore();
const store = useStore();
const { currentProduct } = storeToRefs(userStore);

const router = useRouter();

const itemList = ref<Products[]>([]);

onMounted(() => {
  itemList.value = [];
  getPhoneData();
  window.scrollTo(0, 0);
});

async function getPhoneData() {
  const result = (await store.getData()) as Products[];
  result.forEach((e) => {
    e.price = e.priceRRP - e.priceRRP * (e.discount / 100);
  });
  itemList.value = result;
}

const listFeature = [
  {
    imageLink: 'dist/images/right-banner-ideapad-3.webp',
  },
  {
    imageLink: 'dist/images/right-banner-th5-newww1.webp',
  },
  {
    imageLink: 'dist/images/s20-fe-right-th555.webp',
  },
] as Products[];
const listCarousel = [
  {
    imageLink: 'dist/images/right-banner-ideapad-3.webp',
    title: 'Mừng Khai Trương',
    description: 'giảm đến 70%',
  },
  {
    imageLink: 'dist/images/right-banner-th5-newww1.webp',
    title: 'IPhone 14 Pro',
    description: 'giá tốt bất ngờ',
  },
  {
    imageLink: 'dist/images/s20-fe-right-th555.webp',
    title: 'Redmi Note 12',
    description: 'mở bán giá tốt',
  },
  {
    imageLink: 'dist/images/right-banner-th5-newww1.webp',
    title: 'Redmi Note 123',
    description: 'mở bán giá tốt',
  },
  {
    imageLink: 'dist/images/right-banner-ideapad-3.webp',
    title: 'Redmi Note 124',
    description: 'mở bán giá tốt',
  },
] as Products[];
const buttonList = [
  {
    title: 'Apple',
  },
  {
    title: 'Apple2',
  },
  {
    title: 'Apple3',
  },
  {
    title: 'Apple4',
  },
  {
    title: 'Apple5',
  },
  {
    title: 'Apple4',
  },
  {
    title: 'Apple2',
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
const categories = [
  {
    title: 'Nổi Bật',
    imageLink: 'https://cdn2.cellphones.com.vn/x/media/icons/category/cate-669.svg',
  },
  {
    title: 'Nổi Bật',
    imageLink: 'https://cdn2.cellphones.com.vn/x/media/icons/category/cate-669.svg',
  },
  {
    title: 'Nổi Bật',
    imageLink: 'https://cdn2.cellphones.com.vn/x/media/icons/category/cate-669.svg',
  },
  {
    title: 'Nổi Bật',
    imageLink: 'https://cdn2.cellphones.com.vn/x/media/icons/category/cate-669.svg',
  },
  {
    title: 'Nổi Bật',
    imageLink: 'https://cdn2.cellphones.com.vn/x/media/icons/category/cate-669.svg',
  },
  {
    title: 'Nổi Bật',
    imageLink: 'https://cdn2.cellphones.com.vn/x/media/icons/category/cate-669.svg',
  },
  {
    title: 'Nổi Bật',
    imageLink: 'https://cdn2.cellphones.com.vn/x/media/icons/category/cate-669.svg',
  },
  {
    title: 'Nổi Bật',
    imageLink: 'https://cdn2.cellphones.com.vn/x/media/icons/category/cate-669.svg',
  },
  {
    title: 'Nổi Bật',
    imageLink: 'https://cdn2.cellphones.com.vn/x/media/icons/category/cate-669.svg',
  },
  {
    title: 'Nổi Bật',
    imageLink: 'https://cdn2.cellphones.com.vn/x/media/icons/category/cate-669.svg',
  },
] as Products[];

function eventMenu(title: string) {
  console.log(title);
}

async function goDetail(index: number, id: string) {
  currentProduct.value = [];
  let result = itemList.value[index];
  if (result) {
    currentProduct.value.push(result);
  }
  const currentRoute = router.currentRoute.value.fullPath;
  await router.push(`products/detail`);
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
              type="product"
              :button-list="buttonList"
              :data="itemList"
              title="ĐIỆN THOẠI NỔI BẬT NHẤT"
              @go-detail="goDetail"
            />
          </div>

          <!-- <VProductsList
            type="product"
            :button-list="buttonList"
            :data="itemList"
            title="ĐIỆN THOẠI NỔI BẬT NHẤT"
            @go-detail="goDetail"
          />
  
          <VProductsList
            type="product"
            :button-list="buttonList"
            :data="itemList"
            title="LAPTOP NỔI BẬT NHẤT "
            @go-detail="goDetail"
          />
  
          <VProductsList
            type="product"
            :button-list="buttonList"
            :data="itemList"
            title="TAI NGHE NỔI BẬT NHẤT"
            @go-detail="goDetail"
          /> -->
        </div>
        <!-- 
        <div class="h-[40px] w-full">
          <div class="flex h-full items-center justify-between">
            <VTitle title="PHỤ KIỆN" />
            <div class="flex gap-2">
              <span class="cursor-pointer text-sm hover:underline">Xem Tất Cả</span>
            </div>
          </div>
        </div> -->

        <!-- <div class="flex h-auto w-full gap-4 bg-red-200 pb-10">
          <div v-for="item in categories" :key="item.title" class="flex gap-4">
            <div class="flex h-[125px] w-[111px] flex-col rounded-xl bg-[#F28376] shadow-xl">
              <VTitle class="!pl-2 !text-white" title="Nổi Bật" />
              <img class="mt-[-30px]" src="https://cdn2.cellphones.com.vn/x/media/icons/category/cate-669.svg" />
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="hidden lg:flex lg:flex-[0.3]"></div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: Base
</route>
