<script setup lang="ts">
import { sorting } from '@/data';
import type { Term } from '@/types';
import { Icon } from '@iconify/vue';
import { computed, watch } from 'vue';

const props = defineProps<{ terms: Term[] }>();

const emit = defineEmits<{
  (e: 'sort', data: Term[]): void;
}>();

watch(
  [props.terms, sorting],
  () => {
    switch (sorting.value) {
      case 'alphabetically': {
        emit(
          'sort',
          [...props.terms].sort((a, b) => {
            const aLower = a.content.toLowerCase();
            const bLower = b.content.toLowerCase();

            if (aLower < bLower) return -1;
            else if (aLower > bLower) return 1;
            else return 0;
          })
        );
        break;
      }
      case 'ascending': {
        emit(
          'sort',
          [...props.terms].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
        break;
      }
      case 'descending': {
        emit(
          'sort',
          [...props.terms].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
        break;
      }
    }
  },
  { immediate: true }
);

const handleSortChange = () => {
  switch (sorting.value) {
    case 'alphabetically': {
      sorting.value = 'ascending';
      break;
    }
    case 'ascending': {
      sorting.value = 'descending';
      break;
    }
    case 'descending': {
      sorting.value = 'alphabetically';
      break;
    }
  }
};

const sortingTooltip = computed(() => {
  let msg = 'Sort by ';

  switch (sorting.value) {
    case 'alphabetically': {
      msg += 'alphabetic';
      break;
    }
    case 'ascending': {
      msg += 'ascending';
      break;
    }
    case 'descending': {
      msg += 'descending';
      break;
    }
  }

  msg += ' order';

  return msg;
});
</script>

<template>
  <button
    @click="handleSortChange()"
    class="btn bg-base-100 text-lg tooltip"
    :data-tip="sortingTooltip"
  >
    <span v-if="sorting === 'alphabetically'"> A </span>
    <Icon v-else-if="sorting === 'ascending'" icon="heroicons:bars-arrow-up" />
    <Icon v-else-if="sorting === 'descending'" icon="heroicons:bars-arrow-down" />
  </button>
</template>
