<script setup lang="ts">
import ModalComponent from './BaseModal.vue';

defineProps<{ show: boolean }>();
defineEmits<{
  (e: 'confirm'): void;
  (e: 'close'): void;
}>();
</script>

<template>
  <ModalComponent :show @close="$emit('close')" compact>
    <div class="space-y-4">
      <p class="text-lg font-semibold text-center">Are you sure?</p>
      <div class="space-x-2">
        <button @click="$emit('confirm')" class="btn btn-error">Confirm</button>
        <button @click="$emit('close')" class="btn">Cancel</button>
      </div>
    </div>
  </ModalComponent>
</template>
