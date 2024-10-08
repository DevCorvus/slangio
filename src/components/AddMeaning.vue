<script setup lang="ts">
import { profileService, type CreateUpdateWordMeaning } from '@/services/profile.service';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { EXTENDED_PARTS_OF_SPEECH } from '@/constants';

const props = defineProps<{ wordId: string }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const route = useRoute();

const formData = reactive<CreateUpdateWordMeaning>({
  partOfSpeech: 'unknown',
  content: '',
  example: ''
});

const handleNewMeaning = () => {
  if (!formData.content) return;

  profileService.addWordMeaning(route.params.id as string, props.wordId, {
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
      <button class="btn btn-sm btn-primary">Add</button>
      <button type="button" @click="$emit('close')" class="btn btn-sm btn-ghost">Cancel</button>
    </div>
  </form>
</template>
