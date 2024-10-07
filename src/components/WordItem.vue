<script setup lang="ts">
import type { Word } from '@/types';
import { Icon } from '@iconify/vue';
import { profileService } from '@/services/profile.service';
import { ref } from 'vue';
import WordDetails from './WordDetails.vue';

const props = defineProps<Word>();

const modal = ref<HTMLDialogElement>();

const openModal = () => {
  if (modal.value) {
    modal.value.showModal();
  }
};
</script>

<template>
  <div class="flex items-center gap-2 w-full">
    <button @click="openModal" class="btn btn-sm btn-ghost flex-1 justify-start">
      <span>{{ props.content }}</span>
    </button>
    <dialog ref="modal" class="modal">
      <div class="modal-box">
        <WordDetails v-bind="props" />
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <ul class="menu menu-horizontal p-0">
      <li>
        <button @click="profileService.removeWord($route.params.id as string, props.id)">
          <Icon icon="heroicons:trash" />
        </button>
      </li>
    </ul>
  </div>
</template>
