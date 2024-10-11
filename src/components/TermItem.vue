<script setup lang="ts">
import type { Term } from '@/types';
import { Icon } from '@iconify/vue';
import { profileService } from '@/services/profile.service';
import { ref } from 'vue';
import TermDetails from './TermDetails.vue';
import ModalComponent from './ModalComponent.vue';

defineProps<{ term: Term }>();

const showModal = ref(false);
</script>

<template>
  <div class="flex items-center gap-2 w-full">
    <button @click="showModal = true" class="btn btn-sm btn-ghost flex-1 justify-start">
      <span>{{ term.content }}</span>
    </button>
    <ModalComponent :show="showModal" @close="showModal = false">
      <TermDetails :term />
    </ModalComponent>
    <ul class="menu menu-horizontal p-0">
      <li>
        <button @click="profileService.removeTerm(term.id)">
          <Icon icon="heroicons:trash" />
        </button>
      </li>
    </ul>
  </div>
</template>
