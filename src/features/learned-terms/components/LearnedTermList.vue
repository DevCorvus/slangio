<script setup lang="ts">
import { ref } from 'vue';
import type { Term } from '@/shared/types/term';
import SearchTerms from '@/shared/components/controls/SearchTerms.vue';
import SortTerms from '@/shared/components/controls/SortTerms.vue';
import TermSlider from '@/shared/components/term/TermSlider.vue';

const props = defineProps<{ terms: Term[]; learnedMode?: boolean }>();

const sortedTerms = ref<Term[]>(props.terms);
const filteredTerms = ref<Term[]>(sortedTerms.value);

const showSlider = ref(false);
const selectedIndex = ref(0);

const handleOpenDetails = (index: number) => {
  showSlider.value = true;
  selectedIndex.value = index;
};
</script>

<template>
  <section class="shadow card card-compact bg-base-200">
    <div class="space-y-2 card-body">
      <template v-if="props.terms.length > 0">
        <div class="flex items-center gap-4">
          <SearchTerms :terms="sortedTerms" @search="(data) => (filteredTerms = data)" />
          <SortTerms :terms @sort="(data) => (sortedTerms = data)" />
        </div>
        <ul v-if="filteredTerms.length > 0">
          <li v-for="(term, index) in filteredTerms" :key="term.id">
            <button
              @click="handleOpenDetails(index)"
              class="justify-start w-full text-lg font-normal btn btn-sm btn-ghost text-success"
            >
              {{ term.content }}
            </button>
          </li>
        </ul>
        <p v-else>No results</p>
      </template>
      <template v-else>
        <p>No terms yet</p>
      </template>
    </div>
  </section>
  <TermSlider
    :show="showSlider"
    :start-index="selectedIndex"
    :terms="filteredTerms"
    show-collection-link
    @close="showSlider = false"
  />
</template>
