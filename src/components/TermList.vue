<script setup lang="ts">
import type { Term } from '@/types';
import SearchTerms from './SearchTerms.vue';
import { ref, watch } from 'vue';
import SortTerms from './SortTerms.vue';
import TermItem from './TermItem.vue';

const props = defineProps<{ terms: Term[] }>();

const terms = ref<Term[]>(props.terms);

watch(props.terms, () => {
  terms.value = props.terms;
});
</script>

<template>
  <section class="card card-compact bg-base-200 shadow">
    <div v-if="props.terms.length > 0" class="card-body">
      <div class="flex items-center gap-2">
        <SearchTerms :terms @search="(data) => (terms = data)" />
        <SortTerms :terms @sort="(data) => (terms = data)" />
      </div>
      <ul>
        <li v-for="term in terms" :key="term.id">
          <TermItem :term />
        </li>
      </ul>
    </div>
    <div v-else class="card-body">
      <p>No terms yet</p>
    </div>
  </section>
</template>
