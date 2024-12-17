<script setup lang="ts">
import { ref } from 'vue';
import TermSlider from './TermSlider.vue';
import type { Term } from '@/shared/types/term';

defineProps<{
  terms: Term[];
  title?: string;
  emptyMsg?: string;
  showCollectionLink?: boolean;
  hideMutations?: boolean;
}>();

const showSlider = ref(false);
const selectedIndex = ref(0);

const handleOpenDetails = (index: number) => {
  showSlider.value = true;
  selectedIndex.value = index;
};
</script>

<template>
  <section class="w-full shadow card card-compact bg-base-200">
    <div class="card-body">
      <h2 class="text-lg card-title">{{ title || 'Terms' }}</h2>
      <ul v-if="terms.length" class="menu">
        <li v-for="(term, index) in terms" :key="term.id">
          <button @click="handleOpenDetails(index)" class="text-lg">
            <span>{{ term.content }}</span>
          </button>
        </li>
      </ul>
      <p v-else>{{ emptyMsg || 'Empty' }}</p>
    </div>
  </section>
  <TermSlider
    :show="showSlider"
    :start-index="selectedIndex"
    :terms
    :show-collection-link
    :hide-mutations
    @close="showSlider = false"
  />
</template>
