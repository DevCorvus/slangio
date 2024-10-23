<script setup lang="ts">
import { profileService, type CreateUpdateCollection } from '@/services/profile.service';
import { reactive, ref } from 'vue';
import ModalComponent from './ModalComponent.vue';
import { useToasterStore } from '@/stores/toaster';
import { isErrorWithMessage } from '@/utils/error';

const showModal = ref(false);

const formData = reactive<CreateUpdateCollection>({
  name: '',
  description: ''
});

const toaster = useToasterStore();

const handleNewCollection = () => {
  if (!formData.name) return;

  try {
    profileService.addCollection({ name: formData.name, description: formData.description });

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
