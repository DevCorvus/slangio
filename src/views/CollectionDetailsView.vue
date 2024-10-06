<script setup lang="ts">
import AddWord from '@/components/AddWord.vue';
import EditCollection from '@/components/EditCollection.vue';
import WordList from '@/components/WordList.vue';
import { profile } from '@/data';
import { profileService } from '@/services/profile.service';
import { Icon } from '@iconify/vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const collection = profile.value.collections.find(
  (collection) => collection.id === route.params.id
);

const handleRemoveCollection = () => {
  profileService.removeCollection(collection!.id);
  router.push('/collections');
};
</script>

<template>
  <button @click="$router.back()" class="mt-6 btn btn-sm btn-ghost">
    <div class="flex items-center gap-2">
      <Icon icon="heroicons:arrow-uturn-left" />
      <span>Go Back</span>
    </div>
  </button>
  <main v-if="collection" class="space-y-4 mt-6">
    <header class="text-2xl font-bold flex items-center justify-between">
      <h1>{{ collection.name }}</h1>
      <ul class="flex gap-2">
        <li>
          <EditCollection :name="collection.name" :description="collection.description" />
        </li>
        <li>
          <button @click="handleRemoveCollection()" class="btn btn-sm btn-ghost text-xl">
            <Icon icon="heroicons:trash" />
          </button>
        </li>
      </ul>
    </header>
    <WordList :words="collection.words" />
    <AddWord />
  </main>
  <div v-else class="mt-6">
    <p class="text-error text-xl">Collection not found</p>
  </div>
</template>
