<script setup lang="ts">
import type { Term } from '@/types';
import TermSentenceList from './TermSentenceList.vue';
import TermMeaningList from './TermMeaningList.vue';
import TermReferenceList from './TermReferenceList.vue';
import { provide, ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { isCurrentFocusOnTypingInput } from '@/utils/dom';

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
    <header class="collapse-title text-xl font-medium">
      Your <span class="text-info">C</span>ontext
    </header>
    <div class="collapse-content space-y-4">
      <TermSentenceList :sentences="term.sentences" />
      <TermMeaningList :meanings="term.meanings" />
      <TermReferenceList :references="term.references" />
    </div>
  </section>
</template>
