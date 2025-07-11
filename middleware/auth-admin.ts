// middleware/auth-admin.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth();
  
  // Se não está logado, redireciona para login
  if (!user.value) {
    return navigateTo('/login');
  }
  
  // Se está logado mas não é o admin autorizado, redireciona para lessons/1
  const adminEmail = 'matheusdev.play55@gmail.com';
  if (!user.value.email || user.value.email !== adminEmail) {
    return navigateTo('/lessons/1');
  }
});
