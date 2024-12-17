<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import TermSentenceListItem from './TermSentenceListItem.vue';
import AddTermSentence from './AddTermSentence.vue';

defineProps<{ sentences: string[] }>();

const showForm = ref(false);
</script>

<template>
  <section class="space-y-2">
    <header>
      <span class="font-medium text-base-content/50">Sentences</span>
    </header>
    <ul v-if="sentences.length > 0" class="space-y-2">
      <li v-for="(sentence, index) in sentences" :key="index + '-sentence'">
        <TermSentenceListItem :content="sentence" :index />
      </li>
    </ul>
    <button v-if="!showForm" @click="showForm = true" class="btn btn-sm btn-circle">
      <Icon icon="heroicons:plus" class="text-xl" />
    </button>
    <AddTermSentence v-else @close="showForm = false" />
  </section>
</template>
