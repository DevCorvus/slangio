<script setup lang="ts">
import { vaultService, type UpdateTerm } from '@/shared/services/vault.service';
import { useToasterStore } from '@/shared/stores/toaster';
import type { Term } from '@/shared/types/term';
import { isErrorWithMessage } from '@/shared/utils/error';
import { onMounted, reactive, useTemplateRef } from 'vue';
import { currentVault } from '@/shared/data/currentVault';

const props = defineProps<{ collectionId: string; term: Term }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const contentRef = useTemplateRef('contentRef');

onMounted(() => {
  contentRef.value?.focus();
});

const formData = reactive<UpdateTerm>({
  content: props.term.content,
  collectionId: props.collectionId
});

const toaster = useToasterStore();

const handleTermUpdate = () => {
  if (!formData.content) return;

  if (formData.content == props.term.content && formData.collectionId === props.collectionId) {
    emit('close');
    return;
  }

  try {
    vaultService.updateTerm(props.term.id, {
      content: formData.content,
      collectionId: formData.collectionId
    });
    emit('close');
  } catch (err) {
    if (isErrorWithMessage(err)) {
      toaster.error(err.message);
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleTermUpdate()" class="space-y-4">
    <header class="text-xl font-semibold">Edit Term</header>
    <div class="w-full join">
      <select v-model="formData.collectionId" class="select select-bordered join-item">
        <option
          v-for="collection in currentVault.collections"
          :value="collection.id"
          :key="collection.id"
        >
          {{ collection.name }}
        </option>
      </select>
      <input
        type="text"
        ref="contentRef"
        v-model.trim="formData.content"
        class="w-full input input-bordered join-item"
      />
    </div>
    <div class="flex gap-2">
      <button class="flex-1 btn btn-primary">Apply</button>
      <button @click="$emit('close')" class="flex-1 btn">Cancel</button>
    </div>
  </form>
</template>
