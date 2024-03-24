import { IElement } from '../types';

import Incremental from './incremental/Incremental';
import Sequential from './sequential/Sequential';
import Block from './block/Block';

import helpers from './helpers';

const Element = ({ element }: { element: IElement }) => {
    // @Todo Determine animation easing strategy
    const components = {
        incremental: Incremental,
        sequential: Sequential,
        block: Block,
    };

    const formattedElement = helpers.formatElement(element);
    const Component = components[element.animation.mode ?? 'block'];

    return <Component element={formattedElement} />;
};

export default Element;
