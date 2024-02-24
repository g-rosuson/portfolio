import { IElement } from '../types';

import Incremental from './incremental/Incremental';
import Sequential from './sequential/Sequential';
import Block from './block/Block';

const Element = ({ element }: { element: IElement }) => {
    const components = {
        incremental: Incremental,
        sequential: Sequential,
        block: Block,
    };

    const mode = (element.animation.mode as keyof typeof components) ?? 'Block';
    const Component = components[mode];

    return <Component element={element} />;
};

export default Element;
