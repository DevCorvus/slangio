<script setup lang="ts">
import { useTermStore } from '@/stores/term';
import type { Collection } from '@/types';
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';

defineProps<{ collection: Collection }>();

const store = useTermStore();
</script>

<template>
  <RouterLink
    :to="'/collections/' + collection.id"
    class="relative btn btn-lg bg-base-100 w-full shadow-md h-32"
  >
    <div class="space-y-3 text-center">
      <h2>{{ collection.name }}</h2>
      <p class="text-base text-neutral-400">
        <span v-if="collection.terms.length > 0"> {{ collection.terms.length }} terms </span>
        <span v-else>Empty</span>
      </p>
    </div>
    <span
      v-if="store.toLearn[collection.id] > 0"
      class="absolute top-2 right-2 flex items-center gap-1 font-normal text-base-content/50 text-base"
    >
      <Icon icon="heroicons:academic-cap-solid" />
      {{ store.toLearn[collection.id] }}
    </span>
  </RouterLink>
</template>
