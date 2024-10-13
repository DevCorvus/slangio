<script setup lang="ts">
import type { Term } from '@/types';
import TermDefinitions from './TermDefinitions.vue';
import TermMeanings from './TermMeanings.vue';
import TermReferenceList from './TermReferenceList.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import EditTerm from './EditTerm.vue';
import { profileService } from '@/services/profile.service';
import { useRouter } from 'vue-router';
import { useTimeAgo } from '@vueuse/core';

const props = defineProps<{ term: Term; showCollectionLink?: boolean }>();

const timeAgo = useTimeAgo(props.term.createdAt);

const editMode = ref(false);

const router = useRouter();

const collectionId = profileService.getCollectionIdFromTerm(props.term.id) || '';

const goToCollection = () => {
  if (collectionId) {
    router.push('/collections/' + collectionId);
  }
};
</script>

<template>
  <section class="space-y-6">
    <header v-if="!editMode" class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <h3 class="text-xl font-bold">{{ term.content }}</h3>
        <button @click="editMode = true" class="btn btn-circle btn-ghost btn-sm text-lg">
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
    <TermDefinitions :content="term.content" />
    <TermReferenceList :content="term.content" />
    <div class="flex justify-between items-center">
      <p class="text-base-content/50 text-sm">Added {{ timeAgo }}</p>
      <button @click="profileService.removeTerm(term.id)" class="btn btn-sm btn-outline btn-error">
        <span>Delete</span>
        <Icon icon="heroicons:trash" />
      </button>
    </div>
  </section>
</template>
