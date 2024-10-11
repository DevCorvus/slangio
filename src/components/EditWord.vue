<script setup lang="ts">
import { profile } from '@/data';
import { profileService, type UpdateWord } from '@/services/profile.service';
import type { Word } from '@/types';
import { reactive } from 'vue';

const props = defineProps<{ collectionId: string; word: Word }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const formData = reactive<UpdateWord>({
  content: props.word.content,
  collectionId: props.collectionId
});

const handleWordUpdate = () => {
  if (!formData.content) return;
  profileService.updateWord(props.word.id, formData);
  emit('close');
};
</script>

<template>
  <form @submit.prevent="handleWordUpdate()" class="space-y-2">
    <div class="join w-full">
      <select v-model="formData.collectionId" class="select select-bordered join-item">
        <option
          v-for="collection in profile.collections"
          :value="collection.id"
          :key="collection.id"
        >
          {{ collection.name }}
        </option>
      </select>
      <input
        type="text"
        v-model="formData.content"
        class="input input-bordered w-full join-item"
        autofocus
      />
    </div>
    <div class="space-x-1">
      <button class="btn btn-primary">Apply</button>
      <button @click="$emit('close')" class="btn btn-ghost">Cancel</button>
    </div>
  </form>
</template>
