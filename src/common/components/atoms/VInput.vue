<script setup lang="ts">
import { DatePicker } from '~/types';

interface VInputProps {
  model?: string | number;
  type?: 'text' | 'password' | 'number' | 'date';
  size?: 'small' | 'medium' | 'large';
  format?: DatePicker;
  max?: number;
  disabled?: boolean;
  readOnly?: boolean;
  minLength?: number;
  maxLength?: number;
  tooltip?: string;
  placeholder?: string;
  inputClass?: string;
}

const props = withDefaults(defineProps<VInputProps>(), {
  type: 'text',
  format: 'date',
  size: 'small',
});

const { size, inputClass, type, max, model, format, maxLength } = toRefs(props);

const emit = defineEmits(['update:model']);

const FILTER_PAG_REGEX = /[^0-9]/g;

const inputRef = ref<HTMLInputElement>();
const canClear = ref<boolean>(false);
const currentValue = ref(0);
defineExpose({ inputRef });

/**
 * Get type
 */
const getType = computed(() => {
  if (type.value === 'number' || type.value === 'date') {
    return 'text';
  }

  return type.value;
});

/**
 * Get input class
 */
const localInputClass = computed(() => {
  const classes = [];

  // setting size
  switch (size.value) {
    case 'medium':
      classes.push('h-9');
      break;
    case 'large':
      classes.push('h-10');
      break;
    default:
      classes.push('h-8 text-sm');
      break;
  }

  // apply input class
  inputClass?.value && classes.push(inputClass?.value);
  return classes.join(' ');
});

const dataMask = computed(() => {
  if (type.value === 'date' && format.value) {
    switch (format.value) {
      case 'date':
        return '####-##-##'; // YYYY-MM-DD
      case 'time':
        return '##:##:##'; // HH:MM:SS
      default:
        return '####-##-## ##:##:##'; // YYYY-MM-DD HH:MM:SS
    }
  }
});

watchEffect(() => {
  if (inputRef.value) {
    if (model?.value) {
      canClear.value = true;
      inputRef.value.value = model.value.toString();
    } else {
      canClear.value = false;
      inputRef.value.value = '';
    }
  }
});
/**
 * Handle for input event
 * @param event Event
 */
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = getDataFormat(target.value);
  if (!value) {
    canClear.value = false;
    emit('update:model', undefined);
  } else {
    canClear.value = true;
    emit('update:model', value);
  }
}

/**
 * Get data format
 * @param value string
 * @returns string
 */
function getDataFormat(value: string) {
  switch (type.value) {
    case 'number':
      return formatNumber(value);
    default:
      return value;
  }
}

/**
 * Format number
 * @param value string
 * @returns string
 */
function formatNumber(value: string) {
  let formattedValue = value.replace(FILTER_PAG_REGEX, '');
  if (inputRef.value) {
    if (type.value === 'number') {
      if (formattedValue) {
        let result = Number(formattedValue);
        if (max?.value && result > max?.value) {
          inputRef.value.value = currentValue.value.toString();
          result = currentValue.value;
        } else {
          currentValue.value = result;
        }
        return result.toString();
      }

      inputRef.value.value = '';
      return '';
    } else {
      inputRef.value.value = formattedValue;
      return formattedValue;
    }
  }
}

/**
 * Clear input text
 */
function clear() {
  if (inputRef.value) {
    inputRef.value.value = '';
    emit('update:model', undefined);
  }
  canClear.value = false;
  inputRef.value?.focus();
}
</script>

<template>
  <div class="relative" :class="localInputClass">
    <input
      ref="inputRef"
      class="disabled readonly focus w-full border border-slate-300 bg-white px-3 pr-7 placeholder-slate-400"
      :class="localInputClass"
      :type="getType"
      :disabled="disabled"
      :readonly="readOnly"
      :minlength="minLength"
      :maxlength="maxLength"
      :title="tooltip"
      :placeholder="placeholder"
      @input="handleInput"
    />
    <div
      v-if="canClear && !disabled && !readOnly"
      class="absolute inset-y-0 right-0 flex items-center pr-1"
      @click="clear"
    >
      <VIcon icon="fa-times" icon-class="opacity-60"> </VIcon>
    </div>
  </div>
</template>
