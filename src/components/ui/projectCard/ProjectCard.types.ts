import { Project, Theme } from 'src/shared/types/projects';

export type Props = Omit<Project, 'details'> & {
    theme: Theme
}