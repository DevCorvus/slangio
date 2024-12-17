<script setup lang="ts">
import { useRouter } from 'vue-router';
import GoBack from '@/shared/components/GoBack.vue';
import type { CreateUpdateVault } from '../services/vault.service';
import { currentVault } from '../data/currentVault';
import VaultSelector from '../components/vault/VaultSelector.vue';

const router = useRouter();

const handleChoice = (data: CreateUpdateVault) => {
  currentVault.value.source = data.source;
  currentVault.value.target = data.target;

  router.push('/');
};
</script>

<template>
  <GoBack float />
  <main class="absolute inset-0 min-h-screen hero">
    <div class="flex flex-col max-w-lg gap-10 hero-content">
      <header>
        <h1 class="text-4xl font-black text-center">Edit Vault</h1>
      </header>
      <section class="w-full space-y-4">
        <header class="text-lg font-semibold text-center">Choose</header>
        <VaultSelector @select="handleChoice" />
      </section>
    </div>
  </main>
</template>
