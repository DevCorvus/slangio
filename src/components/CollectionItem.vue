<script setup lang="ts">
import type { Collection } from '@/types';
import { RouterLink } from 'vue-router';

defineProps<{ collection: Collection }>();
</script>

<template>
  <RouterLink
    :to="'/collections/' + collection.id"
    class="btn btn-lg bg-base-100 w-full shadow-md h-32"
  >
    <div class="space-y-3 text-center">
      <h2>{{ collection.name }}</h2>
      <p class="text-base text-neutral-400">
        <span v-if="collection.terms.length > 0"> {{ collection.terms.length }} terms </span>
        <span v-else>Empty</span>
      </p>
    </div>
  </RouterLink>
</template>
