<script setup lang="ts">
import { toast } from 'vue3-toastify';

import { Products } from '~/home/dtos';
import { useStore } from '~/home/stores/Store';
const store = useStore();

const editedImageGroup = ref([]);
const data = ref<Products[]>([]);

const sortColumn = ref(0);
const sortState = ref(false);
const openEdit = ref(false);
const openDel = ref(false);
const openAdd = ref(false);
const loading = ref(false);

const editedDiscount = ref(0);
const editedStock = ref(0);
const editedPrice = ref(0);
const delIndex = ref(0);
const editIndex = ref(0);

const editedDescription = ref('');
const editedImage = ref('');
const editedName = ref('');
const editedCate = ref('');

const categoryList = [{ name: 'apple' }, { name: 'samsung' }, { name: 'tablet' }, { name: 'accessory' }];

onMounted(async () => {
  loading.value = true;
  data.value = await store.getData();
  loading.value = false;
});
const notifySignUp = (error?: string, type?: string) => {
  if (type && type === 'success') {
    if (error !== '') {
      toast.success(`${error}`, {});
    }
  } else {
    if (error !== '') {
      toast.error(`${error}`, {});
    }
  }
};
async function deleteProduct() {
  const rs = await store.postDeleteProduct(data.value[delIndex.value]._id);
  if (rs === 'Deleted successfully!') {
    data.value = [];
    data.value = await store.getData();
    notifySignUp(`Xóa thành công`, 'success');
  } else {
    notifySignUp(`Đã xảy ra lỗi ,vui lòng thử lại`, '0');
  }
  openDel.value = false;
}
async function editProduct(add: boolean) {
  if (!add) {
    const params = {
      imageLink: editedImage.value,
      name: editedName.value,
      stock: editedStock.value,
      priceRRP: editedPrice.value,
      discount: editedDiscount.value,
      description: editedDescription.value,
      type: editedCate.value,
      imageDetail: editedImageGroup.value as [],
    };
    const rs = await store.postUpdateProduct(data.value[editIndex.value]._id, params);
    if (rs === 'Updated successfully!') {
      data.value = [];
      data.value = await store.getData();
      notifySignUp(`Chỉnh sửa thành công`, 'success');
    } else {
      notifySignUp(`Đã xảy ra lỗi ,vui lòng thử lại`, '0');
    }
  } else {
    const params = {
      imageLink: editedImage.value,
      name: editedName.value,
      stock: editedStock.value,
      priceRRP: editedPrice.value,
      discount: editedDiscount.value,
      description: editedDescription.value,
      type: editedCate.value,
      imageDetail: editedImageGroup.value as [],
    };
    const rs = await store.postAddProduct(params);
    if (rs) {
      data.value = [];
      data.value = await store.getData();
      notifySignUp(`Thêm thành công`, 'success');
    } else {
      notifySignUp(`Đã xảy ra lỗi ,vui lòng thử lại`, '0');
    }
  }
  openEdit.value = false;
  openAdd.value = false;
}
function deleteModel(index: number) {
  openDel.value = true;
  delIndex.value = index;
}
async function editModel(index: number) {
  openEdit.value = true;

  editedImage.value = data.value[index].imageLink;
  editedName.value = data.value[index].name;
  editedStock.value = data.value[index].stock;
  editedPrice.value = data.value[index].priceRRP;
  editedDiscount.value = data.value[index].discount;
  editedDescription.value = data.value[index].description;
  editedCate.value = data.value[index].type;
  editedImageGroup.value[0] = data.value[index].imageDetail[0];
  editedImageGroup.value[1] = data.value[index].imageDetail[1];
  editedImageGroup.value[2] = data.value[index].imageDetail[2];
  editedImageGroup.value[3] = data.value[index].imageDetail[3];
  editedImageGroup.value[4] = data.value[index].imageDetail[4];

  editIndex.value = index;
}
function handleSort(value: number, property: 'name' | 'type') {
  if (sortColumn.value === value) {
    sortState.value = !sortState.value;
  }
  sortColumn.value = value;
  if (sortState.value) {
    data.value.sort((a, b) => a[property].toString().localeCompare(b[property].toString()));
  } else {
    data.value.sort((a, b) => b[property].toString().localeCompare(a[property].toString()));
  }
}
function handleSortNumber(value: number, property: 'stock' | 'priceRRP' | 'discount') {
  if (sortColumn.value === value) {
    sortState.value = !sortState.value;
  }
  sortColumn.value = value;

  if (sortState.value) {
    data.value.sort((a, b) => a[property] - b[property]);
  } else {
    data.value.sort((a, b) => b[property] - a[property]);
  }
}
const formatVND = computed(() => (slide: number) => {
  let result = {
    price: '',
    priceRRP: '',
  };
  result.price = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(slide);
  result.priceRRP = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(slide);

  return result;
});
</script>

