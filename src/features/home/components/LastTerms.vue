<script setup lang="ts">
import { computed } from 'vue';
import { currentVault } from '@/shared/data/currentVault';
import BaseTermList from '@/shared/components/term/BaseTermList.vue';

const lastTerms = computed(() => {
  return currentVault.value.collections
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
  <BaseTermList
    :terms="lastTerms"
    title="Last terms"
    empty-msg="Nothing yet"
    show-collection-link
  />
</template>
