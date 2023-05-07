<script setup lang="ts">
import { Products } from '~/home/dtos';

interface Props {
  data: Products[];
}
const props = defineProps<Props>();
const { data } = toRefs(props);

const emit = defineEmits(['eventButton']);
const eventButton = (title: string) => {
  emit('eventButton', title);
};
</script>

<template>
  <div v-for="item in data" :key="item.title" class="hidden lg:flex">
    <VButton
      class="!duration-200 hover:!bg-main hover:!text-white"
      input-class="rounded-xl !border-slate-300 !bg-gray-100 !text-slate-600"
      :label="item.title"
      @click="eventButton(item.title)"
    />
  </div>
</template>
