<script setup lang="ts">
import { profileService, type CreateUpdateCollection } from '@/services/profile.service';
import { Icon } from '@iconify/vue';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps<CreateUpdateCollection>();

const modal = ref<HTMLDialogElement>();

const openModal = () => {
  if (modal.value) {
    modal.value.showModal();
  }
};

const formData = reactive<CreateUpdateCollection>({
  name: props.name,
  description: props.description
});

const handleUpdateCollection = (data: CreateUpdateCollection) => {
  if (!data.name) return;

  profileService.updateCollection(route.params.id as string, data);

  formData.name = '';
  formData.description = '';

  if (modal.value) {
    modal.value.close();
  }
};
</script>

<template>
  <button @click="openModal" class="btn btn-sm btn-ghost text-xl">
    <Icon icon="heroicons:pencil-square" />
  </button>
  <dialog ref="modal" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Edit Collection</h3>
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
        <button @click="handleUpdateCollection(formData)" class="btn btn-primary">Apply</button>
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
