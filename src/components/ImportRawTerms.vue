<script setup lang="ts">
import { useFileDialog } from '@vueuse/core';
import { useToasterStore } from '@/stores/toaster';
import { z } from 'zod';
import { ref } from 'vue';
import { vaultService } from '@/services/vault.service';
import { isErrorWithMessage } from '@/utils/error';
import { popSound } from '@/sound';

const props = defineProps<{ collectionId: string }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const input = ref('');

const toaster = useToasterStore();

const {
  open: openFileDialog,
  onChange,
  reset
} = useFileDialog({
  accept: 'application/json',
  multiple: false
});

const stringArraySchema = z.array(z.string().trim());

onChange(async (files) => {
  if (files) {
    const file = files[0];
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const terms = await stringArraySchema.parseAsync(data);

      input.value = JSON.stringify(terms);
    } catch {
      toaster.error('Invalid raw terms import');
    } finally {
      reset();
    }
  }
});

const handleSubmit = async () => {
  if (!input.value) {
    emit('close');
    return;
  }

  try {
    const data = JSON.parse(input.value);

    const terms = await stringArraySchema.parseAsync(data);

    let atLeastOneAdded = false;

    for (const term of terms) {
      if (term) {
        try {
          vaultService.addTerm(props.collectionId, { content: term });
          atLeastOneAdded = true;
        } catch (err) {
          if (isErrorWithMessage(err)) {
            toaster.error(err.message);
          }
        }
      }
    }

    if (atLeastOneAdded) popSound.play();

    emit('close');
  } catch {
    toaster.error('Invalid list of strings');
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit()" class="space-y-6">
    <header>
      <h3 class="text-lg font-bold">Import Raw Terms</h3>
    </header>
    <button type="button" @click="openFileDialog()" class="btn btn-block">
      Upload JSON File (Array)
    </button>
    <label class="form-control w-full">
      <div class="label">
        <span class="label-text">Raw JSON Array</span>
      </div>
      <textarea
        v-model.trim="input"
        class="textarea textarea-bordered h-28"
        placeholder="Paste raw json array of terms"
      ></textarea>
    </label>
    <div class="flex justify-end gap-2">
      <button class="btn btn-primary">Import</button>
      <button type="button" @click="$emit('close')" class="btn btn-ghost">Cancel</button>
    </div>
  </form>
</template>
