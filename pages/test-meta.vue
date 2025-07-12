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
            <label class="block text-sm font-medium mb-2">URL da Imagem Open Graph:</label>
            <code class="block p-2 bg-gray-100 dark:bg-gray-700 rounded">{{ baseUrl }}/og-image.svg</code>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Teste em Tempo Real</h2>
        <div class="space-y-4">
          <button 
            @click="checkMetaTags"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Verificar Meta Tags no DOM
          </button>
          
          <div v-if="domMetaTags.length > 0" class="mt-4">
            <h3 class="font-semibold mb-2">Meta Tags Encontradas no DOM:</h3>
            <div class="space-y-1 text-sm font-mono max-h-60 overflow-y-auto">
              <div v-for="(tag, index) in domMetaTags" :key="index" class="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <strong>{{ tag.property || tag.name }}</strong>: {{ tag.content }}
              </div>
            </div>
          </div>            <div class="mt-4">
            <h3 class="font-semibold mb-2">Teste de URLs de Imagem:</h3>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <img 
                  :src="`${baseUrl}/og-image.svg`" 
                  alt="Test og-image.svg" 
                  class="w-32 h-16 object-cover rounded border"
                  @load="ogSvgLoaded = true"
                  @error="ogSvgError = true"
                />
                <div>
                  <div><strong>og-image.svg (1200x630)</strong></div>
                  <div v-if="ogSvgLoaded" class="text-green-600">✅ Carregada</div>
                  <div v-if="ogSvgError" class="text-red-600">❌ Erro</div>
                  <div v-if="!ogSvgLoaded && !ogSvgError" class="text-yellow-600">⏳ Carregando...</div>
                </div>
              </div>
              
              <div class="flex items-center gap-4">
                <img 
                  :src="`${baseUrl}/icon.png`" 
                  alt="Test icon.png" 
                  class="w-16 h-16 object-cover rounded border"
                  @load="iconLoaded = true"
                  @error="iconError = true"
                />
                <div>
                  <div><strong>icon.png</strong></div>
                  <div v-if="iconLoaded" class="text-green-600">✅ Carregada</div>
                  <div v-if="iconError" class="text-red-600">❌ Erro</div>
                  <div v-if="!iconLoaded && !iconError" class="text-yellow-600">⏳ Carregando...</div>
                </div>
              </div>
              
              <div class="flex items-center gap-4">
                <img 
                  :src="`${baseUrl}/favicon.ico`" 
                  alt="Test favicon.ico" 
                  class="w-16 h-16 object-cover rounded border"
                  @load="faviconLoaded = true"
                  @error="faviconError = true"
                />
                <div>
                  <div><strong>favicon.ico</strong></div>
                  <div v-if="faviconLoaded" class="text-green-600">✅ Carregada</div>
                  <div v-if="faviconError" class="text-red-600">❌ Erro</div>
                  <div v-if="!faviconLoaded && !faviconError" class="text-yellow-600">⏳ Carregando...</div>
                </div>
              </div>
            </div>
            
            <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p class="text-sm"><strong>Teste direto SVG:</strong></p>
              <p class="text-sm">Abra em nova aba: <a :href="`${baseUrl}/og-image.svg`" target="_blank" class="text-blue-600 underline">{{ baseUrl }}/og-image.svg</a></p>
            </div>
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

// Estados reativos
const domMetaTags = ref<Array<{property?: string, name?: string, content: string}>>([]);
const imageLoaded = ref(false);
const imageError = ref(false);
const ogSvgLoaded = ref(false);
const ogSvgError = ref(false);
const iconLoaded = ref(false);
const iconError = ref(false);
const faviconLoaded = ref(false);
const faviconError = ref(false);
const favicon16Loaded = ref(false);
const favicon16Error = ref(false);

// Função para verificar meta tags no DOM
const checkMetaTags = () => {
  if (process.client) {
    const metaElements = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]');
    domMetaTags.value = Array.from(metaElements).map(meta => ({
      property: meta.getAttribute('property') || undefined,
      name: meta.getAttribute('name') || undefined,
      content: meta.getAttribute('content') || ''
    }));
  }
};

// Define meta tags para esta página de teste
useSeoMeta({
  title: 'Teste de Meta Tags - EasyTalk',
  description: 'Página para testar e validar meta tags Open Graph e Twitter Cards do EasyTalk',
  ogTitle: 'Teste de Meta Tags - EasyTalk',
  ogDescription: 'Página para testar e validar meta tags Open Graph e Twitter Cards do EasyTalk',
  ogImage: `${baseUrl}/og-image.svg`,
  ogUrl: `${baseUrl}/test-meta`,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Teste de Meta Tags - EasyTalk',
  twitterDescription: 'Página para testar e validar meta tags Open Graph e Twitter Cards do EasyTalk',
  twitterImage: `${baseUrl}/og-image.svg`,
});

// Meta tags principais para exibir
const metaTags = [
  { property: 'og:title', content: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz' },
  { property: 'og:description', content: 'Método revolucionário para aprender inglês...' },
  { property: 'og:image', content: `${baseUrl}/og-image.svg` },
  { property: 'og:url', content: baseUrl },
  { property: 'og:type', content: 'website' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz' },
  { name: 'twitter:image', content: `${baseUrl}/og-image.svg` },
];
</script>
