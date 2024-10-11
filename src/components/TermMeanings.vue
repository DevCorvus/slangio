<script setup lang="ts">
import { EXTENDED_PARTS_OF_SPEECH } from '@/constants';
import type { Term, PartOfSpeech, TermMeaning } from '@/types';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import TermMeaningItem from './TermMeaningItem.vue';
import AddTermMeaning from './AddTermMeaning.vue';

const props = defineProps<{ term: Term }>();

const meaningsByPartOfSpeech = computed(() => {
  const out: { [Key in PartOfSpeech]?: TermMeaning[] } = {};

  for (const partOfSpeech of EXTENDED_PARTS_OF_SPEECH) {
    out[partOfSpeech] = undefined;
  }

  for (const meaning of props.term.meanings) {
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
                  <TermMeaningItem :term-id="term.id" :meaning="meaning" />
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
      <AddTermMeaning v-else :term-id="term.id" @close="showForm = false" />
    </div>
  </section>
</template>
