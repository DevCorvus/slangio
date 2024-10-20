<script setup lang="ts">
import type { Term } from '@/types';
import { ref } from 'vue';
import TermDetails from './TermDetails.vue';
import ModalComponent from './ModalComponent.vue';
import { inject } from 'vue';

defineProps<{ term: Term }>();

const showCollectionLink = inject<boolean>('showCollectionLink');
const hideMutations = inject<boolean>('hideMutations');

const showModal = ref(false);
</script>

<template>
  <button @click="showModal = true" class="text-lg">
    <span>{{ term.content }}</span>
  </button>
  <ModalComponent :show="showModal" @close="showModal = false">
    <TermDetails :term :show-collection-link :hide-mutations />
  </ModalComponent>
</template>
