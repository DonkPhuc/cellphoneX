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
const { isLoginSuccess, userFullName, favrouteList } = storeToRefs(userStore);

const router = useRouter();
const route = useRoute();

const loading = ref(false);
const data = ref<Customers>();
const dataOrders = ref<Orders[]>([]);
const dataOrder = ref<Orders>();
const editPassword = ref(false);
const editPhoneNo = ref(false);
const editEmail = ref(false);
const editName = ref(false);
const showPass = ref(false);
const open = ref(false);
const editedPassword = ref('');
const editedPhoneNo = ref('');
const editedEmail = ref('');
const editedName = ref('');
const selected = ref(0);
const selectedStatus = ref(0);
const totalDataOrders = ref(0);
const totalOrder = ref(0);
const totalOrderDiscount = ref(0);

const listMode = [
  {
    name: 'Trang chủ',
    icon: 'fa-home',
  },
  {
    name: 'Lịch sử mua hàng',
    icon: 'fa-align-justify',
  },
  {
    name: 'Tài khoản của bạn',
    icon: 'fa-user ',
  },
  {
    name: 'Yêu Thích',
    icon: 'fa-heart',
  },
];
const listStatusOrders = ['Tất cả', 'Chờ xác nhận', 'Đã xác nhận', 'Đang vận chuyển', 'Đã nhận hàng', 'Đã huỷ'];
const totalCart = computed(() => (total: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(total);
});
onMounted(async () => {
  initial();
  if (!isLoginSuccess.value) {
    router.push('/');
  }
  if (route.query.order) {
    selected.value = 1;
  }
});
watchEffect(async () => {
  if (selected.value === 10) {
    let id;
    if (route.query.order) {
      id = route.query.order.toString();
    }
    dataOrder.value = (await store.getOrders(id)) as Orders;

    totalOrder.value = 0;
    totalOrderDiscount.value = 0;

    dataOrder.value.items.forEach((element: Products) => {
      let total;
      let totalDis;
      total = (element.priceRRP - (element.priceRRP * element.discount) / 100) * element.quantity;
      totalDis = element.priceRRP * element.quantity;
      totalOrder.value += total;
      totalOrderDiscount.value += totalDis;
    });

    totalOrderDiscount.value = totalOrderDiscount.value - totalOrder.value;
  }
});

async function selectedMode(value: number) {
  selected.value = value;

  if (value === 4) {
    open.value = true;
  }
}
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
function logout() {
  isLoginSuccess.value = '';
  userFullName.value = '';
  router.push(`/`);
}
async function updateUser() {
  const nameRegex = /^[\p{L}\s'-]+$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+=[\]{}|\\:;"'<>,.?/]{8,}$/;

  let err = '';
  let rs;

  if (editPassword.value && !passwordRegex.test(editedPassword.value)) err = 'Mật khẩu ít nhất 8 kí tự';
  if (editName.value && !nameRegex.test(editedName.value)) err = 'Vui lòng nhập tên hợp lệ';
  if (editEmail.value && !emailRegex.test(editedEmail.value)) err = 'Vui lòng nhập email hợp lệ';

  if (editedName.value === '' && data.value) editedName.value = data.value?.userFullName;
  if (editedEmail.value === '' && data.value) editedEmail.value = data.value?.email;
  if (editedPassword.value === '' && data.value) editedPassword.value = data.value?.password;

  notifySignUp(err);

  if (err === '') {
    rs = await userStore.postUpdateUser(
      editedName.value,
      isLoginSuccess.value,
      editedEmail.value,
      editedPassword.value,
      isLoginSuccess.value
    );
  }

  if (rs === 'Updated successfully!') {
    notifySignUp('Cập nhật tài khoản thành công!', 'success');
    initial();
  } else {
    notifySignUp('Có lỗi xảy ra!');
  }
}

