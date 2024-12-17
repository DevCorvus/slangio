<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, computed, useTemplateRef, onMounted } from 'vue';
import { isErrorWithMessage } from '@/shared/utils/error';
import { popSound } from '@/shared/utils/sound';
import { currentVault } from '@/shared/data/currentVault';
import { vaultService } from '@/shared/services/vault.service';
import { useNewTermStore } from '@/shared/stores/newTerm';
import { useToasterStore } from '@/shared/stores/toaster';

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
      class="w-full text-center rounded-full input input-bordered input-primary input-lg"
      placeholder="Enter new term"
    />
    <div class="relative w-[70%] mx-auto">
      <div class="w-full dropdown dropdown-bottom">
        <button type="button" class="w-full rounded-b-full btn btn-primary btn-sm">
          <span class="line-clamp-1">
            {{ selectedCollection.name }}
          </span>
        </button>
        <ul class="z-10 w-full mt-1 shadow menu dropdown-content rounded-box bg-base-100">
          <li v-for="collection in currentVault.collections" :key="collection.id">
            <button type="button" @click="handleDefaultCollection(collection.id)">
              {{ collection.name }}
            </button>
          </li>
        </ul>
      </div>
      <RouterLink
        :to="'/collections/' + selectedCollection.id"
        class="absolute border-2 btn btn-xs btn-circle btn-outline text-neutral-content top-1 right-6"
      >
        <Icon icon="heroicons:arrow-up-right-16-solid" class="text-lg shrink-0" />
      </RouterLink>
    </div>
  </form>
</template>
