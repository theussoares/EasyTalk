<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Acessar Painel (Modo Teste)
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Faça login simulado para testar o sistema.
        </p>
      </div>

      <div v-if="showLoading" class="flex justify-center">
        <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div v-else-if="error" class="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900/50 dark:text-red-300 dark:border-red-700">
        {{ error }}
      </div>

      <div v-else>
        <button 
          @click="handleLogin" 
          class="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-300"
        >
          Entrar com Google (Simulado)
        </button>
        
        <div class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Modo de teste - sem Firebase real
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthSimple } from '~/composables/useAuthSimple';

// Importa nossa lógica de autenticação simulada
const { user, isLoading, error, signInWithGoogle } = useAuthSimple();

const handleLogin = async () => {
  try {
    await signInWithGoogle();
  } catch (error) {
    console.error('Falha no login simulado:', error);
  }
};

// Observa o estado do usuário. Se mudar (login/logout), executa o código.
watch(user, (currentUser) => {
  console.log('User state changed:', currentUser?.email || 'null');
  
  if (currentUser && currentUser.email == 'matheusdev.play55@gmail.com') {
    console.log('Redirecting to admin...');
    // Se o usuário estiver logado, redireciona para o admin
    navigateTo('/admin');
  }
  else if (currentUser && currentUser.email !== 'matheusdev.play55@gmail.com') {
    console.log('Redirecting to lessons...');
    // Se o usuário estiver logado, mas não for o autorizado, redireciona para a página de lessons
    navigateTo('/lessons/1');
  }
}, { immediate: true });

// Computed para mostrar loading
const showLoading = computed(() => isLoading.value);
</script>
