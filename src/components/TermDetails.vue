<script setup lang="ts">
import type { Term } from '@/types';
import EnglishTermDefinitions from './EnglishTermDefinitions.vue';
import TermMeanings from './TermMeanings.vue';
import TermLanguageReferenceList from './TermLanguageReferenceList.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import EditTerm from './EditTerm.vue';
import { profileService } from '@/services/profile.service';
import { useRoute, useRouter } from 'vue-router';
import { useTimeAgo } from '@vueuse/core';
import { profile } from '@/data';
import SpanishTermDefinitions from './SpanishTermDefinitions.vue';

const props = defineProps<{ term: Term; showCollectionLink?: boolean; hideMutations?: boolean }>();

const timeAgo = useTimeAgo(props.term.createdAt);

const editMode = ref(false);

const router = useRouter();
const route = useRoute();

const collectionId =
  (route.params.id as string) || profileService.getCollectionIdFromTerm(props.term.id) || '';

const goToCollection = () => {
  if (collectionId) {
    router.push('/collections/' + collectionId);
  }
};

const isLearned = props.term.learnedAt !== null;
</script>

<template>
  <section class="space-y-6">
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
    <TermMeanings :term />
    <template v-if="profile.source !== profile.target">
      <EnglishTermDefinitions v-if="profile.target === 'en'" :content="term.content" />
      <SpanishTermDefinitions v-else-if="profile.target === 'es'" :content="term.content" />
      <TermLanguageReferenceList :content="term.content" />
    </template>
    <div class="flex justify-between items-center">
      <p class="text-base-content/50 text-sm">Added {{ timeAgo }}</p>
      <button
        v-if="!hideMutations"
        @click="profileService.removeTerm(term.id)"
        class="btn btn-sm btn-outline btn-error"
      >
        <span>Delete</span>
        <Icon icon="heroicons:trash" />
      </button>
    </div>
  </section>
</template>
