<script setup lang="ts">
import { profileService, type CreateUpdateCollection } from '@/services/profile.service';
import { Icon } from '@iconify/vue';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import ModalComponent from './ModalComponent.vue';
import { useToasterStore } from '@/stores/toaster';

const route = useRoute();

const props = defineProps<CreateUpdateCollection>();

const showModal = ref(false);

const formData = reactive<CreateUpdateCollection>({
  name: props.name,
  description: props.description
});

const toaster = useToasterStore();

const handleUpdateCollection = () => {
  if (formData.name === props.name && formData.description === props.description) {
    showModal.value = false;
    return;
  }

  const name = formData.name.trim();

  if (!name) return;

  if (name !== props.name) {
    const alreadyExists = profileService.doesCollectionAlreadyExists(name);

    if (alreadyExists) {
      toaster.error('Collection already exists');
      return;
    }
  }

  profileService.updateCollection(route.params.id as string, {
    name,
    description: formData.description
  });

  formData.name = '';
  formData.description = '';

  showModal.value = false;
};
</script>

<template>
  <button @click="showModal = true" class="tooltip" data-tip="Edit">
    <Icon icon="heroicons:pencil-square" />
  </button>
  <ModalComponent :show="showModal" @close="showModal = false">
    <form @submit.prevent="handleUpdateCollection()" class="space-y-4">
      <header>
        <h3 class="text-lg font-bold">Edit Collection</h3>
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
          class="textarea textarea-bordered w-full h-24"
          placeholder="Enter collection description (optional)"
        />
      </div>
      <div class="flex justify-end gap-2">
        <button class="btn btn-primary">Apply</button>
        <button type="button" @click="showModal = false" class="btn">Cancel</button>
      </div>
    </form>
  </ModalComponent>
</template>
