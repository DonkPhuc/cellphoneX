<script setup lang="ts">
import 'vue3-toastify/dist/index.css';

import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';

import { Products } from '~/home/dtos';
import { useStore } from '~/home/stores/Store';
import { useUserStore } from '~/user/stores/user';
const userStore = useUserStore();
const store = useStore();
const { isLoginSuccess, userFullName } = storeToRefs(userStore);

const router = useRouter();
const route = useRoute();

const currentProduct = ref();
const currentPrice = ref();
const currentPriceRRP = ref();
const descriptionRate = ref();
const ratingProduct = ref(-1);
const averageRate = ref(0);
const oneStar = ref(0);
const twoStar = ref(0);
const threeStar = ref(0);
const fourStar = ref(0);
const fiveStar = ref(0);
const open = ref(false);
const openRate = ref(false);
const selectedRom = ref(1);
const selectedColor = ref(1);

onMounted(async () => {
  getData();
  window.scrollTo(0, 0);
});

async function getData() {
  currentProduct.value = (await store.getProduct(route.params.id.toString())) as Products;
  currentProduct.value.price =
    currentProduct.value.priceRRP - (currentProduct.value.priceRRP * currentProduct.value.discount) / 100;
  currentPrice.value = currentProduct.value.price;
  currentPriceRRP.value = currentProduct.value.priceRRP;

  averageRate.value = 0;
  currentProduct.value.rate.forEach((element: { value: number }) => {
    averageRate.value = averageRate.value + element.value;
  });
  averageRate.value = Number(averageRate.value / currentProduct.value.rate.length);

  for (let i = 0; i < currentProduct.value.rate.length; i++) {
    if (currentProduct.value.rate[i].value === 1) {
      oneStar.value++;
    }
    if (currentProduct.value.rate[i].value === 2) {
      twoStar.value++;
    }
    if (currentProduct.value.rate[i].value === 3) {
      threeStar.value++;
    }
    if (currentProduct.value.rate[i].value === 4) {
      fourStar.value++;
    }
    if (currentProduct.value.rate[i].value === 5) {
      fiveStar.value++;
    }
  }
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

async function addToCart(action: string) {
  if (!isLoginSuccess.value) {
    open.value = true;
  } else {
    const rs = await store.postAddToCart(isLoginSuccess.value, route.params.id.toString());
    if (action === 'buy') {
      await router.push(`/cart`);
    } else if (rs === 'successfully') {
      notifySignUp('Đã thêm vào giỏ hàng');
    } else {
      notifySignUp('Sản phẩm đã có trong giỏ hàng');
    }
  }
}

function selectedOptionRom(value: number) {
  selectedRom.value = value;
  currentProduct.value.price = currentPrice.value * selectedColor.value * selectedRom.value;
  currentProduct.value.priceRRP = currentPrice.value * selectedColor.value * selectedRom.value;
}
function selectedOptionColor(value: number) {
  selectedColor.value = value;
  currentProduct.value.price = currentPrice.value * selectedColor.value * selectedRom.value;
  currentProduct.value.priceRRP = currentPrice.value * selectedColor.value * selectedRom.value;
}

const notifySignUp = (error?: string) => {
  if (error !== '') {
    toast(`${error}`, {});
  }
};

const listRom = [
  {
    rom: '128GB',
    value: 1,
  },
  {
    rom: '256GB',
    value: 1.1,
  },
  {
    rom: '512GB',
    value: 1.2,
  },
];
const listColor = [
  {
    color: 'Đen',
    value: 1,
  },
  {
    color: 'Xám',
    value: 1.1,
  },
  {
    color: 'Tím',
    value: 1.2,
  },
];
const rateList = [
  {
    title: 'Rất tệ',
  },
  {
    title: 'Tệ',
  },
  {
    title: 'Bình thường',
  },
  {
    title: 'Tốt',
  },
  {
    title: 'Rất tốt',
  },
];

function rating() {
  if (!isLoginSuccess.value) {
    open.value = true;
  } else {
    openRate.value = true;
  }
}
function handleRate(index: number) {
  ratingProduct.value = index;
}
async function postRating() {
  let result;
  let rs = currentProduct.value.rate.find((e: { phoneNo: string }) => e.phoneNo === isLoginSuccess.value);
  if (rs) {
    notifySignUp('Bạn đã đánh giá sản phẩm này rồi');
  } else {
    if (ratingProduct.value > -1) {
      result = await store.postAddRate(
        {
          phoneNo: isLoginSuccess.value,
          username: userFullName.value,
          description: descriptionRate.value,
          value: Number(ratingProduct.value + 1),
        },
        currentProduct.value._id
      );
    } else {
      notifySignUp('Vui lòng đánh giá sản phẩm');
    }
  }

  openRate.value = false;
  if (result) {
    await getData();
    notifySignUp('Cảm ơn bạn đã gửi đánh giá');
  }
  ratingProduct.value = -1;
  descriptionRate.value = '';
}

const ratingProd = computed(() => {
  let startIndex = {
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
  };

  if (averageRate.value > 0) {
    startIndex.one = 'text-yellow-600';
  } else {
    startIndex.one = 'text-black';
  }
  if (averageRate.value > 1) {
    startIndex.two = 'text-yellow-600';
  } else {
    startIndex.two = 'text-black';
  }
  if (averageRate.value > 2) {
    startIndex.three = 'text-yellow-600';
  } else {
    startIndex.three = 'text-black';
  }
  if (averageRate.value > 3) {
    startIndex.four = 'text-yellow-600';
  } else {
    startIndex.four = 'text-black';
  }
  if (averageRate.value > 4) {
    startIndex.five = 'text-yellow-600';
  } else {
    startIndex.five = 'text-black';
  }

  return startIndex;
});
</script>

<template>
  <VDialog :is-open="open" @close="open = false">
    <template #title>
      <div class="flex items-center gap-2">
        <img
          class="h-10 w-10"
          src="https://cdn2.cellphones.com.vn/213x213,webp,q100/media/wysiwyg/Shipper_CPS.jpg"
          alt=""
        />
        <span class="font-bold text-main">MemberCPX</span>
      </div>
    </template>
    <template #detail>
      <p class="w-[350px] text-justify font-bold">Vui lòng đăng nhập tài khoản Smember để thao tác dễ dàng hơn</p>
    </template>
    <template #action>
      <div class="mb-5 flex justify-between gap-2">
        <VButton input-class="w-36 ring-0" size="large" label="Đăng nhập ngay" @click="router.push(`/login`)" />
        <VButton
          input-class="w-36 ring-0"
          size="large"
          variant="outlined"
          class="w-20"
          label="Để sau"
          @click="open = false"
        />
      </div>
    </template>
  </VDialog>

  <VDialog :is-open="openRate" @close="openRate = false">
    <template #title>
      <div class="flex flex-col items-center gap-2">
        <img
          class="h-44 w-44"
          src="https://cdn2.cellphones.com.vn/213x213,webp,q100/media/wysiwyg/Shipper_CPS.jpg"
          alt=""
        />
        <span class="text-center font-bold md:px-8 md:text-2xl">Đánh giá & nhận xét {{ currentProduct.name }}</span>
      </div>
    </template>
    <template #detail>
      <div class="mb-4 flex w-full flex-col gap-4 rounded-xl border p-4">
        <textarea
          v-model="descriptionRate"
          class="border-none !ring-0"
          rows="4"
          cols="50"
          placeholder="Xin hãy để lại cảm nhận về sản phẩm này!"
        ></textarea>
      </div>

      <div class="flex w-full flex-col gap-4 rounded-xl border p-4">
        <p class="text-justify text-xs font-bold md:text-lg">Bạn thấy sản phẩm này như thế nào?</p>
        <div class="text-md flex justify-center gap-2">
          <div
            v-for="(item, index) in rateList"
            :key="item.title"
            class="flex flex-1 cursor-pointer flex-col items-center gap-2"
            @click="handleRate(index)"
          >
            <VIcon :icon-class="ratingProduct >= index ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
            <span class="hidden truncate md:flex">{{ item.title }} </span>
          </div>
        </div>
      </div>
    </template>
    <template #action>
      <div class="mb-5 flex justify-between gap-2">
        <VButton input-class="w-36 ring-0" size="large" label="GỬI ĐÁNH GIÁ" @click="postRating" />
      </div>
    </template>
  </VDialog>
  <div class="flex">
    <div class="hidden flex-[0.3] lg:flex"></div>
    <main v-if="currentProduct" class="flex-1 py-4">
      <div class="flex flex-col gap-4">
        <div class="flex w-full items-center gap-4 border-b-2 px-4 py-2">
          <span class="text-lg font-bold text-black">{{ currentProduct.name }}</span>
          <div class="hidden pl-8 lg:flex">
            <div class="hidden items-center justify-end lg:flex">
              <VIcon :icon-class="ratingProd.one" icon="fa-star" />
              <VIcon :icon-class="ratingProd.two" icon="fa-star" />
              <VIcon :icon-class="ratingProd.three" icon="fa-star" />
              <VIcon :icon-class="ratingProd.four" icon="fa-star" />
              <VIcon :icon-class="ratingProd.five" icon="fa-star" />
            </div>
            <span class="hidden lg:flex">{{ currentProduct.rate.length + ' ' }} đánh giá</span>
          </div>
        </div>

        <div class="flex flex-col gap-4 border-b-2 p-4 md:flex-row md:px-2 lg:flex-row">
          <div class="flex-1">
            <VProductsList :data-detail="currentProduct" type="detail" />
          </div>

          <div class="flex-1">
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-4">
                <span class="font-bold text-red-600">
                  {{ formatVND(currentProduct).price }}
                </span>
                <span class="text-xs line-through">
                  {{ formatVND(currentProduct).priceRRP }}
                </span>
              </div>

              <div class="flex gap-4">
                <div
                  v-for="item in listRom"
                  :key="item.value"
                  :class="selectedRom === item.value ? 'border border-main' : ''"
                  class="h-20 flex-1 cursor-pointer rounded-md border"
                  @click="selectedOptionRom(item.value)"
                >
                  <span class="flex h-full items-center justify-center font-bold"> {{ item.rom }}</span>
                </div>
              </div>

              <span>Chọn màu để xem giá và chi nhánh có hàng</span>

              <div class="flex gap-4">
                <div
                  v-for="item in listColor"
                  :key="item.value"
                  :class="selectedColor === item.value ? 'border border-main' : ''"
                  class="h-10 flex-1 cursor-pointer rounded-md border"
                  @click="selectedOptionColor(item.value)"
                >
                  <span class="flex h-full items-center justify-center font-bold"> {{ item.color }}</span>
                </div>
              </div>

              <div class="flex flex-col">
                <div class="rounded-t-2xl bg-[#FEE2E2] p-2 !font-bold text-main">
                  <VIconLabel icon-color="text-main" icon="fa-archive" label="Khuyến Mãi" />
                </div>
                <div class="h-40 rounded-b-2xl border">
                  <div class="flex flex-col">
                    <div class="flex items-center gap-2 p-2">
                      <p class="max-h-8 text-xs">
                        Giảm ngay 3.000.000đ khi tham gia thu cũ đổi mới - Giá thu tốt nhất thị trường (Xem chi tiết)
                      </p>
                    </div>
                    <div class="flex items-center gap-2 p-2">
                      <p class="max-h-8 text-xs">
                        Giảm ngay 3.000.000đ khi tham gia thu cũ đổi mới - Giá thu tốt nhất thị trường (Xem chi tiết)
                      </p>
                    </div>
                    <div class="flex items-center gap-2 p-2">
                      <p class="max-h-8 text-xs">
                        Giảm ngay 3.000.000đ khi tham gia thu cũ đổi mới - Giá thu tốt nhất thị trường (Xem chi tiết)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex gap-2">
                <div class="flex-1 rounded-xl">
                  <VButton
                    input-class="w-full !h-14 rounded-xl border-none !bg-main"
                    :style="'2line'"
                    label="Mua Ngay"
                    label2="(Giao hàng nhanh từ 2 giờ hoặc nhận tại cửa hàng)"
                    @click="addToCart('buy')"
                  />
                </div>
                <div class="flex-[1/4] rounded-xl">
                  <VButton
                    :style="'2line'"
                    input-class="w-full !h-14 rounded-xl !border-main !text-main hover:!bg-white active:!bg-white focus:!bg-white"
                    variant="outlined"
                    label2="Thêm vào giỏ"
                    icon="fa-cart-arrow-down"
                    @click="addToCart('cart')"
                  />
                </div>
              </div>

              <div class="flex gap-2">
                <div class="flex-1 rounded-xl">
                  <VButton
                    :disabled="true"
                    input-class="disabled:!text-white w-full !h-14 rounded-xl border-none !bg-[linear-gradient(180deg,#3a78d0,#277cea)]"
                    label="trả góp 0%"
                    :style="'2line'"
                    label2="(Xét duyệt qua điện thoại)"
                  />
                </div>
                <div class="flex-1 rounded-xl">
                  <VButton
                    :disabled="true"
                    input-class="disabled:!text-white w-full !h-14 rounded-xl border-none !bg-[linear-gradient(180deg,#3a78d0,#277cea)]"
                    :style="'2line'"
                    label2="(Visa, MasterCard, JCB)"
                    label="trả góp qua thẻ"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="hidden flex-1 lg:flex">
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-4 rounded-xl border p-4">
                <span class="font-bold">Thông tin sản phẩm</span>
                <span class="flex items-center gap-2">
                  <img
                    class="h-8 w-5"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAyCAYAAADWU2JnAAAABHNCSVQICAgIfAhkiAAAAWRJREFUWEftmcFNw0AQRf+sG6ADoAJCBUAHlJDL7hW7ApIOcrS8PpgKKAHTQaiAlOBcfdhBIxHJRgFpbWT7MHuLtM78efu0hx0CAOfcM4A1gCv5PdVi5oaIamNMluf5gZxzGwASZrbFzHvv/a2E+ZyayLmuQwgPEoZnQ9IvnC0pzHbRYbIQwn6qYzPG7ADcfNfrkxGJyrKspwpjra2J6E7D/CSuZH5zUMkomdj7SZ1RZ9SZWALqTCwxvWfUGXUmloA6E0tM7xl1Rp2JJaDOxBL7855h5hTAZC9XAHZEtDr7WBTb2T/vX/YDY2yzL23bplVVNc65RwCvsX/Q2T+KzLEoiotucWutOPA0MNDwMMz87r2/7xYeOYcYHkZCGGOuZRpyCmStfSOiXsAISluy1h6I6DLio+5WCbIJITTGGBkRiTeD1mmQMfuIB8BHURQrkjbkrJl5PYLQIBoAjsxcJ0mSynF/AXY82KKEipF6AAAAAElFTkSuQmCC"
                  />
                  <p class="text-sm font-extralight">
                    Nguyên hộp, đầy đủ phụ kiện từ nhà sản suất<br />Bảo hành pin 12 tháng
                  </p>
                </span>
                <span class="flex items-center gap-2">
                  <img
                    class="h-5 w-5"
                    src="data:image/png;base64,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"
                  />
                  <p class="text-sm font-extralight">
                    Bảo hành 24 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ
                    nhà sản xuất.
                  </p>
                </span>
              </div>

              <div class="flex flex-col gap-4 rounded-xl border p-4">
                <span class="flex items-start gap-2">
                  <img
                    class="mt-1 h-5 w-5"
                    src="data:image/png;base64,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"
                  />
                  <div>
                    <p class="font-bold">Bảo vệ sản phẩm toàn diện với dịch vụ bảo hành mở rộng</p>
                    <p class="text-sm">
                      (Khách hàng đăng ký thông tin để được hỗ trợ tư vấn và thanh toán tại cửa hàng nhanh nhất, số tiền
                      phải thanh toán chưa bao gồm giá trị của gói bảo hành mở rộng)
                    </p>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4 md:flex-row lg:flex-row">
          <div class="flex-1 rounded-xl border p-4 shadow-xl">
            <div class="flex flex-col gap-4 rounded-xl">
              <span class="py-2 font-bold">Đánh giá & nhận xét {{ currentProduct.name }}</span>

              <div class="flex">
                <div class="flex flex-1 items-center justify-center border md:flex-[0.7] lg:rounded-l-2xl">
                  <div class="flex flex-col items-center">
                    <span :key="averageRate" class="flex justify-center text-2xl font-bold"
                      >{{ averageRate < 5 ? averageRate.toFixed(1) : 5.0 }}/5</span
                    >
                    <div :key="averageRate" class="flex items-center">
                      <VIcon :icon-class="averageRate > 0 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
                      <VIcon :icon-class="averageRate > 1 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
                      <VIcon :icon-class="averageRate > 2 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
                      <VIcon :icon-class="averageRate > 3 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
                      <VIcon :icon-class="averageRate > 4 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
                    </div>
                    <span class="flex justify-center">
                      <b> {{ currentProduct.rate.length + ' ' }}</b> đánh giá và nhận xét
                    </span>
                  </div>
                </div>
                <div class="hidden flex-1 rounded-r-2xl border p-2 md:block">
                  <div class="flex items-center">
                    <p class="flex-[0.2]">
                      5
                      <VIcon icon-class="text-yellow-600" icon="fa-star" />
                    </p>
                    <div
                      :class="fiveStar > 0 ? '!bg-main' : 'bg-gray-200'"
                      class="h-2 w-full flex-1 rounded-lg bg-gray-200"
                    ></div>
                    <p class="flex flex-[0.4] justify-center">{{ fiveStar }} đánh giá</p>
                  </div>
                  <div class="flex items-center">
                    <p class="flex-[0.2]">
                      4
                      <VIcon icon-class="text-yellow-600" icon="fa-star" />
                    </p>

                    <div
                      :class="fourStar > 0 ? '!bg-main' : 'bg-gray-200'"
                      class="h-2 w-full flex-1 rounded-lg bg-gray-200"
                    ></div>
                    <p class="flex flex-[0.4] justify-center">{{ fourStar }} đánh giá</p>
                  </div>
                  <div class="flex items-center">
                    <p class="flex-[0.2]">
                      3
                      <VIcon icon-class="text-yellow-600" icon="fa-star" />
                    </p>

                    <div
                      :class="threeStar > 0 ? '!bg-main' : 'bg-gray-200'"
                      class="h-2 w-full flex-1 rounded-lg bg-gray-200"
                    ></div>
                    <p class="flex flex-[0.4] justify-center">{{ threeStar }} đánh giá</p>
                  </div>
                  <div class="flex items-center">
                    <p class="flex-[0.2]">
                      2
                      <VIcon icon-class="text-yellow-600" icon="fa-star" />
                    </p>

                    <div
                      :class="twoStar > 0 ? '!bg-main' : 'bg-gray-200'"
                      class="h-2 w-full flex-1 rounded-lg bg-gray-200"
                    ></div>
                    <p class="flex flex-[0.4] justify-center">{{ twoStar }} đánh giá</p>
                  </div>
                  <div class="flex items-center">
                    <p class="flex-[0.2]">
                      1
                      <VIcon icon-class="text-yellow-600" icon="fa-star" />
                    </p>

                    <div
                      :class="oneStar > 0 ? '!bg-main' : 'bg-gray-200'"
                      class="h-2 w-full flex-1 rounded-lg bg-gray-200"
                    ></div>
                    <p class="flex flex-[0.4] justify-center">{{ oneStar }} đánh giá</p>
                  </div>
                </div>
              </div>

              <div class="flex justify-center">Bạn đánh giá sao sản phẩm này</div>

              <div class="flex justify-center">
                <VButton
                  label="Đánh giá ngay"
                  input-class="!h-[35px] border-none !bg-main text-white w-[300px] rounded-lg"
                  @click="rating"
                />
              </div>

              <div
                v-if="currentProduct.rate.length !== 0"
                class="flex h-auto max-h-[600px] flex-col gap-4 overflow-y-auto"
              >
                <div v-for="item in currentProduct.rate" :key="item.username" class="flex-col">
                  <div class="flex justify-between">
                    <div class="flex gap-2">
                      <span class="flex h-5 w-5 items-center justify-center bg-red-100 font-bold">
                        {{ item.username.charAt(0) }}
                      </span>

                      <span class="font-bold">{{ item.username }}</span>
                    </div>
                    <span class="text-xs font-bold text-gray-500">
                      {{ item.timestamp.substr(0, 10) }}
                    </span>
                  </div>
                  <div class="flex justify-end">
                    <div class="flex flex-1 flex-col gap-2 rounded-xl bg-[#f3f4f6] p-2">
                      <div class="flex">
                        <span class="text-sm font-bold">Đánh giá: </span>
                        <div class="flex items-center">
                          <VIcon :icon-class="item.value > 0 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
                          <VIcon :icon-class="item.value > 1 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
                          <VIcon :icon-class="item.value > 2 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
                          <VIcon :icon-class="item.value > 3 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
                          <VIcon :icon-class="item.value > 4 ? 'text-yellow-600' : 'text-black-600'" icon="fa-star" />
                        </div>
                      </div>
                      <p v-if="item.description" class="text-sm">
                        <span class="font-bold">Nhận xét:</span>
                        {{ item.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex-[0.5] rounded-xl border shadow-xl">
              <div class="flex flex-col gap-2 p-4">
                <span class="font-bold">Thông số kỹ thuật</span>
                <div class="flex flex-col rounded-xl border">
                  <div class="flex justify-between bg-[#f2f2f2] p-2">
                    <p class="flex flex-1 items-center text-sm">Thông số kỹ thuật</p>
                    <p class="flex flex-1 items-center text-sm">Geforce GTX 1650 4GB</p>
                  </div>
                  <div class="flex justify-between p-2">
                    <p class="flex flex-1 items-center text-sm">Dung lượng RAM</p>
                    <p class="flex flex-1 items-center text-sm">8GB</p>
                  </div>
                  <div class="flex justify-between bg-[#f2f2f2] p-2">
                    <p class="flex flex-1 items-center text-sm">Loại RAM</p>
                    <p class="flex flex-1 items-center text-sm">DDR4 8GB (1 x 8GB) 3200MHz, up to 32GB</p>
                  </div>
                  <div class="flex justify-between p-2">
                    <p class="flex flex-1 items-center text-sm">Số khe ram</p>
                    <p class="flex flex-1 items-center text-sm">2 khe</p>
                  </div>
                  <div class="flex justify-between bg-[#f2f2f2] p-2">
                    <p class="flex flex-1 items-center text-sm">Ổ cứng</p>
                    <p class="flex flex-1 items-center text-sm">512GB SSD NVMe M.2 PCIe Gen 3 x 4</p>
                  </div>
                  <div class="flex justify-between p-2">
                    <p class="flex flex-1 items-center text-sm">Kích thước màn hình</p>
                    <p class="flex flex-1 items-center text-sm">15.6 inches</p>
                  </div>
                  <div class="flex justify-between bg-[#f2f2f2] p-2">
                    <p class="flex flex-1 items-center text-sm">Công nghệ màn hình</p>
                    <p class="flex flex-1 items-center text-sm">IPS Panel, 144Hz</p>
                  </div>
                  <div class="flex justify-between p-2">
                    <p class="flex flex-1 items-center text-sm">Hệ điều hành</p>
                    <p class="flex flex-1 items-center text-sm">Windows 11 SL 64 Bit</p>
                  </div>
                  <div class="flex justify-between bg-[#f2f2f2] p-2">
                    <p class="flex flex-1 items-center text-sm">Độ phân giải màn hình</p>
                    <p class="flex flex-1 items-center text-sm">1920 x 1080 pixels (FullHD)</p>
                  </div>
                  <div class="flex justify-between p-2">
                    <p class="flex flex-1 items-center text-sm">Cổng giao tiếp</p>
                    <p class="flex flex-1 items-center text-sm">
                      1x Type C USB 3.2 Gen <br />
                      1 (Power Delivery/Display Port) 3x USB 3.2 Gen <br />
                      1 Type-A 1x 3.5mm Combo Audio<br />
                      Jack 1x HDMI 2.0b
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    <div class="hidden flex-[0.3] lg:flex"></div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: Base
</route>
