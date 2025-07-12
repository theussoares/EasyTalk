<template>
  <div>
    <div v-if="pending" class="flex justify-center items-center h-96" role="status" aria-label="Carregando lição">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500" aria-hidden="true"></div>
      <span class="sr-only">Carregando lição...</span>
    </div>

    <div v-else-if="error" class="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md" role="alert">
      <p class="font-bold">Erro ao carregar a lição</p>
      <p>{{ error.message }}</p>
    </div>

    <div v-else-if="!lesson" class="bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300 p-4 rounded-md" role="alert">
      <p class="font-bold">Lição não encontrada</p>
      <p>Esta lição ainda não foi criada ou você não tem permissão para visualizá-la.</p>
      <p class="text-sm mt-2">ID solicitado: {{ lessonId }}</p>
    </div>

    <div v-else-if="lesson">
      <LessonsLessonView :lesson="lesson" />

      <footer class="mt-8 flex justify-between items-center">
        <button 
          @click="navigate('prev')" 
          :disabled="isFirstLesson" 
          class="flex items-center gap-2 px-4 py-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          type="button"
          :aria-label="isFirstLesson ? 'Primeira lição, não é possível voltar' : 'Ir para lição anterior'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
          Anterior
        </button>
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400" aria-live="polite">
          Lição {{ lessonId }} de {{ totalLessons || 'N/A' }}
        </span>
        <button 
          @click="navigate('next')" 
          :disabled="isLastLesson" 
          class="flex items-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="button"
          :aria-label="isLastLesson ? 'Última lição, não há próxima' : 'Ir para próxima lição'"
        >
          Próxima
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LessonData } from '~/types';

const route = useRoute();
const router = useRouter();
const { fetchLessonById, getLessonsCount } = useLessons();

// Pega o ID da lição da URL
const lessonId = computed(() => {
  const id = route.params.id as string;
  return id || '1';
});

console.log('Lesson ID:', lessonId.value);

// Busca os dados da lição e a contagem total usando `useAsyncData`
const { data: lesson, pending, error } = await useAsyncData(
  `lesson-${lessonId.value}`, 
  async (): Promise<LessonData | null> => {
    const lessonData = await fetchLessonById(lessonId.value);
    console.log('Fetched lesson data for ID', lessonId.value, ':', lessonData);
    return lessonData;
  },
  { 
    watch: [lessonId],
    server: false // Executa apenas no cliente para evitar problemas de SSR
  }
);

const { data: totalLessons } = await useAsyncData(
  'lessons-count', 
  () => getLessonsCount(),
  { server: false }
);

console.log('Lesson data:', lesson.value, 'Error:', error.value);

// Lógica para navegação
const isFirstLesson = computed(() => Number(lessonId.value) <= 1);
const isLastLesson = computed(() => Number(lessonId.value) >= (totalLessons.value || 0));

const navigate = (direction: 'next' | 'prev') => {
  const currentId = Number(lessonId.value);
  const nextId = direction === 'next' ? currentId + 1 : currentId - 1;

  if (nextId > 0 && nextId <= (totalLessons.value || 0)) {
    // Corrigido: navega para a rota correta /lessons/ (não /lesson/)
    router.push(`/lessons/${nextId}`);
  }
};

// Salva a última lição acessada no localStorage
onMounted(() => {
  if (process.client) {
    localStorage.setItem('lastLessonId', lessonId.value);
  }
});
</script>