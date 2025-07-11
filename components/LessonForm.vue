<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título da Lição</label>
      <input 
        type="text" 
        v-model="model.title"
        placeholder="Ex: Lesson 4: Family"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vocabulário</label>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Digite as palavras separadas por vírgula.</p>
      <textarea 
        v-model="vocabText"
        @blur="updateParentModel"
        placeholder="father, mother, brother"
        rows="5"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono dark:bg-gray-700 dark:border-gray-600"
      />
    </div>

    <div class="space-y-4">
      <h3 class="text-md font-medium text-gray-800 dark:text-gray-200 border-b dark:border-gray-600 pb-2">Perguntas e Respostas</h3>
      <div v-for="(q, index) in model.questions" :key="index" class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-200 dark:border-gray-600 space-y-2 relative">
        <button @click="removeQuestion(index)" class="absolute top-2 right-2 text-gray-400 hover:text-red-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
        <input type="text" v-model="q[0]" placeholder="Pergunta" class="w-full px-2 py-1 border border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500" />
        <input type="text" v-model="q[1]" placeholder="Resposta" class="w-full px-2 py-1 border border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500" />
      </div>
      <button @click="addQuestion" class="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800">
        Adicionar Pergunta
      </button>
    </div>

    <div class="space-y-4">
        <h3 class="text-md font-medium text-gray-800 dark:text-gray-200 border-b dark:border-gray-600 pb-2">Tabelas de Gramática</h3>
        <div v-for="(g, tableIndex) in model.grammar" :key="tableIndex" class="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-200 dark:border-gray-600 space-y-3 relative">
            <button @click="removeGrammarTable(tableIndex)" class="absolute top-2 right-2 text-gray-400 hover:text-red-500">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
            <input type="text" v-model="g.title" placeholder="Título da Tabela" class="w-full px-3 py-2 text-md font-semibold border-b border-gray-300 bg-transparent focus:outline-none focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400" />
            <div v-for="(item, itemIndex) in g.items" :key="itemIndex" class="flex items-center gap-2">
                <input type="text" v-model="item[0]" placeholder="Coluna 1" class="w-full px-2 py-1 border border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500" />
                <input type="text" v-model="item[1]" placeholder="Coluna 2" class="w-full px-2 py-1 border border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500" />
                <button @click="removeGrammarItem(tableIndex, itemIndex)" class="text-gray-400 hover:text-red-500">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </div>
            <button @click="addGrammarItem(tableIndex)" class="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 mt-2">
                Adicionar Item
            </button>
        </div>
        <button @click="addGrammarTable" class="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800">
            Adicionar Tabela
        </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LessonFormData } from '~/types';

// `defineModel` cria uma propriedade reativa que pode ser modificada pelo
// componente pai usando v-model. É a forma moderna de fazer two-way binding.
const model = defineModel<LessonFormData>({ required: true });

// 1. Criamos uma variável local apenas para o texto do vocabulário.
const vocabText = ref('');

// 2. Sincronizamos a variável local com o modelo de dados principal.
// `watchEffect` garante que o campo seja preenchido se os dados mudarem.
watchEffect(() => {
  vocabText.value = model.value.vocab.join(', ');
});

// 3. Atualizamos o modelo principal SÓ quando o usuário termina de editar.
const updateParentModel = () => {
  model.value.vocab = vocabText.value.split(',').map(word => word.trim()).filter(Boolean);
};

const addQuestion = () => model.value.questions.push(['', '']);
const removeQuestion = (index: number) => model.value.questions.splice(index, 1);

const addGrammarTable = () => model.value.grammar.push({ title: '', items: [['', '']] });
const removeGrammarTable = (index: number) => model.value.grammar.splice(index, 1);

const addGrammarItem = (tableIndex: number) => model.value.grammar[tableIndex].items.push(['', '']);
const removeGrammarItem = (tableIndex: number, itemIndex: number) => model.value.grammar[tableIndex].items.splice(itemIndex, 1);
</script>