<script setup lang="ts">
import { currentVault } from '@/data';
import { vaultService, type UpdateTerm } from '@/services/vault.service';
import { useToasterStore } from '@/stores/toaster';
import type { Term } from '@/types';
import { isErrorWithMessage } from '@/utils/error';
import { onMounted, reactive, useTemplateRef } from 'vue';

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
    <header class="font-semibold text-xl">Edit Term</header>
    <div class="join w-full">
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
        class="input input-bordered w-full join-item"
      />
    </div>
    <div class="flex gap-2">
      <button class="btn btn-primary flex-1">Apply</button>
      <button @click="$emit('close')" class="btn flex-1">Cancel</button>
    </div>
  </form>
</template>
