<script setup lang="ts">
import AddFirstVault from '@/components/AddFirstVault.vue';
import AddVault from '@/components/AddVault.vue';
import { firstTime } from '@/data';
</script>

<template>
  <AddFirstVault v-if="firstTime" />
  <AddVault v-else />
</template>
