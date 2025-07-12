<template>
  <div class="mb-8">
    <!-- Formato antigo (compatibilidade) - uma única seção sem título -->
    <div v-if="vocab && vocab.length > 0" class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-lg dark:bg-sky-900/50 dark:border-sky-500">
      <h3 class="text-sm font-semibold text-sky-800 dark:text-sky-300 mb-3 uppercase tracking-wider">Vocabulary</h3>
      
      <!-- Se temos grupos de palavras (novo formato), mostra linha por linha -->
      <div v-if="vocabGroups && vocabGroups.length > 0" class="space-y-3">
        <div v-for="(group, groupIndex) in vocabGroups" :key="groupIndex" class="flex flex-wrap justify-evenly gap-y-2">
          <span v-for="(word, wordIndex) in group" :key="wordIndex" class="font-mono text-lg text-gray-700 dark:text-gray-300">
            {{ word }}
          </span>
        </div>
      </div>
      
      <!-- Fallback para formato antigo -->
      <div v-else class="flex flex-wrap justify-evenly gap-y-2">
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
        :wordGroups="section.wordGroups"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { VocabSection } from '~/types';

interface IProps {
  vocab?: string[]; // Formato antigo (compatibilidade)
  vocabGroups?: string[][]; // Grupos de palavras separados por pontos
  vocabSections?: VocabSection[]; // Novo formato
}

const props = defineProps<IProps>();
</script>