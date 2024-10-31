<script setup lang="ts">
import { settings } from '@/data';
</script>

<template>
  <main class="space-y-6">
    <header class="text-2xl font-bold">
      <h1>Settings</h1>
    </header>
    <section>
      <label class="flex items-center cursor-pointer space-x-2">
        <input v-model="settings.openNewTermDetails" type="checkbox" class="checkbox" />
        <span class="label-text text-lg">Open new term details automatically</span>
      </label>
    </section>
  </main>
</template>
