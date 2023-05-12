<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useStore } from '~/home/stores/Store';
import { useUserStore } from '~/user/stores/user';

const userStore = useUserStore();
const { isLoginSuccess } = storeToRefs(userStore);
const router = useRouter();
const route = useRoute();
const open = ref(false);
const currentPath = ref('');

async function go(url?: string) {
  open.value = false;
  const currentRoute = router.currentRoute.value.fullPath;
  if (url === 'home') await router.push(`/`);
  else await router.push(`/${url}`);
  if (currentRoute === url) {
    router.go(0);
  }
  currentPath.value = route.path;
}
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
        <VButton input-class="w-36 !ring-0" size="large" label="Đăng nhập ngay" @click="go('login')" />
        <VButton
          input-class="w-36 !ring-0"
          size="large"
          variant="outlined"
          class="w-20"
          label="Để sau"
          @click="open = false"
        />
      </div>
    </template>
  </VDialog>

  <header class="fixed top-0 z-10 flex w-full bg-main py-2 text-white shadow-md">
    <div class="hidden flex-[0.3] lg:flex"></div>
    <nav class="flex h-10 flex-1">
      <div class="flex w-full gap-2 px-2">
        <div class="flex flex-1 gap-2">
          <div class="flex flex-1 cursor-pointer items-center justify-center" @click="go('home')">CellphoneS</div>
          <div class="flex flex-1 cursor-pointer items-center justify-center" @click="go('home')">2</div>
        </div>

        <div class="flex flex-[2] items-center justify-center">
          <VInput input-class="text-gray-700 rounded-xl w-full" placeholder="Bạn cần tìm gì?" />
        </div>

        <div class="flex flex-1 gap-2">
          <div
            :disabled="currentPath === '/login'"
            class="flex flex-1 cursor-pointer items-center justify-center rounded-lg hover:bg-[hsla(0,0%,100%,.2)]"
            @click="isLoginSuccess ? go('cart') : (open = true)"
          >
            Giỏ hàng
          </div>

          <div
            v-if="!isLoginSuccess"
            class="flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-[hsla(0,0%,100%,.2)]"
            @click="go('login')"
          >
            <p>Đăng Nhập</p>
          </div>
          <div
            v-else
            class="flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-[hsla(0,0%,100%,.2)]"
            @click="isLoginSuccess = ''"
          >
            <p>Đăng Xuất</p>
          </div>
        </div>
      </div>
    </nav>
    <div class="hidden flex-[0.3] lg:flex"></div>
  </header>
</template>
