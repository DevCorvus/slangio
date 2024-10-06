<script setup lang="ts">
import { profileService } from '@/services/profile.service';
import type { Word } from '@/types';
import { Icon } from '@iconify/vue';
import SearchWords from './SearchWords.vue';
import { ref, watch } from 'vue';
import SortWords from './SortWords.vue';

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
          <div class="flex items-center gap-2 w-full">
            <button class="btn btn-sm btn-ghost flex-1 justify-start">
              <span>{{ word.content }}</span>
            </button>
            <ul class="menu menu-horizontal p-0">
              <li>
                <button @click="profileService.removeWord($route.params.id as string, word.id)">
                  <Icon icon="heroicons:trash" />
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="card-body">
      <p>No words yet</p>
    </div>
  </section>
</template>
