<script setup lang="ts">
import { vaultService } from '@/services/vault.service';
import { inject, onMounted, reactive, useTemplateRef } from 'vue';
import { EXTENDED_PARTS_OF_SPEECH } from '@/constants';
import type { TermMeaning } from '@/types';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const termId = inject<string>('termId')!;

const contentRef = useTemplateRef('contentRef');

onMounted(() => {
  contentRef.value?.focus();
});

const formData = reactive<TermMeaning>({
  partOfSpeech: 'unknown',
  content: '',
  example: ''
});

const handleNewMeaning = () => {
  if (!formData.content) return;

  vaultService.addTermMeaning(termId, {
    partOfSpeech: formData.partOfSpeech,
    content: formData.content,
    example: formData.example
  });

  emit('close');
};
</script>

<template>
  <form class="space-y-2 bg-base-300 p-3 rounded-lg" @submit.prevent="handleNewMeaning()">
    <header class="text-lg">Add Meaning</header>
    <div class="space-y-1">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Type</span>
        </div>
        <select v-model="formData.partOfSpeech" class="select select-sm select-bordered">
          <option
            v-for="partOfSpeech in EXTENDED_PARTS_OF_SPEECH"
            :key="partOfSpeech"
            :value="partOfSpeech"
          >
            {{ partOfSpeech }}
          </option>
        </select>
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Content</span>
        </div>
        <input
          type="text"
          ref="contentRef"
          v-model.trim="formData.content"
          class="input input-sm input-bordered"
          placeholder="Enter custom meaning"
        />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Example</span>
        </div>
        <input
          v-model.trim="formData.example"
          class="input input-sm input-bordered"
          placeholder="Enter example sentence (optional)"
        />
      </label>
    </div>
    <div class="space-x-1 pt-3">
      <button class="btn btn-sm btn-primary">Add</button>
      <button type="button" @click="$emit('close')" class="btn btn-sm btn-ghost">Cancel</button>
    </div>
  </form>
</template>
