<script setup lang="ts">
import type { TermReference } from '@/types';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import TermReferenceItem from './TermReferenceItem.vue';
import AddTermReference from './AddTermReference.vue';

defineProps<{ references: TermReference[] }>();

const showForm = ref(false);
</script>

<template>
  <section class="space-y-2">
    <header class="font-medium text-base-content/50">References</header>
    <ul class="space-y-2">
      <li v-for="reference in references" :key="reference.id">
        <TermReferenceItem :reference />
      </li>
    </ul>
    <button v-if="!showForm" @click="showForm = true" class="btn btn-sm btn-circle">
      <Icon icon="heroicons:plus" class="text-xl" />
    </button>
    <AddTermReference v-else @close="showForm = false" />
  </section>
</template>
