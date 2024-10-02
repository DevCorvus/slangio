<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { theme } from './data';
import { watch } from 'vue';

const html = document.querySelector('html');

watch(
  theme,
  () => {
    if (html instanceof HTMLHtmlElement) {
      html.dataset.theme = theme.value;
    }
  },
  { immediate: true }
);
</script>

<template>
  <NavBar />
  <RouterView />
</template>
