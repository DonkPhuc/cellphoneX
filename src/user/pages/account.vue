<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { Products } from '~/home/dtos';
import { useStore } from '~/home/stores/Store';
import { Customers } from '~/user/dtos/Customers.dto';

import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const store = useStore();
const { isLoginSuccess } = storeToRefs(userStore);

const router = useRouter();
const selected = ref(0);
const open = ref(false);
const data = ref<Customers>();
const editName = ref(false);
const editPhoneNo = ref(false);

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
];

onMounted(async () => {
  const result = (await userStore.getCustomer(isLoginSuccess.value)) as Customers[];

  data.value = result[0];
  console.log('🚀 ~ file: account.vue:38 ~ onMounted ~  data.value:', data.value.role);
  if (!isLoginSuccess.value) {
    router.push('/');
  }
});
function selectedMode(value: number) {
  selected.value = value;
  if (value === 3) {
    open.value = true;
  }
}
function logout() {
  isLoginSuccess.value = '';
  router.push(`/`);
}
function updateUser() {
  console.log('update');
}
</script>

<template>
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
          <div class="flex items-center justify-center gap-2 md:justify-start">
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
          <div class="flex items-center justify-center gap-2 md:justify-start">
            <VIcon size="text-xl" icon="fa-dashboard " />
            <span class="hidden truncate sm:flex">Quản lý </span>
          </div>
        </div>
        <div class="cursor-pointer rounded-xl border border-[#f8fbfc] p-2" @click="open = true">
          <div class="flex items-center justify-center gap-2 md:justify-start">
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

      <template v-if="selected === 0 || selected === 1">
        <div class="flex flex-[4] gap-4 rounded-lg">
          <div class="flex flex-1 flex-col gap-4">
            <div class="flex flex-col gap-4 md:flex-row">
              <div class="flex-1 rounded-lg border p-4">
                <div class="flex flex-col">
                  <div class="flex flex-col items-center justify-center gap-2">
                    <div class="h-14 w-14 rounded-full border border-black/20 bg-main/80">
                      <span class="flex h-full items-center justify-center text-center text-3xl font-bold text-white"
                        >P</span
                      >
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
                        <span>Người dùng</span>
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

              <div class="flex-1 rounded-lg border bg-[#fef5f0] p-4">
                <div class="flex flex-col items-center gap-4">
                  <div class="h-14 w-14 rounded-full border border-black/20 bg-main/80">
                    <span class="flex h-full items-center justify-center text-center text-3xl font-bold text-white"
                      >P</span
                    >
                  </div>
                  <span class="text-2xl font-medium text-main"> Danh sách yêu thích </span>
                  <span class="text-xl"> 0 Sản Phẩm </span>
                  <span class="cursor-pointer font-bold text-main underline"> Xem chi tiết </span>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-4 md:flex-row">
              <div class="flex-1 rounded-lg border p-4">
                <div class="flex flex-col items-center gap-4">
                  <div class="h-14 w-14 rounded-full border border-black/20 bg-main/80">
                    <span class="flex h-full items-center justify-center text-center text-3xl font-bold text-white"
                      >P</span
                    >
                  </div>
                  <span class="text-2xl font-medium text-main"> Danh sách yêu thích </span>
                  <span class="text-xl"> 0 Sản Phẩm </span>
                  <span
                    class="cursor-pointer rounded-3xl border px-10 py-2 font-bold text-main underline hover:bg-main/10"
                  >
                    Xem chi tiết
                  </span>
                </div>
              </div>

              <div class="flex-1 rounded-lg border p-4">
                <div class="flex flex-col items-center gap-4">
                  <div class="h-14 w-14 rounded-full border border-black/20 bg-main/80">
                    <span class="flex h-full items-center justify-center text-center text-3xl font-bold text-white"
                      >P</span
                    >
                  </div>
                  <span class="text-2xl font-medium text-main"> Danh sách yêu thích </span>
                  <span class="text-xl"> 0 Sản Phẩm </span>
                  <span
                    class="cursor-pointer rounded-3xl border px-10 py-2 font-bold text-main underline hover:bg-main/10"
                  >
                    Xem chi tiết
                  </span>
                </div>
              </div>

              <div class="flex-1 rounded-lg border p-4">
                <div class="flex flex-col items-center gap-4">
                  <div class="h-14 w-14 rounded-full border border-black/20 bg-main/80">
                    <span class="flex h-full items-center justify-center text-center text-3xl font-bold text-white"
                      >P</span
                    >
                  </div>
                  <span class="text-2xl font-medium text-main"> Danh sách yêu thích </span>
                  <span class="text-xl"> 0 Sản Phẩm </span>
                  <span
                    class="cursor-pointer rounded-3xl border px-10 py-2 font-bold text-main underline hover:bg-main/10"
                  >
                    Xem chi tiết
                  </span>
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
              type="text"
              :disabled="true"
              :placeholder="`Họ và tên : ${data?.username} `"
              class="w-full rounded-lg border-gray-100 bg-gray-200/30"
            />
            <div class="relative right-8 my-auto cursor-pointer">
              <VIcon icon="fa-edit" />
            </div>
          </div>
          <div class="flex w-full">
            <input
              type="text"
              :disabled="true"
              :placeholder="`Số điện thoại : ${data?.username}`"
              class="w-full rounded-lg border-gray-100 bg-gray-200/30"
            />
            <div class="relative right-8 my-auto cursor-pointer">
              <VIcon icon="fa-edit" />
            </div>
          </div>
          <div class="flex w-full">
            <input
              type="text"
              :disabled="true"
              :placeholder="`Ngày tham gia : ${data?.timestamp}`"
              class="w-[97.5%] rounded-lg border-gray-100 bg-gray-200/30"
            />
          </div>
          <div class="flex w-full" @click="updateUser">
            <input
              type="text"
              :disabled="true"
              placeholder="Đổi mật khẩu"
              class="w-[97.5%] cursor-pointer rounded-lg border-gray-100 bg-gray-200/30"
            />
          </div>

          <VButton label="Cập Nhật Thông Tin" input-class="rounded-3xl font-bold p-5" />
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
