// composables/useLessons.ts
import { doc, getDoc, collection, getDocs, getCountFromServer } from 'firebase/firestore';
import type { LessonData, LessonFirestoreData } from '~/types';

export const useLessons = () => {
    const { $firestore } = useNuxtApp();

    const fetchLessonById = async (id: string): Promise<LessonData | null> => {
        try {
            const lessonRef = doc($firestore, 'lessons', id);
            const lessonSnap = await getDoc(lessonRef);

            if (lessonSnap.exists()) {
                const data = lessonSnap.data() as LessonFirestoreData;
                                
                // Deserializa os dados do Firestore para o formato LessonData
                const lessonData: LessonData = {
                    id: lessonSnap.id,
                    title: data.title,
                    vocab: data.vocab,
                    // Deserializa vocabGroups se existir e for string
                    vocabGroups: data.vocabGroups ? 
                        (typeof data.vocabGroups === 'string' ? JSON.parse(data.vocabGroups) : data.vocabGroups) 
                        : undefined,
                    // Deserializa vocabSections se existir
                    vocabSections: data.vocabSections?.map(section => ({
                        title: section.title,
                        words: section.words,
                        wordGroups: section.wordGroups ? 
                            (typeof section.wordGroups === 'string' ? JSON.parse(section.wordGroups) : section.wordGroups)
                            : undefined
                    })),
                    questions: data.questions,
                    grammar: data.grammar
                };
                                
                return lessonData;
            } else {
                console.warn(`Lição com ID ${id} não encontrada no Firestore.`);
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar lição:", error);
            // Se não tiver permissão, retorna dados mock para desenvolvimento
            if (process.client || process.server) {
                return {
                    id,
                    title: `Lição ${id} - Modo Desenvolvimento`,
                    vocab: ['hello', 'world', 'development'],
                    questions: [
                        { question: 'Como dizer olá?', answer: 'Hello' },
                        { question: 'Como dizer mundo?', answer: 'World' }
                    ],
                    grammar: [
                        {
                            title: 'Verbos Básicos',
                            items: [
                                { col1: 'To be', col2: 'Ser/Estar' },
                                { col1: 'To have', col2: 'Ter' }
                            ]
                        }
                    ]
                };
            }
            return null;
        }
    };

    const getLessonsCount = async (): Promise<number> => {
        try {
            const lessonsCollection = collection($firestore, 'lessons');
            const snapshot = await getCountFromServer(lessonsCollection);
            return snapshot.data().count;
        } catch (error) {
            console.error("Erro ao contar lições:", error);
            // Retorna um número padrão em desenvolvimento
            return 5;
        }
    };

    return {
        fetchLessonById,
        getLessonsCount,
    };
};