<template>
  <div class="mb-8">
    <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wider">
      Questions & Answers
    </h3>
    <div class="space-y-5">
      <div
        v-for="(q, index) in questions"
        :key="index"
        class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
      >
        <p class="text-lg text-gray-800 dark:text-gray-200 mb-2">
          <span class="font-bold text-indigo-600 dark:text-indigo-400">Q:</span> {{ q.question }}
        </p>
        <p
          v-if="visibleAnswers[index]"
          class="text-lg text-green-700 dark:text-green-400"
        >
          <span class="font-bold">A:</span> {{ q.answer }}
        </p>
        <button
          v-else
          @click="toggleAnswer(index)"
          class="px-4 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors"
        >
          Show Answer
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
