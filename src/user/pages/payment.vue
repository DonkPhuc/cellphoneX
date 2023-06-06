<script setup lang="ts">
import 'vue3-toastify/dist/index.css';

import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';

import { Orders, Products } from '~/home/dtos';
import { useStore } from '~/home/stores/Store';
import { Customers } from '~/user/dtos/Customers.dto';

import { useUserStore } from '../stores/user';
const userStore = useUserStore();
const store = useStore();
const { isLoginSuccess } = storeToRefs(userStore);

const router = useRouter();

const cart = ref<Products[]>([]);
const deliveryMode = ref('pickup');
const company = ref(false);
const step = ref(0);
const selectedPayment = ref(0);
const selectedPhoneNo = ref('');
const selectedName = ref('');
const selectedEmail = ref('');
const selectedCity = ref('');
const selectedDistrict = ref('');
const selectedStore = ref('');
const selectedDeliveryAddress = ref('');
const orderNo = ref('');
let total = 0;
const paymentList = [
  {
    label: 'Thanh toán tại cửa hàng',
    value: 1,
    icon: 'fa-home',
    disable: false,
  },
  {
    label: 'Chuyển khoản',
    value: 3,
    icon: 'fa-bank',
    disable: true,
  },
  {
    label: 'Thanh toán VISA',
    value: 4,
    icon: 'fa-cc-visa',
    disable: true,
  },
  {
    label: 'Thanh toán Paypal',
    value: 5,
    icon: 'fa-cc-paypal',
    disable: true,
  },
];
const cityList = [
  {
    label: 'Hồ Chí Minh',
    value: 0,
  },
];
const storeList = [
  {
    label: '134 Nguyễn Thái Học, P. Phạm Ngũ Lão, Quận 1',
    value: 0,
  },
  {
    label: '218-221 Trần Quang Khải, Phường Tân Định, Quận 1',
    value: 1,
  },
  {
    label: '157-159 Nguyễn Thị Minh Khai, P. Phạm Ngũ Lão, Quận 1',
    value: 2,
  },
  {
    label: '55B Trần Quang Khải, P. Tân Định, Quận 1',
    value: 3,
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
onMounted(async () => {
  const result = (await userStore.getCustomer(isLoginSuccess.value)) as Customers;
  if (result) {
    cart.value = result.cart;
    cart.value.forEach((e) => {
      e.price = e.priceRRP - e.priceRRP * (e.discount / 100);
    });

    selectedEmail.value = result.email;
    selectedPhoneNo.value = result.username;
    selectedName.value = result.userFullName;

    if (totalCart.value === '0 ₫') {
      router.push(`/`);
    }
  }
  window.scrollTo(0, 0);
});
const notifySignUp = (error?: string, type?: string) => {
  if (type && type === 'success') {
    if (error !== '') {
      toast.success(`${error}`, {});
    }
  } else {
    if (error !== '') {
      toast.error(`${error}`, {});
    }
  }
};
const styleSelectedPayment = computed(() => (index: number) => {
  if (selectedPayment.value === index) {
    return 'border-main border text-main';
  }
  return '';
});

const filterDistrict = computed(() => {
  if (selectedDistrict.value === `Quận 1`) return storeList;
});

const totalCart = computed(() => {
  cart.value.forEach((element) => {
    total += Number(element.price * element.quantity);
  });
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(total);
});

async function goCart(go: string) {
  await router.push(`/${go}`);
}

async function nextStep() {
  let errorMessage = '';

  if (step.value === 0) {
    generateRandomString(10);
    if (deliveryMode.value === 'delivery' && !selectedDeliveryAddress.value) errorMessage = 'Vui lòng chọn địa chỉ';
    if (deliveryMode.value === 'pickup' && !selectedStore.value) errorMessage = 'Vui lòng chọn địa chỉ';
    if (!selectedDistrict.value) errorMessage = 'Vui lòng chọn quận,huyện';
    if (!selectedCity.value) errorMessage = 'Vui lòng chọn thành phố';
    if (!validateName(selectedName.value)) errorMessage = 'Sai định dạng họ tên';
    if (!validateEmail(selectedEmail.value)) errorMessage = 'Sai định dạng email';
    if (!validatePhoneNumber(selectedPhoneNo.value)) errorMessage = 'Sai định dạng SĐT';
    if (!selectedPhoneNo.value) errorMessage = 'Vui lòng nhập SĐT';
    if (!selectedName.value) errorMessage = 'Vui lòng nhập họ tên';
    if (errorMessage === '') {
      step.value = 1;
    }
    notifySignUp(errorMessage);
  }

  if (step.value === 1) {
    if (selectedPayment.value === 0) {
      notifySignUp('Vui lòng chọn phương thức thanh toán');
    } else {
      step.value = 2;

      const params = {
        items: cart.value as [],
        status: 'unpaid',
        orderTotal: total,
        orderAddress:
          deliveryMode.value !== 'pickup'
            ? selectedDeliveryAddress.value + ', ' + selectedDistrict.value + ' ,' + selectedCity.value
            : selectedStore.value + ', ' + selectedCity.value,
        customerUserName: isLoginSuccess.value,
        orderDelivery: deliveryMode.value,
        customerName: selectedName.value,
        orderNumber: orderNo.value,
      } as any;

      if (total > 0) {
        const rs = await store.postAddOrder(params);
        if (rs === 'successfully') {
          notifySignUp('Đơn hàng thành công!', 'success');
          cart.value.forEach((element) => {
            remove(element._id);
          });
        } else {
          notifySignUp('Có lỗi xảy ra,vui lòng thử lại');
        }
      } else {
        notifySignUp('Có lỗi xảy ra,vui lòng thử lại');
      }
    }
  }
}
async function remove(id: string) {
  await store.postRemoveCart(isLoginSuccess.value, id);
}
function choosePayment(index: number) {
  selectedPayment.value = index + 1;
}
function updateName(name: string) {
  selectedName.value = name;
}
function updatePhoneNo(phoneNo: string) {
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
function validatePhoneNumber(phoneNumber: string): boolean {
  const regex = /^0\d{9}$/;
  return regex.test(phoneNumber.toString());
}
function validateEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
function validateName(name: string): boolean {
  const regex = /[\w]{2,}/g;
  return regex.test(name);
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
                <p class="text-center text-xs text-main">Chọn sản phẩm</p>
              </div>
            </div>
            <div class="flex flex-[0.2] items-center text-main">---</div>
            <div class="flex flex-1 items-center justify-center">
              <div class="flex-col">
                <div
                  class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-main text-lg text-main"
                >
                  <VIcon icon="fa-address-card" />
                </div>
                <p class="text-center text-xs text-main">Thông tin đặt hàng</p>
              </div>
            </div>
            <div class="flex flex-[0.2] items-center" :class="step > 0 ? 'text-main' : ''">---</div>
            <div class="flex flex-1 items-center justify-center">
              <div class="flex-col">
                <div
                  :class="step > 0 ? '!border-main !text-main' : ''"
                  class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-black/40 text-lg text-black/40"
                >
                  <VIcon icon="fa-credit-card-alt" />
                </div>
                <p :class="step > 0 ? 'text-main' : ''" class="text-center text-xs">Thanh toán</p>
              </div>
            </div>
            <div class="flex flex-[0.2] items-center" :class="step > 1 ? 'text-main' : ''">---</div>
            <div class="flex flex-1 items-center justify-center">
              <div class="flex-col">
                <div
                  :class="step > 1 ? '!border-main !text-main' : ''"
                  class="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-black/40 text-lg text-black/40"
                >
                  <VIcon icon="fa-archive" />
                </div>
                <p class="text-center text-xs" :class="step > 1 ? 'text-main' : ''">Hoàn tất đặt hàng</p>
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

          <div v-if="step === 1" class="z-1 flex flex-col gap-3 rounded-2xl border bg-white p-2 shadow-xl">
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

            <div class="flex flex-wrap gap-2">
              <div
                v-for="(item, index) in paymentList"
                :key="index"
                :disabled="item.disable"
                class="flex basis-[99%] cursor-pointer justify-center gap-2 rounded-xl border p-4 shadow-lg sm:basis-[49%]"
                :class="styleSelectedPayment(index + 1)"
                @click="choosePayment(index)"
              >
                <VIcon :icon="item.icon" />
                <span class="text-xs font-bold">{{ item.label }}</span>
              </div>
            </div>
          </div>

          <div v-if="step === 2" class="z-1 flex flex-col gap-6 rounded-2xl border bg-white p-2 shadow-xl">
            <div class="flex">
              <p>
                Cảm ơn Quý khách hàng đã chọn mua hàng tại CellphoneS. Trong 15 phút, CellphoneS sẽ SMS hoặc gọi để xác
                nhận đơn hàng.
                <br />
                * Các đơn hàng từ 21h30 tối tới 8h sáng hôm sau. CellphoneS sẽ liên hệ với Quý khách trước 10h trưa cùng
                ngày
              </p>
            </div>
            <div class="flex flex-col gap-3 rounded-2xl border bg-[#E4EDDA] p-3 shadow-xl">
              <div class="flex flex-col gap-2 text-lg">
                <div class="flex justify-center">
                  <span class="!text-lg font-bold !text-[#155724]">ĐẶT HÀNG THÀNH CÔNG</span>
                </div>
                <span>
                  Mã Đơn Hàng:<span class="!text-lg font-bold !text-[#155724]">
                    {{ orderNo }}
                  </span></span
                >
                <span>
                  Người Đặt:
                  <span class="!text-lg font-bold !text-[#155724]">
                    {{ selectedName }}
                  </span></span
                >
                <span>
                  Số Điện Thoại:
                  <span class="!text-lg font-bold !text-[#155724]">
                    {{ selectedPhoneNo }}
                  </span></span
                >
                <span>
                  Nhận Sản Phẩm Tại:
                  <span class="!text-lg font-bold !text-[#155724]">
                    {{
                      deliveryMode !== 'pickup'
                        ? selectedDeliveryAddress + ', ' + selectedDistrict + ', ' + selectedCity
                        : selectedStore + ', ' + selectedCity
                    }}
                  </span></span
                >
                <span>
                  Hình Thức Thanh Toán:<span class="!text-lg font-bold !text-[#155724]">
                    {{ paymentList[selectedPayment - 1].label }}
                  </span></span
                >
                <span>
                  Tổng Tiền:
                  <span class="!text-lg font-bold !text-[#155724]">
                    {{ totalCart }}
                  </span></span
                >
              </div>
            </div>
            <div class="flex flex-col gap-3 rounded-2xl border px-5 py-3 shadow-xl">
              <div v-for="item in cart" :key="item._id" class="flex gap-4 border-b-2">
                <img :src="item.imageLink" class="h-24 w-24" alt="" />
                <div class="flex flex-col">
                  <p class="text-lg font-bold">{{ item.name }}</p>
                  <span class="flex gap-1">
                    Giá:
                    <span class="font-bold"
                      >{{ Math.round(item.priceRRP - (item.priceRRP * item.discount) / 100) }}₫</span
                    >
                    <span class="font-gray-400 line-through">{{ item.priceRRP }}₫</span>
                  </span>
                  <p class="">
                    Số lượng: <span class="font-bold">{{ item.quantity }}</span>
                  </p>
                  <p class="">
                    Tổng tiền:
                    <span class="font-bold">
                      {{ Math.round((item.priceRRP - (item.priceRRP * item.discount) / 100) * item.quantity) }}
                      ₫
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-col justify-center gap-4">
              <div class="flex gap-2">
                <VButton
                  input-class="!h-16 w-full !font-bold !bg-[#007BFF] !text-white border-none !rounded-xl text-[16px] !font-bold"
                  label="Kiểm tra đơn hàng "
                  @click="$router.push('/account?order=true')"
                />
                <VButton
                  input-class="!h-16 w-full !font-bold !border-main !text-white !rounded-xl !bg-main"
                  label="Tiếp tục mua hàng "
                  @click="router.push(`/`)"
                />
              </div>

              <VButton
                input-class="!border-none !text-white !font-bold  w-full bg-[#28A745] !h-10 !rounded-xl !text-main"
                label="Góp ý về trải nghiệm trong việc đặt hàng và thanh toán"
              />
            </div>
          </div>
        </div>

        <div v-if="step !== 2" class="flex flex-col justify-center gap-4 rounded-lg border p-2 shadow-lg">
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
