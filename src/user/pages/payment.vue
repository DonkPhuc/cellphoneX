<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { Products } from '~/home/dtos';

import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const { cart, currentProduct } = storeToRefs(userStore);

const router = useRouter();

const deliveryMode = ref('pickup');
const company = ref(false);
const step = ref(0);
const selectedPayment = ref(0);
const selectedPhoneNo = ref(0);
const selectedName = ref('');
const selectedEmail = ref('');
const selectedCity = ref('');
const selectedDistrict = ref('');
const selectedStore = ref('');
const selectedDeliveryAddress = ref('');
const orderNo = ref('');

const cityList = [
  {
    label: 'Hồ Chí Minh',
    value: 0,
  },
];
const storeList = [
  {
    label: '134 Nguyễn Thái Học, P. Phạm Ngũ Lão, Quận 1',
    value: 1,
  },
  {
    label: '218-221 Trần Quang Khải, Phường Tân Định, Quận 1',
    value: 1,
  },
  {
    label: '157-159 Nguyễn Thị Minh Khai, P. Phạm Ngũ Lão, Quận 1',
    value: 1,
  },
  {
    label: '55B Trần Quang Khải, P. Tân Định, Quận 1',
    value: 1,
  },
];
const districtList = [
  {
    label: 'Quận 1',
    value: 1,
  },
  {
    label: 'Quận 2',
    value: 2,
  },
  {
    label: 'Quận 3',
    value: 3,
  },
  {
    label: 'Quận 4',
    value: 4,
  },
  {
    label: 'Quận 5',
    value: 5,
  },
  {
    label: 'Quận 6',
    value: 6,
  },
  {
    label: 'Quận 7',
    value: 7,
  },
  {
    label: 'Quận 8',
    value: 8,
  },
  {
    label: 'Quận 9',
    value: 9,
  },
  {
    label: 'Quận 10',
    value: 10,
  },
  {
    label: 'Quận 11',
    value: 11,
  },
  {
    label: 'Quận 12',
    value: 12,
  },
  {
    label: 'Gò Vấp',
    value: 13,
  },
  {
    label: 'Tân Phú',
    value: 14,
  },
  {
    label: 'Phú Nhuận',
    value: 15,
  },
  {
    label: 'Tân Bình',
    value: 16,
  },
  {
    label: 'Bình Tân',
    value: 17,
  },
];

onMounted(() => {
  if (cart.value.length === 0) {
    router.push(`/`);
  }
  window.scrollTo(0, 0);
});

const styleSelectedPayment = computed(() => (index: number) => {
  if (selectedPayment.value === index) {
    return 'border-main border';
  }
  return '';
});

const filterDistrict = computed(() => {
  let value = 0;
  for (let index = 0; index < districtList.length; index++) {
    if (selectedDistrict.value === `Quận ${index}`) value = index;
  }
  const filtered = storeList.filter((item) => item.value === value);
  return filtered;
});

const totalCart = computed(() => {
  let total = 0;
  cart.value.forEach((element) => {
    total += Number(element.price * element.quality);
  });
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
});

async function goCart(go: string) {
  await router.push(`/${go}`);
}

function nextStep() {
  if (
    selectedName.value &&
    selectedPhoneNo.value &&
    validateEmail(selectedEmail.value) &&
    validatePhoneNumber(selectedPhoneNo.value) &&
    selectedCity.value &&
    selectedDistrict.value &&
    (selectedDeliveryAddress.value || selectedStore.value)
  )
    step.value++;
  generateRandomString(10);
}

function choosePayment(index: number) {
  selectedPayment.value = index;
}

function updateName(name: string) {
  selectedName.value = name;
}
function updatePhoneNo(phoneNo: number) {
  selectedPhoneNo.value = phoneNo;
}
function updateEmail(email: string) {
  selectedEmail.value = email;
}
function updateCity(city: number) {
  selectedCity.value = cityList[city].label;
}
function updateDistrict(district: number) {
  selectedDistrict.value = districtList[district - 1].label;
}
function updateStore(store: number) {
  selectedStore.value = storeList[store].label;
}
function updateDeliveryAddress(address: string) {
  selectedDeliveryAddress.value = address;
}

function generateRandomString(length: number) {
  orderNo.value = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    orderNo.value += characters.charAt(Math.floor(Math.random() * characters.length));
  }
}

function validatePhoneNumber(phoneNumber: number): boolean {
  const regex = /^0\d{9}$/;
  return regex.test(phoneNumber.toString());
}

function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
</script>

