# EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz

🚀 **Acesse em:** [www.easytalknow.com.br](https://www.easytalknow.com.br)

## 📖 Sobre o Projeto

EasyTalk é uma plataforma moderna para aprendizado de inglês, construída com Nuxt 3, oferecendo:

- 🎯 Lições estruturadas de inglês
- 📝 Vocabulário organizado por grupos
- ❓ Seção de perguntas e respostas
- 📊 Tabelas de gramática interativas
- 🌙 Modo escuro/claro
- 📱 Design responsivo
- ♿ Totalmente acessível (WCAG 2.1)

## 🛠️ Tecnologias

- **Nuxt 3** - Framework Vue.js com SSR
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Firebase Firestore** - Banco de dados
- **Firebase Auth** - Autenticação
- **Pinia** - Gerenciamento de estado

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 🚀 Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 🏗️ Produção

Construa a aplicação para produção:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Visualize a build de produção localmente:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 🔧 Configuração

1. Configure as variáveis de ambiente do Firebase no arquivo `.env`:

```env
NUXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NUXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NUXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

2. Configure o email do administrador em `middleware/auth-admin.ts`

## 📝 Recursos

- **Admin Panel**: `/admin` - Criar e gerenciar lições
- **Lições**: `/lessons/:id` - Visualizar lições específicas
- **Login**: `/login` - Autenticação com Google

## 🎨 Acessibilidade

- ✅ Suporte completo a leitores de tela
- ✅ Navegação por teclado
- ✅ Contraste adequado para baixa visão
- ✅ Estrutura semântica HTML5
- ✅ ARIA labels e roles
- ✅ Focus management

## 📱 Funcionalidades

### Para Estudantes
- Visualização de lições estruturadas
- Vocabulário com quebras de linha preservadas
- Perguntas e respostas interativas
- Tabelas de gramática organizadas
- Navegação entre lições

### Para Administradores
- Criação de novas lições
- Editor de vocabulário com preview
- Gerenciamento de perguntas
- Criação de tabelas de gramática
- Suporte a múltiplas seções de vocabulário

## 🚀 Deploy

A aplicação está hospedada em: [www.easytalknow.com.br](https://www.easytalknow.com.br)

---

📚 Para mais informações sobre Nuxt 3, consulte a [documentação oficial](https://nuxt.com/docs/getting-started/introduction).
