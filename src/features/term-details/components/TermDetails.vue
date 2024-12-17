<script setup lang="ts">
import TermLanguageReferenceList from './TermLanguageReferenceList.vue';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import EditTerm from './EditTerm.vue';
import { useRouter } from 'vue-router';
import { onKeyStroke, useTimeAgo } from '@vueuse/core';
import TermContext from './TermContext.vue';
import type { Term } from '@/shared/types/term';
import TermDefinitions from './TermDefinitions.vue';
import { currentVault } from '@/shared/data/currentVault';
import { vaultService } from '@/shared/services/vault.service';

const props = defineProps<{
  term: Term;
  showCollectionLink?: boolean;
  hideMutations?: boolean;
  controls?: { prev: boolean; next: boolean };
}>();

const emit = defineEmits<{
  (e: 'prev'): void;
  (e: 'next'): void;
  (e: 'close'): void;
}>();

onKeyStroke('ArrowLeft', () => {
  if (props.controls?.prev) {
    emit('prev');
  }
});

onKeyStroke('ArrowRight', () => {
  if (props.controls?.next) {
    emit('next');
  }
});

const timeAgo = useTimeAgo(props.term.createdAt);

const editMode = ref(false);

const router = useRouter();

const collectionId = computed(() => vaultService.getCollectionIdFromTerm(props.term.id) || '');

const goToCollection = () => {
  emit('close');
  router.push('/collections/' + collectionId.value);
};

const canDelete = ref(false);

const handleDelete = async () => {
  if (canDelete.value) {
    const termId = props.term.id;
    if (props.controls?.next) {
      emit('next');
    } else if (props.controls?.prev) {
      emit('prev');
    } else {
      emit('close');
    }
    vaultService.removeTerm(termId);
  } else {
    canDelete.value = true;
    setTimeout(() => {
      canDelete.value = false;
    }, 1000);
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
        <h3 class="text-2xl font-bold">{{ term.content }}</h3>
        <button
          v-if="!isLearned && !hideMutations"
          @click="editMode = true"
          class="text-lg btn btn-circle btn-ghost btn-sm"
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
    <div class="flex items-center justify-between">
      <p class="text-sm text-base-content/50">Added {{ timeAgo }}</p>
      <button
        v-if="!hideMutations"
        @click="handleDelete()"
        class="btn btn-sm btn-outline btn-error"
      >
        <span>{{ canDelete ? 'Again' : 'Delete' }}</span>
        <Icon icon="heroicons:trash" />
      </button>
    </div>
    <div v-if="controls" class="flex justify-between">
      <button
        @click="$emit('prev')"
        :disabled="!controls.prev"
        class="btn"
        :class="!controls.prev ? 'btn-disabled' : ''"
      >
        <Icon
          icon="heroicons:arrow-left-20-solid"
          class="text-xl"
          :class="controls.prev ? 'text-info' : ''"
        />
        Prev
      </button>
      <button
        @click="$emit('next')"
        :disabled="!controls.next"
        class="btn"
        :class="!controls.next ? 'btn-disabled' : ''"
      >
        Next
        <Icon
          icon="heroicons:arrow-right-20-solid"
          class="text-xl"
          :class="controls.next ? 'text-info' : ''"
        />
      </button>
    </div>
  </section>
</template>
