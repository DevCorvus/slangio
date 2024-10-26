<script setup lang="ts">
import { computed, ref } from 'vue';
import ModalComponent from './ModalComponent.vue';
import { Icon } from '@iconify/vue';
import { currentVault } from '@/data';
import { vaultService } from '@/services/vault.service';
import { useRoute } from 'vue-router';

const props = defineProps<{ termIds: string[] }>();

const emit = defineEmits<{
  (e: 'success'): void;
}>();

const route = useRoute();

const hasTermIds = computed(() => props.termIds.length > 0);

const targetCollectionId = ref(currentVault.value.defaultCollection);

const showModal = ref(false);

const handleMove = () => {
  vaultService.moveManyTerms(route.params.id as string, targetCollectionId.value, props.termIds);
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
    <ModalComponent :show="showModal" @close="showModal = false">
      <form @submit.prevent="handleMove()" class="space-y-4">
        <header>
          <h3 class="text-lg font-bold">Move Terms</h3>
        </header>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Select destination</span>
          </div>
          <select v-model="targetCollectionId" class="select select-bordered w-full">
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
    </ModalComponent>
  </li>
</template>
