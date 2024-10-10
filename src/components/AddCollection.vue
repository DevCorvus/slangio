<script setup lang="ts">
import { profileService, type CreateUpdateCollection } from '@/services/profile.service';
import { reactive, ref } from 'vue';
import ModalComponent from './ModalComponent.vue';

const showModal = ref(false);

const formData = reactive<CreateUpdateCollection>({
  name: '',
  description: ''
});

const handleNewCollection = (data: CreateUpdateCollection) => {
  if (!data.name) return;

  profileService.addCollection(data);

  formData.name = '';
  formData.description = '';

  showModal.value = false;
};
</script>

<template>
  <button @click="showModal = true">
    <slot />
  </button>
  <ModalComponent :show="showModal" @close="showModal = false">
    <section class="space-y-4">
      <header>
        <h3 class="text-lg font-bold">Add Collection</h3>
      </header>
      <div class="space-y-4">
        <input
          v-model="formData.name"
          type="text"
          class="input input-bordered w-full"
          placeholder="Enter collection name"
        />
        <textarea
          v-model="formData.description"
          class="textarea textarea-bordered w-full h-28"
          placeholder="Enter collection description (optional)"
        />
      </div>
      <div class="flex justify-end gap-2">
        <button @click="handleNewCollection(formData)" class="btn btn-primary">Create</button>
        <button @click="showModal = false" class="btn">Close</button>
      </div>
    </section>
  </ModalComponent>
</template>
