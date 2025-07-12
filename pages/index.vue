<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
    <!-- Header -->
    <header class="sticky top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">EasyTalk</h1>
          </div>
          <nav class="hidden md:flex items-center space-x-6">
            <a href="#features" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors text-sm font-medium">Recursos</a>
            <a href="#pricing" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors text-sm font-medium">Preços</a>
            <button @click="startFreeTrial" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
              Começar Agora
            </button>
          </nav>
          
          <!-- Mobile menu button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        <!-- Mobile menu -->
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col space-y-3">
            <a href="#features" @click="mobileMenuOpen = false" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors py-2">Recursos</a>
            <a href="#pricing" @click="mobileMenuOpen = false" class="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors py-2">Preços</a>
            <button @click="startFreeTrial" class="bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center mt-2">
              Começar Agora
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="pt-8 pb-12 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
          Aprenda Inglês de Forma
          <span class="text-indigo-600 dark:text-indigo-400 block sm:inline">Rápida e Eficaz</span>
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
          Método revolucionário que combina gramática, vocabulário e conversação em lições práticas e interativas.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
          <button @click="startFreeTrial" class="bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
            🚀 Começar Agora - Grátis
          </button>
          <button @click="contactWhatsApp" class="border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-200">
            💬 WhatsApp
          </button>
        </div>
        
        <!-- Social Proof -->
        <!-- <div class="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div class="flex items-center">
            <span class="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">4.9/5 (1,200+ reviews)</span>
          </div>
          <div class="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <span class="mr-2">👥</span>
            <span>+5,000 alunos satisfeitos</span>
          </div>
        </div> -->
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-12 sm:py-20 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Por que escolher o EasyTalk?
          </h2>
          <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Nosso método foi desenvolvido por especialistas
          </p>
        </div>
        
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div class="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">🎯</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Método Focado</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">Lições estruturadas que cobrem gramática, vocabulário e conversação de forma integrada</p>
          </div>
          
          <div class="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Resultados Rápidos</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">Veja progresso real em semanas, não meses. Nosso método acelera seu aprendizado</p>
          </div>
          
          <div class="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
            <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">📱</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">Suporte Personalizado</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">Acompanhamento direto via WhatsApp com professores qualificados</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Preços Transparentes e Justos
          </h2>
          <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Escolha a modalidade que melhor se adapta ao seu ritmo de aprendizado
          </p>
        </div>
        
        <!-- Aulas Individuais -->
        <div class="mb-16">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Aulas Individuais</h3>
          <div class="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            <!-- Aula Avulsa -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
              <div class="text-center">
                <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Aula Avulsa</h4>
                <div class="mb-6">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white">R$ 40</span>
                  <span class="text-gray-600 dark:text-gray-300">/aula</span>
                </div>
                <ul class="text-left space-y-3 mb-6">
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <span class="text-green-500 mr-3 text-lg">✓</span>
                    Aula individual de 1h
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <span class="text-green-500 mr-3 text-lg">✓</span>
                    Flexibilidade total
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <span class="text-green-500 mr-3 text-lg">✓</span>
                    Material personalizado
                  </li>
                </ul>
                <button @click="scheduleClass" class="w-full bg-gray-600 text-white py-3 rounded-xl hover:bg-gray-700 transition-colors font-medium">
                  Agendar Aula
                </button>
              </div>
            </div>

            <!-- 8 Aulas Individual -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-indigo-600 relative hover:shadow-2xl transition-all">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span class="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Mais Popular</span>
              </div>
              <div class="text-center">
                <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4">8 Aulas</h4>
                <div class="mb-6">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white">R$ 240</span>
                  <span class="text-gray-600 dark:text-gray-300">/mês</span>
                </div>
                <p class="text-sm text-indigo-600 dark:text-indigo-400 mb-4">R$ 30 por aula (economia de R$ 80)</p>
                <ul class="text-left space-y-3 mb-6">
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <span class="text-green-500 mr-3 text-lg">✓</span>
                    2x por semana
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <span class="text-green-500 mr-3 text-lg">✓</span>
                    Acompanhamento contínuo
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <span class="text-green-500 mr-3 text-lg">✓</span>
                    Material incluído
                  </li>
                </ul>
                <button @click="contractPackage8" class="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium">
                  Contratar Pacote
                </button>
              </div>
            </div>

            <!-- 12 Aulas Individual -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
              <div class="text-center">
                <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-4">12 Aulas</h4>
                <div class="mb-6">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white">R$ 360</span>
                  <span class="text-gray-600 dark:text-gray-300">/mês</span>
                </div>
                <p class="text-sm text-green-600 dark:text-green-400 mb-4">R$ 30 por aula (economia de R$ 120)</p>
                <ul class="text-left space-y-3 mb-6">
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <span class="text-green-500 mr-3 text-lg">✓</span>
                    3x por semana
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <span class="text-green-500 mr-3 text-lg">✓</span>
                    Progresso acelerado
                  </li>
                  <li class="flex items-center text-gray-600 dark:text-gray-300">
                    <span class="text-green-500 mr-3 text-lg">✓</span>
                    Suporte extra
                  </li>
                </ul>
                <button @click="contractPackage12" class="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-colors font-medium">
                  Contratar Pacote
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Aulas em Grupo -->
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Aulas em Grupo</h3>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <!-- 2 Pessoas -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
              <div class="text-center">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">2 Pessoas</h4>
                <div class="mb-4">
                  <span class="text-2xl font-bold text-gray-900 dark:text-white">R$ 25</span>
                  <span class="text-gray-600 dark:text-gray-300 text-sm">/aula por pessoa</span>
                </div>
                <div class="space-y-2 mb-6">
                  <p class="text-sm text-gray-600 dark:text-gray-300">8 aulas: <span class="font-semibold">R$ 200/mês</span></p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">12 aulas: <span class="font-semibold">R$ 300/mês</span></p>
                </div>
                <button @click="formGroup2" class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                  Formar Grupo
                </button>
              </div>
            </div>

            <!-- 3 Pessoas -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
              <div class="text-center">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">3 Pessoas</h4>
                <div class="mb-4">
                  <span class="text-2xl font-bold text-gray-900 dark:text-white">R$ 20</span>
                  <span class="text-gray-600 dark:text-gray-300 text-sm">/aula por pessoa</span>
                </div>
                <div class="space-y-2 mb-6">
                  <p class="text-sm text-gray-600 dark:text-gray-300">8 aulas: <span class="font-semibold">R$ 160/mês</span></p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">12 aulas: <span class="font-semibold">R$ 240/mês</span></p>
                </div>
                <button @click="formGroup3" class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                  Formar Grupo
                </button>
              </div>
            </div>

            <!-- 4 Pessoas -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow">
              <div class="text-center">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">4 Pessoas</h4>
                <div class="mb-4">
                  <span class="text-2xl font-bold text-gray-900 dark:text-white">R$ 15</span>
                  <span class="text-gray-600 dark:text-gray-300 text-sm">/aula por pessoa</span>
                </div>
                <div class="space-y-2 mb-6">
                  <p class="text-sm text-gray-600 dark:text-gray-300">8 aulas: <span class="font-semibold">R$ 120/mês</span></p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">12 aulas: <span class="font-semibold">R$ 180/mês</span></p>
                </div>
                <button @click="formGroup4" class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                  Formar Grupo
                </button>
              </div>
            </div>

            <!-- 5 Pessoas -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-green-500 relative hover:shadow-2xl transition-shadow">
              <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Melhor Custo</span>
              </div>
              <div class="text-center">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">5 Pessoas</h4>
                <div class="mb-4">
                  <span class="text-2xl font-bold text-gray-900 dark:text-white">R$ 10</span>
                  <span class="text-gray-600 dark:text-gray-300 text-sm">/aula por pessoa</span>
                </div>
                <div class="space-y-2 mb-6">
                  <p class="text-sm text-gray-600 dark:text-gray-300">8 aulas: <span class="font-semibold">R$ 80/mês</span></p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">12 aulas: <span class="font-semibold">R$ 120/mês</span></p>
                </div>
                <button @click="formGroup5" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                  Formar Grupo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-12 sm:py-20 bg-indigo-600 dark:bg-indigo-800">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
          Pronto para Transformar seu Inglês?
        </h2>
        <p class="text-lg sm:text-xl text-indigo-100 mb-6 sm:mb-8 leading-relaxed">
          Junte-se a milhares de pessoas que já dominaram o inglês com nosso método revolucionário
        </p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
          <button @click="startFreeTrial" class="bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg">
            🚀 Começar Agora - Primeira Aula Grátis
          </button>
          <button @click="contactWhatsApp" class="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-200">
            💬 Tirar Dúvidas no WhatsApp
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 sm:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div class="sm:col-span-2 lg:col-span-1">
            <h3 class="text-xl sm:text-2xl font-bold text-indigo-400 mb-4">EasyTalk</h3>
            <p class="text-gray-300 leading-relaxed">Transformando vidas através do ensino de inglês de qualidade e acessível.</p>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Links Rápidos</h4>
            <ul class="space-y-2">
              <li><a href="#features" class="text-gray-300 hover:text-white transition-colors">Recursos</a></li>
              <li><a href="#pricing" class="text-gray-300 hover:text-white transition-colors">Preços</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Suporte</h4>
            <ul class="space-y-2">
              <li><button @click="getSupport" class="text-gray-300 hover:text-white transition-colors">Central de Ajuda</button></li>
              <li><button @click="getContact" class="text-gray-300 hover:text-white transition-colors">Fale Conosco</button></li>
              <li><button @click="contactWhatsApp" class="text-gray-300 hover:text-white transition-colors">WhatsApp</button></li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-semibold mb-4">Contato</h4>
            <button @click="getContact" class="flex items-center text-gray-300 hover:text-white transition-colors mb-2">
              <span class="mr-2">📱</span>
              <span class="text-sm">+55 67 99217-1768</span>
            </button>
            <button @click="contactWhatsApp" class="flex items-center text-gray-300 hover:text-white transition-colors">
              <span class="mr-2">💬</span>
              <span class="text-sm">Falar no WhatsApp</span>
            </button>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-6 text-center">
          <p class="text-gray-400 text-sm">&copy; 2025 EasyTalk. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>

    <!-- WhatsApp Float Button -->
    <div class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button @click="contactWhatsApp" class="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 sm:p-4 shadow-lg transform hover:scale-110 transition-all duration-200 animate-pulse">
        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// State para mobile menu
