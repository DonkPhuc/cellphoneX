<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { Customers } from '~/user/dtos/Customers.dto';
import { useUserStore } from '~/user/stores/user';

const userStore = useUserStore();
const { isLoginSuccess } = storeToRefs(userStore);

const router = useRouter();
const isLogin = ref(true);
const userName = ref('');
const userFullName = ref('');
const userEmail = ref('');
const password = ref('');
const password2 = ref('');
const customerList = ref<Customers[]>([]);

watchEffect(async () => {
  if (isLoginSuccess.value) {
    await router.push(`/`);
  }
});

onMounted(async () => {
  if (isLoginSuccess.value) {
    await router.push(`/`);
  }
  window.scrollTo(0, 0);
  customerList.value = (await userStore.getAllCustomers()) as Customers[];
  console.log('🚀 ~ file: login.vue:31 ~ onMounted ~ customerList.value:', customerList.value);
});

const switchMode = () => {
  isLogin.value = !isLogin.value;
};
function updateUsername(username: string) {
  userName.value = username;
}
function updatePassword(pass: string) {
  password.value = pass;
}
function updatePassword2(pass: string) {
  password2.value = pass;
}
function updateEmail(value: string) {
  userEmail.value = value;
}
function updateFullName(value: string) {
  userFullName.value = value;
}
async function login() {
  const findUser = customerList.value.find((obj) => obj.username === userName.value);
  if (findUser !== undefined) {
    console.log(findUser.username);
    console.log('username is correct');
    if (findUser.password === password.value) {
      isLoginSuccess.value = findUser.username;
      console.log('login successfully');
      customerList.value = (await userStore.getAllCustomers()) as Customers[];
    } else {
      console.log('password is wrong');
    }
  }
}
async function signUp() {
  let errorSignUp = '';
  let result = '';
  if (!userEmail.value) errorSignUp = 'invalid email';
  if (!userFullName.value) errorSignUp = 'invalid Full name';
  if (!userName.value) errorSignUp = 'invalid number phone';
  if (!password.value) errorSignUp = 'invalid password';
  if (!password2.value) errorSignUp = 'invalid password2';

  if (errorSignUp === 'successfully') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^0\d{9}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!emailRegex.test(userEmail.value)) errorSignUp = 'email wrong';
    if (!passwordRegex.test(password.value)) errorSignUp = 'password wrong';
    if (!phoneNumberRegex.test(userName.value)) errorSignUp = 'number phone wrong';
    if (password.value !== password2.value) errorSignUp = 'confirm password wrong';
  }

  if (errorSignUp === '') {
    result = (await userStore.postSignUp(userName.value, password.value)) as string;
  }
  console.log(errorSignUp);
  if (result !== 'exists account') console.log('successfully');

  return errorSignUp;
}
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
        <VInput
          input-class="rounded-lg focus:border-main"
          placeholder="Vui lòng nhập số điện thoại/email"
          @update:model="updateUsername"
        />
        <VInput
          input-class="rounded-lg focus:border-main"
          placeholder="Vui lòng nhập mật khẩu"
          type="password"
          @update:model="updatePassword"
        />
        <p class="flex cursor-pointer justify-end text-xs font-thin hover:text-main">Quên mật khẩu?</p>
        <VButton input-class="!h-10 !bg-main border-none rounded-2xl" label="Đăng Nhập" @click="login" />
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
        <VInput
          :max-length="10"
          input-class="rounded-lg focus:border-main"
          placeholder="Vui lòng nhập số điện thoại(bắt buộc)"
          @update:model="updateUsername"
        />
        <VInput
          :max-length="50"
          input-class="rounded-lg focus:border-main"
          placeholder="Vui lòng nhập địa chỉ email(bắt buộc)"
          @update:model="updateEmail"
        />
        <VInput
          :max-length="50"
          input-class="rounded-lg focus:border-main"
          placeholder="Vui lòng nhập họ tên"
          @update:model="updateFullName"
        />
        <VInput
          :max-length="50"
          input-class="rounded-lg focus:border-main"
          placeholder="Nhập mật khẩu của bạn"
          type="password"
          @update:model="updatePassword"
        />
        <p class="-mt-[14px] flex items-start text-xs font-semibold">
          Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt
        </p>
        <VInput
          :max-length="50"
          input-class="rounded-lg focus:border-main"
          placeholder="Xác nhận lại mật khẩu"
          type="password"
          @update:model="updatePassword2"
        />
        <VButton input-class="!h-10 !bg-main border-none rounded-2xl" label="Đăng Ký" @click="signUp" />
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
    <notifications group="custom-style" position="top center" classes="n-light" :max="3" :width="400" />
    <div class="hidden flex-1 lg:flex"></div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: Base
</route>
