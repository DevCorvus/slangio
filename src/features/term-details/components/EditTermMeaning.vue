<script setup lang="ts">
import { inject, onMounted, reactive, useTemplateRef } from 'vue';
import { EXTENDED_PARTS_OF_SPEECH } from '@/shared/constants';
import type { TermMeaning } from '@/shared/types/term';
import { vaultService } from '@/shared/services/vault.service';

const props = defineProps<{ meaning: TermMeaning; index: number }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const termId = inject<string>('termId')!;

const contentRef = useTemplateRef('contentRef');

onMounted(() => {
  contentRef.value?.focus();
});

const formData = reactive<TermMeaning>({
  partOfSpeech: props.meaning.partOfSpeech,
  content: props.meaning.content,
  example: props.meaning.example
});

const handleMeaningUpdate = () => {
  if (
    formData.partOfSpeech === props.meaning.partOfSpeech &&
    formData.content === props.meaning.content &&
    formData.example === props.meaning.example
  ) {
    emit('close');
    return;
  }

  if (!formData.content) return;

  vaultService.updateTermMeaning(termId, props.index, {
    partOfSpeech: formData.partOfSpeech,
    content: formData.content,
    example: formData.example
  });

  emit('close');
};
</script>

<template>
  <form class="p-3 space-y-2 rounded-lg bg-base-300" @submit.prevent="handleMeaningUpdate()">
    <header class="text-lg">Edit {{ meaning.content }}</header>
    <div class="space-y-1">
      <label class="w-full form-control">
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
      <label class="w-full form-control">
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
      <label class="w-full form-control">
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
    <div class="pt-3 space-x-1">
      <button class="btn btn-sm btn-primary">Apply</button>
      <button type="button" @click="$emit('close')" class="btn btn-sm btn-ghost">Cancel</button>
    </div>
  </form>
</template>
