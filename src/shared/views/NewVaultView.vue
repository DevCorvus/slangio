<script setup lang="ts">
import { firstTime } from '@/shared/data/firstTime';
import AddFirstVault from '../components/vault/AddFirstVault.vue';
import AddVault from '../components/vault/AddVault.vue';
</script>

<template>
  <AddFirstVault v-if="firstTime" />
  <AddVault v-else />
</template>