<template>
  <main class="flex">
    <div class="hidden flex-1 lg:flex"></div>

    <div class="flex flex-1 flex-col px-2 py-4">
      <div class="flex flex-1 flex-col gap-12">
        <div class="flex">
          <span class="flex cursor-pointer items-start font-bold text-main" @click="goCart('cart')"
            ><VIcon size="text-[20px]" icon="fa-angle-left" /> Trở về
          </span>
          <span class="flex flex-1 justify-center text-xl font-bold text-main">
            <p class="-ml-16">Giỏ hàng</p>
          </span>
        </div>

        <div class="flex flex-col">
          <div class="-mb-2 flex h-24 rounded-t-xl bg-red-100/50">
            <div class="flex flex-1 items-center justify-center">
              <div class="flex-col">
                <div
                  class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-main text-lg text-main"
                >
                  <VIcon icon="fa-shopping-cart" />
                </div>
                <p class="text-xs text-main">Chọn sản phẩm</p>
              </div>
            </div>
            <div class="flex flex-[0.2] items-center text-main">-----</div>
            <div class="flex flex-1 items-center justify-center">
              <div class="flex-col">
                <div
                  class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-main text-lg text-main"
                >
                  <VIcon icon="fa-address-card" />
                </div>
                <p class="text-xs text-main">Thông tin đặt hàng</p>
              </div>
            </div>
            <div class="flex flex-[0.2] items-center" :class="step > 0 ? 'text-main' : ''">-----</div>
            <div class="flex flex-1 items-center justify-center">
              <div class="flex-col">
                <div
                  :class="step > 0 ? '!border-main !text-main' : ''"
                  class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-black/40 text-lg text-black/40"
                >
                  <VIcon icon="fa-credit-card-alt" />
                </div>
                <p :class="step > 0 ? 'text-main' : ''" class="text-xs">Thanh toán</p>
              </div>
            </div>
            <div class="flex flex-[0.2] items-center">-----</div>
            <div class="flex flex-1 items-center justify-center">
              <div class="flex-col">
                <div
                  class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-black/40 text-lg text-black/40"
                >
                  <VIcon icon="fa-archive" />
                </div>
                <p class="text-xs">Hoàn tất đặt hàng</p>
              </div>
            </div>
          </div>

          <div v-if="step === 0" class="z-1 flex flex-col gap-3 rounded-2xl border bg-white p-2 shadow-xl">
            <VTitle title="Thông tin khách hàng" />
            <VInput
              :model="selectedName"
              placeholder="Họ và tên(bắc buộc)"
              input-class="rounded-lg !h-10"
              @update:model="updateName"
            />
            <VInput
              :model="selectedPhoneNo"
              :max-length="10"
              placeholder="Số điện thoại(bắt buộc)"
              input-class="rounded-lg !h-10"
              @update:model="updatePhoneNo"
            />
            <VInput
              :model="selectedEmail"
              placeholder="Email (Bắt buộc điền email để nhận hóa đơn VAT)"
              input-class="rounded-lg !h-10"
              @update:model="updateEmail"
            />
            <VTitle title="Chọn cách thức giao hàng" />
            <form class="flex items-center gap-2">
              <input
                id="pickup"
                v-model="deliveryMode"
                :checked="true"
                name="deliveryMode"
                class="text-main"
                type="radio"
                value="pickup"
              /><label for="pickup">Nhận tại cửa hàng </label>

              <input
                id="delivery"
                v-model="deliveryMode"
                name="deliveryMode"
                class="text-main"
                type="radio"
                value="delivery"
              /><label for="delivery">Giao hàng tận nơi </label>
            </form>
            <div class="flex flex-col gap-2 rounded-lg bg-gray-200/70 p-3">
              <div class="flex gap-2">
                <div class="flex-1">
                  <VSelect
                    :options="cityList"
                    input-class="rounded-xl"
                    placeholder="Thành phố/Tỉnh"
                    size="large"
                    @update:model="updateCity"
                  />
                </div>
                <div class="flex-1">
                  <VSelect
                    :options="districtList"
                    input-class="rounded-xl"
                    placeholder="Quận/Huyện"
                    size="large"
                    @update:model="updateDistrict"
                  />
                </div>
              </div>
              <div class="flex-1">
                <VSelect
                  v-if="deliveryMode === 'pickup'"
                  :options="filterDistrict"
                  input-class="rounded-xl"
                  placeholder="Chọn địa chỉ cửa hàng"
                  size="large"
                  @update:model="updateStore"
                />
                <VInput
                  v-else
                  input-class="rounded-xl !h-11"
                  size="large"
                  placeholder="Số nhà,tên đường"
                  @update:model="updateDeliveryAddress"
                />
              </div>
            </div>
            <VInput placeholder="Yêu cầu khác" input-class="rounded-lg !h-10" />
            <div class="flex items-center gap-2">
              <input id="company" v-model="company" class="text-main" type="checkbox" />
              <label class="cursor-pointer" for="company">
                Yêu cầu xuất hóa đơn công ty (Vui lòng điền email để nhận hoá đơn VAT)</label
              >
            </div>
            <p class="italic text-main/70">
              (Với đơn hàng trên 20 triệu vui lòng thanh toán chuyển khoản từ tài khoản công ty khi cần xuất VAT cho
              công ty)
            </p>
            <VInput v-if="company" placeholder="Tên công ty" input-class="rounded-lg !h-10" />
            <VInput v-if="company" placeholder="Địa chỉ công ty" input-class="rounded-lg !h-10" />
            <VInput v-if="company" placeholder="Mã số thuế" input-class="rounded-lg !h-10" />
          </div>

          <div v-if="step >= 1" class="z-1 flex flex-col gap-3 rounded-2xl border bg-white p-2 shadow-xl">
            <div class="flex flex-col gap-3 rounded-2xl border p-3 shadow-xl">
              <div class="flex justify-center">
                <VTitle title="THÔNG TIN ĐẶT HÀNG" />
              </div>
              <div class="flex gap-3">
                <VTitle title="Mã Đơn Hàng: " />
                <p>{{ orderNo }}</p>
              </div>
              <div class="flex gap-3">
                <VTitle title="Người Đặt: " />
                <p>{{ selectedName }}</p>
              </div>
              <div class="flex gap-3">
                <VTitle title="Số Điện Thoại: " />
                <p>{{ selectedPhoneNo }}</p>
              </div>
              <div class="flex gap-3">
                <VTitle title="Email: " />
                <p>{{ selectedEmail }}</p>
              </div>
              <div class="flex gap-3">
                <p>
                  <span class="font-bold">Nhận Sản Phẩm Tại: </span>{{ selectedDeliveryAddress || selectedStore }}
                  <span v-if="deliveryMode !== 'pickup'">{{ ', ' + selectedDistrict + ', ' + selectedCity }}</span>
                </p>
              </div>
              <div class="flex gap-3">
                <VTitle title="Tổng Tiền: " />
                <p class="font-bold text-main">{{ totalCart }}</p>
              </div>
            </div>

            <div class="flex p-4">
              <VTitle title="Chọn hình thức thanh toán" />
            </div>

            <div class="flex flex-col gap-3">
              <div class="flex gap-2">
                <div
                  class="flex flex-1 cursor-pointer justify-center rounded-xl border p-4 shadow-lg"
                  :class="styleSelectedPayment(1)"
                  @click="choosePayment(1)"
                >
                  <div class="flex-col">
                    <span class="text-xs font-bold">Thanh toán tại cửa hàng</span>
                    <img class="mx-auto" src="" alt="" />
                  </div>
                </div>
                <div
                  class="flex flex-1 cursor-pointer justify-center rounded-xl border p-4 shadow-lg"
                  :class="styleSelectedPayment(2)"
                  @click="choosePayment(2)"
                >
                  <div class="flex-col">
                    <span class="text-xs font-bold">Thanh toán chuyển khoản</span>
                    <img class="mx-auto" src="" alt="" />
                  </div>
                </div>
              </div>

              <div class="flex gap-2">
                <div
                  class="flex flex-1 cursor-pointer justify-center rounded-xl border p-4 shadow-lg"
                  :class="styleSelectedPayment(3)"
                  @click="choosePayment(3)"
                >
                  <div class="flex-col">
                    <span class="text-xs font-bold">Thanh toán tại cửa hàng</span>
                    <img class="mx-auto" src="" alt="" />
                  </div>
                </div>
                <div
                  class="flex flex-1 cursor-pointer justify-center rounded-xl border p-4 shadow-lg"
                  :class="styleSelectedPayment(4)"
                  @click="choosePayment(4)"
                >
                  <div class="flex-col">
                    <span class="text-xs font-bold">Thanh toán chuyển khoản</span>
                    <img class="mx-auto" src="" alt="" />
                  </div>
                </div>
              </div>

              <div class="flex gap-2">
                <div
                  class="flex flex-1 cursor-pointer justify-center rounded-xl border p-4 shadow-lg"
                  :class="styleSelectedPayment(5)"
                  @click="choosePayment(5)"
                >
                  <div class="flex-col">
                    <span class="text-xs font-bold">Thanh toán tại cửa hàng</span>
                    <img class="mx-auto" src="" alt="" />
                  </div>
                </div>
                <div
                  class="flex flex-1 cursor-pointer justify-center rounded-xl border p-4 shadow-lg"
                  :class="styleSelectedPayment(6)"
                  @click="choosePayment(6)"
                >
                  <div class="flex-col">
                    <span class="text-xs font-bold">Thanh toán chuyển khoản</span>
                    <img class="mx-auto" src="" alt="" />
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
            label="TIẾP TỤC"
            @click="nextStep"
          />
          <VButton
            variant="outlined"
            input-class="!h-16 w-full !border-main !text-main rounded hover:!bg-main/70 hover:!text-white !text-[16px] !font-bold active:bg-main/70"
            label="CHỌN THÊM SẢN PHẨM KHÁC"
            @click="goCart('')"
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
