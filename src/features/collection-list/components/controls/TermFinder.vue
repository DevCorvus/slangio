<script setup lang="ts">
import { ref } from 'vue';
import SearchTerms from '@/shared/components/controls/SearchTerms.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { useRouter } from 'vue-router';
import BaseModal from '@/shared/components/BaseModal.vue';
import type { Term } from '@/shared/types/term';
import { currentVault } from '@/shared/data/currentVault';
import { vaultService } from '@/shared/services/vault.service';

const router = useRouter();

const showModal = ref(false);

const terms = currentVault.value.collections
  .flat()
  .map((collection) => collection.terms)
  .flat();

const results = ref<Term[]>([]);

const handleFind = (termId: string) => {
  const collectionId = vaultService.getCollectionIdFromTerm(termId);

  if (collectionId) {
    router.push({ path: '/collections/' + collectionId, query: { termId } });
  }
};
</script>

<template>
  <button @click="showModal = true" class="btn btn-sm tooltip" data-tip="Term Finder">
    <Icon icon="heroicons:document-magnifying-glass-16-solid" class="text-xl" />
  </button>
  <BaseModal :show="showModal" @close="showModal = false">
    <section class="space-y-4">
      <header>
        <h3 class="text-lg font-bold">Term Finder</h3>
      </header>
      <SearchTerms :terms no-input-no-results @search="(data) => (results = data.slice(0, 5))" />
      <ul v-if="results.length > 0" class="menu bg-base-200 rounded-box">
        <li v-for="term in results" :key="term.id">
          <button
            @click="handleFind(term.id)"
            class="text-lg text-left tooltip"
            data-tip="Go to term's collection"
          >
            {{ term.content }}
          </button>
        </li>
      </ul>
      <p v-else>No results</p>
    </section>
  </BaseModal>
</template>
