<script setup lang="ts">
import { vaultService } from '@/services/vault.service';
import { ref } from 'vue';
import { inject } from 'vue';
import EditTermSentence from './EditTermSentence.vue';
import { Icon } from '@iconify/vue';

defineProps<{ content: string; index: number }>();

const termId = inject<string>('termId')!;

const showForm = ref(false);
</script>

<template>
  <div class="flex justify-between items-center bg-base-100 py-1 px-2 rounded-box">
    <template v-if="!showForm">
      <button @click="showForm = true" class="text-left">{{ content }}</button>
      <button
        @click="vaultService.removeTermSentence(termId, index)"
        class="btn btn-xs btn-circle self-start"
      >
        <Icon icon="heroicons:trash-16-solid" />
      </button>
    </template>
    <EditTermSentence v-else :content :index @close="showForm = false" />
  </div>
</template>
