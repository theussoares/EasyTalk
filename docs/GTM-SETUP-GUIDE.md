# 📊 Guia Completo para Configurar Google Tag Manager (GTM) - EasyTalk

## 1. Criando a Conta GTM

### Passo 1: Acessar o Google Tag Manager
1. Acesse: https://tagmanager.google.com/
2. Faça login com sua conta Google
3. Clique em "Criar conta"

### Passo 2: Configurar a Conta
1. **Nome da conta**: `EasyTalk`
2. **País**: Brasil
3. **Nome do contêiner**: `www.easytalknow.com.br`
4. **Plataforma de destino**: Web
5. Clique em "Criar"

### Passo 3: Obter o ID do GTM
1. Após criar, você receberá um ID no formato: `GTM-XXXXXXX`
2. Copie esse ID
3. Cole no arquivo `.env.local` substituindo `GTM-XXXXXXX`

## 2. Configuração Básica do GTM

### Tags Essenciais para Configurar:

#### 2.1 Google Analytics 4 (GA4)
1. No GTM, vá em "Tags" > "Nova"
2. Nome: "GA4 - Config"
3. Tipo de tag: "Google Analytics: GA4 Configuration"
4. ID de medição: Seu ID do GA4 (G-XXXXXXXXXX)
5. Acionador: "All Pages"

#### 2.2 Facebook Pixel (se necessário)
1. No GTM, vá em "Tags" > "Nova"
2. Nome: "Facebook Pixel"
3. Tipo de tag: "HTML personalizada"
4. Cole o código do Facebook Pixel
5. Acionador: "All Pages"

## 3. Eventos Personalizados Já Configurados

### 3.1 Evento de Page View
- **Nome**: `page_view`
- **Quando dispara**: Automaticamente ao carregar a página index
- **Dados coletados**:
  - País, região (detectado automaticamente pelo GTM)
  - Idioma do navegador
  - Tipo de dispositivo (mobile/tablet/desktop)
  - Navegador e SO
  - Resolução da tela
  - UTM parameters
  - Referrer

### 3.2 Evento de Clique no WhatsApp
- **Nome**: `whatsapp_click`
- **Quando dispara**: Ao clicar em qualquer botão de WhatsApp
- **Dados coletados**:
  - Nome do botão clicado
  - Localização na página
  - Texto do botão
  - Número do WhatsApp
  - Tipo de mensagem
  - Todos os dados do usuário (como page_view)

## 4. Configurando Acionadores no GTM

### 4.1 Acionador para Page View
1. Vá em "Acionadores" > "Novo"
2. Nome: "Page View - Index"
3. Tipo: "Evento personalizado"
4. Nome do evento: `page_view`
5. Salvar

### 4.2 Acionador para WhatsApp Clicks
1. Vá em "Acionadores" > "Novo"
2. Nome: "WhatsApp Click"
3. Tipo: "Evento personalizado"
4. Nome do evento: `whatsapp_click`
5. Salvar

## 5. Configurando Tags de Conversão

### 5.1 Tag para Acompanhar Cliques no WhatsApp
1. Vá em "Tags" > "Nova"
2. Nome: "WhatsApp Click - GA4"
3. Tipo: "Google Analytics: GA4 Event"
4. ID de medição: Seu ID do GA4
5. Nome do evento: `whatsapp_contact`
6. Parâmetros:
   - `button_name`: `{{Event - button_name}}`
   - `button_location`: `{{Event - button_location}}`
   - `message_type`: `{{Event - message_type}}`
7. Acionador: "WhatsApp Click"

## 6. Variáveis para Capturar Dados

### 6.1 Criar Variáveis de Evento
1. Vá em "Variáveis" > "Definidas pelo usuário" > "Nova"
2. Nome: "Event - button_name"
3. Tipo: "Variável de camada de dados"
4. Nome da variável: `button_name`
5. Repetir para:
   - `button_location`
   - `button_text`
   - `message_type`
   - `user_info.country`
   - `user_info.device_type`
   - etc.

## 7. Teste e Depuração

### 7.1 Modo de Visualização
1. No GTM, clique em "Visualizar"
2. Digite: `https://www.easytalknow.com.br`
3. Navegue no site para testar os eventos

### 7.2 Verificar Events no Console
1. Abra o Developer Tools (F12)
2. Vá na aba "Console"
3. Os eventos aparecerão como logs quando em desenvolvimento

## 8. Publicar o Container

### Quando tudo estiver funcionando:
1. No GTM, clique em "Enviar"
2. Adicione um nome para a versão: "v1.0 - Setup inicial"
3. Adicione descrição: "Configuração inicial com page_view e whatsapp_click"
4. Clique em "Publicar"

## 9. Relatórios e Analytics

### 9.1 Google Analytics 4
- Vá em "Eventos" para ver os eventos customizados
- Configure funis de conversão baseados nos cliques do WhatsApp
- Crie audiências personalizadas

### 9.2 Métricas Importantes para Acompanhar
- **Taxa de clique WhatsApp**: `whatsapp_click / page_view`
- **Origem do tráfego**: UTM parameters
- **Dispositivos mais usados**: mobile vs desktop
- **Horários de maior engajamento**

## 10. Dados Coletados Automaticamente

### ✅ Informações coletadas SEM violar privacidade:
- País/região (IP geolocalização)
- Idioma do navegador
- Tipo de dispositivo
- Navegador e sistema operacional
- Resolução da tela
- Página de origem (referrer)
- Parâmetros UTM de campanhas
- Timezone do usuário

### ❌ Informações NÃO coletadas:
- Dados pessoais identificáveis
- Localização precisa (GPS)
- Informações de contato
- Histórico de navegação fora do site

## 🚀 Resultado Final

Com essa configuração, você terá:
- Tracking completo da página inicial
- Análise detalhada dos cliques no WhatsApp
- Dados geográficos e demográficos dos visitantes
- Base para campanhas de remarketing
- Métricas para otimização de conversão

## 📞 Próximos Passos

1. Criar a conta GTM seguindo este guia
2. Obter o ID e atualizar o `.env.local`
3. Fazer deploy da aplicação
4. Testar os eventos no modo de visualização
5. Publicar o container
6. Acompanhar os relatórios no GA4
