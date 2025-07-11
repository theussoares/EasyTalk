<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mx-auto mb-4"></div>
      <p class="text-gray-600 dark:text-gray-400">Redirecionando para a primeira lição...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Redireciona automaticamente para a primeira lição
await navigateTo('/lessons/1');
</script>
