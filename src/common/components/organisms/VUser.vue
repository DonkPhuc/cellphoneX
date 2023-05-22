<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';

import { Products } from '~/home/dtos';
import { useStore } from '~/home/stores/Store';
import { Customers } from '~/user/dtos/Customers.dto';
import { useUserStore } from '~/user/stores/user';
const userStore = useUserStore();
const store = useStore();

const router = useRouter();

const loading = ref(false);
const data = ref<Customers[]>([]);
const openEdit = ref(false);
const openDel = ref(false);
const editIndex = ref(0);
const delIndex = ref(0);

const editedDisplayName = ref('');
const editedEmail = ref('');
const editedUserName = ref('');
const editedRole = ref('');
const editedPassword = ref('');

onMounted(async () => {
  loading.value = true;
  data.value = (await userStore.getAllCustomers()) as Customers[];
  loading.value = false;
});
const notifySignUp = (error?: string) => {
  if (error !== '') {
    toast(`${error}`, {});
  }
};
async function deleteProduct() {
  const rs = await userStore.postDeleteCustomer(data.value[delIndex.value]._id.toString());
  if (rs === 'Deleted successfully!') {
    data.value = [];
    data.value = (await userStore.getAllCustomers()) as Customers[];
    notifySignUp(`Xóa thành công`);
  } else {
    notifySignUp(`Đã xảy ra lỗi ,vui lòng thử lại`);
  }
  openDel.value = false;
}
async function editProduct() {
  const params = {
    userFullName: editedDisplayName.value,
    username: editedUserName.value,
    email: editedEmail.value,
    password: editedPassword.value,
    role: editedRole.value,
  };
  const rs = await userStore.postUpdateUser(
    params.userFullName,
    params.username,
    params.email,
    editedPassword.value,
    data.value[editIndex.value].username,
    params.role
  );
  if (rs === 'Updated successfully!') {
    data.value = [];
    data.value = (await userStore.getAllCustomers()) as Customers[];
    notifySignUp(`Chỉnh sửa thành công ${data.value[editIndex.value].username}`);
  } else {
    notifySignUp(`Đã xảy ra lỗi ,vui lòng thử lại`);
  }

  openEdit.value = false;
}
function deleteModel(index: number) {
  openDel.value = true;
  delIndex.value = index;
}
async function editModel(index: number) {
  openEdit.value = true;
  editedDisplayName.value = data.value[index].userFullName;
  editedUserName.value = data.value[index].username;
  editedEmail.value = data.value[index].email;
  editedPassword.value = data.value[index].password;
  editedRole.value = data.value[index].role;
  editIndex.value = index;
}
</script>

<template>
  <VDialog :is-open="openEdit" @close="openEdit = false">
    <template #title> </template>
    <template #detail>
      <p v-if="data[editIndex]" class="w-[500px] text-center font-bold">Chỉnh sửa : {{ data[editIndex].username }} ?</p>

      <div class="flex flex-col gap-4 pt-6 [&_>input]:rounded-lg">
        <input v-model="editedDisplayName" type="text" placeholder="Display name" />
        <input v-model="editedEmail" type="text" placeholder="Email" />
        <input v-model="editedPassword" type="text" placeholder="Password" />
        <input v-model="editedUserName" :disabled="true" type="text" placeholder="User Name" />
        <select id="category" v-model="editedRole" class="w-full appearance-none rounded-lg bg-white p-2 !ring-0">
          <option :value="editedRole">{{ editedRole }}</option>
          <option :value="editedRole === 'admin' ? 'customer' : 'admin'">
            {{ editedRole === 'admin' ? 'customer' : 'admin' }}
          </option>
        </select>
      </div>
    </template>
    <template #action>
      <div class="mb-5 flex justify-between gap-2">
        <VButton input-class="w-36 !ring-0" size="large" label="Đồng ý" @click="editProduct" />
        <VButton
          input-class="w-36 !ring-0"
          size="large"
          variant="outlined"
          class="w-20"
          label="Bỏ qua"
          @click="openEdit = false"
        />
      </div>
    </template>
  </VDialog>
  <VDialog :is-open="openDel" @close="openDel = false">
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
      <p class="w-[350px] text-center font-bold">Bạn có chắc muốn xóa sản phẩm này?</p>
    </template>
    <template #action>
      <div class="mb-5 flex justify-between gap-2">
        <VButton input-class="w-36 !ring-0" size="large" label="Đồng ý" @click="deleteProduct()" />
        <VButton
          input-class="w-36 !ring-0"
          size="large"
          variant="outlined"
          class="w-20"
          label="Bỏ qua"
          @click="openDel = false"
        />
      </div>
    </template>
  </VDialog>

  <main class="h-full flex-[1] bg-black p-6">
    <div class="flex flex-col gap-6 bg-bgBlack p-6">
      <div class="flex justify-between">
        <span class="font-bold text-white">Recent Customer</span>
      </div>

      <div class="flex h-1 flex-1">
        <div class="flex w-full flex-col">
          <div class="flex items-center divide-x bg-primary">
            <div class="flex flex-[0.2] items-center justify-center truncate p-2">
              <VTitle title="STT" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Display Name" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Date" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Email" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="User Name" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Role" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Edit" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Delete" class="text-white" />
            </div>
            <div class="overflow-y-scroll"></div>
          </div>

          <div v-if="!loading" class="max-h-[700px] overflow-y-scroll">
            <div v-for="(item, index) in data" :key="index" class="flex">
              <div class="flex w-full border-b border-textBlack">
                <div class="flex flex-[0.2] items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ index + 1 }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ item.userFullName }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ item.create.toString().substring(0, 10) }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ item.email }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ item.username }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ `${item.role}` }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <VButton label="Edit" @click="editModel(index)" />
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <VButton label="Delete" @click="deleteModel(index)" />
                </div>
              </div>
            </div>
          </div>
          <div v-else class="flex w-full justify-center pt-8">
            <VSpinner />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
