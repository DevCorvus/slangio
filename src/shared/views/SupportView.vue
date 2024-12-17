<script setup lang="ts">
import GoBack from '@/shared/components/GoBack.vue';
import { onMounted } from 'vue';

onMounted(() => {
  window.scrollTo({ top: 0 });
});
</script>

<template>
  <GoBack />
  <main class="space-y-6">
    <header>
      <h1 class="font-semibold text-3xl text-center">Thanks for your support!</h1>
    </header>
    <section>
      <iframe
        id="kofiframe"
        src="https://ko-fi.com/devcorvus/?hidefeed=true&widget=true&embed=true&preview=true"
        class="w-[384px] mx-auto border-0 rounded-box"
        height="625"
        title="devcorvus"
      ></iframe>
    </section>
  </main>
</template>
