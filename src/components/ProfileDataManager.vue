<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import ModalComponent from './ModalComponent.vue';
import { profile, profiles } from '@/data';
import { downloadJson } from '@/utils/download';
import { useFileDialog } from '@vueuse/core';
import { useToasterStore } from '@/stores/toaster';
import { profileSchema } from '@/schemas/profile';
import { useTermStore } from '@/stores/term';
import { localeDateNow } from '@/utils/date';

const toaster = useToasterStore();

const showModal = ref(false);

const handleExport = () => {
  const filename = `profile.${profile.value.name || profile.value.id}.${localeDateNow()}`;
  downloadJson(filename, profile.value);
};

const {
  open: openFileDialog,
  onChange,
  reset
} = useFileDialog({
  accept: 'application/json',
  multiple: false
});

const store = useTermStore();

onChange(async (files) => {
  if (files) {
    const file = files[0];
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const importedProfile = await profileSchema.parseAsync(data);

      if (
        profile.value.id === importedProfile.id ||
        profiles.value.some((p) => p.id === importedProfile.id)
      ) {
        toaster.error('Profile already exists');
        return;
      }

      profiles.value.push(profile.value);
      profile.value = importedProfile;

      store.refreshToLearn();

      showModal.value = false;
    } catch {
      toaster.error('Invalid profile import');
    } finally {
      reset();
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
        <button @click="handleExport()" class="btn btn-block">Export Profile</button>
        <button @click="openFileDialog()" class="btn btn-block">Import Profile</button>
      </div>
      <p class="flex items-center gap-2 text-base-content/50">
        <Icon icon="heroicons:exclamation-circle" class="text-xl shrink-0" />
        <span>Progress included</span>
      </p>
    </section>
  </ModalComponent>
</template>
