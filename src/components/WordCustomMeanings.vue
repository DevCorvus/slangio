<script setup lang="ts">
import { EXTENDED_PARTS_OF_SPEECH } from '@/constants';
import type { Word, PartOfSpeech, WordMeaning } from '@/types';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import WordMeaningItem from './WordMeaningItem.vue';
import AddMeaning from './AddMeaning.vue';

const props = defineProps<{ word: Word }>();

const meaningsByPartOfSpeech = computed(() => {
  const out: { [Key in PartOfSpeech]?: WordMeaning[] } = {};

  for (const partOfSpeech of EXTENDED_PARTS_OF_SPEECH) {
    out[partOfSpeech] = undefined;
  }

  for (const meaning of props.word.meanings) {
    if (out[meaning.partOfSpeech] !== undefined) {
      out[meaning.partOfSpeech]!.push(meaning);
    } else {
      out[meaning.partOfSpeech] = [meaning];
    }
  }

  return out;
});

const showForm = ref(false);
</script>

<template>
  <section class="collapse collapse-arrow bg-base-200">
    <input type="checkbox" />
    <header class="collapse-title text-xl font-medium">
      <span>Your Meanings</span>
    </header>
    <div class="collapse-content space-y-2">
      <ul class="space-y-3">
        <template v-for="(meanings, partOfSpeech) in meaningsByPartOfSpeech" :key="partOfSpeech">
          <li v-if="meanings !== undefined">
            <section class="space-y-1">
              <header class="badge badge-info">{{ partOfSpeech }}</header>
              <ul class="space-y-1">
                <li v-for="meaning in meanings" :key="meaning.id">
                  <WordMeaningItem :wordId="word.id" :meaning="meaning" />
                </li>
              </ul>
            </section>
          </li>
        </template>
      </ul>
      <button
        v-if="!showForm"
        @click="showForm = true"
        class="btn btn-sm btn-block bg-base-100 tooltip"
        data-tip="Add"
      >
        <Icon icon="heroicons:plus-16-solid" class="text-lg mx-auto" />
      </button>
      <AddMeaning v-else :word-id="word.id" @close="showForm = false" />
    </div>
  </section>
</template>
