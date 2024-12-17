<script setup lang="ts">
import type { Term } from '@/shared/types/term';
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
  <div class="flex items-center w-full gap-1">
    <input
      type="checkbox"
      class="checkbox checkbox-xs"
      @click="$emit('selection-change', !selected)"
      :checked="selected"
    />
    <button
      @click="$emit('open-details')"
      class="justify-start flex-1 text-lg font-normal btn btn-sm btn-ghost"
      :class="term.learnedAt !== null ? 'text-success' : ''"
    >
      {{ term.content }}
    </button>
  </div>
</template>
