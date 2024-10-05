<script setup lang="ts">
import type { Collection } from '@/types';
import { RouterLink } from 'vue-router';

const props = defineProps<Collection>();
</script>

<template>
  <RouterLink
    to="/collections/collection-name"
    class="btn btn-lg bg-base-100 w-full shadow-md h-32"
  >
    <div class="space-y-3 text-center">
      <h2>{{ props.name }}</h2>
      <p class="text-base text-neutral-400">{{ props.words.length }} words</p>
    </div>
  </RouterLink>
</template>
