<script setup lang="ts">
import { profile } from '@/data';
import { profileService } from '@/services/profile.service';
import { useToasterStore } from '@/stores/toaster';
import { Icon } from '@iconify/vue';
import { ref, computed, useTemplateRef, onMounted } from 'vue';

const input = ref('');
const inputRef = useTemplateRef('inputRef');

onMounted(() => {
  inputRef.value?.focus();
});

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

const handleDefaultCollection = (collectionId: string) => {
  profile.value.defaultCollection = collectionId;
};

const selectedCollection = computed(() => {
  return profile.value.collections.find(
    (collection) => collection.id === profile.value.defaultCollection
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
    <div class="relative w-3/4 mx-auto">
      <div class="dropdown dropdown-bottom w-full">
        <button type="button" class="btn btn-primary btn-sm w-full rounded-b-full">
          <span class="line-clamp-1">
            {{ selectedCollection.name }}
          </span>
        </button>
        <ul class="mt-1 w-full menu dropdown-content shadow rounded-box bg-base-100 z-10">
          <li v-for="collection in profile.collections" :key="collection.id">
            <button type="button" @click="handleDefaultCollection(collection.id)">
              {{ collection.name }}
            </button>
          </li>
        </ul>
      </div>
      <RouterLink
        :to="'/collections/' + selectedCollection.id"
        class="absolute top-1 right-6 rounded-full border-2 border-primary-content text-primary-content p-0.5"
      >
        <Icon icon="heroicons:arrow-up-right-16-solid" />
      </RouterLink>
    </div>
  </form>
</template>
