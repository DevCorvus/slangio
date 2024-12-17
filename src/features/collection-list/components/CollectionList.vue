<script setup lang="ts">
import CollectionListItem from './CollectionListItem.vue';
import AddCollection from './controls/AddCollection.vue';
import { Icon } from '@iconify/vue';
import SearchCollections from './controls/SearchCollections.vue';
import { ref } from 'vue';
import type { Collection } from '@/shared/types/collection';
import { currentVault } from '@/shared/data/currentVault';

const filteredCollections = ref<Collection[]>(currentVault.value.collections);
</script>

<template>
  <SearchCollections
    :collections="currentVault.collections"
    @search="(data) => (filteredCollections = data)"
  />
  <section class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    <CollectionListItem
      v-for="collection in filteredCollections"
      :collection
      :key="collection.id"
    />
    <AddCollection>
      <div class="w-full h-32 shadow-md btn btn-lg bg-base-100">
        <Icon icon="heroicons:plus" class="text-5xl text-neutral-400" />
      </div>
    </AddCollection>
  </section>
</template>
