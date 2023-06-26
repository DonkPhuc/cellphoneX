<script setup lang="ts">
import { Orders } from '~/home/dtos';
import { useStore } from '~/home/stores/Store';

interface Item {
  type: string;
  quantity: number;
  total: number;
}

const store = useStore();

const data = ref<Orders[]>([]);
const dataMonth = ref<Orders[][]>([[]]);
const dataTotalMonth = ref<number[]>([]);
const dataCategoryMonth = ref<Item[][]>([]);
const totalAccessory = ref<Item[]>([]);
const totalSamsung = ref<Item[]>([]);
const totalIphone = ref<Item[]>([]);
const totalTablet = ref<Item[]>([]);

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

  data.value.forEach((element) => {
    totalSales.value += element.orderTotal;
  });

  loading.value = false;
});
let accessoryTotal = 0;
let samsungTotal = 0;
let tabletTotal = 0;
let appleTotal = 0;
const dataByMonth = (data: Orders[]) => {
  const dataByMonths: Orders[][] = [];
  for (let i = 1; i <= 12; i++) {
    dataByMonths[i] = [];
  }
  for (const element of data) {
    const orderMonth = new Date(element.orderDate.toString()).getMonth() + 1;
    dataByMonths[orderMonth].push(element);
  }
  let dataCategoryMonths: Item[][] = [];
  dataByMonths.forEach((element) => {
    let total = 0;
    let totalCategory: Item[] = [];
    element.forEach((element) => {
      total += element.orderTotal;
      element.items.forEach((element) => {
        if (element.type) {
          totalCategory.push({
            type: element.type,
            quantity: element.quantity,
            total: (element.priceRRP - (element.priceRRP * element.discount) / 100) * element.quantity,
          });
        }
      });
    });
    dataTotalMonth.value.push(total);
    dataCategoryMonths.push(totalCategory);
  });
  dataCategoryMonths.forEach((element) => {
    const output: Item[] = Object.values(
      element.reduce((acc: { [key: string]: Item }, { type, quantity, total }) => {
        acc[type] = { type, quantity: (acc[type]?.quantity ?? 0) + quantity, total: (acc[type]?.total ?? 0) + total };
        return acc;
      }, {})
    );
    dataCategoryMonth.value.push(output);
  });

  totalIphone.value = [];

  const getTotalByType = (element: Item[], type: string) => {
    const filtered = element.filter((obj) => obj.type === type);
    if (filtered[0] !== undefined) {
      return filtered[0];
    } else {
      return { type, quantity: 0, total: 0 };
    }
  };

  dataCategoryMonth.value.forEach((element) => {
    totalIphone.value.push(getTotalByType(element, 'apple'));
    totalSamsung.value.push(getTotalByType(element, 'samsung'));
    totalAccessory.value.push(getTotalByType(element, 'accessory'));
    totalTablet.value.push(getTotalByType(element, 'tablet'));
  });

  dataCategoryMonth.value.forEach((arr: Item[]) => {
    arr.forEach((item: Item) => {
      if (item.type === 'samsung') {
        samsungTotal += item.total;
      } else if (item.type === 'apple') {
        appleTotal += item.total;
      } else if (item.type === 'accessory') {
        accessoryTotal += item.total;
      } else {
        tabletTotal += item.total;
      }
    });
  });

  return dataByMonths;
};
</script>

<template>
  <main class="h-full flex-[1] p-6 py-12">
    <template v-if="!loading">
      <div class="flex flex-col gap-6">
        <div class="flex h-full w-full gap-6">
          <div class="flex flex-1 justify-between rounded-md border border-black bg-red-50 p-6">
            <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
            <div class="flex flex-col">
              <span class="text-black">Total Sale</span>
              <span class="font-bold text-black">{{ totalCart(totalSales) }}</span>
            </div>
          </div>
          <div class="flex flex-1 justify-between rounded-md border border-black bg-red-50 p-6">
            <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
            <div class="flex flex-col">
              <span class="text-black">Total Accessory Sale</span>
              <span class="font-bold text-black">{{ totalCart(accessoryTotal) }}</span>
            </div>
          </div>
          <div class="flex flex-1 justify-between rounded-md border border-black bg-red-50 p-6">
            <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
            <div class="flex flex-col">
              <span class="text-black">Total Samsung Sale</span>
              <span class="font-bold text-black">{{ totalCart(samsungTotal) }}</span>
            </div>
          </div>
          <div class="flex flex-1 justify-between rounded-md border border-black bg-red-50 p-6">
            <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
            <div class="flex flex-col">
              <span class="text-black">Total Tablet Sale</span>
              <span class="font-bold text-black">{{ totalCart(tabletTotal) }}</span>
            </div>
          </div>
          <div class="flex flex-1 justify-between rounded-md border border-black bg-red-50 p-6">
            <VIcon size="text-main text-5xl" icon="fa-bar-chart-o" />
            <div class="flex flex-col">
              <span class="text-black">Total Apple Sale</span>
              <span class="font-bold text-black">{{ totalCart(appleTotal) }}</span>
            </div>
          </div>
        </div>
        <div class="flex h-full w-full flex-1 gap-6 pb-6">
          <div class="flex h-full flex-1 flex-col gap-6 rounded-md p-6">
            <div class="flex flex-1 justify-between">
              <span class="font-bold text-black">Recent Salse ({{ data.length }} orders)</span>
            </div>

            <table class="w-full overflow-auto border border-black">
              <thead class="bg-main">
                <tr>
                  <th class="h-16 border border-black py-2 text-white">Month</th>
                  <th class="h-16 border border-black py-2 text-white">Orders sold</th>
                  <th class="h-16 border border-black py-2 text-white">Total (VND)</th>
                  <th class="h-16 border border-black py-2 text-white">Iphone sold</th>
                  <th class="h-16 border border-black py-2 text-white">Samsung sold</th>
                  <th class="h-16 border border-black py-2 text-white">Accessory sold</th>
                  <th class="h-16 border border-black py-2 text-white">Tablet sold</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataMonth" :key="index">
                  <td class="h-12 truncate border border-black p-2 text-center text-black">{{ index + 1 }}</td>
                  <td class="h-12 truncate border border-black p-2 text-center text-black">{{ item.length }}</td>
                  <td class="h-12 truncate border border-black p-2 text-center text-black">
                    {{ dataTotalMonth[index] > 0 ? totalCart(dataTotalMonth[index]) : '0 đ' }}
                  </td>
                  <td v-if="totalIphone[index]" class="h-12 truncate border border-black p-2 text-center text-black">
                    {{ totalIphone[index].quantity }}
                  </td>
                  <td v-if="totalSamsung[index]" class="h-12 truncate border border-black p-2 text-center text-black">
                    {{ totalSamsung[index].quantity }}
                  </td>
                  <td v-if="totalAccessory[index]" class="h-12 truncate border border-black p-2 text-center text-black">
                    {{ totalAccessory[index].quantity }}
                  </td>
                  <td v-if="totalTablet[index]" class="h-12 truncate border border-black p-2 text-center text-black">
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
