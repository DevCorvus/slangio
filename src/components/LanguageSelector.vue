<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <button
    disabled
    class="flex items-center gap-1 border border-base-content/25 shadow-sm rounded-full py-1 px-3"
  >
    <img
      src="https://hatscripts.github.io/circle-flags/flags/es.svg"
      width="32"
      class="shadow-md rounded-full"
    />
    <Icon icon="heroicons:arrow-long-right-16-solid" class="text-4xl text-base-content/35" />
    <img
      src="https://hatscripts.github.io/circle-flags/flags/gb.svg"
      width="32"
      class="shadow-md rounded-full"
    />
  </button>
</template>
