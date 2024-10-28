<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { currentVaultLoaded, firstTime, theme, vaultsLoaded } from './data';
import { watch } from 'vue';
import ToasterComponent from './components/ToasterComponent.vue';
import TextSelectionEater from './components/TextSelectionEater.vue';
import SaveVaultReminder from './components/SaveVaultReminder.vue';
import FooterSection from './components/FooterSection.vue';

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
  <template v-if="currentVaultLoaded && vaultsLoaded">
    <template v-if="!firstTime">
      <NavBar />
      <div class="container mx-auto px-4 py-8 overflow-hidden min-h-screen">
        <RouterView />
      </div>
      <FooterSection />
      <TextSelectionEater />
      <SaveVaultReminder />
    </template>
    <template v-else>
      <RouterView />
    </template>
    <ToasterComponent />
  </template>
  <div v-else class="absolute inset-0 bg-base-100 flex items-center justify-center">
    <span class="loading loading-spinner loading-lg" />
  </div>
</template>
