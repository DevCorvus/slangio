<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { firstTime, theme } from './data';
import { watch } from 'vue';
import ToasterComponent from './components/ToasterComponent.vue';
import TextSelectionEater from './components/TextSelectionEater.vue';
import SaveVaultReminder from './components/SaveVaultReminder.vue';
import FooterSection from './components/FooterSection.vue';
import CosmicMicrowaveBackground from './components/CosmicMicrowaveBackground.vue';
import NewTermDetails from './components/NewTermDetails.vue';

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
  <CosmicMicrowaveBackground>
    <template v-if="!firstTime">
      <NavBar />
      <div class="container mx-auto px-4 py-8 overflow-hidden min-h-screen">
        <RouterView />
      </div>
      <FooterSection />
      <TextSelectionEater />
      <NewTermDetails />
      <SaveVaultReminder />
    </template>
    <template v-else>
      <RouterView />
    </template>
    <ToasterComponent />
  </CosmicMicrowaveBackground>
</template>
