<script setup lang="ts">
import type { Term } from '@/types';
import GenericTermItem from './GenericTermItem.vue';
import { provide } from 'vue';

const props = defineProps<{
  terms: Term[];
  title?: string;
  emptyMsg?: string;
  showCollectionLink?: boolean;
  hideMutations?: boolean;
}>();

provide('showCollectionLink', props.showCollectionLink);
provide('hideMutations', props.hideMutations);
</script>

<template>
  <section class="card card-compact w-full shadow bg-base-200">
    <div class="card-body">
      <h2 class="card-title text-lg">{{ title || 'Terms' }}</h2>
      <ul v-if="terms.length" class="menu">
        <li v-for="term in terms" :key="term.id">
          <GenericTermItem :term />
        </li>
      </ul>
      <p v-else>{{ emptyMsg || 'Empty' }}</p>
    </div>
  </section>
</template>
