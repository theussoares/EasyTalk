# Firebase Authentication - Troubleshooting Guide

## Problema: Ciclo de Login Infinito

### 🔍 Diagnóstico do Problema
Os logs mostram:
- `User state changed: null` (SSR)
- `Auth state changed: logged out`
- `Nenhum redirect result encontrado`

Isso indica que o Firebase não está configurado corretamente ou as credenciais estão inválidas.

### ✅ Soluções

#### 1. **Teste com Autenticação Simulada**
Acesse: `http://localhost:3001/login-test`
- Se funcionar: O problema é a configuração do Firebase
- Se não funcionar: O problema é no código

#### 2. **Configurar Firebase Corretamente**

1. **Crie um projeto no Firebase Console:**
   - Acesse: https://console.firebase.google.com/
   - Clique em "Criar projeto"
   - Ative Authentication > Sign-in method > Google

2. **Configure as variáveis de ambiente:**
   ```bash
   # Copie .env.local.example para .env.local
   cp .env.local.example .env.local
   # Edite .env.local com suas credenciais reais
   ```

3. **Configure domínios autorizados:**
   - No Firebase Console > Authentication > Settings
   - Adicione `localhost:3001` nos domínios autorizados

#### 3. **Verificar Configuração**
```javascript
// Abra o console do browser e verifique:
console.log(useRuntimeConfig().public);
// Deve mostrar todas as variáveis NUXT_PUBLIC_FIREBASE_*
```

#### 4. **Debug Mode**
Adicione logs no console para debug:
```javascript
// No useAuth.ts
console.log('Firebase config:', useRuntimeConfig().public);
```

### 🚀 Próximos Passos

1. **Teste primeiro** com `/login-test` para validar o fluxo
2. **Configure Firebase** seguindo o guia acima
3. **Volte para `/login`** quando tudo estiver configurado

### 📞 Need Help?
Se ainda não funcionar, compartilhe:
- Screenshot do Firebase Console (configurações)
- Valor de `useRuntimeConfig().public` no console
- Logs completos do browser
