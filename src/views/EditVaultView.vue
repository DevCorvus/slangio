<script setup lang="ts">
import { currentVault, type CreateUpdateVault } from '@/data';
import { useRouter } from 'vue-router';
import VaultSelector from '@/components/VaultSelector.vue';
import GoBack from '@/components/GoBack.vue';

const router = useRouter();

const handleChoice = (data: CreateUpdateVault) => {
  currentVault.value.source = data.source;
  currentVault.value.target = data.target;

  router.push('/');
};
</script>

<template>
  <GoBack />
  <main class="hero min-h-screen absolute inset-0 -z-10">
    <div class="hero-content max-w-lg flex flex-col gap-10">
      <header>
        <h1 class="text-4xl font-black text-center">Edit Vault</h1>
      </header>
      <section class="space-y-4 w-full">
        <header class="text-center font-semibold text-lg">Choose</header>
        <VaultSelector @select="handleChoice" />
      </section>
    </div>
  </main>
</template>
