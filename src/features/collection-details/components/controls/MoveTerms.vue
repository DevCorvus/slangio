<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';
import BaseModal from '@/shared/components/BaseModal.vue';
import { vaultService } from '@/shared/services/vault.service';
import { currentVault } from '@/shared/data/currentVault';

const props = defineProps<{ termIds: string[] }>();

const emit = defineEmits<{
  (e: 'success'): void;
}>();

const route = useRoute();
const collectionId = route.params.id as string;

const hasTermIds = computed(() => props.termIds.length > 0);

const targetCollectionId = ref(collectionId);

const showModal = ref(false);

const handleMove = () => {
  if (targetCollectionId.value !== collectionId) {
    vaultService.moveManyTerms(collectionId, targetCollectionId.value, props.termIds);
  }

  showModal.value = false;
  emit('success');
};
</script>

<template>
  <li :class="!hasTermIds ? 'disabled' : ''">
    <button
      @click="showModal = true"
      :disabled="!hasTermIds"
      :class="hasTermIds ? 'tooltip' : ''"
      data-tip="Move selected terms"
    >
      <Icon icon="heroicons:hand-raised-16-solid" />
    </button>
    <BaseModal :show="showModal" @close="showModal = false">
      <form @submit.prevent="handleMove()" class="space-y-4">
        <header>
          <h3 class="text-lg font-bold">Move Terms</h3>
        </header>
        <label class="w-full form-control">
          <div class="label">
            <span class="label-text">Select destination</span>
          </div>
          <select v-model="targetCollectionId" class="w-full select select-bordered">
            <option
              v-for="collection in currentVault.collections"
              :value="collection.id"
              :key="collection.id"
            >
              {{ collection.name }}
            </option>
          </select>
        </label>
        <div class="flex justify-end gap-2">
          <button class="btn btn-primary">Move</button>
          <button type="button" @click="showModal = false" class="btn">Cancel</button>
        </div>
      </form>
    </BaseModal>
  </li>
</template>
