<script setup lang="ts">
import { profile } from '@/data';
import { profileService, type UpdateTerm } from '@/services/profile.service';
import { useToasterStore } from '@/stores/toaster';
import type { Term } from '@/types';
import { reactive } from 'vue';

const props = defineProps<{ collectionId: string; term: Term }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const formData = reactive<UpdateTerm>({
  content: props.term.content,
  collectionId: props.collectionId
});

const toaster = useToasterStore();

const handleTermUpdate = () => {
  if (formData.content == props.term.content && formData.collectionId === props.collectionId) {
    emit('close');
    return;
  }

  const content = formData.content.trim();

  if (!content) return;

  if (content !== props.term.content) {
    const alreadyExists = profileService.doesTermAlreadyExists(content);

    if (alreadyExists) {
      if (alreadyExists) {
        toaster.error('Term already exists');
        return;
      }
    }
  }

  profileService.updateTerm(props.term.id, { content, collectionId: formData.collectionId });
  emit('close');
};
</script>

<template>
  <form @submit.prevent="handleTermUpdate()" class="space-y-2">
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
