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

    <div class="space-y-4">
      <h3 class="text-md font-medium text-gray-800 dark:text-gray-200 border-b dark:border-gray-600 pb-2">Seções de Vocabulário</h3>
      
      <!-- Seção de vocabulário simples (compatibilidade) -->
      <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md border border-gray-200 dark:border-gray-600">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vocabulário Geral</label>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Use <strong>vírgula (,)</strong> para separar palavras | Use <strong>ponto (.)</strong> para quebrar linha
        </p>
        <p class="text-xs text-blue-600 dark:text-blue-400 mb-2 font-mono">
          Exemplo: book, pen, pencil. what is (what's), this, it is (it's)
        </p>
        <textarea 
          v-model="vocabText"
          @blur="updateParentModel"
          placeholder="book, pen, pencil, table, chair.&#10;what is (what's), this, it is (it's), a"
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm leading-relaxed dark:bg-gray-700 dark:border-gray-600"
        />
        
        <!-- Preview do vocabulário formatado -->
        <div v-if="formattedVocabPreview.length > 0" class="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-600">
          <p class="text-xs font-medium text-blue-800 dark:text-blue-300 mb-2">Preview:</p>
          <div class="space-y-2">
            <div v-for="(line, index) in formattedVocabPreview" :key="index" class="flex flex-wrap gap-x-3 gap-y-1">
              <span v-for="(word, wordIndex) in line" :key="wordIndex" class="px-2 py-1 bg-white dark:bg-gray-700 border border-blue-200 dark:border-blue-600 rounded text-xs font-mono">
                {{ word }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Seções de vocabulário com títulos -->
      <div v-for="(section, index) in model.vocabSections || []" :key="index" class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-600 space-y-2 relative">
        <button @click="removeVocabSection(index)" class="absolute top-2 right-2 text-gray-400 hover:text-red-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
        <input 
          type="text" 
          v-model="section.title" 
          placeholder="Título da seção (ex: Família, Animais)" 
          class="w-full px-2 py-1 border border-gray-300 rounded-md font-medium dark:bg-gray-600 dark:border-gray-500"
        />
        <p class="text-xs text-blue-600 dark:text-blue-400 font-mono">
          Use vírgula (,) para separar | Use ponto (.) para quebrar linha
        </p>
        <textarea 
          v-model="vocabSectionTexts[index]"
          @blur="updateVocabSection(index)"
          placeholder="book, pen, pencil.&#10;what is (what's), this, it is (it's)"
          rows="3"
          class="w-full px-2 py-1 border border-gray-300 rounded-md font-mono text-sm leading-relaxed dark:bg-gray-600 dark:border-gray-500"
        />
        
        <!-- Preview para seções de vocabulário -->
        <div v-if="getVocabSectionPreview(index).length > 0" class="mt-2 p-2 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-600">
          <p class="text-xs font-medium text-blue-800 dark:text-blue-300 mb-2">Preview:</p>
          <div class="space-y-2">
            <div v-for="(line, lineIndex) in getVocabSectionPreview(index)" :key="lineIndex" class="flex flex-wrap gap-x-3 gap-y-1">
              <span v-for="(word, wordIndex) in line" :key="wordIndex" class="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-600 rounded text-xs font-mono">
                {{ word }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <button @click="addVocabSection" class="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        Adicionar Seção de Vocabulário
      </button>
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
import type { LessonFormData, VocabSection } from '~/types';

// `defineModel` cria uma propriedade reativa que pode ser modificada pelo
// componente pai usando v-model. É a forma moderna de fazer two-way binding.
const model = defineModel<LessonFormData>({ required: true });

// 1. Criamos uma variável local apenas para o texto do vocabulário.
const vocabText = ref('');

// Array para manter os textos das seções de vocabulário
const vocabSectionTexts = ref<string[]>([]);

// Variáveis para armazenar a formatação original (preserva pontos e vírgulas)
const originalVocabFormat = ref('');
const originalSectionFormats = ref<string[]>([]);

// Computed para mostrar preview do vocabulário formatado
const formattedVocabPreview = computed(() => {
  if (!vocabText.value.trim()) return [];
  
  // Separa por pontos para criar linhas
  const lines = vocabText.value.split('.').map(line => line.trim()).filter(Boolean);
  
  return lines.map(line => 
    // Separa cada linha por vírgulas para criar palavras
    line.split(',').map(word => word.trim()).filter(Boolean)
  );
});

// Função para preview das seções de vocabulário
const getVocabSectionPreview = (index: number) => {
  const text = vocabSectionTexts.value[index];
  if (!text || !text.trim()) return [];
  
  // Separa por pontos para criar linhas
  const lines = text.split('.').map(line => line.trim()).filter(Boolean);
  
  return lines.map(line => 
    // Separa cada linha por vírgulas para criar palavras
    line.split(',').map(word => word.trim()).filter(Boolean)
  );
};

// 2. Sincronizamos a variável local com o modelo de dados principal.
// Preserva a formatação original do usuário
watchEffect(() => {
  // Só inicializa se o campo estiver vazio e houver dados
  if (!vocabText.value && model.value.vocab.length > 0 && !originalVocabFormat.value) {
    vocabText.value = model.value.vocab.join(', ');
    originalVocabFormat.value = vocabText.value;
  }
  
  // Inicializa textos das seções apenas quando necessário
  if (model.value.vocabSections && vocabSectionTexts.value.length !== model.value.vocabSections.length) {
    model.value.vocabSections.forEach((section, index) => {
      if (!vocabSectionTexts.value[index] && !originalSectionFormats.value[index]) {
        vocabSectionTexts.value[index] = section.words.join(', ');
        originalSectionFormats.value[index] = vocabSectionTexts.value[index];
      }
    });
  }
});

// 3. Atualizamos o modelo principal SÓ quando o usuário termina de editar.
const updateParentModel = () => {
  // Salva a formatação original digitada pelo usuário
  originalVocabFormat.value = vocabText.value;
  
  if (vocabText.value.trim()) {
    // Separa por pontos para criar grupos de palavras
    const wordGroups = vocabText.value.split('.').map(line => {
      return line.split(',')
        .map(word => word.trim())
        .filter(Boolean);
    }).filter(group => group.length > 0);
    
    // Salva os grupos para preservar a formatação
    model.value.vocabGroups = wordGroups;
    
    // Mantém compatibilidade: array único de todas as palavras
    model.value.vocab = wordGroups.flat();
  } else {
    model.value.vocabGroups = [];
    model.value.vocab = [];
  }
};

// Atualiza uma seção específica de vocabulário
const updateVocabSection = (index: number) => {
  if (model.value.vocabSections && model.value.vocabSections[index]) {
    // Salva a formatação original
    originalSectionFormats.value[index] = vocabSectionTexts.value[index];
    
    const text = vocabSectionTexts.value[index];
    
    if (text && text.trim()) {
      // Separa por pontos para criar grupos de palavras
      const wordGroups = text.split('.').map(line => {
        return line.split(',')
          .map(word => word.trim())
          .filter(Boolean);
      }).filter(group => group.length > 0);
      
      // Salva os grupos para preservar a formatação
      model.value.vocabSections[index].wordGroups = wordGroups;
      
      // Mantém compatibilidade: array único de todas as palavras
      model.value.vocabSections[index].words = wordGroups.flat();
    } else {
      model.value.vocabSections[index].wordGroups = [];
      model.value.vocabSections[index].words = [];
    }
  }
};

// Funções para gerenciar seções de vocabulário
const addVocabSection = () => {
  if (!model.value.vocabSections) {
    model.value.vocabSections = [];
  }
  model.value.vocabSections.push({ title: '', words: [] });
  vocabSectionTexts.value.push('');
};

const removeVocabSection = (index: number) => {
  if (model.value.vocabSections) {
    model.value.vocabSections.splice(index, 1);
    vocabSectionTexts.value.splice(index, 1);
  }
};

const addQuestion = () => model.value.questions.push(['', '']);
const removeQuestion = (index: number) => model.value.questions.splice(index, 1);

const addGrammarTable = () => model.value.grammar.push({ title: '', items: [['', '']] });
const removeGrammarTable = (index: number) => model.value.grammar.splice(index, 1);

const addGrammarItem = (tableIndex: number) => model.value.grammar[tableIndex].items.push(['', '']);
const removeGrammarItem = (tableIndex: number, itemIndex: number) => model.value.grammar[tableIndex].items.splice(itemIndex, 1);
</script>