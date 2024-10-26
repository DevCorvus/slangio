<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <button @click="$router.back()" class="mb-4 md:mt-2 btn btn-sm btn-ghost z-30">
    <div class="flex items-center gap-2">
      <Icon icon="heroicons:arrow-uturn-left" />
      <span>Go Back</span>
    </div>
  </button>
</template>
