<script setup lang="ts">
import AddCollection from '@/components/AddCollection.vue';
import CollectionList from '@/components/CollectionList.vue';
import CollectionStats from '@/components/CollectionStats.vue';
import { Icon } from '@iconify/vue';
</script>

<template>
  <main class="space-y-6 mt-8">
    <header class="text-2xl font-bold flex items-center gap-4">
      <h1>Collections</h1>
      <AddCollection>
        <Icon icon="heroicons:plus-20-solid" class="btn btn-sm btn-circle" />
      </AddCollection>
    </header>
    <CollectionStats />
    <CollectionList />
  </main>
</template>
