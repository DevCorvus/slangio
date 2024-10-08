<script setup lang="ts">
import type { Word } from '@/types';
import WordDefinitions from './WordDefinitions.vue';
import WordCustomMeanings from './WordCustomMeanings.vue';

const props = defineProps<Word>();
</script>

<template>
  <section class="space-y-4">
    <header>
      <h3 class="text-xl font-bold">{{ props.content }}</h3>
    </header>
    <WordCustomMeanings v-bind="props" />
    <WordDefinitions :word="props.content" />
  </section>
</template>
