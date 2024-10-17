<script setup lang="ts">
import { profileService, type CreateUpdateTermReference } from '@/services/profile.service';
import { reactive } from 'vue';
import type { TermReference } from '@/types';
import { urlSchema } from '@/schemas';

const props = defineProps<{ termId: string; reference: TermReference }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const formData = reactive<CreateUpdateTermReference>({
  url: props.reference.url,
  name: props.reference.name
});

const handleMeaningUpdate = () => {
  if (formData.url === props.reference.url && formData.name === props.reference.name) {
    emit('close');
    return;
  }
  const url = urlSchema.safeParse(formData.url);

  if (!url.success) return;

  profileService.updateTermReference(props.termId, props.reference.id, {
    url: url.data,
    name: formData.name.trim()
  });

  emit('close');
};
</script>

<template>
  <form class="space-y-4 bg-base-300 p-3 rounded-lg" @submit.prevent="handleMeaningUpdate()">
    <header class="text-lg">Edit {{ reference.name || 'Reference' }}</header>
    <div class="space-y-2">
      <input
        type="text"
        v-model="formData.url"
        class="input input-sm input-bordered w-full"
        placeholder="Enter reference URL"
      />
      <input
        type="text"
        v-model="formData.name"
        class="input input-sm input-bordered w-full"
        placeholder="Enter reference name (optional)"
      />
    </div>
    <div class="space-x-1">
      <button class="btn btn-sm btn-primary">Apply</button>
      <button type="button" @click="$emit('close')" class="btn btn-sm btn-ghost">Cancel</button>
    </div>
  </form>
</template>
