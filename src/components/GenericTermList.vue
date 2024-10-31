<script setup lang="ts">
import type { Term } from '@/types';
import { ref } from 'vue';
import TermSlider from './TermSlider.vue';

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
  <section class="card card-compact w-full shadow bg-base-200">
    <div class="card-body">
      <h2 class="card-title text-lg">{{ title || 'Terms' }}</h2>
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
