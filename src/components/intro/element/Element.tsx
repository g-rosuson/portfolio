import { IElement } from '../types';

import Incremental from './incremental/Incremental';
import Sequential from './sequential/Sequential';
import Block from './block/Block';

import helpers from './helpers';

const Element = ({ element }: { element: IElement }) => {
    const components = {
        incremental: Incremental,
        sequential: Sequential,
        block: Block,
    };

    const constructedElement = helpers.getConstructedElement(element);
    const Component = components[element.animation.mode ?? 'block'];

    return <Component element={constructedElement} />;
};

export default Element;
