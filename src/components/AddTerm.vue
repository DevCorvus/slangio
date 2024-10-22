<script setup lang="ts">
import { profileService } from '@/services/profile.service';
import { useToasterStore } from '@/stores/toaster';
import { ref } from 'vue';
import soundEffect from '@/assets/sound-effect.ogg';
import BulkTermEater from './BulkTermEater.vue';

const audio = new Audio(soundEffect);

const input = ref('');

const toaster = useToasterStore();

const handleNewTerm = (collectionId: string) => {
  if (!input.value) return;

  const alreadyExists = profileService.doesTermAlreadyExists(input.value);

  if (alreadyExists) {
    toaster.error('Term already exists');
    return;
  }

  audio.play();

  profileService.addTerm(collectionId, input.value);
  input.value = '';
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

    <BulkTermEater :collection-id="$route.params.id as string" />
  </form>
</template>
