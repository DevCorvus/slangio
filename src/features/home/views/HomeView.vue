<script setup lang="ts">
import LastTerms from '../components/LastTerms.vue';
import TermEater from '../components/TermEater.vue';
import VaultDataManager from '../components/VaultDataManager.vue';
import VaultManager from '../components/VaultManager.vue';
</script>

<template>
  <main class="hero">
    <div class="flex flex-col max-w-md gap-10 text-center hero-content">
      <div class="relative">
        <VaultManager />
        <VaultDataManager />
      </div>
      <div class="space-y-10">
        <h1 class="text-3xl font-semibold md:text-4xl">Drop any term to never forget it</h1>
        <TermEater />
        <LastTerms />
      </div>
    </div>
  </main>
</template>
