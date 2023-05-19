<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';

import { Products } from '~/home/dtos';
import { useStore } from '~/home/stores/Store';
import { useUserStore } from '~/user/stores/user';
const userStore = useUserStore();
const store = useStore();

const router = useRouter();

const data = ref();
const openEdit = ref(false);
const openDel = ref(false);
const editIndex = ref(0);
const delIndex = ref(0);
const editedImage = ref('');
const editedName = ref('');
const editedStock = ref(0);
const editedPrice = ref(0);
const editedDiscount = ref(0);

onMounted(async () => {
  data.value = await store.getData();
});
const notifySignUp = (error?: string) => {
  if (error !== '') {
    toast(`${error}`, {});
  }
};
async function deleteProduct() {
  openDel.value = false;
  const rs = await store.postDeleteProduct(data.value[delIndex.value]._id);
  if (rs === 'Deleted successfully!') {
    data.value = await store.getData();
    notifySignUp(`Xóa thành công ${data.value[delIndex.value].name}`);
  } else {
    notifySignUp(`Đã xảy ra lỗi ,vui lòng thử lại`);
  }
}
function editProduct() {
  console.log('edit', data.value[editIndex.value], editIndex.value);
  openEdit.value = false;
}
function deleteModel(index: number) {
  delIndex.value = index;
  openDel.value = true;
}
function editModel(index: number) {
  editIndex.value = index;
  openEdit.value = true;
}
</script>

<template>
  <VDialog :is-open="openEdit" @close="openEdit = false">
    <template #title> </template>
    <template #detail>
      <p class="w-auto text-center font-bold">Chỉnh sửa : {{ data[editIndex].name }} ?</p>

      <div class="flex flex-col gap-4 pt-6 [&_>input]:rounded-lg">
        <input v-model="editedImage" type="text" placeholder="image link" />
        <input v-model="editedName" type="text" placeholder="name" />
        <input v-model="editedStock" type="number" placeholder="stock" />
        <input v-model="editedPrice" type="number" placeholder="price" />
        <input v-model="editedDiscount" type="number" placeholder="discount" />
      </div>
    </template>
    <template #action>
      <div class="mb-5 flex justify-between gap-2">
        <VButton input-class="w-36 !ring-0" size="large" label="Đồng ý" @click="editProduct()" />
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
      <span class="font-bold text-white">Recent Products</span>

      <div class="flex h-1 flex-1">
        <div class="flex w-full flex-col">
          <div class="flex items-center divide-x bg-primary">
            <div class="flex flex-[0.2] items-center justify-center truncate p-2">
              <VTitle title="STT" class="text-white" />
            </div>
            <div class="flex flex-[0.5] items-center justify-center truncate p-2">
              <VTitle title="Product" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Name" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Date" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Stock" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Price" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Discount" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Edit" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Delete" class="text-white" />
            </div>
            <div class="overflow-y-scroll"></div>
          </div>

          <div class="max-h-[700px] overflow-y-scroll">
            <div v-for="(item, index) in data" :key="index" class="flex">
              <div class="flex w-full border-b border-textBlack">
                <div class="flex flex-[0.2] items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ index + 1 }}</span>
                  </div>
                </div>
                <div class="flex flex-[0.5] items-center justify-center truncate p-2">
                  <div class="truncate border text-textBlack">
                    <img class="h-20 w-20" :src="item.imageLink" alt="" />
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ item.name }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ item.create.substring(0, 10) }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ item.stock }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ item.priceRRP }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ `${item.discount} %` }}</span>
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
        </div>
      </div>
    </div>
  </main>
</template>
