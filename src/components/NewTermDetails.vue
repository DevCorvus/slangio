<script setup lang="ts">
import { useNewTermStore } from '@/stores/term';
import ModalComponent from './ModalComponent.vue';
import TermDetails from './TermDetails.vue';
import { computed } from 'vue';
import { settings } from '@/data';

const newTermStore = useNewTermStore();

const show = computed(() => settings.value.openNewTermDetails && newTermStore.newTerm !== null);
</script>

<template>
  <ModalComponent :show @close="newTermStore.reset()">
    <TermDetails
      v-if="newTermStore.newTerm !== null"
      :term="newTermStore.newTerm"
      show-collection-link
      @close="newTermStore.reset()"
    />
  </ModalComponent>
</template>
