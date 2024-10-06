<script setup lang="ts">
import type { Word } from '@/types';
import { Icon } from '@iconify/vue';
import { watchDebounced } from '@vueuse/core';
import { ref } from 'vue';

const props = defineProps<{ words: Word[] }>();

const emit = defineEmits<{
  (e: 'search', data: Word[]): void;
}>();

const input = ref('');

watchDebounced(
  input,
  () => {
    const filteredWords = props.words.filter((word) =>
      word.content.toLowerCase().includes(input.value.toLowerCase())
    );
    emit('search', filteredWords);
  },
  { debounce: 500 }
);
</script>

<template>
  <label class="input input-bordered flex items-center gap-2 grow">
    <input type="text" v-model="input" class="grow" placeholder="Search word" />
    <Icon icon="heroicons:magnifying-glass-20-solid" />
  </label>
</template>
