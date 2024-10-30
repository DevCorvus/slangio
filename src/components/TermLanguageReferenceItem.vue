<script setup lang="ts">
import type { LanguageReference } from '@/types';
import { isCurrentFocusOnTypingInput } from '@/utils/dom';
import { Icon } from '@iconify/vue';
import { onKeyStroke } from '@vueuse/core';
import { useTemplateRef } from 'vue';

const props = defineProps<{ content: string; reference: LanguageReference }>();

const anchorRef = useTemplateRef('anchorRef');

const firstLetter = props.reference.about[0];
const rest = props.reference.about.slice(1);

onKeyStroke(firstLetter.toLowerCase(), () => {
  if (!isCurrentFocusOnTypingInput()) {
    anchorRef.value?.click();
  }
});
</script>

<template>
  <div class="flex justify-between">
    <a
      :href="reference.buildUrl(content)"
      ref="anchorRef"
      target="_blank"
      rel="noreferrer nofollow"
      class="link inline-flex items-center gap-1.5"
    >
      <Icon icon="heroicons:link-20-solid" class="text-lg" />
      {{ reference.text }}
    </a>
    <span class="text-base-content/50">
      <span class="text-info">{{ firstLetter }}</span
      >{{ rest }}
    </span>
  </div>
</template>
