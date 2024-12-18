<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useFileDialog } from '@vueuse/core';
import { useToasterStore } from '@/shared/stores/toaster';
import { vaultSchema } from '@/shared/schemas/vault.schema';
import { z } from 'zod';
import BaseModal from '@/shared/components/BaseModal.vue';
import { exportVaults } from '@/shared/data/utils/exportVaults';
import { currentVault } from '@/shared/data/currentVault';
import { vaults } from '@/shared/data/vaults';

const toaster = useToasterStore();

const showModal = ref(false);

const handleBackup = () => {
  exportVaults();
  showModal.value = false;
};

const { open, onChange, reset } = useFileDialog({
  accept: 'application/json',
  multiple: false
});

onChange(async (files) => {
  if (files) {
    const file = files[0];
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const importedVaults = await z.array(vaultSchema).parseAsync(data);

      for (const importedVault of importedVaults) {
        if (
          currentVault.value.id === importedVault.id ||
          vaults.value.some((v) => v.id === importedVault.id)
        ) {
          toaster.error(`Vault ${importedVault.name || importedVault.id} already exists`);
          continue;
        }

        vaults.value.push(importedVault);
        toaster.success(`Vault ${importedVault.name || importedVault.id} imported successfully`);
        showModal.value = false;
      }
    } catch {
      toaster.error('Invalid vaults import');
    } finally {
      reset();
    }
  }
});
</script>

<template>
  <button
    @click="showModal = true"
    class="absolute flex items-center btn btn-sm btn-circle btn-ghost top-2 -right-12 tooltip"
    data-tip="Export / Import"
  >
    <Icon icon="heroicons:arrow-up-tray-16-solid" class="text-xl" />
  </button>
  <BaseModal :show="showModal" @close="showModal = false">
    <section class="space-y-6">
      <header>
        <h3 class="text-lg font-bold">Vault Data</h3>
      </header>
      <div class="space-y-2">
        <button @click="handleBackup()" class="btn btn-block">Export Backup</button>
        <button @click="open()" class="btn btn-block">Import Backup</button>
      </div>
    </section>
  </BaseModal>
</template>
