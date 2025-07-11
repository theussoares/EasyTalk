// composables/useAuthSimple.ts
export const useAuthSimple = () => {
    // Estados simulados
    const user = useState<any>('auth.user', () => null);
    const isLoading = useState<boolean>('auth.loading', () => false);
    const error = useState<string | null>('auth.error', () => null);

    // Simula login com Google
    const signInWithGoogle = async (): Promise<void> => {
        if (!process.client) return;
        
        isLoading.value = true;
        error.value = null;

        try {
            // Simula delay de login
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simula usuário logado
            user.value = {
                uid: 'simulated-uid-123',
                email: 'matheusdev.play55@gmail.com',
                displayName: 'Matheus Soares',
                photoURL: 'https://via.placeholder.com/100',
                emailVerified: true,
                metadata: {
                    creationTime: new Date().toISOString(),
                    lastSignInTime: new Date().toISOString()
                }
            };
            
            console.log('Login simulado bem-sucedido:', user.value.email);
        } catch (err) {
            console.error("Erro no login simulado:", err);
            error.value = 'Erro no login simulado';
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    // Simula logout
    const signOutUser = async (): Promise<void> => {
        if (!process.client) return;

        try {
            user.value = null;
            error.value = null;
            console.log('Logout simulado realizado');
        } catch (err) {
            console.error("Erro no logout simulado:", err);
            error.value = 'Erro no logout simulado';
            throw err;
        }
    };

    // Funções vazias para compatibilidade
    const initAuthListener = (): void => {
        console.log('Auth listener simulado inicializado');
    };

    const handleRedirectResult = async (): Promise<void> => {
        console.log('Handle redirect simulado - nada para processar');
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
