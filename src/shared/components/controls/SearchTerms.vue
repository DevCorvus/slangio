<script setup lang="ts">
import type { Term } from '@/shared/types/term';
import { Icon } from '@iconify/vue';
import { watchDebounced } from '@vueuse/core';
import { onMounted, ref, useTemplateRef, watch } from 'vue';

const props = defineProps<{ terms: Term[]; toBypass?: string[]; noInputNoResults?: boolean }>();

const emit = defineEmits<{
  (e: 'search', data: Term[]): void;
}>();

const input = ref('');
const inputRef = useTemplateRef('inputRef');

onMounted(() => {
  inputRef.value?.focus();
});

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
  <label class="flex items-center w-full gap-2 input input-bordered">
    <input type="text" ref="inputRef" v-model="input" class="w-full" placeholder="Search term" />
    <Icon icon="heroicons:magnifying-glass-20-solid" />
  </label>
</template>
