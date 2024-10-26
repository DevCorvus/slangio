<script setup lang="ts">
import TermLanguageReferenceItem from './TermLanguageReferenceItem.vue';
import { computed } from 'vue';
import { LANGUAGE_CONFIG } from '@/config/languages';
import { currentVault } from '@/data';
import type { LanguageReference } from '@/types';

defineProps<{ content: string }>();

const references = computed(() => {
  const source = currentVault.value.source;
  const target = currentVault.value.target;

  if (LANGUAGE_CONFIG[source] !== undefined) {
    // @ts-ignore
    if (LANGUAGE_CONFIG[source][target] !== undefined) {
      // @ts-ignore
      return LANGUAGE_CONFIG[source][target].references as LanguageReference[];
    }
  }

  return [];
});
</script>

<template>
  <section class="space-y-4">
    <header class="text-lg font-medium">References</header>
    <ul class="space-y-2">
      <li v-for="reference in references" :key="reference.text">
        <TermLanguageReferenceItem :content :reference />
      </li>
    </ul>
  </section>
</template>
