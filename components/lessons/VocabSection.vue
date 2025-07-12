<template>
  <div class="mb-8">
    <!-- Formato antigo (compatibilidade) - uma única seção sem título -->
    <div v-if="vocab && vocab.length > 0" class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-lg dark:bg-sky-900/50 dark:border-sky-500">
      <h3 class="text-sm font-semibold text-sky-800 dark:text-sky-300 mb-3 uppercase tracking-wider">Vocabulary</h3>
      <div class="flex flex-wrap gap-x-6 gap-y-2">
        <span v-for="(word, index) in vocab" :key="index" class="font-mono text-lg text-gray-700 dark:text-gray-300">
          {{ word }}
        </span>
      </div>
    </div>

    <!-- Novo formato - múltiplas seções com títulos -->
    <template v-if="vocabSections && vocabSections.length > 0">
      <LessonsVocabSectionItem 
        v-for="(section, index) in vocabSections" 
        :key="index"
        :title="section.title"
        :words="section.words"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { VocabSection } from '~/types';

interface IProps {
  vocab?: string[]; // Formato antigo (compatibilidade)
  vocabSections?: VocabSection[]; // Novo formato
}

const props = defineProps<IProps>();
</script>