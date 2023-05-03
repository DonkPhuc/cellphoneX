<script setup lang="ts">
const isLogin = ref(true);

onMounted(() => {
  window.scrollTo(0, 0);
});

const switchMode = () => {
  isLogin.value = !isLogin.value;
};
</script>

<template>
  <main class="flex">
    <div class="hidden flex-1 lg:flex"></div>

    <div v-if="isLogin" class="flex flex-1 flex-col px-2 py-4">
      <div class="flex flex-1 flex-col gap-4">
        <div class="flex justify-center">
          <img class="w-[300px]" src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.0251fdd.png" />
        </div>
        <div class="flex justify-center">
          <p class="text-lg font-bold">Đăng nhập tài khoản Smember</p>
        </div>
        <VInput input-class="rounded-lg focus:border-main" placeholder="Vui lòng nhập số điện thoại/email" />
        <VInput input-class="rounded-lg focus:border-main" placeholder="Vui lòng nhập mật khẩu" type="password" />
        <p class="flex cursor-pointer justify-end text-xs font-thin hover:text-main">Quên mật khẩu?</p>
        <VButton input-class="!h-10 !bg-main border-none rounded-2xl" label="Đăng Nhập" />
        <div class="flex py-4">
          <div class="mt-[9px] !h-[1px] flex-1 border-2"></div>
          <p class="mx-1">Hoặc</p>
          <div class="mt-[9px] !h-[1px] flex-1 border-2"></div>
        </div>
        <div class="flex justify-center text-slate-500">
          Bạn chưa có tài khoản?
          <span class="mx-2 cursor-pointer text-main hover:underline" @click="switchMode"> Đăng ký ngay</span>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-1 flex-col px-2 py-4">
      <div class="flex flex-1 flex-col gap-4">
        <span class="cursor-pointer text-xl font-bold" @click="switchMode"
          ><VIcon icon="fa-arrow-left" /> Đăng nhập tài khoản</span
        >
        <div class="flex justify-center">
          <img class="w-[300px]" src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.0251fdd.png" />
        </div>
        <div class="flex justify-center">
          <p class="text-lg font-bold">Đăng ký tài khoản Smember</p>
        </div>
        <VInput input-class="rounded-lg focus:border-main" placeholder="Vui lòng nhập số điện thoại(bắt buộc)" />
        <VInput input-class="rounded-lg focus:border-main" placeholder="Vui lòng nhập địa chỉ email(bắt buộc)" />
        <VInput input-class="rounded-lg focus:border-main" placeholder="Vui lòng nhập họ tên" />
        <VInput input-class="rounded-lg focus:border-main" placeholder="Nhập mật khẩu của bạn" type="password" />
        <p class="-mt-[14px] flex items-start text-xs font-semibold">
          Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt
        </p>
        <VInput input-class="rounded-lg focus:border-main" placeholder="Xác nhận lại mật khẩu" type="password" />
        <VButton input-class="!h-10 !bg-main border-none rounded-2xl" label="Đăng Ký" />
        <div class="flex gap-2 text-xs">
          <input :checked="true" class="text-main active:bg-main" type="checkbox" />
          <p>Tôi đồng ý với các điều khoản bảo mật cá nhân</p>
        </div>
        <div class="flex gap-2 text-xs">
          <input :checked="true" class="text-main active:bg-main" type="checkbox" />
          <p>Đăng ký nhận bản tin khuyến mãi qua email</p>
        </div>
        <div class="flex py-4">
          <div class="mt-[9px] !h-[1px] flex-1 border-2"></div>
          <p class="mx-1">Hoặc</p>
          <div class="mt-[9px] !h-[1px] flex-1 border-2"></div>
        </div>
        <div class="flex justify-center text-slate-500">
          Bạn chưa có tài khoản?
          <span class="mx-2 cursor-pointer text-main hover:underline" @click="switchMode"> Đăng nhập ngay</span>
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
