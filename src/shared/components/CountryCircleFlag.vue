<script setup lang="ts">
defineProps<{ width: number; iso: string }>();
</script>

<template>
  <img
    :src="`https://hatscripts.github.io/circle-flags/flags/${iso}.svg`"
    :width
    class="shadow-md rounded-full"
  />
</template>
