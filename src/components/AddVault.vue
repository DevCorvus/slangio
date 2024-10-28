<script setup lang="ts">
import { createVault, currentVault, vaults, type CreateUpdateVault } from '@/data';
import { useRouter } from 'vue-router';
import VaultSelector from './VaultSelector.vue';
import GoBack from './GoBack.vue';

const router = useRouter();

const handleChoice = (data: CreateUpdateVault) => {
  const newVault = createVault(data);

  vaults.value.push(currentVault.value);
  currentVault.value = newVault;

  router.push('/');
};
</script>

<template>
  <GoBack float />
  <main class="hero min-h-screen absolute inset-0">
    <div class="hero-content max-w-lg flex flex-col gap-10">
      <header>
        <h1 class="text-4xl font-black text-center">Add Vault</h1>
      </header>
      <section class="space-y-4 w-full">
        <header class="text-center font-semibold text-lg">Choose</header>
        <VaultSelector @select="handleChoice" />
      </section>
    </div>
  </main>
</template>
