<script setup lang="ts">
import type { Profile } from '@/types';
import { useTimeAgo } from '@vueuse/core';
import CountryCircleFlag from './CountryCircleFlag.vue';
import { LANGUAGE_METADATA } from '@/config/languages';
import { Icon } from '@iconify/vue/dist/iconify.js';
import { nextTick, ref, useTemplateRef, watch } from 'vue';
import { profile as profileLocalStorage, profiles } from '@/data';

const props = defineProps<{ profile: Profile; selected?: boolean; current?: boolean }>();

defineEmits<{
  (e: 'select', profileId: string): void;
  (e: 'delete', profileId: string): void;
}>();

const timeAgo = useTimeAgo(props.profile.createdAt);

const showEdit = ref(false);
const showConfirmDelete = ref(false);

const profileName = ref(props.profile.name || '');
const profileNameRef = useTemplateRef('profileNameRef');

watch(showEdit, async () => {
  if (showEdit.value) {
    await nextTick();
    profileNameRef.value?.focus();
  }
});

const handleEdit = () => {
  if (props.current) {
    profileLocalStorage.value.name = profileName.value;
  } else {
    const profileToEdit = profiles.value.find((p) => p.id === props.profile.id);

    if (profileToEdit) {
      profileToEdit.name = profileName.value;
    }
  }

  showEdit.value = false;
};
</script>

<template>
  <div class="flex flex-col items-center gap-1">
    <div class="flex items-center gap-1">
      <div
        class="relative flex items-center justify-center gap-4 border shadow-sm rounded-full py-2 px-3 w-64"
        :class="current ? 'border-primary' : 'border-base-content/25'"
      >
        <input
          type="radio"
          @click="$emit('select', profile.id)"
          class="radio absolute left-4"
          :checked="selected"
        />
        <button class="flex items-center gap-1 outline-none" @click="$emit('select', profile.id)">
          <CountryCircleFlag :width="40" :iso="LANGUAGE_METADATA[profile.source].flagIso" />
          <Icon icon="heroicons:arrow-long-right-16-solid" class="text-4xl text-base-content/35" />
          <CountryCircleFlag :width="40" :iso="LANGUAGE_METADATA[profile.target].flagIso" />
        </button>
        <div class="absolute right-4 flex items-center justify-center text-lg">
          <button
            v-if="!showConfirmDelete"
            @click="showConfirmDelete = true"
            :class="
              current
                ? 'text-base-content/25'
                : 'hover:text-error focus:text-error transition tooltip'
            "
            :disabled="current"
            data-tip="Delete Profile"
          >
            <Icon icon="heroicons:trash" />
          </button>
          <div v-else class="flex items-center gap-1">
            <button
              @click="$emit('delete', profile.id)"
              class="tooltip hover:text-success focus:text-success transition"
              data-tip="Confirm"
            >
              <Icon icon="heroicons:check-16-solid" />
            </button>
            <button
              @click="showConfirmDelete = false"
              class="tooltip hover:text-error focus:text-error transition"
              data-tip="Cancel"
            >
              <Icon icon="heroicons:x-mark-16-solid" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="text-sm text-center">
      <button v-if="!showEdit" @click="showEdit = true" class="font-semibold">
        {{ profile.name || profile.id }}
      </button>
      <form v-else @submit.prevent="handleEdit()" class="my-1">
        <input
          ref="profileNameRef"
          type="text"
          v-model="profileName"
          @blur="showEdit = false"
          class="input input-sm input-bordered text-center"
          placeholder="Enter profile name"
        />
      </form>
      <p>Created {{ timeAgo }}</p>
    </div>
  </div>
</template>
