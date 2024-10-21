<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
import { theme } from '@/data';
import { useTermStore } from '@/stores/term';

const store = useTermStore();
</script>

<template>
  <header class="navbar w-full z-30 shadow bg-base-100 sticky">
    <nav class="container mx-auto flex justify-between">
      <RouterLink to="/" class="btn btn-ghost text-xl text-base-content">Vocabulary</RouterLink>
      <ul class="menu menu-horizontal text-xl">
        <li>
          <RouterLink to="/collections" class="tooltip tooltip-bottom" data-tip="Collections">
            <Icon icon="heroicons:book-open-solid" />
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/quiz" class="relative tooltip tooltip-bottom" data-tip="Learn">
            <Icon
              icon="heroicons:academic-cap-solid"
              :class="store.hasToLearn ? 'chameleon' : ''"
            />
          </RouterLink>
        </li>
        <li>
          <button
            @click="theme = theme === 'light' ? 'dark' : 'light'"
            class="tooltip tooltip-bottom"
            :data-tip="theme === 'light' ? 'Light Mode' : 'Dark Mode'"
          >
            <Icon v-if="theme === 'light'" icon="heroicons:sun" />
            <Icon v-else icon="heroicons:moon" />
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style>
.chameleon {
  animation: chameleon 3s ease-in-out alternate infinite;
}

@keyframes chameleon {
  0% {
    @apply text-base-content;
  }

  50% {
    @apply text-success;
  }

  100% {
    @apply text-base-content;
  }
}
</style>
