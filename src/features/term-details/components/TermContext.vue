<script setup lang="ts">
import TermSentenceList from './TermSentenceList.vue';
import TermMeaningList from './TermMeaningList.vue';
import TermReferenceList from './TermReferenceList.vue';
import { provide, ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { isCurrentFocusOnTypingInput } from '@/shared/utils/dom';
import type { Term } from '@/shared/types/term';

const props = defineProps<{ term: Term }>();

const showContext = ref(false);

onKeyStroke('c', () => {
  if (!isCurrentFocusOnTypingInput()) {
    showContext.value = !showContext.value;
  }
});

provide('termId', props.term.id);
</script>

<template>
  <section class="collapse collapse-arrow bg-base-200">
    <input type="checkbox" v-model="showContext" />
    <header class="text-xl font-medium collapse-title">
      Your <span class="text-info">C</span>ontext
    </header>
    <div class="space-y-4 collapse-content">
      <TermSentenceList :sentences="term.sentences" />
      <TermMeaningList :meanings="term.meanings" />
      <TermReferenceList :references="term.references" />
    </div>
  </section>
</template>
