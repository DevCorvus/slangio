<script setup lang="ts">
import { profileService, type CreateUpdateCollection } from '@/services/profile.service';
import { Icon } from '@iconify/vue';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import ModalComponent from './ModalComponent.vue';

const route = useRoute();

const props = defineProps<CreateUpdateCollection>();

const showModal = ref(false);

const formData = reactive<CreateUpdateCollection>({
  name: props.name,
  description: props.description
});

const handleUpdateCollection = (data: CreateUpdateCollection) => {
  if (!data.name) return;

  profileService.updateCollection(route.params.id as string, data);

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
    <section class="space-y-4">
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
        <button @click="handleUpdateCollection(formData)" class="btn btn-primary">Apply</button>
        <button @click="showModal = false" class="btn">Close</button>
      </div>
    </section>
  </ModalComponent>
</template>
