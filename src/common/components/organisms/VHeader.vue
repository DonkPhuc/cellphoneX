<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useStore } from '~/home/stores/Store';
import { useUserStore } from '~/user/stores/user';

const userStore = useUserStore();
const { isLoginSuccess } = storeToRefs(userStore);
const router = useRouter();

/**
 * Go to the link
 * @param url string
 */
async function go(url?: string) {
  const currentRoute = router.currentRoute.value.fullPath;
  if (url === 'home') await router.push(`/`);
  else await router.push(`/${url}`);
  if (currentRoute === url) {
    router.go(0);
  }
}
</script>

<template>
  <header class="fixed top-0 z-10 flex w-full bg-main py-2 text-white shadow-md">
    <div class="hidden flex-[0.3] lg:flex"></div>
    <nav class="flex h-10 flex-1">
      <div class="flex w-full gap-2">
        <div class="flex flex-1 gap-2">
          <div class="flex flex-1 cursor-pointer items-center justify-center" @click="go('home')">CellphoneS</div>

          <div
            class="hidden flex-[0.75] cursor-pointer items-center justify-center rounded-lg bg-[hsla(0,0%,100%,.2)] md:flex"
          >
            Danh Mục
          </div>

          <div
            class="hidden flex-1 cursor-pointer items-center justify-center rounded-lg bg-[hsla(0,0%,100%,.2)] md:flex"
          >
            Xem giá Tại
          </div>
        </div>

        <div class="flex flex-[0.7] items-center justify-center">
          <VInput input-class="text-gray-700 rounded-xl w-full" placeholder="Bạn cần tìm gì?" />
        </div>

        <div class="flex flex-1 gap-2">
          <div
            class="hidden flex-1 cursor-pointer items-center justify-center rounded-lg hover:bg-[hsla(0,0%,100%,.2)] md:flex"
          >
            1
          </div>

          <div
            class="hidden flex-1 cursor-pointer items-center justify-center rounded-lg hover:bg-[hsla(0,0%,100%,.2)] md:flex"
          >
            1
          </div>

          <div
            class="hidden flex-1 cursor-pointer items-center justify-center rounded-lg hover:bg-[hsla(0,0%,100%,.2)] md:flex"
          >
            1
          </div>

          <div
            class="flex flex-1 cursor-pointer items-center justify-center rounded-lg hover:bg-[hsla(0,0%,100%,.2)]"
            @click="go('cart')"
          >
            cart
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
