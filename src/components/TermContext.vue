<script setup lang="ts">
import type { Term } from '@/types';
import TermSentenceList from './TermSentenceList.vue';
import TermMeaningList from './TermMeaningList.vue';
import TermReferenceList from './TermReferenceList.vue';
import { provide } from 'vue';

const props = defineProps<{ term: Term }>();

provide('termId', props.term.id);
</script>

<template>
  <section class="collapse collapse-arrow bg-base-200">
    <input type="checkbox" />
    <header class="collapse-title text-xl font-medium">
      <span>Your Context</span>
    </header>
    <div class="collapse-content space-y-4">
      <TermSentenceList :sentences="term.sentences" />
      <TermMeaningList :meanings="term.meanings" />
      <TermReferenceList :references="term.references" />
    </div>
  </section>
</template>
