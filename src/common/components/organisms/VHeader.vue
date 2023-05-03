<script setup lang="ts">
const router = useRouter();

const menuItems = [
  { name: 'Home', href: '/', icon: 'fa-map-marker' },
  { name: 'Home', href: '/', icon: 'fa-map-marker' },
];
const menuItems2nd = [
  { name: 'Home', href: '/', icon: 'fa-map-marker' },
  { name: 'Home', href: '/', icon: 'fa-map-marker' },
  { name: 'Home', href: '/', icon: 'fa-map-marker' },
  { name: 'Home', href: '/', icon: 'fa-map-marker' },
];

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
  <header class="fixed top-0 z-10 w-full bg-main py-2 text-white shadow-md">
    <nav class="mx-auto flex h-10 lg:w-[65%]">
      <div class="flex w-full gap-2">
        <div class="flex flex-1 gap-2">
          <div class="flex flex-1 cursor-pointer items-center justify-center" @click="go('home')">CellphoneS</div>
          <div class="flex flex-[0.75] cursor-pointer items-center justify-center rounded-lg bg-[hsla(0,0%,100%,.2)]">
            Danh Mục
          </div>
          <div class="flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-[hsla(0,0%,100%,.2)]">
            Xem giá Tại
          </div>
        </div>
        <div class="flex flex-[0.7] items-center justify-center">
          <VInput input-class="text-gray-700 rounded-xl w-full" placeholder="Bạn cần tìm gì?" />
        </div>
        <div class="flex flex-1 gap-2">
          <div class="flex flex-1 cursor-pointer items-center justify-center rounded-lg hover:bg-[hsla(0,0%,100%,.2)]">
            1
          </div>
          <div class="flex flex-1 cursor-pointer items-center justify-center rounded-lg hover:bg-[hsla(0,0%,100%,.2)]">
            1
          </div>
          <div class="flex flex-1 cursor-pointer items-center justify-center rounded-lg hover:bg-[hsla(0,0%,100%,.2)]">
            1
          </div>
          <div
            class="flex flex-1 cursor-pointer items-center justify-center rounded-lg hover:bg-[hsla(0,0%,100%,.2)]"
            @click="go('cart')"
          >
            cart
          </div>
          <div
            class="flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-[hsla(0,0%,100%,.2)]"
            @click="go('login')"
          >
            <p>Đăng Nhập</p>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
