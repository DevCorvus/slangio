<script setup lang="ts">
import type { Word } from '@/types';
import { Icon } from '@iconify/vue';
import { ref, watch } from 'vue';

const props = defineProps<{ words: Word[] }>();

const emit = defineEmits<{
  (e: 'sort', data: Word[]): void;
}>();

type SortingMode = 'alphabetically' | 'ascending' | 'descending';
const sortingMode = ref<SortingMode>('alphabetically');

watch(
  [props.words, sortingMode],
  () => {
    switch (sortingMode.value) {
      case 'alphabetically': {
        emit(
          'sort',
          [...props.words].sort((a, b) => {
            const aLower = a.content.toLowerCase();
            const bLower = b.content.toLowerCase();

            if (aLower < bLower) return -1;
            else if (aLower > bLower) return 1;
            else return 0;
          })
        );
        break;
      }
      case 'ascending': {
        emit(
          'sort',
          [...props.words].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
        break;
      }
      case 'descending': {
        emit(
          'sort',
          [...props.words].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
        break;
      }
    }
  },
  { immediate: true }
);

const handleSortChange = () => {
  switch (sortingMode.value) {
    case 'alphabetically': {
      sortingMode.value = 'ascending';
      break;
    }
    case 'ascending': {
      sortingMode.value = 'descending';
      break;
    }
    case 'descending': {
      sortingMode.value = 'alphabetically';
      break;
    }
  }
};
</script>

<template>
  <button @click="handleSortChange()" class="btn bg-base-100 text-lg">
    <span v-if="sortingMode === 'alphabetically'"> A </span>
    <Icon v-else-if="sortingMode === 'ascending'" icon="heroicons:bars-arrow-up" />
    <Icon v-else-if="sortingMode === 'descending'" icon="heroicons:bars-arrow-down" />
  </button>
</template>
