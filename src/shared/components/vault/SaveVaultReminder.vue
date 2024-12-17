<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { Icon } from '@iconify/vue';
import BaseModal from '@/shared/components/BaseModal.vue';
import { nextVaultBackupReminder } from '@/shared/data/nextVaultBackupReminder';
import { exportVaults } from '@/shared/data/utils/exportVaults';

const showModal = ref(false);

onBeforeMount(() => {
  const reminder = new Date(nextVaultBackupReminder.value);

  if (new Date().getTime() > reminder.getTime()) {
    showModal.value = true;
  }
});

const handleBackup = () => {
  exportVaults();
  showModal.value = false;
};
</script>

<template>
  <BaseModal :show="showModal" @close="showModal = false">
    <section class="space-y-6">
      <header>
        <h3 class="text-xl font-bold">Reminder</h3>
      </header>
      <p>
        All your data is stored locally in your browser so you might lose it. There are plans for
        adding accounts to sync your data but for now you should create backups regularly to keep
        your vocabulary safe!
      </p>
      <button @click="handleBackup()" class="btn btn-block btn-primary">Backup Vaults</button>
      <p class="text-base-content/50">
        This will be showing up until you create a backup, so you can't say we didn't warn you.
        <Icon icon="heroicons:face-smile-16-solid" class="inline-flex" />
      </p>
    </section>
  </BaseModal>
</template>
