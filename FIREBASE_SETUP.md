# Configuração das Regras de Segurança do Firebase

## Para resolver o erro de permissões, siga estes passos:

### 1. Acesse o Firebase Console
- Vá para: https://console.firebase.google.com/
- Selecione seu projeto EasyTalk

### 2. Configure as Regras do Firestore
- No menu lateral, clique em **Firestore Database**
- Clique na aba **Rules**
- Substitua as regras existentes pelo conteúdo do arquivo `firestore.rules`

### 3. Publique as Regras
- Clique em **Publish** para ativar as novas regras

### 4. Teste a Autenticação
- Faça logout se estiver logado
- Faça login novamente com o email: `matheusdev.pla55@gmail.com`
- Tente salvar uma lição

## O que as regras fazem:

1. **Leitura das lições**: Qualquer usuário autenticado pode ler as lições
2. **Escrita das lições**: Apenas o email `matheusdev.pla55@gmail.com` pode criar/editar lições
3. **Proteção geral**: Outros documentos são protegidos contra acesso não autorizado

## Segurança da Página Admin:

- Middleware `admin.ts` protege a rota `/admin`
- Usuários não logados são redirecionados para `/login`
- Usuários logados com email diferente são redirecionados para `/lessons/1`
- Apenas `matheusdev.pla55@gmail.com` pode acessar a página de admin

## Debug:

A página admin agora mostra:
- Email do usuário logado
- Botão de logout para testes
- Informações de debug para verificar a autenticação
