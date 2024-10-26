<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import ModalComponent from './ModalComponent.vue';
import { currentVault, vaults } from '@/data';
import VaultItem from './VaultItem.vue';
import CountryCircleFlag from './CountryCircleFlag.vue';
import { LANGUAGE_METADATA } from '@/config/languages';
import { RouterLink } from 'vue-router';
import { useTermStore } from '@/stores/term';

const selectedVaultId = ref(currentVault.value.id);

const showModal = ref(false);

const openModal = () => {
  selectedVaultId.value = currentVault.value.id;
  showModal.value = true;
};

const store = useTermStore();

const handleSelect = () => {
  if (selectedVaultId.value === currentVault.value.id) {
    showModal.value = false;
    return;
  }

  const vaultIndex = vaults.value.findIndex((v) => v.id === selectedVaultId.value);

  if (vaultIndex !== -1) {
    const selectedVault = vaults.value.splice(vaultIndex, 1)[0];

    vaults.value.push(currentVault.value);
    currentVault.value = selectedVault;

    store.refreshToLearn();

    showModal.value = false;
  }
};

const handleDelete = (vaultId: string) => {
  if (vaultId === selectedVaultId.value) {
    selectedVaultId.value = currentVault.value.id;
  }

  vaults.value = vaults.value.filter((v) => v.id !== vaultId);
};
</script>

<template>
  <button
    @click="openModal()"
    class="flex text-base-content/35 items-center gap-1 border border-base-content/25 shadow-sm rounded-full py-1 px-3 hover:scale-110 focus:scale-110 transition"
  >
    <template v-if="currentVault.source === currentVault.target">
      <Icon
        icon="heroicons:question-mark-circle-16-solid"
        class="size-8 rounded-full border-4 border-dashed border-base-content/15"
      />
      <Icon icon="heroicons:arrow-long-right-16-solid" class="text-4xl text-base-content/35" />
      <Icon
        icon="heroicons:question-mark-circle-16-solid"
        class="size-8 rounded-full border-4 border-dashed border-base-content/15"
      />
    </template>
    <template v-else>
      <CountryCircleFlag :width="32" :iso="LANGUAGE_METADATA[currentVault.source].flagIso" />
      <Icon icon="heroicons:arrow-long-right-16-solid" class="text-4xl text-base-content/35" />
      <CountryCircleFlag :width="32" :iso="LANGUAGE_METADATA[currentVault.target].flagIso" />
    </template>
  </button>
  <ModalComponent :show="showModal" compact @close="showModal = false">
    <section class="space-y-4">
      <header>
        <h3 class="text-2xl font-semibold">Vaults</h3>
      </header>
      <ul class="space-y-3 mx-auto">
        <li>
          <VaultItem
            :vault="currentVault"
            current
            :selected="selectedVaultId === currentVault.id"
            @select="(id) => (selectedVaultId = id)"
          />
        </li>
        <li v-for="vault in vaults" :key="vault.id">
          <VaultItem
            :vault
            :selected="selectedVaultId === vault.id"
            @select="(id) => (selectedVaultId = id)"
            @delete="handleDelete"
          />
        </li>
      </ul>
      <RouterLink to="/new-vault" class="btn flex items-center gap-1">
        <Icon icon="heroicons:plus-16-solid" class="text-xl" />
        <span>Add Vault</span>
      </RouterLink>
      <div class="flex justify-end gap-2">
        <button @click="handleSelect()" class="btn btn-primary grow">Select</button>
        <button @click="showModal = false" class="btn grow">Cancel</button>
      </div>
    </section>
  </ModalComponent>
</template>
