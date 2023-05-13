<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';

import { Carousel, Navigation, Slide } from 'vue3-carousel';

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

const eventButton = async (title: string) => {
  await router.push(`products/brand/${title.toLowerCase()}`);
};

function goToProduct(index: number, id: string) {
  emit('goDetail', index, id);
}
const settings = {
  itemsToShow: 1,
  snapAlign: 'end',
};
const breakpoints = {
  486: {
    itemsToShow: 1,
    align: 'end',
  },
  768: {
    itemsToShow: 3,
    align: 'end',
  },
  1624: {
    itemsToShow: 4,
    align: 'end',
  },
};

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

      <Carousel v-if="data" :breakpoints="breakpoints" :settings="settings">
        <Slide v-for="(slide, index) in data" :key="index">
          <div class="rounded-xl border border-slate-200 p-2 shadow-xl">
            <div class="flex w-full flex-col gap-4">
              <!-- <span class="vc">{{ slide.discount + '%' }}</span>

              <img
                class="mx-auto h-[180px] w-[180px] cursor-pointer"
                :src="slide.imageLink"
                alt=""
                @click="goToProduct(index, slide._id)"
              /> -->
              <div class="w-full bg-red-100">
                {{ slide.discount + '%' }}
              </div>
              <div class="w-full bg-red-100">
                <img
                  class="mx-auto h-[180px] w-[180px] cursor-pointer"
                  :src="slide.imageLink"
                  alt=""
                  @click="goToProduct(index, slide._id)"
                />
              </div>
              <div class="w-full bg-red-100">
                1
                <!-- <p class="h-14 max-w-[180px] text-justify text-sm font-bold md:flex">{{ slide.name }}</p> -->
              </div>
              <!-- <div class="w-full bg-red-100">
                <div class="flex gap-2">
                  <p class="font-bold text-red-500">{{ formatVND(slide).price }}</p>
                  <p class="flex items-center text-[14px] font-semibold text-gray-500 line-through">
                    {{ formatVND(slide).priceRRP }}
                  </p>
                </div>
              </div> -->1
              <div class="w-full bg-red-100">1</div>
            </div>
            <!-- <p class="h-14 text-justify text-sm font-bold md:flex">{{ slide.name }}</p> -->

            <!-- <div class="hidden gap-2 md:flex">
                  <p class="font-bold text-red-500">{{ formatVND(slide).price }}</p>
                  <p class="flex items-center text-[14px] font-semibold text-gray-500 line-through">
                    {{ formatVND(slide).priceRRP }}
                  </p>
                </div>
  
                <div class="hidden w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-xs md:flex">
                  {{ slide.description }}
                </div>
  
                <div class="hidden w-full justify-start md:flex">
                  <VIcon icon-class="text-yellow-600" icon="fa-star" />
                  <VIcon icon-class="text-yellow-600" icon="fa-star" />
                  <VIcon icon-class="text-yellow-600" icon="fa-star" />
                  <VIcon icon-class="text-yellow-600" icon="fa-star" />
                  <VIcon icon-class="text-yellow-600" icon="fa-star" />
                </div>
  
                <div class="hidden h-[20px] flex-1 items-center justify-end gap-2 md:flex">
                  <p class="text-xs text-gray-500">Yêu Thích</p>
                  <VIcon
                    :icon="slide.favorite ? 'fa-heart' : 'fa-heart-o'"
                    :icon-class="slide.favorite ? '!text-red-500' : '!text-black-500'"
                  />
                </div> -->
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
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
