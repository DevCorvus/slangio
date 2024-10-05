<script setup lang="ts">
import { profile } from '@/data';
import type { Collection } from '@/types';
import { nanoid } from 'nanoid';
import { reactive, ref } from 'vue';

const modal = ref<HTMLDialogElement>();

const openModal = () => {
  if (modal.value) {
    modal.value.showModal();
  }
};

interface CreateCollection {
  name: string;
  description: string;
}

const formData = reactive<CreateCollection>({
  name: '',
  description: ''
});

const handleNewCollection = (data: CreateCollection) => {
  if (!data.name) return;

  const newCollection: Collection = {
    id: nanoid(),
    name: data.name,
    description: data.description,
    words: [],
    createdAt: new Date()
  };

  profile.value.collections.push(newCollection);

  formData.name = '';
  formData.description = '';

  if (modal.value) {
    modal.value.close();
  }
};
</script>

<template>
  <button @click="openModal">
    <slot />
  </button>
  <dialog ref="modal" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Add Collection</h3>
      <div class="space-y-4 mt-4">
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
      <div class="modal-action">
        <button @click="handleNewCollection(formData)" class="btn btn-primary">Create</button>
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
