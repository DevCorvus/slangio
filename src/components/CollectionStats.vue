<script setup lang="ts">
import { profile } from '@/data';
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const recentTermsCount = computed(() => {
  const yesterday = Date.now() - DAY_IN_MS;

  return profile.value.collections.reduce((prev, collection) => {
    const termsFromLastDay = collection.terms.filter((term) => {
      const createdAt = new Date(term.createdAt);
      return createdAt.getTime() > yesterday;
    });

    return prev + termsFromLastDay.length;
  }, 0);
});

const totalTermsCount = computed(() => {
  return profile.value.collections.reduce((prev, collection) => {
    return prev + collection.terms.length;
  }, 0);
});
</script>

<template>
  <section class="stats bg-primary-content shadow w-full">
    <div class="stat">
      <Icon icon="heroicons:book-open-solid" class="stat-figure text-primary text-3xl" />
      <span class="stat-title">Recent Terms</span>
      <span class="stat-value">+{{ recentTermsCount }}</span>
      <span class="stat-desc">Last 24 hours</span>
    </div>
    <div class="stat">
      <Icon icon="heroicons:square-3-stack-3d-20-solid" class="stat-figure text-primary text-3xl" />
      <span class="stat-title">All Terms</span>
      <span class="stat-value">{{ totalTermsCount }}</span>
      <span class="stat-desc">Added in total</span>
    </div>
    <div class="stat">
      <Icon icon="heroicons:document-check-20-solid" class="stat-figure text-primary text-3xl" />
      <span class="stat-title">Learned Terms</span>
      <span class="stat-value">0</span>
      <span class="stat-desc">Sunk so far</span>
    </div>
  </section>
</template>
