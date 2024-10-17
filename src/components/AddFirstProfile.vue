<script setup lang="ts">
import { firstTime, profile, type CreateUpdateProfile } from '@/data';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import ProfileSelector from './ProfileSelector.vue';

const router = useRouter();

const handleChoice = (data: CreateUpdateProfile) => {
  profile.value.source = data.source;
  profile.value.target = data.target;
  firstTime.value = false;

  router.push('/');
};

const skip = () => {
  firstTime.value = false;
  router.push('/');
};
</script>

<template>
  <main class="hero min-h-screen">
    <div class="hero-content max-w-lg flex flex-col gap-10">
      <header>
        <h1 class="text-4xl font-black text-center">Welcome to Vocabulary</h1>
      </header>
      <section class="space-y-4 w-full">
        <header class="text-center font-semibold text-lg">Choose to start</header>
        <ProfileSelector @select="handleChoice" />
      </section>
    </div>
    <Icon
      icon="heroicons:light-bulb"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-50 text-9xl rotate-45 opacity-10 scale-[5] pointer-events-none"
    />
  </main>
  <button @click="skip()" class="btn btn-sm absolute bottom-2 right-2">Skip</button>
</template>
