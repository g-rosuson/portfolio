const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_STORAGE_BUCKET,
    appId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_APP_ID
};

export default firebaseConfig;