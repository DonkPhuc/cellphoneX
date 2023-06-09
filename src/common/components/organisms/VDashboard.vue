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
const dataTotalMonth = ref<number[]>([]);
const dataCategoryMonth = ref<{ type: string; quantity: number }[][]>([]);
const totalIphone = ref<{ type: string; quantity: number }[]>([]);
const totalSamsung = ref<{ type: string; quantity: number }[]>([]);
const totalAccessory = ref<{ type: string; quantity: number }[]>([]);
const totalTablet = ref<{ type: string; quantity: number }[]>([]);

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

  dataMonth.value = await dataByMonth(data.value);
  dataMonth.value.splice(0, 1);

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
  let dataCategoryMonths: { type: string; quantity: number }[][] = [];
  dataByMonths.forEach((element) => {
    let total = 0;
    let totalCategory: { type: string; quantity: number }[] = [];
    element.forEach((element) => {
      total += element.orderTotal;
      element.items.forEach((element) => {
        if (element.type) {
          totalCategory.push({ type: element.type, quantity: element.quantity });
        }
      });
    });
    dataTotalMonth.value.push(total);
    dataCategoryMonths.push(totalCategory);
  });
  dataCategoryMonths.forEach((element) => {
    const output: { type: string; quantity: number }[] = Object.values(
      element.reduce((acc: any, { type, quantity }) => {
        acc[type] = { type, quantity: (acc[type]?.quantity ?? 0) + quantity };
        return acc;
      }, {})
    );
    dataCategoryMonth.value.push(output);
  });

  totalIphone.value = [];

  const getTotalByType = (element: { type: string; quantity: number }[], type: string) => {
    const filtered = element.filter((obj) => obj.type === type);
    if (filtered[0] !== undefined) {
      return filtered[0];
    } else {
      return { type, quantity: 0 };
    }
  };

  dataCategoryMonth.value.forEach((element) => {
    totalIphone.value.push(getTotalByType(element, 'apple'));
    totalSamsung.value.push(getTotalByType(element, 'samsung'));
    totalAccessory.value.push(getTotalByType(element, 'accessory'));
    totalTablet.value.push(getTotalByType(element, 'tablet'));
  });

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

            <table class="w-full overflow-auto border border-black">
              <thead>
                <tr>
                  <th class="border border-black py-2 text-white">Month</th>
                  <th class="border border-black py-2 text-white">Orders sold</th>
                  <th class="border border-black py-2 text-white">Total (VND)</th>
                  <th class="border border-black py-2 text-white">Iphone sold</th>
                  <th class="border border-black py-2 text-white">Samsung sold</th>
                  <th class="border border-black py-2 text-white">Accessory sold</th>
                  <th class="border border-black py-2 text-white">Tablet sold</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataMonth" :key="index">
                  <td class="truncate border border-black p-2 text-center text-textBlack">{{ index + 1 }}</td>
                  <td class="truncate border border-black p-2 text-center text-textBlack">{{ item.length }}</td>
                  <td class="truncate border border-black p-2 text-center text-textBlack">
                    {{ dataTotalMonth[index] > 0 ? totalCart(dataTotalMonth[index]) : '0 đ' }}
                  </td>
                  <td v-if="totalIphone[index]" class="truncate border border-black p-2 text-center text-textBlack">
                    {{ totalIphone[index].quantity }}
                  </td>
                  <td v-if="totalSamsung[index]" class="truncate border border-black p-2 text-center text-textBlack">
                    {{ totalSamsung[index].quantity }}
                  </td>
                  <td v-if="totalAccessory[index]" class="truncate border border-black p-2 text-center text-textBlack">
                    {{ totalAccessory[index].quantity }}
                  </td>
                  <td v-if="totalTablet[index]" class="truncate border border-black p-2 text-center text-textBlack">
                    {{ totalTablet[index].quantity }}
                  </td>
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
