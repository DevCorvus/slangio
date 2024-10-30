<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ show: boolean; content: string }>();

interface TermDefinitionResponse {
  ok: boolean;
  error?: string;
  data?: {
    word: string;
    meanings: {
      origin: {
        raw: string;
        type: string;
        voice: string;
        text: string;
      };
      senses: {
        raw: string;
        category: string;
        usage: string;
        description: string;
        synonyms: string[] | null;
        antonyms: string[] | null;
      }[];
    }[];
  };
}

interface TermDefinitionMeaning {
  partOfSpeech: string;
  definitions: {
    definition: string;
    synonyms: string[];
    antonyms: string[];
  }[];
}

interface TermDefinition {
  origin?: string;
  meanings: TermDefinitionMeaning[];
}

const definition = ref<TermDefinition | null>(null);

const isLoading = ref(false);
const isError = ref(false);

watch([() => props.content, () => props.show], async (value, prev) => {
  if (value[0] !== prev[0] || (props.show && !isError.value && definition.value === null)) {
    definition.value = null;
    isLoading.value = true;
    isError.value = false;

    const res = await fetch('https://rae-api.com/api/words/' + props.content);
    const json: TermDefinitionResponse = await res.json();

    if (json.ok) {
      const data = json.data!.meanings[0];

      const meanings: TermDefinitionMeaning[] = [];

      for (const sense of data.senses) {
        sense.raw = sense.raw.split(' ').slice(1).join(' ');

        const meaning = meanings.find((meaning) => meaning.partOfSpeech === sense.category);

        if (meaning) {
          meaning.definitions.push({
            definition: sense.raw,
            antonyms: sense.antonyms || [],
            synonyms: sense.synonyms || []
          });
        } else {
          meanings.push({
            partOfSpeech: sense.category,
            definitions: [
              {
                definition: sense.raw,
                antonyms: sense.antonyms || [],
                synonyms: sense.synonyms || []
              }
            ]
          });
        }
      }

      definition.value = {
        origin: data.origin.raw,
        meanings
      };
    } else {
      isError.value = true;
    }

    isLoading.value = false;
  }
});
</script>

<template>
  <template v-if="definition !== null">
    <section v-for="(meaning, i) in definition.meanings" :key="i + '-meaning'" class="space-y-4">
      <header class="badge badge-lg badge-info">{{ meaning.partOfSpeech }}</header>
      <ul class="space-y-2">
        <li
          v-for="(def, j) in meaning.definitions"
          :key="j + '-definition'"
          class="space-y-2 p-2 bg-base-100 rounded-box"
        >
          <p class="text-lg">
            <span class="text-base-content/75">{{ j + 1 }}.</span> {{ def.definition }}
          </p>
          <section v-if="def.synonyms.length > 0" class="space-y-1 text-sm">
            <header class="text-base-content/50 text-sm">Synonyms</header>
            <ul class="flex items-center gap-1 flex-wrap">
              <li v-for="(synonym, k) in def.synonyms" :key="k + 'synonym'">
                <span class="badge badge-outline">{{ synonym }}</span>
              </li>
            </ul>
          </section>
          <section v-if="def.antonyms.length > 0" class="space-y-1 text-sm">
            <header class="text-base-content/50 text-sm">Antonyms</header>
            <ul class="flex items-center gap-1 flex-wrap">
              <li v-for="(antonym, k) in def.antonyms" :key="k + 'antonym'">
                <span class="badge badge-outline">{{ antonym }}</span>
              </li>
            </ul>
          </section>
        </li>
      </ul>
    </section>
  </template>
  <span v-if="isLoading" class="loading loading-dots text-info"></span>
  <p v-if="isError" class="text-error">Could not find definitions for this term</p>
  <p class="text-base-content/50">
    Powered by
    <a
      href="https://rae-api.com/"
      target="_blank"
      rel="noreferrer nofollow"
      class="link link-hover"
    >
      RAE API
    </a>
  </p>
</template>
