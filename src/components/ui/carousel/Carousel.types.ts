import { CarouselBlock } from './shared/types';

export type CarouselConfig = {
    mode: string;
    loop: boolean;
    startAt: number;
    replayOnRevisit: boolean;
    id: string;
    blocks: CarouselBlock[];
}

export type State = {
    activeBlockIndex: number | null;
    activeBlock: CarouselBlock | null;
}