<script setup lang="ts">
import LanguageSelector from '@/components/LanguageSelector.vue';
import LastWords from '@/components/LastWords.vue';
import WordEater from '@/components/WordEater.vue';
</script>

<template>
  <main class="hero min-h-screen">
    <div class="hero-content flex flex-col gap-10 text-center max-w-md">
      <LanguageSelector />
      <div class="space-y-10">
        <h1 class="text-4xl text-bold">Drop your words and never forget them</h1>
        <WordEater />
        <LastWords />
      </div>
    </div>
  </main>
</template>
