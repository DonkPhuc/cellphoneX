<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useUserStore } from '~/user/stores/user';
const userStore = useUserStore();
const { stepPayment } = storeToRefs(userStore);
const route = useRoute();
const mainDisplay = ref<HTMLDivElement>();
watch(
  () => route.fullPath,
  () => {
    if (mainDisplay.value) {
      mainDisplay.value.scrollTo(0, 0);
    }
  },
  { deep: true, immediate: true }
);
watch(
  () => stepPayment.value,
  () => {
    if (mainDisplay.value) {
      mainDisplay.value.scrollTo(0, 0);
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div ref="mainDisplay" class="h-full w-full overflow-y-scroll">
    <VHeader />

    <main class="overflow-y-hidden pb-10 pt-14">
      <RouterView />
    </main>

    <VFooter />
  </div>
</template>
