<script setup lang="ts">
import { Icon } from '@iconify/vue';
import AddCollection from '../components/controls/AddCollection.vue';
import { RouterLink } from 'vue-router';
import CollectionDataManager from '../components/controls/CollectionDataManager.vue';
import CollectionStats from '../components/CollectionStats.vue';
import CollectionList from '../components/CollectionList.vue';
import TermFinder from '../components/controls/TermFinder.vue';
</script>

<template>
  <main class="max-w-4xl mx-auto space-y-6">
    <header class="flex flex-wrap items-center justify-between">
      <div class="flex items-center gap-2 text-2xl font-bold md:gap-4">
        <h1>Collections</h1>
        <AddCollection>
          <Icon icon="heroicons:plus-20-solid" class="btn btn-sm btn-circle" />
        </AddCollection>
      </div>
      <div class="flex gap-2">
        <RouterLink
          to="/learned"
          class="flex items-center btn btn-sm btn-success tooltip"
          data-tip="Learned Terms"
        >
          <Icon icon="heroicons:clipboard-document-check-16-solid" class="text-xl" />
        </RouterLink>
        <CollectionDataManager />
        <TermFinder />
      </div>
    </header>
    <CollectionStats />
    <CollectionList />
  </main>
</template>
