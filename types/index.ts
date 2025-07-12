// types/index.ts

export interface LessonVocab {
  word: string;
}

// Nova interface para seções de vocabulário com título
export interface VocabSection {
  title: string;
  words: string[];
  wordGroups?: string[][]; // Grupos de palavras separados por pontos
}

export interface LessonQuestion {
  question: string;
  answer: string;
}

export interface LessonGrammarItem {
  col1: string;
  col2: string;
}

export interface LessonGrammarTable {
  title: string;
  items: LessonGrammarItem[];
}

// Formato usado no formulário (arrays de tuplas)
export interface LessonFormData {
  title: string;
  vocab: string[]; // Mantém compatibilidade com formato antigo
  vocabGroups?: string[][]; // Grupos de palavras separados por pontos (para vocab geral)
  vocabSections?: VocabSection[]; // Nova propriedade para múltiplas seções
  questions: [string, string][];
  grammar: {
    title: string;
    items: [string, string][];
  }[];
}

// VocabSection para o Firestore (com wordGroups serializado)
export interface VocabSectionFirestore {
  title: string;
  words: string[];
  wordGroups?: string; // Serializado como JSON string para compatibilidade com Firestore
}

// Formato salvo no Firestore (objetos)
export interface LessonFirestoreData {
  title: string;
  vocab?: string[]; // Mantém compatibilidade
  vocabGroups?: string; // Serializado como JSON string (Firestore não suporta arrays aninhados)
  vocabSections?: VocabSectionFirestore[]; // Usa o tipo com wordGroups serializado
  questions: LessonQuestion[];
  grammar: LessonGrammarTable[];
}

// Formato unificado para exibição (suporta ambos os formatos)
export interface LessonData {
  id?: string;
  title: string;
  vocab?: string[]; // Formato antigo (compatibilidade)
  vocabGroups?: string[][]; // Grupos de palavras separados por pontos (para vocab geral)
  vocabSections?: VocabSection[]; // Novo formato com múltiplas seções
  questions?: [string, string][] | LessonQuestion[];
  grammar?: {
    title: string;
    items?: [string, string][] | LessonGrammarItem[];
  }[];
}

// Para uso em listas/navegação
export interface LessonMeta {
  id: string;
  title: string;
}

// Estado de autenticação
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Respostas de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Props dos componentes
export interface LessonViewProps {
  lesson: LessonData;
}

export interface VocabSectionProps {
  vocab?: string[]; // Formato antigo (compatibilidade)
  vocabSections?: VocabSection[]; // Novo formato
}

export interface QuestionSectionProps {
  questions: LessonQuestion[];
}

export interface GrammarSectionProps {
  grammarTables: {
    title: string;
    items: [string, string][];
  }[];
}
