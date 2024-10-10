<script setup lang="ts">
import type { Word } from '@/types';
import WordDefinitions from './WordDefinitions.vue';
import WordCustomMeanings from './WordCustomMeanings.vue';
import WordReferenceList from './WordReferenceList.vue';

defineProps<{ word: Word }>();
</script>

<template>
  <section class="space-y-6">
    <header>
      <h3 class="text-xl font-bold">{{ word.content }}</h3>
    </header>
    <WordCustomMeanings :word />
    <WordDefinitions :term="word.content" />
    <WordReferenceList :term="word.content" />
  </section>
</template>
