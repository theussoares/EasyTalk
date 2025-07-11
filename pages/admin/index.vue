<template>
  <div>
    <!-- Debug info -->
    <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <p class="text-sm text-blue-800 dark:text-blue-200">
        <strong>Usuário logado:</strong> {{ user?.email || 'Não logado' }}
      </p>
      <button 
        v-if="user" 
        @click="signOutUser" 
        class="mt-2 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>

    <div v-if="successMessage" class="mb-6 p-4 text-green-800 bg-green-100 border border-green-300 rounded-lg dark:bg-green-900/50 dark:text-green-300 dark:border-green-700">
        {{ successMessage }}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Formulário</h2>
        <LessonForm v-model="newLesson" />
      </div>

      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Preview em Tempo Real</h2>
        <LessonsLessonView :lesson="newLesson" />
      </div>
    </div>

    <div class="mt-8 flex justify-end gap-4">
      <button @click="resetForm" class="px-6 py-2 font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500">
        Limpar
      </button>
      <button @click="handleSave" :disabled="isSaving" class="px-6 py-2 font-semibold text-white bg-green-600 border border-transparent rounded-lg shadow-sm hover:bg-green-700 disabled:opacity-50 disabled:bg-green-400">
        {{ isSaving ? 'Salvando...' : 'Salvar Lição' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LessonFormData } from '~/types';

// Define o middleware para proteção da página
definePageMeta({
  middleware: 'auth-admin'
});

const { user, signOutUser, initAuthListener } = useAuth();
const { saveNewLesson } = useLessonsAdmin();

// Inicializa o listener de autenticação quando a página monta
onMounted(() => {
  if (process.client) {
    initAuthListener();
  }
});

const getInitialLessonState = (): LessonFormData => ({
  title: '',
  vocab: [],
  questions: [],
  grammar: [],
});

const newLesson = ref<LessonFormData>(getInitialLessonState());
const isSaving = ref(false);
const successMessage = ref('');

const resetForm = () => {
    newLesson.value = getInitialLessonState();
};

const handleSave = async () => {
  if (!newLesson.value.title.trim()) {
    alert('Por favor, adicione um título para a lição.');
    return;
  }

  isSaving.value = true;
  successMessage.value = '';

  // Remove campos vazios antes de salvar
  const cleanLesson: LessonFormData = JSON.parse(JSON.stringify(newLesson.value)); // Deep copy
  cleanLesson.questions = cleanLesson.questions.filter(([q, a]) => q && a);
  cleanLesson.grammar.forEach((g) => {
      g.items = g.items.filter(([i1, i2]) => i1 && i2);
  });
  cleanLesson.grammar = cleanLesson.grammar.filter((g) => g.title && g.items.length > 0);

  const result = await saveNewLesson(cleanLesson);

  if (result.success) {
    successMessage.value = 'Lição salva com sucesso! Você pode criar outra ou limpar o formulário.';
    resetForm();
  } else {
    alert(`Ocorreu um erro ao salvar a lição: ${result.error}`);
  }

  isSaving.value = false;
};
</script>