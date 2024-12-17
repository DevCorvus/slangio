<script setup lang="ts">
import { onClickOutside, useEventListener } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { watch, useTemplateRef, nextTick } from 'vue';

const props = defineProps<{ show: boolean; compact?: boolean }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const modal = useTemplateRef('modal');

const { activate, deactivate } = useFocusTrap(modal);

useEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    emit('close');
  }
});

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
      <div
        v-if="show"
        class="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/40 md:p-10"
      >
        <div
          ref="modal"
          class="max-w-lg max-h-full overflow-y-auto shadow-xl card card-compact md:card-normal bg-base-100"
          :class="compact ? '' : 'w-full'"
          role="dialog"
        >
          <div class="card-body" :class="compact ? '' : 'pt-10'">
            <button
              v-if="!compact"
              @click="$emit('close')"
              class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
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
