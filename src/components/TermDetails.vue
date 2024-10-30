<script setup lang="ts">
import type { Term } from '@/types';
import TermLanguageReferenceList from './TermLanguageReferenceList.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import EditTerm from './EditTerm.vue';
import { vaultService } from '@/services/vault.service';
import { useRoute, useRouter } from 'vue-router';
import { useTimeAgo } from '@vueuse/core';
import { currentVault } from '@/data';
import TermContext from './TermContext.vue';
import TermDefinitions from './TermDefinitions.vue';

const props = defineProps<{ term: Term; showCollectionLink?: boolean; hideMutations?: boolean }>();

const timeAgo = useTimeAgo(props.term.createdAt);

const editMode = ref(false);

const router = useRouter();
const route = useRoute();

const collectionId =
  (route.params.id as string) || vaultService.getCollectionIdFromTerm(props.term.id) || '';

const goToCollection = () => {
  if (collectionId) {
    router.push('/collections/' + collectionId);
  }
};

const isSupportedLanguage = currentVault.value.source !== currentVault.value.target;
const isLearned = props.term.learnedAt !== null;
</script>

<template>
  <section class="space-y-6" :class="showCollectionLink ? 'mt-2' : ''">
    <header v-if="!editMode" class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div v-if="isLearned" class="tooltip" data-tip="Learned">
          <Icon icon="heroicons:check-circle" class="text-4xl text-success" />
        </div>
        <h3 class="text-xl font-bold">{{ term.content }}</h3>
        <button
          v-if="!isLearned && !hideMutations"
          @click="editMode = true"
          class="btn btn-circle btn-ghost btn-sm text-lg"
        >
          <Icon icon="heroicons:pencil-square" />
        </button>
      </div>
      <button
        v-if="showCollectionLink"
        @click="goToCollection()"
        class="btn btn-sm btn-ghost tooltip tooltip-bottom"
        data-tip="Go to Collection"
      >
        <div class="flex items-center gap-1">
          <span>Collection</span>
          <Icon icon="heroicons:arrow-up-right-16-solid" />
        </div>
      </button>
    </header>
    <EditTerm v-else :collection-id :term @close="editMode = false" />
    <TermContext :term />
    <template v-if="isSupportedLanguage">
      <TermDefinitions :content="term.content" />
      <TermLanguageReferenceList :content="term.content" />
    </template>
    <div class="flex justify-between items-center">
      <p class="text-base-content/50 text-sm">Added {{ timeAgo }}</p>
      <button
        v-if="!hideMutations"
        @click="vaultService.removeTerm(term.id)"
        class="btn btn-sm btn-outline btn-error"
      >
        <span>Delete</span>
        <Icon icon="heroicons:trash" />
      </button>
    </div>
  </section>
</template>
