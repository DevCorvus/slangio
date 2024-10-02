<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <div>
    <input
      type="text"
      class="input input-bordered input-primary input-lg rounded-full text-center"
      placeholder="Enter a new word"
    />
    <div class="relative w-48 mx-auto">
      <details class="dropdown dropdown-bottom w-full">
        <summary class="btn btn-primary btn-sm w-full rounded-b-full">Collection</summary>
        <ul class="w-full menu dropdown-content shadow rounded-box bg-primary-content z-10">
          <li>
            <button>Default Collection</button>
          </li>
          <li>
            <button>Another Collection</button>
          </li>
        </ul>
      </details>
      <RouterLink
        to="/collections/collection-name"
        class="absolute top-1.5 right-4 rounded-full shadow-sm border-2 border-primary-content text-primary-content"
      >
        <Icon icon="heroicons:arrow-up-right-16-solid" />
      </RouterLink>
    </div>
  </div>
</template>
