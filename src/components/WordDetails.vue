<script setup lang="ts">
import type { Word } from '@/types';
import WordDefinitions from './WordDefinitions.vue';

const props = defineProps<Word>();
</script>

<template>
  <section class="space-y-4">
    <header>
      <h3 class="text-lg font-bold">{{ props.content }}</h3>
    </header>
    <WordDefinitions :word="props.content" />
  </section>
</template>
