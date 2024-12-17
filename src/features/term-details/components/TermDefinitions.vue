<script setup lang="ts">
import { currentVault } from '@/shared/data/currentVault';
import { isCurrentFocusOnTypingInput } from '@/shared/utils/dom';
import { onKeyStroke } from '@vueuse/core';
import { ref } from 'vue';
import EnglishTermDefinitions from './definitions/EnglishTermDefinitions.vue';
import SpanishTermDefinitions from './definitions/SpanishTermDefinitions.vue';

defineProps<{ content: string }>();

const showDefinitions = ref(false);

onKeyStroke('d', () => {
  if (!isCurrentFocusOnTypingInput()) {
    showDefinitions.value = !showDefinitions.value;
  }
});
</script>

<template>
  <section class="collapse collapse-arrow bg-base-200">
    <input type="checkbox" v-model="showDefinitions" />
    <header class="text-xl font-medium collapse-title">
      <span class="text-info">D</span>efinitions
    </header>
    <div class="space-y-4 collapse-content">
      <EnglishTermDefinitions
        v-if="currentVault.target === 'en'"
        :show="showDefinitions"
        :content
      />
      <SpanishTermDefinitions
        v-else-if="currentVault.target === 'es'"
        :show="showDefinitions"
        :content
      />
    </div>
  </section>
</template>
