<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
import { theme } from '@/data';
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
          <RouterLink to="/learn" class="tooltip tooltip-bottom" data-tip="Learn">
            <Icon icon="heroicons:academic-cap-solid" />
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
