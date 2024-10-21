<script setup lang="ts">
import { profileService } from '@/services/profile.service';
import { useToasterStore } from '@/stores/toaster';
import { ref } from 'vue';

const input = ref('');

const toaster = useToasterStore();

const handleNewTerm = (collectionId: string) => {
  if (!input.value) return;

  const alreadyExists = profileService.doesTermAlreadyExists(input.value);

  if (alreadyExists) {
    toaster.error('Term already exists');
    return;
  }

  profileService.addTerm(collectionId, input.value);
  input.value = '';
};
</script>

<template>
  <form
    @submit.prevent="handleNewTerm($route.params.id as string)"
    class="flex items-center gap-2 mt-4"
  >
    <input
      type="text"
      class="input input-bordered input-primary w-full"
      v-model.trim="input"
      placeholder="Enter new term"
    />
    <button class="btn btn-primary">Submit</button>
  </form>
</template>
