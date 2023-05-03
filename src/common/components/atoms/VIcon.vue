<script setup lang="ts">
interface VIconProps {
  type?: 'svg';
  icon?: string;
  iconClass?: string;
  size?: string;
}

defineProps<VIconProps>();
</script>

<template>
  <i v-if="icon" class="fa fa-fw" :class="[icon, iconClass, size]"></i>
  <template v-if="type === 'svg'">
    <slot></slot>
  </template>
</template>
