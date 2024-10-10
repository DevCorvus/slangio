<script setup lang="ts">
import type { Word } from '@/types';
import { Icon } from '@iconify/vue';
import { profileService } from '@/services/profile.service';
import { ref } from 'vue';
import WordDetails from './WordDetails.vue';
import ModalComponent from './ModalComponent.vue';

defineProps<{ word: Word }>();

const showModal = ref(false);
</script>

<template>
  <div class="flex items-center gap-2 w-full">
    <button @click="showModal = true" class="btn btn-sm btn-ghost flex-1 justify-start">
      <span>{{ word.content }}</span>
    </button>
    <ModalComponent :show="showModal" @close="showModal = false">
      <WordDetails :word />
    </ModalComponent>
    <ul class="menu menu-horizontal p-0">
      <li>
        <button @click="profileService.removeWord(word.id)">
          <Icon icon="heroicons:trash" />
        </button>
      </li>
    </ul>
  </div>
</template>
