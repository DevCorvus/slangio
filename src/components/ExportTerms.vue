<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import { downloadJson } from '@/utils/download';
import { localeDateNow } from '@/utils/date';
import { useRoute } from 'vue-router';
import type { ExportedTerm } from '@/schemas/profile';
import { profileService } from '@/services/profile.service';
import ModalComponent from './ModalComponent.vue';
import { useClipboard } from '@vueuse/core';

const props = defineProps<{ termIds: string[] }>();

const emit = defineEmits<{ (e: 'success'): void }>();

const { copy, copied } = useClipboard();

const route = useRoute();
const collectionId = route.params.id as string;

const hasTermIds = computed(() => props.termIds.length > 0);

const showModal = ref(false);

const handleCopyRaw = async () => {
  const collection = profileService.getCollectionById(collectionId);

  if (collection) {
    const out: string[] = collection.terms
      .filter((term) => props.termIds.includes(term.id))
      .map((term) => term.content);

    await copy(JSON.stringify(out));
  }
};

const handleExport = () => {
  const collection = profileService.getCollectionById(collectionId);

  if (collection) {
    const out: ExportedTerm[] = collection.terms
      .filter((term) => props.termIds.includes(term.id))
      .map((term) => ({
        content: term.content,
        meanings: term.meanings,
        references: term.references
      }));

    const filename = `terms.${collection.name}.${localeDateNow()}`;
    downloadJson(filename, out);

    emit('success');
  }
};
</script>

<template>
  <li :class="!hasTermIds ? 'disabled' : ''">
    <button
      @click="showModal = true"
      :disabled="!hasTermIds"
      :class="hasTermIds ? 'tooltip' : ''"
      data-tip="Export selected terms"
    >
      <Icon icon="heroicons:arrow-up-tray-16-solid" />
    </button>
    <ModalComponent :show="showModal" @close="showModal = false">
      <section class="space-y-6">
        <header>
          <h3 class="text-lg font-bold">Export selected terms</h3>
        </header>
        <p class="flex items-center gap-2 text-base-content/50">
          <Icon icon="heroicons:exclamation-circle" class="text-xl shrink-0" />
          <span>Raw terms do not include custom meanings</span>
        </p>
        <div class="space-y-2">
          <button @click="handleExport()" class="btn btn-block">Export</button>
          <button @click="handleCopyRaw()" class="btn btn-block">
            {{ copied ? 'Copied!' : 'Copy Raw Terms' }}
          </button>
        </div>
      </section>
    </ModalComponent>
  </li>
</template>
