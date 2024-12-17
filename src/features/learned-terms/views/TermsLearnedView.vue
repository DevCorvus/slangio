<script setup lang="ts">
import GoBack from '@/shared/components/GoBack.vue';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { currentVault } from '@/shared/data/currentVault';
import LearnedTermList from '../components/LearnedTermList.vue';

const terms = computed(() =>
  currentVault.value.collections
    .flat()
    .map((collection) => collection.terms)
    .flat()
    .filter((term) => term.learnedAt !== null)
);
</script>

<template>
  <GoBack />
  <main class="space-y-6">
    <header class="flex items-center gap-2 text-2xl font-bold">
      <Icon icon="heroicons:check-circle" class="text-3xl text-success" />
      <h1>Learned</h1>
    </header>
    <p>All the terms you have learned so far!</p>
    <LearnedTermList :terms />
  </main>
</template>
