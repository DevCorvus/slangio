<script setup lang="ts">
import { vaultService } from '@/services/vault.service';
import type { TermReference } from '@/types';
import { inject, ref } from 'vue';
import EditTermReference from './EditTermReference.vue';
import { Icon } from '@iconify/vue';

defineProps<{ reference: TermReference }>();

const termId = inject<string>('termId')!;

const editMode = ref(false);
</script>

<template>
  <div v-if="!editMode" class="flex justify-between items-center gap-2">
    <a
      :href="reference.url"
      target="_blank"
      rel="noreferrer nofollow"
      class="link line-clamp-1 w-80"
    >
      {{ reference.name || reference.url }}
    </a>
    <div class="flex items-center gap-1">
      <button
        @click="editMode = true"
        class="btn btn-circle btn-xs tooltip tooltip-bottom"
        data-tip="Edit"
      >
        <Icon icon="heroicons:pencil-16-solid" class="mx-auto" />
      </button>
      <button
        @click="vaultService.removeTermReference(termId, reference.id)"
        class="btn btn-circle btn-xs tooltip tooltip-bottom"
        data-tip="Delete"
      >
        <Icon icon="heroicons:trash-16-solid" class="mx-auto" />
      </button>
    </div>
  </div>
  <EditTermReference v-else :reference @close="editMode = false" />
</template>
