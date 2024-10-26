<script setup lang="ts">
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
  <button @click="$router.back()" class="mb-4 md:mt-2 btn btn-sm btn-ghost">
    <div class="flex items-center gap-2">
      <Icon icon="heroicons:arrow-uturn-left" />
      <span>Go Back</span>
    </div>
  </button>
  <main class="space-y-6">
    <header class="text-2xl font-bold flex items-center gap-2">
      <Icon icon="heroicons:check-circle" class="text-3xl text-success" />
      <h1>Learned</h1>
    </header>
    <p>All the terms you have learned so far!</p>
    <LearnedTermList :terms />
  </main>
</template>
