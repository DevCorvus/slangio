<script setup lang="ts">
import type { Word } from '@/types';
import { ref } from 'vue';
import WordDetails from './WordDetails.vue';
import ModalComponent from './ModalComponent.vue';

defineProps<{ word: Word }>();

const showModal = ref(false);
</script>

<template>
  <button @click="showModal = true">
    <span>{{ word.content }}</span>
  </button>
  <ModalComponent :show="showModal" @close="showModal = false">
    <WordDetails :word show-collection-link />
  </ModalComponent>
</template>
