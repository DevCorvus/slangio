<script setup lang="ts">
import { useTermStore } from '@/shared/stores/term';
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
import type { Collection } from '@/shared/types/collection';

defineProps<{ collection: Collection }>();

const store = useTermStore();
</script>

<template>
  <RouterLink
    :to="'/collections/' + collection.id"
    class="relative w-full h-32 shadow-md btn btn-lg bg-base-100"
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
      class="absolute flex items-center gap-1 text-base font-normal top-2 right-2 text-base-content/50"
    >
      <Icon icon="heroicons:academic-cap-solid" />
      {{ store.toLearn[collection.id] }}
    </span>
  </RouterLink>
</template>
