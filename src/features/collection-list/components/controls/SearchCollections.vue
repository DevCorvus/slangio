<script setup lang="ts">
import type { Collection } from '@/shared/types/collection';
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
  <label class="flex items-center gap-2 input input-bordered">
    <input type="text" v-model="input" class="grow" placeholder="Search collection" />
    <Icon icon="heroicons:magnifying-glass-20-solid" />
  </label>
</template>
