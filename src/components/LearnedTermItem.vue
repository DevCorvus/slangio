<script setup lang="ts">
import type { Term } from '@/types';
import { ref } from 'vue';
import TermDetails from './TermDetails.vue';
import ModalComponent from './ModalComponent.vue';

defineProps<{ term: Term }>();

const showModal = ref(false);
</script>

<template>
  <div class="flex items-center gap-1 w-full">
    <button
      @click="showModal = true"
      class="btn btn-sm btn-ghost text-lg flex-1 justify-start font-normal text-success"
    >
      {{ term.content }}
    </button>
    <ModalComponent :show="showModal" @close="showModal = false">
      <TermDetails :term show-collection-link />
    </ModalComponent>
  </div>
</template>
