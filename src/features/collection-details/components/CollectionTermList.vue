<script setup lang="ts">
import SearchTerms from '@/shared/components/controls/SearchTerms.vue';
import { computed, onMounted, ref } from 'vue';
import SortTerms from '@/shared/components/controls/SortTerms.vue';
import CollectionTermListItem from './CollectionTermListItem.vue';
import MoveTerms from './controls/MoveTerms.vue';
import DeleteTerms from './controls/DeleteTerms.vue';
import ExportTerms from './controls/ExportTerms.vue';
import TermSlider from '@/shared/components/term/TermSlider.vue';
import type { Term } from '@/shared/types/term';

const props = defineProps<{ terms: Term[]; termId?: string }>();

const canStartOpeningTerm = ref(true);

onMounted(() => {
  canStartOpeningTerm.value = false;
});

const sortedTerms = ref<Term[]>(props.terms);
const filteredTerms = ref<Term[]>(sortedTerms.value);

const selectedTermIds = ref<string[]>([]);

const allSelected = computed(() => selectedTermIds.value.length === filteredTerms.value.length);

const data = computed(() => {
  const terms = [];
  const learnedTerms = [];

  for (const term of filteredTerms.value) {
    term.learnedAt === null ? terms.push(term) : learnedTerms.push(term);
  }

  return { terms, learnedTerms };
});

const jointData = computed(() => [...data.value.terms, ...data.value.learnedTerms]);

const showSlider = ref(false);
const selectedIndex = ref(0);

const handleOpenDetails = (index: number) => {
  showSlider.value = true;
  selectedIndex.value = index;
};

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
    selectedTermIds.value = filteredTerms.value.map((term) => term.id);
  }
};
</script>

<template>
  <section class="shadow card card-compact bg-base-200">
    <div class="space-y-2 card-body">
      <template v-if="props.terms.length > 0">
        <div class="flex items-center gap-2 md:gap-4">
          <SearchTerms
            :terms="sortedTerms"
            :to-bypass="selectedTermIds"
            @search="(data) => (filteredTerms = data)"
          />
          <SortTerms :terms @sort="(data) => (sortedTerms = data)" />
        </div>
        <div>
          <div v-if="filteredTerms.length > 0" class="flex items-center justify-between">
            <div class="form-control">
              <label for="selectAll" class="p-0 space-x-2 cursor-pointer label">
                <input
                  id="selectAll"
                  type="checkbox"
                  @click="handleSelectAll()"
                  :checked="allSelected"
                  class="checkbox checkbox-sm"
                />
                <span class="font-semibold label-text">Select all</span>
              </label>
            </div>
            <ul class="menu menu-horizontal rounded-box">
              <MoveTerms :term-ids="selectedTermIds" @success="selectedTermIds = []" />
              <ExportTerms :term-ids="selectedTermIds" @success="selectedTermIds = []" />
              <DeleteTerms :term-ids="selectedTermIds" @success="selectedTermIds = []" />
            </ul>
          </div>
          <div v-if="filteredTerms.length > 0" class="space-y-2">
            <ul v-if="data.terms.length > 0">
              <li v-for="(term, index) in data.terms" :key="term.id">
                <CollectionTermListItem
                  :term
                  :selected="selectedTermIds.includes(term.id)"
                  :start-opened="canStartOpeningTerm && term.id === termId"
                  @open-details="handleOpenDetails(index)"
                  @selection-change="(state) => handleSelectionChange(term.id, state)"
                />
              </li>
            </ul>
            <template v-if="data.learnedTerms.length > 0">
              <div class="divider">Learned</div>
              <ul>
                <li v-for="(term, index) in data.learnedTerms" :key="term.id">
                  <CollectionTermListItem
                    :term
                    :selected="selectedTermIds.includes(term.id)"
                    :start-opened="canStartOpeningTerm && term.id === termId"
                    @open-details="handleOpenDetails(index + data.terms.length)"
                    @selection-change="(state) => handleSelectionChange(term.id, state)"
                  />
                </li>
              </ul>
            </template>
          </div>
          <p v-else>No results</p>
        </div>
      </template>
      <template v-else>
        <p>No terms yet</p>
      </template>
    </div>
  </section>
  <TermSlider
    :show="showSlider"
    :start-index="selectedIndex"
    :terms="jointData"
    @close="showSlider = false"
  />
</template>
