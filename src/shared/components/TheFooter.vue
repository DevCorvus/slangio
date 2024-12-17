<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import BaseModal from './BaseModal.vue';

const showModal = ref(false);
</script>

<template>
  <footer class="px-4 py-6 bg-neutral text-neutral-content">
    <div class="container flex flex-col items-center justify-between gap-4 mx-auto md:flex-row">
      <p><span class="text-lg font-semibold">Slangio</span> | Expand Your Vocabulary</p>
      <ul class="flex items-center gap-2">
        <li>
          <RouterLink to="/support" role="button" class="btn btn-sm btn-secondary">
            <img
              width="20"
              src="https://storage.ko-fi.com/cdn/brandasset/v2/kofi_symbol.png"
              alt="Ko-fi Logo"
            />
            <span>Donate</span>
          </RouterLink>
        </li>
        <li>
          <a
            href="https://github.com/DevCorvus/slangio"
            target="_blank"
            rel="noreferrer nofollow"
            class="btn btn-sm btn-success"
          >
            <Icon icon="flowbite:github-solid" class="text-xl" />
            Repo
          </a>
        </li>
        <li>
          <button @click="showModal = true" class="btn btn-sm btn-info">
            <Icon icon="heroicons:information-circle-16-solid" class="text-xl" />
            About
          </button>
        </li>
      </ul>
    </div>
  </footer>
  <BaseModal :show="showModal" @close="showModal = false">
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
        <div class="flex flex-col items-start text-left alert">
          <strong>Disclaimer</strong>
          <p>
            You won't learn any language out of just pure vocabulary. There is more to it: grammar,
            pronunciation, immersion and so on. This is a complementary tool you can carry alongside
            many others to help you smooth the way to learn a new language.
          </p>
        </div>
      </div>
    </section>
  </BaseModal>
</template>
