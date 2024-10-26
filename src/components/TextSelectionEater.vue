<script setup lang="ts">
import { useTextSelection, watchDebounced } from '@vueuse/core';
import { ref } from 'vue';
import { currentVault } from '@/data';
import { vaultService } from '@/services/vault.service';
import { useToasterStore } from '@/stores/toaster';
import { isErrorWithMessage } from '@/utils/error';
import { popSound } from '@/sound';

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

const handleNewTerm = (text: string) => {
  const content = text.trim();
  show.value = false;

  if (content) {
    try {
      vaultService.addTerm(currentVault.value.defaultCollection, { content });
      popSound.play();
    } catch (err) {
      if (isErrorWithMessage(err)) {
        toaster.error(err.message);
      }
    }
  }
};
</script>

<template>
  <Transition name="fade">
    <form v-if="show" @submit.prevent="handleNewTerm(text)" class="fixed left-2 bottom-2 z-50">
      <button class="btn btn-sm btn-primary">ADD SELECTION</button>
    </form>
  </Transition>
</template>
