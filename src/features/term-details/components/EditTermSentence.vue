<script setup lang="ts">
import { vaultService } from '@/shared/services/vault.service';
import { inject, onMounted, ref, useTemplateRef } from 'vue';

const props = defineProps<{ content: string; index: number }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const termId = inject<string>('termId')!;

const input = ref(props.content);
const inputRef = useTemplateRef('inputRef');

onMounted(() => {
  inputRef.value?.focus();
});

const handleSentenceUpdate = () => {
  if (!input.value) return;
  vaultService.updateTermSentence(termId, props.index, input.value);
  emit('close');
};
</script>

<template>
  <form @submit.prevent="handleSentenceUpdate()" class="w-full join">
    <input
      type="text"
      ref="inputRef"
      v-model.trim="input"
      @blur="$emit('close')"
      class="input input-sm input-bordered grow join-item"
      placeholder="Enter updated sentence"
    />
    <button class="btn btn-sm btn-primary join-item">Apply</button>
  </form>
</template>
