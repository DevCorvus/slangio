<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { downloadJson } from '@/utils/download';
import { localeDateNow } from '@/utils/date';
import { useRoute } from 'vue-router';
import type { ExportedTerm } from '@/schemas/profile';
import { profileService } from '@/services/profile.service';

const props = defineProps<{ termIds: string[] }>();

const emit = defineEmits<{ (e: 'success'): void }>();

const route = useRoute();

const hasTermIds = computed(() => props.termIds.length > 0);

const handleExport = () => {
  const collectionId = route.params.id as string;

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
      @click="handleExport()"
      :disabled="!hasTermIds"
      :class="hasTermIds ? 'tooltip' : ''"
      data-tip="Export selected terms"
    >
      <Icon icon="heroicons:arrow-up-tray-16-solid" />
    </button>
  </li>
</template>
