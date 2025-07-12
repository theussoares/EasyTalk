<template>
  <div class="mb-6 p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-lg dark:bg-sky-900/50 dark:border-sky-500">
    <h3 class="text-sm font-semibold text-sky-800 dark:text-sky-300 mb-3 uppercase tracking-wider">
      {{ title || 'Vocabulary' }}
    </h3>
    <div class="flex flex-wrap gap-x-6 gap-y-2">
      <span v-for="(word, index) in words" :key="index" class="font-mono text-lg text-gray-700 dark:text-gray-300">
        {{ word }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title?: string;
  words: string[];
}

const props = defineProps<IProps>();
</script>
