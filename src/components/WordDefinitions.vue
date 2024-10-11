<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, watch } from 'vue';

const props = defineProps<{ term: string }>();

interface WordDefinitionResponse {
  phonetic?: string;
  phonetics: { audio?: string }[];
  origin?: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
}

interface WordDefinition {
  phonetic?: string;
  origin?: string;
  audio?: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms: string[];
      antonyms: string[];
    }[];
  }[];
}

const definition = ref<WordDefinition | null>(null);
const showDefinitions = ref(false);
const audio = ref<HTMLAudioElement>();

const isLoading = ref(false);
const isError = ref(false);

watch([() => props.term, showDefinitions], async (value, prev) => {
  if (
    value[0] !== prev[0] ||
    (showDefinitions.value && !isError.value && definition.value === null)
  ) {
    definition.value = null;
    isLoading.value = true;
    isError.value = false;

    const res = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + props.term);
    const json = await res.json();

    if (Array.isArray(json)) {
      const data = json[0] as WordDefinitionResponse;
      definition.value = {
        phonetic: data.phonetic,
        audio: data.phonetics.find((p) => p.audio !== '')?.audio || undefined,
        origin: data.origin,
        meanings: data.meanings
      };
    } else {
      isError.value = true;
    }

    isLoading.value = false;
  }
});

const playAudio = () => {
  if (audio.value) {
    audio.value.play();
  }
};
</script>

<template>
  <section class="collapse collapse-arrow bg-base-200">
    <input type="checkbox" v-model="showDefinitions" />
    <header class="collapse-title text-xl font-medium">Definitions</header>
    <div class="collapse-content space-y-4">
      <template v-if="definition !== null">
        <section v-if="definition.audio || definition.phonetic" class="space-y-2">
          <div v-if="definition.audio">
            <div class="flex items-center gap-1">
              <strong>Audio:</strong>
              <button @click="playAudio" class="btn btn-circle btn-sm btn-info text-xl">
                <Icon icon="heroicons:speaker-wave-16-solid" />
              </button>
            </div>
            <audio ref="audio">
              <source :src="definition.audio" type="audio/mpeg" />
            </audio>
          </div>
          <p v-if="definition.phonetic"><strong>Phonetic:</strong> {{ definition.phonetic }}</p>
        </section>
        <section
          v-for="(meaning, i) in definition.meanings"
          :key="i + '-meaning'"
          class="space-y-4"
        >
          <header class="badge badge-lg badge-info">{{ meaning.partOfSpeech }}</header>
          <ul class="space-y-3">
            <li v-for="(def, j) in meaning.definitions" :key="j + '-definition'" class="space-y-1">
              <p>
                <strong>{{ j + 1 }}.</strong> {{ def.definition }}
              </p>
              <p v-if="def.example"><strong>Example:</strong> {{ def.example }}</p>
              <section v-if="def.synonyms.length > 0" class="space-y-1">
                <header>
                  <strong>Synonyms</strong>
                </header>
                <ul class="flex items-center gap-1">
                  <li v-for="(synonym, k) in def.synonyms" :key="k + 'synonym'">
                    <span class="badge badge-outline">{{ synonym }}</span>
                  </li>
                </ul>
              </section>
              <section v-if="def.antonyms.length > 0" class="space-y-1">
                <header>
                  <strong>Antonyms</strong>
                </header>
                <ul class="flex items-center gap-1">
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
      <p v-if="isError" class="text-error">Could not find definitions for this word</p>
      <p class="text-base-content/50">
        Powered by
        <a
          href="https://dictionaryapi.dev/"
          target="_blank"
          rel="noreferrer nofollow"
          class="link link-hover"
        >
          freeDictionaryAPI
        </a>
      </p>
    </div>
  </section>
</template>
