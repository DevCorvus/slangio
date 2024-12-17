<script setup lang="ts">
import { useRouter } from 'vue-router';
import VaultSelector from './VaultSelector.vue';
import WorldMap from '@/shared/components/WorldMap.vue';
import { Icon } from '@iconify/vue';
import { useFileDialog } from '@vueuse/core';
import { z } from 'zod';
import { vaultSchema } from '@/shared/schemas/vault.schema';
import { useToasterStore } from '@/shared/stores/toaster';
import { firstTime } from '@/shared/data/firstTime';
import { currentVault } from '@/shared/data/currentVault';
import { vaults } from '@/shared/data/vaults';
import type { CreateUpdateVault } from '@/shared/services/vault.service';

const router = useRouter();

const handleChoice = (data: CreateUpdateVault) => {
  currentVault.value.source = data.source;
  currentVault.value.target = data.target;
  firstTime.value = false;

  router.push('/');
};

const { open, onChange, reset } = useFileDialog({
  accept: 'application/json',
  multiple: false
});

const toaster = useToasterStore();

onChange(async (files) => {
  if (files) {
    const file = files[0];
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const importedVaults = await z.array(vaultSchema).min(1).parseAsync(data);

      currentVault.value = importedVaults[0];
      vaults.value = importedVaults.slice(1);

      skip();
    } catch {
      toaster.error('Invalid vaults import');
    } finally {
      reset();
    }
  }
});

const skip = () => {
  firstTime.value = false;
  router.push('/');
};
</script>

<template>
  <main class="min-h-screen hero">
    <section
      class="flex flex-col max-w-md gap-6 p-4 text-center hero-content md:p-10 rounded-box md:shadow-lg md:bg-base-100/60"
    >
      <header>
        <h1 class="text-4xl font-black">Welcome to Slangio</h1>
      </header>
      <p>
        Slangio helps you store, organize, memorize and share your new vocabulary in any language
      </p>
      <section class="w-full space-y-6">
        <div class="flex items-center justify-center gap-1.5">
          <span class="text-lg font-semibold">Choose to start</span>
          <div class="dropdown dropdown-end">
            <button class="mt-1 btn btn-xs btn-circle btn-ghost text-info">
              <Icon icon="heroicons:information-circle-16-solid" class="text-xl shrink-0" />
            </button>
            <div
              tabindex="0"
              class="card card-compact dropdown-content bg-base-100 rounded-box z-[1] w-60 shadow"
            >
              <div tabindex="0" class="text-left card-body">
                <p class="text-xs text-info">
                  <strong>Your Language</strong> to <strong>Target Language</strong>
                </p>
                <p>
                  Left side represents your language for which translations are made. Right side
                  represents the language (vocabulary) to store and learn.
                </p>
                <p class="text-base-content/50">You can change it later</p>
              </div>
            </div>
          </div>
        </div>
        <VaultSelector @select="handleChoice" />
        <button @click="open()" class="btn btn-ghost">
          <Icon icon="heroicons:arrow-up-tray-16-solid" class="text-xl" />
          Import Backup
        </button>
      </section>
    </section>
    <WorldMap
      class="absolute w-full -translate-x-1/2 -translate-y-1/2 text-base-content/10 top-1/2 left-1/2 -z-50"
    />
  </main>
  <button @click="skip()" class="absolute btn btn-sm bottom-2 right-2">Skip</button>
</template>
