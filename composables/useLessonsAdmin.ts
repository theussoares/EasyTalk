// composables/useLessonsAdmin.ts
import { doc, setDoc } from 'firebase/firestore';
import type { LessonFormData, LessonFirestoreData, VocabSectionFirestore, ApiResponse } from '~/types';

export const useLessonsAdmin = () => {
    const { $firestore } = useNuxtApp();
    const { getLessonsCount } = useLessons();

    const saveNewLesson = async (lessonData: LessonFormData): Promise<ApiResponse<string>> => {
        try {
            const currentCount = await getLessonsCount();
            const newLessonId = String(currentCount + 1);

            // Converte os dados para um formato compatível com o Firestore
            const firestoreData: LessonFirestoreData = {
                title: lessonData.title,
                vocab: lessonData.vocab,
                // Converte grupos de palavras para strings serializadas (Firestore não suporta arrays aninhados)
                vocabGroups: lessonData.vocabGroups ? JSON.stringify(lessonData.vocabGroups) : undefined,
                // Converte seções de vocabulário, serializando os wordGroups
                vocabSections: lessonData.vocabSections?.map((section): VocabSectionFirestore => ({
                    title: section.title,
                    words: section.words,
                    wordGroups: section.wordGroups ? JSON.stringify(section.wordGroups) : undefined
                })),
                // Converte questions de [string, string][] para { question: string, answer: string }[]
                questions: lessonData.questions.map(([question, answer]) => ({
                    question,
                    answer
                })),
                // Converte grammar items de [string, string][] para { col1: string, col2: string }[]
                grammar: lessonData.grammar.map((table) => ({
                    title: table.title,
                    items: table.items.map(([col1, col2]) => ({
                        col1,
                        col2
                    }))
                }))
            };

            // Cria uma referência para um novo documento com o ID calculado
            const lessonRef = doc($firestore, 'lessons', newLessonId);

            // Usa setDoc para salvar os dados no documento
            await setDoc(lessonRef, firestoreData);

            return { success: true, data: newLessonId };

        } catch (error) {
            console.error("Erro ao salvar nova lição:", error);
            return { 
                success: false, 
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            };
        }
    };

    return {
        saveNewLesson,
    };
};