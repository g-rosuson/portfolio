import { getApp, getApps, initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';

import { Project } from 'src/shared/types/projects';

import firebaseConfig from './config';

/**
 * Initializes the firestore client.
 */
const _getFirestoreClient = () => {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

    return getFirestore(app);
};

/**
 * Retrieves a Firestore collection with the given collection name.
 */
const getDocuments = async (collectionName: 'projects') => {
    try {
        const client = _getFirestoreClient();
        const querySnapshot = await getDocs(collection(client, collectionName));

        return querySnapshot.docs;

    } catch (error) {
        console.error(error);
    }
};

/**
 * Retrieves a Firestore document with the given document ID and collection name.
 */
const getDocument = async (documentId: string, collectionName: 'projects') => {
    try {
        const client = _getFirestoreClient();

        const docRef = doc(client, collectionName, documentId);

        const docSnap = await getDoc(docRef);

        return docSnap.exists() ? docSnap.data() as Project : null;

    } catch (error) {
        console.error(error);
    }
};

const client = {
    getDocuments,
    getDocument
};

export default client;