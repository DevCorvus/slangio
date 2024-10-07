<script setup lang="ts">
import type { Word } from '@/types';
import SearchWords from './SearchWords.vue';
import { ref, watch } from 'vue';
import SortWords from './SortWords.vue';
import WordItem from './WordItem.vue';

const props = defineProps<{ words: Word[] }>();

const words = ref<Word[]>(props.words);

watch(props.words, () => {
  words.value = props.words;
});
</script>

<template>
  <section class="card card-compact bg-base-200 shadow">
    <div v-if="props.words.length > 0" class="card-body">
      <div class="flex items-center gap-2">
        <SearchWords :words="props.words" @search="(data) => (words = data)" />
        <SortWords :words @sort="(data) => (words = data)" />
      </div>
      <ul>
        <li v-for="word in words" :key="word.id">
          <WordItem v-bind="word" />
        </li>
      </ul>
    </div>
    <div v-else class="card-body">
      <p>No words yet</p>
    </div>
  </section>
</template>
