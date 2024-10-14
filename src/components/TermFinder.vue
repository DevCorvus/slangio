<script setup lang="ts">
import { ref } from 'vue';
import ModalComponent from './ModalComponent.vue';
import SearchTerms from './SearchTerms.vue';
import { profile } from '@/data';
import type { Term } from '@/types';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { profileService } from '@/services/profile.service';
import { useRouter } from 'vue-router';

const router = useRouter();

const showModal = ref(false);

const terms = profile.value.collections
  .flat()
  .map((collection) => collection.terms)
  .flat();

const results = ref<Term[]>([]);

const handleFind = (termId: string) => {
  const collectionId = profileService.getCollectionIdFromTerm(termId);

  if (collectionId) {
    router.push('/collections/' + collectionId);
  }
};
</script>

<template>
  <button @click="showModal = true" class="btn btn-sm flex items-center gap-1">
    <Icon icon="heroicons:document-magnifying-glass-16-solid" class="text-xl" />
    <span>Term Finder</span>
  </button>
  <ModalComponent :show="showModal" @close="showModal = false">
    <section class="space-y-4">
      <header>
        <h3 class="text-lg font-bold">Term Finder</h3>
      </header>
      <SearchTerms :terms no-input-no-results @search="(data) => (results = data.slice(0, 5))" />
      <ul v-if="results.length > 0" class="menu bg-base-200 rounded-box">
        <li v-for="term in results" :key="term.id">
          <button
            @click="handleFind(term.id)"
            class="text-lg tooltip text-left"
            data-tip="Go to term's collection"
          >
            {{ term.content }}
          </button>
        </li>
      </ul>
      <p v-else>No results</p>
    </section>
  </ModalComponent>
</template>
