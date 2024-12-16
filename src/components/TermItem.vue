<script setup lang="ts">
import type { Term } from '@/types';
import { onMounted } from 'vue';

const props = defineProps<{ term: Term; selected: boolean; startOpened?: boolean }>();

const emit = defineEmits<{
  (e: 'open-details'): void;
  (e: 'selection-change', state: boolean): void;
}>();

onMounted(() => {
  if (props.startOpened) {
    emit('open-details');
  }
});
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
      @click="$emit('open-details')"
      class="btn btn-sm btn-ghost text-lg flex-1 justify-start font-normal"
      :class="term.learnedAt !== null ? 'text-success' : ''"
    >
      {{ term.content }}
    </button>
  </div>
</template>
