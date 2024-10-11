<script setup lang="ts">
import { profile } from '@/data';
import CollectionItem from './CollectionItem.vue';
import AddCollection from './AddCollection.vue';
import { Icon } from '@iconify/vue';
import SearchCollections from './SearchCollections.vue';
import { ref } from 'vue';
import type { Collection } from '@/types';

const filteredCollections = ref<Collection[]>(profile.value.collections);
</script>

<template>
  <SearchCollections
    :collections="profile.collections"
    @search="(data) => (filteredCollections = data)"
  />
  <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <CollectionItem v-for="collection in filteredCollections" :collection :key="collection.id" />
    <AddCollection>
      <div class="btn btn-lg bg-base-100 w-full shadow-md h-32">
        <Icon icon="heroicons:plus" class="text-5xl text-neutral-400" />
      </div>
    </AddCollection>
  </section>
</template>
