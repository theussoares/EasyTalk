<template>
   <div class="mb-8">
    <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wider">Grammar</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="(table, tableIndex) in grammarTables" :key="tableIndex" class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <h4 class="p-3 text-md font-semibold bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300">{{ table.title }}</h4>
        <div class="p-4">
          <div v-for="([col1, col2], itemIndex) in table.items" :key="itemIndex" class="grid grid-cols-2 gap-4 py-2 border-b dark:border-gray-700 last:border-b-0">
            <span class="text-gray-800 dark:text-gray-200">{{ col1 }}</span>
            <span class="text-gray-600 dark:text-gray-400 font-medium">{{ col2 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  grammarTables: { title: string; items: [string, string][] }[];
}

const props = defineProps<IProps>();
</script>