<template>
  <VDialog :is-open="openEdit" @close="(openEdit = false), (openAdd = false)">
    <template #title> </template>
    <template #detail>
      <p v-if="data[editIndex] && !openAdd" class="w-[500px] text-center font-bold">
        Chỉnh sửa : {{ data[editIndex].name }} ?
      </p>
      <p v-else class="w-[500px] text-center font-bold">Thêm sản phẩm ?</p>

      <div class="flex w-full gap-4">
        <div class="flex w-full flex-col gap-4 pt-6 [&_>input]:rounded-lg">
          <input v-model="editedImage" type="text" placeholder="image link" />
          <input v-model="editedName" type="text" placeholder="name" />
          <input v-model="editedStock" type="number" placeholder="stock" />
          <input v-model="editedPrice" type="number" placeholder="price" />
          <input v-model="editedDiscount" type="number" placeholder="discount" />
          <input v-model="editedDescription" type="text" placeholder="description" />
          <select id="category" v-model="editedCate" class="w-full appearance-none rounded-lg bg-white p-2 !ring-0">
            <option v-for="item in categoryList" :key="item.name" :value="item.name">{{ item.name }}</option>
          </select>
        </div>

        <div class="flex w-full flex-col gap-4 pt-6 [&_>input]:rounded-lg">
          <input v-model="editedImageGroup[0]" type="text" placeholder="image link" />
          <input v-model="editedImageGroup[1]" type="text" placeholder="image link" />
          <input v-model="editedImageGroup[2]" type="text" placeholder="image link" />
          <input v-model="editedImageGroup[3]" type="text" placeholder="image link" />
          <input v-model="editedImageGroup[4]" type="text" placeholder="image link" />
        </div>
      </div>
    </template>
    <template #action>
      <div class="mb-5 flex justify-between gap-2">
        <VButton input-class="w-36 !ring-0" size="large" label="Đồng ý" @click="editProduct(openAdd)" />
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
        <span class="font-bold text-white">Recent Products ({{ data.length }})</span>
        <VButton label="New Product" @click="(openEdit = true), (openAdd = true)" />
      </div>

      <div class="flex h-1 flex-1">
        <div class="flex w-full flex-col">
          <div class="flex items-center divide-x bg-primary">
            <div class="flex flex-[0.2] items-center justify-center truncate p-2">
              <VTitle title="STT" class="text-white" />
            </div>
            <div class="flex flex-[0.5] items-center justify-center truncate p-2">
              <VTitle title="Product" class="text-white" />
            </div>
            <div
              class="flex flex-1 cursor-pointer items-center justify-center truncate p-2"
              @click="handleSort(0, 'name')"
            >
              <VTitle title="Name" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="Date" class="text-white" />
            </div>
            <div
              class="flex flex-1 cursor-pointer items-center justify-center truncate p-2"
              @click="handleSortNumber(2, 'stock')"
            >
              <VTitle title="Stock" class="text-white" />
            </div>
            <div
              class="flex flex-1 cursor-pointer items-center justify-center truncate p-2"
              @click="handleSortNumber(3, 'priceRRP')"
            >
              <VTitle title="Price" class="text-white" />
            </div>
            <div
              class="flex flex-1 cursor-pointer items-center justify-center truncate p-2"
              @click="handleSortNumber(4, 'discount')"
            >
              <VTitle title="Discount" class="text-white" />
            </div>
            <div
              class="flex flex-1 cursor-pointer items-center justify-center truncate p-2"
              @click="handleSort(5, 'type')"
            >
              <VTitle title="Category" class="text-white" />
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
                    <span>{{ item.create.toString().substring(0, 10) }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ item.stock }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ formatVND(item.priceRRP).priceRRP }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ `${item.discount} %` }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ `${item.type}` }}</span>
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
