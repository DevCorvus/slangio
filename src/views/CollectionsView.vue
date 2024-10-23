<script setup lang="ts">
import AddCollection from '@/components/AddCollection.vue';
import CollectionDataManager from '@/components/CollectionDataManager.vue';
import CollectionList from '@/components/CollectionList.vue';
import CollectionStats from '@/components/CollectionStats.vue';
import TermFinder from '@/components/TermFinder.vue';
import { Icon } from '@iconify/vue';
</script>

<template>
  <main class="space-y-6 mt-8">
    <header class="flex items-center justify-between">
      <div class="text-2xl font-bold flex items-center gap-4">
        <h1>Collections</h1>
        <AddCollection>
          <Icon icon="heroicons:plus-20-solid" class="btn btn-sm btn-circle" />
        </AddCollection>
      </div>
      <div class="flex gap-2">
        <RouterLink
          to="/learned"
          class="btn btn-sm btn-success tooltip flex items-center"
          data-tip="Learned Terms"
        >
          <Icon icon="heroicons:clipboard-document-check-16-solid" class="text-xl" />
        </RouterLink>
        <TermFinder />
        <CollectionDataManager />
      </div>
    </header>
    <CollectionStats />
    <CollectionList />
  </main>
</template>
