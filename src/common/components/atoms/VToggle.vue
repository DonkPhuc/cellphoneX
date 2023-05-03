<script setup lang="ts">
interface VToggleProps {
  checked?: boolean;
  disabled?: boolean;
  inputClass?: string;
}

const emit = defineEmits(['update:model']);
const props = defineProps<VToggleProps>();
const { checked } = toRefs(props);

/**
 * style Checked
 */
const styleChecked = computed(() => {
  if (checked.value) {
    return 'translate-x-7';
  } else {
    return 'translate-x-[-3px] !bg-primary';
  }
});

/**
 * Handle for switch event
 */
function handleSwitch(checked: boolean) {
  emit('update:model', checked);
}
</script>

<template>
  <label class="relative flex w-max cursor-pointer select-none items-center">
    <input
      :checked="checked"
      type="checkbox"
      class="checked h-8 w-16 cursor-pointer rounded-full !border-none bg-[#e3e3e3] !bg-none !ring-0 !ring-offset-0 transition-colors"
      @click="handleSwitch(!checked)"
    />
    <span v-if="checked" class="absolute right-8 text-xs font-bold uppercase text-white"> ON </span>
    <span v-else class="absolute right-2 text-xs font-bold uppercase text-[#999]"> OFF </span>
    <span
      :class="styleChecked"
      class="absolute right-8 h-6 w-6 transform rounded-full bg-[#e3e3e3] transition-transform"
    />
  </label>
</template>

<style scoped lang="postcss">
.checked {
  @apply checked:hover: !bg-primary checked:bg-primary checked:focus:bg-primary;
}
</style>
