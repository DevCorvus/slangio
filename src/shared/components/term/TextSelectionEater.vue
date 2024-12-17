<script setup lang="ts">
import { useTextSelection, watchDebounced } from '@vueuse/core';
import { ref } from 'vue';
import { useToasterStore } from '@/shared/stores/toaster';
import { isErrorWithMessage } from '@/shared/utils/error';
import { popSound } from '@/shared/utils/sound';
import { useNewTermStore } from '@/shared/stores/newTerm';
import { currentVault } from '@/shared/data/currentVault';
import { vaultService } from '@/shared/services/vault.service';

const { text, selection } = useTextSelection();

const show = ref(false);

watchDebounced(
  text,
  () => {
    if (selection.value?.anchorNode instanceof Text) {
      show.value = Boolean(text.value.trim());
    } else {
      show.value = false;
    }
  },
  { debounce: 1000 }
);

const toaster = useToasterStore();
const newTermStore = useNewTermStore();

const handleNewTerm = (text: string) => {
  const content = text.trim();
  show.value = false;

  if (content) {
    try {
      const newTerm = vaultService.addTerm(currentVault.value.defaultCollection, { content });
      newTermStore.setNewTerm(newTerm);
      popSound.play();
    } catch (err) {
      if (isErrorWithMessage(err)) {
        toaster.error(err.message);
      }

      const term = vaultService.getTermByContent(content);

      if (term) {
        newTermStore.setNewTerm(term);
      }
    }
  }
};
</script>

<template>
  <Transition name="fade">
    <form v-if="show" @submit.prevent="handleNewTerm(text)" class="fixed z-50 left-2 bottom-2">
      <button class="btn btn-sm btn-primary">ADD SELECTION</button>
    </form>
  </Transition>
</template>
