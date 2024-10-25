<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { firstTime, theme } from './data';
import { watch } from 'vue';
import ToasterComponent from './components/ToasterComponent.vue';
import TextSelectionEater from './components/TextSelectionEater.vue';

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
  <template v-if="!firstTime">
    <NavBar />
    <div class="container mx-auto p-4 overflow-hidden">
      <RouterView />
    </div>
    <TextSelectionEater />
    <ToasterComponent />
  </template>
  <template v-else>
    <RouterView />
  </template>
</template>
