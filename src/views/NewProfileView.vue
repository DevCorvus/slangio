<script setup lang="ts">
import AddFirstProfile from '@/components/AddFirstProfile.vue';
import AddProfile from '@/components/AddProfile.vue';
import { firstTime } from '@/data';
</script>

<template>
  <AddFirstProfile v-if="firstTime" />
  <AddProfile v-else />
</template>
