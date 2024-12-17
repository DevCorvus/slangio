<script setup lang="ts">
import { ref } from 'vue';
import { inject } from 'vue';
import EditTermSentence from './EditTermSentence.vue';
import { Icon } from '@iconify/vue';
import { vaultService } from '@/shared/services/vault.service';

defineProps<{ content: string; index: number }>();

const termId = inject<string>('termId')!;

const showForm = ref(false);
</script>

<template>
  <div class="flex items-center justify-between px-2 py-1 bg-base-100 rounded-box">
    <template v-if="!showForm">
      <button @click="showForm = true" class="text-left">{{ content }}</button>
      <button
        @click="vaultService.removeTermSentence(termId, index)"
        class="self-start btn btn-xs btn-circle"
      >
        <Icon icon="heroicons:trash-16-solid" />
      </button>
    </template>
    <EditTermSentence v-else :content :index @close="showForm = false" />
  </div>
</template>
