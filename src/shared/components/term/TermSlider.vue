<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import BaseModal from '@/shared/components/BaseModal.vue';
import TermDetails from '@/features/term-details/components/TermDetails.vue';
import type { Term } from '@/shared/types/term';

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
  <BaseModal :show @close="handleClose">
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
  </BaseModal>
</template>
