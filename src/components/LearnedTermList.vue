<script setup lang="ts">
import type { Term } from '@/types';
import SearchTerms from './SearchTerms.vue';
import { ref } from 'vue';
import SortTerms from './SortTerms.vue';
import LearnedTermItem from './LearnedTermItem.vue';

const props = defineProps<{ terms: Term[]; learnedMode?: boolean }>();

const sortedTerms = ref<Term[]>(props.terms);
const filteredTerms = ref<Term[]>(sortedTerms.value);
</script>

<template>
  <section class="card card-compact bg-base-200 shadow">
    <div class="card-body space-y-2">
      <template v-if="props.terms.length > 0">
        <div class="flex items-center gap-4">
          <SearchTerms :terms="sortedTerms" @search="(data) => (filteredTerms = data)" />
          <SortTerms :terms @sort="(data) => (sortedTerms = data)" />
        </div>
        <ul v-if="filteredTerms.length > 0">
          <li v-for="term in filteredTerms" :key="term.id">
            <LearnedTermItem :term />
          </li>
        </ul>
        <p v-else>No results</p>
      </template>
      <template v-else>
        <p>No terms yet</p>
      </template>
    </div>
  </section>
</template>
