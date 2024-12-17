<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, watch } from 'vue';
import { downloadJson } from '@/shared/utils/download';
import { useFileDialog } from '@vueuse/core';
import { useToasterStore } from '@/shared/stores/toaster';
import { localeDateNow } from '@/shared/utils/date';
import {
  exportedCollectionSchema,
  type ExportedCollection,
  type ExportedTerm
} from '@/shared/schemas/vault.schema';
import { z } from 'zod';
import { isErrorWithMessage } from '@/shared/utils/error';
import { popSound } from '@/shared/utils/sound';
import BaseModal from '@/shared/components/BaseModal.vue';
import { currentVault } from '@/shared/data/currentVault';
import { vaultService } from '@/shared/services/vault.service';
import type { Collection } from '@/shared/types/collection';

const showModal = ref(false);

const exportMode = ref(false);

const collectionIdsToExport = ref<string[]>([]);

watch(exportMode, () => {
  if (!exportMode.value) {
    collectionIdsToExport.value = [];
  }
});

const handleExport = () => {
  if (collectionIdsToExport.value.length === 0) return;

  const collections: Collection[] = JSON.parse(JSON.stringify(currentVault.value.collections));

  const out: ExportedCollection[] = [];

  for (const collectionId of collectionIdsToExport.value) {
    const collection = collections.find((collection) => collection.id === collectionId);

    if (collection) {
      const termsToExport: ExportedTerm[] = collection.terms.map((term) => {
        return {
          content: term.content,
          sentences: term.sentences,
          meanings: term.meanings,
          references: term.references
        };
      });

      out.push({
        name: collection.name,
        description: collection.description,
        terms: termsToExport
      });
    }
  }

  downloadJson(
    `slangio_collections.${currentVault.value.name || currentVault.value.id}.${localeDateNow()}`,
    out
  );

  exportMode.value = false;
  showModal.value = false;
};

const importMode = ref(false);

const importedCollections = ref<ExportedCollection[]>([]);
const collectionNamesToImport = ref<string[]>([]);

watch(importMode, () => {
  if (!importMode.value) {
    importedCollections.value = [];
    collectionNamesToImport.value = [];
  }
});

const toaster = useToasterStore();

const {
  open: openFileDialog,
  onChange,
  reset
} = useFileDialog({
  accept: 'application/json',
  multiple: false
});

onChange(async (files) => {
  if (files) {
    const file = files[0];
    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const collections = await z.array(exportedCollectionSchema).parseAsync(data);

      importedCollections.value = collections;
      collectionNamesToImport.value = collections.map((collection) => collection.name);

      importMode.value = true;
    } catch {
      toaster.error('Invalid collections import');
    } finally {
      reset();
    }
  }
});

const handleImport = () => {
  const collections = importedCollections.value.filter((collection) =>
    collectionNamesToImport.value.includes(collection.name)
  );

  let atLeastOneAdded = false;

  for (const collection of collections) {
    try {
      const newCollection = vaultService.addCollection({
        name: collection.name,
        description: collection.description
      });

      atLeastOneAdded = true;

      for (const term of collection.terms) {
        try {
          vaultService.addTerm(newCollection.id, term);
        } catch (err) {
          if (isErrorWithMessage(err)) {
            toaster.error(err.message);
          }
        }
      }
    } catch (err) {
      if (isErrorWithMessage(err)) {
        toaster.error(err.message);
      }
    }
  }

  if (atLeastOneAdded) popSound.play();

  importMode.value = false;
  showModal.value = false;
};
</script>

<template>
  <button @click="showModal = true" class="btn btn-sm tooltip" data-tip="Export / Import">
    <Icon icon="heroicons:arrow-up-tray-16-solid" class="text-xl" />
  </button>
  <BaseModal :show="showModal" @close="showModal = false">
    <section v-if="!exportMode && !importMode" class="space-y-6">
      <header>
        <h3 class="text-lg font-bold">Collections Data</h3>
      </header>
      <div class="space-y-2">
        <button @click="exportMode = true" class="btn btn-block">Export Collections</button>
        <button @click="openFileDialog()" class="btn btn-block">Import Collections</button>
      </div>
    </section>
    <form v-if="exportMode" @submit.prevent="handleExport()" class="space-y-6">
      <header>
        <h3 class="text-lg font-bold">Export Collections</h3>
      </header>
      <div class="space-y-3">
        <template v-for="collection in currentVault.collections" :key="collection.id">
          <div v-if="!collection.permanent" class="form-control">
            <label :for="collection.id" class="flex gap-2 cursor-pointer">
              <input
                :id="collection.id"
                type="checkbox"
                class="checkbox checkbox-sm"
                v-model="collectionIdsToExport"
                :value="collection.id"
              />
              <span class="label-text">{{ collection.name }}</span>
            </label>
          </div>
        </template>
      </div>
      <div class="flex justify-end gap-2">
        <button class="btn btn-primary">Export</button>
        <button type="button" @click="exportMode = false" class="btn">Cancel</button>
      </div>
    </form>
    <form v-if="importMode" @submit.prevent="handleImport()" class="space-y-6">
      <header>
        <h3 class="text-lg font-bold">Import Collections</h3>
      </header>
      <div class="space-y-3">
        <div v-for="collection in importedCollections" class="form-control" :key="collection.name">
          <label :for="'collection-' + collection.name" class="flex gap-2 cursor-pointer">
            <input
              :id="'collection-' + collection.name"
              type="checkbox"
              class="checkbox checkbox-sm"
              v-model="collectionNamesToImport"
              :value="collection.name"
            />
            <span class="label-text">{{ collection.name }}</span>
          </label>
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <button class="btn btn-primary">Import</button>
        <button type="button" @click="importMode = false" class="btn">Cancel</button>
      </div>
    </form>
  </BaseModal>
</template>
