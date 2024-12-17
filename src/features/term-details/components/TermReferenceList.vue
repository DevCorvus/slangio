<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import TermReferenceListItem from './TermReferenceListItem.vue';
import AddTermReference from './AddTermReference.vue';
import type { TermReference } from '@/shared/types/term';

defineProps<{ references: TermReference[] }>();

const showForm = ref(false);
</script>

<template>
  <section class="space-y-2">
    <header class="font-medium text-base-content/50">References</header>
    <ul class="space-y-2">
      <li v-for="(reference, index) in references" :key="index + '-reference'">
        <TermReferenceListItem :reference :index />
      </li>
    </ul>
    <button v-if="!showForm" @click="showForm = true" class="btn btn-sm btn-circle">
      <Icon icon="heroicons:plus" class="text-xl" />
    </button>
    <AddTermReference v-else @close="showForm = false" />
  </section>
</template>
