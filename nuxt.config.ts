// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxtjs/tailwindcss', // Módulo do Tailwind CSS
    '@pinia/nuxt',        // Módulo do Pinia
  ],

  components: [
    {
      path: "~/components",
    }
  ],

  css: [
    '~/assets/css/tailwind.css',
  ],

  runtimeConfig: {
    // Estas chaves estão disponíveis apenas no lado do servidor
    // Ex: para usar o Firebase Admin SDK
    
    // As chaves em 'public' são expostas para o lado do cliente
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      gtmId: process.env.NUXT_PUBLIC_GTM_ID,
      env: process.env.NUXT_PUBLIC_ENV || 'development',
    },
  },

  app: {
    head: {
      title: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'description', content: 'Método revolucionário para aprender inglês rapidamente. Aulas individuais e em grupo com preços acessíveis. Suporte personalizado via WhatsApp.' },
        { name: 'keywords', content: 'curso de inglês, aprender inglês, aulas de inglês, inglês online, conversação em inglês, gramática inglesa' },
        { name: 'theme-color', content: '#4f46e5' }, // Indigo-600
        { name: 'author', content: 'EasyTalk' },

        // --- Tags Open Graph (para WhatsApp, Facebook, etc.) ---
        { property: 'og:title', content: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz' },
        { property: 'og:description', content: 'Método revolucionário para aprender inglês. Aulas individuais a partir de R$ 40 e em grupo a partir de R$ 10 por pessoa. Resultados rápidos garantidos!' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'EasyTalk' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:url', content: 'https://www.easytalknow.com.br' },
        { property: 'og:image', content: 'https://www.easytalknow.com.br/og-image.svg' },
        { property: 'og:image:secure_url', content: 'https://www.easytalknow.com.br/og-image.svg' },
        { property: 'og:image:url', content: 'https://www.easytalknow.com.br/og-image.svg' },
        { property: 'og:image:alt', content: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/svg+xml' },

        // --- Meta tags básicas (fallback) ---
        { name: 'image', content: 'https://www.easytalknow.com.br/og-image.svg' },
        { name: 'thumbnail', content: 'https://www.easytalknow.com.br/og-image.svg' },

        // --- Tags Twitter Card ---
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@EasyTalkBrasil' },
        { name: 'twitter:creator', content: '@EasyTalkBrasil' },
        { name: 'twitter:title', content: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz' },
        { name: 'twitter:description', content: 'Método revolucionário para aprender inglês. Aulas individuais e em grupo com preços acessíveis.' },
        { name: 'twitter:image', content: 'https://www.easytalknow.com.br/og-image.svg' },
        { name: 'twitter:image:alt', content: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz' },

        // --- SEO adicional ---
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'msapplication-TileColor', content: '#4f46e5' },
      ],
      link: [
        // Favicons para melhor compatibilidade
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon.png' },
        { rel: 'canonical', href: 'https://www.easytalknow.com.br' },
      ]
    }
  }
})
