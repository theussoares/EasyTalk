// plugins/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export default defineNuxtPlugin((nuxtApp) => {
    // Acessa as variáveis de ambiente públicas
    const config = useRuntimeConfig();

    const firebaseConfig = {
        apiKey: config.public.firebaseApiKey as string,
        authDomain: config.public.firebaseAuthDomain as string,
        projectId: config.public.firebaseProjectId as string,
        storageBucket: config.public.firebaseStorageBucket as string,
        messagingSenderId: config.public.firebaseMessagingSenderId as string,
        appId: config.public.firebaseAppId as string,
    };

    // Inicializa o app Firebase
    const app = initializeApp(firebaseConfig);

    // Inicializa os serviços que vamos usar
    const auth: Auth = getAuth(app);
    const firestore = getFirestore(app);

    // Disponibiliza os serviços para todo o app
    // Agora você pode usar $auth e $firestore em qualquer lugar
    return {
        provide: {
            auth: auth as Auth,
            firestore: firestore,
        },
    };
});