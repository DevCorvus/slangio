<script setup lang="ts">
import { firstTime, currentVault, type CreateUpdateVault } from '@/data';
import { useRouter } from 'vue-router';
import VaultSelector from './VaultSelector.vue';
import WorldMap from './WorldMap.vue';

const router = useRouter();

const handleChoice = (data: CreateUpdateVault) => {
  currentVault.value.source = data.source;
  currentVault.value.target = data.target;
  firstTime.value = false;

  router.push('/');
};

const skip = () => {
  firstTime.value = false;
  router.push('/');
};
</script>

<template>
  <main class="hero min-h-screen">
    <section
      class="hero-content max-w-md text-center flex flex-col gap-6 p-4 md:p-10 rounded-box md:shadow-lg md:bg-base-100/60"
    >
      <header>
        <h1 class="text-4xl font-black text-center">Welcome to Slangio</h1>
      </header>
      <p>
        Slangio helps you store, organize, memorize and share your new vocabulary in any language
      </p>
      <section class="space-y-4 w-full">
        <span class="text-center font-semibold text-lg">Choose to start</span>
        <VaultSelector @select="handleChoice" />
      </section>
    </section>
    <WorldMap
      class="text-base-content/10 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full -z-50"
    />
  </main>
  <button @click="skip()" class="btn btn-sm absolute bottom-2 right-2">Skip</button>
</template>
