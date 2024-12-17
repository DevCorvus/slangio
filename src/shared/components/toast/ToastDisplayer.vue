<script setup lang="ts">
import { useToasterStore } from '@/shared/stores/toaster';
import ToastNotification from './ToastNotification.vue';

const toaster = useToasterStore();
</script>

<template>
  <Teleport to="#toasts">
    <TransitionGroup
      name="toast"
      tag="ul"
      class="z-50 fixed bottom-4 right-4 flex flex-col gap-2 overflow-hidden"
    >
      <li v-for="toast in toaster.toasts" :key="toast.id">
        <ToastNotification :toast />
      </li>
    </TransitionGroup>
  </Teleport>
</template>
