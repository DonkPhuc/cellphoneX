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
const searchKey = ref('');

watchEffect(() => {
  currentPath.value = route.path;
});
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
function search(event?: Event) {
  if (event) {
    if ((event as KeyboardEvent).key === 'Enter') {
      if (searchKey.value === '') {
        router.push(`/products/brand/all`);
      } else {
        router.push(`/products/brand/search?search=${searchKey.value}`);
        searchKey.value = '';
      }
    }
  } else {
    if (searchKey.value === '') {
      router.push(`/products/brand/all`);
    } else {
      router.push(`/products/brand/search?search=${searchKey.value}`);
      searchKey.value = '';
    }
  }
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
      <p class="w-[300px] text-center font-bold">Vui lòng đăng nhập tài khoản Smember để thao tác dễ dàng hơn</p>
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
        </div>

        <div class="flex flex-[2] items-center justify-center">
          <input
            v-model="searchKey"
            type="text"
            class="w-full rounded-xl border-0 text-gray-700 !ring-0"
            placeholder="Bạn cần tìm gì?"
            @keypress="search($event)"
          />
          <div class="cursor-pointer" @click="search()">
            <VIcon icon="fa-search" />
          </div>
        </div>

        <div class="hidden flex-1 gap-2 sm:flex">
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
            @click="$router.push('/account')"
          >
            <p>Account</p>
          </div>
        </div>
      </div>
    </nav>
    <div class="hidden flex-[0.3] lg:flex"></div>
  </header>

  <header class="fixed bottom-0 z-10 flex w-full bg-white py-2 text-white shadow-md sm:hidden">
    <nav class="flex h-12 flex-1">
      <div class="flex w-full gap-2 px-2">
        <div class="flex flex-1 gap-2">
          <div class="flex w-full cursor-pointer flex-col items-center" @click="$router.push('/')">
            <VIcon :size="currentPath === '/' ? '!text-main text-2xl' : 'text-2xl text-gray-600'" icon="fa-home " />
            <span :class="currentPath === '/' ? '!text-main' : ''" class="text-xs font-bold text-gray-600"
              >Trang chủ</span
            >
          </div>
          <div class="flex w-full cursor-pointer flex-col items-center" @click="$router.push('/products/brand/all')">
            <VIcon
              :size="currentPath === '/products/brand/all' ? '!text-main text-2xl' : 'text-2xl text-gray-600'"
              icon="fa-bars "
            />
            <span
              :class="currentPath === '/products/brand/all' ? '!text-main' : ''"
              class="text-xs font-bold text-gray-600"
              >Danh mục</span
            >
          </div>
          <div
            class="flex w-full cursor-pointer flex-col items-center"
            @click="isLoginSuccess ? $router.push('/cart') : (open = true)"
          >
            <VIcon
              :size="currentPath === '/cart' ? '!text-main text-2xl' : 'text-2xl text-gray-600'"
              icon="fa-shopping-cart "
            />
            <span :class="currentPath === '/cart' ? '!text-main' : ''" class="text-xs font-bold text-gray-600"
              >Giỏ hàng</span
            >
          </div>
          <div
            class="flex w-full cursor-pointer flex-col items-center"
            @click="isLoginSuccess ? $router.push('/account') : $router.push('/login')"
          >
            <VIcon
              :size="
                currentPath === '/login' || currentPath === '/account'
                  ? '!text-main text-2xl'
                  : 'text-2xl text-gray-600'
              "
              icon="fa-user-o"
            />
            <span
              :class="currentPath === '/login' || currentPath === '/account' ? '!text-main' : ''"
              class="text-xs font-bold text-gray-600"
              >{{ isLoginSuccess ? 'Tài khoản' : 'Đăng nhập' }}</span
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
