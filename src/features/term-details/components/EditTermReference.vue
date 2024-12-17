<script setup lang="ts">
import { inject, onMounted, reactive, useTemplateRef } from 'vue';
import { urlSchema } from '@/shared/schemas/url.schema';
import { vaultService } from '@/shared/services/vault.service';
import type { TermReference } from '@/shared/types/term';

const props = defineProps<{ reference: TermReference; index: number }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const termId = inject<string>('termId')!;

const urlRef = useTemplateRef('urlRef');

onMounted(() => {
  urlRef.value?.focus();
});

const formData = reactive<TermReference>({
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

  vaultService.updateTermReference(termId, props.index, {
    url: url.data,
    name: formData.name
  });

  emit('close');
};
</script>

<template>
  <form class="p-3 space-y-2 rounded-lg bg-base-300" @submit.prevent="handleMeaningUpdate()">
    <header class="text-lg">Edit {{ reference.name || 'Reference' }}</header>
    <div class="space-y-1">
      <label class="w-full form-control">
        <div class="label">
          <span class="label-text">URL</span>
        </div>
        <input
          type="text"
          ref="urlRef"
          v-model.trim="formData.url"
          class="w-full input input-sm input-bordered"
          placeholder="Enter reference URL"
        />
      </label>
      <label class="w-full form-control">
        <div class="label">
          <span class="label-text">Alias</span>
        </div>
        <input
          type="text"
          v-model.trim="formData.name"
          class="w-full input input-sm input-bordered"
          placeholder="Enter reference alias (optional)"
        />
      </label>
    </div>
    <div class="pt-3 space-x-1">
      <button class="btn btn-sm btn-primary">Apply</button>
      <button type="button" @click="$emit('close')" class="btn btn-sm btn-ghost">Cancel</button>
    </div>
  </form>
</template>
