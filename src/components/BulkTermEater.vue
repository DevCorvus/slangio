<script setup lang="ts">
import ModalComponent from './ModalComponent.vue';
import { useFileDialog } from '@vueuse/core';
import { useToasterStore } from '@/stores/toaster';
import { z } from 'zod';
import { ref, watch } from 'vue';
import { profileService } from '@/services/profile.service';
import { Icon } from '@iconify/vue';
import soundEffect from '@/assets/sound-effect.ogg';

const audio = new Audio(soundEffect);

const props = defineProps<{ collectionId: string }>();

const showModal = ref(false);

const input = ref('');

watch(showModal, () => {
  input.value = '';
});

const toaster = useToasterStore();

const { open: openFileDialog, onChange } = useFileDialog({
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

      input.value = terms.toString();
    } catch {
      toaster.error('Invalid JSON file');
    }
  }
});

const handleSubmit = async () => {
  if (!input.value) {
    showModal.value = false;
    return;
  }

  try {
    const data = JSON.parse(input.value);

    const terms = await stringArraySchema.parseAsync(data);

    let atLeastOneAdded = false;

    for (const term of terms) {
      if (term) {
        const alreadyExists = profileService.doesTermAlreadyExists(term);

        if (alreadyExists) {
          toaster.error(`"${term}" already exists`);
          continue;
        }

        atLeastOneAdded = true;
        profileService.addTerm(props.collectionId, term);
      }
    }

    if (atLeastOneAdded) audio.play();

    showModal.value = false;
  } catch {
    toaster.error('Invalid list of strings');
  }
};
</script>

<template>
  <button type="button" @click="showModal = true" class="btn btn-outline btn-primary">
    <Icon icon="heroicons:arrow-down-tray-16-solid" class="text-xl" />
  </button>
  <ModalComponent :show="showModal" @close="showModal = false">
    <form @submit.prevent="handleSubmit()" class="space-y-6">
      <header>
        <h3 class="text-lg font-bold">Add Terms in Bulk</h3>
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
        <button class="btn btn-primary">Create All</button>
        <button type="button" @click="$emit('close')" class="btn btn-ghost">Cancel</button>
      </div>
    </form>
  </ModalComponent>
</template>
