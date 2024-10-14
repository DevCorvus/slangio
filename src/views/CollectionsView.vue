<script setup lang="ts">
import AddCollection from '@/components/AddCollection.vue';
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
      <TermFinder />
    </header>
    <CollectionStats />
    <CollectionList />
  </main>
</template>
