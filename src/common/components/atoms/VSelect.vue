<script setup lang="ts">
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/vue';

interface VSelectProps {
  options?: any[];
  type?: 'dropdown' | 'combobox';
  size?: 'small' | 'medium' | 'large';
  model?: string | number;
  placeholder?: string;
  disabled?: boolean;
  tooltip?: string;
  notFoundLabel?: string;
  inputClass?: string;
}

const props = withDefaults(defineProps<VSelectProps>(), {
  options: () => [],
  type: 'dropdown',
  placeholder: 'Choose',
  size: 'small',
  notFoundLabel: 'Nothing found.',
});

const { placeholder, options, size, inputClass, model, disabled } = toRefs(props);
const emit = defineEmits(['update:model']);
const selectedValue = ref<string | number>('');
const currentSelected = ref<string | number>('');
const query = ref('');

/**
 * search
 * @returns obj
 */
const lstFilter = computed(() => {
  if (query.value) {
    const lowerCaseQuery = query.value.toString().toLowerCase().trim();
    const result = options.value.filter((item) => {
      const lowerCaseLabel = item.label.toLowerCase().trim();
      return lowerCaseLabel.includes(lowerCaseQuery) && item.value !== null;
    });

    return result;
  } else {
    return options.value;
  }
});

/**
 * Combobox Open Style
 * @param open boolean
 * @returns string
 */
const getLabel = computed(() => (value: string) => {
  const result = options.value.find((x) => x.value === value);
  if (result) {
    return result.label;
  }
  return '';
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
    case 'small':
    default:
      classes.push('h-8 text-sm');
      break;
  }
  if (disabled.value) {
    classes.push('disabled');
  }
  return classes.join(' ');
});

/**
 * Option Style
 * @param index number
 * @param actived boolean
 * @returns string
 */
const optionStyle = computed(() => (index: number, actived: boolean) => {
  if (lstFilter.value[index].label === placeholder.value) {
    return 'hidden';
  } else if (actived) {
    return 'bg-primary text-white';
  } else {
    return '';
  }
});

/**
 * Select Style
 * @param selected boolean
 * @returns string
 */
const selectedStyle = computed(() => (selected: boolean) => {
  if (selected) {
    return 'font-bold';
  }

  return 'font-normal';
});

/**
 * Active Style
 * @param actived boolean
 * @returns string
 */
const activedStyle = computed(() => (actived: boolean) => {
  if (actived) {
    return 'text-white';
  }

  return 'text-primary';
});

/**
 * Combobox Icon Style
 * @param open boolean
 * @returns string
 */
const comboboxIconStyle = computed(() => (open: boolean) => {
  if (open) {
    return 'rotate-180 opacity-60';
  }

  return 'opacity-60';
});

/**
 * Combobox Open Style
 * @param open boolean
 * @returns string
 */
const comboboxOpenStyle = computed(() => (open: boolean) => {
  return 'border-none ';
});

/**
 * Combobox Open Style
 * @param open boolean
 * @returns string
 */
const disabledStyle = computed(() => {
  if (disabled.value) {
    return 'bg-slate-100 opacity-60';
  }

  return '';
});

watchEffect(() => {
  if (model?.value) {
    selectedValue.value = model.value;
  }
});

onMounted(() => {
  if (model?.value) {
    selectedValue.value = model.value;
  }
});

/**
 * Change value
 * @param open boolean
 * @param event Event
 */
function handleChangeValue(open: boolean, event: Event) {
  query.value = '';
  const target = event?.currentTarget as HTMLInputElement;

  if (open) {
    if (target) {
      target.value = '';
    }
  }

  currentSelected.value = selectedValue.value;
  if (!selectedValue.value && selectedValue.value !== 0) {
    emit('update:model', undefined);
  } else {
    emit('update:model', selectedValue.value);
  }
}

/**
 * Clear search
 */
function clearSearch() {
  query.value = '';
}

/**
 * Handle for input event
 * @param event Event
 */
function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  query.value = target.value;

  if (!query.value) {
    selectedValue.value = '';
    emit('update:model', undefined);
  }
}
</script>

<template>
  <div :class="inputClass">
    <Combobox v-slot="{ open }" v-model="selectedValue">
      <div class="relative">
        <div class="relative w-full cursor-default overflow-hidden !rounded-xl !border-2 border-gray-200">
          <template v-if="type === 'combobox'">
            <div
              class="flex flex-row justify-between bg-white text-sm leading-5 text-gray-900"
              :class="comboboxOpenStyle(open)"
            >
              <ComboboxButton class="w-full border-none outline-none ring-0" :disabled="disabled" @click="clearSearch">
                <ComboboxInput
                  class="w-full border border-r-0 placeholder-slate-400 focus:ring-0"
                  :class="[comboboxOpenStyle(open), localInputClass]"
                  :placeholder="placeholder"
                  :disabled="disabled"
                  :displayValue="(item: any) => getLabel(item)"
                  :title="tooltip"
                  @change="handleInput"
                  @keydown.enter="handleChangeValue(open, $event)"
                  @keydown.esc="handleChangeValue(open, $event)"
                  @keydown.tab="handleChangeValue(open, $event)"
                />
              </ComboboxButton>
              <ComboboxButton
                class="border border-l-0 outline-none"
                :class="comboboxOpenStyle(open)"
                :disabled="disabled"
              >
                <div class="flex h-full items-center pr-1" :class="disabledStyle">
                  <VIcon icon="fa-chevron-down" :icon-class="comboboxIconStyle(open)" />
                </div>
              </ComboboxButton>
            </div>
          </template>

          <template v-else>
            <div
              class="flex flex-row justify-between bg-white text-sm leading-5 text-gray-900"
              :class="comboboxOpenStyle(open)"
            >
              <ComboboxButton :disabled="disabled" class="w-full border-none outline-none">
                <ComboboxInput
                  class="w-full border border-r-0 placeholder-slate-400"
                  :class="[comboboxOpenStyle(open), localInputClass]"
                  :placeholder="placeholder"
                  :displayValue="(item: any) => getLabel(item)"
                  :disabled="true"
                  :title="tooltip"
                />
              </ComboboxButton>
              <ComboboxButton
                class="border border-l-0 outline-none"
                :class="comboboxOpenStyle(open)"
                :disabled="disabled"
              >
                <div class="flex h-full items-center pr-1" :class="disabledStyle">
                  <VIcon icon="fa-chevron-down" :icon-class="comboboxIconStyle(open)" />
                </div>
              </ComboboxButton>
            </div>
          </template>
        </div>

        <ComboboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-left text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <div v-if="lstFilter.length === 0" class="relative cursor-default select-none px-4 py-2 text-gray-700">
            {{ notFoundLabel }}
          </div>

          <ComboboxOption
            v-for="(item, index) in lstFilter"
            v-slot="{ selected, active }"
            :key="index"
            as="template"
            :value="item.value"
            @click="handleChangeValue"
          >
            <li class="relative cursor-default select-none px-3 py-2 text-gray-900" :class="optionStyle(index, active)">
              <span class="block truncate" :class="selectedStyle(selected)"> {{ item.label }} </span>
              <span v-if="selected" class="absolute inset-y-0 right-1 flex items-center" :class="activedStyle(active)">
                <VIcon icon="fa-check" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
  </div>
</template>
