<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useUserStore } from '~/user/stores/user';

const userStore = useUserStore();
const { isLoginSuccess, userFullName } = storeToRefs(userStore);
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
    <div class="flex h-10 flex-1">
      <div class="flex w-full gap-2 px-2">
        <div class="flex flex-1 gap-2">
          <div class="flex flex-1 cursor-pointer items-center justify-center" @click="go('home')">
            <img
              class="w-44"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhIAAABfCAYAAAC9ZC4kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REQzNUE1OThENjI3MTFFQUJDOTI5NjNDMjAyQkNFMkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REQzNUE1OTlENjI3MTFFQUJDOTI5NjNDMjAyQkNFMkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERDM1QTU5NkQ2MjcxMUVBQkM5Mjk2M0MyMDJCQ0UyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpERDM1QTU5N0Q2MjcxMUVBQkM5Mjk2M0MyMDJCQ0UyRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtMJt2kAAAPtSURBVHja7Nzbbts6FEDB0ND//zL7mhg1oqoSuS8zjwdBj8SbV4RYY875BQBwxcsQAABCAgAQEgCAkAAAhAQAgJAAAB5wGIJyznyfdwT4N7vPg/GCOGdid/91HnkiYWPZhHvG17gCJXgiAYDfuv3Sc5knEgCAkAAAhAQAICQAACEBACAkAAAhAQAICQCgBi+kAoCfMr95dvmLtzyRAACEBAAgJAAAIQEACAkAACEBAAgJAEBIAABCAgBo7uk3W+54O9hIeu3Dcty2ZnaN/yx6b7PovM3C69F5l/M+QryB86h8c8muezaPihno/z8Kj+0oNn9P39s0Z/Zb8JDZ/nl7FFqYla57NtpgM/A1jaLjPYrO393zNt2X/SYmfvd6YDH4IDOmVe5vFh73WXh8ZpDxibgenXeEDQkRYXOJnV73JgLNmXmLY+vTHN/awIFB1bmb1iViIkdIeBrhWn1wujdjIZCczU1j4uh2wwGu28F9fQxGwY1v7p7/APVHfM67p/dE6zV2JFuUFaJn+FAz/o0Owifmzrzlm7Pq89Y6JlaGxAg26RGue3w5FLuP/9i4trPO3RPzNjff45Pz5rwTE4/yx5Z54sf4u7+z/+YIMHaj+Nq4e4w7zFkHLX8xfFmgPiyxtjCuxu6262wXE55IAMT5IBQpseb66pOiVjEhJADgXFSICSEBAMuCokVMCAkAuBYUZ6JiVg8MIbGfr38C5I+KKzFR4vw/rAEf8gDOu1uC4rdwGN9+dr79bNo/tPVEAgDuj4px4mfeQyNlzAkJAHg2KD693v1vsZEuKIQEAKyLijMxkSoohAQArA2KM//tPSjCRoWQAICYgfEpKoQEAHApJsIFha9/3jOpAM47Vgvx1VFPJAAgd9BtfUIhJAAgf0x87YoJIQEAdWJCSAAAeWJiVUh4hzsAFIwJTyQEEIDzTkykCIlpc2Fuja25syeo5bVhkUZYqMPman9YmtOc42zunHcEs+uFVDPQpsmyuTq+LMaBZh7pOWdejpXIq/GEW6hYK/XHwtwZh6shJYAXhgQ4gI2J6wQh0XLDOmgAAcgnnkosDAkxQcVD19rIOT7mznknJpKGROYNbHNhPdQYK3NnjMTEYsfDC3Um3VwWjcOVXPvd/DnvVsSEdbYwJLJv7syLZRQaC+sn17XYNzmvxYejmAgdEgBQLSb4xtc/AQAhAQAICQBASAAAQgIAQEgAAEICABASAICQAACa82ZLAPjJa7D/gScSAICQAACEBAAgJAAAIQEAICQAACEBAAgJAKAGL6QCoINpCIQEdXhrHLDyvBERQgIA/PISkb+RAACEBAAgJAAAIQEAdPBHgAEAruC43nH9c2MAAAAASUVORK5CYII="
              alt=""
            />
          </div>
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
            class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg hover:bg-[hsla(0,0%,100%,.2)] md:flex-row"
            @click="isLoginSuccess ? go('cart') : (open = true)"
          >
            <VIcon class="text-white" size="text-lg" icon="fa-shopping-cart" />
            <span> Giỏ hàng </span>
          </div>

          <div
            v-if="!isLoginSuccess"
            class="flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-[hsla(0,0%,100%,.2)]"
            @click="go('login')"
          >
            <span>Đăng Nhập</span>
          </div>
          <div
            v-else
            class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-[hsla(0,0%,100%,.2)] md:flex-row"
            @click="$router.push('/account')"
          >
            <VIcon class="text-white" size="text-lg" icon="fa-user-circle-o " />
            <span>{{ userFullName.substring(0, userFullName.indexOf(' ')) }}</span>
          </div>
        </div>
      </div>
    </div>
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
              icon="fa-shopping-cart"
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
