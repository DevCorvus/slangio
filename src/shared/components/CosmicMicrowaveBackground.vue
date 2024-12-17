<script setup lang="ts">
import { computed } from 'vue';
import { currentVaultLoaded } from '../data/currentVault';
import { vaultsLoaded } from '../data/vaults';

// This is supposed to be the AppLoader but I gave it a nerdy name

const isLoaded = computed(() => currentVaultLoaded.value && vaultsLoaded.value);
</script>

<template>
  <div v-if="!isLoaded" class="absolute inset-0 flex items-center justify-center bg-base-100">
    <span class="loading loading-spinner loading-lg" />
  </div>
  <slot v-else />
</template>
