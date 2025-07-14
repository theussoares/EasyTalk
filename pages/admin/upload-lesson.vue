<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        📤 Upload/Edição de Lição Individual
      </h1>

      <!-- Load Existing Lesson Section -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">🔄 Carregar Lição Existente</h2>
        <div class="flex gap-4 items-end">
          <div class="flex-1">
            <label class="block text-sm font-medium mb-2">Selecionar Lição:</label>
            <select 
              v-model="selectedLessonId"
              @change="loadExistingLesson"
              class="w-full p-3 border dark:text-gray-950 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Selecione uma lição para editar --</option>
              <option v-for="lesson in availableLessons" :key="lesson.id" :value="lesson.id">
                Lição {{ lesson.id }} - {{ lesson.title }}
              </option>
            </select>
          </div>
          <button 
            @click="refreshLessonsList"
            :disabled="isLoadingLessons"
            class="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {{ isLoadingLessons ? '🔄' : '🔄 Atualizar Lista' }}
          </button>
          <button 
            @click="createNewLesson"
            class="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
          >
            ➕ Nova Lição
          </button>
        </div>
        
        <div v-if="loadingMessage" class="mt-4 text-blue-600">
          {{ loadingMessage }}
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Input Area -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Cole o JSON da Lição</h2>
          
          <textarea
            v-model="rawJsonInput"
            placeholder="Cole aqui o JSON da lição..."
            class="w-full h-96 dark:text-gray-950 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          
          <div class="flex gap-4 mt-4">
            <button 
              @click="processAndPreview" 
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              🔄 Processar JSON
            </button>
            
            <button 
              @click="clearInput" 
              class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              🗑️ Limpar
            </button>
          </div>
        </div>

        <!-- Preview Area -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-semibold mb-4">Preview da Lição Corrigida</h2>
          
          <div v-if="processedLesson" class="space-y-4">
            <div class="border-b pb-2">
              <strong>ID:</strong> {{ processedLesson.id }}
            </div>
            <div class="border-b pb-2">
              <strong>Título:</strong> {{ processedLesson.title }}
            </div>
            <div class="border-b pb-2">
              <strong>Vocabulário:</strong> {{ processedLesson.vocab?.length || 0 }} palavras
            </div>
            <div class="border-b pb-2">
              <strong>Perguntas:</strong> {{ processedLesson.questions?.length || 0 }} itens
            </div>
            <div class="border-b pb-2">
              <strong>Gramática:</strong> {{ processedLesson.grammar?.length || 0 }} seções
            </div>
            
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 class="font-semibold mb-2">JSON Corrigido:</h3>
              <pre class="text-xs overflow-auto max-h-32">{{ JSON.stringify(processedLesson, null, 2) }}</pre>
            </div>
          </div>
          
          <div v-else-if="errorMessage" class="text-red-600">
            <strong>❌ Erro:</strong> {{ errorMessage }}
          </div>
          
          <div v-else class="text-gray-500">
            Cole o JSON e clique em "Processar JSON" para ver o preview
          </div>
        </div>
      </div>

      <!-- Lesson Preview Section -->
      <div v-if="processedLesson" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold">👁️ Pré-visualização da Lição</h2>
          <button 
            @click="toggleLessonPreview"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {{ showLessonPreview ? '🙈 Ocultar' : '👀 Mostrar Preview' }}
          </button>
        </div>
        
        <div v-if="showLessonPreview" class="border-2 border-gray-200 rounded-lg p-4">
          <LessonsLessonView :lesson="lessonForPreview" />
        </div>
      </div>

      <!-- Upload Section -->
      <div v-if="processedLesson" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
        <h2 class="text-xl font-semibold mb-4">Enviar para Firebase</h2>
        
        <div class="mb-4">
          <div v-for="log in uploadLogs" :key="log.id" class="flex items-center gap-2 mb-2">
            <span v-if="log.status === 'success'" class="text-green-600">✅</span>
            <span v-else-if="log.status === 'error'" class="text-red-600">❌</span>
            <span v-else class="text-yellow-600">⏳</span>
            <span class="text-sm">{{ log.message }}</span>
          </div>
        </div>
        
        <div class="flex gap-4">
          <button 
            @click="uploadToFirebase" 
            :disabled="isUploading || !processedLesson"
            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isUploading ? (isEditMode ? '📝 Atualizando...' : '📤 Enviando...') : (isEditMode ? '� Atualizar Lição' : '�🚀 Enviar para Firebase') }}
          </button>
          
          <button 
            @click="clearLogs" 
            class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            Limpar Logs
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { collection, addDoc, setDoc, doc, getFirestore, getDocs, getDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { ref, computed, onMounted } from 'vue'

// Inicializar Firebase diretamente se necessário
const config = useRuntimeConfig()
console.log('🔧 Configurando Firebase...')

const firebaseConfig = {
  apiKey: config.public.firebaseApiKey as string,
  authDomain: config.public.firebaseAuthDomain as string,
  projectId: config.public.firebaseProjectId as string,
  storageBucket: config.public.firebaseStorageBucket as string,
  messagingSenderId: config.public.firebaseMessagingSenderId as string,
  appId: config.public.firebaseAppId as string,
}

console.log('🔥 Inicializando Firebase com projeto:', firebaseConfig.projectId)

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

console.log('✅ Firebase inicializado com sucesso')

interface UploadLog {
  id: number
  message: string
  status: 'pending' | 'success' | 'error'
}

interface LessonData {
  id: string
  title: string
  vocab?: string[]
  vocabGroups?: string
  vocabSections?: any[]
  questions?: any[]
  grammar?: any[]
  [key: string]: any
}

interface LessonListItem {
  id: string
  title: string
}

// Existing states
const rawJsonInput = ref('')
const processedLesson = ref<LessonData | null>(null)
const errorMessage = ref('')
const uploadLogs = ref<UploadLog[]>([])
const isUploading = ref(false)
const showLessonPreview = ref(false)
let logId = 0

// New states for lesson loading/editing
const selectedLessonId = ref('')
const availableLessons = ref<LessonListItem[]>([])
const isLoadingLessons = ref(false)
const loadingMessage = ref('')
const isEditMode = ref(false)

const addLog = (message: string, status: 'pending' | 'success' | 'error' = 'pending') => {
  uploadLogs.value.push({
    id: ++logId,
    message,
    status
  })
}

const updateLastLog = (status: 'success' | 'error') => {
  if (uploadLogs.value.length > 0) {
    uploadLogs.value[uploadLogs.value.length - 1].status = status
  }
}

const clearInput = () => {
  rawJsonInput.value = ''
  processedLesson.value = null
  errorMessage.value = ''
  showLessonPreview.value = false
  selectedLessonId.value = ''
  isEditMode.value = false
}

const clearLogs = () => {
  uploadLogs.value = []
  logId = 0
}

// New functions for lesson management
const refreshLessonsList = async () => {
  isLoadingLessons.value = true
  loadingMessage.value = 'Carregando lista de lições...'
  
  try {
    console.log('🔍 Iniciando carregamento de lições...')
    const lessonsRef = collection(db, 'lessons')
    const snapshot = await getDocs(lessonsRef)
    
    console.log('📊 Snapshot recebido:', snapshot.size, 'documentos')
    
    availableLessons.value = []
    snapshot.forEach((doc) => {
      const data = doc.data()
      console.log('📄 Documento encontrado:', doc.id, data.title)
      availableLessons.value.push({
        id: doc.id,
        title: data.title || `Lição ${doc.id}`
      })
    })
    
    console.log('📋 Lições carregadas:', availableLessons.value.length)
    
    // Ordenar por ID numérico
    availableLessons.value.sort((a, b) => parseInt(a.id) - parseInt(b.id))
    
    loadingMessage.value = `${availableLessons.value.length} lições carregadas`
    
    setTimeout(() => {
      loadingMessage.value = ''
    }, 2000)
    
  } catch (error: any) {
    console.error('❌ Erro ao carregar lições:', error)
    loadingMessage.value = `Erro ao carregar lições: ${error.message}`
  } finally {
    isLoadingLessons.value = false
  }
}

const loadExistingLesson = async () => {
  if (!selectedLessonId.value) return
  
  loadingMessage.value = `Carregando lição ${selectedLessonId.value}...`
  
  try {
    const docRef = doc(db, 'lessons', selectedLessonId.value)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const lessonData = docSnap.data() as LessonData
      
      // Carregar os dados no formato JSON para edição
      rawJsonInput.value = JSON.stringify(lessonData, null, 2)
      
      // Processar automaticamente para mostrar o preview
      processAndPreview()
      
      isEditMode.value = true
      loadingMessage.value = `Lição ${selectedLessonId.value} carregada para edição`
      
      setTimeout(() => {
        loadingMessage.value = ''
      }, 2000)
      
    } else {
      loadingMessage.value = `Lição ${selectedLessonId.value} não encontrada`
      setTimeout(() => {
        loadingMessage.value = ''
      }, 3000)
    }
    
  } catch (error: any) {
    console.error('Erro ao carregar lição:', error)
    loadingMessage.value = `Erro ao carregar lição: ${error.message}`
  }
}

