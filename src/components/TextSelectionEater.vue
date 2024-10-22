<script setup lang="ts">
import { useTextSelection, watchDebounced } from '@vueuse/core';
import { ref } from 'vue';
import { profile } from '@/data';
import { profileService } from '@/services/profile.service';
import { useToasterStore } from '@/stores/toaster';
import soundEffect from '@/assets/sound-effect.ogg';

const audio = new Audio(soundEffect);

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
    const alreadyExists = profileService.doesTermAlreadyExists(content);

    if (alreadyExists) {
      toaster.error('Term already exists');
      return;
    }

    audio.play();

    profileService.addTerm(profile.value.defaultCollection, content);
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
