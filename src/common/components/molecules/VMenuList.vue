<script setup lang="ts">
import { Products } from '~/home/dtos';

interface Props {
  data: Products[];
}
const props = defineProps<Props>();
const { data } = toRefs(props);

const emit = defineEmits(['eventMenu']);
const eventMenu = (title: string) => {
  emit('eventMenu', title);
};
const block = computed(() => (title: string) => {
  let rs = '';
  if (title !== 'Điện Thoại' && title !== 'Khuyến Mãi') {
    rs = '!cursor-not-allowed';
  }
  return rs;
});
</script>

<template>
  <div v-for="item in data" :key="item.title" class="flex flex-1 rounded-lg hover:bg-gray-100">
    <div
      :class="block(item.title)"
      class="flex flex-1 cursor-pointer justify-between rounded-xl"
      @click="item.title === 'Điện Thoại' || item.title === 'Khuyến Mãi' ? eventMenu(item.title) : ''"
    >
      <div class="flex items-center gap-2">
        <img class="h-[20px] pl-2" :src="item.imageLink" alt="" />
        <span class="text-sm font-bold">{{ item.title }}</span>
      </div>
      <div class="flex items-center">
        <VIcon icon="fa-angle-right" />
      </div>
    </div>
  </div>
</template>
