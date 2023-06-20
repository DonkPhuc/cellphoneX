<script setup lang="ts">
import { toast } from 'vue3-toastify';

import { Orders } from '~/home/dtos';
import { useStore } from '~/home/stores/Store';
const store = useStore();

const loading = ref(false);
const data = ref<Orders[]>([]);
const openEdit = ref(false);
const openDel = ref(false);

const delIndex = ref(0);
const editIndex = ref(0);

const editedOrderNumber = ref('');
const editedOrderDelivery = ref('');
const editedCustomerName = ref('');
const editedOrderAddress = ref('');
const editedOrderTotal = ref(0);
const editedStatus = ref('');

onMounted(async () => {
  loading.value = true;
  data.value = (await store.getOrders()) as Orders[];
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
  const rs = await store.postDeleteOrder(data.value[delIndex.value]._id.toString());
  if (rs === 'Deleted successfully!') {
    data.value = [];
    data.value = (await store.getOrders()) as Orders[];
    notifySignUp(`Xóa thành công`, 'success');
  } else {
    notifySignUp(`Đã xảy ra lỗi ,vui lòng thử lại`);
  }
  openDel.value = false;
}

function deleteModel(index: number) {
  openDel.value = true;
  delIndex.value = index;
}
async function editModel(index: number) {
  openEdit.value = true;

  editedOrderNumber.value = data.value[index].orderNumber;
  editedOrderDelivery.value = data.value[index].orderDelivery;
  editedCustomerName.value = data.value[index].customerName;
  editedOrderAddress.value = data.value[index].orderAddress;
  editedOrderTotal.value = data.value[index].orderTotal;
  editedStatus.value = data.value[index].status;

  editIndex.value = index;
}
const totalCart = computed(() => (total: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(total);
});
</script>

<template>
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
      <p class="w-[350px] text-center font-bold">Bạn có chắc muốn xóa đơn hàng này?</p>
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
        <span class="font-bold text-white">Recent Orders ({{ data.length }})</span>
      </div>

      <div class="flex h-1 flex-1">
        <div class="flex w-full flex-col">
          <div class="flex items-center divide-x bg-primary">
            <div class="flex flex-[0.2] items-center justify-center truncate p-2">
              <VTitle title="STT" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="order Number" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="order Delivery" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="User Name" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="order Address" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="order Total" class="text-white" />
            </div>
            <div class="flex flex-1 items-center justify-center truncate p-2">
              <VTitle title="status" class="text-white" />
            </div>
            <div class="flex flex-[2] items-center justify-center truncate p-2">
              <VTitle title="order Date" class="text-white" />
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
                    <span>{{ item.orderNumber }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ item.orderDelivery }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ item.customerName }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ item.orderAddress }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ totalCart(item.orderTotal) }}</span>
                  </div>
                </div>
                <div class="flex flex-1 items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ `${item.status}` }}</span>
                  </div>
                </div>
                <div class="flex flex-[2] items-center justify-center truncate p-2">
                  <div class="truncate text-textBlack">
                    <span>{{ `${item.orderDate.toString().replaceAll('T', ' ').substring(0, 19)}` }}</span>
                  </div>
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
