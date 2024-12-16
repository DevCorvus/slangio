<script setup lang="ts">
import { currentVault } from '@/data';
import { vaultService } from '@/services/vault.service';
import { useToasterStore } from '@/stores/toaster';
import { Icon } from '@iconify/vue';
import { ref, computed, useTemplateRef, onMounted } from 'vue';
import { isErrorWithMessage } from '@/utils/error';
import { popSound } from '@/sound';
import { useNewTermStore } from '@/stores/term';

const input = ref('');
const inputRef = useTemplateRef('inputRef');

onMounted(() => {
  inputRef.value?.focus();
});

const toaster = useToasterStore();
const newTermStore = useNewTermStore();

const handleNewTerm = (collectionId: string) => {
  if (!input.value) return;

  try {
    const newTerm = vaultService.addTerm(collectionId, { content: input.value });
    newTermStore.setNewTerm(newTerm);
    popSound.play();
    input.value = '';
  } catch (err) {
    if (isErrorWithMessage(err)) {
      toaster.error(err.message);
    }

    const term = vaultService.getTermByContent(input.value);

    if (term) {
      newTermStore.setNewTerm(term);
    }
  }
};

const handleDefaultCollection = (collectionId: string) => {
  currentVault.value.defaultCollection = collectionId;
};

const selectedCollection = computed(() => {
  return currentVault.value.collections.find(
    (collection) => collection.id === currentVault.value.defaultCollection
  )!;
});
</script>

<template>
  <form @submit.prevent="handleNewTerm(selectedCollection.id)">
    <input
      ref="inputRef"
      v-model.trim="input"
      type="text"
      class="input input-bordered input-primary input-lg rounded-full text-center w-full"
      placeholder="Enter new term"
    />
    <div class="relative w-[70%] mx-auto">
      <div class="dropdown dropdown-bottom w-full">
        <button type="button" class="btn btn-primary btn-sm w-full rounded-b-full">
          <span class="line-clamp-1">
            {{ selectedCollection.name }}
          </span>
        </button>
        <ul class="mt-1 w-full menu dropdown-content shadow rounded-box bg-base-100 z-10">
          <li v-for="collection in currentVault.collections" :key="collection.id">
            <button type="button" @click="handleDefaultCollection(collection.id)">
              {{ collection.name }}
            </button>
          </li>
        </ul>
      </div>
      <RouterLink
        :to="'/collections/' + selectedCollection.id"
        class="btn btn-xs btn-circle btn-outline text-neutral-content border-2 absolute top-1 right-6"
      >
        <Icon icon="heroicons:arrow-up-right-16-solid" class="text-lg shrink-0" />
      </RouterLink>
    </div>
  </form>
</template>
