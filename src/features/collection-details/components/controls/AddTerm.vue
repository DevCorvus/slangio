<script setup lang="ts">
import { vaultService } from '@/shared/services/vault.service';
import { useToasterStore } from '@/shared/stores/toaster';
import { ref } from 'vue';
import { isErrorWithMessage } from '@/shared/utils/error';
import { popSound } from '@/shared/utils/sound';
import TermDataManager from './TermDataManager.vue';
import { useNewTermStore } from '@/shared/stores/newTerm';

const input = ref('');

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
</script>

<template>
  <form
    @submit.prevent="handleNewTerm($route.params.id as string)"
    class="flex items-center gap-2 mt-4"
  >
    <div class="w-full join">
      <input
        type="text"
        class="w-full input input-bordered input-primary join-item"
        v-model.trim="input"
        placeholder="Enter new term"
      />
      <button class="btn btn-primary join-item">Submit</button>
    </div>
    <TermDataManager />
  </form>
</template>
