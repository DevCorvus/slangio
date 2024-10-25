<script setup lang="ts">
import type { Collection } from '@/types';
import { Icon } from '@iconify/vue';
import { watchDebounced } from '@vueuse/core';
import { ref } from 'vue';

const props = defineProps<{ collections: Collection[] }>();

const emit = defineEmits<{
  (e: 'search', data: Collection[]): void;
}>();

const input = ref('');

watchDebounced(
  input,
  () => {
    const filteredCollections = props.collections.filter((collection) =>
      collection.name.toLowerCase().includes(input.value.toLowerCase())
    );

    emit('search', filteredCollections);
  },
  { debounce: 500 }
);
</script>

<template>
  <label class="input input-bordered flex items-center gap-2">
    <input type="text" v-model="input" class="grow" placeholder="Search collection" />
    <Icon icon="heroicons:magnifying-glass-20-solid" />
  </label>
</template>
