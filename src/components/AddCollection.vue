<script setup lang="ts">
import { vaultService, type CreateUpdateCollection } from '@/services/vault.service';
import { nextTick, reactive, ref, useTemplateRef, watch } from 'vue';
import ModalComponent from './ModalComponent.vue';
import { useToasterStore } from '@/stores/toaster';
import { isErrorWithMessage } from '@/utils/error';

const showModal = ref(false);

const nameRef = useTemplateRef('nameRef');

watch(showModal, async () => {
  if (showModal.value) {
    await nextTick();
    nameRef.value?.focus();
  }
});

const formData = reactive<CreateUpdateCollection>({
  name: '',
  description: ''
});

const toaster = useToasterStore();

const handleNewCollection = () => {
  if (!formData.name) return;

  try {
    vaultService.addCollection({ name: formData.name, description: formData.description });

    formData.name = '';
    formData.description = '';

    showModal.value = false;
  } catch (err) {
    if (isErrorWithMessage(err)) {
      toaster.error(err.message);
    }
  }
};
</script>

<template>
  <button @click="showModal = true">
    <slot />
  </button>
  <ModalComponent :show="showModal" @close="showModal = false">
    <form @submit.prevent="handleNewCollection()" class="space-y-4">
      <header>
        <h3 class="text-lg font-bold">Add Collection</h3>
      </header>
      <div class="space-y-4">
        <input
          ref="nameRef"
          v-model.trim="formData.name"
          type="text"
          class="input input-bordered w-full"
          placeholder="Enter collection name"
        />
        <textarea
          v-model.trim="formData.description"
          class="textarea textarea-bordered w-full h-28"
          placeholder="Enter collection description (optional)"
        />
      </div>
      <div class="flex justify-end gap-2">
        <button class="btn btn-primary">Create</button>
        <button type="button" @click="showModal = false" class="btn">Cancel</button>
      </div>
    </form>
  </ModalComponent>
</template>
