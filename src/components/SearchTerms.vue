<script setup lang="ts">
import type { Term } from '@/types';
import { Icon } from '@iconify/vue';
import { watchDebounced } from '@vueuse/core';
import { ref, watch } from 'vue';

const props = defineProps<{ terms: Term[]; toBypass?: string[]; noInputNoResults?: boolean }>();

const emit = defineEmits<{
  (e: 'search', data: Term[]): void;
}>();

const input = ref('');

const searchTerms = () => {
  if (props.noInputNoResults && !input.value) {
    emit('search', []);
    return;
  }

  const inputLower = input.value.toLowerCase();

  const filteredTerms = props.terms.filter((term) => {
    if (props.toBypass?.includes(term.id)) {
      return true;
    }

    return term.content.toLowerCase().includes(inputLower);
  });

  emit('search', filteredTerms);
};

watch([() => props.terms, () => props.toBypass], searchTerms);
watchDebounced(input, searchTerms, { debounce: 500 });
</script>

<template>
  <label class="input input-bordered flex items-center gap-2 grow">
    <input type="text" v-model="input" class="grow" placeholder="Search term" />
    <Icon icon="heroicons:magnifying-glass-20-solid" />
  </label>
</template>
