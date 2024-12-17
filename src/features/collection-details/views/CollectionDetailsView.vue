<script setup lang="ts">
import ConfirmDelete from '@/shared/components/ConfirmDelete.vue';
import GoBack from '@/shared/components/GoBack.vue';
import { currentVault } from '@/shared/data/currentVault';
import { vaultService } from '@/shared/services/vault.service';
import { useTermStore } from '@/shared/stores/term';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import EditCollection from '../components/EditCollection.vue';
import AddTerm from '../components/controls/AddTerm.vue';
import CollectionTermList from '../components/CollectionTermList.vue';

const router = useRouter();
const route = useRoute();

const collection = currentVault.value.collections.find(
  (collection) => collection.id === route.params.id
);

const handleRemoveCollection = () => {
  vaultService.removeCollection(collection!.id);
  router.push('/collections');
};

const showModal = ref(false);

const store = useTermStore();
</script>

<template>
  <template v-if="collection">
    <div class="max-w-2xl mx-auto">
      <GoBack />
      <main class="space-y-6">
        <header class="flex items-center justify-between text-2xl font-bold">
          <h1>{{ collection.name }}</h1>
          <div class="flex items-center gap-2">
            <RouterLink
              v-if="store.toLearn[collection.id] > 0"
              :to="'/quiz?collectionId=' + collection.id"
              class="btn btn-ghost"
            >
              <Icon icon="heroicons:academic-cap-solid" class="text-lg" />
              Quiz ({{ store.toLearn[collection.id] }})
            </RouterLink>
            <div v-if="!collection.permanent" class="dropdown dropdown-left">
              <button class="text-xl btn btn-circle btn-ghost">
                <Icon icon="heroicons:ellipsis-vertical-16-solid" />
              </button>
              <ul
                tabindex="0"
                class="dropdown-content menu bg-base-100 rounded-box z-[1] shadow text-lg"
              >
                <li>
                  <EditCollection :name="collection.name" :description="collection.description" />
                </li>
                <li>
                  <button @click="showModal = true" class="tooltip" data-tip="Delete">
                    <Icon icon="heroicons:trash" />
                  </button>
                  <ConfirmDelete
                    :show="showModal"
                    @confirm="handleRemoveCollection()"
                    @close="showModal = false"
                  />
                </li>
              </ul>
            </div>
          </div>
        </header>
        <p v-if="collection.description">{{ collection.description }}</p>
        <AddTerm />
        <CollectionTermList :terms="collection.terms" :term-id="route.query.termId as string" />
      </main>
    </div>
  </template>
  <div v-else class="absolute inset-0 flex flex-col items-center justify-center min-h-screen gap-4">
    <span class="text-3xl font-semibold">Collection Not Found</span>
    <RouterLink to="/collections" class="link"> Go to Collections </RouterLink>
  </div>
</template>
