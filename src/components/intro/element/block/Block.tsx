import { IConstructedElement } from '../../types';

const Block = ({ element }: { element: IConstructedElement }) => {
    return (
        <div style={element.style} className={element.meta.className}>
            {element.content}
        </div>
    );
};

export default Block;
