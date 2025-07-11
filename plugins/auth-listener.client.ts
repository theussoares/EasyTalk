// plugins/auth-listener.client.ts
export default defineNuxtPlugin(async () => {
  // Só executa no cliente
  if (process.client) {
    // Aguarda um pouco para garantir que o Firebase foi inicializado
    setTimeout(async () => {
      try {
        const { useAuth } = await import('~/composables/useAuth');
        const { initAuthListener } = useAuth();
        initAuthListener();
      } catch (error) {
        console.error('Erro ao inicializar auth listener:', error);
      }
    }, 100);
  }
});
