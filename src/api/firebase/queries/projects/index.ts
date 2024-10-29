import client from 'src/api/firebase/client';

import { Project } from 'src/shared/types/projects';

const COLLECTION_NAME = 'projects';

/**
 * Retrieves all project from firestore.
 */
const getAll = async () => {
    // Fetch all documents in the "Project" collection
    const docs = await client.getDocuments(COLLECTION_NAME) || [];

    // Determine mapped project
    const projects: Project[] = [];

    for (const doc of docs) {
        const data = doc.data();

        const project = {
            uniqueName: data.uniqueName,
            details: data.details,
            title: data.title,
            about: data.about,
            id: doc.id
        };

        projects.push(project);
    }

    return projects;
};

/**
 * Retrieves a project from Firestore by ID.
 * Throws an error if the project is not found.
 */
const getById = async (projectId: string) => {
    const document = await client.getDocument(projectId, COLLECTION_NAME);

    if (!document) {
        throw Error();
    }

    return document;
};

const projects = {
    getById,
    getAll
};

export default projects;