<script setup lang="ts">
import { EXTENDED_PARTS_OF_SPEECH } from '@/constants';
import type { PartOfSpeech, TermMeaning } from '@/types';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import TermMeaningItem from './TermMeaningItem.vue';
import AddTermMeaning from './AddTermMeaning.vue';

const props = defineProps<{ meanings: TermMeaning[] }>();

const meaningsByPartOfSpeech = computed(() => {
  const out: { [Key in PartOfSpeech]?: { data: TermMeaning; index: number }[] } = {};

  for (const partOfSpeech of EXTENDED_PARTS_OF_SPEECH) {
    out[partOfSpeech] = undefined;
  }

  props.meanings.forEach((meaning, index) => {
    if (out[meaning.partOfSpeech] !== undefined) {
      out[meaning.partOfSpeech]!.push({ data: meaning, index });
    } else {
      out[meaning.partOfSpeech] = [{ data: meaning, index }];
    }
  });

  return out;
});

const showForm = ref(false);
</script>

<template>
  <section class="space-y-2">
    <header>
      <span class="font-medium text-base-content/50">Meanings</span>
    </header>
    <ul class="space-y-3">
      <template v-for="(meanings, partOfSpeech) in meaningsByPartOfSpeech" :key="partOfSpeech">
        <li v-if="meanings !== undefined">
          <section class="space-y-1">
            <header class="badge badge-info">{{ partOfSpeech }}</header>
            <ul class="space-y-2">
              <li v-for="meaning in meanings" :key="meaning.index + '-meaning'">
                <TermMeaningItem :meaning="meaning.data" :index="meaning.index" />
              </li>
            </ul>
          </section>
        </li>
      </template>
    </ul>
    <button v-if="!showForm" @click="showForm = true" class="btn btn-sm btn-circle">
      <Icon icon="heroicons:plus" class="text-xl" />
    </button>
    <AddTermMeaning v-else @close="showForm = false" />
  </section>
</template>
