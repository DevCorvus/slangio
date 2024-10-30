<script setup lang="ts">
import { currentVault } from '@/data';
import { isCurrentFocusOnTypingInput } from '@/utils/dom';
import { onKeyStroke } from '@vueuse/core';
import { ref } from 'vue';
import EnglishTermDefinitions from './EnglishTermDefinitions.vue';
import SpanishTermDefinitions from './SpanishTermDefinitions.vue';

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
    <header class="collapse-title text-xl font-medium">
      <span class="text-info">D</span>efinitions
    </header>
    <div class="collapse-content space-y-4">
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
