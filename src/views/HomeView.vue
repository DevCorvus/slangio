<script setup lang="ts">
import VaultManager from '@/components/VaultManager.vue';
import LastTerms from '@/components/LastTerms.vue';
import TermEater from '@/components/TermEater.vue';
import VaultDataManager from '@/components/VaultDataManager.vue';
</script>

<template>
  <main class="hero">
    <div class="hero-content flex flex-col gap-10 text-center max-w-md">
      <div class="relative">
        <VaultManager />
        <VaultDataManager />
      </div>
      <div class="space-y-10">
        <h1 class="text-3xl md:text-4xl font-semibold">Drop any term to never forget it</h1>
        <TermEater />
        <LastTerms />
      </div>
    </div>
  </main>
</template>
