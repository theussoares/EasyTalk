<template>
  <section class="mb-6 p-4 mt-2 bg-sky-50 border-l-4 border-sky-500 rounded-r-lg dark:bg-sky-900/50 dark:border-sky-500" role="region" :aria-labelledby="title ? `vocab-title-${title.replace(/\s+/g, '-').toLowerCase()}` : undefined">
    <h4 v-if="title" :id="`vocab-title-${title.replace(/\s+/g, '-').toLowerCase()}`" class="text-sm font-semibold text-sky-800 dark:text-sky-300 mb-3 uppercase tracking-wider">{{ title }}</h4>
    
    <!-- Se temos grupos de palavras (novo formato), mostra linha por linha -->
    <div v-if="wordGroups && wordGroups.length > 0" class="space-y-3" role="list" aria-label="Grupos de vocabulário">
      <div v-for="(group, groupIndex) in wordGroups" :key="groupIndex" class="flex flex-wrap justify-evenly gap-y-2" role="listitem" :aria-label="`Grupo ${groupIndex + 1} de palavras`">
        <span v-for="(word, wordIndex) in group" :key="wordIndex" class="font-mono text-lg text-gray-700 dark:text-gray-300" role="term">
          {{ word }}
        </span>
      </div>
    </div>
    
    <!-- Fallback para formato antigo -->
    <div v-else class="flex flex-wrap justify-evenly gap-y-2" role="list" aria-label="Palavras de vocabulário">
      <span v-for="(word, index) in words" :key="index" class="font-mono text-lg text-gray-700 dark:text-gray-300" role="listitem">
        {{ word }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
interface IProps {
  title?: string;
  words: string[];
  wordGroups?: string[][]; // Grupos de palavras separados por pontos
}

const props = defineProps<IProps>();
</script>
