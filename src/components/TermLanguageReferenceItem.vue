<script setup lang="ts">
import type { LanguageReference } from '@/types';
import { Icon } from '@iconify/vue';

defineProps<{ content: string; reference: LanguageReference }>();
</script>

<template>
  <div class="flex justify-between">
    <a
      :href="reference.buildUrl(content)"
      target="_blank"
      rel="noreferrer nofollow"
      class="link inline-flex items-center gap-1.5"
    >
      <Icon icon="heroicons:link-20-solid" class="text-lg" />
      {{ reference.text }}
    </a>
    <span class="text-base-content/50">{{ reference.about }}</span>
  </div>
</template>
