<script setup lang="ts">
import type { Term } from '@/types';
import { computed, ref, watch } from 'vue';
import ModalComponent from './ModalComponent.vue';
import TermDetails from './TermDetails.vue';

const props = defineProps<{
  show: boolean;
  startIndex: number;
  terms: Term[];
  showCollectionLink?: boolean;
  hideMutations?: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const currentTermIndex = ref(props.startIndex);

watch(
  () => props.startIndex,
  (newIndex) => {
    currentTermIndex.value = newIndex;
  }
);

const controls = computed(() => ({
  prev: Boolean(props.terms[currentTermIndex.value - 1]),
  next: Boolean(props.terms[currentTermIndex.value + 1])
}));

const handlePrev = () => {
  if (controls.value.prev) {
    currentTermIndex.value -= 1;
  }
};

const handleNext = () => {
  if (controls.value.next) {
    currentTermIndex.value += 1;
  }
};

const handleClose = () => {
  currentTermIndex.value = props.startIndex;
  emit('close');
};
</script>

<template>
  <ModalComponent :show @close="handleClose">
    <TermDetails
      :term="terms[currentTermIndex]"
      :show-collection-link
      :hide-mutations
      :controls
      @prev="handlePrev"
      @next="handleNext"
      @close="handleClose"
      :key="terms[currentTermIndex].id"
    />
  </ModalComponent>
</template>
