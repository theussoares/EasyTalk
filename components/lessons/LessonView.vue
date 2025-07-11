<template>
  <div v-if="lesson" class="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <header class="mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-500 dark:text-indigo-400"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        {{ lesson.title || 'Título da Lição...' }}
      </h1>
    </header>
    <main>
      <LessonsVocabSection v-if="lesson.vocab && lesson.vocab.length > 0" :vocab="lesson.vocab" />
      <LessonsQuestionSection v-if="lesson.questions && lesson.questions.length > 0" :questions="formattedQuestions" />
      <LessonsGrammarSection v-if="lesson.grammar && lesson.grammar.length > 0" :grammar-tables="formattedGrammar" />
    </main>
  </div>
</template>

<script setup lang="ts">
import type { LessonData, LessonQuestion, LessonGrammarItem } from '~/types';

// Importa os componentes da lição automaticamente graças ao Nuxt
interface IProps {
  lesson?: LessonData | null;
}

const props = defineProps<IProps>();

// Converte o formato das perguntas para o formato esperado pelo QuestionSection
const formattedQuestions = computed((): LessonQuestion[] => {
  if (!props.lesson?.questions) return [];
  
  // Se já está no formato do Firestore, retorna como está
  if (props.lesson.questions.length > 0 && typeof props.lesson.questions[0] === 'object' && !Array.isArray(props.lesson.questions[0])) {
    return props.lesson.questions as LessonQuestion[];
  }
  
  // Se está no formato do formulário, converte
  return (props.lesson.questions as [string, string][]).map(([question, answer]) => ({
    question,
    answer
  }));
});

// Converte o formato das tabelas de gramática para o formato esperado pelo GrammarSection
const formattedGrammar = computed(() => {
  if (!props.lesson?.grammar) return [];
  
  return props.lesson.grammar.map(table => ({
    title: table.title || '',
    items: (table.items || []).map(item => {
      // Se já está no formato do Firestore
      if (typeof item === 'object' && !Array.isArray(item)) {
        const firestoreItem = item as LessonGrammarItem;
        return [firestoreItem.col1 || '', firestoreItem.col2 || ''] as [string, string];
      }
      // Se está no formato do formulário
      return item as [string, string];
    })
  }));
});
</script>