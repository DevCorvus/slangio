<script setup lang="ts">
import ProfileManager from '@/components/ProfileManager.vue';
import LastTerms from '@/components/LastTerms.vue';
import TermEater from '@/components/TermEater.vue';
import ProfileDataManager from '@/components/ProfileDataManager.vue';
</script>

<template>
  <main class="hero mt-4">
    <div class="hero-content flex flex-col gap-10 text-center max-w-md">
      <div class="relative">
        <ProfileManager />
        <ProfileDataManager />
      </div>
      <div class="space-y-10">
        <h1 class="text-4xl font-semibold">Drop any term and never forget it</h1>
        <TermEater />
        <LastTerms />
      </div>
    </div>
  </main>
</template>
