<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import ModalComponent from './ModalComponent.vue';
import { profile, profiles } from '@/data';
import ProfileItem from './ProfileItem.vue';
import CountryCircleFlag from './CountryCircleFlag.vue';
import { LANGUAGE_METADATA } from '@/config/languages';
import { RouterLink } from 'vue-router';
import { useTermStore } from '@/stores/term';

const selectedProfileId = ref(profile.value.id);

const showModal = ref(false);

const openModal = () => {
  selectedProfileId.value = profile.value.id;
  showModal.value = true;
};

const store = useTermStore();

const handleSelect = () => {
  if (selectedProfileId.value === profile.value.id) {
    showModal.value = false;
    return;
  }

  const profileIndex = profiles.value.findIndex((p) => p.id === selectedProfileId.value);

  if (profileIndex !== -1) {
    const selectedProfile = profiles.value.splice(profileIndex, 1)[0];

    profiles.value.push(profile.value);
    profile.value = selectedProfile;

    store.refreshToLearn();

    showModal.value = false;
  }
};

const handleDelete = (profileId: string) => {
  if (profileId === selectedProfileId.value) {
    selectedProfileId.value = profile.value.id;
  }

  profiles.value = profiles.value.filter((p) => p.id !== profileId);
};
</script>

<template>
  <button
    @click="openModal()"
    class="flex text-base-content/35 items-center gap-1 border border-base-content/25 shadow-sm rounded-full py-1 px-3 hover:scale-110 focus:scale-110 transition"
  >
    <template v-if="profile.source === profile.target">
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
      <CountryCircleFlag :width="32" :iso="LANGUAGE_METADATA[profile.source].flagIso" />
      <Icon icon="heroicons:arrow-long-right-16-solid" class="text-4xl text-base-content/35" />
      <CountryCircleFlag :width="32" :iso="LANGUAGE_METADATA[profile.target].flagIso" />
    </template>
  </button>
  <ModalComponent :show="showModal" compact @close="showModal = false">
    <section class="space-y-4">
      <header>
        <h3 class="text-2xl font-semibold">Profiles</h3>
      </header>
      <ul class="space-y-3 mx-auto">
        <li>
          <ProfileItem
            :profile
            current
            :selected="selectedProfileId === profile.id"
            @select="(id) => (selectedProfileId = id)"
          />
        </li>
        <li v-for="profile in profiles" :key="profile.id">
          <ProfileItem
            :profile
            :selected="selectedProfileId === profile.id"
            @select="(id) => (selectedProfileId = id)"
            @delete="handleDelete"
          />
        </li>
      </ul>
      <RouterLink to="/new-profile" class="btn flex items-center gap-1">
        <Icon icon="heroicons:plus-16-solid" class="text-xl" />
        <span>Add Profile</span>
      </RouterLink>
      <div class="flex justify-end gap-2">
        <button @click="handleSelect()" class="btn btn-primary grow">Select</button>
        <button @click="showModal = false" class="btn grow">Cancel</button>
      </div>
    </section>
  </ModalComponent>
</template>