const mobileMenuOpen = ref(false);

// Função genérica para redirecionar para WhatsApp
const redirectToWhatsApp = (message?: string) => {
  const phoneNumber = "5567992171768";
  const defaultMessage = "Olá! Tenho interesse no curso EasyTalk e gostaria de saber mais informações.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message || defaultMessage)}`;
  
  // Abre em nova aba
  window.open(whatsappUrl, '_blank');
  
  // Fecha menu mobile se estiver aberto
  mobileMenuOpen.value = false;
};

// Funções específicas para cada tipo de interesse
const startFreeTrial = () => {
  const message = "🚀 Olá! Quero começar com a primeira aula grátis do EasyTalk. Quando posso agendar?";
  redirectToWhatsApp(message);
};

const contactWhatsApp = () => {
  const message = "💬 Olá! Gostaria de tirar algumas dúvidas sobre o curso EasyTalk. Vocês podem me ajudar?";
  redirectToWhatsApp(message);
};

const scheduleClass = () => {
  const message = "📅 Olá! Tenho interesse em agendar uma aula avulsa de inglês. Quais horários estão disponíveis?";
  redirectToWhatsApp(message);
};

const contractPackage8 = () => {
  const message = "📦 Olá! Tenho interesse no pacote de 8 aulas individuais (2x por semana) por R$ 240/mês. Como funciona?";
  redirectToWhatsApp(message);
};

