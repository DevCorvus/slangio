<script setup lang="ts">
import { ref } from 'vue';
import ModalComponent from './ModalComponent.vue';

const showModal = ref(false);
</script>

<template>
  <footer class="bg-neutral text-neutral-content py-2 px-4">
    <div class="container mx-auto flex justify-between items-center">
      <p><span class="font-semibold text-lg">Slangio</span> | Expand Your Vocabulary</p>
      <button @click="showModal = true" class="btn btn-info">About</button>
    </div>
  </footer>
  <ModalComponent :show="showModal" @close="showModal = false">
    <section class="space-y-6">
      <header>
        <h3 class="text-xl font-bold">About</h3>
      </header>
      <div class="space-y-4">
        <p>
          I made this app out of necessity, as a complement to my language learning journey. I found
          myself with lists and open tabs about terms I encountered throughout the day from various
          sources. This was in order to learn about them, put them in context and try to practice
          and remember them for the next time.
        </p>
        <p>
          I wanted to automate this process and I was too lazy to create Flash Cards but not so much
          to make my own application (Classic Programmer). I made it tailored to my needs but I hope
          for other people's needs too.
        </p>
        <div class="alert text-left flex flex-col items-start">
          <strong>Disclaimer</strong>
          <p>
            You won't learn any language out of just pure vocabulary. There is more to it: grammar,
            pronunciation, immersion and so on. This is a complementary tool you can carry alongside
            many others to help you smooth the way to learn a new language.
          </p>
        </div>
      </div>
    </section>
  </ModalComponent>
</template>
