import { JSX } from 'react';

export type Props = {
    items: JSX.Element[] | HTMLImageElement[];
    onSequenceEnd: (isFinished: true) => void;
    showAbout: boolean;
}