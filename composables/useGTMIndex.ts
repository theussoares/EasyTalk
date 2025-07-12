import type { IndexGTMEvents, UserInfo, IndexPageViewEvent, WhatsAppClickEvent } from '~/types/gtm-index'

export const useGTMIndex = () => {
  const { $gtm } = useNuxtApp()

  // Função para detectar informações do usuário automaticamente
  const getUserInfo = (): UserInfo => {
    if (!process.client) return {}

    const userAgent = navigator.userAgent
    const urlParams = new URLSearchParams(window.location.search)
    
    return {
      language: navigator.language || 'pt-BR',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      device_type: getDeviceType(),
      browser: getBrowser(userAgent),
      os: getOS(userAgent),
      screen_resolution: `${screen.width}x${screen.height}`,
      referrer: document.referrer || undefined,
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      utm_content: urlParams.get('utm_content') || undefined,
      utm_term: urlParams.get('utm_term') || undefined,
      // Nota: País, região e cidade serão detectados pelo próprio GTM
    }
  }

  // Detectar tipo de dispositivo
  const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    const width = screen.width
    if (width <= 768) return 'mobile'
    if (width <= 1024) return 'tablet'
    return 'desktop'
  }

  // Detectar navegador
  const getBrowser = (userAgent: string): string => {
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari')) return 'Safari'
    if (userAgent.includes('Edge')) return 'Edge'
    return 'Unknown'
  }

  // Detectar sistema operacional
  const getOS = (userAgent: string): string => {
    if (userAgent.includes('Windows')) return 'Windows'
    if (userAgent.includes('Mac')) return 'macOS'
    if (userAgent.includes('Linux')) return 'Linux'
    if (userAgent.includes('Android')) return 'Android'
    if (userAgent.includes('iOS')) return 'iOS'
    return 'Unknown'
  }

  // Enviar evento para GTM
  const trackEvent = (event: IndexGTMEvents) => {
    try {
      if (process.client && typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push(event)
        
        if (process.env.NODE_ENV === 'development') {
          console.log('GTM Event sent:', event)
        }
      }
    } catch (error) {
      console.error('Erro ao enviar evento GTM:', error)
    }
  }

  // Rastrear visualização da página index
  const trackPageView = () => {
    if (!process.client) return

    const event: IndexPageViewEvent = {
      event: 'page_view',
      page_title: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz',
      page_location: window.location.href,
      page_path: '/',
      timestamp: new Date().toISOString(),
      user_info: getUserInfo()
    }

    trackEvent(event)
  }

  // Rastrear clique no WhatsApp
  const trackWhatsAppClick = (
    buttonName: string,
    buttonLocation: string,
    buttonText: string,
    whatsappNumber: string,
    messageType: 'greeting' | 'info_request' | 'support' = 'greeting'
  ) => {
    const event: WhatsAppClickEvent = {
      event: 'whatsapp_click',
      button_name: buttonName,
      button_location: buttonLocation,
      button_text: buttonText,
      whatsapp_number: whatsappNumber,
      message_type: messageType,
      page_path: '/',
      timestamp: new Date().toISOString(),
      user_info: getUserInfo()
    }

    trackEvent(event)
  }

  return {
    trackPageView,
    trackWhatsAppClick,
    getUserInfo
  }
}
