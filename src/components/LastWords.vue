<script setup lang="ts">
import { profile } from '@/data';
import { computed } from 'vue';
import LastWordItem from './LastWordItem.vue';

const lastWords = computed(() => {
  return profile.value.collections
    .flat()
    .map((collection) => collection.words)
    .flat()
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 10);
});
</script>

<template>
  <section class="card card-compact w-full shadow-xl bg-base-200">
    <div class="card-body">
      <template v-if="lastWords.length > 0">
        <h2 class="card-title text-lg">Last words</h2>
        <ul class="menu">
          <li v-for="word in lastWords" :key="word.id">
            <LastWordItem :word />
          </li>
        </ul>
      </template>
      <template v-else>
        <p>No recent words</p>
      </template>
    </div>
  </section>
</template>
