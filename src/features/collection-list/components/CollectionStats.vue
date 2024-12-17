<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { currentVault } from '@/shared/data/currentVault';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const recentTermsCount = computed(() => {
  const yesterday = Date.now() - DAY_IN_MS;

  return currentVault.value.collections.reduce((prev, collection) => {
    const termsFromLastDay = collection.terms.filter((term) => {
      const createdAt = new Date(term.createdAt);
      return createdAt.getTime() > yesterday;
    });

    return prev + termsFromLastDay.length;
  }, 0);
});

const totalTermsCount = computed(() => {
  return currentVault.value.collections.reduce((prev, collection) => {
    return prev + collection.terms.length;
  }, 0);
});
</script>

<template>
  <section class="w-full shadow stats stats-vertical md:stats-horizontal bg-primary-content">
    <div class="stat">
      <Icon icon="heroicons:book-open-solid" class="text-3xl stat-figure text-primary" />
      <span class="stat-title">Recent Terms</span>
      <span class="stat-value">+{{ recentTermsCount }}</span>
      <span class="stat-desc">Last 24 hours</span>
    </div>
    <div class="stat">
      <Icon icon="heroicons:square-3-stack-3d-20-solid" class="text-3xl stat-figure text-primary" />
      <span class="stat-title">All Terms</span>
      <span class="stat-value">{{ totalTermsCount }}</span>
      <span class="stat-desc">Added in total</span>
    </div>
    <div class="stat">
      <Icon icon="heroicons:document-check-20-solid" class="text-3xl stat-figure text-primary" />
      <span class="stat-title">Learned Terms</span>
      <span class="stat-value">0</span>
      <span class="stat-desc">Sunk so far</span>
    </div>
  </section>
</template>
