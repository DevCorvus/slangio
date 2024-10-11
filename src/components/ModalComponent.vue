<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { watch, useTemplateRef, nextTick } from 'vue';

const props = defineProps<{ show: boolean }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const modal = useTemplateRef('modal');

const { activate, deactivate } = useFocusTrap(modal);

watch(
  () => props.show,
  async () => {
    await nextTick(); // Wait until it renders
    props.show ? activate() : deactivate();
  }
);

onClickOutside(modal, () => emit('close'));
</script>

<template>
  <Teleport to="#modals">
    <Transition name="fade">
      <div v-if="show" class="fixed inset-0 flex justify-center items-center bg-black/40 z-40 p-10">
        <div
          ref="modal"
          class="card bg-base-100 w-full max-w-lg max-h-full overflow-y-auto shadow-xl"
          role="dialog"
        >
          <div class="card-body pt-10">
            <button
              @click="$emit('close')"
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
