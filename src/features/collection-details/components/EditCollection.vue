<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { nextTick, reactive, ref, useTemplateRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToasterStore } from '@/shared/stores/toaster';
import { isErrorWithMessage } from '@/shared/utils/error';
import BaseModal from '@/shared/components/BaseModal.vue';
import { vaultService, type CreateUpdateCollection } from '@/shared/services/vault.service';

const route = useRoute();

const props = defineProps<CreateUpdateCollection>();

const showModal = ref(false);

const nameRef = useTemplateRef('nameRef');

watch(showModal, async () => {
  if (showModal.value) {
    await nextTick();
    nameRef.value?.focus();
  }
});

const formData = reactive<CreateUpdateCollection>({
  name: props.name,
  description: props.description
});

const toaster = useToasterStore();

const handleUpdateCollection = () => {
  if (!formData.name) return;

  if (formData.name === props.name && formData.description === props.description) {
    showModal.value = false;
    return;
  }

  try {
    vaultService.updateCollection(route.params.id as string, {
      name: formData.name,
      description: formData.description
    });

    showModal.value = false;
  } catch (err) {
    if (isErrorWithMessage(err)) {
      toaster.error(err.message);
    }
  }
};
</script>

<template>
  <button @click="showModal = true" class="tooltip" data-tip="Edit">
    <Icon icon="heroicons:pencil-square" />
  </button>
  <BaseModal :show="showModal" @close="showModal = false">
    <form @submit.prevent="handleUpdateCollection()" class="space-y-4">
      <header>
        <h3 class="text-lg font-bold">Edit Collection</h3>
      </header>
      <div class="space-y-4">
        <input
          ref="nameRef"
          v-model.trim="formData.name"
          type="text"
          class="w-full input input-bordered"
          placeholder="Enter collection name"
        />
        <textarea
          v-model.trim="formData.description"
          class="w-full textarea textarea-bordered h-28"
          placeholder="Enter collection description (optional)"
        />
      </div>
      <div class="flex justify-end gap-2">
        <button class="btn btn-primary">Apply</button>
        <button type="button" @click="showModal = false" class="btn">Cancel</button>
      </div>
    </form>
  </BaseModal>
</template>
