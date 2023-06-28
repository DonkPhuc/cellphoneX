<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';

import { Carousel, Slide } from 'vue3-carousel';

import { Products } from '~/home/dtos';
const router = useRouter();
interface Props {
  type: string;
  title?: string;
  data?: Products[];
  buttonList?: Products[];
  dataCarousel?: Products[];
  dataDetail?: Products;
}
const props = defineProps<Props>();
const { title, data, buttonList, type, dataCarousel } = toRefs(props);

import { storeToRefs } from 'pinia';

import { useUserStore } from '~/user/stores/user';
const userStore = useUserStore();
const { isLoginSuccess, favrouteList } = storeToRefs(userStore);

const emit = defineEmits(['goDetail']);

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
const eventButton = async (title: string) => {
  await router.push(`products/brand/${title.toLowerCase()}`);
};
function goToProduct(index: number, id: string) {
  emit('goDetail', index, id);
}
const currentSlide = ref(0);
const slideTo = (index: number) => {
  currentSlide.value = index;
};
const resize = computed(() => {
  let itemShow = 5;
  const screenWidth = window.innerWidth;
  if (screenWidth < 1024) {
    itemShow = 3;
  }
  return itemShow;
});
async function addFavorites(id: string) {
  const result = await userStore.postAddToFavourite(isLoginSuccess.value, id);
  if (result === 'successfully') {
    console.log('ok');
  }
}
const findFavrouteList = computed(() => (id: string) => {
  return favrouteList.value.findIndex((e: { _id: string }) => e._id === id);
});
</script>

<template>
  <template v-if="type === 'product'">
    <div class="flex w-full flex-col gap-2 p-2">
      <div class="flex h-[40px] items-center">
        <div class="flex flex-[2] items-center lg:flex-[0.6]">
          <VTitle v-if="title" :title="title" />
        </div>
        <div class="flex flex-1 justify-end gap-2">
          <VButtonList v-if="buttonList" :data="buttonList" @event-button="eventButton" />
          <VButton
            class="!duration-200 hover:!bg-main hover:!text-white"
            input-class="rounded-xl !border-slate-300 !bg-gray-100 !text-slate-600"
            :label="'Xem tất cả'"
            @click="eventButton('all')"
          />
        </div>
      </div>

      <div class="flex flex-col gap-4 md:flex-row">
        <div
          v-for="(slide, index) in data?.splice(0, 5)"
          :key="index"
          class="rounded-xl border border-slate-200 p-4 shadow-xl"
        >
          <div class="flex w-full flex-col gap-4">
            <div class="flex w-full justify-end">
              <span class="vc py-1 text-xs font-semibold before:hidden after:hidden before:md:block after:md:block"
                >Giảm {{ slide.discount + '%' }}</span
              >
            </div>
            <img
              class="mx-auto h-[180px] w-[180px] cursor-pointer"
              :src="slide.imageLink"
              alt=""
              @click="goToProduct(index, slide._id)"
            />
            <div class="w-full" @click="goToProduct(index, slide._id)">
              <span class="h-14 max-w-[180px] cursor-pointer text-justify text-sm font-bold md:flex">
                {{ slide.name }}
              </span>
            </div>
            <div class="w-full">
              <div class="flex gap-2">
                <p class="font-bold text-red-500">
                  {{ formatVND(slide).price }}
                </p>
                <p class="flex items-center text-[14px] font-semibold text-gray-500 line-through">
                  {{ formatVND(slide).priceRRP }}
                </p>
              </div>
            </div>

            <div class="flex w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-xs">
              {{ slide.description }}
            </div>

            <div class="flex w-full justify-start">
              <VIcon :icon-class="slide.averageRate > 0 ? 'text-yellow-600' : 'text-black'" icon="fa-star" />
              <VIcon :icon-class="slide.averageRate > 1 ? 'text-yellow-600' : 'text-black'" icon="fa-star" />
              <VIcon :icon-class="slide.averageRate > 2 ? 'text-yellow-600' : 'text-black'" icon="fa-star" />
              <VIcon :icon-class="slide.averageRate > 3 ? 'text-yellow-600' : 'text-black'" icon="fa-star" />
              <VIcon :icon-class="slide.averageRate > 4 ? 'text-yellow-600' : 'text-black'" icon="fa-star" />
            </div>

            <div
              class="flex h-[20px] flex-1 cursor-pointer items-center justify-end gap-2"
              @click="addFavorites(slide._id)"
            >
              <span class="text-xs text-gray-500">Yêu Thích</span>
              <VIcon
                :icon="findFavrouteList(slide._id) !== -1 ? 'fa-heart' : 'fa-heart-o'"
                :icon-class="findFavrouteList(slide._id) !== -1 ? '!text-red-500' : '!text-black-500'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-if="dataCarousel && type === 'carousel'">
    <Carousel v-model="currentSlide" :items-to-show="1" :wrap-around="false">
      <Slide v-for="slide in dataCarousel" :key="slide.title">
        <div class="h-[300px] w-full">
          <img class="h-full w-full rounded-t-xl" :src="slide.imageLink" alt="" />
        </div>
      </Slide>
    </Carousel>

    <Carousel v-if="dataCarousel" ref="carousel" v-model="currentSlide" :items-to-show="resize" :wrap-around="false">
      <Slide v-for="(slide, index) in dataCarousel" :key="index">
        <div
          :class="index === currentSlide ? 'border-b-4 border-b-main' : ''"
          class="h-[76px] w-full cursor-pointer rounded-b-xl pt-5 hover:bg-gray-100"
          @click="slideTo(index)"
        >
          <p class="cursor-pointer text-center text-xs font-bold">{{ slide.title }}</p>
          <p class="cursor-pointer text-center text-xs font-normal">{{ slide.description }}</p>
        </div>
      </Slide>
    </Carousel>
  </template>

  <template v-if="dataDetail && type === 'detail'">
    <div class="flex flex-col gap-4">
      <Carousel v-model="currentSlide" :items-to-show="1" :wrap-around="false">
        <Slide v-for="slide in dataDetail.imageDetail" :key="slide">
          <div class="h-[350px] w-full rounded-xl border p-4">
            <img class="mx-auto h-full rounded-xl" :src="slide" alt="" />
          </div>
        </Slide>
      </Carousel>

      <Carousel ref="carousel" v-model="currentSlide" :items-to-show="5" :wrap-around="false">
        <Slide v-for="(slide, index) in dataDetail.imageDetail" :key="index">
          <div class="mx-auto h-16 w-16 cursor-pointer rounded-xl" @click="slideTo(index)">
            <img
              class="m-auto h-3/4 w-3/4 rounded-md border"
              :src="slide"
              alt=""
              :class="index === currentSlide ? 'border border-main' : ''"
            />
          </div>
        </Slide>
      </Carousel>
    </div>
  </template>
</template>

<style scoped>
.vc {
  right: -17px;
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