const createNewLesson = () => {
  clearInput()
  loadingMessage.value = 'Modo de criação de nova lição ativado'
  setTimeout(() => {
    loadingMessage.value = ''
  }, 2000)
}

const toggleLessonPreview = () => {
  showLessonPreview.value = !showLessonPreview.value
  
  // Se estiver mostrando o preview, fazer scroll suave até a seção
  if (showLessonPreview.value) {
    nextTick(() => {
      const previewSection = document.querySelector('.border-2.border-gray-200')
      if (previewSection) {
        previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }
}

// Converter formato Firestore para formato esperado pelo componente
const convertToLessonData = (firestoreLesson: any) => {
  const converted = { ...firestoreLesson }
  
  // Converter vocabGroups de string para array
  if (converted.vocabGroups && typeof converted.vocabGroups === 'string') {
    try {
      converted.vocabGroups = JSON.parse(converted.vocabGroups)
    } catch (error) {
      console.error('Erro ao parsear vocabGroups:', error)
      converted.vocabGroups = undefined
    }
  }
  
  // Converter wordGroups nas vocabSections
  if (converted.vocabSections && Array.isArray(converted.vocabSections)) {
    converted.vocabSections = converted.vocabSections.map((section: any) => ({
      ...section,
      wordGroups: section.wordGroups && typeof section.wordGroups === 'string' 
        ? (() => {
            try {
              return JSON.parse(section.wordGroups)
            } catch (error) {
              console.error('Erro ao parsear wordGroups:', error)
              return undefined
            }
          })()
        : section.wordGroups
    }))
  }
  
  return converted
}

// Computed para converter a lição processada para o formato do componente
const lessonForPreview = computed(() => {
  if (!processedLesson.value) return null
  return convertToLessonData(processedLesson.value)
})

const processAndPreview = () => {
  try {
    errorMessage.value = ''
    
    if (!rawJsonInput.value.trim()) {
      errorMessage.value = 'Por favor, cole o JSON da lição'
      return
    }

    // Parse do JSON
    const parsedLesson = JSON.parse(rawJsonInput.value)
    
    // Validar estrutura básica
    if (!parsedLesson.id || !parsedLesson.title) {
      errorMessage.value = 'JSON inválido: faltam campos obrigatórios (id, title)'
      return
    }

    // Processar e corrigir a lição
    const correctedLesson = correctLessonStructure(parsedLesson)
    processedLesson.value = correctedLesson
    
  } catch (error: any) {
    errorMessage.value = `Erro ao processar JSON: ${error.message}`
    processedLesson.value = null
  }
}

const correctLessonStructure = (lesson: any) => {
  const corrected = { ...lesson }

  // Garantir que vocab existe e é array
  if (!corrected.vocab || !Array.isArray(corrected.vocab)) {
    corrected.vocab = []
  }

  // Corrigir vocabGroups - serializar arrays aninhados
  if (corrected.vocabGroups && Array.isArray(corrected.vocabGroups)) {
    corrected.vocabGroups = JSON.stringify(corrected.vocabGroups)
  } else if (!corrected.vocabGroups) {
    // Criar grupos padrão baseados no vocab
    const groups = []
    for (let i = 0; i < corrected.vocab.length; i += 3) {
      groups.push(corrected.vocab.slice(i, i + 3))
    }
    corrected.vocabGroups = JSON.stringify(groups)
  }

  // Corrigir vocabSections
  if (!corrected.vocabSections || !Array.isArray(corrected.vocabSections)) {
    corrected.vocabSections = []
  }

  // Corrigir wordGroups em cada vocabSection
  corrected.vocabSections.forEach((section: any) => {
    if (!section.words || !Array.isArray(section.words)) {
      section.words = []
    }
    
    if (section.wordGroups && Array.isArray(section.wordGroups)) {
      section.wordGroups = JSON.stringify(section.wordGroups)
    } else if (!section.wordGroups) {
      // Criar grupos padrão baseados nas words
      const groups = []
      for (let i = 0; i < section.words.length; i += 2) {
        groups.push(section.words.slice(i, i + 2))
      }
      section.wordGroups = JSON.stringify(groups)
    }
  })

  // Garantir que questions existe e é array
  if (!corrected.questions || !Array.isArray(corrected.questions)) {
    corrected.questions = []
  }

  // Garantir que grammar existe e é array
  if (!corrected.grammar || !Array.isArray(corrected.grammar)) {
    corrected.grammar = []
  }

  // Garantir que cada item de grammar tem a estrutura correta
  corrected.grammar.forEach((grammarItem: any) => {
    if (!grammarItem.items || !Array.isArray(grammarItem.items)) {
      grammarItem.items = []
    }
  })

  return corrected
}

const uploadToFirebase = async () => {
  if (!processedLesson.value || isUploading.value) return
  
  isUploading.value = true
  const actionText = isEditMode.value ? 'Atualizando' : 'Enviando'
  addLog(`📤 ${actionText} Lição ${processedLesson.value.id}: ${processedLesson.value.title}`)
  
  try {
    // Verificar se o Firestore está disponível
    if (!db) {
      throw new Error('Firebase Firestore não está configurado. Verifique a configuração do Firebase.')
    }
    
    // Usar o ID da lição como document ID no Firestore
    const lessonId = processedLesson.value.id
    const docRef = doc(db, 'lessons', lessonId)
    await setDoc(docRef, processedLesson.value)
    
    updateLastLog('success')
    const successText = isEditMode.value ? 'atualizada' : 'enviada'
    addLog(`✅ Lição ${processedLesson.value.id} ${successText} com sucesso! Document ID: ${lessonId}`, 'success')
    
    // Se for edição, atualizar a lista de lições
    if (isEditMode.value) {
      const lessonIndex = availableLessons.value.findIndex(l => l.id === lessonId)
      if (lessonIndex !== -1) {
        availableLessons.value[lessonIndex].title = processedLesson.value.title
      }
    }
    
    // Limpar após sucesso apenas se for nova lição
    if (!isEditMode.value) {
      setTimeout(() => {
        clearInput()
      }, 2000)
    }
    
  } catch (error: any) {
    updateLastLog('error')
    const errorMessage = error.message || error.toString()
    const actionText = isEditMode.value ? 'atualizar' : 'enviar'
    addLog(`❌ Erro ao ${actionText} Lição ${processedLesson.value.id}: ${errorMessage}`, 'error')
    console.error('Erro detalhado ao enviar:', error)
  } finally {
    isUploading.value = false
  }
}

// Load lessons when page mounts
onMounted(async () => {
  console.log('🚀 Página montada, aguardando inicialização...')
  
  // Aguardar um pouco para garantir que o Firebase está inicializado
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  console.log('🔥 Iniciando carregamento das lições...')
  await refreshLessonsList()
})

// Meta tags
useHead({
  title: 'Upload Lição Individual - EasyTalk Admin',
  meta: [
    { name: 'description', content: 'Página para upload individual de lições para o Firebase' }
  ]
})
</script>
