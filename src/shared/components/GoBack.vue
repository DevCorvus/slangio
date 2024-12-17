<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{ float?: boolean }>();
</script>

<template>
  <button
    @click="$router.back()"
    class="mb-6 btn btn-sm btn-ghost"
    :class="float ? 'absolute z-10' : ''"
  >
    <div class="flex items-center gap-2">
      <Icon icon="heroicons:arrow-uturn-left" />
      <span>Go Back</span>
    </div>
  </button>
</template>
