<script setup lang="ts">
import type { Term } from '@/types';
import SearchTerms from './SearchTerms.vue';
import { computed, ref, watch } from 'vue';
import SortTerms from './SortTerms.vue';
import TermItem from './TermItem.vue';
import MoveTerms from './MoveTerms.vue';
import DeleteTerms from './DeleteTerms.vue';

const props = defineProps<{ terms: Term[] }>();

const terms = ref<Term[]>(props.terms);

watch(props.terms, () => {
  terms.value = props.terms;
});

const selectedTermIds = ref<string[]>([]);

const allSelected = computed(() => selectedTermIds.value.length === props.terms.length);

const handleSelectionChange = (id: string, state: boolean) => {
  if (state) {
    selectedTermIds.value.push(id);
  } else {
    selectedTermIds.value = selectedTermIds.value.filter((termId) => termId !== id);
  }
};

const handleSelectAll = () => {
  if (allSelected.value) {
    selectedTermIds.value = [];
  } else {
    selectedTermIds.value = terms.value.map((term) => term.id);
  }
};
</script>

<template>
  <section class="card card-compact bg-base-200 shadow">
    <div v-if="props.terms.length > 0" class="card-body">
      <div class="flex items-center gap-2">
        <SearchTerms :terms @search="(data) => (terms = data)" />
        <SortTerms :terms @sort="(data) => (terms = data)" />
      </div>
      <div class="flex items-center justify-between">
        <div class="form-control">
          <label for="selectAll" class="p-0 label cursor-pointer space-x-2">
            <input
              id="selectAll"
              type="checkbox"
              @click="handleSelectAll()"
              :checked="allSelected"
              class="checkbox checkbox-sm"
            />
            <span class="label-text font-semibold">Select all</span>
          </label>
        </div>
        <ul class="menu menu-horizontal rounded-box">
          <MoveTerms :term-ids="selectedTermIds" @success="selectedTermIds = []" />
          <DeleteTerms :term-ids="selectedTermIds" @success="selectedTermIds = []" />
        </ul>
      </div>
      <ul>
        <li v-for="term in terms" :key="term.id">
          <TermItem
            :term
            :selected="selectedTermIds.includes(term.id)"
            @selection-change="(state) => handleSelectionChange(term.id, state)"
          />
        </li>
      </ul>
    </div>
    <div v-else class="card-body">
      <p>No terms yet</p>
    </div>
  </section>
</template>
