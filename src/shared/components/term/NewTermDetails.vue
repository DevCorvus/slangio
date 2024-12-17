<script setup lang="ts">
import { computed } from 'vue';
import { settings } from '@/shared/data/settings';
import BaseModal from '@/shared/components/BaseModal.vue';
import TermDetails from '@/features/term-details/components/TermDetails.vue';
import { useNewTermStore } from '@/shared/stores/newTerm';

const newTermStore = useNewTermStore();

const show = computed(() => settings.value.openNewTermDetails && newTermStore.newTerm !== null);
</script>

<template>
  <BaseModal :show @close="newTermStore.reset()">
    <TermDetails
      v-if="newTermStore.newTerm !== null"
      :term="newTermStore.newTerm"
      show-collection-link
      @close="newTermStore.reset()"
    />
  </BaseModal>
</template>
