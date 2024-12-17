<script setup lang="ts">
import type { Toast, ToastStatus } from '@/shared/stores/toaster';
import { Icon } from '@iconify/vue';

const props = defineProps<{ toast: Toast }>();

interface ToastStatusStyle {
  class: string;
  icon: string;
}

const getStyleFromStatus = (status: ToastStatus): ToastStatusStyle => {
  switch (status) {
    case 'success': {
      return {
        class: 'bg-success',
        icon: 'heroicons:check-circle-16-solid'
      };
    }
    case 'error': {
      return {
        class: 'bg-error',
        icon: 'heroicons:x-circle-16-solid'
      };
    }
    case 'warning': {
      return {
        class: 'bg-warning',
        icon: 'heroicons:exclamation-triangle-16-solid'
      };
    }
    case 'info': {
      return {
        class: 'bg-info',
        icon: 'heroicons:information-circle-16-solid'
      };
    }
  }
};

const toastStyle = getStyleFromStatus(props.toast.status);
</script>

<template>
  <div class="card card-compact shadow" :class="toastStyle.class">
    <div class="card-body">
      <div class="flex items-center gap-1 text-lg text-neutral">
        <Icon :icon="toastStyle.icon" />
        <span>
          {{ toast.text }}
        </span>
      </div>
    </div>
  </div>
</template>
