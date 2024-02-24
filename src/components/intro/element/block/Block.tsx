import { IElement } from '../../types';

import utils from '../../utils';

const Block = ({ element }: { element: IElement }) => {
    const animationClassName = element.animation.type;
    const className = `${utils.getFontClassName(element.font.name)} ${animationClassName}`;

    return (
        <div style={utils.getStyle(element)} className={className}>
            {element.content}
        </div>
    );
};

export default Block;
