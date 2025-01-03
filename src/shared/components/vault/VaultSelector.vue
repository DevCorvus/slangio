<script setup lang="ts">
import { LANGUAGE_METADATA, SUPPORTED_LANGUAGES } from '@/shared/config/languages';
import CountryCircleFlag from '@/shared/components/CountryCircleFlag.vue';
import { Icon } from '@iconify/vue';
import type { CreateUpdateVault } from '@/shared/services/vault.service';

defineEmits<{
  (e: 'select', data: CreateUpdateVault): void;
}>();
</script>

<template>
  <ul class="space-y-3">
    <template v-for="source in SUPPORTED_LANGUAGES" :key="source">
      <template v-for="target in SUPPORTED_LANGUAGES" :key="source + target">
        <li v-if="source !== target">
          <button
            @click="$emit('select', { source, target })"
            class="flex items-center justify-center gap-2 px-3 py-2 mx-auto transition border-2 rounded-full shadow-sm group bg-base-100 border-base-content/25 hover:scale-105 hover:border-primary focus:border-primary focus:scale-105 tooltip md:tooltip-right"
            :data-tip="`${LANGUAGE_METADATA[source].name} to ${LANGUAGE_METADATA[target].name}`"
          >
            <CountryCircleFlag :width="48" :iso="LANGUAGE_METADATA[source].flagIso" />
            <Icon
              icon="heroicons:arrow-long-right-16-solid"
              class="text-5xl text-base-content/35 group-hover:text-primary group-focus:text-primary"
            />
            <CountryCircleFlag :width="48" :iso="LANGUAGE_METADATA[target].flagIso" />
          </button>
        </li>
      </template>
    </template>
    <li>
      <button
        @click="$emit('select', { source: 'en', target: 'en' })"
        class="flex items-center justify-center gap-2 px-3 py-2 mx-auto transition border-2 rounded-full shadow-sm group bg-base-100 text-base-content/35 border-base-content/25 hover:scale-105 hover:border-primary focus:border-primary focus:scale-105 tooltip md:tooltip-right"
        data-tip="Unsupported Language"
      >
        <Icon
          icon="heroicons:question-mark-circle-16-solid"
          class="border-4 border-dashed rounded-full size-12 border-base-content/15"
        />
        <Icon
          icon="heroicons:arrow-long-right-16-solid"
          class="text-5xl text-base-content/35 group-hover:text-primary group-focus:text-primary"
        />
        <Icon
          icon="heroicons:question-mark-circle-16-solid"
          class="border-4 border-dashed rounded-full size-12 border-base-content/15"
        />
      </button>
    </li>
  </ul>
</template>
