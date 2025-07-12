// composables/useAuth.ts
import type { User } from 'firebase/auth';
import type { AuthUser } from '~/types';

export const useAuth = () => {
    // O estado do usuário é seguro para rodar no servidor (SSR-safe)
    const user = useState<User | null>('user', () => null);
    const isLoading = useState<boolean>('auth.loading', () => false);
    const error = useState<string | null>('auth.error', () => null);
    const isListenerInitialized = useState<boolean>('auth.listenerInit', () => false);

    // Esta função só será chamada por um clique do usuário (no cliente)
    const signInWithGoogle = async (): Promise<void> => {
        if (!process.client) return;
        
        isLoading.value = true;
        error.value = null;

        try {
            // Aguarda o plugin do Firebase estar disponível
            const nuxtApp = useNuxtApp();
            if (!nuxtApp.$auth) {
                throw new Error('Firebase não inicializado');
            }

            const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
            const provider = new GoogleAuthProvider();
            
            // Usa popup para login imediato
            const result = await signInWithPopup(nuxtApp.$auth as any, provider);
            
            if (result && result.user) {                
                // Atualiza o state do usuário imediatamente
                user.value = {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL,
                    emailVerified: result.user.emailVerified,
                    metadata: {
                        creationTime: result.user.metadata.creationTime,
                        lastSignInTime: result.user.metadata.lastSignInTime
                    }
                } as User;
            }
        } catch (err) {
            console.error("Erro no login:", err);
            error.value = err instanceof Error ? err.message : 'Erro desconhecido no login';
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    // Função mantida para compatibilidade, mas não faz nada com popup
    const handleRedirectResult = async (): Promise<void> => {
        console.log('HandleRedirectResult: Não necessário com popup auth');
    };

    // Esta função também só será chamada por um clique (no cliente)
    const signOutUser = async (): Promise<void> => {
        if (!process.client) return;

        try {
            const nuxtApp = useNuxtApp();
            if (!nuxtApp.$auth) {
                throw new Error('Firebase não inicializado');
            }

            const { signOut } = await import('firebase/auth');
            await signOut(nuxtApp.$auth as any);
            user.value = null;
            error.value = null;
        } catch (err) {
            console.error("Erro no logout:", err);
            error.value = err instanceof Error ? err.message : 'Erro no logout';
            throw err;
        }
    };

    const initAuthListener = (): void => {
        if (!process.client || isListenerInitialized.value) return;

        const nuxtApp = useNuxtApp();
        
        // Carregamos a função `onAuthStateChanged` dinamicamente
        import('firebase/auth').then(({ onAuthStateChanged }) => {
            if (nuxtApp.$auth) {
                isListenerInitialized.value = true;
                
                onAuthStateChanged(nuxtApp.$auth as any, (firebaseUser) => {                    
                    // Cria uma cópia segura do user para evitar problemas de reatividade cross-origin
                    if (firebaseUser) {
                        user.value = {
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName,
                            photoURL: firebaseUser.photoURL,
                            emailVerified: firebaseUser.emailVerified,
                            metadata: {
                                creationTime: firebaseUser.metadata.creationTime,
                                lastSignInTime: firebaseUser.metadata.lastSignInTime
                            }
                        } as User;
                    } else {
                        user.value = null;
                    }
                    isLoading.value = false;
                });
            }
        }).catch((err) => {
            console.error("Erro ao inicializar auth listener:", err);
            isLoading.value = false;
        });
    };

    return {
        user: readonly(user),
        isLoading: readonly(isLoading),
        error: readonly(error),
        signInWithGoogle,
        signOutUser,
        initAuthListener,
        handleRedirectResult,
    };
};
