<script setup lang="ts">
import { profileService } from '@/services/profile.service';
import type { TermMeaning } from '@/types';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import EditTermMeaning from './EditTermMeaning.vue';

defineProps<{ termId: string; meaning: TermMeaning }>();

const editMode = ref(false);
</script>

<template>
  <div v-if="!editMode" class="flex justify-between items-center gap-2">
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
        @click="profileService.removeTermMeaning(termId, meaning.id)"
        class="btn btn-circle btn-xs tooltip tooltip-bottom"
        data-tip="Delete"
      >
        <Icon icon="heroicons:trash-16-solid" class="mx-auto" />
      </button>
    </div>
  </div>
  <EditTermMeaning v-else :term-id :meaning @close="editMode = false" />
</template>
