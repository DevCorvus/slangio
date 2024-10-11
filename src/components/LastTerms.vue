<script setup lang="ts">
import { profile } from '@/data';
import { computed } from 'vue';
import LastTermItem from './LastTermItem.vue';

const lastTerms = computed(() => {
  return profile.value.collections
    .flat()
    .map((collection) => collection.terms)
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
      <template v-if="lastTerms.length > 0">
        <h2 class="card-title text-lg">Last terms</h2>
        <ul class="menu">
          <li v-for="term in lastTerms" :key="term.id">
            <LastTermItem :term />
          </li>
        </ul>
      </template>
      <template v-else>
        <p>No terms yet</p>
      </template>
    </div>
  </section>
</template>
