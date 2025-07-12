// Eventos específicos para a página index do EasyTalk

export interface GTMEvent {
  event: string;
  [key: string]: any;
}

// Informações geográficas e de dispositivo (obtidas automaticamente)
export interface UserInfo {
  country?: string;
  region?: string;
  city?: string;
  language?: string;
  timezone?: string;
  device_type?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  os?: string;
  screen_resolution?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

// Evento de visualização da página index
export interface IndexPageViewEvent extends GTMEvent {
  event: 'page_view';
  page_title: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz';
  page_location: string; // URL completa
  page_path: '/';
  timestamp: string;
  user_info: UserInfo;
}

// Evento de clique no WhatsApp
export interface WhatsAppClickEvent extends GTMEvent {
  event: 'whatsapp_click';
  button_name: string; // Nome específico do botão
  button_location: string; // Localização na página (header, hero, footer, etc.)
  button_text: string; // Texto do botão
  whatsapp_number: string; // Número do WhatsApp
  message_type: 'greeting' | 'info_request' | 'support'; // Tipo da mensagem
  page_path: '/';
  timestamp: string;
  user_info: UserInfo;
}

// Union type para eventos da página index
export type IndexGTMEvents = 
  | IndexPageViewEvent
  | WhatsAppClickEvent;
