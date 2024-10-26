<script setup lang="ts">
import { currentVault } from '@/data';
import { computed } from 'vue';
import GenericTermList from './GenericTermList.vue';

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
  <GenericTermList
    :terms="lastTerms"
    title="Last terms"
    empty-msg="Nothing yet"
    show-collection-link
  />
</template>
