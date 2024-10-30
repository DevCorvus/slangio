<script setup lang="ts">
import { vaultService } from '@/services/vault.service';
import type { TermMeaning } from '@/types';
import { Icon } from '@iconify/vue';
import { inject, ref } from 'vue';
import EditTermMeaning from './EditTermMeaning.vue';

defineProps<{ meaning: TermMeaning; index: number }>();

const termId = inject<string>('termId')!;

const editMode = ref(false);
</script>

<template>
  <div
    v-if="!editMode"
    class="flex justify-between items-center gap-2 py-1 px-2 bg-base-100 rounded-box"
  >
    <div>
      <p class="space-x-1">
        <strong>{{ meaning.content }}</strong>
        <span v-if="meaning.example">e.g. {{ meaning.example }}</span>
      </p>
    </div>
    <div class="flex items-center gap-1 self-start">
      <button
        @click="editMode = true"
        class="btn btn-circle btn-xs tooltip tooltip-bottom"
        data-tip="Edit"
      >
        <Icon icon="heroicons:pencil-16-solid" class="mx-auto" />
      </button>
      <button
        @click="vaultService.removeTermMeaning(termId, index)"
        class="btn btn-circle btn-xs tooltip tooltip-bottom"
        data-tip="Delete"
      >
        <Icon icon="heroicons:trash-16-solid" class="mx-auto" />
      </button>
    </div>
  </div>
  <EditTermMeaning v-else :meaning :index @close="editMode = false" />
</template>
