<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import ModalComponent from './ModalComponent.vue';
import { exportProfiles, profile, profiles } from '@/data';
import { useFileDialog } from '@vueuse/core';
import { useToasterStore } from '@/stores/toaster';
import { profileSchema } from '@/schemas/profile';
import { z } from 'zod';

const toaster = useToasterStore();

const showModal = ref(false);

const handleBackup = () => {
  exportProfiles();
  showModal.value = false;
};

const {
  open: openProfiles,
  onChange: onProfiles,
  reset: resetProfiles
} = useFileDialog({
  accept: 'application/json',
  multiple: false
});

onProfiles(async (files) => {
  if (files) {
    const file = files[0];
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const importedProfiles = await z.array(profileSchema).parseAsync(data);

      for (const importedProfile of importedProfiles) {
        if (
          profile.value.id === importedProfile.id ||
          profiles.value.some((p) => p.id === importedProfile.id)
        ) {
          toaster.error(`Profile ${importedProfile.name || importedProfile.id} already exists`);
          continue;
        }

        profiles.value.push(importedProfile);
        toaster.success(
          `Profile ${importedProfile.name || importedProfile.id} imported successfully`
        );
      }
    } catch {
      toaster.error('Invalid profiles import');
    } finally {
      resetProfiles();
    }
  }
});
</script>

<template>
  <button
    @click="showModal = true"
    class="btn btn-sm btn-circle btn-ghost absolute top-2 -right-12 flex items-center tooltip"
    data-tip="Export / Import"
  >
    <Icon icon="heroicons:arrow-up-tray-16-solid" class="text-xl" />
  </button>
  <ModalComponent :show="showModal" @close="showModal = false">
    <section class="space-y-6">
      <header>
        <h3 class="text-lg font-bold">Profile Data</h3>
      </header>
      <div class="space-y-2">
        <button @click="handleBackup()" class="btn btn-block">Export Backup</button>
        <button @click="openProfiles()" class="btn btn-block">Import Backup</button>
      </div>
    </section>
  </ModalComponent>
</template>
