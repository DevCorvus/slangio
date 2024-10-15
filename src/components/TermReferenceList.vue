<script setup lang="ts">
import TermReferenceItem from './TermReferenceItem.vue';
import { computed } from 'vue';
import { LANGUAGE_CONFIG } from '@/config/languages';
import { profile } from '@/data';
import type { Reference } from '@/types';

defineProps<{ content: string }>();

const references = computed(() => {
  const source = profile.value.source;
  const target = profile.value.target;

  if (LANGUAGE_CONFIG[source] !== undefined) {
    // @ts-ignore
    if (LANGUAGE_CONFIG[source][target] !== undefined) {
      // @ts-ignore
      return LANGUAGE_CONFIG[source][target].references as Reference[];
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
        <TermReferenceItem :content :reference />
      </li>
    </ul>
  </section>
</template>
