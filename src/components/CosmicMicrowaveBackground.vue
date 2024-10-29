<script setup lang="ts">
import { currentVault, currentVaultLoaded, vaults, vaultsLoaded } from '@/data';
import { vaultSchema } from '@/schemas/vault';
import { watchOnce } from '@vueuse/core';
import { computed, ref } from 'vue';
import { z } from 'zod';

// This is supposed to be the AppLoader but I gave it a nerdy name

const isLoaded = computed(() => currentVaultLoaded.value && vaultsLoaded.value);

const isReady = ref(false);

watchOnce(isLoaded, async () => {
  if (isLoaded.value) {
    const result = await z.array(vaultSchema).safeParseAsync([...vaults.value, currentVault.value]);

    if (!result.success) {
      for (const term of currentVault.value.collections
        .map((collection) => collection.terms)
        .flat()) {
        if (!term.sentences) {
          term.sentences = [];
        }
      }

      for (const term of vaults.value
        .map((vault) => vault.collections)
        .flat()
        .map((collection) => collection.terms)
        .flat()) {
        if (!term.sentences) {
          term.sentences = [];
        }
      }
    }

    isReady.value = true;
  }
});
</script>

<template>
  <div v-if="!isReady" class="absolute inset-0 bg-base-100 flex items-center justify-center">
    <span class="loading loading-spinner loading-lg" />
  </div>
  <slot v-else />
</template>
