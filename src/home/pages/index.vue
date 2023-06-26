<script setup lang="ts">
import { useStore } from '~/home/stores/Store';

import { Products } from '../dtos';
const store = useStore();

const router = useRouter();

const itemList = ref<Products[]>([]);
const phoneList = ref<Products[]>([]);
const laptopList = ref<Products[]>([]);
const tablet = ref<Products[]>([]);
const accessory = ref<Products[]>([]);

onMounted(async () => {
  getData();
});

async function getData() {
  itemList.value = [];
  const result = await store.getData();
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
  itemList.value = result;
  phoneList.value = itemList.value.filter((e) => e.type === 'apple');
  laptopList.value = itemList.value.filter((e) => e.type === 'samsung');
  tablet.value = itemList.value.filter((e) => e.type === 'tablet');
  accessory.value = itemList.value.filter((e) => e.type === 'accessory');
}

const listFeature = [
  {
    imageLink: 'images\\right-banner-th5-newww1.png',
  },
  {
    imageLink: 'images\\msi gaming right banner.png',
  },
  {
    imageLink: 'images\\right-banner-th5-newww1.png',
  },
] as Products[];
const listCarousel = [
  {
    imageLink: 'images\\carousel_1.png',
    title: 'Mừng Khai Trương',
    description: 'giảm đến 70%',
  },
  {
    imageLink: 'images\\carousel_2.png',
    title: 'IPhone 14 Pro',
    description: 'giá tốt bất ngờ',
  },
  {
    imageLink: 'images\\carousel_3.png',
    title: 'Redmi Note 12',
    description: 'mở bán giá tốt',
  },
  {
    imageLink: 'images\\carousel_2.png',
    title: 'Redmi Note 123',
    description: 'mở bán giá tốt',
  },
  {
    imageLink: 'images\\carousel_1.png',
    title: 'Redmi Note 124',
    description: 'mở bán giá tốt',
  },
] as Products[];
const buttonList = [
  { title: 'Apple' },
  { title: 'Samsung' },
  { title: 'Tablet' },
  { title: 'Accessory' },
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

async function eventMenu(title: string) {
  if (title === 'Điện Thoại') {
    await router.push(`products/brand/all`);
  } else {
    await router.push(`products/brand/all?selloff=true`);
  }
}

async function goDetail(index: number, id: string) {
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
                <img alt="" class="h-[114px] w-full rounded-xl" :src="item.imageLink" />
              </div>
            </div>
          </div>
        </div>

        <div class="flex h-[110px]">
          <img src="/images/xa-kho-khet-special.png" alt="" class="w-full rounded-xl" />
        </div>

        <div v-if="itemList.length" class="flex flex-col gap-4">
          <div class="flex w-full">
            <VProductsList
              v-if="phoneList[0] && phoneList[0]._id"
              type="product"
              :button-list="buttonList"
              :data="phoneList"
              title="IPHONE NỔI BẬT NHẤT"
              @go-detail="goDetail"
            />
          </div>
          <div class="flex w-full">
            <VProductsList
              v-if="laptopList[0] && laptopList[0]._id"
              type="product"
              :button-list="buttonList"
              :data="laptopList"
              title="SAMSUNG NỔI BẬT NHẤT"
              @go-detail="goDetail"
            />
          </div>
          <div class="flex w-full">
            <VProductsList
              v-if="tablet[0] && tablet[0]._id"
              type="product"
              :button-list="buttonList"
              :data="tablet"
              title="TABLET NỔI BẬT NHẤT"
              @go-detail="goDetail"
            />
          </div>
          <div class="flex w-full">
            <VProductsList
              v-if="accessory[0] && accessory[0]._id"
              type="product"
              :button-list="buttonList"
              :data="accessory"
              title="PHỤ KIỆN NỔI BẬT NHẤT"
              @go-detail="goDetail"
            />
          </div>
        </div>
        <div v-else class="flex w-full items-center justify-center pt-8">
          <VSpinner size="large" />
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
