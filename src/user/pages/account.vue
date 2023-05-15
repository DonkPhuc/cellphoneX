<script setup lang="ts">
import { storeToRefs } from "pinia";

import { Products } from "~/home/dtos";
import { useStore } from "~/home/stores/Store";
import { Customers } from "~/user/dtos/Customers.dto";

import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const store = useStore();
const { isLoginSuccess } = storeToRefs(userStore);

const router = useRouter();
const selected = ref(0);

const listMode = [
  {
    name: "Trang chủ",
  },
  {
    name: "Trang chủ",
  },
  {
    name: "Trang chủ",
  },
  {
    name: "Trang chủ",
  },
  {
    name: "Trang chủ",
  },
];

function selectedMode(value: number) {
  selected.value = value;
}
</script>

<template>
  <main class="flex">
    <div class="hidden flex-1 lg:flex"></div>

    <div class="flex flex-[4] gap-4 p-4">
      <div
        class="flex flex-[0.5] flex-col gap-4 rounded-lg bg-[#f8fbfc] p-4 md:flex-1"
      >
        <div
          @click="selectedMode(index)"
          v-for="(item, index) in listMode"
          :key="item.name"
          class="rounded-xl border border-[#f8fbfc] p-2"
          :class="selected === index ? '!border-main bg-main/10 text-main' : ''"
        >
          <div class="flex items-center justify-center gap-2 md:justify-start">
            <VIcon size="text-xl" icon="fa-home " />
            <span class="hidden truncate sm:flex">
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-[4] gap-4 rounded-lg">
        <div class="flex flex-1 flex-col gap-4">
          <div class="flex flex-col gap-4 md:flex-row">
            <div class="flex-1 rounded-lg border p-4">
              <div class="flex flex-col">
                <div class="flex flex-col items-center justify-center gap-2">
                  <div
                    class="h-14 w-14 rounded-full border border-black/20 bg-main/80"
                  >
                    <span
                      class="flex items-center justify-center text-center text-3xl font-bold text-white"
                      >P</span
                    >
                  </div>
                  <span class="text-black">Xin chào</span>
                  <span class="font-bold text-main">PHUC DO</span>
                  <div class="flex w-full flex-1">
                    <div
                      class="flex flex-1 flex-col items-center gap-2 text-center"
                    >
                      <span>Ngày tham gia</span>
                      <VIcon
                        size="text-main text-[60px]"
                        icon="fa-calendar-check-o"
                      />
                      <span>1/5/2023</span>
                    </div>
                    <div
                      class="flex flex-1 flex-col items-center gap-2 text-center"
                    >
                      <span>Hạng thành viên</span>
                      <VIcon
                        size="text-main text-[60px]"
                        icon=" fa-certificate"
                      />
                      <span>Người dùng</span>
                    </div>
                    <div
                      class="flex flex-1 flex-col items-center gap-2 text-center"
                    >
                      <span>Điểm tích lũy</span>
                      <VIcon size="text-main text-[60px]" icon="fa-bitcoin" />
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex-1 rounded-lg border bg-[#fef5f0] p-4">
              <div class="flex flex-col items-center gap-4">
                <div
                  class="h-14 w-14 rounded-full border border-black/20 bg-main/80"
                >
                  <span
                    class="flex items-center justify-center text-center text-3xl font-bold text-white"
                    >P</span
                  >
                </div>
                <span class="text-2xl font-medium text-main">
                  Danh sách yêu thích
                </span>
                <span class="text-xl"> 0 Sản Phẩm </span>
                <span class="cursor-pointer font-bold text-main underline">
                  Xem chi tiết
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-4 md:flex-row">
            <div class="flex-1 rounded-lg border p-4">
              <div class="flex flex-col items-center gap-4">
                <div
                  class="h-14 w-14 rounded-full border border-black/20 bg-main/80"
                >
                  <span
                    class="flex items-center justify-center text-center text-3xl font-bold text-white"
                    >P</span
                  >
                </div>
                <span class="text-2xl font-medium text-main">
                  Danh sách yêu thích
                </span>
                <span class="text-xl"> 0 Sản Phẩm </span>
                <span
                  class="cursor-pointer rounded-3xl border px-10 py-2 font-bold text-main underline hover:bg-main/10"
                >
                  Xem chi tiết
                </span>
              </div>
            </div>

            <div class="flex-1 rounded-lg border p-4">
              <div class="flex flex-col items-center gap-4">
                <div
                  class="h-14 w-14 rounded-full border border-black/20 bg-main/80"
                >
                  <span
                    class="flex items-center justify-center text-center text-3xl font-bold text-white"
                    >P</span
                  >
                </div>
                <span class="text-2xl font-medium text-main">
                  Danh sách yêu thích
                </span>
                <span class="text-xl"> 0 Sản Phẩm </span>
                <span
                  class="cursor-pointer rounded-3xl border px-10 py-2 font-bold text-main underline hover:bg-main/10"
                >
                  Xem chi tiết
                </span>
              </div>
            </div>

            <div class="flex-1 rounded-lg border p-4">
              <div class="flex flex-col items-center gap-4">
                <div
                  class="h-14 w-14 rounded-full border border-black/20 bg-main/80"
                >
                  <span
                    class="flex items-center justify-center text-center text-3xl font-bold text-white"
                    >P</span
                  >
                </div>
                <span class="text-2xl font-medium text-main">
                  Danh sách yêu thích
                </span>
                <span class="text-xl"> 0 Sản Phẩm </span>
                <span
                  class="cursor-pointer rounded-3xl border px-10 py-2 font-bold text-main underline hover:bg-main/10"
                >
                  Xem chi tiết
                </span>
              </div>
            </div>
          </div>
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
