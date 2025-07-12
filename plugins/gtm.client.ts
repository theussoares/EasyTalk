import { createGtm } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  // Só inicializar GTM se o ID estiver configurado
  if (config.public.gtmId) {
    const gtm = createGtm({
      id: config.public.gtmId,
      defer: false,
      compatibility: false,
      enabled: true,
      debug: process.env.NODE_ENV === 'development',
      loadScript: true,
      vueRouter: useRouter(),
      trackOnNextTick: false
    })
    
    nuxtApp.vueApp.use(gtm)
  }
})
