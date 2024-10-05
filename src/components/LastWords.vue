<script setup lang="ts">
import { profile } from '@/data';
import { computed } from 'vue';

const lastWords = computed(() => {
  return profile.value.collections
    .flat()
    .map((collection) => collection.words)
    .flat()
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 5);
});
</script>

<template>
  <section class="card card-compact w-full shadow-xl bg-base-200">
    <div class="card-body">
      <template v-if="lastWords.length > 0">
        <h2 class="card-title text-lg">Last words</h2>
        <ul class="menu">
          <li v-for="word in lastWords" :key="word.id">
            <button>{{ word.content }}</button>
          </li>
        </ul>
      </template>
      <template v-else>
        <p class="text-neutral/75">No recent words</p>
      </template>
    </div>
  </section>
</template>