const contractPackage12 = () => {
  const message = "🎯 Olá! Quero contratar o pacote de 12 aulas individuais (3x por semana) por R$ 360/mês. Quando posso começar?";
  redirectToWhatsApp(message);
};

const formGroup2 = () => {
  const message = "👥 Olá! Tenho interesse em formar um grupo de 2 pessoas para aulas de inglês (R$ 25 por aula/pessoa). Como posso organizar isso?";
  redirectToWhatsApp(message);
};

const formGroup3 = () => {
  const message = "👥 Olá! Tenho interesse em formar um grupo de 3 pessoas para aulas de inglês (R$ 20 por aula/pessoa). Como posso organizar isso?";
  redirectToWhatsApp(message);
};

const formGroup4 = () => {
  const message = "👥 Olá! Tenho interesse em formar um grupo de 4 pessoas para aulas de inglês (R$ 15 por aula/pessoa). Como posso organizar isso?";
  redirectToWhatsApp(message);
};

const formGroup5 = () => {
  const message = "👥 Olá! Tenho interesse em formar um grupo de 5 pessoas para aulas de inglês (R$ 10 por aula/pessoa). Como posso organizar isso?";
  redirectToWhatsApp(message);
};

const getSupport = () => {
  const message = "🆘 Olá! Preciso de ajuda e suporte sobre o curso EasyTalk. Vocês podem me atender?";
  redirectToWhatsApp(message);
};

const getContact = () => {
  const message = "📞 Olá! Gostaria de entrar em contato para conhecer melhor o EasyTalk. Estou interessado(a) em aprender inglês!";
  redirectToWhatsApp(message);
};

// SEO Meta tags
useHead({
  title: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz',
  meta: [
    { name: 'description', content: 'Método revolucionário para aprender inglês rapidamente. Gramática, vocabulário e conversação em lições práticas. Suporte personalizado via WhatsApp.' },
    { name: 'keywords', content: 'curso de inglês, aprender inglês, inglês rápido, aulas de inglês, conversação em inglês' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { property: 'og:title', content: 'EasyTalk - Aprenda Inglês de Forma Rápida e Eficaz' },
    { property: 'og:description', content: 'Transforme seu inglês em semanas com nosso método revolucionário' },
    { property: 'og:type', content: 'website' }
  ]
});
</script>
