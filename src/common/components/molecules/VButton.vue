<script setup lang="ts">
interface VButtonProps {
  type?: 'button' | 'submit' | 'reset';
  style?: 'default' | '2line';
  variant?: 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  label?: string;
  label2?: string;
  iconPlacement?: 'start' | 'end';
  disabled?: boolean;
  tooltip?: string;
  inputClass?: string;
  onClick?: () => void;
}

const props = withDefaults(defineProps<VButtonProps>(), {
  type: 'button',
  variant: 'contained',
  size: 'small',
  iconPlacement: 'start',
});

const { variant, size, inputClass, disabled, style } = toRefs(props);

/**
 * Get button class
 */
const buttonClass = computed(() => {
  const classes = [];

  // setting size
  switch (size.value) {
    case 'small':
      classes.push('h-8 text-sm');
      break;
    case 'medium':
      classes.push('h-9');
      break;
    case 'large':
      classes.push('h-10');
      break;
    default:
      break;
  }

  // setting disabled
  if (disabled.value) {
    classes.push(
      'cursor-not-allowed border-slate-500 bg-slate-300 !text-slate-500 hover:border-slate-500 hover:bg-slate-300 hover:text-slate-500'
    );
  }

  // setting variant
  switch (variant.value) {
    case 'contained':
      classes.push('text-white bg-primary/90 hover:bg-primary focus:bg-primary');
      break;
    case 'outlined':
      classes.push('text-primary hover:bg-primary/20 focus:bg-primary/20');
      break;
    default:
      break;
  }

  // setting variant
  if (disabled.value && style?.value === '2line') {
    classes.push('!text-main/50 bg-white hover:bg-white');
  }

  // apply input class
  inputClass?.value && classes.push(inputClass?.value);
  return classes.join(' ');
});
</script>

<template>
  <button
    class="flex flex-row items-center justify-center gap-1 rounded border border-primary/90 px-2"
    :class="buttonClass"
    :type="type"
    :title="tooltip"
    :disabled="disabled"
    @click="onClick"
  >
    <div v-if="style === '2line'" class="flex flex-col">
      <div class="flex justify-center">
        <VIcon v-if="icon && iconPlacement === 'start'" size="text-xl" :icon="icon" />
        <p class="text-[16px] font-bold uppercase">{{ label }}</p>
        <VIcon v-if="icon && iconPlacement === 'end'" size="text-2xl" :icon="icon" />
      </div>
      <div v-if="style === '2line'" class="flex justify-center">
        <p v-if="icon" class="text-[10px]">{{ label2 }}</p>
        <p v-else class="text-xs">{{ label2 }}</p>
      </div>
    </div>

    <div v-else class="flex flex-col">
      <div class="flex">
        <VIcon v-if="icon && iconPlacement === 'start'" :icon="icon" />
        {{ label }}
        <VIcon v-if="icon && iconPlacement === 'end'" :icon="icon" />
      </div>
    </div>
  </button>
</template>
