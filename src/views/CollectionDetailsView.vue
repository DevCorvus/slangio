<script setup lang="ts">
import AddTerm from '@/components/AddTerm.vue';
import ConfirmDelete from '@/components/ConfirmDelete.vue';
import EditCollection from '@/components/EditCollection.vue';
import TermList from '@/components/TermList.vue';
import { profile } from '@/data';
import { profileService } from '@/services/profile.service';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const collection = profile.value.collections.find(
  (collection) => collection.id === route.params.id
);

const handleRemoveCollection = () => {
  profileService.removeCollection(collection!.id);
  router.push('/collections');
};

const showModal = ref(false);
</script>

<template>
  <template v-if="collection">
    <button @click="$router.back()" class="my-6 btn btn-sm btn-ghost">
      <div class="flex items-center gap-2">
        <Icon icon="heroicons:arrow-uturn-left" />
        <span>Go Back</span>
      </div>
    </button>
    <main class="space-y-6">
      <header class="text-2xl font-bold flex items-center justify-between">
        <h1>{{ collection.name }}</h1>
        <div v-if="!collection.permanent" class="dropdown dropdown-left">
          <button class="btn btn-circle btn-ghost text-xl">
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
      </header>
      <p v-if="collection.description">{{ collection.description }}</p>
      <TermList :terms="collection.terms" />
      <AddTerm />
    </main>
  </template>
  <div v-else class="absolute inset-0 flex flex-col items-center gap-4 justify-center min-h-screen">
    <span class="font-semibold text-3xl">Collection Not Found</span>
    <RouterLink to="/collections" class="link"> Go to Collections </RouterLink>
  </div>
</template>
