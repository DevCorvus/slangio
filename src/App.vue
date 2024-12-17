<script setup lang="ts">
import { RouterView } from 'vue-router';
import { watch } from 'vue';
import TextSelectionEater from './shared/components/term/TextSelectionEater.vue';
import CosmicMicrowaveBackground from './shared/components/CosmicMicrowaveBackground.vue';
import { theme } from './shared/data/theme';
import { firstTime } from './shared/data/firstTime';
import TheNavbar from './shared/components/TheNavbar.vue';
import TheFooter from './shared/components/TheFooter.vue';
import NewTermDetails from './shared/components/term/NewTermDetails.vue';
import SaveVaultReminder from './shared/components/vault/SaveVaultReminder.vue';
import ToastDisplayer from './shared/components/toast/ToastDisplayer.vue';

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
      <TheNavbar />
      <div class="container min-h-screen px-4 py-8 mx-auto overflow-hidden">
        <RouterView :key="$route.fullPath" />
      </div>
      <TheFooter />
      <TextSelectionEater />
      <NewTermDetails />
      <SaveVaultReminder />
    </template>
    <template v-else>
      <RouterView />
    </template>
    <ToastDisplayer />
  </CosmicMicrowaveBackground>
</template>
