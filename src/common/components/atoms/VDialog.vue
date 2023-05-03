<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

interface VDialogProps {
  isOpen?: boolean;
}

const props = withDefaults(defineProps<VDialogProps>(), {
  isOpen: false,
});

const { isOpen } = toRefs(props);
const emit = defineEmits(['close']);

/**
 * close modal
 */
function closeModal() {
  emit('close', false);
}
</script>

<template>
  <div class="relative flex">
    <div>
      <slot name="button-open"></slot>
    </div>
  </div>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="transform overflow-hidden bg-white align-middle shadow-xl transition-all">
              <DialogTitle class="flex justify-center bg-primary text-lg text-white">
                <div class="p-2">
                  <slot name="title"></slot>
                </div>
              </DialogTitle>
              <div class="p-6">
                <slot name="detail"></slot>
              </div>

              <div class="mt-4">
                <div class="flex justify-around">
                  <slot name="action"></slot>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
