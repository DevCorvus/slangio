<script setup lang="ts">
import { profileService, type CreateUpdateWordMeaning } from '@/services/profile.service';
import { reactive } from 'vue';
import { EXTENDED_PARTS_OF_SPEECH } from '@/constants';
import type { WordMeaning } from '@/types';

const props = defineProps<{ wordId: string; meaning: WordMeaning }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const formData = reactive<CreateUpdateWordMeaning>({
  partOfSpeech: props.meaning.partOfSpeech,
  content: props.meaning.content,
  example: props.meaning.example
});

const handleMeaningUpdate = () => {
  if (!formData.content) return;

  profileService.updateWordMeaning(props.wordId, props.meaning.id, {
    partOfSpeech: formData.partOfSpeech,
    content: formData.content,
    example: formData.example
  });

  emit('close');
};
</script>

<template>
  <form class="space-y-2 bg-base-300 p-3 rounded-lg" @submit.prevent="handleMeaningUpdate()">
    <header class="text-lg">Edit {{ meaning.content }}</header>
    <div class="flex gap-1">
      <label class="form-control">
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
      <label class="form-control grow">
        <div class="label">
          <span class="label-text">Content</span>
        </div>
        <input
          type="text"
          v-model="formData.content"
          class="input input-sm input-bordered grow"
          placeholder="Enter custom meaning"
        />
      </label>
    </div>
    <textarea
      v-model="formData.example"
      class="textarea textarea-sm textarea-bordered w-full"
      placeholder="Enter example sentence (optional)"
    ></textarea>
    <div class="space-x-1">
      <button class="btn btn-sm btn-primary">Apply</button>
      <button type="button" @click="$emit('close')" class="btn btn-sm btn-ghost">Cancel</button>
    </div>
  </form>
</template>
