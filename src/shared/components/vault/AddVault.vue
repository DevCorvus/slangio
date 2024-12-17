<script setup lang="ts">
import { useRouter } from 'vue-router';
import VaultSelector from './VaultSelector.vue';
import GoBack from '@/shared/components/GoBack.vue';
import { currentVault } from '@/shared/data/currentVault';
import { vaults } from '@/shared/data/vaults';
import { vaultService, type CreateUpdateVault } from '@/shared/services/vault.service';

const router = useRouter();

const handleChoice = (data: CreateUpdateVault) => {
  const newVault = vaultService.create(data);

  vaults.value.push(currentVault.value);
  currentVault.value = newVault;

  router.push('/');
};
</script>

<template>
  <GoBack float />
  <main class="absolute inset-0 min-h-screen hero">
    <div class="flex flex-col max-w-lg gap-10 hero-content">
      <header>
        <h1 class="text-4xl font-black text-center">Add Vault</h1>
      </header>
      <section class="w-full space-y-4">
        <header class="text-lg font-semibold text-center">Choose</header>
        <VaultSelector @select="handleChoice" />
      </section>
    </div>
  </main>
</template>
