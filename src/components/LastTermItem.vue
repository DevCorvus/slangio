<script setup lang="ts">
import type { Term } from '@/types';
import { ref } from 'vue';
import TermDetails from './TermDetails.vue';
import ModalComponent from './ModalComponent.vue';

defineProps<{ term: Term }>();

const showModal = ref(false);
</script>

<template>
  <button @click="showModal = true">
    <span>{{ term.content }}</span>
  </button>
  <ModalComponent :show="showModal" @close="showModal = false">
    <TermDetails :term show-collection-link />
  </ModalComponent>
</template>
