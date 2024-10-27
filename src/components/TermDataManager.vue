<script setup lang="ts">
import ModalComponent from './ModalComponent.vue';
import { Icon } from '@iconify/vue';
import ImportRawTerms from './ImportRawTerms.vue';
import { ref } from 'vue';
import { useClipboard, useFileDialog } from '@vueuse/core';
import { z } from 'zod';
import { exportedTermSchema, type ExportedTerm } from '@/schemas/vault';
import { useToasterStore } from '@/stores/toaster';
import { vaultService } from '@/services/vault.service';
import { useRoute } from 'vue-router';
import { isErrorWithMessage } from '@/utils/error';
import { downloadJson } from '@/utils/download';
import { localeDateNow } from '@/utils/date';
import { popSound } from '@/sound';

const route = useRoute();

const showModal = ref(false);

const { copy, copied } = useClipboard();

const handleCopyRaw = async () => {
  const collection = vaultService.getCollectionById(route.params.id as string);

  if (collection) {
    const out: string[] = collection.terms.map((term) => term.content);
    await copy(JSON.stringify(out));
  }
};

const handleExport = () => {
  const collection = vaultService.getCollectionById(route.params.id as string);

  if (collection) {
    const termsToExport: ExportedTerm[] = collection.terms.map((term) => {
      return {
        content: term.content,
        meanings: term.meanings,
        references: term.references
      };
    });

    downloadJson(`slangio_terms.${collection.name}.${localeDateNow()}`, termsToExport);
    showModal.value = false;
  }
};

const {
  open: openFileDialog,
  onChange,
  reset
} = useFileDialog({
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

      const importedTerms = await z.array(exportedTermSchema).parseAsync(data);

      let atLeastOneAdded = false;

      for (const term of importedTerms) {
        try {
          vaultService.addTerm(route.params.id as string, term);
          atLeastOneAdded = true;
        } catch (err) {
          if (isErrorWithMessage(err)) {
            toaster.error(err.message);
          }
        }
      }

      if (atLeastOneAdded) popSound.play();

      showModal.value = false;
    } catch {
      toaster.error('Invalid terms import');
    } finally {
      reset();
    }
  }
});

const rawMode = ref(false);
</script>

<template>
  <button type="button" @click="showModal = true" class="btn btn-outline btn-primary">
    <Icon icon="heroicons:arrow-down-tray-16-solid" class="text-xl" />
  </button>
  <ModalComponent :show="showModal" @close="showModal = false">
    <section v-if="!rawMode" class="space-y-6">
      <header>
        <h3 class="text-lg font-bold">Terms Data</h3>
      </header>
      <div class="space-y-4">
        <div class="space-y-1">
          <button @click="handleExport()" class="btn btn-block">Export Terms</button>
          <button @click="openFileDialog()" class="btn btn-block">Import Terms</button>
        </div>
        <p class="flex items-center gap-2 text-base-content/50">
          <Icon icon="heroicons:exclamation-circle" class="text-xl shrink-0" />
          <span>Raw terms do not include custom meanings</span>
        </p>
        <div class="space-y-1">
          <button @click="handleCopyRaw()" class="btn btn-block">
            {{ copied ? 'Copied!' : 'Copy Raw Terms' }}
          </button>
          <button @click="rawMode = true" class="btn btn-block">Import Raw Terms</button>
        </div>
      </div>
    </section>
    <ImportRawTerms v-else :collection-id="$route.params.id as string" @close="rawMode = false" />
  </ModalComponent>
</template>
