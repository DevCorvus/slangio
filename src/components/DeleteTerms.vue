<script setup lang="ts">
import { computed, ref } from 'vue';
import ConfirmDelete from './ConfirmDelete.vue';
import { Icon } from '@iconify/vue';
import { vaultService } from '@/services/vault.service';
import { useRoute } from 'vue-router';

const props = defineProps<{ termIds: string[] }>();

const emit = defineEmits<{
  (e: 'success'): void;
}>();

const route = useRoute();

const hasTermIds = computed(() => props.termIds.length > 0);

const showModal = ref(false);

const handleDelete = () => {
  vaultService.removeManyTerms(route.params.id as string, props.termIds);
  showModal.value = false;
  emit('success');
};
</script>

<template>
  <li :class="!hasTermIds ? 'disabled' : ''">
    <button
      @click="showModal = true"
      :disabled="!hasTermIds"
      :class="hasTermIds ? 'tooltip' : ''"
      data-tip="Remove selected terms"
    >
      <Icon icon="heroicons:trash-16-solid" />
    </button>
    <ConfirmDelete :show="showModal" @confirm="handleDelete()" @close="showModal = false" />
  </li>
</template>
