<script setup lang="ts">
import { profileService } from '@/services/profile.service';
import { ref } from 'vue';

const input = ref('');

const handleIncomingWord = (collectionId: string) => {
  if (!input.value) return;
  profileService.addWord(collectionId, input.value);
  input.value = '';
};
</script>

<template>
  <form
    @submit.prevent="handleIncomingWord($route.params.id as string)"
    class="flex items-center gap-2 mt-4"
  >
    <input
      type="text"
      class="input input-bordered w-full"
      v-model="input"
      placeholder="Enter new word"
    />
    <button class="btn btn-primary">Submit</button>
  </form>
</template>
