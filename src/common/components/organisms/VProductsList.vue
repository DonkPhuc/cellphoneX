<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';

import { Carousel, Navigation, Slide } from 'vue3-carousel';

import { Products } from '~/home/dtos';

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

const emit = defineEmits(['goDetail']);

const formatVND = computed(() => (slide: Products) => {
  let result = {
    price: '',
    priceRRP: '',
  };
  result.price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(slide.price);
  result.priceRRP = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(slide.priceRRP);

  return result;
});

const eventButton = (title: string) => {
  console.log(title);
};

function goToProduct(index: number, id: string) {
  emit('goDetail', index, id);
}
const settings = {
  itemsToShow: 1,
  snapAlign: 'center',
};
const breakpoints = {
  // 364 and up
  100: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  500: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
  // 700px and up
  700: {
    itemsToShow: 4,
    snapAlign: 'start',
  },
  // 1024 and up
  1024: {
    itemsToShow: 5,
    snapAlign: 'start',
  },
};

const currentSlide = ref(0);
const slideTo = (index: number) => {
  currentSlide.value = index;
};
</script>

<template>
  <template v-if="type === 'product'">
    <!-- <div class="h-[40px] w-full">
      <div class="flex h-full items-center justify-between">
        <VTitle v-if="title" :title="title" />
        <div class="flex gap-2">
          <VButtonList v-if="buttonList" :data="buttonList" @event-button="eventButton" />
        </div>
      </div>
    </div> -->
    <Carousel v-if="data" :settings="settings" :breakpoints="breakpoints">
      <Slide
        v-for="(slide, index) in data"
        :key="index"
        class="cursor-pointer shadow-xl"
        @click="goToProduct(index, slide.id)"
      >
        <div class="mx-auto w-[95%] rounded-xl border border-slate-200 p-4">
          <div class="flex flex-col gap-4">
            <div class="w-full"><img :src="slide.imageLink" alt="" /></div>
            <div class="w-full">
              <p class="text-justify text-sm font-bold">{{ slide.name }}</p>
            </div>
            <div class="flex w-full justify-around">
              <p class="font-bold text-red-500">{{ formatVND(slide).price }}</p>
              <p class="flex items-center text-[14px] font-semibold text-gray-500 line-through">
                {{ formatVND(slide).priceRRP }}
              </p>
            </div>
            <div class="w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-xs">
              {{ slide.description }}
            </div>
            <div class="flex w-full justify-start">
              <VIcon icon-class="text-yellow-600" icon="fa-star" />
              <VIcon icon-class="text-yellow-600" icon="fa-star" />
              <VIcon icon-class="text-yellow-600" icon="fa-star" />
              <VIcon icon-class="text-yellow-600" icon="fa-star" />
              <VIcon icon-class="text-yellow-600" icon="fa-star" />
            </div>
            <div class="flex h-[20px] flex-1 items-center justify-end gap-2">
              <p class="text-xs text-gray-500">Yêu Thích</p>
              <VIcon icon="fa-heart" :icon-class="slide.favorite ? '!text-red-500' : '!text-yellow-500'" />
            </div>
          </div>
        </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </template>

  <template v-if="dataCarousel && type === 'carousel'">
    <Carousel v-model="currentSlide" :items-to-show="1" :wrap-around="false">
      <Slide v-for="slide in dataCarousel" :key="slide.title">
        <div class="h-[300px] w-full">
          <img class="h-full w-full rounded-t-xl" :src="slide.imageLink" alt="" />
        </div>
      </Slide>
    </Carousel>

    <Carousel v-if="dataCarousel" ref="carousel" v-model="currentSlide" :items-to-show="5" :wrap-around="false">
      <Slide v-for="(slide, index) in dataCarousel" :key="index">
        <div
          :class="index === currentSlide ? 'border-b-4 border-b-main' : ''"
          class="h-[76px] w-full cursor-pointer rounded-b-xl pt-5 hover:bg-gray-100"
          @click="slideTo(index)"
        >
          <p class="text-center text-xs font-bold">{{ slide.title }}</p>
          <p class="text-center text-xs font-normal">{{ slide.description }}</p>
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
