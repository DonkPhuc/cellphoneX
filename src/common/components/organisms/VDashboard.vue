<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';

import { Orders, Products } from '~/home/dtos';
import { useStore } from '~/home/stores/Store';
import { Customers } from '~/user/dtos/Customers.dto';
import { useUserStore } from '~/user/stores/user';
const userStore = useUserStore();
const store = useStore();

const router = useRouter();

const data = ref<Orders[]>([]);
const dataMonth = ref<Orders[][]>([[]]);

const loading = ref(false);

const totalAccessorySales = ref(0);
const totalTabletSales = ref(0);
const totalPhoneSales = ref(0);
const totalSales = ref(0);

const totalCart = computed(() => (total: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(total);
});
onMounted(async () => {
  loading.value = true;
  data.value = (await store.getOrders()) as Orders[];
  totalAccessorySales.value = 0;
  totalTabletSales.value = 0;
  totalPhoneSales.value = 0;
  totalSales.value = 0;

  dataMonth.value = dataByMonth(data.value);
  dataMonth.value.splice(0, 1);

  if (dataMonth.value) {
    for (let i = 0; i <= 12; i++) {
      const lengthOfOrderList = dataMonth.value[i].length;
      console.log('🚀 ~ file: VDashboard.vue:44 ~ lengthOfOrderList:', lengthOfOrderList);
      let x = [];

      for (let index = 0; index < lengthOfOrderList; index++) {
        total += dataMonth.value[i][index].orderTotal;
      }
    }
  }

  data.value.forEach((element) => {
    totalSales.value += element.orderTotal;
  });

  loading.value = false;
});
const dataByMonth = (data: Orders[]) => {
  const dataByMonths: Orders[][] = [];
  for (let i = 1; i <= 12; i++) {
    dataByMonths[i] = [];
  }
  for (const element of data) {
    const orderMonth = new Date(element.orderDate.toString()).getMonth() + 1;
    dataByMonths[orderMonth].push(element);
  }
  return dataByMonths;
};
</script>

<template>
  <main class="h-full flex-[1] bg-black p-6">
    <template v-if="!loading">
      <div class="flex flex-col gap-6 bg-black">
        <div class="flex h-full w-full gap-6 bg-black">
          <div class="flex flex-1 justify-between rounded-md bg-bgBlack p-6">
            <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
            <div class="flex flex-col">
              <span class="text-textBlack">Total Sale</span>
              <span class="font-bold text-white">{{ totalCart(totalSales) }}</span>
            </div>
          </div>
          <div class="flex flex-1 justify-between rounded-md bg-bgBlack p-6">
            <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
            <div class="flex flex-col">
              <span class="text-textBlack">Total Phone Sale</span>
              <span class="font-bold text-white">{{ totalCart(totalSales) }}</span>
            </div>
          </div>
          <div class="flex flex-1 justify-between rounded-md bg-bgBlack p-6">
            <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
            <div class="flex flex-col">
              <span class="text-textBlack">Total Accessory Sale</span>
              <span class="font-bold text-white">{{ totalCart(totalSales) }}</span>
            </div>
          </div>
          <div class="flex flex-1 justify-between rounded-md bg-bgBlack p-6">
            <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
            <div class="flex flex-col">
              <span class="text-textBlack">Total Tablet Sale</span>
              <span class="font-bold text-white">{{ totalCart(totalSales) }}</span>
            </div>
          </div>
        </div>
        <div class="flex h-full w-full flex-1 gap-6 bg-black pb-6">
          <div class="flex h-full flex-1 flex-col gap-6 rounded-md bg-bgBlack p-6">
            <div class="flex flex-1 justify-between">
              <span class="font-bold text-white">Recent Salse ({{ data.length }} orders)</span>
            </div>

            <!-- <div v-for="(item, index) in dataMonth" :key="index">
              <span class="text-white">da ban {{ item.length }} trong thang {{ index + 1 }} </span>
            </div> -->

            <table class="w-full overflow-auto border border-black">
              <thead>
                <tr>
                  <th class="border border-black py-2 text-white">Month</th>
                  <th class="border border-black py-2 text-white">Orders sold</th>
                  <th class="border border-black py-2 text-white">Total</th>
                  <th class="border border-black py-2 text-white">Status</th>
                  <th class="border border-black py-2 text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataMonth" :key="index">
                  <td class="truncate border border-black p-2 text-center text-textBlack">{{ index + 1 }}</td>
                  <td class="truncate border border-black p-2 text-center text-textBlack">{{ item.length }}</td>
                  <td class="truncate border border-black p-2 text-center text-textBlack">1</td>
                  <td class="truncate border border-black p-2 text-center text-textBlack">1</td>
                  <td class="truncate border border-black p-2 text-center text-textBlack">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex w-full justify-center py-8">
        <VSpinner />
      </div>
    </template>
  </main>
</template>
