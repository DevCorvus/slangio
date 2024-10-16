<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="absolute inset-0 flex flex-col items-center gap-4 justify-center min-h-screen">
    <span class="font-semibold text-3xl">Not Found</span>
    <RouterLink to="/" class="link"> Go home </RouterLink>
  </div>
</template>
