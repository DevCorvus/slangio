<script setup lang="ts">
import type { QuizResult } from '@/types';
import GenericTermList from './GenericTermList.vue';

const props = defineProps<{ result: QuizResult }>();

defineEmits<{
  (e: 'reset'): void;
}>();

const totalTermsTested = props.result.termsTested.yes.length + props.result.termsTested.no.length;
const percentage = ((props.result.termsTested.yes.length / totalTermsTested) * 100).toFixed(0);
</script>

<template>
  <section class="space-y-10">
    <header class="text-3xl font-bold flex items-center gap-4">
      <h1>Quiz Results</h1>
    </header>
    <section class="space-y-4">
      <header class="text-xl font-semibold">
        {{ result.collectionName }}
      </header>
      <p>
        You said <strong>Yes</strong> to <strong>{{ result.termsTested.yes.length }}</strong> terms
        and <strong>No</strong> to <strong>{{ result.termsTested.no.length }}</strong> terms of
        <strong>{{ totalTermsTested }}</strong> terms in total. That is a
        <strong>{{ percentage === 'NaN' ? 0 : percentage }}%</strong> positive outcome!
      </p>
    </section>
    <button class="btn btn-block btn-primary" @click="$emit('reset')">Start another Quiz</button>
    <div class="space-y-6">
      <GenericTermList :terms="result.termsTested.no" title="No" hide-mutations />
      <GenericTermList :terms="result.termsTested.yes" title="Yes" hide-mutations />
    </div>
  </section>
</template>
