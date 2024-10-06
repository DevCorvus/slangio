<script setup lang="ts">
import { profileService } from '@/services/profile.service';
import type { Word } from '@/types';
import { Icon } from '@iconify/vue';

const props = defineProps<{ words: Word[] }>();
</script>

<template>
  <div class="card card-compact bg-base-200 shadow">
    <ul v-if="props.words.length > 0" class="card-body">
      <li v-for="word in props.words" :key="word.id">
        <div class="flex items-center gap-2 w-full">
          <button class="btn btn-sm btn-ghost flex-1 justify-start">
            <span>{{ word.content }}</span>
          </button>
          <ul class="menu menu-horizontal p-0">
            <li>
              <button @click="profileService.removeWord($route.params.id as string, word.id)">
                <Icon icon="heroicons:trash" />
              </button>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <div v-else class="card-body">
      <p>No words yet</p>
    </div>
  </div>
</template>
