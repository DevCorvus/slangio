<script setup lang="ts">
import GoBack from '@/components/GoBack.vue';
import LearnedTermList from '@/components/LearnedTermList.vue';
import { currentVault } from '@/data';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

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
    <header class="text-2xl font-bold flex items-center gap-2">
      <Icon icon="heroicons:check-circle" class="text-3xl text-success" />
      <h1>Learned</h1>
    </header>
    <p>All the terms you have learned so far!</p>
    <LearnedTermList :terms />
  </main>
</template>