async function initial() {
  loading.value = true;

  const result = await userStore.getCustomer(isLoginSuccess.value);

  dataOrders.value = result.orders;

  dataOrders.value.forEach((element) => {
    totalDataOrders.value += element.orderTotal;
  });

  data.value = result;

  editedPassword.value = '';
  editedPhoneNo.value = '';
  editedEmail.value = '';
  editedName.value = '';

  editPassword.value = false;
  editPhoneNo.value = false;
  editEmail.value = false;
  editName.value = false;
  showPass.value = false;

  userFullName.value = data.value.userFullName;

  loading.value = false;
}

function selectedStatusOrders(index: number) {
  selectedStatus.value = index;
}

async function unFavrouteList(id: string) {
  const result = await userStore.postDelToFavourite(isLoginSuccess.value, id);
  if (result === 'successfully') {
    await userStore.getCustomer(isLoginSuccess.value);
  }
}

const formatVND = computed(() => (slide: number) => {
  let result = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(slide);

  return result;
});
</script>

<template>
  <div v-if="loading" class="fixed flex h-full w-full items-center justify-center bg-main/10">
    <VSpinner size="large" />
  </div>

  <main class="flex">
    <div class="hidden flex-1 lg:flex"></div>

    <div class="flex flex-[4] gap-4 p-4">
      <div class="flex flex-[0.5] flex-col gap-4 rounded-lg bg-[#f8fbfc] p-4 md:flex-1">
        <div
          v-for="(item, index) in listMode"
          :key="item.name"
          class="cursor-pointer rounded-xl border border-[#f8fbfc] p-2"
          :class="selected === index ? '!border-main bg-main/10 text-main' : ''"
          @click="selectedMode(index)"
        >
          <div class="flex items-center justify-start gap-2">
            <VIcon size="text-xl" :icon="item.icon" />
            <span class="hidden truncate sm:flex">
              {{ item.name }}
            </span>
          </div>
        </div>
        <div
          v-if="data?.role === 'admin'"
          class="cursor-pointer rounded-xl border border-[#f8fbfc] p-2"
          @click="router.push('/dashboard')"
        >
          <div class="flex items-center justify-start gap-2">
            <VIcon size="text-xl" icon="fa-dashboard " />
            <span class="hidden truncate sm:flex">Quản lý </span>
          </div>
        </div>
        <div class="cursor-pointer rounded-xl border border-[#f8fbfc] p-2" @click="open = true">
          <div class="flex items-center justify-start gap-2">
            <VIcon size="text-xl" icon="fa-sign-out" />
            <span class="hidden truncate sm:flex">Thoát tài khoản </span>
          </div>
        </div>
        <VDialog :is-open="open" @close="open = false">
          <template #title>
            <div class="flex items-center gap-2">
              <img
                class="h-10 w-10"
                src="https://cdn2.cellphones.com.vn/213x213,webp,q100/media/wysiwyg/Shipper_CPS.jpg"
                alt=""
              />
            </div>
          </template>
          <template #detail>
            <p class="w-[350px] text-center font-bold">Bạn có chắc chắn muốn đăng xuất ?</p>
          </template>
          <template #action>
            <div class="mb-5 flex justify-between gap-2">
              <VButton input-class="w-36 ring-0" size="large" label="Đống ý" @click="logout" />
              <VButton
                input-class="w-36 ring-0"
                size="large"
                variant="outlined"
                class="w-20"
                label="Hủy bỏ"
                @click="open = false"
              />
            </div>
          </template>
        </VDialog>
      </div>

      <template v-if="selected === 0">
        <div class="flex flex-[4] gap-4 rounded-lg">
          <div class="flex flex-1 flex-col gap-4">
            <div class="flex flex-col gap-4 md:flex-row">
              <div class="flex-1 rounded-lg border p-4">
                <div class="flex flex-col">
                  <div class="flex flex-col items-center justify-center gap-2">
                    <div class="h-14 w-14 rounded-full border border-black/20">
                      <span
                        class="flex h-full items-center justify-center p-2 text-center text-3xl font-bold text-white"
                        ><img src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.0251fdd.png" alt=""
                      /></span>
                    </div>
                    <span class="text-black">Xin chào</span>
                    <span class="font-bold uppercase text-main">{{ isLoginSuccess }}</span>
                    <div class="flex w-full flex-1">
                      <div class="flex flex-1 flex-col items-center gap-2 text-center">
                        <span>Ngày tham gia</span>
                        <VIcon size="text-main text-[60px]" icon="fa-calendar-check-o" />
                        <span>1/5/2023</span>
                      </div>
                      <div class="flex flex-1 flex-col items-center gap-2 text-center">
                        <span>Hạng thành viên</span>
                        <VIcon size="text-main text-[60px]" icon=" fa-certificate" />
                        <span>{{ data?.role }}</span>
                      </div>
                      <div class="flex flex-1 flex-col items-center gap-2 text-center">
                        <span>Điểm tích lũy</span>
                        <VIcon size="text-main text-[60px]" icon="fa-bitcoin" />
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex-1 rounded-lg border bg-[#fef5f0] p-4 pt-8">
                <div class="flex flex-col items-center gap-4">
                  <div class="h-14 w-14 rounded-full border border-black/20 bg-[#89c1f5]">
                    <span class="flex h-full items-center justify-center text-center text-3xl font-bold text-white">
                      <VIcon size="text-main" icon="fa-heart" />
                    </span>
                  </div>
                  <span class="text-2xl font-medium text-main"> Danh sách yêu thích </span>
                  <span class="text-xl"> 0 Sản Phẩm </span>
                  <span
                    class="cursor-not-allowed rounded-3xl border bg-white px-10 py-2 font-bold text-main underline hover:bg-main/10"
                  >
                    Xem chi tiết
                  </span>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-4 md:flex-row">
              <div class="flex-1 rounded-lg border bg-[#fef5f0] p-4">
                <div class="flex flex-col items-center gap-4">
                  <div class="h-14 w-14 rounded-full border border-black/20 bg-[#fff7ca] p-2">
                    <span class="flex h-full items-center justify-center text-center text-3xl font-bold text-white"
                      ><img src="https://cellphones.com.vn/smember/_nuxt/img/gift-box(1)1.ad696df.png" alt=""
                    /></span>
                  </div>
                  <span class="text-2xl font-medium text-main"> Ưu đãi của bạn </span>
                  <span class="text-xl"> 0 Sản Phẩm </span>
                  <span
                    class="cursor-not-allowed rounded-3xl border bg-white px-10 py-2 font-bold text-main underline hover:bg-main/10"
                  >
                    Xem chi tiết
                  </span>
                </div>
              </div>

              <div class="flex-1 rounded-lg border bg-[#edf1fd] p-4">
                <div class="flex flex-col items-center gap-4">
                  <div class="h-14 w-14 rounded-full border border-black/20 bg-[#fff7ca]">
                    <span class="flex h-full items-center justify-center p-2 text-center text-3xl font-bold text-white">
                      <img src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS%203.1905116.png" alt=""
                    /></span>
                  </div>
                  <span class="text-2xl font-medium text-main"> Đơn hàng của bạn </span>
                  <span class="text-xl"> {{ dataOrders.length }} đơn hàng </span>
                  <span
                    class="cursor-pointer rounded-3xl border bg-white px-10 py-2 font-bold text-main underline hover:bg-main/10"
                    @click="selected = 1"
                  >
                    Xem chi tiết
                  </span>
                </div>
              </div>

              <div class="flex-1 rounded-lg border bg-[#f1f8fe] p-4">
                <div class="flex flex-col items-center gap-4">
                  <div class="h-14 w-14 rounded-full border border-black/20 bg-[#89c1f5]">
                    <span class="flex h-full items-center justify-center p-2 text-center text-3xl font-bold text-white">
                      <img src="https://cellphones.com.vn/smember/_nuxt/img/crown.d2de999.png" alt=""
                    /></span>
                  </div>
                  <span class="text-2xl font-medium text-main"> Hạng thành viên </span>
                  <span class="text-xl"> {{ data?.role }}</span>
                  <span
                    class="cursor-not-allowed rounded-3xl border bg-white px-10 py-2 font-bold text-main underline hover:bg-main/10"
                  >
                    Xem chi tiết
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="selected === 1">
        <div class="flex flex-[4] gap-4 rounded-lg">
          <div class="flex w-full flex-col gap-4">
            <div class="flex w-full flex-col items-center justify-center">
              <span class="text-2xl font-bold text-main">QUẢN LÝ ĐƠN HÀNG</span>
              <span class="text-center text-main">(Chi tiết đơn hàng, tra cứu hoá đơn VAT)</span>
            </div>

            <div class="flex flex-1 justify-center gap-12">
              <div class="flex flex-col">
                <img
                  class="mx-auto h-10 w-10"
                  src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS%203.1905116.png"
                  alt=""
                />
                <span class="text-center font-bold">{{ dataOrders.length }} đơn hàng</span>
              </div>

              <div class="flex flex-col">
                <img
                  class="mx-auto h-10 w-10"
                  src="https://cellphones.com.vn/smember/_nuxt/img/badge%202%20(1).72cc484.png"
                  alt=""
                />
                <span class="text-center font-bold"
                  >Đã mua <br />
                  {{ totalCart(totalDataOrders) }}</span
                >
              </div>
            </div>

            <div class="hidden items-center justify-around gap-4 md:flex">
              <span
                v-for="(item, index) in listStatusOrders"
                :key="item"
                class="cursor-pointer"
                :class="selectedStatus === index ? 'text-main' : 'text-black'"
                @click="selectedStatusOrders(index)"
                >{{ item }}</span
              >
              <div class="rounded-2xl border p-1 px-2">
                <VIcon icon="fa-calendar-o" /> {{ new Date().toISOString().substring(0, 10) }}
              </div>
            </div>

            <div class="hidden justify-around gap-4 rounded-2xl border p-2 md:flex">
              <span class="flex flex-1 justify-center">Sản phẩm</span>
              <span class="flex flex-1 justify-center">Tình trạng</span>
              <span class="flex flex-1 justify-center">Tổng tiền</span>
              <span class="flex flex-1 justify-center"></span>
            </div>

            <div v-if="dataOrders.length < 1" class="flex flex-1">
              <span class="w-full text-center text-xl">Không có đơn hàng nào phù hợp <VIcon icon="fa-meh-o" /> </span>
            </div>

            <div v-else class="flex flex-1">
              <div class="flex w-full flex-col">
                <div
                  v-for="(item, index) in dataOrders"
                  :key="index"
                  class="flex flex-1 flex-col items-center gap-4 border-b-2 py-4 md:flex-row md:justify-around"
                >
                  <div class="flex w-full flex-1 flex-col gap-2">
                    <div class="flex gap-2">
                      <img class="h-20 w-20" alt="" :src="dataOrders[index].items[0].imageLink" />
                      <span class="flex-1 cursor-pointer font-bold hover:text-main hover:underline">{{
                        dataOrders[index].items[0].name
                      }}</span>
                    </div>
                    <span v-if="dataOrders[index].items.length - 1 !== 0" class="text-center text-xs"
                      >và {{ dataOrders[index].items.length - 1 }} sản phẩm khác</span
                    >
                  </div>
                  <div class="flex flex-1 justify-center">
                    <span
                      class="rounded-2xl bg-gray-100 px-8 py-2 text-center text-xs font-bold uppercase text-black/80 md:w-1/2 md:px-2"
                    >
                      {{ dataOrders[index].status }}
                    </span>
                  </div>

                  <div class="flex flex-1 justify-center font-bold text-main">
                    {{ totalCart(dataOrders[index].orderTotal) }}
                  </div>
                  <div class="flex flex-1 justify-center">
                    <VButton
                      label="xem chi tiết"
                      input-class="rounded-2xl"
                      @click="$router.push(`/account?order=${dataOrders[index]._id}`), (selected = 10)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="selected === 2">
        <div class="flex w-full flex-col items-center gap-4 md:pl-4">
          <img class="h-20 w-20" src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.0251fdd.png" alt="" />
          <span class="font-bold">{{ isLoginSuccess }}</span>

          <div class="flex w-full">
            <input
              v-model="editedName"
              type="text"
              :disabled="!editName"
              :placeholder="`Họ và tên : ${data?.userFullName}`"
              class="w-full rounded-lg border-gray-100 bg-gray-200/30"
              :class="editName ? 'bg-sky-100' : ''"
            />
            <div class="relative right-8 my-auto cursor-pointer" @click="editName = true">
              <VIcon icon="fa-edit" />
            </div>
          </div>

          <div class="flex w-full">
            <input
              v-model="editedEmail"
              type="text"
              :disabled="!editEmail"
              :placeholder="`Email : ${data?.email}`"
              class="w-full rounded-lg border-gray-100 bg-gray-200/30"
              :class="editEmail ? 'bg-sky-100' : ''"
            />
            <div class="relative right-8 my-auto cursor-pointer" @click="editEmail = true">
              <VIcon icon="fa-edit" />
            </div>
          </div>

          <div class="flex w-full">
            <input
              v-model="editedPhoneNo"
              type="text"
              :disabled="!editPhoneNo"
              :placeholder="`Số điện thoại : ${data?.username}`"
              class="w-[95%] rounded-lg border-gray-100 bg-gray-200/30 lg:w-[98%]"
              :class="editPhoneNo ? 'bg-sky-100' : ''"
            />
            <div v-if="editPhoneNo" class="relative right-8 my-auto cursor-pointer" @click="editPhoneNo = true">
              <VIcon icon="fa-edit" />
            </div>
          </div>

          <div class="flex w-full">
            <input
              type="text"
              :disabled="true"
              :placeholder="`Ngày tham gia : ${data?.create.substring(0, 10)}`"
              class="w-[95%] rounded-lg border-gray-100 bg-gray-200/30 lg:w-[98%]"
            />
          </div>

          <div class="flex w-full" @click="editPassword = true">
            <input
              v-model="editedPassword"
              :type="showPass ? 'text' : 'password'"
              :disabled="!editPassword"
              :class="editPassword ? 'bg-sky-100' : ''"
              :placeholder="!editPassword ? 'Đổi mật khẩu' : 'Nhập mật khẩu'"
              class="w-[95%] cursor-pointer rounded-lg border-gray-100 bg-gray-200/30 lg:w-[98%]"
            />
            <div v-if="editPassword" class="relative right-8 my-auto cursor-pointer" @click="showPass = !showPass">
              <VIcon :icon="!showPass ? 'fa-eye' : 'fa-eye-slash'" />
            </div>
          </div>

          <VButton
            :disabled="!editEmail && !editName && !editPassword"
            label="Cập Nhật Thông Tin"
            input-class="rounded-3xl font-bold p-5"
            @click="updateUser"
          />
        </div>
      </template>
      <template v-if="selected === 3">
        <div class="flex flex-[4] gap-4 rounded-lg">
          <template v-if="favrouteList.length > 0">
            <div class="flex flex-1 flex-wrap gap-4">
              <div
                v-for="(item, index) in (favrouteList as Products[])"
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
                  <p class="font-bold text-red-500">
                    {{ formatVND(item.priceRRP - (item.priceRRP * item.discount) / 100) }}
                  </p>
                  <p class="flex items-center text-[14px] font-semibold text-gray-500 line-through">
                    {{ formatVND(item.priceRRP) }}
                  </p>
                </div>

                <div class="-mt-2 flex justify-center">
                  <VButton label="Bỏ yêu thích" @click="unFavrouteList(item._id)" />
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex w-full flex-col items-center gap-4">
              <div class="flex justify-center pt-20">
                <VIcon size="text-[80px]" icon="fa-smile-o" />
              </div>

              <div class="flex justify-center">
                <p class="px-4 text-center text-xl">Không có sản phẩm yêu thích, vui lòng quay lại</p>
              </div>

              <div class="flex justify-center">
                <VButton
                  input-class="!h-10 w-44 !bg-main border-none rounded-lg"
                  label="Quay lại trang chủ"
                  @click="router.push('/')"
                />
              </div>
            </div>
          </template>
        </div>
      </template>

      <template v-if="selected === 10 && dataOrder">
        <div class="flex w-full flex-col gap-4 md:pl-4">
          <div class="flex flex-col gap-2">
            <div class="flex cursor-pointer items-center gap-2" @click="selected = 1">
              <VIcon size="text-xl" icon="fa-arrow-left" />
              <VTitle title="Chi tiết đơn hàng" />
            </div>
            <span class="font-bold">Mã đơn hàng: {{ dataOrder.orderNumber }} - {{ dataOrder.status }}</span>
            <span>{{ dataOrder.orderDate.toString().substring(0, 10) }}</span>

            <div class="flex flex-col rounded-2xl border p-4">
              <div
                v-for="(item, index) in dataOrder.items"
                :key="index"
                class="flex flex-col gap-4 border-b py-4 md:flex-row"
              >
                <img class="h-28 w-28" :src="item.imageLink" alt="" />
                <div class="flex flex-col justify-between">
                  <div class="flex flex-col">
                    <span class="font-bold">{{ item.name }}</span>
                    <span class="text-xs font-semibold">Số lượng : {{ item.quantity }}</span>
                  </div>
                  <span class="flex items-center gap-4">
                    <p class="font-bold text-main">
                      {{ totalCart((item.priceRRP - (item.priceRRP * item.discount) / 100) * item.quantity) }}
                    </p>
                    <p class="text-xs line-through">
                      {{ totalCart(item.priceRRP * item.quantity) }}
                    </p></span
                  >
                </div>
              </div>
              <!-- <div class="flex justify-end">
                <span class="font-bold text-main">Tổng giá trị đơn hàng: {{ totalCart(totalOrder) }}</span>
              </div> -->
            </div>

            <div class="flex flex-col gap-2 rounded-2xl border p-4">
              <div class="flex items-center gap-4">
                <img
                  class="h-8 w-8"
                  src="https://cellphones.com.vn/smember/_nuxt/img/badge%202%20(1).72cc484.png"
                  alt=""
                />
                <VTitle title="Thông tin đơn hàng" />
              </div>
              <div class="flex items-center justify-between gap-4">
                <p>Địa chỉ giao hàng:</p>
                <p class="text-right font-bold text-main">
                  {{
                    dataOrder.orderDelivery === 'pickup'
                      ? 'Store (Pickup) : ' + dataOrder.orderAddress
                      : dataOrder.orderAddress
                  }}
                </p>
              </div>
              <div class="flex items-center justify-between gap-4">
                <p>Tổng tiền đơn hàng:</p>
                <p class="text-right font-bold text-main">{{ totalCart(totalOrder + totalOrderDiscount) }}</p>
              </div>
              <div class="flex items-center justify-between gap-4">
                <p>Tổng giảm giá:</p>
                <p class="text-right font-bold text-main line-through">{{ totalCart(totalOrderDiscount) }}</p>
              </div>
              <div class="flex items-center justify-between gap-4">
                <p>Phí vận chuyển:</p>
                <p class="text-right font-bold text-main">
                  {{ dataOrder.orderDelivery === 'pickup' ? 'Miễn Phí' : totalCart(30000) }}
                </p>
              </div>
              <div class="flex items-center justify-between gap-4">
                <p>Tổng tiền :</p>
                <p class="text-right font-bold text-main">{{ totalCart(totalOrder + 30000) }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="hidden flex-1 lg:flex"></div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: Base
</route>

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
