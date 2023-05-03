<script setup lang="ts">
interface VIconLabelProps {
  icon: string;
  iconPlacement?: 'start' | 'end';
  iconColor?: string;
  label: string;
}

withDefaults(defineProps<VIconLabelProps>(), {
  iconPlacement: 'start',
});
</script>

<template>
  <div class="flex items-center gap-2">
    <VIcon v-if="icon && iconPlacement === 'start'" :icon="icon" :icon-class="iconColor" />
    <span>{{ label }}</span>
    <VIcon v-if="icon && iconPlacement === 'end'" :icon="icon" :icon-class="iconColor" />
  </div>
</template>
