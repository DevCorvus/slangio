import { nanoid } from 'nanoid';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export type ToastStatus = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  text: string;
  status: ToastStatus;
  durationInMs: number;
}

export const useToasterStore = defineStore('toaster', () => {
  const toasts = ref<Toast[]>([]);

  function addToast(status: ToastStatus, text: string, durationInMs = 2000) {
    const toastId = nanoid();

    toasts.value.push({
      id: toastId,
      text,
      status: status,
      durationInMs
    });

    setTimeout(() => remove(toastId), durationInMs);

    return toastId;
  }

  function success(text: string, durationInMs?: number) {
    return addToast('success', text, durationInMs);
  }

  function error(text: string, durationInMs?: number) {
    return addToast('error', text, durationInMs);
  }

  function warning(text: string, durationInMs?: number) {
    return addToast('warning', text, durationInMs);
  }

  function info(text: string, durationInMs?: number) {
    return addToast('info', text, durationInMs);
  }

  function remove(toastId: string) {
    toasts.value = toasts.value.filter((toast) => toast.id !== toastId);
  }

  return {
    toasts,
    success,
    error,
    warning,
    info,
    remove
  };
});
