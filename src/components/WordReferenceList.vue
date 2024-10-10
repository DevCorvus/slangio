<script setup lang="ts">
import WordReferenceItem from './WordReferenceItem.vue';
import { computed } from 'vue';
import { LanguageConfig } from '@/config/languages';
import { profile } from '@/data';
import type { Reference } from '@/types';

defineProps<{ term: string }>();

const references = computed(() => {
  const source = profile.value.source;
  const target = profile.value.target;

  if (LanguageConfig[source] !== undefined) {
    // @ts-ignore
    if (LanguageConfig[source][target] !== undefined) {
      // @ts-ignore
      return LanguageConfig[source][target].references as Reference[];
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
        <WordReferenceItem :term :reference />
      </li>
    </ul>
  </section>
</template>
