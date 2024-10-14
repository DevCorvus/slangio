<script setup lang="ts">
import type { Term } from '@/types';
import { ref } from 'vue';
import TermDetails from './TermDetails.vue';
import ModalComponent from './ModalComponent.vue';

defineProps<{ term: Term; selected: boolean }>();
defineEmits<{
  (e: 'selection-change', state: boolean): void;
}>();

const showModal = ref(false);
</script>

<template>
  <div class="flex items-center gap-1 w-full">
    <input
      type="checkbox"
      class="checkbox checkbox-xs"
      @click="$emit('selection-change', !selected)"
      :checked="selected"
    />
    <button
      @click="showModal = true"
      class="btn btn-sm btn-ghost text-lg flex-1 justify-start font-normal"
    >
      <span>{{ term.content }}</span>
    </button>
    <ModalComponent :show="showModal" @close="showModal = false">
      <TermDetails :term />
    </ModalComponent>
  </div>
</template>
