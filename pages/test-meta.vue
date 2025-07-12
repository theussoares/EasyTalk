<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        🔍 Teste de Meta Tags Open Graph
      </h1>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">URLs para Testar</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">URL Principal:</label>
            <code class="block p-2 bg-gray-100 dark:bg-gray-700 rounded">{{ baseUrl }}</code>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">URL da Lição:</label>
            <code class="block p-2 bg-gray-100 dark:bg-gray-700 rounded">{{ baseUrl }}/lessons/1</code>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">URL da Imagem:</label>
            <code class="block p-2 bg-gray-100 dark:bg-gray-700 rounded">{{ baseUrl }}/icon.png</code>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Ferramentas de Teste</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <a 
            :href="`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(baseUrl)}`"
            target="_blank"
            class="block p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <h3 class="font-semibold text-blue-600">Facebook Debugger</h3>
            <p class="text-sm text-gray-600">Teste como o link aparece no Facebook</p>
          </a>
          
          <a 
            :href="`https://cards-dev.twitter.com/validator`"
            target="_blank"
            class="block p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <h3 class="font-semibold text-blue-600">Twitter Card Validator</h3>
            <p class="text-sm text-gray-600">Teste como o link aparece no Twitter</p>
          </a>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Meta Tags Atuais</h2>
        <div class="space-y-2 text-sm">
          <div v-for="(tag, index) in metaTags" :key="index" class="font-mono">
            <span class="text-blue-600">{{ tag.property || tag.name }}</span>: 
            <span class="text-gray-700 dark:text-gray-300">{{ tag.content }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const baseUrl = 'https://www.easytalknow.com.br';

// Define meta tags para esta página de teste
useSeoMeta({
  title: 'Teste de Meta Tags - EasyTalk',
  description: 'Página para testar e validar meta tags Open Graph e Twitter Cards do EasyTalk',
  ogTitle: 'Teste de Meta Tags - EasyTalk',
  ogDescription: 'Página para testar e validar meta tags Open Graph e Twitter Cards do EasyTalk',
  ogImage: `${baseUrl}/icon.png`,
  ogUrl: `${baseUrl}/test-meta`,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Teste de Meta Tags - EasyTalk',
  twitterDescription: 'Página para testar e validar meta tags Open Graph e Twitter Cards do EasyTalk',
  twitterImage: `${baseUrl}/icon.png`,
});

// Meta tags principais para exibir
const metaTags = [
  { property: 'og:title', content: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz' },
  { property: 'og:description', content: 'Método revolucionário para aprender inglês...' },
  { property: 'og:image', content: `${baseUrl}/icon.png` },
  { property: 'og:url', content: baseUrl },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz' },
  { name: 'twitter:image', content: `${baseUrl}/icon.png` },
];
</script>
