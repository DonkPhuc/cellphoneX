<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useUserStore } from '~/user/stores/user';
const userStore = useUserStore();
const { isLoginSuccess } = storeToRefs(userStore);
const router = useRouter();

const selected = ref(0);

onMounted(async () => {
  const result = await userStore.getCustomer(isLoginSuccess.value);
  if (result.role !== 'admin') {
    router.push('/');
  }
});
function selectedMode(value: number) {
  selected.value = value;
}
</script>

<template>
  <div class="flex h-full">
    <div class="h-full flex-[0.17] bg-main">
      <div class="flex flex-col">
        <span
          class="flex h-20 w-full cursor-pointer items-center justify-center text-3xl font-extrabold text-white"
          @click="$router.push('/')"
          >CellPhoneX</span
        >
        <div class="mt-6 flex flex-col gap-6 px-6">
          <form class="flex items-center space-x-6">
            <span
              class="flex h-12 w-12 items-center justify-center rounded-full bg-white text-center text-3xl font-bold text-main"
              >A</span
            >
            <div class="flex flex-col">
              <span class="font-bold text-white">{{ isLoginSuccess }} </span>
              <span class="text-white">Admin</span>
            </div>
          </form>
        </div>
        <div
          :class="
            selected === 0 ? ' border-l-4 border-main bg-black !text-main [&_>span]:!text-main [&_div]:bg-bgBlack ' : ''
          "
          class="mt-6 flex w-[90%] cursor-pointer items-center gap-2 rounded-r-full px-6 py-2 text-white hover:border-l-4 hover:border-main hover:bg-black hover:text-main [&_>div]:hover:!bg-bgBlack [&_>span]:text-white hover:[&_div]:bg-bgBlack"
          @click="selectedMode(0)"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-black">
            <VIcon icon="fa-tachometer " />
          </div>
          <span class="text-xl text-white">Dashboard</span>
        </div>
        <div
          :class="
            selected === 1 ? ' border-l-4 border-main bg-black !text-main [&_>span]:!text-main [&_div]:bg-bgBlack ' : ''
          "
          class="flex w-[90%] cursor-pointer items-center gap-2 rounded-r-full px-6 py-2 text-white hover:border-l-4 hover:border-main hover:bg-black hover:text-main [&_>div]:hover:!bg-bgBlack [&_>span]:text-white hover:[&_div]:bg-bgBlack"
          @click="selectedMode(1)"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-black">
            <VIcon icon="fa-product-hunt " />
          </div>
          <span class="text-xl text-white">Products</span>
        </div>
        <div
          :class="
            selected === 2 ? ' border-l-4 border-main bg-black !text-main [&_>span]:!text-main [&_div]:bg-bgBlack ' : ''
          "
          class="flex w-[90%] cursor-pointer items-center gap-2 rounded-r-full px-6 py-2 text-white hover:border-l-4 hover:border-main hover:bg-black hover:text-main [&_>div]:hover:!bg-bgBlack [&_>span]:text-white hover:[&_div]:bg-bgBlack"
          @click="selectedMode(2)"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-black">
            <VIcon icon="fa-user " />
          </div>
          <span class="text-xl text-white">Users</span>
        </div>
        <div
          :class="
            selected === 3 ? ' border-l-4 border-main bg-black !text-main [&_>span]:!text-main [&_div]:bg-bgBlack ' : ''
          "
          class="flex w-[90%] cursor-pointer items-center gap-2 rounded-r-full px-6 py-2 text-white hover:border-l-4 hover:border-main hover:bg-black hover:text-main [&_>div]:hover:!bg-bgBlack [&_>span]:text-white hover:[&_div]:bg-bgBlack"
          @click="selectedMode(3)"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-black">
            <VIcon icon="fa-bar-chart " />
          </div>
          <span class="text-xl text-white">Orders</span>
        </div>
      </div>
    </div>

    <div class="flex flex-1 flex-col">
      <template v-if="selected === 0"> <VDashboard /> </template>
      <template v-if="selected === 1"> <VProducts /> </template>
      <template v-if="selected === 2"> <VUser /> </template>
      <template v-if="selected === 3"> <VOrders /> </template>
    </div>
  </div>
</template>
