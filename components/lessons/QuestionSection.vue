<template>
  <div class="mb-8">
    <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wider">
      Questions & Answers
    </h3>
    <div class="space-y-5" role="list" aria-label="Lista de perguntas e respostas">
      <div
        v-for="(q, index) in questions"
        :key="index"
        class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
        role="listitem"
      >
        <p class="text-lg text-gray-800 dark:text-gray-200 mb-2">
          <span class="font-bold text-indigo-600 dark:text-indigo-400" aria-hidden="true">Q:</span> 
          <span>{{ q.question }}</span>
        </p>
        <div v-if="visibleAnswers[index]" class="text-lg text-green-700 dark:text-green-400">
          <p>
            <span class="font-bold" aria-hidden="true">A:</span> 
            <span>{{ q.answer }}</span>
          </p>
          <button
            @click="toggleAnswer(index)"
            class="mt-2 px-4 py-1 text-sm font-semibold text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="button"
            :aria-label="`Ocultar resposta da pergunta ${index + 1}`"
          >
            Ocultar Resposta
          </button>
        </div>
        <button
          v-else
          @click="toggleAnswer(index)"
          class="px-4 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="button"
          :aria-label="`Mostrar resposta da pergunta ${index + 1}`"
        >
          Mostrar Resposta
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IQuestion {
  question: string;
  answer: string;
}

interface IProps {
  questions: IQuestion[];
}

const props = defineProps<IProps>();

const visibleAnswers = ref<Record<number, boolean>>({});

const toggleAnswer = (index: number) => {
  visibleAnswers.value[index] = !visibleAnswers.value[index];
};
</script>
