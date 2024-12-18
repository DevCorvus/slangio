<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core';
import CountryCircleFlag from '@/shared/components/CountryCircleFlag.vue';
import { LANGUAGE_METADATA } from '@/shared/config/languages';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { nextTick, ref, useTemplateRef } from 'vue';
import { RouterLink } from 'vue-router';
import type { Vault } from '@/shared/types/vault';
import { currentVault } from '@/shared/data/currentVault';
import { vaults } from '@/shared/data/vaults';

const props = defineProps<{ vault: Vault; selected?: boolean; current?: boolean }>();

defineEmits<{
  (e: 'select', vaultId: string): void;
  (e: 'delete', vaultId: string): void;
}>();

const timeAgo = useTimeAgo(props.vault.createdAt);

const showEdit = ref(false);
const showConfirmDelete = ref(false);

const vaultName = ref(props.vault.name || '');
const vaultNameRef = useTemplateRef('vaultNameRef');

const handleShowEdit = async () => {
  showEdit.value = true;
  await nextTick();
  vaultNameRef.value?.focus();
};

const cancelDeleteRef = useTemplateRef('cancelDeleteRef');

const handleShowConfirmDelete = async () => {
  showConfirmDelete.value = true;
  await nextTick();
  cancelDeleteRef.value?.focus();
};

const handleEdit = () => {
  if (props.current) {
    currentVault.value.name = vaultName.value;
  } else {
    const vaultToEdit = vaults.value.find((v) => v.id === props.vault.id);

    if (vaultToEdit) {
      vaultToEdit.name = vaultName.value;
    }
  }

  showEdit.value = false;
};
</script>

<template>
  <div class="flex flex-col items-center gap-1">
    <div class="flex items-center gap-1">
      <div
        class="relative flex items-center justify-center w-64 gap-4 px-3 py-2 border rounded-full shadow-sm"
        :class="current ? 'border-primary' : 'border-base-content/25'"
      >
        <input
          type="radio"
          @click="$emit('select', vault.id)"
          class="absolute radio left-4"
          :checked="selected"
        />
        <button
          class="flex items-center gap-1 outline-none text-base-content/35"
          @click="$emit('select', vault.id)"
        >
          <template v-if="vault.source === vault.target">
            <Icon
              icon="heroicons:question-mark-circle-16-solid"
              class="border-4 border-dashed rounded-full size-10 border-base-content/15"
            />
            <Icon
              icon="heroicons:arrow-long-right-16-solid"
              class="text-4xl text-base-content/35"
            />
            <Icon
              icon="heroicons:question-mark-circle-16-solid"
              class="border-4 border-dashed rounded-full size-10 border-base-content/15"
            />
          </template>
          <template v-else>
            <CountryCircleFlag :width="40" :iso="LANGUAGE_METADATA[vault.source].flagIso" />
            <Icon
              icon="heroicons:arrow-long-right-16-solid"
              class="text-4xl text-base-content/35"
            />
            <CountryCircleFlag :width="40" :iso="LANGUAGE_METADATA[vault.target].flagIso" />
          </template>
        </button>
        <div class="absolute flex items-center justify-center gap-1 text-lg right-4">
          <RouterLink
            v-if="current"
            to="/edit-vault"
            class="transition hover:text-success focus:text-success tooltip"
            data-tip="Edit Vault"
          >
            <Icon icon="heroicons:pencil-square" />
          </RouterLink>
          <template v-else>
            <button
              v-if="!showConfirmDelete"
              @click="handleShowConfirmDelete()"
              class="transition hover:text-error focus:text-error tooltip"
              data-tip="Delete Vault"
            >
              <Icon icon="heroicons:trash" />
            </button>
            <div v-else class="flex items-center gap-1">
              <button
                @click="$emit('delete', vault.id)"
                class="transition tooltip hover:text-success focus:text-success"
                data-tip="Confirm"
              >
                <Icon icon="heroicons:check-16-solid" />
              </button>
              <button
                ref="cancelDeleteRef"
                @click="showConfirmDelete = false"
                class="transition tooltip hover:text-error focus:text-error"
                data-tip="Cancel"
              >
                <Icon icon="heroicons:x-mark-16-solid" />
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="text-sm text-center">
      <button v-if="!showEdit" @click="handleShowEdit()" class="font-semibold">
        {{ vault.name || vault.id }}
      </button>
      <form v-else @submit.prevent="handleEdit()" class="my-1">
        <input
          ref="vaultNameRef"
          type="text"
          v-model="vaultName"
          @blur="showEdit = false"
          class="text-center input input-sm input-bordered"
          placeholder="Enter vault name"
        />
      </form>
      <p>Created {{ timeAgo }}</p>
    </div>
  </div>
</template>
