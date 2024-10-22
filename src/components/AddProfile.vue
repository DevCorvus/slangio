<script setup lang="ts">
import { createProfile, profile, profiles, type CreateUpdateProfile } from '@/data';
import { useRouter } from 'vue-router';
import ProfileSelector from './ProfileSelector.vue';
import { Icon } from '@iconify/vue';
import { useTermStore } from '@/stores/term';

const router = useRouter();

const store = useTermStore();

const handleChoice = (data: CreateUpdateProfile) => {
  const newProfile = createProfile(data);

  profiles.value.push(profile.value);
  profile.value = newProfile;

  store.refreshToLearn();

  router.push('/');
};
</script>

<template>
  <button @click="$router.back()" class="my-6 btn btn-sm btn-ghost">
    <div class="flex items-center gap-2">
      <Icon icon="heroicons:arrow-uturn-left" />
      <span>Go Back</span>
    </div>
  </button>
  <main class="hero min-h-screen absolute inset-0 -z-10">
    <div class="hero-content max-w-lg flex flex-col gap-10">
      <header>
        <h1 class="text-4xl font-black text-center">Add Profile</h1>
      </header>
      <section class="space-y-4 w-full">
        <header class="text-center font-semibold text-lg">Choose</header>
        <ProfileSelector @select="handleChoice" />
      </section>
    </div>
  </main>
</template>
