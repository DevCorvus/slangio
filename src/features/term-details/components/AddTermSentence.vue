<script setup lang="ts">
import { vaultService } from '@/shared/services/vault.service';
import { inject, onMounted, ref, useTemplateRef } from 'vue';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const termId = inject<string>('termId')!;

const input = ref('');
const inputRef = useTemplateRef('inputRef');

onMounted(() => {
  inputRef.value?.focus();
});

const handleNewSentence = () => {
  if (!input.value) return;
  vaultService.addTermSentence(termId, input.value);
  emit('close');
};
</script>

<template>
  <form @submit.prevent="handleNewSentence()" class="w-full join">
    <input
      type="text"
      ref="inputRef"
      v-model.trim="input"
      @blur="$emit('close')"
      class="input input-sm input-bordered grow join-item"
      placeholder="Enter new sentence"
    />
    <button class="btn btn-sm btn-primary join-item">Apply</button>
  </form>
</template>
