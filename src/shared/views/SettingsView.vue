<script setup lang="ts">
import { settings } from '@/shared/data/settings';
</script>

<template>
  <main class="space-y-6">
    <header class="text-2xl font-bold">
      <h1>Settings</h1>
    </header>
    <section>
      <label class="flex items-center space-x-2 cursor-pointer">
        <input v-model="settings.openNewTermDetails" type="checkbox" class="checkbox" />
        <span class="text-lg label-text">Open new term details automatically</span>
      </label>
    </section>
  </main>
</template>
