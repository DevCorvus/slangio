<script setup lang="ts">
import { vaultService } from '@/services/vault.service';
import { useToasterStore } from '@/stores/toaster';
import { ref } from 'vue';
import TermDataManager from './TermDataManager.vue';
import { isErrorWithMessage } from '@/utils/error';
import { popSound } from '@/sound';
import { useNewTermStore } from '@/stores/term';

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
  }
};
</script>

<template>
  <form
    @submit.prevent="handleNewTerm($route.params.id as string)"
    class="flex items-center gap-2 mt-4"
  >
    <div class="join w-full">
      <input
        type="text"
        class="input input-bordered input-primary w-full join-item"
        v-model.trim="input"
        placeholder="Enter new term"
      />
      <button class="btn btn-primary join-item">Submit</button>
    </div>
    <TermDataManager />
  </form>
</template>
