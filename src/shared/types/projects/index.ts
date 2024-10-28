export type Project = {
    title: string;
    about: string;
    uniqueName: UniqueNames;
    details: ProjectDetails;
    id: string;
}

type ProjectDetails = {
    title?: string;
    links: string[];
    stack: string[];
    theme: Theme;
    workflowDescription: string;
    displayUrl: string;
    url: string;
    metadata: Metadata;
}

type Metadata = {
    description: string;
    ogImageName: string;
}

export type UniqueNames = 'project-fernweh' | 'project-rosa-olof';

export type Theme = 'brown' | 'blue'


