<script setup lang="ts">
import { urlSchema } from '@/schemas';
import { vaultService } from '@/services/vault.service';
import type { TermReference } from '@/types';
import { onMounted } from 'vue';
import { inject, reactive, useTemplateRef } from 'vue';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const termId = inject<string>('termId')!;

const urlRef = useTemplateRef('urlRef');

onMounted(() => {
  urlRef.value?.focus();
});

const formData = reactive<TermReference>({
  url: '',
  name: ''
});

const handleNewReference = () => {
  const url = urlSchema.safeParse(formData.url);

  if (!url.success) return;

  vaultService.addTermReference(termId, {
    url: url.data,
    name: formData.name
  });

  emit('close');
};
</script>

<template>
  <form class="space-y-2 bg-base-300 p-3 rounded-lg" @submit.prevent="handleNewReference()">
    <header class="text-lg">Add Reference</header>
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
      <button class="btn btn-sm btn-primary">Add</button>
      <button type="button" @click="$emit('close')" class="btn btn-sm btn-ghost">Cancel</button>
    </div>
  </form>
</template>
