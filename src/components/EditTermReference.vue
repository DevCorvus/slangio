<script setup lang="ts">
import { vaultService, type CreateUpdateTermReference } from '@/services/vault.service';
import { inject, onMounted, reactive, useTemplateRef } from 'vue';
import type { TermReference } from '@/types';
import { urlSchema } from '@/schemas';

const props = defineProps<{ reference: TermReference }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const termId = inject<string>('termId')!;

const urlRef = useTemplateRef('urlRef');

onMounted(() => {
  urlRef.value?.focus();
});

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

  vaultService.updateTermReference(termId, props.reference.id, {
    url: url.data,
    name: formData.name
  });

  emit('close');
};
</script>

<template>
  <form class="space-y-2 bg-base-300 p-3 rounded-lg" @submit.prevent="handleMeaningUpdate()">
    <header class="text-lg">Edit {{ reference.name || 'Reference' }}</header>
    <div class="space-y-1">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">URL</span>
        </div>
        <input
          type="text"
          ref="urlRef"
          v-model.trim="formData.url"
          class="input input-sm input-bordered w-full"
          placeholder="Enter reference URL"
        />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Alias</span>
        </div>
        <input
          type="text"
          v-model.trim="formData.name"
          class="input input-sm input-bordered w-full"
          placeholder="Enter reference alias (optional)"
        />
      </label>
    </div>
    <div class="space-x-1 pt-3">
      <button class="btn btn-sm btn-primary">Apply</button>
      <button type="button" @click="$emit('close')" class="btn btn-sm btn-ghost">Cancel</button>
    </div>
  </form>
</template>
