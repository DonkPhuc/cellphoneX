<script setup lang="ts">
import 'vue3-toastify/dist/index.css';

import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';

import { Customers } from '~/user/dtos/Customers.dto';
import { useUserStore } from '~/user/stores/user';
const userStore = useUserStore();
const { isLoginSuccess, userFullName: getUser } = storeToRefs(userStore);

const router = useRouter();
const isLogin = ref(true);
const userName = ref('');
const userNameLogin = ref('');
const userFullName = ref('');
const userEmail = ref('');
const passwordLogin = ref('');
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
  customerList.value = (await userStore.getAllCustomers()) as Customers[];
});

const switchMode = () => {
  isLogin.value = !isLogin.value;
};
function updateUsernameLogin(username: string) {
  userNameLogin.value = username;
}
function updatePasswordLogin(pass: string) {
  passwordLogin.value = pass;
}
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
  const phoneNumberRegex = /^0\d{9}$/;
  let errorSignUp = '';

  if (!phoneNumberRegex.test(userNameLogin.value)) errorSignUp = 'SĐT không đúng định dạng';
  if (!passwordLogin.value) errorSignUp = 'Mật khẩu không được để trống';
  if (!userNameLogin.value) errorSignUp = 'SĐT không được để trống';

  if (errorSignUp === '') {
    const findUser = customerList.value.find((obj) => obj.username === userNameLogin.value);
    if (findUser !== undefined) {
      if (findUser.password === passwordLogin.value) {
        isLoginSuccess.value = findUser.username;
        getUser.value = findUser.userFullName;
        errorSignUp = 'Đăng nhập thành công';
        customerList.value = (await userStore.getAllCustomers()) as Customers[];
      } else {
        errorSignUp = 'Mật khẩu không đúng';
      }
    } else {
      errorSignUp = 'Tài khoản/Mật khẩu không đúng';
    }
  }

  notifySignUp(errorSignUp, `${errorSignUp === 'Đăng nhập thành công' ? 'success' : ''}`);
}
async function signUp() {
  let errorSignUp = 'Đăng ký thành công';
  let result = '';
  if (!password.value) errorSignUp = 'Mật khẩu không được để trống';
  if (!userFullName.value) errorSignUp = 'Họ tên không được để trống';
  if (!userEmail.value) errorSignUp = 'Email không được để trống';
  if (!userName.value) errorSignUp = 'SĐT không được để trống';

  if (errorSignUp === 'Đăng ký thành công') {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^0\d{9}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (password.value !== password2.value) errorSignUp = 'Mật khẩu xác nhận không chính xác';
    if (!passwordRegex.test(password.value)) errorSignUp = 'Mật khẩu không đúng định dạng';
    if (!nameRegex.test(userFullName.value)) errorSignUp = 'Họ tên không được chứa số';
    if (!emailRegex.test(userEmail.value)) errorSignUp = 'Email không đúng định dạng';
    if (!phoneNumberRegex.test(userName.value)) errorSignUp = 'SĐT không đúng định dạng';
  }

  if (errorSignUp === 'Đăng ký thành công') {
    result = (await userStore.postSignUp(
      userName.value,
      password.value,
      userFullName.value,
      userEmail.value
    )) as string;
    customerList.value = (await userStore.getAllCustomers()) as Customers[];
  }
  if (result !== 'exists account') notifySignUp(errorSignUp, 'success');
  else if (result === 'exists account') notifySignUp('Tài khoản đã tồn tại');

  return errorSignUp;
}

const notifySignUp = (error?: string, type?: string) => {
  if (error !== '') {
    toast(`${error}`, {});
    if (error === 'Đăng ký thành công') {
      userName.value = '';
      userEmail.value = '';
      userFullName.value = '';
      password.value = '';
      password2.value = '';
    }
  }
};
</script>

<template>
  <main class="flex">
    <div class="hidden flex-1 lg:flex"></div>

    <div v-if="isLogin" class="flex flex-1 flex-col px-2 py-4">
      <div class="flex flex-1 flex-col gap-4">
        <div class="flex justify-center">
          <img class="w-[300px]" alt="" src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.0251fdd.png" />
        </div>
        <div class="flex justify-center">
          <p class="text-lg font-bold">Đăng nhập tài khoản Smember</p>
        </div>
        <VInput
          :max-length="10"
          input-class="rounded-lg focus:border-main"
          placeholder="Vui lòng nhập số điện thoại"
          :model="userNameLogin"
          @update:model="updateUsernameLogin"
        />
        <VInput
          input-class="rounded-lg focus:border-main"
          placeholder="Vui lòng nhập mật khẩu"
          type="password"
          :model="passwordLogin"
          @update:model="updatePasswordLogin"
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
          <img class="w-[300px]" alt="" src="https://account.cellphones.com.vn/_nuxt/img/Shipper_CPS3.0251fdd.png" />
        </div>
        <div class="flex justify-center">
          <p class="text-lg font-bold">Đăng ký tài khoản Smember</p>
        </div>
        <VInput
          :max-length="10"
          input-class="rounded-lg focus:border-main"
          placeholder="Vui lòng nhập số điện thoại(bắt buộc)"
          :model="userName"
          @update:model="updateUsername"
        />
        <VInput
          :max-length="50"
          input-class="rounded-lg focus:border-main"
          placeholder="Vui lòng nhập địa chỉ email(bắt buộc)"
          :model="userEmail"
          @update:model="updateEmail"
        />
        <VInput
          :max-length="50"
          input-class="rounded-lg focus:border-main"
          placeholder="Vui lòng nhập họ tên"
          :model="userFullName"
          @update:model="updateFullName"
        />
        <VInput
          :max-length="50"
          input-class="rounded-lg focus:border-main"
          placeholder="Nhập mật khẩu của bạn"
          :model="password"
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
          :model="password2"
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
    <div class="hidden flex-1 lg:flex"></div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: Base
</route>
