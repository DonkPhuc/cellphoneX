<script setup lang="ts">
interface VTitleProps {
  title: string;
  size?: 'default' | 'small';
  inputClass?: string;
}

const props = withDefaults(defineProps<VTitleProps>(), {
  size: 'default',
});

const { size, inputClass } = toRefs(props);

/**
 * Get input class
 */
const localInputClass = computed(() => {
  const classes = [];

  // setting size
  if (size.value === 'small') {
    classes.push('text-sm');
  } else {
    classes.push('text-base');
  }
  // apply input class
  inputClass?.value && classes.push(inputClass?.value);
  return classes.join(' ');
});
</script>

<template>
  <span class="font-bold text-gray-700" :class="localInputClass">
    {{ title }}
  </span>
</template>
