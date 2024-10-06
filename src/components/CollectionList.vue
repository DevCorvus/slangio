<script setup lang="ts">
import { profile } from '@/data';
import CollectionItem from './CollectionItem.vue';
import AddCollection from './AddCollection.vue';
import { Icon } from '@iconify/vue';
</script>

<template>
  <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <CollectionItem
      v-for="collection in profile.collections"
      v-bind="collection"
      :key="collection.id"
    />
    <AddCollection>
      <div class="btn btn-lg bg-base-100 w-full shadow-md h-32">
        <Icon icon="heroicons:plus" class="text-5xl text-neutral-400" />
      </div>
    </AddCollection>
  </section>
</template>
