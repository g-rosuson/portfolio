import { Theme, UniqueNames } from 'src/shared/types/projects';

export type Props = {
    description: string;
    displayUrl: string;
    uniqueName: UniqueNames;
    title: string;
    stack: string[];
    links: string[];
    theme: Theme
    url: string;
}